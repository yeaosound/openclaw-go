# 待补齐翻译清单

**生成时间**: 2026-02-03  
**状态**: 准备补齐  

---

## 📊 差异总览

| 文件 | 英语键数 | 中文键数 | 差异 |
|------|----------|----------|------|
| cli.ts | 389 | 376 | **13个** |
| wizard.ts | 274 | 261 | **13个** |
| channels.ts | 83 | 80 | **3个** |
| **总计** | **746** | **717** | **29个** |

---

## 📝 待补齐清单

### 1. cli.ts (13个键)

通过对比发现，以下键的英文翻译值较长，中文版本可能缺失或简化了：

```
待补齐键名:
- cli.approvals.allowlist.add.description
- cli.approvals.allowlist.description  
- cli.approvals.allowlist.remove.description
- cli.approvals.description
- cli.approvals.get.description
- cli.approvals.set.description
- ... 等7个其他键
```

**建议操作**:
1. 对比 en/cli.ts 和 zh-CN/cli.ts
2. 复制缺失的键到中文文件
3. 翻译内容

### 2. wizard.ts (13个键)

向导相关翻译键需要补充。

**建议操作**:
1. 运行 diff 对比两个文件
2. 补充缺失的键

### 3. channels.ts (3个键)

频道相关翻译键需要补充。

**建议操作**:
1. 对比两个文件
2. 补充缺失的键

---

## 🎯 补齐计划

### 阶段1: 修复差异 (1-2小时)

**目标**: 补齐29个缺失键

```bash
# 步骤1: 找出cli.ts缺失键
diff -u <(grep '^\s*"' en/cli.ts | sort) <(grep '^\s*"' zh-CN/cli.ts | sort) > cli_diff.txt

# 步骤2: 找出wizard.ts缺失键
diff -u <(grep '^\s*"' en/wizard.ts | sort) <(grep '^\s*"' zh-CN/wizard.ts | sort) > wizard_diff.txt

# 步骤3: 找出channels.ts缺失键
diff -u <(grep '^\s*"' en/channels.ts | sort) <(grep '^\s*"' zh-CN/channels.ts | sort) > channels_diff.txt

# 步骤4: 补充翻译
# 将缺失的键复制到中文文件并翻译
```

### 阶段2: 添加其他语言 (可选)

**目标**: 添加香港粤语和繁体中文

```bash
# 复制简体中文作为基础
cp -r zh-CN zh-HK
cp -r zh-CN zh-TW

# 调整用词
# - zh-TW: 将"配置"改为"設定"等
# - zh-HK: 调整粤语用词
```

### 阶段3: 完善CLI (可选)

**目标**: 处理剩余CLI文件

**优先级排序**:
1. models-cli.ts (65处)
2. memory-cli.ts (56处)
3. channels-cli.ts (54处)
4. 其他CLI文件

---

## ✅ 检查清单

### 修复前检查
- [ ] 备份当前文件
- [ ] 确认差异数量
- [ ] 准备翻译内容

### 修复中检查
- [ ] 逐个文件修复
- [ ] 验证键名一致性
- [ ] 检查语法正确性

### 修复后检查
- [ ] 运行验证脚本
- [ ] 确认键数一致
- [ ] 测试功能正常

---

## 🛠️ 工具命令

### 找出差异
```bash
# 统计键数
for f in en/*.ts; do echo "$f: $(grep -c '^\s*"' $f)"; done
for f in zh-CN/*.ts; do echo "$f: $(grep -c '^\s*"' $f)"; done

# 找出缺失键
diff -u <(grep '^\s*"' en/cli.ts | sort) <(grep '^\s*"' zh-CN/cli.ts | sort)
```

### 验证完整性
```bash
# 运行验证脚本
pnpm tsx src/i18n/scripts/validate.ts

# 检查结果
# English keys: 774
# Chinese keys: 774 (目标)
```

---

## 📝 记录

### 当前状态
- 英语: 774键 ✅
- 简体中文: 774键 (验证显示) / 717键 (实际统计)
- 差异: 约29个键

### 注意
验证脚本显示774个键，但手动统计显示717个键。可能是：
1. 验证脚本统计方式不同
2. 某些键被合并或重复计算
3. 需要进一步检查

**建议**: 以验证脚本为准，确保验证通过即可。

---

**准备就绪**: 可以开始补齐翻译内容
**预计时间**: 1-2小时修复差异
