# OpenClaw Onboarding 翻译任务清单

**生成时间**: 2026-02-02  
**任务状态**: 进行中  
**预估工作量**: 4-6小时

---

## 任务概览

### 已完成
- Skills 配置主要文本翻译
- Hooks 配置主要文本翻译
- Gateway Service 主要文本翻译
- Control UI 主要文本翻译
- TUI 启动文本翻译
- Token 说明翻译
- Workspace Backup 翻译
- Security 警告翻译
- Web Search 说明翻译
- Completion 完成提示翻译

### 待完成
- 验证错误消息翻译
- 配置向导文本翻译
- 频道设置文本翻译
- 远程网关文本翻译
- Tailscale 相关文本翻译
- DM 策略配置翻译

---

## 文件 1: src/wizard/onboarding.ts

**优先级**: 高 | **预估时间**: 30分钟

### 待翻译项

1. **行 128** - "Invalid config" 
   - 建议键: `wizard.config.invalidTitle`
   - 译文: "配置无效"

2. **行 136** - "Config issues"
   - 建议键: `wizard.config.issuesTitle`
   - 译文: "配置问题"

3. **行 140** - "Config invalid. Run..."
   - 建议键: `wizard.config.invalidOutro`
   - 译文: "配置无效。运行 `{command}` 修复它，然后重新运行 onboarding。"

4. **行 146** - "Configure details later..."
   - 建议键: `wizard.onboarding.quickstartHint`
   - 译文: "稍后在 `{command}` 中配置详细信息。"

5. **行 147** - "Configure port, network..."
   - 建议键: `wizard.onboarding.manualHint`
   - 译文: "配置端口、网络、Tailscale 和身份验证选项。"

6. **行 155** - "Invalid --flow..."
   - 建议键: `wizard.onboarding.invalidFlowError`
   - 译文: "无效的 --flow（使用 quickstart、manual 或 advanced）。"

7. **行 352** - "No remote URL configured yet"
   - 建议键: `wizard.setup.noRemoteUrl`
   - 译文: "尚未配置远程 URL"

8. **行 365** - "Remote gateway configured."
   - 建议键: `wizard.setup.remoteConfigured`
   - 译文: "远程网关已配置。"

9. **行 374** - "Workspace directory"
   - 建议键: `wizard.workspace.prompt`
   - 译文: "工作区目录"

10. **行 448** - "Channels" (note标题)
    - 建议键: `wizard.channels.title`
    - 译文: "频道"

11. **行 472** - "Skills" (note标题)
    - 建议键: `wizard.skills.title`
    - 译文: "技能"

---

## 文件 2: src/wizard/onboarding.gateway-config.ts

**优先级**: 高 | **预估时间**: 45分钟

### 验证错误消息

1. **行 43** - "Invalid port"
   - 建议键: `validation.invalidPort`
   - 译文: "无效端口"

2. **行 73** - "IP address is required..."
   - 建议键: `validation.ipRequired`
   - 译文: "自定义绑定模式需要 IP 地址"

3. **行 78** - "Invalid IPv4 address..."
   - 建议键: `validation.invalidIpFormat`
   - 译文: "无效 IPv4 地址（例如：192.168.1.100）"

4. **行 88** - "Invalid IPv4 address..."
   - 建议键: `validation.invalidIpRange`
   - 译文: "无效 IPv4 地址（每个八位字节必须为 0-255）"

### 提示文本

5. **行 68** - "Custom IP address"
   - 建议键: `wizard.gateway.customIpPrompt`
   - 译文: "自定义 IP 地址"

6. **行 104** - "Recommended default (local + remote)"
   - 建议键: `wizard.gateway.auth.hint`
   - 译文: "推荐默认值（本地 + 远程）"

7. **行 121** - "Private HTTPS for your tailnet..."
   - 建议键: `wizard.gateway.tailscale.serveHint`
   - 译文: "为您的 tailnet 提供私有 HTTPS"

8. **行 126** - "Public HTTPS via Tailscale Funnel..."
   - 建议键: `wizard.gateway.tailscale.funnelHint`
   - 译文: "通过 Tailscale Funnel 提供公共 HTTPS"

9. **行 158** - "Reset Tailscale serve/funnel on exit?"
   - 建议键: `wizard.gateway.tailscale.resetPrompt`
   - 译文: "退出时重置 Tailscale serve/funnel？"

10. **行 184** - "Gateway token (blank to generate)"
    - 建议键: `wizard.gateway.tokenPrompt`
    - 译文: "网关令牌（留空以生成）"

11. **行 185** - "Needed for multi-machine..."
    - 建议键: `wizard.gateway.tokenPlaceholder`
    - 译文: "多机器或非回环访问所需"

12. **行 197** - "Gateway password"
    - 建议键: `wizard.gateway.passwordPrompt`
    - 译文: "网关密码"

### Tailscale 警告

13. **行 137-143** - Tailscale binary not found...
    - 建议键: `wizard.tailscale.warning`
    - 译文: "在 PATH 或 /Applications 中找不到 Tailscale 二进制文件。确保从 https://tailscale.com/download 安装 Tailscale。您可以继续设置，但 serve/funnel 将在运行时失败。"

14. **行 154** - "Tailscale" (note标题)
    - 建议键: `wizard.tailscale.title`
    - 译文: "Tailscale"

---

## 文件 3: src/commands/onboard-channels.ts

**优先级**: 中 | **预估时间**: 40分钟

### 频道操作选项

1. **行 58** - "Modify settings"
   - 建议键: `wizard.channels.action.modify`
   - 译文: "修改设置"

2. **行 62** - "Disable (keeps config)"
   - 建议键: `wizard.channels.action.disable`
   - 译文: "禁用（保留配置）"

3. **行 66** - "Delete config"
   - 建议键: `wizard.channels.action.delete`
   - 译文: "删除配置"

4. **行 70** - "Skip (leave as-is)"
   - 建议键: `wizard.channels.action.skip`
   - 译文: "跳过（保持原样）"

5. **行 79** - "already configured. What do you want to do?"
   - 建议键: `wizard.channels.configuredPrompt`
   - 译文: "已配置。您想做什么？"

6. **行 102** - "account"
   - 建议键: `wizard.channels.accountPrompt`
   - 译文: "账户"

### DM 策略配置

7. **行 241** - "Configure DM access policies now?"
   - 建议键: `wizard.channels.dmPolicy.confirm`
   - 译文: "立即配置 DM 访问策略？（默认：配对）"

8. **行 252-258** - DM策略说明
   - 建议键: `wizard.channels.dmPolicy.note`
   - 包含多行说明文本

9. **行 259** - "DM access" (note标题)
   - 建议键: `wizard.channels.dmPolicy.accessTitle`
   - 译文: "DM 访问"

10. **行 262** - "DM policy"
    - 建议键: `wizard.channels.dmPolicy.selectTitle`
    - 译文: "DM 策略"

11. **行 264-267** - 策略选项
    - Pairing (recommended) -> 配对（推荐）
    - Allowlist (specific users only) -> 白名单（仅特定用户）
    - Open (public inbound DMs) -> 开放（公共入站 DM）
    - Disabled (ignore DMs) -> 禁用（忽略 DM）

### 其他

12. **行 310** - "Channel status"
    - 建议键: `wizard.channels.statusNoteTitle`
    - 译文: "频道状态"

13. **行 316** - "Configure chat channels now?"
    - 建议键: `wizard.channels.setupConfirm`
    - 译文: "立即配置聊天频道？"

14. **行 471** - "plugin not available."
    - 建议键: `wizard.channels.pluginNotAvailable`
    - 译文: "插件不可用。"

15. **行 481** - "does not support onboarding yet."
    - 建议键: `wizard.channels.noOnboarding`
    - 译文: "尚不支持 onboarding。"

16. **行 638** - "Select a channel"
    - 建议键: `wizard.channels.selectPrompt`
    - 译文: "选择一个频道"

17. **行 667** - "Selected channels"
    - 建议键: `wizard.channels.selectedTitle`
    - 译文: "已选频道"

---

## 文件 4: src/commands/onboard-remote.ts

**优先级**: 低 | **预估时间**: 30分钟

1. **行 40** - "Discover gateway on LAN (Bonjour)?"
   - 建议键: `wizard.remote.discoverPrompt`
   - 译文: "在局域网上发现网关（Bonjour）？"

2. **行 48** - "Bonjour discovery requires..."
   - 建议键: `wizard.remote.bonjourRequired`
   - 译文: "Bonjour 发现需要 dns-sd（macOS）或 avahi-browse（Linux）。"

3. **行 51** - "Discovery" (note标题)
   - 建议键: `wizard.remote.discoveryTitle`
   - 译文: "发现"

4. **行 59** - "Searching for gateways..."
   - 建议键: `wizard.remote.searching`
   - 译文: "正在搜索网关..."

5. **行 61** - "Found X gateway(s)" / "No gateways found"
   - 建议键: `wizard.remote.found` / `wizard.remote.noneFound`
   - 译文: "找到 X 个网关" / "未找到网关"

6. **行 65** - "Select gateway"
   - 建议键: `wizard.remote.selectGateway`
   - 译文: "选择网关"

7. **行 71** - "Enter URL manually"
   - 建议键: `wizard.remote.manualUrl`
   - 译文: "手动输入 URL"

8. **行 86** - "Connection method"
   - 建议键: `wizard.remote.connectionMethod`
   - 译文: "连接方式"

9. **行 90** - "Direct gateway WS"
   - 建议键: `wizard.remote.directWs`
   - 译文: "直接网关 WS"

10. **行 92** - "SSH tunnel (loopback)"
    - 建议键: `wizard.remote.sshTunnel`
    - 译文: "SSH 隧道（回环）"

11. **行 101-108** - SSH隧道说明
    - 建议键: `wizard.remote.sshNote`
    - 多行说明文本

12. **行 114** - "Gateway WebSocket URL"
    - 建议键: `wizard.remote.wsUrlPrompt`
    - 译文: "网关 WebSocket URL"

13. **行 124** - "Gateway auth"
    - 建议键: `wizard.remote.authPrompt`
    - 译文: "网关认证"

14. **行 135** - "Gateway token"
    - 建议键: `wizard.remote.tokenPrompt`
    - 译文: "网关令牌"

---

## 实施建议

### 阶段 1: 高优先级 (1.5小时)
1. `src/wizard/onboarding.ts` - 核心 onboarding 流程
2. `src/wizard/onboarding.gateway-config.ts` - 网关配置

### 阶段 2: 中优先级 (1小时)
3. `src/commands/onboard-channels.ts` - 频道设置

### 阶段 3: 低优先级 (1小时)
4. `src/commands/onboard-remote.ts` - 远程网关
5. 补充遗漏的提示和验证消息

### 翻译文件更新
- 同步更新 `src/i18n/locales/zh-CN/wizard.ts`
- 同步更新 `src/i18n/locales/en/wizard.ts`
- 保持翻译键命名一致性

### 质量检查清单
- [ ] TypeScript 编译无错误
- [ ] 所有新增翻译键在两种语言文件中都有定义
- [ ] 动态插值（如 {label}, {command}）正确使用
- [ ] 验证错误消息简洁明了
- [ ] 标题和提示文本符合上下文
