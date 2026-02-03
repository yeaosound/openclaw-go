# Phase 1 实施完成报告

## 实施日期

2026-02-01

## 已完成内容

### 1. 目录结构

```
src/i18n/
├── index.ts                 # 核心 API (t(), setLocale(), getLocale())
├── types.ts                 # 类型定义
├── config.ts                # 配置管理 (initializeI18n())
├── index.test.ts            # 单元测试
├── index.exports.ts         # 模块导出
├── locales/
│   ├── en/                  # 英文语言包
│   │   ├── cli.ts           # CLI 命令描述 (66 条)
│   │   ├── wizard.ts        # 向导文本 (35 条)
│   │   ├── pairing.ts       # 配对消息 (12 条)
│   │   ├── common.ts        # 通用文本 (42 条)
│   │   ├── channels.ts      # 频道消息 (12 条)
│   │   ├── errors.ts        # 错误消息 (17 条)
│   │   └── index.ts         # 英文包导出
│   └── zh-CN/               # 中文语言包
│       ├── cli.ts           # CLI 命令描述 (66 条)
│       ├── wizard.ts        # 向导文本 (35 条)
│       ├── pairing.ts       # 配对消息 (12 条)
│       ├── common.ts        # 通用文本 (42 条)
│       ├── channels.ts      # 频道消息 (12 条)
│       ├── errors.ts        # 错误消息 (17 条)
│       └── index.ts         # 中文包导出
└── scripts/                 # 辅助脚本目录
```

### 2. 核心 API

#### `t(key, params?)` - 翻译函数

```typescript
import { t } from "./i18n/index.js";

// 基础使用
t("cli.plugins.description");
// => "Manage OpenClaw plugins/extensions" (en)
// => "管理 OpenClaw 插件/扩展" (zh-CN)

// 插值
t("pairing.request.code", { code: "123456" });
// => "Pairing code: 123456"
```

#### `setLocale(locale)` - 设置语言

```typescript
import { setLocale } from "./i18n/index.js";

setLocale("zh-CN"); // 切换到中文
setLocale("en"); // 切换到英文
```

#### `initializeI18n()` - 初始化

```typescript
import { initializeI18n } from "./i18n/config.js";

// 自动从环境变量或配置文件读取语言设置
await initializeI18n();
```

### 3. 配置支持

#### 环境变量

```bash
export OPENCLAW_LANG=zh-CN
```

#### 配置文件

```json
{
  "lang": "zh-CN",
  "gateway": { ... }
}
```

#### 类型定义已更新

- `src/config/types.openclaw.ts` - OpenClawConfig 添加 `lang?: string`
- `src/config/zod-schema.ts` - OpenClawSchema 添加 `lang: z.string().optional()`

### 4. CLI 集成

`src/cli/program/build-program.ts` 已集成 i18n 初始化：

```typescript
import { initializeI18nSync } from "../../i18n/config.js";

export function buildProgram() {
  initializeI18nSync(); // 启动时自动初始化
  // ...
}
```

### 5. 翻译统计

| 模块     | 英文    | 中文    | 状态     |
| -------- | ------- | ------- | -------- |
| CLI      | 66      | 66      | 完成     |
| Wizard   | 35      | 35      | 完成     |
| Pairing  | 12      | 12      | 完成     |
| Common   | 42      | 42      | 完成     |
| Channels | 12      | 12      | 完成     |
| Errors   | 17      | 17      | 完成     |
| **总计** | **184** | **184** | **完成** |

### 6. 单元测试

创建了 `src/i18n/index.test.ts`，包含：

- `t()` 函数基础测试
- 插值功能测试
- 语言切换测试
- 可用语言列表测试
- 翻译存在性检查测试
- Fallback 机制测试

## 文件清单

### 核心文件

1. `src/i18n/types.ts` - 类型定义
2. `src/i18n/index.ts` - 核心 API
3. `src/i18n/config.ts` - 配置管理
4. `src/i18n/index.test.ts` - 单元测试
5. `src/i18n/index.exports.ts` - 模块导出

### 英文语言包

6. `src/i18n/locales/en/cli.ts`
7. `src/i18n/locales/en/wizard.ts`
8. `src/i18n/locales/en/pairing.ts`
9. `src/i18n/locales/en/common.ts`
10. `src/i18n/locales/en/channels.ts`
11. `src/i18n/locales/en/errors.ts`
12. `src/i18n/locales/en/index.ts`

### 中文语言包

13. `src/i18n/locales/zh-CN/cli.ts`
14. `src/i18n/locales/zh-CN/wizard.ts`
15. `src/i18n/locales/zh-CN/pairing.ts`
16. `src/i18n/locales/zh-CN/common.ts`
17. `src/i18n/locales/zh-CN/channels.ts`
18. `src/i18n/locales/zh-CN/errors.ts`
19. `src/i18n/locales/zh-CN/index.ts`

### 配置更新

20. `src/config/types.openclaw.ts` - 添加 lang 字段
21. `src/config/zod-schema.ts` - 添加 lang 验证
22. `src/cli/program/build-program.ts` - 集成初始化

## 使用方法

### 1. 基础使用

```typescript
import { t } from "./i18n/index.js";

console.log(t("cli.plugins.description"));
```

### 2. CLI 命令中使用

```typescript
import { t } from "../i18n/index.js";

program.command("plugins").description(t("cli.plugins.description"));
```

### 3. 向导中使用

```typescript
import { t } from "../i18n/index.js";

await prompter.confirm({
  message: t("wizard.security.confirm"),
});
```

### 4. 切换语言

```bash
# 方法1: 环境变量
export OPENCLAW_LANG=zh-CN
openclaw --help

# 方法2: 配置文件
echo '{"lang": "zh-CN"}' > ~/.openclaw/openclaw.json
```

## 下一步（Phase 2）

1. **迁移 CLI 命令描述**
   - 修改 `src/cli/plugins-cli.ts` 等文件
   - 将 `.description("...")` 改为 `.description(t('...'))`

2. **迁移向导文本**
   - 修改 `src/wizard/onboarding.ts`
   - 替换所有硬编码文本

3. **验证构建**
   - 运行 `pnpm build` 检查编译
   - 运行 `pnpm test` 执行测试

## 注意事项

1. **类型安全**：所有翻译 key 都有类型支持
2. **Fallback 机制**：缺失翻译自动回退到 key 本身
3. **插值语法**：使用 `{variableName}` 格式
4. **语言优先级**：环境变量 > 配置文件 > 默认(英文)

## 验证命令

```bash
# 检查 TypeScript 编译
pnpm tsc --noEmit src/i18n/index.ts

# 运行单元测试
pnpm test src/i18n/index.test.ts

# 测试中文输出
OPENCLAW_LANG=zh-CN pnpm openclaw --help
```

---

**Phase 1 实施完成！i18n 基础设施已就绪，可以开始 Phase 2 的文本迁移工作。**
