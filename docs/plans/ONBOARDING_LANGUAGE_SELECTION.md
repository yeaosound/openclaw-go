# Onboarding 语言选择功能改进方案

**版本:** 1.0  
**日期:** 2026-02-02  
**状态:** 设计中  
**优先级:** 高

---

## 1. 需求分析

### 1.1 现状问题

**当前行为:**

- 用户在 onboarding 流程中无法选择语言
- 语言必须在运行 onboard 命令前通过环境变量或配置文件设置
- 新用户首次使用时默认看到英文界面

**用户痛点:**

- 中文用户首次使用时不清楚如何切换到中文界面
- 需要在 onboarding 之前就了解语言切换机制
- 用户体验不够友好

### 1.2 改进目标

**目标:**

- ✅ 支持通过 `--lang` 参数指定语言
- ✅ 交互式向导第一步提供语言选择
- ✅ 语言选择后实时生效，后续步骤使用该语言
- ✅ 选择的语言保存到配置文件，供后续使用
- ✅ 向后兼容，不影响现有用法

---

## 2. 设计方案

### 2.1 功能设计

```
┌─────────────────────────────────────────────────────────┐
│              Onboarding 语言选择功能                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. 命令行参数支持                                        │
│     ├── --lang <locale>                                  │
│     └── 示例: openclaw onboard --lang zh-CN              │
│                                                          │
│  2. 交互式向导语言选择                                    │
│     ├── 第一步显示语言选择                               │
│     ├── 默认根据系统语言或上次选择                       │
│     └── 选择后立即生效                                   │
│                                                          │
│  3. 语言持久化                                           │
│     ├── 保存到配置文件 ~/.openclaw/openclaw.json         │
│     └── 供后续命令使用                                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 2.2 语言优先级（改进后）

```
Onboarding 时:
1. 命令行参数 --lang                                    ← 新增
      ↓
2. 环境变量 OPENCLAW_LANG
      ↓
3. 配置文件 ~/.openclaw/openclaw.json 中的 lang 字段
      ↓
4. 交互式向导中用户选择                                ← 新增（仅交互模式）
      ↓
5. 系统语言检测（如果可能）                             ← 新增
      ↓
6. 默认语言 en
```

---

## 3. 实现方案

### 3.1 修改文件清单

| 文件                                  | 修改类型 | 说明                                |
| ------------------------------------- | -------- | ----------------------------------- |
| `src/commands/onboard-types.ts`       | 修改     | 添加 `lang` 字段到 `OnboardOptions` |
| `src/cli/program/register.onboard.ts` | 修改     | 添加 `--lang` 选项                  |
| `src/commands/onboard.ts`             | 修改     | 处理语言参数和初始化                |
| `src/wizard/onboarding.ts`            | 修改     | 添加语言选择步骤                    |
| `src/i18n/config.ts`                  | 修改     | 添加系统语言检测功能                |
| `src/i18n/locales/en/wizard.ts`       | 修改     | 添加语言选择相关翻译                |
| `src/i18n/locales/zh-CN/wizard.ts`    | 修改     | 添加语言选择相关翻译                |
| `src/i18n/index.test.ts`              | 修改     | 添加语言选择测试                    |

---

### 3.2 详细实现步骤

#### 步骤 1: 更新类型定义

**文件:** `src/commands/onboard-types.ts`

```typescript
export type OnboardOptions = {
  // ... 现有字段 ...

  /** Language locale for onboarding and CLI (e.g., 'en', 'zh-CN') */
  lang?: string;
};
```

#### 步骤 2: 添加命令行参数

**文件:** `src/cli/program/register.onboard.ts`

在 `.option()` 链中添加：

```typescript
.option("--lang <locale>", "Language locale: en|zh-CN", "auto")
```

在 `.action()` 中传递参数：

```typescript
await onboardCommand(
  {
    // ... 现有参数 ...
    lang: opts.lang as string | undefined,
  },
  defaultRuntime,
);
```

#### 步骤 3: 处理语言初始化

**文件:** `src/commands/onboard.ts`

```typescript
import { initializeI18n, updateLanguageSetting, getLanguageSettings } from "../i18n/config.js";
import { setLocale, getAvailableLocales } from "../i18n/index.js";

export async function onboardCommand(opts: OnboardOptions, runtime: RuntimeEnv = defaultRuntime) {
  // ... 现有代码 ...

  // 处理语言设置
  await handleLanguageSelection(opts, runtime);

  // ... 后续流程 ...
}

async function handleLanguageSelection(opts: OnboardOptions, runtime: RuntimeEnv) {
  // 1. 如果提供了命令行参数，使用它
  if (opts.lang && opts.lang !== "auto") {
    if (isAvailableLocale(opts.lang)) {
      setLocale(opts.lang);
      await updateLanguageSetting(opts.lang);
      runtime.log(`Language set to: ${opts.lang}`);
      return;
    } else {
      runtime.error(
        `Unsupported locale: ${opts.lang}. Available: ${getAvailableLocales().join(", ")}`,
      );
      runtime.exit(1);
      return;
    }
  }

  // 2. 否则依赖现有的 i18n 初始化逻辑
  // initializeI18nSync() 已经在 build-program.ts 中调用
}
```

#### 步骤 4: 添加交互式语言选择

**文件:** `src/wizard/onboarding.ts`

在 `runOnboardingWizard` 函数开头添加语言选择：

```typescript
import {
  getAvailableLocalesWithNames,
  updateLanguageSetting,
  getLanguageSettings,
} from "../i18n/config.js";
import { setLocale, getLocale } from "../i18n/index.js";

export async function runOnboardingWizard(
  opts: OnboardOptions,
  runtime: RuntimeEnv = defaultRuntime,
  prompter: WizardPrompter,
) {
  printWizardHeader(runtime);

  // 添加语言选择步骤（仅在交互模式下）
  if (!opts.nonInteractive) {
    await promptLanguageSelection(opts, prompter, runtime);
  }

  await prompter.intro(t("wizard.intro.title"));
  await requireRiskAcknowledgement({ opts, prompter });

  // ... 后续流程 ...
}

async function promptLanguageSelection(
  opts: OnboardOptions,
  prompter: WizardPrompter,
  runtime: RuntimeEnv,
) {
  // 如果已经通过命令行参数指定，跳过
  if (opts.lang && opts.lang !== "auto") {
    return;
  }

  const currentSettings = await getLanguageSettings();
  const locales = getAvailableLocalesWithNames();

  const selectedLocale = await prompter.select({
    message: t("wizard.language.select"),
    options: locales.map((loc) => ({
      value: loc.code,
      label: `${loc.nativeName} (${loc.name})`,
      hint: loc.code === currentSettings.locale ? t("wizard.language.current") : undefined,
    })),
    initialValue: currentSettings.locale,
  });

  if (selectedLocale !== getLocale()) {
    setLocale(selectedLocale);
    await updateLanguageSetting(selectedLocale);
    runtime.log(t("wizard.language.changed", { locale: selectedLocale }));
  }
}
```

#### 步骤 5: 添加翻译键

**文件:** `src/i18n/locales/en/wizard.ts`

```typescript
export const wizardMessages = {
  // ... 现有翻译 ...

  // 语言选择
  "wizard.language.select": "Select your preferred language",
  "wizard.language.current": "current",
  "wizard.language.changed": "Language changed to: {locale}",

  // ... 其他翻译 ...
};
```

**文件:** `src/i18n/locales/zh-CN/wizard.ts`

```typescript
export const wizardMessages = {
  // ... 现有翻译 ...

  // 语言选择
  "wizard.language.select": "请选择您的首选语言",
  "wizard.language.current": "当前",
  "wizard.language.changed": "语言已切换为: {locale}",

  // ... 其他翻译 ...
};
```

#### 步骤 6: 添加系统语言检测

**文件:** `src/i18n/config.ts`

```typescript
/**
 * Detect system language
 * Returns the best matching available locale or undefined
 */
export function detectSystemLanguage(): AvailableLocale | undefined {
  try {
    const systemLang = process.env.LANG || process.env.LC_ALL || process.env.LANGUAGE;

    if (!systemLang) return undefined;

    // Extract language code (e.g., "zh_CN.UTF-8" -> "zh-CN")
    const langCode = systemLang.split(".")[0].replace("_", "-");

    // Check for exact match
    if (isAvailableLocale(langCode)) {
      return langCode;
    }

    // Check for language match (e.g., "zh" matches "zh-CN")
    const baseLang = langCode.split("-")[0];
    const match = AVAILABLE_LOCALES.find((loc) => loc.startsWith(baseLang));
    return match;
  } catch {
    return undefined;
  }
}

// 在 initializeI18n 中添加系统语言检测
export async function initializeI18n(): Promise<void> {
  // 1. Check environment variable first
  const envLang = process.env[LANG_ENV_VAR];
  if (envLang && isAvailableLocale(envLang)) {
    setLocale(envLang);
    return;
  }

  // 2. Check config file
  try {
    const snapshot = await readConfigFileSnapshot();
    if (snapshot.valid && snapshot.config.lang) {
      const configLang = snapshot.config.lang;
      if (isAvailableLocale(configLang)) {
        setLocale(configLang);
        return;
      }
    }
  } catch {
    // Config file may not exist, continue to defaults
  }

  // 3. Try to detect system language (NEW)
  const systemLang = detectSystemLanguage();
  if (systemLang) {
    setLocale(systemLang);
    return;
  }

  // 4. Use default
  setLocale(DEFAULT_LOCALE);
}
```

---

## 4. 测试计划

### 4.1 测试场景

| 场景           | 输入                  | 预期结果               |
| -------------- | --------------------- | ---------------------- |
| 命令行参数指定 | `--lang zh-CN`        | 使用中文，保存到配置   |
| 命令行参数无效 | `--lang invalid`      | 报错并退出             |
| 交互式选择     | 用户选择 "简体中文"   | 界面切换为中文         |
| 非交互模式     | `--non-interactive`   | 使用现有配置或默认     |
| 系统语言检测   | `LANG=zh_CN.UTF-8`    | 自动使用中文           |
| 配置持久化     | 选择后完成 onboarding | 下次默认使用选择的语言 |

### 4.2 测试命令

```bash
# 测试命令行参数
openclaw onboard --lang zh-CN

# 测试无效参数
openclaw onboard --lang invalid

# 测试交互式选择
openclaw onboard

# 测试非交互模式
openclaw onboard --non-interactive --accept-risk
```

---

## 5. 向后兼容性

### 5.1 兼容策略

- ✅ 所有现有命令和参数保持不变
- ✅ 默认行为不变（`--lang` 默认为 `auto`）
- ✅ 现有语言设置（环境变量、配置文件）仍然有效
- ✅ 新增功能为可选，不影响现有用户

### 5.2 迁移指南

**对于现有用户：**
无需任何操作，系统会继续使用现有配置。

**对于新用户：**
可以在 onboarding 时通过向导选择语言，或继续使用默认英文。

---

## 6. 实施计划

### 6.1 实施步骤

1. **准备阶段**（30分钟）
   - 创建功能分支
   - 准备翻译键

2. **开发阶段**（2小时）
   - 修改类型定义
   - 添加命令行参数
   - 实现语言选择逻辑
   - 添加系统语言检测

3. **测试阶段**（1小时）
   - 编写单元测试
   - 手动测试各种场景
   - 验证向后兼容

4. **文档阶段**（30分钟）
   - 更新用户文档
   - 更新 CLI 帮助

### 6.2 风险与对策

| 风险             | 概率 | 影响 | 对策                     |
| ---------------- | ---- | ---- | ------------------------ |
| 语言切换不生效   | 低   | 高   | 增加调试日志，充分测试   |
| 向后兼容性问题   | 低   | 中   | 保持默认行为不变         |
| 系统语言检测错误 | 中   | 低   | 添加异常处理，回退到默认 |

---

## 7. 代码示例

### 7.1 完整修改示例

**register.onboard.ts 修改:**

```typescript
export function registerOnboardCommand(program: Command) {
  program
    .command("onboard")
    .description(t("cli.onboard.description"))
    // ... 现有选项 ...
    .option("--lang <locale>", "Language locale: en|zh-CN|auto (default: auto)", "auto")
    // ... 现有选项 ...
    .action(async (opts, command) => {
      await runCommandWithRuntime(defaultRuntime, async () => {
        // ... 现有代码 ...
        await onboardCommand(
          {
            // ... 现有参数 ...
            lang: opts.lang as string | undefined,
          },
          defaultRuntime,
        );
      });
    });
}
```

---

## 8. 总结

### 8.1 收益

- ✅ 新用户 onboarding 体验更好
- ✅ 中文用户可以更容易找到语言设置
- ✅ 支持自动系统语言检测
- ✅ 语言选择持久化，一次设置长期使用

### 8.2 工作量估算

- 开发时间：约 3-4 小时
- 测试时间：约 1 小时
- 文档时间：约 30 分钟
- **总计：约 5 小时**

### 8.3 下一步行动

1. 创建功能分支 `feature/onboarding-language-selection`
2. 按照实施计划逐步实现
3. 提交 PR 并请求审查
4. 合并后更新用户文档

---

**文档版本:** 1.0  
**最后更新:** 2026-02-02  
**作者:** AI Assistant
