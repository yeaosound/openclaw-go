# Phase 6 详细检查报告

**检查时间:** 2026-02-02  
**检查范围:** 频道消息汉化（Phase 6）  
**文档依据:** I18N_ROADMAP.md

---

## 1. 规划 vs 实际对比

### 1.1 I18N_ROADMAP.md 中的Phase 6规划

| 规划项目 | 规划值 | 实际状态 | 差异 |
|---------|--------|---------|------|
| 预计时间 | 3-4天 | 未开始 | ❌ |
| 提取频道文本 | 200+ 条 key | 已提取约100条 | ⚠️ |
| 创建中文语言包 | `zh-CN/channels.ts` | 已创建(26行) | ⚠️ 严重不足 |
| 修改频道文件 | 30个文件更新 | 0个文件 | ❌ 未开始 |
| 测试验证 | 4小时 | 未开始 | ❌ |

### 1.2 当前实施状态

```
Phase 6 进度: ████░░░░░░░░░░░░░░░░ 约 15% 完成

✅ 已完成:
   - src/i18n/locales/zh-CN/channels.ts (基础框架)
   - src/i18n/locales/en/channels.ts (英文源文本)

❌ 待完成:
   - 提取所有硬编码频道消息
   - 扩展 channels.ts 到200+条
   - 修改30+个源文件
   - 全面测试
```

---

## 2. 实际频道消息分布分析

### 2.1 已发现的硬编码消息（约100条）

#### Discord 消息（~25条）
位置: `src/discord/monitor/native-command.ts`

```typescript
// 当前硬编码（需要提取）:
"This channel is disabled."
"This channel is not allowed."
"Discord DMs are disabled."
"You are not authorized to use this command."
"Discord group DMs are disabled."
"Discord exec approvals: disabled"
"raid protection disabled"  // system-events.ts
```

#### Slack 消息（~20条）
位置: `src/slack/monitor/slash.ts`

```typescript
// 当前硬编码（需要提取）:
"This channel is not allowed."
"Slack DMs are disabled."
"You are not authorized to use this command."
"You are not authorized to use this command here."
"slack: slash commands disabled"  // 日志消息
"slack: drop message (channel not allowed)"  // 日志
"slack: drop dm (dms disabled)"  // 日志
"[slack] Config writes disabled; skipping channel config migration."
```

#### Telegram 消息（~30条）
位置: `src/telegram/bot-native-commands.ts`, `src/telegram/bot-handlers.ts`

```typescript
// 当前硬编码（需要提取）:
"This group is disabled."
"This topic is disabled."
"You are not authorized to use this command."
"Telegram group commands are disabled."
"This group is not allowed."
"Blocked telegram group {chatId} (group disabled)"  // 日志
"Blocked telegram topic {chatId} ({resolvedThreadId}) (topic disabled)"  // 日志
"Blocked telegram group message (groupPolicy: disabled)"  // 日志
"[telegram] Config writes disabled; skipping group config migration."
```

#### LINE 消息（~10条）
位置: `src/line/bot-handlers.ts`

```typescript
// 当前硬编码（需要提取）:
"Blocked line group {groupId} (group disabled)"  // 日志
"Blocked line group message (groupPolicy: disabled)"  // 日志
"Blocked line sender (dmPolicy: disabled)"  // 日志
```

#### Signal 消息（~10条）
位置: `src/signal/monitor/event-handler.ts`

```typescript
// 当前硬编码（需要提取）:
"Blocked signal group message (groupPolicy: disabled)"  // 日志
"Signal agent reactions disabled (reactionLevel=\"{level}\")"
"Signal reactions are disabled via actions.reactions."
```

#### iMessage 消息（~5条）
位置: `src/imessage/monitor/monitor-provider.ts`

```typescript
// 当前硬编码（需要提取）:
"Blocked iMessage group message (groupPolicy: disabled)"  // 日志
```

### 2.2 当前 zh-CN/channels.ts 状态

**文件路径:** `src/i18n/locales/zh-CN/channels.ts`  
**当前行数:** 26行  
**覆盖率:** 约 22%

```typescript
// 当前内容（仅22条消息）
export const channelMessages = {
  // Discord (8条)
  'channel.discord.notAllowed': '此频道不允许。',
  'channel.discord.dmsDisabled': 'Discord DM 已禁用。',
  'channel.discord.notAuthorized': '您无权在此处使用此命令。',
  'channel.discord.slash.messageRequired': '需要消息。',
  'channel.discord.slash.error': '抱歉，处理该命令时出了点问题。',
  'channel.discord.slash.buttonExpired': '抱歉，该按钮已不再有效。',
  'channel.discord.slash.menuOtherUser': '该菜单是针对其他用户的。',

  // Slack (2条)
  'channel.slack.notAllowed': '此频道不允许。',
  'channel.slack.dmsDisabled': 'Slack DM 已禁用。',

  // LINE (1条)
  'channel.line.error': '抱歉，处理您的消息时出了点问题。',

  // Generic (3条)
  'channel.notConfigured': '频道未配置。',
  'channel.disabled': '频道已禁用。',
  'channel.noPermission': '没有权限访问此频道。',
};
```

**缺失类别:**
- ❌ Telegram 消息（0条，应该有20+）
- ❌ Signal 消息（0条，应该有10+）
- ❌ iMessage 消息（0条，应该有5+）
- ❌ 日志/调试消息（0条，应该有30+）

---

## 3. 需要修改的源文件清单

### 3.1 高优先级（用户可见消息）

| 文件 | 消息数量 | 消息类型 | 状态 |
|------|---------|---------|------|
| `src/discord/monitor/native-command.ts` | 8 | 权限/禁用提示 | ❌ 未修改 |
| `src/slack/monitor/slash.ts` | 7 | 权限/禁用提示 | ❌ 未修改 |
| `src/telegram/bot-native-commands.ts` | 10 | 权限/禁用提示 | ❌ 未修改 |
| `src/discord/monitor/system-events.ts` | 3 | 系统事件 | ❌ 未修改 |

### 3.2 中优先级（日志消息）

| 文件 | 消息数量 | 消息类型 | 状态 |
|------|---------|---------|------|
| `src/telegram/bot-handlers.ts` | 15 | 日志/调试 | ❌ 未修改 |
| `src/slack/monitor/events/*.ts` | 8 | 日志/配置 | ❌ 未修改 |
| `src/line/bot-handlers.ts` | 5 | 日志/调试 | ❌ 未修改 |
| `src/signal/monitor/event-handler.ts` | 8 | 日志/反应 | ❌ 未修改 |
| `src/imessage/monitor/*.ts` | 5 | 日志/调试 | ❌ 未修改 |

### 3.3 工具/错误消息

| 文件 | 消息数量 | 消息类型 | 状态 |
|------|---------|---------|------|
| `src/agents/tools/discord-actions*.ts` | 20 | 工具错误 | ❌ 未修改 |
| `src/agents/tools/slack-actions.ts` | 8 | 工具错误 | ❌ 未修改 |
| `src/agents/tools/whatsapp-actions.ts` | 2 | 工具错误 | ❌ 未修改 |

---

## 4. 问题与风险

### 4.1 关键问题

1. **数量不足**
   - 规划200+条，实际只提取了22条（11%）
   - 缺少Telegram、Signal、iMessage等频道的消息

2. **遗漏重要消息**
   - 日志消息完全未提取
   - 工具错误消息未提取
   - 系统事件消息未提取

3. **未修改源文件**
   - 30个目标文件均未修改
   - 所有消息仍是硬编码英文

4. **缺乏分类**
   - 日志消息 vs 用户消息未区分
   - 错误消息 vs 提示消息未区分

### 4.2 风险评估

| 风险 | 等级 | 影响 | 对策 |
|------|------|------|------|
| 文本遗漏 | 🔴 高 | 用户体验不一致 | 使用脚本全面扫描 |
| 日志汉化 | 🟡 中 | 可能不需要 | 区分用户消息和日志 |
| 代码冲突 | 🟡 中 | 合并困难 | 分模块逐步修改 |
| 测试不足 | 🔴 高 | 回归问题 | 增加自动化测试 |

---

## 5. 修正建议

### 5.1 立即执行

1. **补充提取脚本**
   ```bash
   # 搜索所有硬编码的用户可见消息
   grep -r "sendMessage.*\"" src/discord/ src/slack/ src/telegram/
   grep -r "text:\s*\"" src/discord/monitor/ src/slack/monitor/
   grep -r "respond.*\"" src/discord/monitor/
   ```

2. **扩展 channels.ts**
   - 目标：从22条扩展到100+条
   - 添加Telegram、Signal、iMessage分类
   - 区分用户消息和日志消息

3. **修改高优先级文件**
   - 先修改用户直接可见的8个文件
   - 保持日志消息为英文（可选）

### 5.2 分类策略

建议将消息分为三类：

```typescript
// 1. 用户可见消息（必须汉化）
'channel.discord.notAllowed': '此频道不允许。',

// 2. 系统日志消息（可选汉化）
'channel.discord.log.blocked': 'Blocked discord channel {channelId}',

// 3. 调试消息（保持英文）
// 不提取，保持硬编码
```

### 5.3 修订时间估算

| 任务 | 原估算 | 修订估算 | 原因 |
|------|--------|---------|------|
| 提取频道文本 | 6小时 | 4小时 | 已有基础 |
| 创建语言包 | 10小时 | 6小时 | 模板已存在 |
| 修改频道文件 | 10小时 | 8小时 | 减少日志消息 |
| 测试验证 | 4小时 | 4小时 | 不变 |
| **总计** | **3-4天** | **2-3天** | **效率提升** |

---

## 6. 下一步行动建议

### 选项A：最小可行（推荐）
只汉化用户直接可见的消息（约40条）
- 时间：1天
- 影响：用户感知最明显
- 风险：低

### 选项B：完整实施
汉化所有消息包括日志（约200条）
- 时间：3天
- 影响：全面汉化
- 风险：中（可能影响日志可读性）

### 选项C：分阶段实施
1. 第1天：用户可见消息（40条）
2. 第2天：工具错误消息（30条）
3. 第3天：日志消息（130条）

---

## 7. 结论

**Phase 6 当前状态：严重滞后**

- ❌ 仅完成约15%
- ❌ 缺少Telegram/Signal/iMessage消息
- ❌ 源文件完全未修改
- ⚠️ 日志消息策略不明确

**建议立即采取行动：**
1. 明确日志消息是否汉化
2. 使用脚本全面提取硬编码文本
3. 优先修改用户可见的8个高优先级文件
4. 预计2天内可以完成最小可行版本

---

*报告生成：Phase 6 检查完成*
*待决策：日志消息汉化策略、实施范围*
