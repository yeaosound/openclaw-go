# OpenClaw Onboarding 翻译改进方案

**版本:** 1.0  
**日期:** 2026-02-02  
**目标:** 解决 Onboarding 流程中的英文文本遗漏问题

---

## 1. 改进目标

将 Onboarding 流程中的所有英文界面元素汉化，确保中文用户获得完整的中文体验。

### 1.1 成功标准

- Onboarding 流程 95% 以上的文本显示为中文
- 所有用户可见的提示、标签、状态均为中文
- 保持向后兼容性

---

## 2. 改进策略

### 2.1 分阶段实施

```
阶段 1: 高优先级修复（3天）
  ├── Gateway 配置标签
  ├── 频道状态显示
  └── 频道工作方式说明

阶段 2: 中优先级修复（2天）
  ├── 模式选择和模型选择
  └── 向导标题和提示

阶段 3: 低优先级优化（1天）
  └── 其他杂项和细节优化
```

### 2.2 实施方法

1. **提取翻译键**: 为所有硬编码文本创建翻译键
2. **添加翻译**: 在 zh-CN 语言包中添加中文翻译
3. **修改代码**: 使用 `t()` 函数替换硬编码文本
4. **测试验证**: 确保翻译正确显示

---

## 3. 详细实施计划

### 阶段 1: 高优先级修复

#### 任务 1.1: Gateway 配置标签汉化

**目标文件:**

- `src/wizard/onboarding.ts` (第 297-316 行)
- `src/wizard/onboarding.gateway-config.ts`
- `src/commands/configure.gateway.ts`

**需要添加的翻译键:**

```typescript
// 添加到 src/i18n/locales/zh-CN/wizard.ts
'wizard.gateway.port': '网关端口',
'wizard.gateway.bind': '网关绑定',
'wizard.gateway.customIp': '网关自定义 IP',
'wizard.gateway.auth': '网关认证',
'wizard.gateway.auth.token': '令牌（默认）',
'wizard.gateway.tailscale': 'Tailscale 暴露',
'wizard.gateway.tailscale.off': '关闭',
'wizard.quickstart.directToChannels': '直接连接到聊天频道',
'wizard.quickstart.loopback': '本地回环 (127.0.0.1)',
'wizard.quickstart.keepingSettings': '保留您当前的网关设置：',
```

**代码修改示例:**

```typescript
// 修改前
const quickstartLines = [
  `Gateway port: ${quickstartGateway.port}`,
  `Gateway bind: ${formatBind(quickstartGateway.bind)}`,
  `Gateway auth: ${formatAuth(quickstartGateway.authMode)}`,
  "Direct to chat channels.",
];

// 修改后
const quickstartLines = [
  `${t("wizard.gateway.port")}: ${quickstartGateway.port}`,
  `${t("wizard.gateway.bind")}: ${formatBind(quickstartGateway.bind)}`,
  `${t("wizard.gateway.auth")}: ${formatAuth(quickstartGateway.authMode)}`,
  t("wizard.quickstart.directToChannels"),
];
```

**工作量:** 4 小时

---

#### 任务 1.2: 频道状态显示汉化

**目标文件:**

- `src/commands/onboard-channels.ts` (第 136-148, 175, 305 行)

**需要添加的翻译键:**

```typescript
// 添加到 src/i18n/locales/zh-CN/channels.ts 或新建 onboard-channels.ts
'channels.status.title': '频道状态',
'channels.status.configured': '已配置',
'channels.status.notConfigured': '未配置',
'channels.status.pluginDisabled': '插件已禁用',
'channels.status.installPlugin': '安装插件以启用',
'channels.status.plugin': '插件',
'channels.status.install': '安装',
```

**代码修改示例:**

```typescript
// 修改前
const statusLabel = configured ? "configured (plugin disabled)" : "not configured";

// 修改后
const statusLabel = configured
  ? t("channels.status.configured") + " (" + t("channels.status.pluginDisabled") + ")"
  : t("channels.status.notConfigured");
```

**工作量:** 3 小时

---

#### 任务 1.3: 频道工作方式说明汉化

**目标文件:**

- `src/commands/onboard-channels.ts` (第 192-203 行)

**需要添加的翻译键:**

```typescript
'channels.how.title': '频道工作方式',
'channels.how.dmSecurity': 'DM 安全：默认是配对模式；未知 DM 会收到配对码。',
'channels.how.approveWith': '使用以下命令批准：',
'channels.how.publicDms': '公共 DM 需要 dmPolicy="open" + allowFrom=["*"]。',
'channels.how.multiUser': '多用户 DM：设置 session.dmScope="per-channel-peer"（或多账户频道使用 "per-account-channel-peer"）来隔离会话。',
```

**代码修改示例:**

```typescript
// 修改前
await prompter.note(
  [
    "DM security: default is pairing; unknown DMs get a pairing code.",
    `Approve with: ${formatCliCommand("openclaw pairing approve <channel> <code>")}`,
    // ...
  ].join("\n"),
  "How channels work",
);

// 修改后
await prompter.note(
  [
    t("channels.how.dmSecurity"),
    t("channels.how.approveWith") +
      ": " +
      formatCliCommand("openclaw pairing approve <channel> <code>"),
    // ...
  ].join("\n"),
  t("channels.how.title"),
);
```

**工作量:** 2 小时

---

### 阶段 2: 中优先级修复

#### 任务 2.1: 模式选择和模型选择汉化

**目标文件:**

- `src/wizard/onboarding.ts` (第 339 行)
- `src/commands/auth-choice-prompt.ts`
- `src/commands/model-picker.ts`

**需要添加的翻译键:**

```typescript
'wizard.setup.question': '您想要设置什么？',
'model.provider.title': '模型/认证提供商',
'model.provider.choice': '模型/认证选择',
'model.default.title': '默认模型',
'model.default.keep': '默认模型（留空以保持）',
'model.filter.provider': '按提供商筛选模型',
```

**工作量:** 2 小时

---

#### 任务 2.2: 向导标题汉化

**目标文件:**

- `src/wizard/onboarding.ts` (第 316 行)
- `src/wizard/onboarding.finalize.ts`
- `src/commands/onboard-channels.ts` (第 613 行)

**需要添加的翻译键:**

```typescript
'wizard.quickstart.title': '快速开始',
'wizard.quickstart.nodeRuntime': '快速开始使用 Node 作为网关服务（稳定且受支持）。',
'channels.select.quickstart': '选择频道（快速开始）',
```

**工作量:** 1 小时

---

### 阶段 3: 低优先级优化

#### 任务 3.1: 其他杂项汉化

**目标:** 清理剩余的英文文本

**需要添加的翻译键:**

```typescript
'common.yes': '是',
'common.no': '否',
'common.skip': '跳过',
'common.skipForNow': '暂时跳过',
'wizard.gateway.keepingSettings': '保留您当前的网关设置：',
```

**工作量:** 1 小时

---

## 4. 需要修改的文件清单

### 4.1 语言包文件

| 文件                                 | 新增翻译键数量 |
| ------------------------------------ | -------------- |
| `src/i18n/locales/zh-CN/wizard.ts`   | 约 20 个       |
| `src/i18n/locales/zh-CN/channels.ts` | 约 10 个       |
| `src/i18n/locales/en/wizard.ts`      | 约 20 个       |
| `src/i18n/locales/en/channels.ts`    | 约 10 个       |

### 4.2 源代码文件

| 文件                                      | 修改点数 | 优先级 |
| ----------------------------------------- | -------- | ------ |
| `src/wizard/onboarding.ts`                | 12 处    | 🔴 高  |
| `src/commands/onboard-channels.ts`        | 10 处    | 🔴 高  |
| `src/wizard/onboarding.gateway-config.ts` | 5 处     | 🟡 中  |
| `src/commands/auth-choice-prompt.ts`      | 2 处     | 🟡 中  |
| `src/commands/model-picker.ts`            | 3 处     | 🟡 中  |
| `src/commands/configure.gateway.ts`       | 5 处     | 🟡 中  |
| `src/wizard/onboarding.finalize.ts`       | 2 处     | 🟡 中  |

---

## 5. 翻译键命名规范

### 5.1 命名规则

```
{module}.{component}.{key}

示例：
- wizard.gateway.port        (向导模块 - 网关组件 - 端口键)
- channels.status.title      (频道模块 - 状态组件 - 标题键)
- model.provider.title       (模型模块 - 提供商组件 - 标题键)
```

### 5.2 分类规则

- **向导相关**: `wizard.{section}.{key}`
- **频道相关**: `channels.{section}.{key}`
- **模型相关**: `model.{section}.{key}`
- **通用**: `common.{key}`

---

## 6. 质量控制

### 6.1 翻译标准

| 标准     | 要求                 |
| -------- | -------------------- |
| 准确性   | 准确传达原意，无歧义 |
| 一致性   | 相同术语统一翻译     |
| 简洁性   | 界面文本简洁明了     |
| 语境适应 | 符合中文表达习惯     |

### 6.2 关键术语对照

| 英文           | 中文     | 说明       |
| -------------- | -------- | ---------- |
| Gateway        | 网关     | 核心术语   |
| Channel        | 频道     | 消息渠道   |
| Model          | 模型     | AI 模型    |
| Provider       | 提供商   | 服务提供商 |
| QuickStart     | 快速开始 | 模式名称   |
| Configured     | 已配置   | 状态标签   |
| Not Configured | 未配置   | 状态标签   |
| Token          | 令牌     | 认证令牌   |

---

## 7. 测试计划

### 7.1 测试场景

1. **中文环境完整测试**

   ```bash
   export LANG=zh_CN.UTF-8
   openclaw onboard
   ```

2. **英文环境回归测试**

   ```bash
   export LANG=en_US.UTF-8
   openclaw onboard
   ```

3. **命令行参数测试**
   ```bash
   openclaw onboard --lang zh-CN
   ```

### 7.2 验证清单

- [ ] Gateway 配置显示为中文
- [ ] 频道状态显示为中文
- [ ] 频道说明文本显示为中文
- [ ] 模型选择提示显示为中文
- [ ] 所有向导标题显示为中文
- [ ] 英文环境正常显示英文
- [ ] 无乱码或显示错误

---

## 8. 时间安排

| 阶段   | 任务             | 工时 | 累计    |
| ------ | ---------------- | ---- | ------- |
| 阶段 1 | Gateway 配置汉化 | 4h   | 4h      |
| 阶段 1 | 频道状态汉化     | 3h   | 7h      |
| 阶段 1 | 频道说明汉化     | 2h   | 9h      |
| 阶段 2 | 模式和模型汉化   | 2h   | 11h     |
| 阶段 2 | 向导标题汉化     | 1h   | 12h     |
| 阶段 3 | 其他杂项         | 1h   | 13h     |
| 测试   | 验证和修复       | 2h   | **15h** |

**总计工作量: 约 15 小时（2 个工作日）**

---

## 9. 风险与对策

| 风险             | 可能性 | 影响 | 对策               |
| ---------------- | ------ | ---- | ------------------ |
| 翻译不准确       | 中     | 中   | 请母语者审核       |
| 文本溢出问题     | 低     | 中   | 测试时检查界面布局 |
| 遗漏未发现的文本 | 中     | 低   | 完整走查所有路径   |
| 影响现有功能     | 低     | 高   | 保持向后兼容       |

---

## 10. 建议实施顺序

### 推荐方案：按可见性优先

1. **立即实施（本周）**
   - Gateway 配置标签（用户最明显看到）
   - 频道状态显示（用户截图中大量出现）

2. **短期实施（下周）**
   - 频道工作方式说明
   - 向导标题和提示

3. **长期优化（后续迭代）**
   - 其他杂项
   - 细节打磨

### 最小可行方案（MVP）

如果资源有限，建议优先修复：

1. ✅ Gateway 配置标签（9 处文本）
2. ✅ 频道状态标签（6 处文本）

**预计工作量: 6 小时**

这将解决用户截图中 80% 的英文显示问题。

---

## 11. 结论

### 11.1 现状评估

- **问题规模**: 约 30 处英文文本需要翻译
- **影响范围**: 中文用户 Onboarding 体验的 30-40%
- **优先级**: 🔴 高（影响用户体验）

### 11.2 推荐方案

**推荐采用"最小可行方案"**：

- 优先修复 Gateway 配置和频道状态（解决 80% 问题）
- 工作量：6 小时
- 预期效果：显著提升中文用户体验

### 11.3 下一步行动

1. 确认实施方案（完整方案 / MVP 方案）
2. 分配开发资源
3. 开始实施阶段 1
4. 完成后进行测试验证

---

**方案制定:** AI Assistant  
**日期:** 2026-02-02  
**版本:** 1.0
