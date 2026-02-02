# OpenClaw Onboarding 翻译遗漏分析报告

**分析日期:** 2026-02-02  
**问题:** 用户选择中文后，仍有大量英文界面元素

---

## 1. 问题概述

用户选择中文后，以下部分仍显示英文：

### 已汉化 ✅
- 语言选择界面
- 安全警告整体内容
- 部分选项（快速开始）

### 未汉化 ❌
- Gateway 配置标签
- 频道状态显示（not configured）
- 模型选择提示
- 说明文本（How channels work）
- 状态标签（configured/not configured）
- 各类标题（QuickStart, Channel status）

---

## 2. 详细遗漏清单

### 🔴 高优先级

#### 2.1 Gateway 配置标签
**位置:** `src/wizard/onboarding.ts` 第 300-316 行
**文本:**
- Gateway port
- Gateway bind
- Gateway custom IP
- Gateway auth
- Tailscale exposure
- Direct to chat channels
- Loopback (127.0.0.1)
- Token (default)
- Off

**影响:** QuickStart 模式主要配置信息

---

#### 2.2 频道状态显示
**位置:** `src/commands/onboard-channels.ts` 第 136-148 行
**文本:**
- not configured
- configured (plugin disabled)
- install plugin to enable
- configured
- plugin
- Channel status（标题）

**影响:** 用户截图中非常明显的大量英文

---

#### 2.3 频道工作方式
**位置:** `src/commands/onboard-channels.ts` 第 192-203 行
**文本:**
- How channels work（标题）
- DM security: default is pairing...
- Approve with: openclaw pairing approve...
- Public DMs require dmPolicy...
- Multi-user DMs: set session.dmScope...

**影响:** 频道功能说明大段文本

---

### 🟡 中优先级

#### 2.4 模式选择
**位置:** `src/wizard/onboarding.ts` 第 339 行
**文本:** What do you want to set up?

---

#### 2.5 模型选择
**位置:** `src/commands/auth-choice-prompt.ts`, `model-picker.ts`
**文本:**
- Model/auth provider
- Model/auth choice
- Default model
- Filter models by provider

---

#### 2.6 Gateway 配置向导
**位置:** `src/wizard/onboarding.gateway-config.ts`
**文本:**
- Gateway port
- Gateway bind
- Gateway auth
- Tailscale exposure
- Off
- No Tailscale exposure

---

#### 2.7 QuickStart 相关
**位置:** `src/wizard/onboarding.ts`, `onboarding.finalize.ts`
**文本:**
- QuickStart（标题）
- QuickStart uses Node for the Gateway service...
- Select channel (QuickStart)

---

### 🟢 低优先级

#### 2.8 其他杂项
- Keeping your current gateway settings
- Skip for now
- Yes / No

---

## 3. 统计汇总

| 类别 | 数量 | 优先级 |
|------|------|--------|
| Gateway 配置 | 9 处 | 🔴 高 |
| 频道状态 | 6 处 | 🔴 高 |
| 频道说明 | 5 处 | 🔴 高 |
| 模型选择 | 4 处 | 🟡 中 |
| 向导标题 | 3 处 | 🟡 中 |
| 其他 | 3 处 | 🟢 低 |
| **总计** | **约 30 处** | - |

---

## 4. 根因分析

1. **翻译键已存在但未使用**
   - 例如已有 `wizard.gateway.port` 但未在代码中使用

2. **大量硬编码字符串**
   - 直接写在代码中，未使用 `t()` 函数

3. **动态生成的标签**
   - configured/not configured 等状态标签是动态生成的

---

## 5. 改进建议

### 阶段 1: 高优先级（立即处理）
1. 修复 Gateway 配置标签（9 处）
2. 修复频道状态显示（6 处）
3. 修复频道工作方式说明（5 处）

### 阶段 2: 中优先级
4. 修复模式选择和模型选择（8 处）
5. 修复向导标题（3 处）

### 阶段 3: 低优先级
6. 修复其他杂项（3 处）

---

## 6. 涉及文件

| 文件 | 修改点数 |
|------|----------|
| src/wizard/onboarding.ts | 12 处 |
| src/commands/onboard-channels.ts | 10 处 |
| src/wizard/onboarding.gateway-config.ts | 5 处 |
| src/commands/auth-choice-prompt.ts | 2 处 |
| src/commands/model-picker.ts | 3 处 |
| src/commands/configure.gateway.ts | 5 处 |
| src/wizard/onboarding.finalize.ts | 2 处 |

---

## 7. 工作量估算

- 提取翻译键：2 小时
- 添加中文翻译：1 小时
- 修改源文件：3 小时
- 测试验证：1 小时
- **总计：约 7 小时**

---

**报告生成时间:** 2026-02-02  
**状态:** 分析完成，等待改进方案制定
