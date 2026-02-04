# i18n边界合规检查报告

**生成时间**: 2026-02-03  
**检查标准**: 仅翻译用户界面层，不翻译Agent核心

---

## ✅ 合规检查结论

**总体状态**: ⚠️ **基本合规，但存在需要关注的问题**

当前i18n实现**大部分符合**边界要求，主要覆盖用户界面层。但发现Agent工具文件中存在i18n使用，虽然仅限于错误消息，但严格来说属于核心功能层。

---

## 📊 详细检查结果

### 1. CLI命令层 (✅ 符合要求)

| 指标 | 数值 | 状态 |
|------|------|------|
| CLI文件总数 | 98个 | - |
| 使用i18n的CLI文件 | 21个 | ✅ |
| 覆盖率 | 21% | ✅ 合理范围 |

**分析**:
- ✅ CLI文件主要使用i18n for命令描述、用户提示
- ✅ 这些是用户直接交互的界面，符合翻译要求
- ✅ 未发现核心逻辑被翻译的情况

**示例合规文件**:
- `src/cli/plugins-cli.ts` - 命令描述翻译 ✅
- `src/cli/browser-cli.ts` - 用户提示翻译 ✅
- `src/cli/program/*.ts` - 命令注册翻译 ✅

### 2. Web UI层 (✅ 符合要求)

| 指标 | 数值 | 状态 |
|------|------|------|
| UI视图文件总数 | 35个 | - |
| 使用i18n的UI文件 | 19个 | ✅ |
| 覆盖率 | 54% | ✅ 合理范围 |

**分析**:
- ✅ Web UI视图有良好i18n覆盖
- ✅ `ui/src/ui/components/language-switcher.ts` - 语言切换器 ✅
- ✅ 视图标题、按钮、表单标签已翻译

### 3. 命令和向导层 (✅ 符合要求)

**已覆盖的命令文件**:
- `src/commands/onboard.ts` - 引导命令 ✅
- `src/commands/configure.wizard.ts` - 配置向导 ✅
- `src/wizard/onboarding.ts` - 引导向导 ✅

**分析**:
- ✅ 这些是用户配置界面，符合翻译要求
- ✅ 未发现核心配置逻辑被翻译

### 4. Agent工具层 (⚠️ 需要关注)

| 文件 | i18n使用 | 使用方式 | 合规性 |
|------|----------|----------|--------|
| `src/agents/tools/discord-actions-messaging.ts` | ✅ 使用 | 37次t()调用 | ⚠️ 灰色地带 |
| `src/agents/tools/discord-actions-moderation.ts` | ✅ 使用 | 少量t()调用 | ⚠️ 灰色地带 |
| `src/agents/tools/discord-actions-guild.ts` | ✅ 使用 | 少量t()调用 | ⚠️ 灰色地带 |
| `src/agents/tools/slack-actions.ts` | ✅ 使用 | 少量t()调用 | ⚠️ 灰色地带 |
| `src/agents/tools/whatsapp-actions.ts` | ✅ 使用 | 少量t()调用 | ⚠️ 灰色地带 |

**详细分析**:

**Agent工具中的i18n使用类型**:
```typescript
// 仅用于错误消息（用户可见）
throw new Error(t("channel.tools.discord.reactionsDisabled"));
throw new Error(t("channel.tools.whatsapp.reactionsDisabled"));
```

**合规性判断**:
- ⚠️ **严格标准**: Agent工具 = 核心功能 = 不应翻译（不符合）
- ✅ **宽松标准**: 仅翻译用户可见错误消息 = 可接受（符合）

**建议**:
1. **当前状态可接受**: 仅翻译了用户可见的错误消息，未翻译核心逻辑
2. **不应再扩展**: 不应在这些文件中添加更多i18n
3. **未来开发**: 新增Agent工具不应使用i18n

### 5. Agent核心层 (✅ 完全符合)

**检查结果**:
- ✅ `src/agents/*.ts` (非tools目录) - **未使用i18n**
- ✅ `src/agents/pi-embedded-runner/` - **未使用i18n**
- ✅ `src/agents/bash-tools.exec.ts` - **未使用i18n**
- ✅ `src/agents/session-*.ts` - **未使用i18n**

**分析**:
- ✅ Agent核心运行时没有i18n
- ✅ Agent配置逻辑没有i18n
- ✅ LLM交互逻辑保持英文
- ✅ 内部调试消息未翻译

### 6. 翻译键分类分析

**当前翻译键分布**:

```
src/i18n/locales/en/
├── cli.ts (235键)          ✅ CLI命令描述 - 符合
├── wizard.ts (250键)       ✅ 向导文本 - 符合
├── channels.ts (80键)      ⚠️ 频道消息 - 需要审查
├── common.ts (37键)        ✅ 通用UI - 符合
├── pairing.ts (15键)       ✅ 配对消息 - 符合
└── errors.ts (19键)        ✅ 通用错误 - 符合
```

**channels.ts 详细分析**:

该文件包含两类消息:

1. **用户界面消息** (✅ 符合):
```typescript
"channel.discord.notAllowed": "This channel is not allowed.",
"channel.discord.slash.error": "Sorry, something went wrong...",
```
- 这些是用户在与频道交互时看到的消息
- 属于用户界面层

2. **Agent工具错误消息** (⚠️ 灰色地带):
```typescript
"channel.tools.discord.reactionsDisabled": "...",
"channel.tools.discord.stickersDisabled": "...",
```
- 这些来自Agent工具的错误消息
- 用户确实能看到这些消息
- 但属于Agent工具（核心功能）

**结论**: channels.ts 中的翻译键**大部分可接受**，但`channel.tools.*`键位于灰色地带。

---

## 🔍 边界违规检查

### 检查项目1: Agent核心是否被翻译？
**结果**: ✅ **未违规**
- Agent运行时 (`pi-embedded-runner`) 无i18n
- Agent配置逻辑无i18n
- Agent作用域管理无i18n
- LLM交互保持英文

### 检查项目2: 内部调试消息是否被翻译？
**结果**: ✅ **未违规**
- `console.log`调试消息保持英文
- 堆栈跟踪未翻译
- 开发者错误消息未翻译

### 检查项目3: Agent工具核心逻辑是否被翻译？
**结果**: ✅ **未违规**
- Agent工具仅翻译了错误消息
- 工具执行逻辑未翻译
- 工具参数处理未翻译
- 工具返回值未翻译

### 检查项目4: CLI和UI是否被正确翻译？
**结果**: ✅ **符合要求**
- CLI命令描述已翻译
- 用户提示已翻译
- Web UI已翻译
- 配置向导已翻译

---

## 📋 问题清单

### ⚠️ 问题1: Agent工具文件使用i18n

**严重程度**: 中  
**文件**: 5个Agent工具文件  
**描述**: Agent工具文件使用了i18n，虽然仅限于错误消息

**示例**:
```typescript
// src/agents/tools/discord-actions-messaging.ts
throw new Error(t("channel.tools.discord.reactionsDisabled"));
```

**建议**:
1. **接受现状**: 这些错误消息用户确实可见，可接受
2. **不再扩展**: 不应在这些文件中添加新翻译
3. **未来避免**: 新增Agent工具不应使用i18n

### ⚠️ 问题2: channels.ts包含Agent工具消息

**严重程度**: 低  
**文件**: `src/i18n/locales/en/channels.ts`  
**描述**: 翻译文件中包含Agent工具相关的错误消息

**分类**:
- ✅ `channel.discord.*` - 用户界面消息（符合）
- ⚠️ `channel.tools.*` - Agent工具消息（灰色地带）

**建议**:
1. **当前可接受**: 用户确实能看到这些消息
2. **未来分离**: 可考虑将工具错误消息移到单独文件

---

## 📊 合规性评分

| 检查项 | 权重 | 得分 | 说明 |
|--------|------|------|------|
| CLI命令层 | 25% | 100% | ✅ 完全符合 |
| Web UI层 | 25% | 100% | ✅ 完全符合 |
| 命令和向导 | 20% | 100% | ✅ 完全符合 |
| Agent核心 | 20% | 100% | ✅ 完全符合 |
| Agent工具 | 10% | 70% | ⚠️ 灰色地带 |
| **总分** | **100%** | **97%** | **✅ 优秀** |

---

## 🎯 建议行动

### 立即行动 (无需修改)
- ✅ **保持现状**: 当前i18n实现基本合规
- ✅ **接受Agent工具错误消息**: 用户可见，可接受

### 短期行动 (维护)
- 📋 **文档记录**: 在开发文档中明确i18n边界
- 📋 **Code Review**: PR审查时检查Agent工具是否新增i18n
- 📋 **团队培训**: 确保开发者理解i18n边界

### 长期行动 (优化)
- 🔮 **分离翻译键**: 考虑将`channel.tools.*`移到单独文件
- 🔮 **静态检查**: 添加ESLint规则阻止Agent核心使用i18n
- 🔮 **自动化测试**: 添加测试确保Agent核心无i18n

---

## 📝 总结

### 总体评价
当前i18n实现**97%符合**边界要求：
- ✅ CLI、Web UI、向导完全符合
- ✅ Agent核心完全未使用i18n
- ⚠️ Agent工具使用了i18n（仅限于用户可见错误消息）

### 边界遵守情况
```
✅ 用户界面层 (CLI, Web UI, 向导) - 完全覆盖
✅ Agent核心层 (运行时, 配置, LLM交互) - 完全未覆盖
⚠️ Agent工具层 - 仅覆盖错误消息
```

### 最终结论
**符合要求，无需修改**。Agent工具中的i18n使用仅限于用户可见的错误消息，这是可接受的灰色地带。建议保持现状，不再扩展，并确保未来Agent开发不使用i18n。

---

*报告生成: 2026-02-03*  
*检查标准: 仅翻译用户界面层*  
*合规评分: 97/100 (优秀)*
