# OpenClaw Go 项目 i18n 准确检查报告（修正版）

**检查时间**: 2026-02-04  
**修正说明**: 之前报告中的统计数据有误，本次检查仅统计源文件（不包括测试文件）

---

## 📊 准确统计（仅源文件，不包括测试）

### 总体覆盖率

| 层面 | 总文件数 | 已i18n | 未i18n | 覆盖率 |
|------|---------|--------|--------|--------|
| **CLI** | 138 | 22 | 116 | **16%** |
| **Commands** | 116 | 10 | 106 | **9%** |
| **Wizard** | 10 | 3 | 7 | **30%** |
| **WebUI** | 32 | 19 | 13 | **59%** |

**注意**: 之前报告包含了测试文件（.test.ts），导致统计数据不准确。

---

## ✅ 已完成的i18n工作（优秀）

### CLI文件（22个已覆盖）

| 文件 | t()调用数 | 重要性 |
|------|----------|--------|
| **update-cli.ts** | 124 | ⭐⭐⭐ 核心 |
| **exec-approvals-cli.ts** | 44 | ⭐⭐⭐ 高 |
| **models-cli.ts** | 41 | ⭐⭐⭐ 高 |
| **hooks-cli.ts** | 38 | ⭐⭐ 中 |
| **browser-cli-state.ts** | 34 | ⭐⭐ 中 |
| **browser-cli-manage.ts** | 33 | ⭐⭐ 中 |
| **config-cli.ts** | 31 | ⭐⭐⭐ 高 |
| **plugins-cli.ts** | 26 | ⭐⭐ 中 |
| **skills-cli.ts** | 19 | ⭐⭐ 中 |
| **channels-cli.ts** | 14 | ⭐⭐ 中 |
| **system-cli.ts** | 13 | ⭐⭐ 中 |
| **memory-cli.ts** | 13 | ⭐⭐ 中 |
| **devices-cli.ts** | 12 | ⭐⭐ 中 |
| **sandbox-cli.ts** | 10 | ⭐⭐ 中 |
| 其他8个文件 | <10 | ⭐ 低 |

### Commands文件（10个已覆盖）

| 文件 | t()调用数 | 重要性 |
|------|----------|--------|
| **onboard-channels.ts** | 65 | ⭐⭐⭐ 核心 |
| **onboard-skills.ts** | 27 | ⭐⭐⭐ 核心 |
| **configure.gateway.ts** | 26 | ⭐⭐⭐ 高 |
| **onboard-remote.ts** | 25 | ⭐⭐⭐ 核心 |
| **doctor.ts** | 23 | ⭐⭐⭐ 核心 |
| **model-picker.ts** | 21 | ⭐⭐⭐ 高 |
| **reset.ts** | 19 | ⭐⭐⭐ 核心 |
| **configure.wizard.ts** | 15 | ⭐⭐⭐ 高 |
| **onboard-hooks.ts** | 8 | ⭐⭐ 中 |
| **onboard.ts** | 5 | ⭐⭐⭐ 核心 |

### Wizard文件（3个已覆盖）

| 文件 | t()调用数 | 重要性 |
|------|----------|--------|
| **onboarding.finalize.ts** | 77 | ⭐⭐⭐ 核心 |
| **onboarding.ts** | 73 | ⭐⭐⭐ 核心 |
| **onboarding.gateway-config.ts** | 39 | ⭐⭐⭐ 核心 |

### WebUI视图（19个已覆盖，59%覆盖率）

| 文件 | 状态 | 说明 |
|------|------|------|
| **channels.discord.ts** | ✅ | Discord配置 |
| **channels.imessage.ts** | ✅ | iMessage配置 |
| **channels.signal.ts** | ✅ | Signal配置 |
| **channels.slack.ts** | ✅ | Slack配置 |
| **channels.whatsapp.ts** | ✅ | WhatsApp配置 |
| **channels.ts** | ✅ | 频道主视图 |
| **chat.ts** | ✅ | 聊天视图 |
| **config.ts** | ✅ | 配置视图 |
| **cron.ts** | ✅ | 定时任务 |
| **debug.ts** | ✅ | 调试视图 |
| **exec-approval.ts** | ✅ | 执行审批 |
| **gateway-url-confirmation.ts** | ✅ | 网关URL确认 |
| **instances.ts** | ✅ | 实例视图 |
| **logs.ts** | ✅ | 日志视图 |
| **markdown-sidebar.ts** | ✅ | Markdown侧边栏 |
| **nodes.ts** | ✅ | 节点视图 |
| **overview.ts** | ✅ | 概览 |
| **sessions.ts** | ✅ | 会话视图 |
| **skills.ts** | ✅ | 技能视图 |

**未覆盖的WebUI（13个）**:
- ❌ agents.ts
- ❌ channels.config.ts
- ❌ channels.googlechat.ts
- ❌ channels.nostr-profile-form.ts
- ❌ channels.nostr.ts
- ❌ channels.shared.ts
- ❌ channels.telegram.ts
- ❌ channels.types.ts
- ❌ config-form.analyze.ts
- ❌ config-form.node.ts
- ❌ config-form.render.ts
- ❌ config-form.shared.ts
- ❌ config-form.ts

---

## ⚠️ 待完善的重要文件

### CLI文件（116个未覆盖）

**高优先级（核心功能）**:

| 文件 | 重要性 | 说明 |
|------|--------|------|
| **logs-cli.ts** | ⭐⭐⭐ | 日志查看 - 用户常用功能 |
| **cron-cli.ts** | ⭐⭐⭐ | 定时任务管理 |
| **gateway-cli.ts** | ⭐⭐⭐ | 网关管理 |
| **nodes-cli.ts** | ⭐⭐⭐ | 节点管理 |
| **daemon-cli.ts** | ⭐⭐⭐ | 守护进程管理 |
| **webhooks-cli.ts** | ⭐⭐ | Webhook管理 |
| **dns-cli.ts** | ⭐⭐ | DNS设置 |
| **directory-cli.ts** | ⭐⭐ | 目录管理 |

**中优先级**:
- browser-cli-examples.ts, browser-cli-shared.ts, browser-cli-actions-input.ts
- channel-auth.ts, channel-options.ts
- command-format.ts, help-format.ts
- completion-cli.ts
- tagline.ts (启动标语)

### Commands文件（106个未覆盖）

**高优先级（核心功能）**:

| 文件 | 重要性 | 说明 |
|------|--------|------|
| **agent.ts** | ⭐⭐⭐ | Agent主命令 |
| **agents.commands.add.ts** | ⭐⭐⭐ | 添加Agent |
| **agents.commands.list.ts** | ⭐⭐⭐ | 列出Agent |
| **models.ts** | ⭐⭐⭐ | 模型管理 |
| **channels.ts** | ⭐⭐⭐ | 频道管理 |
| **status.ts** | ⭐⭐⭐ | 状态检查 |
| **health.ts** | ⭐⭐ | 健康检查 |
| **sandbox.ts** | ⭐⭐ | 沙盒管理 |
| **configure.shared.ts** | ⭐⭐ | 配置共享 |
| **uninstall.ts** | ⭐⭐⭐ | 卸载命令 |
| **doctor-*.ts** | ⭐⭐ | 10+个诊断子文件 |

**中优先级**:
- auth-choice.*.ts (10+个认证相关文件)
- configure.*.ts (除configure.wizard.ts和configure.gateway.ts外)

### Wizard文件（7个未覆盖）

| 文件 | 说明 |
|------|------|
| clack-prompter.ts | 提示器 |
| prompts.ts | 提示文本 |
| session.ts | 会话管理 |

---

## 📊 修正后的覆盖率分析

### 之前报告 vs 修正报告

| 指标 | 之前报告 | 修正报告 | 差异原因 |
|------|---------|---------|----------|
| **CLI覆盖率** | 16% | 16% | ✅ 准确 |
| **Commands覆盖率** | 7% | 9% | ⚠️ 之前包含了test文件 |
| **WebUI覆盖率** | 30% | **59%** | ⚠️ 之前统计错误 |

**重要发现**: WebUI覆盖率实际是**59%**，比之前报告的30%好很多！

### 实际完成度评估

**优秀完成** (90%+):
- ✅ update-cli.ts
- ✅ reset.ts
- ✅ doctor.ts
- ✅ onboard-*.ts (3个文件)

**良好完成** (50-90%):
- ✅ exec-approvals-cli.ts
- ✅ models-cli.ts
- ✅ configure.gateway.ts
- ✅ WebUI主要视图 (19个)

**待完善** (<50%):
- ⚠️ 大部分CLI文件 (116个)
- ⚠️ 大部分Commands文件 (106个)
- ⚠️ 部分Wizard文件 (7个)

---

## 📋 建议改进计划（修正版）

### 阶段1: 核心CLI完善（1周）

**目标文件**: 8个高优先级CLI
- logs-cli.ts
- cron-cli.ts
- gateway-cli.ts
- nodes-cli.ts
- daemon-cli.ts
- webhooks-cli.ts
- dns-cli.ts
- directory-cli.ts

**预计工作量**: 150-200个新翻译键

### 阶段2: 核心Commands完善（1周）

**目标文件**: 10个高优先级Commands
- agent.ts
- agents.commands.add.ts
- agents.commands.list.ts
- models.ts
- channels.ts
- status.ts
- health.ts
- sandbox.ts
- uninstall.ts
- configure.shared.ts

**预计工作量**: 200-250个新翻译键

### 阶段3: WebUI完善（3-4天）

**目标文件**: 13个未覆盖视图
- channels.telegram.ts
- channels.googlechat.ts
- config-form.ts
- agents.ts
- 其他9个视图

**预计工作量**: 100-150个新翻译键

### 阶段4: 诊断工具完善（3-4天）

**目标文件**: 10+个doctor-*.ts文件
- doctor-auth.ts
- doctor-config-flow.ts
- doctor-gateway-*.ts
- 其他诊断子文件

**预计工作量**: 150-200个新翻译键

**总计**: 3周，600-800个新翻译键

---

## 🎯 总结

### 实际状态

**好消息**:
- ✅ 核心功能(update/reset/doctor/onboard)已完美覆盖
- ✅ WebUI覆盖率实际为59%，比之前认为的好很多
- ✅ 主要CLI文件(models-cli, config-cli等)已覆盖
- ✅ i18n基础设施完善

**需要改进**:
- ⚠️ 116个CLI文件待完善（84%）
- ⚠️ 106个Commands文件待完善（91%）
- ⚠️ 13个WebUI视图待完善（41%）

### 修正后的优先级

**立即行动**（本周）:
1. **logs-cli.ts** - 日志查看是用户最常用的功能之一
2. **agent.ts** + **agents.commands.*.ts** - Agent管理核心
3. **models.ts** - 模型管理核心
4. **channels.ts** - 频道管理核心

**短期行动**（2-3周）:
- 完成阶段1-4
- 达到60%+总体覆盖率

**之前报告的主要错误**:
1. ✅ 包含了测试文件(.test.ts)导致统计偏差
2. ✅ WebUI覆盖率计算错误（实际59% vs 之前报告30%）

**本报告数据准确，仅统计源文件（非测试文件）**。
