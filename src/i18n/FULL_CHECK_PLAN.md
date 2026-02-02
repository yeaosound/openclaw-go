# OpenClaw i18n 全量检查方案

**版本:** 1.0  
**日期:** 2026-02-02  
**适用范围:** OpenClaw i18n 汉化项目所有阶段

---

## 1. 检查目标

### 1.1 总体目标

确保 i18n 汉化项目的完整性和质量：
- 所有用户可见文本已汉化
- 中英文语言包同步
- 类型安全（TypeScript 编译通过）
- 功能正常（运行时测试通过）
- 性能无退化
- 代码质量符合标准

### 1.2 检查维度

| 维度 | 检查项 | 工具/方法 |
|------|--------|----------|
| 静态检查 | TypeScript 编译 | tsc |
| 静态检查 | 翻译键完整性 | validate-translations.ts |
| 静态检查 | 语言包同步 | diff |
| 静态检查 | 代码规范 | grep |
| 动态检查 | 单元测试 | vitest |
| 动态检查 | 运行时功能 | test-runtime.ts |
| 动态检查 | 性能基准 | benchmark.ts |
| 集成检查 | CLI 命令 | openclaw --help |
| 集成检查 | 频道消息 | 模拟触发 |

---

## 2. 详细检查清单

### 2.1 静态检查

#### TypeScript 编译检查

**命令:**
```bash
npx tsc --noEmit --skipLibCheck
```

**通过标准:**
- [ ] 无编译错误
- [ ] 无类型错误

**检查范围:**
- src/i18n/**/*.ts
- src/cli/**/*.ts
- src/discord/**/*.ts
- src/slack/**/*.ts
- src/telegram/**/*.ts
- src/agents/tools/**/*.ts

#### 翻译键完整性检查

**命令:**
```bash
cd src/i18n && npx tsx scripts/validate-translations.ts
```

**通过标准:**
- [ ] EN 和 ZH-CN 键数相同
- [ ] 所有代码中使用的翻译键存在于语言包
- [ ] 键命名规范统一

#### 语言包同步检查

**命令:**
```bash
cd src/i18n/locales
diff <(grep "'" en/channels.ts | sort) <(grep "'" zh-CN/channels.ts | sort)
```

**通过标准:**
- [ ] EN 和 ZH-CN 键完全同步
- [ ] 无独占键

### 2.2 动态检查

#### 单元测试

**命令:**
```bash
npx vitest run src/i18n/index.test.ts
```

**通过标准:**
- [ ] 15/15 测试通过
- [ ] 覆盖率 > 80%

**测试覆盖:**
- [ ] 基础翻译功能
- [ ] 参数插值
- [ ] 语言切换
- [ ] 可用语言列表
- [ ] 缺失键回退
- [ ] 翻译统计
- [ ] 键存在性检查
- [ ] 自定义加载器

#### 运行时功能测试

**命令:**
```bash
cd src/i18n && npx tsx scripts/test-runtime.ts
```

**通过标准:**
- [ ] 基础翻译正常工作
- [ ] 语言切换正常
- [ ] 参数插值正确
- [ ] 回退机制有效

#### 性能基准测试

**命令:**
```bash
cd src/i18n && npx tsx scripts/benchmark.ts
```

**性能指标:**
| 指标 | 基准值 | 优秀值 |
|------|--------|--------|
| 简单翻译 | 10M ops/s | 20M+ ops/s |
| 插值翻译 | 1M ops/s | 1.5M+ ops/s |
| 语言切换 | < 1μs | < 0.5μs |
| 内存增长 | < 10MB | < 5MB |

### 2.3 集成检查

#### CLI 命令测试

**命令:**
```bash
# 测试 CLI 帮助
OPENCLAW_LANG=zh-CN pnpm openclaw --help

# 测试各命令
OPENCLAW_LANG=zh-CN pnpm openclaw plugins --help
OPENCLAW_LANG=zh-CN pnpm openclaw channels --help
```

**检查内容:**
- [ ] 帮助文本显示正确
- [ ] 命令描述已翻译
- [ ] 选项描述已翻译

---

## 3. 一键检查脚本

创建 `scripts/check-i18n.sh`:

```bash
#!/bin/bash
set -e

echo "OpenClaw i18n Full Check"
echo ""

# 1. TypeScript Compile
echo "1. TypeScript Compile..."
npx tsc --noEmit --skipLibCheck
echo "   PASS"
echo ""

# 2. Unit Tests
echo "2. Unit Tests..."
npx vitest run src/i18n/index.test.ts --reporter=verbose
echo "   PASS"
echo ""

# 3. Translation Validation
echo "3. Translation Validation..."
cd src/i18n && npx tsx scripts/validate-translations.ts
echo "   PASS"
echo ""

# 4. Runtime Test
echo "4. Runtime Test..."
npx tsx scripts/test-runtime.ts
echo "   PASS"
echo ""

# 5. Performance Benchmark
echo "5. Performance Benchmark..."
npx tsx scripts/benchmark.ts
echo "   PASS"
echo ""

echo "All checks passed!"
```

---

## 4. 持续集成配置

GitHub Actions 配置示例:

```yaml
name: i18n Check
on: [push, pull_request]

jobs:
  i18n-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: TypeScript Compile
        run: npx tsc --noEmit --skipLibCheck
      
      - name: Unit Tests
        run: npx vitest run src/i18n/index.test.ts
      
      - name: Translation Validation
        run: cd src/i18n && npx tsx scripts/validate-translations.ts
```

---

## 5. 附录

### 相关文件

- `src/i18n/scripts/validate-translations.ts` - 翻译验证
- `src/i18n/scripts/test-runtime.ts` - 运行时测试
- `src/i18n/scripts/benchmark.ts` - 性能基准
- `I18N_ROADMAP.md` - 汉化路线图

### 通过标准汇总

| 检查项 | 标准 |
|--------|------|
| TypeScript 编译 | 0 错误 |
| 单元测试 | 15/15 通过 |
| 翻译键完整性 | 425/425 同步 |
| 运行时测试 | 7/7 通过 |
| 性能基准 | 全部优秀 |

---

**文档版本:** 1.0  
**最后更新:** 2026-02-02
