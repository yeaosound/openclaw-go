// 简体中文翻译 - 嚮導模块
export const wizardMessages = {
  // Language selection
  "wizard.language.select": "请選擇您的首选语言",
  "wizard.language.current": "目前",
  "wizard.language.changed": "语言已切换为: {locale}",

  // Onboarding
  "wizard.intro.title": "OpenClaw 入门",

  // Security warning
  "wizard.security.title": "安全警告",
  "wizard.security.note": `安全警告 — 请仔细阅读。

OpenClaw 是一个业余專案，目前处于测试阶段。请预期会有各種問題。
如果啟用了工具，此机器人可以讀取檔案并执行操作。
錯誤的提示可能会诱使它执行不安全的操作。

如果您对基本安全和存取控制感到不舒服，请不要執行 OpenClaw。
在啟用工具或将其暴露给互联网之前，请向有经验的人寻求說明。

推薦的安全基线：
- 配对/白名单 + @提及限制
- 沙箱 + 最小权限工具
- 将机密訊息保留在代理可存取的檔案系統之外
- 对于具有工具或不受信任收件箱的任何机器人，使用最強大的可用模型

定期執行：
openclaw security audit --deep
openclaw security audit --fix

必读：https://docs.openclaw.ai/gateway/security`,
  "wizard.security.confirm": "我理解这很强大且存在固有風險。继续吗？",

  // Config handling
  "wizard.config.existing": "检测到现有設定",
  "wizard.config.invalid": "設定無效",
  "wizard.config.issues.title": "設定問題",
  "wizard.config.action": "設定處理",
  "wizard.config.action.keep": "使用现有值",
  "wizard.config.action.modify": "更新值",
  "wizard.config.action.reset": "重設",
  "wizard.config.reset.scope": "重設范围",
  "wizard.config.reset.config": "仅設定",
  "wizard.config.reset.config-creds-sessions": "設定 + 凭证 + 會話",
  "wizard.config.reset.full": "完全重設（設定 + 凭证 + 會話 + 工作区）",
  "wizard.config.invalid.hint": "設定無效。執行 `{command}` 修復它，然后重新執行入门程式。",

  // Onboarding mode
  "wizard.onboarding.mode": "入门模式",
  "wizard.onboarding.quickstart.label": "快速開始",
  "wizard.onboarding.quickstart.hint": "稍後在 {command} 中設定詳細訊息。",
  "wizard.onboarding.advanced.label": "手動",
  "wizard.onboarding.advanced.hint": "設定連接埠、網路、Tailscale 和身份驗證選項。",
  "wizard.onboarding.remote.notice": "快速開始仅支援本機網關。切换到手動模式。",

  // Gateway configuration
  "wizard.gateway.port": "網關連接埠",
  "wizard.gateway.bind": "網關绑定",
  "wizard.gateway.bind.loopback": "本機回环 (127.0.0.1)",
  "wizard.gateway.bind.lan": "局域网",
  "wizard.gateway.bind.tailnet": "Tailnet",
  "wizard.gateway.bind.auto": "自動",
  "wizard.gateway.bind.custom": "自訂",
  "wizard.gateway.customIp": "網關自訂 IP",
  "wizard.gateway.auth": "網關認證",
  "wizard.gateway.auth.mode": "網關身份驗證模式",
  "wizard.gateway.auth.token": "網關權杖",
  "wizard.gateway.auth.token.default": "權杖（預設）",
  "wizard.gateway.auth.password": "密碼",
  "wizard.gateway.tailscale": "Tailscale 暴露",
  "wizard.gateway.tailscale.off": "關閉",
  "wizard.gateway.tailscale.serve": "Serve",
  "wizard.gateway.tailscale.funnel": "Funnel",
  "wizard.gateway.tailscale.noExposure": "无 Tailscale 暴露",
  "wizard.gateway.probe.success": "網關可存取！",
  "wizard.gateway.probe.failed": "无法存取網關。",
  "wizard.quickstart.title": "快速開始",
  "wizard.quickstart.directToChannels": "直接連線到聊天頻道。",
  "wizard.quickstart.nodeRuntime": "快速開始使用 Node 作为網關服務（稳定且受支援）。",
  "wizard.quickstart.keepingSettings": "保留您目前的網關設定：",

  // Channel setup
  "wizard.channels.setup": "設定頻道",
  "wizard.channels.select": "選擇要設定的頻道",
  "wizard.channels.select.quickstart": "選擇頻道（快速開始）",
  "wizard.channels.status.title": "頻道狀態",
  "wizard.channels.status.configured": "已設定",
  "wizard.channels.status.notConfigured": "未設定",
  "wizard.channels.status.pluginDisabled": "外掛已停用",
  "wizard.channels.status.installPlugin": "安裝外掛以啟用",
  "wizard.channels.status.plugin": "外掛",
  "wizard.channels.status.install": "安裝",
  "wizard.channels.how.title": "頻道工作方式",
  "wizard.channels.how.dmSecurity": "DM 安全：預設是配对模式；未知 DM 会收到配对码。",
  "wizard.channels.how.approveWith": "使用以下指令批准",
  "wizard.channels.how.publicDms": '公用 DM 需要 dmPolicy="open" + allowFrom=["*"]。',
  "wizard.channels.how.multiUser":
    '多使用者 DM：設定 session.dmScope="per-channel-peer"（或多帳號頻道使用 "per-account-channel-peer"）来隔离會話。',

  // Model/auth setup
  "wizard.model.provider.title": "模型/認證提供商",
  "wizard.model.provider.choice": "模型/認證選擇",
  "wizard.model.default.title": "預設模型",
  "wizard.model.default.keep": "預設模型（留空以保持）",
  "wizard.model.filter.provider": "按提供商筛选模型",

  // Skills setup
  "wizard.skills.setup": "設定技能",
  "wizard.skills.select": "選擇要啟用的技能",

  // Hooks setup
  "wizard.hooks.setup": "設定內部钩子",

  // Finalization
  "wizard.finalize.title": "設定完成",
  "wizard.finalize.completion": "是否要安裝 shell 补全？",
  "wizard.finalize.hints": `提示：
- 執行 {doctor} 检查安裝
- 執行 {status} 查看網關狀態
- 執行 {help} 获取說明`,

  // Common
  "wizard.cancelled": "嚮導已取消",
  "wizard.back": "返回",
  "wizard.next": "下一步",
  "wizard.finish": "完成",

  // Setup mode
  "wizard.setup.question": "您想要設定什么？",
  "wizard.setup.local": "本機網關（在此裝置上執行）",
  "wizard.setup.remote": "遠端網關（連線到现有網關）",

  // Generic
  "common.yes": "是",
  "common.no": "否",
  "common.skip": "跳过",
  "common.skipForNow": "暂时跳过",
  "common.done": "完成",
  "common.off": "關閉",
  "common.continue": "继续",
  "common.finished": "已完成",
  "common.required": "必填",
  "common.cancelled": "已取消",
  "wizard.skills.skipHint": "继续而不安裝依赖项",

  // Skills - detailed
  "wizard.skills.status.eligible": "符合條件",
  "wizard.skills.status.missing": "缺少依赖",
  "wizard.skills.status.blocked": "被白名单阻止",
  "wizard.skills.status.title": "技能狀態",
  "wizard.skills.configurePrompt": "立即設定技能？（推薦）",
  "wizard.skills.homebrew.title": "推薦使用 Homebrew",
  "wizard.skills.homebrew.desc":
    "许多技能依赖透過 Homebrew 分发。\n没有 brew，您需要手動从源码构建或下載发行版。",
  "wizard.skills.homebrew.showCommand": "显示 Homebrew 安裝指令？",
  "wizard.skills.homebrew.installTitle": "Homebrew 安裝",
  "wizard.skills.homebrew.run": "執行：",
  "wizard.skills.nodeManagerPrompt": "技能安裝的首选节点管理器",
  "wizard.skills.installPrompt": "安裝缺少的技能依赖",
  "wizard.skills.installing": "正在安裝 {name}…",
  "wizard.skills.installed": "已安裝 {name}",
  "wizard.skills.installFailed": "安裝失敗：{name}",
  "wizard.skills.doctorTip": "提示：執行 `openclaw doctor` 检查技能 + 依赖项。",
  "wizard.skills.docs": "文件：https://docs.openclaw.ai/skills",
  "wizard.skills.envPrompt": "为 {skill} 設定 {env}？",
  "wizard.skills.envInput": "输入 {env}",
  "wizard.skills.defaultHint": "安裝",

  // Hooks - detailed
  "wizard.hooks.title": "钩子",
  "wizard.hooks.description": "钩子让您可以在发出代理指令时自動执行操作。",
  "wizard.hooks.example": "範例：在发出 /new 时将會話上下文儲存到内存。",
  "wizard.hooks.docs": "了解更多：https://docs.openclaw.ai/hooks",
  "wizard.hooks.none.title": "无可用钩子",
  "wizard.hooks.none.desc": "未找到符合條件的钩子。您可以稍後在設定中設定钩子。",
  "wizard.hooks.enablePrompt": "啟用钩子？",
  "wizard.hooks.configured.title": "钩子已設定",
  "wizard.hooks.configured.manage": "您稍後可以使用以下指令管理钩子：",

  // Systemd
  "wizard.systemd.title": "Systemd",
  "wizard.systemd.unavailable": "Systemd 使用者服務不可用。跳过持久化检查和服務安裝。",
  "wizard.systemd.unavailableSkip":
    "Systemd 使用者服務不可用；跳过服務安裝。使用您的容器管理器或 `docker compose up -d`。",
  "wizard.systemd.lingerReason":
    "Linux 安裝預設使用 systemd 使用者服務。没有持久化，systemd 会在注销/空闲时停止使用者會話并终止網關。",

  // Gateway Service
  "wizard.gateway.service.installPrompt": "安裝網關服務（推薦）",
  "wizard.gateway.service.alreadyInstalled": "網關服務已安裝",
  "wizard.gateway.service.restart": "重新啟動",
  "wizard.gateway.service.reinstall": "重新安裝",
  "wizard.gateway.service.option.skip": "跳过",
  "wizard.gateway.service.progress.label": "網關服務",
  "wizard.gateway.service.progress.restarting": "正在重新啟動網關服務…",
  "wizard.gateway.service.progress.restarted": "網關服務已重新啟動。",
  "wizard.gateway.service.progress.uninstalling": "正在卸载網關服務…",
  "wizard.gateway.service.progress.uninstalled": "網關服務已卸载。",
  "wizard.gateway.service.progress.preparing": "正在準備網關服務…",
  "wizard.gateway.service.progress.installing": "正在安裝網關服務…",
  "wizard.gateway.service.progress.failed": "網關服務安裝失敗。",
  "wizard.gateway.service.progress.installed": "網關服務已安裝。",
  "wizard.gateway.service.error.title": "網關",
  "wizard.gateway.service.error.message": "網關服務安裝失敗：{error}",

  // Health Check
  "wizard.health.docs": "文件：",
  "wizard.health.help.title": "健康检查說明",

  // Apps
  "wizard.apps.title": "可選應用程式",
  "wizard.apps.description":
    "新增节点以获得额外功能：\n- macOS 應用程式（系統 + 通知）\n- iOS 應用程式（相机/画布）\n- Android 應用程式（相机/画布）",

  // Control UI
  "wizard.controlui.title": "控制介面",
  "wizard.webui.seeded": "Web 介面已在后台初始化。稍後開啟：",
  "wizard.controlui.webui": "Web 介面",
  "wizard.controlui.webuiWithToken": "Web 介面（带權杖）",
  "wizard.controlui.gatewayWs": "網關 WS",
  "wizard.controlui.gatewayReachable": "網關：可存取",
  "wizard.controlui.gatewayNotDetected": "網關：未检测到",
  "wizard.controlui.docs": "文件：https://docs.openclaw.ai/web/control-ui",

  // TUI
  "wizard.tui.title": "启动 TUI（最佳選擇！）",
  "wizard.tui.description":
    '这是让您的代理成为您的定义性操作。\n请慢慢来。\n您告诉它的越多，体验就会越好。\n我们将傳送："醒醒，我的朋友！"',
  "wizard.tui.message": "醒醒，我的朋友！",

  // Token
  "wizard.token.title": "權杖",
  "wizard.token.description": "網關權杖：網關 + 控制介面的共用身份驗證。",
  "wizard.token.storage":
    "儲存位置：~/.openclaw/openclaw.json (gateway.auth.token) 或 OPENCLAW_GATEWAY_TOKEN。",
  "wizard.token.webuiStorage":
    "Web 介面将此副本儲存在瀏覽器的 localStorage 中 (openclaw.control.settings.v1)。",
  "wizard.token.getLink": "隨時获取带權杖的連結：",

  // Hatch
  "wizard.hatch.title": "您想如何启动您的机器人？",
  "wizard.hatch.option.tui": "在 TUI 中启动（推薦）",
  "wizard.hatch.option.web": "開啟 Web 介面",
  "wizard.hatch.option.later": "稍後执行",

  // Dashboard
  "wizard.dashboard.title": "仪表板就緒",
  "wizard.dashboard.link": "仪表板連結（带權杖）：{url}",
  "wizard.dashboard.opened": "已在您的瀏覽器中開啟。保留该標籤页以控制 OpenClaw。",
  "wizard.dashboard.copyPaste": "在您的瀏覽器中複製/貼上此 URL 以控制 OpenClaw。",

  // Later
  "wizard.later.title": "稍後",
  "wizard.later.description": "当您準備好时：{command}",
  "wizard.skipUi": "跳过控制介面/TUI 提示。",

  // Workspace Backup
  "wizard.workspaceBackup.title": "工作区備份",
  "wizard.workspaceBackup.description":
    "備份您的代理工作区。\n文件：https://docs.openclaw.ai/concepts/agent-workspace",

  // Security
  "wizard.security.final.title": "安全",
  "wizard.security.final.desc":
    "在您的计算机上執行代理存在風險 — 加固您的設定：https://docs.openclaw.ai/security",

  // Web Search
  "wizard.websearch.title": "网页搜尋（可選）",
  "wizard.websearch.enabled": "网页搜尋已啟用，因此您的代理可以在需要时在线尋找訊息。",
  "wizard.websearch.apiKeyConfig": "API 密鑰：儲存在設定中 (tools.web.search.apiKey)。",
  "wizard.websearch.apiKeyEnv": "API 密鑰：透過 BRAVE_API_KEY 环境變數提供（網關环境）。",
  "wizard.websearch.disabled":
    "如果您希望您的代理能够搜尋网页，您需要一个 API 密鑰。\n\nOpenClaw 使用 Brave Search 作为 `web_search` 工具。没有 Brave Search API 密鑰，网页搜尋将无法工作。\n\n交互式設定：\n- 執行：openclaw configure --section web\n- 啟用 web_search 并貼上您的 Brave Search API 密鑰\n\n替代方案：在網關环境中設定 BRAVE_API_KEY（无需更改設定）。\n文件：https://docs.openclaw.ai/tools/web",

  // What Now
  "wizard.whatnow.title": "接下来",
  "wizard.whatnow.description": '接下来：https://openclaw.ai/showcase ("大家都在构建什么")。',

  // Completion
  "wizard.completion.outro.dashboard":
    "入门完成。仪表板已在您的瀏覽器中開啟；保留该標籤页以控制 OpenClaw。",
  "wizard.completion.outro.seeded": "入门完成。Web 介面已在后台初始化；隨時使用上面的連結開啟它。",
  "wizard.completion.outro.link": "入门完成。使用上面的權杖化仪表板連結来控制 OpenClaw。",

  // Shell Completion
  "wizard.completion.prompt": "安裝 shell 补全脚本？",

  "wizard.onboarding.invalidFlow": "無效的 --flow（使用 quickstart、manual 或 advanced）。",

  "validation.invalidPort": "無效連接埠",
  "validation.ipRequired": "自訂绑定模式需要 IP 位址",
  "validation.invalidIpFormat": "無效 IPv4 位址（例如：192.168.1.100）",
  "validation.invalidIpRange": "無效 IPv4 位址（每个八位字节必須为 0-255）",

  "wizard.gateway.customIpPrompt": "自訂 IP 位址",
  "wizard.gateway.auth.hint": "推薦預設值（本機 + 遠端）",
  "wizard.gateway.tailscale.serveHint": "为您的 tailnet 提供私有 HTTPS（Tailscale 上的裝置）",
  "wizard.gateway.tailscale.funnelHint": "透過 Tailscale Funnel 提供公用 HTTPS（互联网）",
  "wizard.gateway.tailscale.resetPrompt": "結束时重設 Tailscale serve/funnel？",
  "wizard.gateway.tokenPrompt": "網關權杖（留空以生成）",
  "wizard.gateway.tokenPlaceholder": "多机器或非回环存取所需",
  "wizard.gateway.passwordPrompt": "網關密碼",

  "wizard.tailscale.warning":
    "在 PATH 或 /Applications 中找不到 Tailscale 二进制檔案。确保从 https://tailscale.com/download 安裝 Tailscale。您可以继续設定，但 serve/funnel 将在執行时失敗。",
  "wizard.tailscale.title": "Tailscale",
  "wizard.config.invalidTitle": "設定無效",
  "wizard.config.issuesTitle": "設定問題",
  "wizard.config.invalidOutro": "設定無效。執行 `{command}` 修復它，然后重新執行 onboarding。",
  "wizard.onboarding.quickstartHint": "稍後在 `{command}` 中設定詳細訊息。",
  "wizard.onboarding.manualHint": "設定連接埠、網路、Tailscale 和身份驗證選項。",
  "wizard.setup.noRemoteUrl": "尚未設定遠端 URL",
  "wizard.setup.remoteConfigured": "遠端網關已設定。",
  "wizard.workspace.prompt": "工作区目錄",
  "wizard.channels.title": "頻道",
  "wizard.skills.title": "技能",
  "wizard.channels.skip": "跳过頻道設定。",
  "wizard.skills.skip": "跳过技能設定。",

  "wizard.channels.action.modify": "修改設定",
  "wizard.channels.action.disable": "停用（保留設定）",
  "wizard.channels.action.delete": "刪除設定",
  "wizard.channels.action.skip": "跳过（保持原样）",
  "wizard.channels.configuredPrompt": "已設定。您想做什么？",
  "wizard.channels.accountPrompt": "帳號",
  "wizard.channels.dmPolicy.confirm": "立即設定 DM 存取策略？（預設：配对）",
  "wizard.channels.dmPolicy.note": `預設：配对（未知 DM 获得配对码）。
批准：{approveCommand}
白名单 DM：{policyKey}="allowlist" + {allowFromKey} 条目。
公用 DM：{policyKey}="open" + {allowFromKey} 包含 "*".
多使用者 DM：設定 session.dmScope="per-channel-peer"（或多帳號頻道使用 "per-account-channel-peer"）来隔离會話。
文件：{docsLink}`,
  "wizard.channels.dmPolicy.accessTitle": "DM 存取",
  "wizard.channels.dmPolicy.selectTitle": "DM 策略",
  "wizard.channels.dmPolicy.pairing": "配对（推薦）",
  "wizard.channels.dmPolicy.allowlist": "白名单（仅特定使用者）",
  "wizard.channels.dmPolicy.open": "開放（公用入站 DM）",
  "wizard.channels.dmPolicy.disabled": "停用（忽略 DM）",
  "wizard.channels.statusNoteTitle": "頻道狀態",
  "wizard.channels.setupConfirm": "立即設定聊天頻道？",
  "wizard.channels.pluginNotAvailable": "外掛不可用。",
  "wizard.channels.noOnboarding": "尚不支援 onboarding。",
  "wizard.channels.selectPrompt": "選擇一个頻道",
  "wizard.channels.selectedTitle": "已选頻道",

  "wizard.remote.discoverPrompt": "在局域网上发现網關（Bonjour）？",
  "wizard.remote.bonjourRequired": "Bonjour 发现需要 dns-sd（macOS）或 avahi-browse（Linux）。",
  "wizard.remote.discoveryTitle": "发现",
  "wizard.remote.searching": "正在搜尋網關…",
  "wizard.remote.found": "找到 {count} 个網關",
  "wizard.remote.noneFound": "未找到網關",
  "wizard.remote.selectGateway": "選擇網關",
  "wizard.remote.manualUrl": "手動输入 URL",
  "wizard.remote.connectionMethod": "連線方式",
  "wizard.remote.directWs": "直接網關 WS",
  "wizard.remote.sshTunnel": "SSH 隧道（回环）",
  "wizard.remote.sshNote": `启动隧道前使用 CLI：
ssh -N -L 18789:127.0.0.1:18789 <user>@<host>
文件：https://docs.openclaw.ai/gateway/remote`,
  "wizard.remote.wsUrlPrompt": "網關 WebSocket URL",
  "wizard.remote.authPrompt": "網關認證",
  "wizard.remote.tokenPrompt": "網關權杖",
};

export default wizardMessages;
