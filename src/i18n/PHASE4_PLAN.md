# Phase 4 实施计划

**日期:** 2026-02-01  
**目标:** 批量迁移剩余 CLI 文件

---

## 1. 现状分析

**已完成:**

- i18n 基础设施
- 12 个核心文件迁移
- 205 个翻译键
- 工具脚本 + 文档

**剩余工作:**

- 106 个 .description() 调用待迁移
- 分布在 ~30 个文件中

**Top 5 文件:**

1. models-cli.ts: 30 个
2. channels-cli.ts: 10 个
3. hooks-cli.ts: 8 个
4. system-cli.ts: 7 个
5. directory-cli.ts: 7 个

---

## 2. Phase 4 目标

### 核心任务 (2小时内完成)

迁移 5 个最重要的文件:

- channels-cli.ts (10 个)
- config-cli.ts (4 个)
- memory-cli.ts (5 个)
- system-cli.ts (7 个)
- security-cli.ts (2 个)

**总计:** 5 个文件，28 个描述

### 成功标准

- 新增 28 个翻译键
- 总键数达到 233 个
- 验证脚本通过
- 核心 CLI 95%+ 汉化

---

## 3. 实施步骤

### Step 1: channels-cli.ts

- 分析 10 个描述
- 添加导入: `import { t } from "../i18n/index.js"`
- 添加翻译键到 cli.ts
- 替换所有 .description() 调用

### Step 2-5: 其他文件

- 重复上述流程
- 每个文件验证

### Step 6: 最终验证

- 运行 validate.ts
- 统计翻译键数量
- 生成报告

---

## 4. 风险与对策

**风险1:** 键名冲突

- 对策: 使用文件前缀区分

**风险2:** 导入路径错误

- 对策: 统一使用 `../i18n/index.js`

**风险3:** 遗漏翻译键

- 对策: 运行验证脚本检查

---

准备开始实施!
