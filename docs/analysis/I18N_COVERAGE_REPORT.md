# OpenClaw Go i18n覆盖情况调查报告

**生成时间**: 2026-02-03  
**报告版本**: v1.0  
**项目**: OpenClaw Go - 多语言AI助手网关

---

## 📋 执行摘要

本报告详细分析OpenClaw Go项目的国际化(i18n)实现现状。

### ⚠️ 重要范围说明

**本报告仅统计"用户界面层"的i18n覆盖情况**：
- ✅ **包含**: CLI命令、Web UI、配置向导、频道管理界面
- ❌ **排除**: Agent核心、工具执行逻辑、运行时、内部错误

**为什么排除Agent核心？**
- Agent工具 (`src/agents/tools/*`) 是**核心功能**，直接影响AI行为
- Agent内部错误消息是给开发者调试用的，不应翻译
- LLM交互逻辑需要保持英文以确保行为一致性

### 关键数据（仅用户界面层）
- 支持语言: **4种** (英语、简体中文、香港粤语、繁体中文)
- 总翻译条目: **4,240条**
- 已覆盖UI文件: **91个**
- 待覆盖UI文件: **约70个**
- 用户界面覆盖率: **约35%**

---

## 🏗️ 系统架构

### 后端i18n (src/i18n/)

```
src/i18n/
├── index.ts                    # 核心API: t(), setLocale(), getLocale()
├── config.ts                   # 配置初始化: initializeI18nSync()
├── types.ts                    # 类型定义和语言常量
├── locales/
│   ├── en/                     # 英语 (636键)
│   │   ├── index.ts            # 聚合导出
│   │   ├── cli.ts              # CLI命令描述 (235键)
│   │   ├── wizard.ts           # 向导文本 (250键)
│   │   ├── channels.ts         # 频道消息 (80键)
│   │   ├── common.ts           # 通用UI (37键)
│   │   ├── pairing.ts          # 配对消息 (15键)
│   │   └── errors.ts           # 错误消息 (19键)
│   ├── zh-CN/                  # 简体中文 (636键)
│   ├── zh-HK/                  # 香港粤语 (636键)
│   └── zh-TW/                  # 繁体中文 (636键)
└── scripts/                    # 工具脚本
    ├── validate.ts             # 翻译验证
    ├── extract-i18n-keys.ts    # 提取硬编码字符串
    ├── benchmark.ts            # 性能测试
    └── test-runtime.ts         # 运行时测试
```

### 前端i18n (ui/src/i18n/)

```
ui/src/i18n/
├── index.ts                    # 导出: initI18n, changeLanguage
├── config.ts                   # i18next + LanguageDetector配置
├── lit.ts                      # Lit框架集成指令
└── locales/
    ├── en/
    │   ├── common.json         # 通用UI (25键)
    │   └── views.json          # 视图文本 (399键)
    ├── zh-CN/
    ├── zh-HK/
    └── zh-TW/
```

### 支持语言

| 代码 | 语言 | 本地名称 | 状态 |
|------|------|----------|------|
| `en` | 英语 | English | ✅ 完整 |
| `zh-CN` | 简体中文 | 简体中文 | ✅ 完整 |
| `zh-HK` | 香港粤语 | 香港粵語 | ✅ 完整 |
| `zh-TW` | 繁体中文 | 繁體中文 | ✅ 完整 |

---

## ⚠️ 重要：Agent核心文件说明

### 已存在i18n的Agent工具文件（不应再扩展）

以下Agent工具文件**已导入i18n**，但它们属于**核心功能层**，不应再进行额外的i18n扩展：

| 文件 | 当前状态 | 建议 |
|------|----------|------|
| `src/agents/tools/discord-actions-moderation.ts` | 已使用t() | 保持现状，不再添加新翻译 |
| `src/agents/tools/discord-actions-messaging.ts` | 已使用t() | 保持现状，不再添加新翻译 |
| `src/agents/tools/discord-actions-guild.ts` | 已使用t() | 保持现状，不再添加新翻译 |
| `src/agents/tools/slack-actions.ts` | 已使用t() | 保持现状，不再添加新翻译 |
| `src/agents/tools/whatsapp-actions.ts` | 已使用t() | 保持现状，不再添加新翻译 |

**这些文件中的i18n使用现状**:
- 仅用于极少数**用户可见的错误消息**（如 `t("channel.tools.whatsapp.reactionsDisabled")`）
- 不包含工具逻辑的内部文本
- 不应再添加新的翻译键

**为什么不应覆盖Agent工具？**
1. **核心功能稳定性**: Agent工具直接影响AI行为，翻译可能改变语义
2. **调试困难**: 内部错误消息需要保持一致性以便开发者调试
3. **LLM交互**: 与LLM的交互需要保持英文以确保正确理解
4. **测试覆盖**: Agent工具已有完善的测试，添加i18n会增加测试复杂度

---

## 🎯 i18n覆盖范围界定

### ✅ 应该覆盖的范围（用户界面层）

**1. CLI用户界面** (`src/cli/`)
- 命令描述和帮助文本
- 用户提示和确认消息
- 进度和状态消息
- 错误消息（用户可见的）

**2. Web用户界面** (`ui/src/ui/`)
- 视图标题和标签
- 按钮和表单标签
- 提示消息
- 语言切换器

**3. 配置向导** (`src/commands/`, `src/wizard/`)
- 引导流程文本
- 配置提示
- 设置向导

**4. 频道管理界面**
- 频道配置提示
- 状态显示
- 配对消息

### ❌ 不应该覆盖的范围（核心功能层）

**1. Agent核心运行时** (`src/agents/` 除 tools/common.ts 外)
- ❌ Agent工具执行逻辑 (`src/agents/tools/*-actions.ts`)
- ❌ Pi运行时 (`src/agents/pi-embedded-runner/`)
- ❌ 工具策略 (`src/agents/tool-policy.ts`)
- ❌ Agent作用域 (`src/agents/agent-scope.ts`)
- ❌ LLM交互逻辑

**2. 内部错误和调试**
- ❌ 开发者调试消息
- ❌ 内部状态日志
- ❌ 堆栈跟踪

**3. 核心服务逻辑**
- ❌ Gateway协议实现
- ❌ 会话管理核心
- ❌ 沙盒执行逻辑

### 📋 文件分类说明

| 分类 | 示例文件 | i18n覆盖 | 原因 |
|------|----------|----------|------|
| **CLI命令** | `src/cli/plugins-cli.ts` | ✅ 是 | 用户直接交互 |
| **CLI工具函数** | `src/cli/progress.ts` | ✅ 是 | 用户可见消息 |
| **命令实现** | `src/commands/onboard.ts` | ✅ 是 | 用户引导流程 |
| **配置向导** | `src/wizard/onboarding.ts` | ✅ 是 | 用户配置界面 |
| **Web视图** | `ui/src/ui/views/*.ts` | ✅ 是 | Web用户界面 |
| **Agent工具** | `src/agents/tools/discord-actions.ts` | ❌ 否 | 核心功能，Agent内部使用 |
| **Agent运行时** | `src/agents/pi-embedded-runner.ts` | ❌ 否 | 核心运行时 |
| **工具策略** | `src/agents/tool-policy.ts` | ❌ 否 | 核心策略逻辑 |

---

## ✅ 已完成的i18n工作（仅用户界面层）

### 翻译文件统计

| 类别 | 文件 | 键数/语言 | 总计 |
|------|------|-----------|------|
| **后端CLI** | cli.ts | 235 | 940 |
| **后端向导** | wizard.ts | 250 | 1,000 |
| **后端频道** | channels.ts | 80 | 320 |
| **后端通用** | common.ts | 37 | 148 |
| **后端配对** | pairing.ts | 15 | 60 |
| **后端错误** | errors.ts | 19 | 76 |
| **后端小计** | 6文件 | 636 | 2,544 |
| **前端通用** | common.json | 25 | 100 |
| **前端视图** | views.json | 399 | 1,596 |
| **前端小计** | 2文件 | 424 | 1,696 |
| **总计** | 8文件 | 1,060 | **4,240** |

### 文件覆盖率统计（仅用户界面层）

| 类别 | 已覆盖 | 总文件数 | 覆盖率 |
|------|--------|----------|--------|
| **CLI文件** | 53 | 98 | 54% |
| **命令文件** | 11 | 116 | 9% |
| **向导文件** | 3 | 7 | 43% |
| **UI视图** | 19 | 100+ | ~19% |
| **频道监控** | 5 | - | - |
| **总计（用户界面）** | **91** | **200+** | **~35%** |

> 📊 **统计说明**: 
> - 以上统计**仅包含用户界面层**文件
> - **不包含** Agent核心、工具执行逻辑、运行时等核心功能文件
> - Agent工具文件 (`src/agents/tools/*`) 属于核心功能，不在i18n覆盖范围内

### 已覆盖的关键文件列表

#### CLI文件 (53个)

**主要CLI模块**:
- `src/cli/plugins-cli.ts` - 插件管理
- `src/cli/browser-cli.ts` - 浏览器控制
- `src/cli/channels-cli.ts` - 频道管理
- `src/cli/config-cli.ts` - 配置管理
- `src/cli/security-cli.ts` - 安全审计
- `src/cli/models-cli.ts` - 模型配置
- `src/cli/memory-cli.ts` - 内存管理
- `src/cli/hooks-cli.ts` - 钩子管理
- `src/cli/skills-cli.ts` - 技能管理
- `src/cli/exec-approvals-cli.ts` - 执行审批
- `src/cli/devices-cli.ts` - 设备管理
- `src/cli/sandbox-cli.ts` - 沙盒命令
- `src/cli/system-cli.ts` - 系统工具
- `src/cli/pairing-cli.ts` - 配对管理

**Cron CLI**:
- `src/cli/cron-cli/register.ts`
- `src/cli/cron-cli/register.cron-add.ts`
- `src/cli/cron-cli/register.cron-edit.ts`
- `src/cli/cron-cli/register.cron-simple.ts`

**Nodes CLI** (部分):
- `src/cli/nodes-cli/register.ts`
- `src/cli/nodes-cli/register.pairing.ts`
- `src/cli/nodes-cli/register.status.ts`
- `src/cli/nodes-cli/register.canvas.ts`
- `src/cli/nodes-cli/register.camera.ts`
- `src/cli/nodes-cli/register.location.ts`
- `src/cli/nodes-cli/register.invoke.ts`
- `src/cli/nodes-cli/register.screen.ts`
- `src/cli/nodes-cli/register.notify.ts`

**Program CLI**:
- `src/cli/program/build-program.ts`
- `src/cli/program/register.configure.ts`
- `src/cli/program/register.agent.ts`
- `src/cli/program/register.setup.ts`
- `src/cli/program/register.onboard.ts`
- `src/cli/program/register.maintenance.ts`
- `src/cli/program/register.status-health-sessions.ts`
- `src/cli/program/register.message.ts`

**Message CLI**:
- `src/cli/program/message/register.emoji-sticker.ts`
- `src/cli/program/message/register.broadcast.ts`
- `src/cli/program/message/register.pins.ts`
- `src/cli/program/message/register.permissions-search.ts`
- `src/cli/program/message/register.send.ts`
- `src/cli/program/message/register.reactions.ts`
- `src/cli/program/message/register.read-edit-delete.ts`
- `src/cli/program/message/register.thread.ts`
- `src/cli/program/message/register.discord-admin.ts`
- `src/cli/program/message/register.poll.ts`

**Browser CLI**:
- `src/cli/browser-cli-inspect.ts`
- `src/cli/browser-cli-manage.ts`
- `src/cli/browser-cli-state.ts`
- `src/cli/browser-cli-debug.ts`
- `src/cli/browser-cli-extension.ts`
- `src/cli/browser-cli-actions-observe.ts`
- `src/cli/browser-cli-state.cookies-storage.ts`

#### 命令文件 (11个)

**引导命令**:
- `src/commands/onboard.ts` - 主引导入口
- `src/commands/onboard-remote.ts` - 远程引导
- `src/commands/onboard-skills.ts` - 技能引导
- `src/commands/onboard-hooks.ts` - 钩子引导
- `src/commands/onboard-channels.ts` - 频道引导
- `src/commands/onboarding/plugin-install.ts` - 插件安装

**配置命令**:
- `src/commands/configure.gateway.ts` - 网关配置
- `src/commands/configure.wizard.ts` - 配置向导

**工具命令**:
- `src/commands/auth-choice-prompt.ts` - 认证提示
- `src/commands/auth-choice-options.ts` - 认证选项
- `src/commands/model-picker.ts` - 模型选择

#### 向导文件 (3个)

- `src/wizard/onboarding.ts` - 主引导向导
- `src/wizard/onboarding.finalize.ts` - 最终化向导
- `src/wizard/onboarding.gateway-config.ts` - 网关配置向导

#### UI视图 (19个)

**主要视图**:
- `ui/src/ui/views/overview.ts` - 概览
- `ui/src/ui/views/channels.ts` - 频道主视图
- `ui/src/ui/views/skills.ts` - 技能
- `ui/src/ui/views/chat.ts` - 聊天
- `ui/src/ui/views/logs.ts` - 日志
- `ui/src/ui/views/cron.ts` - 定时任务
- `ui/src/ui/views/config.ts` - 配置
- `ui/src/ui/views/debug.ts` - 调试
- `ui/src/ui/views/nodes.ts` - 节点
- `ui/src/ui/views/sessions.ts` - 会话
- `ui/src/ui/views/instances.ts` - 实例
- `ui/src/ui/views/exec-approval.ts` - 执行审批

**频道视图**:
- `ui/src/ui/views/channels.whatsapp.ts` - WhatsApp
- `ui/src/ui/views/channels.slack.ts` - Slack
- `ui/src/ui/views/channels.discord.ts` - Discord
- `ui/src/ui/views/channels.signal.ts` - Signal
- `ui/src/ui/views/channels.imessage.ts` - iMessage

**组件**:
- `ui/src/ui/components/language-switcher.ts` - 语言切换器
- `ui/src/main.ts` - 主入口

#### 其他已覆盖文件 (8个) - 用户界面相关

**配对消息** (用户可见):
- `src/pairing/pairing-messages.ts` ✅ 用户配对提示

**频道命令响应** (用户可见):
- `src/discord/monitor/native-command.ts` ✅ Discord原生命令
- `src/discord/monitor/system-events.ts` ✅ 系统事件通知
- `src/telegram/bot-native-commands.ts` ✅ Telegram命令
- `src/slack/monitor/slash.ts` ✅ Slack斜杠命令
- `src/channels/plugins/actions/signal.ts` ✅ Signal动作提示

**i18n核心模块**:
- `src/i18n/index.ts`
- `src/i18n/config.ts`

#### ❌ 不应覆盖的文件 (Agent核心) - 已从统计中排除

**Agent工具** (核心功能，Agent内部使用):
- `src/agents/tools/discord-actions-moderation.ts` ❌ Agent内部工具
- `src/agents/tools/discord-actions-messaging.ts` ❌ Agent内部工具
- `src/agents/tools/discord-actions-guild.ts` ❌ Agent内部工具
- `src/agents/tools/slack-actions.ts` ❌ Agent内部工具
- `src/agents/tools/whatsapp-actions.ts` ❌ Agent内部工具

> ⚠️ **注意**: 以上Agent工具文件虽然已导入i18n，但它们属于**核心功能层**，不应再进行额外的i18n扩展。它们只应包含极少量的错误消息（给用户看的），不应包含工具逻辑的内部文本。

---

## ⚠️ 未覆盖的文件 (待改进)

### 🔴 高优先级 (~30个文件)

这些文件包含大量用户可见的硬编码英文字符串，影响核心用户体验。

#### CLI文件 (15个)

| 文件 | 问题描述 | 关键字符串示例 |
|------|----------|----------------|
| `src/cli/update-cli.ts` | **最严重** - 更新流程 | STEP_LABELS, UPDATE_QUIPS |
| `src/cli/logs-cli.ts` | 日志查看 | "Log tail truncated", "Log cursor reset" |
| `src/cli/dns-cli.ts` | DNS设置 | "dns setup is currently supported on macOS only" |
| `src/cli/daemon-cli/status.print.ts` | 状态打印 | Cleanup hints |
| `src/cli/daemon-cli/probe.ts` | 探测消息 | "Checking gateway status..." |
| `src/cli/program/help.ts` | 帮助文本 | 帮助生成 |
| `src/cli/help-format.ts` | 格式化 | 帮助格式化 |
| `src/cli/command-format.ts` | 格式化 | 命令格式化 |
| `src/cli/banner.ts` | 横幅 | "OPENCLAW" |
| `src/cli/tagline.ts` | 标语 | Tagline strings |
| `src/cli/progress.ts` | 进度 | "Indexing memory..." |
| `src/cli/run-main.ts` | 错误处理 | "[openclaw] Uncaught exception:" |
| `src/cli/nodes-cli/register.invoke.ts` | 节点调用 | "use --raw or argv, not both" |
| `src/cli/cron-cli/shared.ts` | 定时任务 | "No cron jobs." |
| `src/cli/system-cli.ts` | 系统命令 | 参数验证消息 |

#### 命令文件 (15个)

| 文件 | 问题描述 | 影响 |
|------|----------|------|
| `src/commands/reset.ts` | **破坏性操作确认** | 重置确认提示 |
| `src/commands/uninstall.ts` | **卸载确认** | 卸载流程提示 |
| `src/commands/configure.wizard.ts` | **配置向导** | 配置流程 |
| `src/commands/configure.shared.ts` | 配置共享 | 配置分类标签 |
| `src/commands/doctor.ts` | **诊断主入口** | 诊断开始/结束 |
| `src/commands/doctor-*.ts` | 诊断子命令(10+) | 各类诊断消息 |
| `src/commands/gateway-status.ts` | 网关状态 | 状态检查消息 |
| `src/commands/sandbox-display.ts` | 沙盒显示 | 容器列表显示 |
| `src/commands/channels/add.ts` | 频道添加 | 频道设置流程 |
| `src/commands/channels/remove.ts` | 频道移除 | 移除确认 |
| `src/commands/models/auth.ts` | 模型认证 | 大量认证提示 |
| `src/commands/models/scan.ts` | 模型扫描 | 扫描进度 |
| `src/commands/models/set.ts` | 模型设置 | 设置消息 |
| `src/commands/status*.ts` | 状态检查(多个) | 状态显示 |

### 🟡 中优先级 (~40个文件)

这些文件包含用户可见字符串，但使用频率相对较低。

#### CLI文件 (20个)

**Nodes CLI**:
- `src/cli/nodes-cli/register.canvas.ts`
- `src/cli/nodes-cli/register.screen.ts`
- `src/cli/nodes-cli/register.notify.ts`
- `src/cli/nodes-cli/register.location.ts`
- `src/cli/nodes-cli/register.status.ts`
- `src/cli/nodes-cli/register.pairing.ts`
- `src/cli/nodes-cli/register.camera.ts`
- `src/cli/nodes-cli/format.ts`
- `src/cli/nodes-cli/a2ui-jsonl.ts`
- `src/cli/nodes-cli/cli-utils.ts`

**Cron CLI**:
- `src/cli/cron-cli/register.cron-add.ts`
- `src/cli/cron-cli/register.cron-edit.ts`
- `src/cli/cron-cli/register.cron-simple.ts`

**Browser Action Input**:
- `src/cli/browser-cli-actions-input/register.files-downloads.ts`
- `src/cli/browser-cli-actions-input/register.form-wait-eval.ts`
- `src/cli/browser-cli-actions-input/register.element.ts`
- `src/cli/browser-cli-actions-input/register.navigation.ts`
- `src/cli/browser-cli-actions-input/register.ts`
- `src/cli/browser-cli-actions-input/shared.ts`

**其他**:
- `src/cli/nodes-camera.ts`
- `src/cli/nodes-canvas.ts`
- `src/cli/nodes-screen.ts`
- `src/cli/ports.ts`
- `src/cli/parse-duration.ts`
- `src/cli/directory-cli.ts`
- `src/cli/webhooks-cli.ts`
- `src/cli/outbound-send-deps.ts`
- `src/cli/channel-options.ts`
- `src/cli/channel-auth.ts`

#### 命令文件 (20个)

**Agent命令**:
- `src/commands/agents.commands.add.ts`
- `src/commands/agents.commands.list.ts`
- `src/commands/agents.commands.delete.ts`
- `src/commands/agents.commands.identity.ts`
- `src/commands/agents.config.ts`
- `src/commands/agent.ts`
- `src/commands/agent-via-gateway.ts`

**健康检查**:
- `src/commands/health.ts`
- `src/commands/health-format.ts`
- `src/commands/health.command.ts`

**沙盒**:
- `src/commands/sandbox.ts`
- `src/commands/sandbox-formatters.ts`
- `src/commands/sandbox-explain.ts`

**引导辅助**:
- `src/commands/onboard-helpers.ts`
- `src/commands/onboard-types.ts`
- `src/commands/onboard-non-interactive.gateway.ts`
- `src/commands/onboard-non-interactive.token.ts`

**认证**:
- `src/commands/auth-choice.apply.*.ts` (多个provider)
- `src/commands/chutes-oauth.ts`
- `src/commands/oauth-flow.ts`
- `src/commands/oauth-env.ts`

**其他**:
- `src/commands/setup.ts`
- `src/commands/docs.ts`
- `src/commands/dashboard.ts`
- `src/commands/signal-install.ts`
- `src/commands/daemon-runtime.ts`
- `src/commands/node-daemon-runtime.ts`
- `src/commands/message.ts`
- `src/commands/openai-codex-model-default.ts`
- `src/commands/google-gemini-model-default.ts`

### 🟢 低优先级 (~20个文件)

这些文件主要是内部工具或格式化函数，用户可见字符串较少。

#### 向导文件 (2个)

- `src/wizard/session.ts`
- `src/wizard/clack-prompter.ts`

#### 终端工具 (5个)

- `src/terminal/prompt-style.ts`
- `src/terminal/note.ts`
- `src/terminal/theme.ts`
- `src/terminal/table.ts`
- `src/terminal/links.ts`

---

## 📊 详细统计数据

### 翻译键分布

```
后端翻译键 (636个):
├── cli.*          235键  (36.9%)  CLI命令描述
├── wizard.*       250键  (39.3%)  向导文本
├── channels.*      80键  (12.6%)  频道消息
├── common.*        37键   (5.8%)  通用UI
├── pairing.*       15键   (2.4%)  配对消息
└── errors.*        19键   (3.0%)  错误消息

前端翻译键 (424个):
├── common.*        25键   (5.9%)  通用UI
└── views.*        399键  (94.1%)  视图文本
```

### 按文件类型的覆盖情况

| 目录 | 文件总数 | 已覆盖 | 未覆盖 | 覆盖率 |
|------|----------|--------|--------|--------|
| `src/cli/*.ts` | 50+ | 27 | 23+ | 54% |
| `src/cli/cron-cli/` | 5 | 4 | 1 | 80% |
| `src/cli/nodes-cli/` | 12 | 9 | 3 | 75% |
| `src/cli/program/` | 15 | 14 | 1 | 93% |
| `src/cli/daemon-cli/` | 8 | 0 | 8 | 0% |
| `src/cli/browser-cli*.ts` | 10 | 8 | 2 | 80% |
| `src/commands/*.ts` | 60+ | 11 | 49+ | 18% |
| `src/commands/channels/` | 8 | 0 | 8 | 0% |
| `src/commands/models/` | 10 | 0 | 10 | 0% |
| `src/commands/doctor*.ts` | 15 | 0 | 15 | 0% |
| `src/wizard/*.ts` | 7 | 3 | 4 | 43% |
| `ui/src/ui/views/*.ts` | 25+ | 19 | 6+ | 76% |

### i18n使用模式

**已使用i18n的文件**:
```typescript
import { t } from "../i18n/index.js";
// 或
import { t } from "../../i18n/index.js";

// 使用示例
program
  .command('plugins')
  .description(t('cli.plugins.description'));

console.log(t('cli.progress.loading'));
```

**83个文件**使用此模式导入和使用i18n。

---

## 🎯 改进计划建议

### 阶段1: 关键用户流程 (高影响)

**目标**: 确保最常用的用户界面命令完全国际化
**范围**: 仅限CLI命令和向导，不涉及Agent核心

1. **update-cli.ts** (1个文件)
   - 影响: 所有用户更新时可见
   - 工作量: 约30个新翻译键
   - 类型: ✅ CLI命令（用户界面层）

2. **reset.ts & uninstall.ts** (2个文件)
   - 影响: 破坏性操作确认
   - 工作量: 约20个新翻译键
   - 类型: ✅ 用户命令（用户界面层）

3. **configure.wizard.ts** (1个文件)
   - 影响: 配置流程
   - 工作量: 约40个新翻译键
   - 类型: ✅ 配置向导（用户界面层）

4. **doctor.ts + doctor-*.ts** (10+个文件)
   - 影响: 诊断消息（用户可见）
   - 工作量: 约100个新翻译键
   - 类型: ✅ 诊断工具（用户界面层）

**阶段1总计**: 约14个文件，190个新翻译键
**明确排除**: Agent工具、运行时逻辑、内部错误消息

### 阶段2: 日常使用命令 (中影响)

**目标**: 覆盖常用的管理命令

1. **logs-cli.ts** (1个文件)
   - 日志查看功能
   - 约15个新翻译键

2. **models/*.ts** (10个文件)
   - 模型管理
   - 约80个新翻译键

3. **status*.ts** (5个文件)
   - 状态检查
   - 约50个新翻译键

4. **channels/*.ts** (8个文件)
   - 频道管理
   - 约40个新翻译键

**阶段2总计**: 约24个文件，185个新翻译键

### 阶段3: 边缘功能 (低影响)

**目标**: 完善剩余功能

1. **nodes-cli/*.ts** (剩余文件)
2. **cron-cli/*.ts** (剩余文件)
3. **terminal/*.ts**
4. **其他命令文件**

**阶段3总计**: 约32个文件，125个新翻译键

### 完整改进预估

| 阶段 | 文件数 | 新翻译键 | 预计工时 |
|------|--------|----------|----------|
| 阶段1 | 14 | 190 | 2-3天 |
| 阶段2 | 24 | 185 | 3-4天 |
| 阶段3 | 32 | 125 | 2-3天 |
| **总计** | **70** | **500** | **7-10天** |

---

## 🛠️ 行动指南

### 开发工具

**1. 提取硬编码字符串脚本**
```bash
# 查找所有硬编码的用户可见字符串
pnpm tsx src/i18n/scripts/extract-i18n-keys.ts
```

**2. 验证翻译完整性**
```bash
# 检查所有语言是否包含相同的键
pnpm tsx src/i18n/scripts/validate.ts
```

**3. 统计硬编码字符串**
```bash
# 统计console.log中的用户可见字符串
grep -r "console\.log\(" src/cli/*.ts src/commands/*.ts | wc -l

# 查找message:开头的提示(未使用i18n)
grep -r 'message: "[^t]' src/commands/*.ts | wc -l
```

### 添加i18n的标准流程

**步骤1: 识别需要翻译的字符串**
```typescript
// 修改前 (reset.ts)
intro("Reset scope");
const scope = await select({
  message: "Reset scope",
  options: [
    { value: "config", label: "Config only" },
    { value: "full", label: "Full reset" },
  ],
});
```

**步骤2: 添加导入**
```typescript
import { t } from "../i18n/index.js";
```

**步骤3: 替换字符串为翻译键**
```typescript
// 修改后
intro(t('reset.scope.intro'));
const scope = await select({
  message: t('reset.scope.message'),
  options: [
    { value: "config", label: t('reset.scope.config') },
    { value: "full", label: t('reset.scope.full') },
  ],
});
```

**步骤4: 添加英语翻译** (`src/i18n/locales/en/common.ts`)
```typescript
export const commonMessages = {
  // 添加新键
  "reset.scope.intro": "Reset scope",
  "reset.scope.message": "Reset scope",
  "reset.scope.config": "Config only",
  "reset.scope.full": "Full reset",
};
```

**步骤5: 添加中文翻译** (`src/i18n/locales/zh-CN/common.ts`)
```typescript
export const commonMessages = {
  // 添加翻译
  "reset.scope.intro": "重置范围",
  "reset.scope.message": "选择重置范围",
  "reset.scope.config": "仅重置配置",
  "reset.scope.full": "完全重置",
};
```

**步骤6: 验证**
```bash
pnpm tsx src/i18n/scripts/validate.ts
```

### 翻译键命名规范

```
{模块}.{功能}.{描述}

示例:
- cli.plugins.description
- wizard.onboarding.welcome
- channels.discord.webhook_url
- common.buttons.yes
- errors.network.timeout
```

### 质量保证检查清单

- [ ] 所有新字符串都使用 `t()` 函数
- [ ] 英语翻译已添加到 `src/i18n/locales/en/*.ts`
- [ ] 中文翻译已添加到 `src/i18n/locales/zh-CN/*.ts`
- [ ] 香港粤语翻译已添加到 `src/i18n/locales/zh-HK/*.ts`
- [ ] 繁体中文翻译已添加到 `src/i18n/locales/zh-TW/*.ts`
- [ ] 运行 `pnpm tsx src/i18n/scripts/validate.ts` 无错误
- [ ] 代码审查通过

---

## 📚 相关资源

### 现有文档

- `src/i18n/USAGE.md` - i18n使用指南
- `docs/.i18n/README.md` - i18n项目概述
- `docs/analysis/ONBOARDING_TRANSLATION_GAPS.md` - 引导翻译差距分析
- `TRANSLATION_TASKS.md` - 翻译任务清单
- `TRANSLATION_IMPLEMENTATION_REPORT.md` - 翻译实现报告

### 代码示例

- `src/i18n/examples/basic-usage.ts` - 基础使用示例
- `src/commands/onboard.ts` - 完整的i18n集成示例

### 脚本工具

- `src/i18n/scripts/validate.ts` - 翻译验证
- `src/i18n/scripts/extract-i18n-keys.ts` - 提取键
- `src/i18n/scripts/benchmark.ts` - 性能测试

---

## 📈 成功指标

### 当前状态
- 总体覆盖率: **32%**
- 后端覆盖率: **54%** (CLI文件)
- 前端覆盖率: **76%** (UI视图)
- 命令覆盖率: **9%** (需重点改进)

### 阶段目标

| 阶段 | 目标覆盖率 | 预计时间 |
|------|------------|----------|
| 阶段1完成 | 37% | 1周 |
| 阶段2完成 | 45% | 2周 |
| 阶段3完成 | 55% | 3周 |
| 长期目标 | 80%+ | 2个月 |

---

## 📝 总结

OpenClaw Go项目已建立了**完整的i18n基础设施**，支持4种语言的翻译，包含4,240个翻译条目。本报告统计范围**仅限于用户界面层**（CLI命令、Web UI、配置向导），不包括Agent核心功能。

### 覆盖范围界定

**✅ 已覆盖（用户界面层）**:
- 53个CLI文件（54%覆盖率）
- 19个Web UI视图（76%覆盖率）
- 11个命令文件（9%覆盖率，需改进）
- 3个向导文件（43%覆盖率）
- 5个频道监控文件

**❌ 明确排除（核心功能层）**:
- Agent工具执行逻辑 (`src/agents/tools/*`)
- Pi运行时和Agent核心
- LLM交互逻辑
- 内部错误和调试消息

### 主要优势
- ✅ 完整的i18n架构（后端 + 前端）
- ✅ 4种语言支持
- ✅ 核心CLI和Web UI已翻译
- ✅ 自动化验证工具
- ✅ 4,240个翻译条目

### 主要差距（仅UI层）
- ⚠️ 命令文件覆盖率仅9%
- ⚠️ 约70个用户界面文件仍需i18n
- ⚠️ 诊断工具(doctor)完全未翻译
- ⚠️ 模型管理命令未翻译

### 明确边界示例

| 文件 | 分类 | i18n? | 说明 |
|------|------|-------|------|
| `src/cli/plugins-cli.ts` | CLI命令 | ✅ | 用户直接看到的命令描述 |
| `src/commands/onboard.ts` | 引导命令 | ✅ | 用户配置向导 |
| `ui/src/ui/views/*.ts` | Web视图 | ✅ | Web界面文本 |
| `src/agents/tools/discord-actions.ts` | Agent工具 | ❌ | 核心功能，Agent内部使用 |
| `src/agents/pi-embedded-runner.ts` | Agent运行时 | ❌ | 核心运行时，不应翻译 |

### 建议优先级（仅UI层）
1. **立即**: update-cli, reset, uninstall, configure.wizard
2. **短期**: doctor工具, models/*, status*, channels/*
3. **中期**: 剩余CLI文件
4. **长期**: 终端工具, 边缘功能

**预计工作量**: 7-10天开发时间，增加约500个新翻译键（仅用户界面层）。

---

*报告生成: 2026-02-03*  
*版本: v1.0*  
*作者: OpenClaw Go开发团队*
