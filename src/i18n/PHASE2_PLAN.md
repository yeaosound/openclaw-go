# Phase 2 详细实施计划

## 日期: 2026-02-01

## 目标: 迁移现有代码使用 i18n 翻译

---

## 1. 范围分析

### 1.1 CLI 命令描述 (300 个 .description() 调用, 68 个文件)

**核心文件 (优先级高):**

1. `src/cli/plugins-cli.ts` - 8 个描述
2. `src/cli/gateway-cli/register.ts` - 14 个描述
3. `src/cli/browser-cli*.ts` - 40+ 个描述
4. `src/cli/pairing-cli.ts` - 3 个描述
5. `src/cli/channels-cli.ts` - 9 个描述
6. `src/cli/config-cli.ts` - 4 个描述

**其他文件 (优先级中):** 7. `src/cli/models-cli.ts` - 28 个描述 8. `src/cli/nodes-cli/*.ts` - 20+ 个描述 9. `src/cli/program/register.*.ts` - 20+ 个描述 10. `src/cli/cron-cli/*.ts` - 10 个描述 11. `src/cli/memory-cli.ts` - 5 个描述 12. `src/cli/security-cli.ts` - 2 个描述 13. `src/cli/system-cli.ts` - 7 个描述 14. `src/cli/hooks-cli.ts` - 10 个描述 15. 其他 40+ 个文件...

### 1.2 向导文本 (95 个 message/label, 9 个文件)

**主要文件:**

1. `src/wizard/onboarding.ts` - 16 个消息
2. `src/wizard/onboarding.finalize.ts` - 12 个消息
3. `src/wizard/onboarding.gateway-config.ts` - 14 个消息
4. `src/wizard/clack-prompter.ts` - 8 个消息
5. `src/wizard/session.ts` - 10 个消息

### 1.3 配对消息

1. `src/pairing/pairing-messages.ts` - 1 个函数需迁移

---

## 2. 详细实施步骤

### 2.1 第一步: 核心 CLI 命令 (10 个文件)

**目标文件:**

1. `src/cli/plugins-cli.ts`
2. `src/cli/gateway-cli/register.ts`
3. `src/cli/browser-cli.ts`
4. `src/cli/browser-cli-manage.ts`
5. `src/cli/browser-cli-state.ts`
6. `src/cli/pairing-cli.ts`
7. `src/cli/channels-cli.ts`
8. `src/cli/config-cli.ts`
9. `src/cli/memory-cli.ts`
10. `src/cli/security-cli.ts`

**实施方法:**

```typescript
// 修改前:
.description("Manage OpenClaw plugins/extensions")

// 修改后:
import { t } from "../i18n/index.js";
.description(t('cli.plugins.description'))
```

**新增翻译键:**

- 可能需要补充一些 CLI 的翻译键到语言包

### 2.2 第二步: 向导文本 (5 个文件)

**目标文件:**

1. `src/wizard/onboarding.ts`
2. `src/wizard/onboarding.finalize.ts`
3. `src/wizard/onboarding.gateway-config.ts`
4. `src/wizard/clack-prompter.ts`
5. `src/wizard/session.ts`

**实施方法:**

```typescript
// 修改前:
message: "Onboarding mode";

// 修改后:
import { t } from "../i18n/index.js";
message: t("wizard.onboarding.mode");
```

**注意:**

- 部分文本已存在于语言包中
- 需要补充缺失的键

### 2.3 第三步: 配对消息

**目标文件:**

1. `src/pairing/pairing-messages.ts`

**实施方法:**

```typescript
// 修改前:
return [
  "OpenClaw: access not configured.",
  `Pairing code: ${code}`,
  ...
].join("\n");

// 修改后:
import { t } from "../i18n/index.js";
return [
  t('pairing.request.title'),
  "",
  t('pairing.request.code', { code }),
  ...
].join("\n");
```

### 2.4 第四步: 其他 CLI 文件 (50+ 个文件)

分批处理剩余文件:

- program/\*.ts
- cron-cli/\*.ts
- nodes-cli/\*.ts
- models-cli.ts
- system-cli.ts
- hooks-cli.ts
- 其他...

---

## 3. 验证计划

### 3.1 类型检查

```bash
pnpm tsc --noEmit
```

### 3.2 单元测试

```bash
pnpm test src/i18n/index.test.ts
```

### 3.3 功能测试

```bash
# 英文模式
pnpm openclaw --help

# 中文模式
OPENCLAW_LANG=zh-CN pnpm openclaw --help
```

---

## 4. 风险与注意事项

### 4.1 循环依赖风险

- `src/i18n/config.ts` 导入 `src/config/io.ts`
- CLI 文件导入 `src/i18n/index.js`
- 需要确保没有循环依赖

### 4.2 动态导入

- 部分 CLI 文件可能使用动态导入
- 需要确保 i18n 在这些文件之前初始化

### 4.3 测试文件

- 测试文件也可能使用硬编码文本
- 可能需要更新测试以使用翻译

### 4.4 缺失的翻译键

- 可能会有文本没有对应的翻译键
- 需要及时发现并补充

---

## 5. 实施检查清单

### 每个文件的检查项:

- [ ] 添加 `import { t } from ".../i18n/index.js"`
- [ ] 替换所有 `.description("...")` 为 `.description(t('...'))`
- [ ] 确保相对路径正确（根据文件深度调整）
- [ ] 如果有插值，使用 `t('key', { var: value })`
- [ ] 运行类型检查无错误

### 验证检查项:

- [ ] TypeScript 编译通过
- [ ] 单元测试通过
- [ ] CLI --help 正常显示
- [ ] 中文模式正常显示
- [ ] 无运行时错误

---

## 6. 时间安排

| 步骤              | 文件数  | 预计时间    | 优先级 |
| ----------------- | ------- | ----------- | ------ |
| 核心 CLI (10 个)  | 10      | 2 小时      | 高     |
| 向导文本 (5 个)   | 5       | 1.5 小时    | 高     |
| 配对消息          | 1       | 0.5 小时    | 高     |
| 其他 CLI (50+ 个) | 50      | 5 小时      | 中     |
| 验证测试          | -       | 1 小时      | 高     |
| **总计**          | **66+** | **10 小时** | -      |

建议分多个 PR 提交:

- PR 1: 核心 CLI (10 个文件)
- PR 2: 向导 + 配对 (6 个文件)
- PR 3: 其他 CLI (分批)

---

## 7. 成功标准

1. ✅ 所有 CLI 命令描述使用 `t()` 函数
2. ✅ 所有向导文本使用 `t()` 函数
3. ✅ 所有配对消息使用 `t()` 函数
4. ✅ TypeScript 编译无错误
5. ✅ 单元测试通过
6. ✅ `OPENCLAW_LANG=zh-CN openclaw --help` 显示中文
7. ✅ 默认情况下 `openclaw --help` 显示英文

---

**准备开始实施！**
