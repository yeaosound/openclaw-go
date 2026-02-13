# OpenClaw 多租户 Pure SaaS 对接与渠道/管理面梳理（基于仓库源码的落地笔记）

这份文档把我们在仓库里已经“读到并确认”的事实（含文件定位）整理成一份可执行的对接笔记，面向场景：

- 纯 SaaS：你自建 WebUI + 租户管理系统（鉴权、状态同步、运维）
- 主交互：产品内 1:1 DM
- 体验目标：类似 Telegram 的跨设备一致（随时打开都能得到准确、时序正确的 timeline）
- 扩展目标：接入 Telegram/Slack/Discord/WhatsApp 等外部渠道

---

## 0. 结论先行（推荐分层）

- OpenClaw Gateway = 每租户的“运行时 worker”（执行面/数据面）
  - 负责推理执行、工具调用、渠道插件、对外发送/接收。
- 你的 SaaS = “控制面 + 权威事件日志（source of truth）”
  - 负责租户生命周期、用户鉴权、RBAC、审计、配额、跨设备时序一致的聊天记录回放。
- 产品内 DM（你自建聊天）建议优先用 Gateway 的 `chat.*`：
  - `chat.send/chat.history/chat.abort/chat.inject`（实现：`src/gateway/server-methods/chat.ts`）
- 但跨设备一致性不能依赖 Gateway 事件做权威存储：
  - Gateway 事件“不重放”，断线会 gap（明确写在 `docs/zh-CN/concepts/architecture.md`）。
  - 所以你必须在 SaaS 侧维护一个可回放的 conversation event log。

---

## 1. 已确认的仓库事实（Repo-grounded）

### 1.1 Gateway 架构与事件语义

- Gateway 是长生命周期服务，控制面客户端（WebUI/CLI/macOS app/自动化）通过 WebSocket 连接。
- 协议为 connect 握手后：req/res + server events。
- 关键不变量：事件不会重放；客户端出现 gap 需要刷新。

来源：`docs/zh-CN/concepts/architecture.md`

### 1.2 Control UI（内置 WebUI）= RPC 面的参考实现

Control UI 是 Vite + Lit SPA，由 Gateway 提供静态资源并直连 Gateway WS。

- 说明文档：`docs/zh-CN/web/control-ui.md`
- 仪表盘入口文档：`docs/zh-CN/web/dashboard.md`

它通过 controller 调用网关 RPC（`state.client.request(method, params)`），已覆盖大量管理面能力（见第 2 节）。

### 1.3 Channel 能力模型（capabilities）与插件机制

- 能力字段定义：`src/channels/plugins/types.core.ts` 的 `ChannelCapabilities`
  - 包含 `polls/reactions/edit/unsend/reply/effects/groupManagement/threads/media/nativeCommands/blockStreaming`。
- `src/channels/dock.ts` 是轻量 dock：明确写了“keep light”，是共享路径使用的廉价元数据/行为。
  - dock 中的 capabilities 不保证完整，真正以插件 `extensions/*/src/channel.ts` 为准。

来源：`src/channels/dock.ts`、`src/channels/plugins/types.core.ts`

---

## 2. WebUI 管理面能力（已确认 RPC 方法清单）

以下方法来自 Control UI controller 的实际调用（意味着 Gateway 端已实现相应方法）：

- Chat
  - `chat.history`, `chat.send`, `chat.abort`：`ui/src/ui/controllers/chat.ts`
- Config
  - `config.get`, `config.schema`, `config.set`, `config.apply`, `update.run`：`ui/src/ui/controllers/config.ts`
- Channels（含 WhatsApp Web 登录）
  - `channels.status`, `web.login.start`, `web.login.wait`, `channels.logout`：`ui/src/ui/controllers/channels.ts`
- Sessions
  - `sessions.list`, `sessions.patch`, `sessions.delete`：`ui/src/ui/controllers/sessions.ts`
- Cron
  - `cron.status`, `cron.list`, `cron.add`, `cron.update`, `cron.run`, `cron.remove`, `cron.runs`：`ui/src/ui/controllers/cron.ts`
- Skills
  - `skills.status`, `skills.update`, `skills.install`：`ui/src/ui/controllers/skills.ts`
- Devices
  - `device.pair.list`, `device.pair.approve`, `device.pair.reject`, `device.token.rotate`, `device.token.revoke`：`ui/src/ui/controllers/devices.ts`
- Nodes
  - `node.list`：`ui/src/ui/controllers/nodes.ts`
- Logs
  - `logs.tail`：`ui/src/ui/controllers/logs.ts`
- Debug
  - `status`, `health`, `models.list`, `last-heartbeat`：`ui/src/ui/controllers/debug.ts`
- Exec approvals（配置编辑）
  - `exec.approvals.get`, `exec.approvals.set`, `exec.approvals.node.get`, `exec.approvals.node.set`：`ui/src/ui/controllers/exec-approvals.ts`

你自建 WebUI 时，可以把这些 controller 当作“官方 SDK 参考实现”。

---

## 3. `chat.*`（产品内 DM 的推荐执行面）已确认行为

实现：`src/gateway/server-methods/chat.ts`

- `chat.send`
  - 必须提供 `idempotencyKey`（建议你用它对齐 SaaS 的 `message_id` / `run_id`）。
  - 非阻塞：先 ACK `{ runId, status: "started" }`，随后通过 `chat` 事件推 `delta/final/error/aborted`。
  - 支持附件（图片等），会解析并限制大小（见 `parseMessageWithAttachments`）。
  - 支持 stop 命令文本（`/stop` 等）触发 abort。
- `chat.history`
  - 从 transcript 读取历史，做 sanitize + bytes cap。
- `chat.abort`
  - 可按 `{sessionKey}` 中止该会话所有活跃 run；或 `{sessionKey, runId}` 中止单次 run。
- `chat.inject`
  - 向 transcript 追加一条注入的 assistant 消息，并广播 `chat` 事件用于 UI 更新（不触发 agent run）。

Control UI 文档也描述了这些语义：`docs/zh-CN/web/control-ui.md`

---

## 4. 渠道能力画像（已在插件里确认的部分）

说明：这里只列“在插件 `capabilities` 里明确声明”的能力，不用 dock 代替。

- Telegram：`extensions/telegram/src/channel.ts`
  - `capabilities`: `reactions: true`, `threads: true`, `media: true`, `nativeCommands: true`, `blockStreaming: true`
- Slack：`extensions/slack/src/channel.ts`
  - `capabilities`: `reactions: true`, `threads: true`, `media: true`, `nativeCommands: true`
  - `actions.listActions` 在 messages 启用时包含 `read/edit/delete`（意味着 Slack 渠道上存在“消息编辑”动作入口）。
- Discord：`extensions/discord/src/channel.ts`
  - `capabilities`: `polls: true`, `reactions: true`, `threads: true`, `media: true`, `nativeCommands: true`
- WhatsApp：`extensions/whatsapp/src/channel.ts`
  - `capabilities`: `polls: true`, `reactions: true`, `media: true`
  - `gatewayMethods: ["web.login.start", "web.login.wait"]`（与 Control UI 的二维码登录链路对应）。

对 Pure SaaS + 1:1 DM 的含义：

- “最完整能力的主体验”建议在产品内 DM（走 `chat.*` + SaaS event log）上实现。
- 外部渠道更适合作为：可选触达/通知/镜像/集成入口。

---

## 5. 纯 SaaS 的“权威聊天记录 + 多设备同步”（Telegram 标杆）落地方案

你选择 A：user/assistant/tool/approval/status/edit/unsend 全部进入同一条 timeline。

### 5.1 为什么必须 SaaS 自建 event log

- Gateway 事件不重放（`docs/zh-CN/concepts/architecture.md`），断线会 gap。
- 所以要实现“任意设备打开都能准确恢复状态”，必须有：
  - 可回放（replayable）
  - 会话内严格可排序（conversation total order）
  - 强幂等（重试不重复落消息/不重复执行）

建议：SaaS 侧维护 append-only 的 `conversation_events`，用 DB 分配 `event_seq` 作为权威顺序。

### 5.2 建议的数据模型（最小可用）

- `conversations`
  - `tenant_id`, `conversation_id`, `end_user_id`
  - `gateway_session_key`（映射到 OpenClaw 的 `sessionKey`）
- `conversation_events`（append-only）
  - `tenant_id`, `conversation_id`
  - `event_seq BIGINT`（DB 生成，严格单调递增）
  - `type`
  - `payload JSONB`
  - `gateway_run_id`（对齐 `chat` event 的 `runId`；建议直接用 `idempotencyKey`）
  - `created_at`

### 5.3 Timeline 事件类型（A 方案建议最小集）

- `user_message`
- `assistant_message`
- `run_started` / `run_completed` / `run_failed` / `run_aborted`
- `tool_call` / `tool_result`
  - `agent` 事件 payload 已确认可结构化（见 5.6），但会受 verbose 开关影响（默认可能不发 tool stream）。
- `exec_approval_requested` / `exec_approval_resolved`
- `message_edited` / `message_unsent`
- `system_note`

### 5.4 发送消息与幂等（推荐把 `idempotencyKey` 变成你的 message_id）

1) 客户端 -> SaaS：`POST /conversations/:id/messages`
2) SaaS 生成 `user_message_id`（UUID/ULID）并写入 `conversation_events(type=user_message)`
3) SaaS -> Gateway：调用 `chat.send({ sessionKey, message, idempotencyKey: user_message_id, attachments? })`（`src/gateway/server-methods/chat.ts`）
4) SaaS 监听 Gateway 的 `chat` 事件：
   - `delta`：可仅用于 UI 流式显示，不一定落库（或落为可丢弃的 draft）
   - `final`：落 `assistant_message`（并可落 `run_completed`）
   - `error/aborted`：落 `run_failed/run_aborted` + `system_note`

注意：网关侧 dedupe 是短期缓存（重启会丢），所以 SaaS 侧必须用 DB unique constraint 做强幂等。

### 5.5 多设备同步协议（cursor + 增量流）

- `GET /conversations/:id/events?after=<event_seq>`：补齐事件
- `WS/SSE /conversations/:id/stream`：推送新事件

客户端：永远按 `event_seq` 渲染 timeline；断线重连只带 cursor 即可恢复。

### 5.6 `agent` 事件：把 tool_call/tool_result 纳入 timeline 的关键数据源（已确认）

Control UI / TUI 都消费 Gateway 的 `agent` event（`evt.event === "agent"`），因此这是你把工具调用纳入 A 方案 timeline 的核心输入。

- 事件广播入口：`src/gateway/server-chat.ts`
  - `createAgentEventHandler(...)` 最终会 `broadcast("agent", agentPayload)` 并 `nodeSendToSession(sessionKey, "agent", agentPayload)`。
  - 它会把 `stream === "assistant"` 的 `data.text` 映射成 `chat` 的 `delta`；并把 `lifecycle end/error` 映射成 `chat final/error`。
- 事件结构（UI 侧类型）：`ui/src/ui/app-tool-stream.ts`
  - `AgentEventPayload = { runId, seq, stream, ts, sessionKey?, data }`
- Tool stream 的字段约定（来自 embedded Pi 订阅处理器）：`src/agents/pi-embedded-subscribe.handlers.tools.ts`
  - `stream: "tool"` 且 `data.phase` 为：
    - `start`: `{ toolCallId, name, args }`
    - `update`: `{ toolCallId, name, partialResult }`（可选：做 tool output 增量展示/落库）
    - `result`: `{ toolCallId, name, result, meta?, isError }`
- Lifecycle stream 的字段约定（来自 embedded Pi + CLI provider）：
  - embedded Pi：`src/agents/pi-embedded-subscribe.handlers.lifecycle.ts`（`phase: start/end`）
  - CLI provider：`src/auto-reply/reply/agent-runner-execution.ts`（`phase: start/end/error`，含 `startedAt/endedAt/error`）
- Tool 事件可能被 verbose 开关抑制：`src/gateway/server-chat.ts`
  - `shouldEmitToolEvents(runId, sessionKey)` 默认会读 `session.verboseLevel` 或 `cfg.agents.defaults.verboseDefault`。
  - 对 Pure SaaS：如果你要“最完整 timeline”，建议在会话层把 `verboseLevel` 设为 `"on"`（可用 `sessions.patch`：`ui/src/ui/controllers/sessions.ts`）。

对 SaaS 的落库映射建议（最小规则）：

- 收到 `evt.event === "agent" && payload.stream === "tool" && phase === "start"`：写 `conversation_events(type=tool_call)`
  - 关键字段：`gateway_run_id=payload.runId`, `tool_call_id=data.toolCallId`, `tool_name=data.name`, `args=data.args`
- 收到 `phase === "result"`：写 `conversation_events(type=tool_result)`
  - 关键字段：`tool_call_id`, `result`, `is_error`, `meta`
- 如果你已经用 `chat` event 落了 `assistant_message`：可以不必再单独落 `assistant` stream；把 `agent` 用作 tool timeline 即可。

### 5.7 Gateway -> SaaS `conversation_events` 映射表（可直接照表实现）

说明：这里的 “Gateway 输入” 指你从 Gateway WS 收到的 event frame（`type: "event"`），或者你在 SaaS 侧发起的 RPC（`type: "req"`）。SaaS 的权威顺序一律用你自己的 `event_seq`（DB 生成），不要把 Gateway 的 `evt.seq` 当作可回放的权威序号。

| Gateway 输入 | 触发时机 | 最小字段（你要落库的） | SaaS event type | 幂等/去重 key 建议 | 备注 |
|---|---|---|---|---|---|
| `RPC chat.send`（你发起） | 终端用户发送一条消息 | `tenant_id, conversation_id, sessionKey, idempotencyKey(runId), message, attachments?` | `user_message` + `run_started` | `user_message_id = idempotencyKey` | 推荐：先落 `user_message` 再调用 Gateway；`idempotencyKey` 直接用作你的 `message_id`/`run_id`。实现见 `src/gateway/server-methods/chat.ts`。 |
| `event chat` + `state=delta` | assistant 流式输出 | （可选）`runId, sessionKey, message(text)` | （可选）`assistant_draft` | `runId + "draft"` | 一般不需要权威落库；用于 UI 实时体验即可。UI 类型：`ui/src/ui/controllers/chat.ts`。 |
| `event chat` + `state=final` | assistant 最终回复 | `runId, sessionKey, message` | `assistant_message` + `run_completed` | `runId + "assistant_final"` | `message` 是结构化 content blocks；SaaS 可按需提取纯文本/富文本。 |
| `event chat` + `state=error` | run 失败 | `runId, sessionKey, errorMessage` | `run_failed` + `system_note` | `runId + "error"` | 失败时建议同时记录一个可展示的 system note。 |
| `event chat` + `state=aborted` | run 被中止 | `runId, sessionKey` | `run_aborted` | `runId + "aborted"` | abort 也建议落库，方便跨设备一致展示“已停止”。 |
| `event agent` + `stream=tool` + `phase=start` | 工具开始执行 | `runId, sessionKey?, data.toolCallId, data.name, data.args` | `tool_call` | `runId + toolCallId + "start"` | toolCallId 是关联 tool_call/tool_result 的主键。字段约定来自 `src/agents/pi-embedded-subscribe.handlers.tools.ts`，广播入口 `src/gateway/server-chat.ts`。 |
| `event agent` + `stream=tool` + `phase=update` | 工具输出增量 | `runId, toolCallId, partialResult` | （可选）`tool_result_update` | `runId + toolCallId + "update" + payload.seq` | 只要你追求“最完整 timeline”才需要落；否则可忽略。 |
| `event agent` + `stream=tool` + `phase=result` | 工具执行结束 | `runId, toolCallId, result, isError, meta?` | `tool_result` | `runId + toolCallId + "result"` | 建议把 `isError/meta` 一并落库，便于 UI 呈现/审计。 |
| `event agent` + `stream=lifecycle` + `phase=start` | run 开始（被 agent runner 显式标记） | `runId, startedAt?` | `run_started`（可选） | `runId + "lifecycle_start"` | 如果你已经在发起 `chat.send` 时落了 `run_started`，这里可做对账/补洞。 |
| `event agent` + `stream=lifecycle` + `phase=end` | run 正常结束 | `runId, endedAt?` | `run_completed`（可选） | `runId + "lifecycle_end"` | WebChat 的 `chat final` 通常足够；lifecycle 更偏“执行态”。 |
| `event agent` + `stream=lifecycle` + `phase=error` | run 以错误结束 | `runId, error, endedAt?` | `run_failed`（可选） | `runId + "lifecycle_error"` | 可与 `chat error` 互为补洞来源。 |
| `event exec.approval.requested` | 有需要人工审批的 exec 产生 | `id, request{command,cwd,host,security,ask,agentId,resolvedPath,sessionKey}, createdAtMs, expiresAtMs` | `exec_approval_requested` | `approval_id = id` | 实现：`src/gateway/server-methods/exec-approval.ts`。注意需要 `operator.approvals` scope 才能收到。 |
| `event exec.approval.resolved` | 审批结果产生 | `id, decision, resolvedBy, ts` | `exec_approval_resolved` | `approval_id = id` | 同上。 |

### 5.8 SaaS 摄取 Worker 设计（WS 客户端 + 落库 + gap 处理）

目标：你的 SaaS 后端为每个租户维护一个到 Gateway 的长连接，持续把 `chat/agent/exec.approval.*` 事件摄取并写入 `conversation_events`（权威 timeline）。你的 WebUI/移动端永远只读 SaaS 的 event log，从而实现 Telegram 式跨设备一致。

核心组件

- GatewayConnector（每租户 1 个）：负责 WS 连接、connect 握手、重连 backoff、gap 监测。
  - connect 参数形状参考：`ui/src/ui/gateway.ts`，schema：`src/gateway/protocol/schema/frames.ts`。
  - 建议 role/scopes：`role=operator`，scopes 至少包含 `operator.admin` + `operator.approvals`（审批摄取必需）。
  - 设备认证：UI 会处理 `connect.challenge` nonce 并签名；SaaS 也可以复用同样流程（或先用共享 token 方式跑通，再补设备签名）。
- EventRouter：按 `evt.event` 分发到不同 handler（chat/agent/approval/其他）。
- Persister：把事件转换成 SaaS `conversation_events` 并做强幂等（unique constraint）。
- Reconciler（处理断线/gap）：当检测到 gap 或重连后不确定是否漏事件时，标记会话进入 `needs_reconcile`，并做“尽力补洞”。

强幂等策略（关键）

- 你要假设 Gateway 事件是 at-least-once 或可能重复，也可能丢（gap）。
- 每类事件都用“天然主键”去重：
  - chat final/error/aborted：`runId` 唯一
  - tool_call/tool_result：`toolCallId`（结合 `runId`）唯一
  - approvals：`approval id` 唯一
- `conversation_events` 表建议增加一列 `dedupe_key`（或在 payload 里存），并做 `(tenant_id, conversation_id, dedupe_key)` unique。

Gap 处理（因为事件不重放）

- Gateway 客户端会在 seq 跳跃时触发 gap（UI 逻辑见 `ui/src/ui/gateway.ts` 的 `onGap`）；你的摄取 worker 也应维护一个 `last_seen_seq` 做同样检测。
- 一旦发生 gap：
  - 立刻写一条 `system_note`：`{"kind":"gateway_gap","expected":...,"received":...}`（让用户知道“这段执行态可能不完整”）。
  - 对于产品内 DM：可以调用 `chat.history` 做“消息层面的补洞”（注意 `chat.history` 有 hard cap，见 `src/gateway/server-methods/chat.ts`）。
  - 对 tool_call/tool_result：gap 后无法保证补齐（因为没有 replay）；因此把“工具 timeline 可能不完整”作为显式状态暴露到 UI。

参考流程（伪代码）

```ts
// Per-tenant worker loop
connectWs();
await connectHandshake({ role: "operator", scopes: ["operator.admin","operator.approvals"] });

onEventFrame((evt) => {
  switch (evt.event) {
    case "chat":
      persistChat(evt.payload);
      break;
    case "agent":
      persistAgent(evt.payload); // tool_call/tool_result + lifecycle(optional)
      break;
    case "exec.approval.requested":
    case "exec.approval.resolved":
      persistApproval(evt.event, evt.payload);
      break;
  }
});

onGap((info) => {
  persistSystemNote({ kind: "gateway_gap", ...info });
  markConversationNeedsReconcile();
});
```

让 tool stream 始终可用（A 方案“最完整 timeline”的必要条件）

- `agent` 的 tool stream 默认可能被 verbose 开关抑制（见 `src/gateway/server-chat.ts` 的 `shouldEmitToolEvents(...)`）。
- 你的 SaaS 在创建/绑定会话（sessionKey）后，建议立即把该会话 patch 为 `verboseLevel="on"`：
  - RPC：`sessions.patch`（UI 参考实现：`ui/src/ui/controllers/sessions.ts`）。

### 5.9 SaaS DB schema 草案（Postgres，事件溯源 + 强幂等）

目标：

- `conversation_events` 作为权威 timeline（可回放、严格排序、跨设备 cursor 同步）。
- 通过 `dedupe_key` 做强幂等（重试/重复事件不会产生重复记录）。

一个可落地的最小 schema（建议）

```sql
-- Conversations / threads
create table conversations (
  tenant_id text not null,
  conversation_id text not null,

  -- OpenClaw routing key
  gateway_session_key text not null,

  -- Optional denormalized fields for UI
  end_user_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- If you want per-conversation contiguous seq (Telegram-like), keep a counter here.
  next_event_seq bigint not null default 1,

  primary key (tenant_id, conversation_id),
  unique (tenant_id, gateway_session_key)
);

-- Append-only event log
create table conversation_events (
  tenant_id text not null,
  conversation_id text not null,

  -- Conversation-local sequence (recommended). Allocate from conversations.next_event_seq.
  event_seq bigint not null,

  type text not null,
  payload jsonb not null,

  -- Strong idempotency key (must be unique per conversation).
  -- Examples: "run:<runId>:assistant_final", "tool:<runId>:<toolCallId>:result", "approval:<id>:resolved".
  dedupe_key text not null,

  -- Useful join keys (optional but practical)
  gateway_run_id text,
  tool_call_id text,
  approval_id text,

  -- For debugging only (NOT a source of truth). Mirrors gateway ws event frame seq when present.
  gateway_event_seq bigint,

  created_at timestamptz not null default now(),

  primary key (tenant_id, conversation_id, event_seq),
  unique (tenant_id, conversation_id, dedupe_key),

  foreign key (tenant_id, conversation_id)
    references conversations (tenant_id, conversation_id)
    on delete cascade
);

create index conversation_events_by_seq
  on conversation_events (tenant_id, conversation_id, event_seq);

create index conversation_events_by_run
  on conversation_events (tenant_id, conversation_id, gateway_run_id)
  where gateway_run_id is not null;

create index conversation_events_by_tool
  on conversation_events (tenant_id, conversation_id, tool_call_id)
  where tool_call_id is not null;

create index conversation_events_by_approval
  on conversation_events (tenant_id, conversation_id, approval_id)
  where approval_id is not null;
```

如何分配 `event_seq`（保证会话内严格有序）

- 推荐：在同一个事务里“占用序号 + 插入事件”，类似：

```sql
-- Pseudocode (wrap in a transaction)
update conversations
set next_event_seq = next_event_seq + 1,
    updated_at = now()
where tenant_id = $1 and conversation_id = $2
returning (next_event_seq - 1) as event_seq;

insert into conversation_events (
  tenant_id, conversation_id, event_seq, type, payload, dedupe_key,
  gateway_run_id, tool_call_id, approval_id, gateway_event_seq
) values (
  $1, $2, $event_seq, $type, $payload::jsonb, $dedupe_key,
  $gateway_run_id, $tool_call_id, $approval_id, $gateway_event_seq
);
```

- 如果你不需要“连续序号”，也可以用全局 `bigserial` 作为 event id；但你现在的目标是 Telegram 标杆，更建议 conversation-local seq。

`dedupe_key` 的建议格式（和 5.7 表保持一致）

- chat final：`run:<runId>:assistant_final`
- chat error：`run:<runId>:error`
- aborted：`run:<runId>:aborted`
- tool start：`tool:<runId>:<toolCallId>:start`
- tool result：`tool:<runId>:<toolCallId>:result`
- approval requested：`approval:<approvalId>:requested`
- approval resolved：`approval:<approvalId>:resolved`

---

### 5.10 客户端 Cursor 同步 API 合同（REST + SSE）

这一节是你做 Telegram 式跨设备一致体验的“对外协议”。核心原则：客户端不需要理解 Gateway 的任何细节，只需要基于 `event_seq` 拉取/订阅 `conversation_events`。

#### 5.10.1 REST：拉取事件（补洞）

`GET /v1/conversations/{conversation_id}/events?after={event_seq}&limit=200`

- 语义：返回严格按 `event_seq` 升序的一段事件（`event_seq > after`）。
- 客户端策略：
  - App 启动/切到前台：先调用这个接口补齐
  - SSE 断线重连：用本地最后的 `event_seq` 作为 `after`

Response（示例）

```json
{
  "conversation_id": "c_123",
  "after": 120,
  "events": [
    {
      "event_seq": 121,
      "type": "user_message",
      "payload": {
        "message_id": "01HR...",
        "text": "hello",
        "created_at": 1730000000000
      },
      "gateway_run_id": "01HR...",
      "dedupe_key": "run:01HR...:user_message"
    },
    {
      "event_seq": 122,
      "type": "tool_call",
      "payload": {
        "run_id": "01HR...",
        "tool_call_id": "call_abc",
        "tool_name": "functions.read",
        "args": { "filePath": "/root/openclaw-cn/README.md" }
      },
      "gateway_run_id": "01HR...",
      "dedupe_key": "tool:01HR...:call_abc:start"
    }
  ],
  "next_after": 122,
  "has_more": false
}
```

建议错误码

- `401/403`：鉴权失败或越权（tenant/conversation 不匹配）
- `404`：conversation 不存在
- `400`：after/limit 参数非法

#### 5.10.2 SSE：订阅事件（实时）

`GET /v1/conversations/{conversation_id}/events/stream?after={event_seq}`

- 建议使用标准 SSE：
  - 每条消息带 `id: <event_seq>`，客户端可用 `Last-Event-ID` 自动续传。
  - 服务端定期发 `ping` 防止中间网络 idle timeout。

SSE 事件（示例）

```text
event: conversation_event
id: 123
retry: 2000

data: {"event_seq":123,"type":"assistant_message","payload":{"run_id":"01HR...","content":[{"type":"text","text":"..."}]}}

event: ping
id: 124

data: {"ts":1730000000123}
```

客户端推荐实现

- 建立 SSE 连接后：
  1) 接收 `conversation_event`，按 `event_seq` 严格递增应用到 UI
  2) 每处理一条事件，持久化本地 cursor（最后的 `event_seq`）
  3) SSE 断线：自动重连；重连后先用 REST 补洞再继续 SSE

#### 5.10.3 REST：发送消息（强幂等）

`POST /v1/conversations/{conversation_id}/messages`

Request（示例）

```json
{
  "message_id": "01HR...",
  "text": "hi",
  "attachments": []
}
```

- `message_id` 建议由客户端生成 ULID/UUID（作为幂等 key），SaaS 必须用 unique constraint 去重。
- SaaS 内部处理：
  - 先写 `conversation_events(type=user_message)`
  - 再调用 Gateway `chat.send(..., idempotencyKey=message_id)`

建议错误码

- `409`：message_id 已存在但 payload 不一致（幂等冲突）

#### 5.10.4 REST：编辑/撤回（产品内事件模型）

为了保持 append-only + 可审计，编辑/撤回都建议是“追加事件”，而不是就地修改。

- 编辑：`POST /v1/conversations/{conversation_id}/messages/{message_id}/edit`
- 撤回：`POST /v1/conversations/{conversation_id}/messages/{message_id}/unsend`

它们分别追加 `message_edited` / `message_unsent` 到 `conversation_events`，客户端按事件回放即可得到 Telegram 式行为。

### 5.11 Event Payload 规范附录（前后端并行开发用）

这一节把每种 `conversation_events.type` 的 payload 做成“最小必填字段”规范。你可以把它当成你 SaaS 的内部协议（也可以直接作为 OpenAPI 的 schema 基础）。

通用字段（所有事件）

- `event_seq`：BIGINT（权威顺序，服务端分配）
- `type`：string
- `payload`：json object
- `dedupe_key`：string（强幂等 key）
- `created_at`：timestamp

#### 5.11.1 `user_message`

```json
{
  "message_id": "01HR...",
  "author": { "kind": "end_user", "id": "u_123" },
  "text": "hello",
  "attachments": [],
  "ts": 1730000000000
}
```

- `message_id` 必须全局唯一（在该 conversation 内），同时建议作为 Gateway `chat.send.idempotencyKey`。

#### 5.11.2 `assistant_message`

```json
{
  "run_id": "01HR...",
  "content": [{ "type": "text", "text": "..." }],
  "text": "...",
  "ts": 1730000000123
}
```

- `content` 建议保存 Gateway 的结构化内容（便于未来做 richer UI）。
- `text` 是可选的 denormalized 纯文本（方便列表渲染/全文检索）。

#### 5.11.3 `run_started` / `run_completed` / `run_failed` / `run_aborted`

```json
{
  "run_id": "01HR...",
  "source": "chat.send" ,
  "ts": 1730000000000,
  "error": "..." 
}
```

- `source` 建议枚举：`chat.send` / `agent.lifecycle` / `system`。
- 只有 `run_failed` 需要 `error`。

#### 5.11.4 `tool_call`

```json
{
  "run_id": "01HR...",
  "tool_call_id": "call_abc",
  "tool_name": "functions.read",
  "args": { "filePath": "/root/openclaw-cn/README.md" },
  "ts": 1730000000456
}
```

- `tool_call_id` 对齐 Gateway `agent` tool stream 的 `data.toolCallId`。

#### 5.11.5 `tool_result`

```json
{
  "run_id": "01HR...",
  "tool_call_id": "call_abc",
  "tool_name": "functions.read",
  "is_error": false,
  "result": { "status": "ok" },
  "meta": { "channel": "fs", "sensitive": false },
  "ts": 1730000000789
}
```

- `result` 建议保留结构化对象（不要只存字符串）；UI 展示再渲染。

#### 5.11.6 `exec_approval_requested`

```json
{
  "approval_id": "appr_123",
  "request": {
    "command": "rm -rf /",
    "cwd": "/root/openclaw-cn",
    "host": "local",
    "security": "high",
    "ask": "Need permission to run destructive command",
    "agent_id": "default",
    "resolved_path": "/bin/rm",
    "session_key": "..."
  },
  "created_at_ms": 1730000000000,
  "expires_at_ms": 1730000120000
}
```

- 字段来源：Gateway 事件 `exec.approval.requested`（实现：`src/gateway/server-methods/exec-approval.ts`）。

#### 5.11.7 `exec_approval_resolved`

```json
{
  "approval_id": "appr_123",
  "decision": "allow-once",
  "resolved_by": "Control UI",
  "ts": 1730000000999
}
```

#### 5.11.8 `message_edited`

```json
{
  "target_message_id": "01HR...",
  "editor": { "kind": "end_user", "id": "u_123" },
  "new_text": "fixed typo",
  "ts": 1730000001111
}
```

#### 5.11.9 `message_unsent`

```json
{
  "target_message_id": "01HR...",
  "actor": { "kind": "end_user", "id": "u_123" },
  "ts": 1730000001222
}
```

#### 5.11.10 `system_note`

```json
{
  "kind": "gateway_gap",
  "message": "Gateway event gap detected; tool timeline may be incomplete",
  "expected": 100,
  "received": 120,
  "ts": 1730000001333
}
```

---

## 6. 编辑/撤回：OpenClaw 支持吗？你产品内应如何实现？

### 6.1 OpenClaw 框架层面支持 edit/unsend（对外渠道动作）

- 能力字段：`edit?: boolean`, `unsend?: boolean`：`src/channels/plugins/types.core.ts`
- 动作名枚举含 `edit` 与 `unsend`：`src/channels/plugins/message-action-names.ts`
- 目标参数别名支持 `messageId`：`src/infra/outbound/message-action-spec.ts`
- 动作分发框架：`src/channels/plugins/message-actions.ts`

这说明 OpenClaw 可以把“编辑/撤回”作为标准 message action 调度到渠道插件。

### 6.2 但 `chat.*`（WebChat transcript）不是“可编辑历史协议”

`chat.send/chat.history/chat.inject` 的语义是“追加 transcript + 广播事件”，它并没有提供“编辑/撤回旧 transcript 行”的一等 RPC（见 `src/gateway/server-methods/chat.ts`）。

因此：你的产品内聊天记录要实现 Telegram 式 edit/unsend，应在 SaaS 侧做事件溯源。

### 6.3 产品内推荐实现：永远追加事件，不做 in-place 修改

- 编辑：追加 `message_edited { target_message_id, new_content, editor, ts }`
- 撤回：追加 `message_unsent { target_message_id, actor, ts }`

如果该消息也投递到了外部渠道且渠道支持 edit/unsend，可以再调用相应 message action 同步外部平台，并把结果写入 timeline。

### 6.4 外部渠道侧 edit/delete/unsend：已在源码确认的支持范围（供你做“能力分层”）

以下结论来自各渠道的 message action adapter（`src/channels/plugins/actions/*`）或渠道插件的 action handler。

- Slack：支持 `edit` / `delete`（不暴露 `unsend`）
  - `actions.listActions` 在 messages 开启时包含 `edit`/`delete`：`extensions/slack/src/channel.ts`
  - `handleAction` 明确实现 `edit -> editMessage`、`delete -> deleteMessage`：`extensions/slack/src/channel.ts`
- Telegram：支持 `edit` / `delete`（不暴露 `unsend`）
  - 通过 action gate 暴露：`src/channels/plugins/actions/telegram.ts`
  - `handleAction` 映射到 `editMessage/deleteMessage`：`src/channels/plugins/actions/telegram.ts`
- Discord：支持 `edit` / `delete`（不暴露 `unsend`）
  - `actions.listActions` 在 messages 开启时包含 `edit`/`delete`：`src/channels/plugins/actions/discord.ts`
- Matrix：支持 `edit` / `delete`（不暴露 `unsend`）
  - `handleAction` 映射到 `editMessage/deleteMessage`：`extensions/matrix/src/actions.ts`
- Signal：不支持 `edit/delete/unsend`（actions 只包含 `react`，且 `send` 走 outbound）
  - `src/channels/plugins/actions/signal.ts`
- BlueBubbles（iMessage proxy）：支持 `edit` / `unsend`
  - capabilities 声明 `edit: true, unsend: true`：`extensions/bluebubbles/src/channel.ts`
  - `handleAction` 明确实现 `edit` 和 `unsend`，都要求 `messageId`：`extensions/bluebubbles/src/actions.ts`

对 Pure SaaS 的产品策略含义：

- 产品内 DM（`chat.*`）里“编辑/撤回”建议以 SaaS event log 为权威，并把外部渠道动作视为 best-effort 同步。
- 不要假设所有渠道都有 Telegram 式的撤回语义：大多数渠道更接近 `delete`，而不是 `unsend`。

---

## 7. Exec approvals（审批）如何进入 timeline（A 方案）

### 7.1 事件源（已确认）

- `exec.approval.request` 会广播 `exec.approval.requested`
- `exec.approval.resolve` 会广播 `exec.approval.resolved`

实现：`src/gateway/server-methods/exec-approval.ts`

这些 payload 含 `sessionKey` / `agentId` / `command` / `cwd` / `host` / `security` / `ask` 等字段（可直接展示在 timeline item 里）。

### 7.2 权限范围（scope）限制

- `exec.approval.requested/resolved` 事件需要 `operator.approvals`（或 admin）

实现：`src/gateway/server-broadcast.ts`

这意味着：你的 SaaS 后端连接网关时必须用 operator 级连接并包含 approvals scope，才能稳定摄取审批事件并落库。

### 7.3 审批策略配置（不是 timeline 事件，但属于管理面）

- `exec.approvals.get/set`（以及 node 版）用于编辑 allowlist/ask/security 策略文件

实现：`src/gateway/server-methods/exec-approvals.ts`，Control UI controller：`ui/src/ui/controllers/exec-approvals.ts`

---

## 8. 可选：OpenResponses HTTP API（OpenAI 兼容入口）

- Gateway 提供 OpenResponses `/v1/responses`（实现：`src/gateway/openresponses-http.ts`）。

一般建议：
- 你这个产品要做“全功能管理面 + 实时状态 + 审批 + 渠道运维”，WS/RPC（Control UI 用的面）更完整。
- OpenResponses 更适合给外部 API 客户端一个简化入口。

---

## 9. 下一步（继续把 A 方案做成可实现规格）

- 把 `agent` 事件摄取落地成一套 SaaS 侧“工具事件落库规则”（你现在可以直接基于 `src/gateway/server-chat.ts` + `src/agents/pi-embedded-subscribe.handlers.tools.ts` 实现 tool_call/tool_result）。
- 在你的 SaaS / WebUI 里提供一个 per-conversation 的开关：是否开启 tool stream（本质是把该会话的 `verboseLevel` patch 为 `"on"`；方法 `sessions.patch`：`ui/src/ui/controllers/sessions.ts`）。
- 把“Gateway events/RPC -> SaaS `conversation_events`”映射表补全（至少把 `chat`、`exec.approval.*`、`agent(tool/lifecycle)` 覆盖到）。
- 逐渠道确认 edit/delete/unsend 是否符合你的产品语义，并决定：哪些能力只在产品内 DM 提供、哪些能力允许对外渠道 best-effort 同步。
