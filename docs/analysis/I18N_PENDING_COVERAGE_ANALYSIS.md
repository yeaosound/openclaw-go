# i18n待覆盖文件分析报告

**生成时间**: 2026-02-03  
**分析范围**: 仅用户界面层（CLI、Web UI、命令）

---

## 📊 总体情况

| 类别 | 总数 | 已覆盖 | 未覆盖 | 覆盖率 |
|------|------|--------|--------|--------|
| **CLI文件** | 98 | 53 | 45 | 54% |
| **命令文件** | 116 | 11 | 105 | 9% |
| **UI视图** | 35 | 29 | 6 | 83% |
| **总计** | 249 | 93 | 156 | 37% |

---

## ✅ 已覆盖的文件（符合要求）

### CLI文件 (53个)

**主CLI模块**:
- `plugins-cli.ts` ✅
- `browser-cli.ts` ✅
- `browser-cli-state.ts` ✅
- `browser-cli-manage.ts` ✅
- `browser-cli-inspect.ts` ✅
- `browser-cli-debug.ts` ✅
- `browser-cli-extension.ts` ✅
- `browser-cli-actions-observe.ts` ✅
- `browser-cli-state.cookies-storage.ts` ✅
- `system-cli.ts` ✅
- `channels-cli.ts` ✅
- `config-cli.ts` ✅
- `security-cli.ts` ✅
- `models-cli.ts` ✅
- `memory-cli.ts` ✅
- `hooks-cli.ts` ✅
- `skills-cli.ts` ✅
- `exec-approvals-cli.ts` ✅
- `devices-cli.ts` ✅
- `sandbox-cli.ts` ✅
- `pairing-cli.ts` ✅

**Cron CLI** (4个):
- `cron-cli/register.ts` ✅
- `cron-cli/register.cron-add.ts` ✅
- `cron-cli/register.cron-edit.ts` ✅
- `cron-cli/register.cron-simple.ts` ✅

**Nodes CLI** (8个):
- `nodes-cli/register.ts` ✅
- `nodes-cli/register.pairing.ts` ✅
- `nodes-cli/register.status.ts` ✅
- `nodes-cli/register.camera.ts` ✅
- `nodes-cli/register.canvas.ts` ✅
- `nodes-cli/register.location.ts` ✅
- `nodes-cli/register.invoke.ts` ✅
- `nodes-cli/register.screen.ts` ✅
- `nodes-cli/register.notify.ts` ✅

**Gateway CLI**:
- `gateway-cli/register.ts` ✅

**Program CLI** (11个):
- `program/build-program.ts` ✅ (initializeI18nSync)
- `program/register.configure.ts` ✅
- `program/register.agent.ts` ✅
- `program/register.setup.ts` ✅
- `program/register.onboard.ts` ✅
- `program/register.maintenance.ts` ✅
- `program/register.status-health-sessions.ts` ✅
- `program/register.message.ts` ✅
- `program/message/register.broadcast.ts` ✅
- `program/message/register.emoji-sticker.ts` ✅
- `program/message/register.pins.ts` ✅
- `program/message/register.permissions-search.ts` ✅
- `program/message/register.send.ts` ✅
- `program/message/register.reactions.ts` ✅
- `program/message/register.read-edit-delete.ts` ✅
- `program/message/register.thread.ts` ✅
- `program/message/register.discord-admin.ts` ✅
- `program/message/register.poll.ts` ✅

### 命令文件 (11个)

- `onboard.ts` ✅
- `onboard-remote.ts` ✅
- `onboard-skills.ts` ✅
- `onboard-hooks.ts` ✅
- `onboard-channels.ts` ✅
- `configure.gateway.ts` ✅
- `configure.wizard.ts` ✅
- `auth-choice-prompt.ts` ✅
- `auth-choice-options.ts` ✅
- `model-picker.ts` ✅

### UI视图 (29个)

- `overview.ts` ✅
- `channels.ts` ✅
- `channels.whatsapp.ts` ✅
- `channels.slack.ts` ✅
- `channels.discord.ts` ✅
- `channels.signal.ts` ✅
- `channels.imessage.ts` ✅
- `skills.ts` ✅
- `logs.ts` ✅
- `cron.ts` ✅
- `config.ts` ✅
- `chat.ts` ✅
- `debug.ts` ✅
- `nodes.ts` ✅
- `sessions.ts` ✅
- `instances.ts` ✅
- `exec-approval.ts` ✅
- `gateway-url-confirmation.ts` ✅
- `markdown-sidebar.ts` ✅
- 以及9个其他视图文件

---

## 🔴 高优先级 - 需要尽快覆盖

### 1. update-cli.ts (CLI) 🔴🔴🔴

**影响**: 所有用户更新时可见  
**工作量**: 约50个新翻译键  
**状态**: 严重未覆盖

**硬编码内容**:
```typescript
// 步骤标签 (17个)
const STEP_LABELS: Record<string, string> = {
  "clean check": "Working directory is clean",
  "upstream check": "Upstream branch exists",
  "git fetch": "Fetching latest changes",
  // ... 14 more
  "global update": "Updating via package manager",
};

// 俏皮话 (23个)
const UPDATE_QUIPS = [
  "Leveled up! New skills unlocked. You're welcome.",
  "Fresh code, same lobster. Miss me?",
  // ... 21 more
];
```

**建议翻译键**:
- `update.step.cleanCheck`
- `update.step.upstreamCheck`
- `update.quip.levelUp`
- `update.quip.freshCode`

### 2. reset.ts (命令) 🔴🔴🔴

**影响**: 破坏性操作确认，所有用户可见  
**工作量**: 约15个新翻译键  
**状态**: 未覆盖

**硬编码内容**:
```typescript
// 重置范围选项
const scopeOptions = [
  { value: "config", label: "Config only", hint: "Reset config to defaults" },
  { value: "config+creds+sessions", label: "Config, credentials, and sessions", hint: "Also removes credentials and agent sessions" },
  { value: "full", label: "Full reset", hint: "Removes everything including plugins" },
];

// 确认消息
"This will ${dryRun ? "simulate" : "perform"} a ${scope} reset..."
"Continue?"
"Reset cancelled."
"Reset complete."
```

**建议翻译键**:
- `reset.scope.config`
- `reset.scope.configCredsSessions`
- `reset.scope.full`
- `reset.confirm.message`
- `reset.cancelled`
- `reset.complete`

### 3. doctor.ts + doctor-*.ts (命令) 🔴🔴🔴

**影响**: 诊断工具，所有用户使用  
**工作量**: 约100个新翻译键  
**状态**: 10+个文件未覆盖

**未覆盖文件列表**:
1. `doctor.ts` - 主诊断入口
2. `doctor-config-flow.ts`
3. `doctor-gateway-daemon-flow.ts`
4. `doctor-gateway-health.ts`
5. `doctor-gateway-services.ts`
6. `doctor-install.ts`
7. `doctor-prompter.ts`
8. `doctor-security.ts`
9. `doctor-state-integrity.ts`
10. `doctor-update.ts`
11. `doctor-workspace.ts`
12. `doctor-auth.ts`

**硬编码内容** (doctor.ts):
```typescript
intro("OpenClaw doctor");
// ...
outro("Doctor complete.");
outro("Gateway token configured.");
```

**建议翻译键**:
- `doctor.intro`
- `doctor.complete`
- `doctor.gatewayTokenConfigured`

### 4. uninstall.ts (命令) 🔴🔴

**影响**: 卸载确认  
**工作量**: 约10个新翻译键  
**状态**: 未覆盖

### 5. logs-cli.ts (CLI) 🔴🔴

**影响**: 日志查看，常用功能  
**工作量**: 约20个新翻译键  
**状态**: 未覆盖

**硬编码内容**:
```typescript
"Log tail truncated"
"Log cursor reset"
"No logs found"
```

### 6. configure.shared.ts (命令) 🔴🔴

**影响**: 配置共享，配置流程的一部分  
**工作量**: 约15个新翻译键  
**状态**: 未覆盖

**硬编码内容**:
```typescript
"Workspace"
"Model"
"Web tools"
"Gateway"
"Daemon"
"Channels"
"Skills"
```

---

## 🟡 中优先级 - 建议覆盖

### CLI文件 (15个)

| 文件 | 影响 | 工作量 | 说明 |
|------|------|--------|------|
| `logs-cli.ts` | 高 | 20键 | 日志查看，常用功能 |
| `dns-cli.ts` | 中 | 10键 | DNS设置 |
| `banner.ts` | 低 | 5键 | 启动横幅 |
| `tagline.ts` | 低 | 5键 | 标语 |
| `progress.ts` | 中 | 10键 | 进度显示 |
| `command-format.ts` | 低 | 5键 | 命令格式化 |
| `help-format.ts` | 中 | 15键 | 帮助格式化 |
| `webhooks-cli.ts` | 中 | 10键 | Webhook管理 |
| `directory-cli.ts` | 低 | 5键 | 目录管理 |
| `daemon-cli/register.ts` | 中 | 15键 | Daemon注册 |
| `daemon-cli/status.ts` | 中 | 15键 | Daemon状态 |
| `daemon-cli/install.ts` | 中 | 15键 | Daemon安装 |
| `cron-cli/shared.ts` | 低 | 5键 | Cron共享 |
| `nodes-cli/format.ts` | 低 | 5键 | 节点格式化 |
| `nodes-cli/cli-utils.ts` | 低 | 5键 | 节点工具 |

### 命令文件 - 模型相关 (10个)

| 文件 | 影响 | 工作量 | 说明 |
|------|------|--------|------|
| `models/auth.ts` | 高 | 30键 | 模型认证，大量提示 |
| `models/scan.ts` | 中 | 15键 | 模型扫描 |
| `models/set.ts` | 中 | 10键 | 模型设置 |
| `models/list.ts` | 中 | 10键 | 模型列表 |
| `models/shared.ts` | 低 | 5键 | 模型共享 |

### 命令文件 - Agent相关 (10个)

| 文件 | 影响 | 工作量 | 说明 |
|------|------|--------|------|
| `agents.commands.add.ts` | 高 | 20键 | 添加Agent |
| `agents.commands.list.ts` | 中 | 10键 | 列出Agent |
| `agents.commands.delete.ts` | 中 | 10键 | 删除Agent |
| `agent.ts` | 高 | 20键 | Agent主命令 |

### 命令文件 - 状态相关 (10个)

| 文件 | 影响 | 工作量 | 说明 |
|------|------|--------|------|
| `status.command.ts` | 中 | 15键 | 状态命令 |
| `status.scan.ts` | 中 | 10键 | 状态扫描 |
| `status.summary.ts` | 低 | 5键 | 状态摘要 |
| `status-all.ts` | 中 | 15键 | 完整状态 |

### 命令文件 - 频道相关 (8个)

| 文件 | 影响 | 工作量 | 说明 |
|------|------|--------|------|
| `channels/add.ts` | 高 | 20键 | 添加频道 |
| `channels/remove.ts` | 高 | 15键 | 移除频道 |
| `channels/list.ts` | 中 | 10键 | 频道列表 |

### UI视图 (6个)

| 文件 | 影响 | 工作量 | 说明 |
|------|------|--------|------|
| `channels.telegram.ts` | 中 | 15键 | Telegram配置 |
| `channels.googlechat.ts` | 低 | 10键 | Google Chat配置 |
| `channels.nostr.ts` | 低 | 10键 | Nostr配置 |
| `config-form.ts` | 中 | 20键 | 配置表单 |

---

## 🟢 低优先级 - 可选覆盖

### CLI文件 - 工具类 (10个)

这些文件主要是内部工具或格式化函数，用户可见字符串较少：

- `cli-name.ts` - CLI名称解析
- `cli-utils.ts` - CLI工具
- `command-options.ts` - 命令选项
- `completion-cli.ts` - 自动完成
- `channel-auth.ts` - 频道认证
- `channel-options.ts` - 频道选项
- `browser-cli-shared.ts` - 浏览器共享
- `browser-cli-actions-input.ts` - 浏览器输入
- `browser-cli-examples.ts` - 浏览器示例
- `argv.ts` - 参数解析

### 命令文件 - 边缘功能 (20个)

- `setup.ts` - 设置
- `docs.ts` - 文档
- `dashboard.ts` - 仪表盘
- `signal-install.ts` - Signal安装
- `daemon-runtime.ts` - Daemon运行时
- `sandbox-display.ts` - 沙盒显示
- `sandbox-formatters.ts` - 沙盒格式化
- `health.ts` - 健康检查
- `health-format.ts` - 健康格式化

### 向导文件 (4个)

- `wizard/session.ts` - 会话向导
- `wizard/clack-prompter.ts` - 提示器
- `wizard/prompts.ts` - 提示
- `wizard/onboarding.types.ts` - 类型定义

### 终端工具 (5个)

- `terminal/prompt-style.ts` - 提示样式
- `terminal/note.ts` - 笔记
- `terminal/theme.ts` - 主题
- `terminal/table.ts` - 表格
- `terminal/links.ts` - 链接

---

## ❌ 不需要覆盖的文件

### 测试文件
所有 `*.test.ts` 文件不需要i18n。

### Agent核心
- `src/agents/*.ts` (非tools目录)
- `src/agents/pi-embedded-runner/*`
- `src/agents/tools/*` - 已覆盖错误消息，不应再扩展

---

## 📈 优先级矩阵

```
影响程度 ↑
    高 │  update-cli    reset    doctor    models/auth
       │  channels/add  agent    uninstall
       │
    中 │  logs-cli      status   configure.shared
       │  dns-cli       gateway-status
       │
    低 │  banner        tagline  progress
       │  theme         table    links
       └────────────────────────────────────→ 工作量
          低          中          高
```

---

## 🎯 实施建议

### 阶段1: 核心用户流程 (1-2周)

**目标**: 确保最常用的命令完全国际化
**文件数**: 8个
**预计翻译键**: 200个

1. **update-cli.ts** (1个文件, 50键)
   - 影响: 所有用户更新时可见
   - 重点: STEP_LABELS, UPDATE_QUIPS

2. **reset.ts** (1个文件, 15键)
   - 影响: 破坏性操作确认
   - 重点: 重置选项、确认消息

3. **doctor.ts + 5个子文件** (6个文件, 100键)
   - 影响: 诊断工具
   - 重点: 主入口、配置检查、网关检查

4. **uninstall.ts** (1个文件, 10键)
   - 影响: 卸载流程

5. **configure.shared.ts** (1个文件, 15键)
   - 影响: 配置流程

### 阶段2: 常用管理命令 (2-3周)

**目标**: 覆盖日常管理命令
**文件数**: 25个
**预计翻译键**: 250个

**CLI** (5个):
- logs-cli.ts (20键)
- dns-cli.ts (10键)
- webhooks-cli.ts (10键)
- daemon-cli/* (45键)

**命令** (20个):
- models/* (65键)
- agents.commands.* (40键)
- channels/* (45键)
- status*.ts (40键)

### 阶段3: 完善覆盖 (2-3周)

**目标**: 完善剩余UI层
**文件数**: 40个
**预计翻译键**: 200个

**CLI** (15个):
- 工具类CLI文件

**命令** (20个):
- 边缘功能命令

**UI** (6个):
- 剩余视图文件

### 阶段4: 细节优化 (1周)

**目标**: 终端工具和格式化
**文件数**: 10个
**预计翻译键**: 50个

- terminal/*
- wizard/* (剩余)

---

## 📊 工作量估算

| 阶段 | 文件数 | 新翻译键 | 预计工时 |
|------|--------|----------|----------|
| 阶段1: 核心流程 | 8 | 200 | 3-4天 |
| 阶段2: 常用命令 | 25 | 250 | 5-7天 |
| 阶段3: 完善覆盖 | 40 | 200 | 5-7天 |
| 阶段4: 细节优化 | 10 | 50 | 2-3天 |
| **总计** | **83** | **700** | **15-21天** |

---

## 🔍 关键发现

### 1. 最严重缺口

**update-cli.ts** - 包含大量用户可见的硬编码字符串：
- 17个步骤标签
- 23个完成俏皮话
- 多个进度消息
- 错误提示

**影响**: 所有用户在更新时都会看到这些英文文本

### 2. 配置流程不完整

**configure.wizard.ts** 有i18n，但 **configure.shared.ts** 没有：
- 配置分类标签未翻译
- 配置选项提示未翻译

**影响**: 配置向导体验不一致

### 3. Doctor工具完全未覆盖

10+个doctor相关文件完全没有i18n：
- 诊断消息
- 修复提示
- 状态报告

**影响**: 诊断工具全英文输出

### 4. 模型管理未覆盖

models/* 文件完全没有i18n：
- 模型认证提示
- 扫描进度
- 设置确认

**影响**: 模型配置全英文

---

## 💡 快速行动清单

### 本周可做

1. **update-cli.ts** (高影响)
   ```bash
   # 提取硬编码字符串
   grep -n '"' src/cli/update-cli.ts | grep -E '(STEP_LABELS|UPDATE_QUIPS|message|label)'
   ```

2. **reset.ts** (高影响)
   ```bash
   # 查看重置选项
   grep -n 'label\|hint\|message' src/commands/reset.ts
   ```

3. **doctor.ts** (高影响)
   ```bash
   # 查看诊断消息
   grep -n 'intro\|outro\|message' src/commands/doctor.ts
   ```

### 验证脚本

```bash
# 统计CLI文件i18n覆盖率
echo "CLI覆盖率:"
ls src/cli/*.ts | wc -l
ls src/cli/*.ts | xargs grep -l "from.*i18n" | wc -l

# 统计命令文件i18n覆盖率  
echo "命令覆盖率:"
ls src/commands/*.ts | grep -v test | wc -l
ls src/commands/*.ts | xargs grep -l "from.*i18n" 2>/dev/null | wc -l

# 统计UI视图i18n覆盖率
echo "UI覆盖率:"
ls ui/src/ui/views/*.ts | wc -l
ls ui/src/ui/views/*.ts | xargs grep -l "from.*i18n" 2>/dev/null | wc -l
```

---

## 📝 总结

### 当前状态
- **已覆盖**: 93个文件 (37%)
- **待覆盖**: 156个文件 (63%)
- **总计**: 249个文件

### 优先级分布
- 🔴 **高优先级**: 12个文件 (核心用户流程)
- 🟡 **中优先级**: 50个文件 (常用功能)
- 🟢 **低优先级**: 35个文件 (边缘功能)
- ❌ **不需要**: 59个文件 (测试、核心)

### 建议
1. **立即开始**: update-cli.ts, reset.ts, doctor.ts (本周)
2. **下周继续**: models/auth.ts, channels/add.ts, agents.commands.*
3. **持续改进**: 按阶段计划逐步覆盖

### 预计工作量
- **总计**: 15-21天开发时间
- **新增翻译键**: 约700个
- **完成后覆盖率**: 从37%提升到80%+

---

*报告生成: 2026-02-03*  
*版本: v1.0*  
*分析范围: 仅用户界面层*
