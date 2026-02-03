# 上游更新分批次合并计划

## 执行摘要

- **总提交数**: 178个上游提交待合并
- **当前状态**: 已合并SSRF安全修复和Docker改进（27个文件）
- **策略**: 按风险等级和类别分6批次合并
- **预估时间**: 4-6小时

---

## 批次详情

### 批次1: 关键安全修复 (最高优先级) ⭐⭐⭐

**目标**: 合并所有安全相关的修复
**预计文件数**: 15-20个文件
**风险等级**: 低（本地无相关修改）
**预计时间**: 30分钟

**包含的提交类型**:

- LFI防护 (Local File Inclusion)
- 代码执行阻止
- 路径遍历防护
- 环境变量验证
- 消息工具路径验证
- WhatsApp accountId 清理

**关键文件**:

```
src/auto-reply/reply/get-reply-run.ts
src/auto-reply/reply/stage-sandbox-media.ts
src/agents/tools/message-tool.ts
src/agents/tools/message-tool.test.ts
src/channels/whatsapp/whatsapp.ts
src/channels/whatsapp/whatsapp.message-sending.ts
extensions/lobster/src/lobster-tool.ts
src/security/external-content.ts
src/infra/validation.ts
```

**执行命令**:

```bash
# LFI防护
git checkout origin/origin -- src/auto-reply/reply/get-reply-run.ts
git checkout origin/origin -- src/auto-reply/reply/stage-sandbox-media.ts

# 代码执行阻止
git checkout origin/origin -- extensions/lobster/src/lobster-tool.ts

# 消息工具安全
git checkout origin/origin -- src/agents/tools/message-tool.ts

# WhatsApp安全
git checkout origin/origin -- src/channels/whatsapp/

# 环境验证
git checkout origin/origin -- src/infra/validation.ts
```

**验证**:

- [ ] 构建通过
- [ ] 安全相关测试通过
- [ ] 提交并标注

---

### 批次2: 功能特性 (高优先级) ⭐⭐

**目标**: 合并新功能特性
**预计文件数**: 20-30个文件
**风险等级**: 中（可能涉及接口变更）
**预计时间**: 45分钟

**包含功能**:

- 网关时间戳注入
- Discord PluralKit 身份解析
- 路由线程继承
- TTS工具改进
- 嵌入向量归一化

**关键文件**:

```
src/gateway/chat.ts
src/gateway/agent-handler.ts
src/channels/discord/discord.ts
src/channels/discord/pluralkit.ts
src/routing/bindings.ts
src/routing/thread-inheritance.ts
src/agents/tools/tts-tool.ts
src/memory/embeddings.ts
```

**注意事项**:

- 检查与i18n功能的兼容性
- 时间戳注入可能影响消息格式化

---

### 批次3: Bug修复 (高优先级) ⭐⭐

**目标**: 合并重要的bug修复
**预计文件数**: 30-40个文件
**风险等级**: 中低
**预计时间**: 60分钟

**包含修复**:

- Telegram流式传输修复
- Windows进程spawn修复
- 模型选择器崩溃修复
- 内存/缓存修复
- 超时处理改进

**关键文件**:

```
src/channels/telegram/telegram.ts
src/channels/telegram/streaming.ts
src/agents/tools/process.ts
src/agents/tools/process.test.ts
src/components/model-selector.ts
src/agents/cache.ts
src/agents/session-manager.ts
```

---

### 批次4: 工具适配器和签名对齐 (中等优先级) ⭐

**目标**: 合并工具适配器修复
**预计文件数**: 20-25个文件
**风险等级**: 中（可能影响工具执行）
**预计时间**: 45分钟

**包含修复**:

- 工具执行签名对齐
- 参数顺序修复
- 遗留签名处理
- 适配器规范化

**关键文件**:

```
src/agents/tools/adapter*.ts
src/agents/tool-executor.ts
src/agents/tool-registry.ts
```

**注意事项**:

- 需要仔细检查工具执行流程
- 测试关键工具功能

---

### 批次5: 代码风格和导入排序 (低优先级)

**目标**: 合并代码风格改进
**预计文件数**: 100+个文件
**风险等级**: 低（纯格式化变更）
**预计时间**: 30分钟

**包含变更**:

- 导入排序
- 代码格式化
- TypeScript类型改进

**策略**:
由于本地也有大量导入排序修改，建议：

1. 直接使用上游版本
2. 然后运行本地格式化工具
3. 或者跳过此批次（可选）

**执行**:

```bash
# 批量检出所有工具文件
git checkout origin/origin -- src/agents/tools/
git checkout origin/origin -- src/channels/
git checkout origin/origin -- src/gateway/
```

---

### 批次6: 文档和CI (最低优先级)

**目标**: 合并文档和CI改进
**预计文件数**: 50+个文件
**风险等级**: 极低
**预计时间**: 20分钟

**包含变更**:

- 文档更新
- CI工作流改进
- 测试配置
- 变更日志

**执行**:

```bash
git checkout origin/origin -- docs/
git checkout origin/origin -- .github/
git checkout origin/origin -- CHANGELOG.md
```

---

## 风险缓解策略

### 高风险场景及应对

1. **大量冲突**
   - 应对: 分批处理，每批后验证
   - 回滚: 使用git checkout放弃变更

2. **构建失败**
   - 应对: 检查TypeScript错误，修复类型问题
   - 工具: 使用pnpm build检查

3. **测试失败**
   - 应对: 运行pnpm test识别失败测试
   - 修复: 查看上游测试变更

4. **i18n功能受影响**
   - 应对: 保持src/i18n/和ui/src/i18n/不变
   - 验证: 测试语言切换功能

---

## 执行检查清单

### 每批次执行前:

- [ ] 确认当前分支正确
- [ ] 工作区干净
- [ ] 已备份当前状态

### 每批次执行后:

- [ ] pnpm install
- [ ] pnpm build (通过)
- [ ] 关键测试通过
- [ ] git status检查变更
- [ ] git diff --stat查看修改范围
- [ ] git commit提交

### 最终验证:

- [ ] 完整构建通过
- [ ] 完整测试套件通过
- [ ] i18n功能正常
- [ ] 提交历史清晰

---

## 时间估算

| 批次 | 内容       | 预计时间 | 累计时间    |
| ---- | ---------- | -------- | ----------- |
| 1    | 安全修复   | 30分钟   | 30分钟      |
| 2    | 功能特性   | 45分钟   | 1小时15分钟 |
| 3    | Bug修复    | 60分钟   | 2小时15分钟 |
| 4    | 工具适配器 | 45分钟   | 3小时       |
| 5    | 代码风格   | 30分钟   | 3小时30分钟 |
| 6    | 文档CI     | 20分钟   | 3小时50分钟 |
| -    | 最终验证   | 30分钟   | 4小时20分钟 |

**总计**: 约4.5小时

---

## 回滚计划

如果遇到无法解决的问题:

```bash
# 放弃所有变更，回到上次提交
git reset --hard HEAD

# 或者放弃特定文件
git checkout HEAD -- <file-path>
```

---

_计划制定时间: 2026-02-03_
_制定人: Sisyphus AI Agent_
