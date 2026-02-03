// 香港粵語翻譯 - 精靈模組（書面粵語）
export const wizardMessages = {
  // Language selection
  "wizard.language.select": "揀你嘅慣用語言",
  "wizard.language.current": "目前",
  "wizard.language.changed": "語言已經改做：{locale}",

  // Onboarding
  "wizard.intro.title": "OpenClaw 入門引導",

  // Security warning
  "wizard.security.title": "保安警告",
  "wizard.security.note": `保安警告 — 請睇吓。

OpenClaw 係一個業餘項目，仲喺 beta 階段。預咗會有啲問題。
呢個機械人可以讀取檔案同埋運行動作（如果啟用咗工具）。
一個差嘅提示可以呃到佢做唔安全嘅嘢。

如果你對基本保安同埋存取控制唔係咁放心，就唔好運行 OpenClaw。
啟用工具或者將佢暴露喺網絡之前，請搵個有經驗嘅人幫手。

建議基線：
- 配對/允許清單 + 提及閘門
- 沙箱 + 最低權限工具
- 將機密資料放喺智能體接觸到嘅檔案系統之外
- 對於有任何工具或者唔可信收件箱嘅機械人，使用最強嘅可用模型

定期運行：
openclaw security audit --deep
openclaw security audit --fix

必睇：https://docs.openclaw.ai/gateway/security`,
  "wizard.security.confirm": "我明白呢個係強大而且本質上有風險。繼續？",

  // Config handling
  "wizard.config.existing": "檢測到現有配置",
  "wizard.config.invalid": "配置無效",
  "wizard.config.issues.title": "配置問題",
  "wizard.config.action": "配置處理",
  "wizard.config.action.keep": "使用現有數值",
  "wizard.config.action.modify": "更新數值",
  "wizard.config.action.reset": "重置",
  "wizard.config.reset.scope": "重置範圍",
  "wizard.config.reset.config": "淨係配置",
  "wizard.config.reset.config-creds-sessions": "配置 + 憑證 + 會話",
  "wizard.config.reset.full": "完全重置（配置 + 憑證 + 會話 + 工作區）",
  "wizard.config.invalid.hint": "配置無效。運行 `{command}` 去修復佢，然後重新運行入門引導。",

  // Onboarding mode
  "wizard.onboarding.mode": "入門引導模式",
  "wizard.onboarding.quickstart.label": "快速開始",
  "wizard.onboarding.quickstart.hint": "稍後透過 {command} 配置詳情。",
  "wizard.onboarding.advanced.label": "手動",
  "wizard.onboarding.advanced.hint": "配置埠、網絡、Tailscale 同埋認證選項。",
  "wizard.onboarding.remote.notice": "快速開始淨係支援本地網關。轉到手動模式。",

  // Gateway configuration
  "wizard.gateway.port": "網關埠",
  "wizard.gateway.bind": "網關繫結",
  "wizard.gateway.bind.loopback": "迴環（127.0.0.1）",
  "wizard.gateway.bind.lan": "局域網",
  "wizard.gateway.bind.tailnet": "Tailnet",
  "wizard.gateway.bind.auto": "自動",
  "wizard.gateway.bind.custom": "自訂",
  "wizard.gateway.customIp": "網關自訂 IP",
  "wizard.gateway.auth": "網關認證",
  "wizard.gateway.auth.mode": "網關認證模式",
  "wizard.gateway.auth.token": "網關信物",
  "wizard.gateway.auth.token.default": "信物（預設）",
  "wizard.gateway.auth.password": "密碼",
  "wizard.gateway.tailscale": "Tailscale 暴露",
  "wizard.gateway.tailscale.off": "關閉",
  "wizard.gateway.tailscale.serve": "服務",
  "wizard.gateway.tailscale.funnel": "漏斗",
  "wizard.gateway.tailscale.noExposure": "冇 Tailscale 暴露",
  "wizard.gateway.probe.success": "網關可以連到！",
  "wizard.gateway.probe.failed": "連唔到網關。",
  "wizard.quickstart.title": "快速開始",
  "wizard.quickstart.directToChannels": "直接去對話頻道。",
  "wizard.quickstart.nodeRuntime": "快速開始使用 Node 做網關服務（穩定 + 受支援）。",
  "wizard.quickstart.keepingSettings": "保留你目前嘅網關設定：",

  // Channel setup
  "wizard.channels.setup": "設定頻道",
  "wizard.channels.select": "揀要配置嘅頻道",
  "wizard.channels.select.quickstart": "揀頻道（快速開始）",
  "wizard.channels.status.title": "頻道狀態",
  "wizard.channels.status.configured": "已配置",
  "wizard.channels.status.notConfigured": "未配置",
  "wizard.channels.status.pluginDisabled": "外掛已停用",
  "wizard.channels.status.installPlugin": "安裝外掛以啟用",
  "wizard.channels.status.plugin": "外掛",
  "wizard.channels.status.install": "安裝",
  "wizard.channels.how.title": "頻道點運作",
  "wizard.channels.how.dmSecurity": "DM 保安：預設係配對；未知 DM 會攞到配對碼。",
  "wizard.channels.how.approveWith": "透過呢個批核",
  "wizard.channels.how.publicDms": '公開 DM 需要 dmPolicy="open" + allowFrom=["*"]。',
  "wizard.channels.how.multiUser":
    '多用戶 DM：設定 session.dmScope="per-channel-peer"（或者多帳戶頻道用 "per-account-channel-peer"）去隔離會話。',

  // Model/auth setup
  "wizard.model.provider.title": "模型/認證供應商",
  "wizard.model.provider.choice": "模型/認證選擇",
  "wizard.model.default.title": "預設模型",
  "wizard.model.default.keep": "預設模型（留空以保留）",
  "wizard.model.filter.provider": "按供應商篩選模型",

  // Skills setup
  "wizard.skills.setup": "設定技能",
  "wizard.skills.select": "揀要啟用嘅技能",

  // Hooks setup
  "wizard.hooks.setup": "設定內部鈎子",

  // Finalization
  "wizard.finalize.title": "設定完成",
  "wizard.finalize.completion": "你想安裝命令列自動完成嗎？",
  "wizard.finalize.hints": `提示：
- 運行 {doctor} 檢查安裝
- 運行 {status} 檢視網關狀態
- 運行 {help} 攞說明`,

  // Common
  "wizard.cancelled": "精靈已取消",
  "wizard.back": "返轉頭",
  "wizard.next": "下一步",
  "wizard.finish": "完成",

  // Setup mode
  "wizard.setup.question": "你想設定啲咩？",
  "wizard.setup.local": "本地網關（喺呢部裝置運行）",
  "wizard.setup.remote": "遠端網關（連線去現有網關）",

  // Generic
  "common.yes": "係",
  "common.no": "唔係",
  "common.skip": "略過",
  "common.skipForNow": "暫時略過",
  "common.done": "搞掂",
  "common.off": "關",
  "common.continue": "繼續",
  "common.finished": "完成咗",
  "common.required": "必填",
  "common.cancelled": "已取消",
  "wizard.skills.skipHint": "繼續而安裝依賴項目",

  // Skills - detailed
  "wizard.skills.status.eligible": "合資格",
  "wizard.skills.status.missing": "欠缺要求",
  "wizard.skills.status.blocked": "被允許清單封鎖",
  "wizard.skills.status.title": "技能狀態",
  "wizard.skills.configurePrompt": "而家設定技能？（建議）",
  "wizard.skills.homebrew.title": "建議使用 Homebrew",
  "wizard.skills.homebrew.desc":
    "好多技能依賴項目都係透過 Homebrew 提供。\n冇 brew 嘅話，你就要由原始碼建置或者手動下載發行版本。",
  "wizard.skills.homebrew.showCommand": "顯示 Homebrew 安裝命令？",
  "wizard.skills.homebrew.installTitle": "Homebrew 安裝",
  "wizard.skills.homebrew.run": "運行：",
  "wizard.skills.nodeManagerPrompt": "技能安裝嘅慣用節點管理員",
  "wizard.skills.installPrompt": "安裝欠缺嘅技能依賴項目",
  "wizard.skills.installing": "安裝緊 {name}…",
  "wizard.skills.installed": "已安裝 {name}",
  "wizard.skills.installFailed": "安裝失敗：{name}",
  "wizard.skills.doctorTip": "提示：運行 `openclaw doctor` 檢視技能 + 要求。",
  "wizard.skills.docs": "文件：https://docs.openclaw.ai/skills",
  "wizard.skills.envPrompt": "為 {skill} 設定 {env}？",
  "wizard.skills.envInput": "輸入 {env}",
  "wizard.skills.defaultHint": "安裝",

  // Hooks - detailed
  "wizard.hooks.title": "鈎子",
  "wizard.hooks.description": "鈎子讓你喺發出智能體命令嗰陣自動化動作。",
  "wizard.hooks.example": "例子：當你發出 /new 嗰陣儲存會話情境去記憶體。",
  "wizard.hooks.docs": "了解更多：https://docs.openclaw.ai/hooks",
  "wizard.hooks.none.title": "冇可用嘅鈎子",
  "wizard.hooks.none.desc": "搵唔到合資格嘅鈎子。你可以稍後喺配置入面設定鈎子。",
  "wizard.hooks.enablePrompt": "啟用鈎子？",
  "wizard.hooks.configured.title": "已配置鈎子",
  "wizard.hooks.configured.manage": "你可以稍後用呢個管理鈎子：",

  // Systemd
  "wizard.systemd.title": "Systemd",
  "wizard.systemd.unavailable": "Systemd 用戶服務唔可用。略過持續檢查同埋服務安裝。",
  "wizard.systemd.unavailableSkip":
    "Systemd 用戶服務唔可用；略過服務安裝。使用你嘅容器監督器或者 `docker compose up -d`。",
  "wizard.systemd.lingerReason":
    "Linux 安裝預設使用 systemd 用戶服務。冇持續嘅話，systemd 會喺登出/閒置嗰陣停止用戶會話並且殺死網關。",

  // Gateway Service
  "wizard.gateway.service.installPrompt": "安裝網關服務（建議）",
  "wizard.gateway.service.alreadyInstalled": "網關服務已經安裝",
  "wizard.gateway.service.restart": "重新啟動",
  "wizard.gateway.service.reinstall": "重新安裝",
  "wizard.gateway.service.option.skip": "略過",
  "wizard.gateway.service.progress.label": "網關服務",
  "wizard.gateway.service.progress.restarting": "重新啟動緊網關服務…",
  "wizard.gateway.service.progress.restarted": "網關服務已經重新啟動。",
  "wizard.gateway.service.progress.uninstalling": "卸載緊網關服務…",
  "wizard.gateway.service.progress.uninstalled": "網關服務已經卸載。",
  "wizard.gateway.service.progress.preparing": "準備緊網關服務…",
  "wizard.gateway.service.progress.installing": "安裝緊網關服務…",
  "wizard.gateway.service.progress.failed": "網關服務安裝失敗。",
  "wizard.gateway.service.progress.installed": "網關服務已經安裝。",
  "wizard.gateway.service.error.title": "網關",
  "wizard.gateway.service.error.message": "網關服務安裝失敗：{error}",

  // Health Check
  "wizard.health.docs": "文件：",
  "wizard.health.help.title": "健康檢查說明",

  // Apps
  "wizard.apps.title": "可選應用程式",
  "wizard.apps.description":
    "新增節點攞額外功能：\n- macOS 應用程式（系統 + 通知）\n- iOS 應用程式（相機/畫布）\n- Android 應用程式（相機/畫布）",

  // Control UI
  "wizard.controlui.title": "控制界面",
  "wizard.webui.seeded": "Web UI 已經喺背景播種。稍後用呢個打開：",
  "wizard.controlui.webui": "Web UI",
  "wizard.controlui.webuiWithToken": "Web UI（連信物）",
  "wizard.controlui.gatewayWs": "網關 WS",
  "wizard.controlui.gatewayReachable": "網關：可以連到",
  "wizard.controlui.gatewayNotDetected": "網關：檢測唔到",
  "wizard.controlui.docs": "文件：https://docs.openclaw.ai/web/control-ui",

  // TUI
  "wizard.tui.title": "啟動 TUI（最好嘅選項！）",
  "wizard.tui.description":
    "呢個係令到你嘅智能體成為你嘅決定性動作。\n請慢慢嚟。\n你講得越多，體驗就會越好。\n我哋會傳送：「醒啦，朋友！」",
  "wizard.tui.message": "醒啦，朋友！",

  // Token
  "wizard.token.title": "信物",
  "wizard.token.description": "網關信物：網關 + 控制界面嘅共享認證。",
  "wizard.token.storage":
    "儲存喺：~/.openclaw/openclaw.json（gateway.auth.token）或者 OPENCLAW_GATEWAY_TOKEN。",
  "wizard.token.webuiStorage":
    "Web UI 將副本儲存喺呢個瀏覽器嘅 localStorage（openclaw.control.settings.v1）。",
  "wizard.token.getLink": "任何時候都可以用呢個攞帶信物嘅連結：",

  // Hatch
  "wizard.hatch.title": "你想點樣孵化你嘅機械人？",
  "wizard.hatch.option.tui": "喺 TUI 孵化（建議）",
  "wizard.hatch.option.web": "打開 Web UI",
  "wizard.hatch.option.later": "遲啲先至做",

  // Dashboard
  "wizard.dashboard.title": "儀表版準備好",
  "wizard.dashboard.link": "儀表版連結（連信物）：{url}",
  "wizard.dashboard.opened": "喺你嘅瀏覽器打開咗。保留嗰個分頁去控制 OpenClaw。",
  "wizard.dashboard.copyPaste": "喺呢部機器嘅瀏覽器貼上呢個網址去控制 OpenClaw。",

  // Later
  "wizard.later.title": "遲啲",
  "wizard.later.description": "當你準備好：{command}",
  "wizard.skipUi": "略過控制界面/TUI 提示。",

  // Workspace Backup
  "wizard.workspaceBackup.title": "工作區備份",
  "wizard.workspaceBackup.description":
    "備份你嘅智能體工作區。\n文件：https://docs.openclaw.ai/concepts/agent-workspace",

  // Security
  "wizard.security.final.title": "保安",
  "wizard.security.final.desc":
    "喺你嘅電腦運行智能體有風險 — 強化你嘅設定：https://docs.openclaw.ai/security",

  // Web Search
  "wizard.websearch.title": "網頁搜尋（可選）",
  "wizard.websearch.enabled": "網頁搜尋已經啟用，所以你嘅智能體可以喺需要嗰陣喺網上搵嘢。",
  "wizard.websearch.apiKeyConfig": "API 密鑰：儲存喺配置入面（tools.web.search.apiKey）。",
  "wizard.websearch.apiKeyEnv": "API 密鑰：透過 BRAVE_API_KEY 環境變數提供（網關環境）。",
  "wizard.websearch.disabled":
    "如果你想你嘅智能體能夠搜尋網頁，你需要一個 API 密鑰。\n\nOpenClaw 使用 Brave Search 做 `web_search` 工具。冇 Brave Search API 密鑰，網頁搜尋就唔會運作。\n\n互動式設定：\n- 運行：openclaw configure --section web\n- 啟用 web_search 同埋貼上你嘅 Brave Search API 密鑰\n\n替代：喺網關環境設定 BRAVE_API_KEY（唔使改配置）。\n文件：https://docs.openclaw.ai/tools/web",

  // What Now
  "wizard.whatnow.title": "跟住點",
  "wizard.whatnow.description": "跟住點：https://openclaw.ai/showcase（「人哋做緊啲咩」）。",

  // Completion
  "wizard.completion.outro.dashboard":
    "入門引導完成。儀表版已經用你嘅信物打開；保留嗰個分頁去控制 OpenClaw。",
  "wizard.completion.outro.seeded":
    "入門引導完成。Web UI 已經喺背景播種；隨時可以用上面嘅帶信物儀表版連結打開。",
  "wizard.completion.outro.link": "入門引導完成。用上面嘅帶信物儀表版連結控制 OpenClaw。",

  // Shell Completion
  "wizard.completion.prompt": "安裝命令列自動完成指令碼？",

  "wizard.onboarding.invalidFlow": "無效嘅 --flow（用 quickstart、manual 或者 advanced）。",

  "validation.invalidPort": "無效嘅埠",
  "validation.ipRequired": "自訂繫結模式需要 IP 位址",
  "validation.invalidIpFormat": "無效嘅 IPv4 位址（例如：192.168.1.100）",
  "validation.invalidIpRange": "無效嘅 IPv4 位址（每個八位元組必須係 0-255）",

  "wizard.gateway.customIpPrompt": "自訂 IP 位址",
  "wizard.gateway.auth.hint": "建議預設（本地 + 遠端）",
  "wizard.gateway.tailscale.serveHint": "你嘅 tailnet 嘅私人 HTTPS（Tailscale 上嘅裝置）",
  "wizard.gateway.tailscale.funnelHint": "透過 Tailscale Funnel 嘅公開 HTTPS（互聯網）",
  "wizard.gateway.tailscale.resetPrompt": "退出嗰陣重置 Tailscale serve/funnel？",
  "wizard.gateway.tokenPrompt": "網關信物（留空以產生）",
  "wizard.gateway.tokenPlaceholder": "多機或者非迴環存取需要",
  "wizard.gateway.passwordPrompt": "網關密碼",

  "wizard.tailscale.warning":
    "喺 PATH 或者 /Applications 搵唔到 Tailscale 二進制檔案。確保 Tailscale 係由 https://tailscale.com/download 安裝。你可以繼續設定，但係 serve/funnel 會喺運行時失敗。",
  "wizard.tailscale.title": "Tailscale",
  "wizard.config.invalidTitle": "無效嘅配置",
  "wizard.config.issuesTitle": "配置問題",
  "wizard.config.invalidOutro": "配置無效。運行 `{command}` 去修復佢，然後重新運行入門引導。",
  "wizard.onboarding.quickstartHint": "稍後透過 `{command}` 配置詳情。",
  "wizard.onboarding.manualHint": "配置埠、網絡、Tailscale 同埋認證選項。",
  "wizard.setup.noRemoteUrl": "重未設定遠端網址",
  "wizard.setup.remoteConfigured": "已經配置遠端網關。",
  "wizard.workspace.prompt": "工作區目錄",
  "wizard.channels.title": "頻道",
  "wizard.skills.title": "技能",
  "wizard.channels.skip": "略過頻道設定。",
  "wizard.skills.skip": "略過技能設定。",

  "wizard.channels.action.modify": "修改設定",
  "wizard.channels.action.disable": "停用（保留配置）",
  "wizard.channels.action.delete": "刪除配置",
  "wizard.channels.action.skip": "略過（保持原狀）",
  "wizard.channels.configuredPrompt": "已經配置。你想點做？",
  "wizard.channels.accountPrompt": "帳戶",
  "wizard.channels.dmPolicy.confirm": "而家設定 DM 存取政策？（預設：配對）",
  "wizard.channels.dmPolicy.note": `預設：配對（未知 DM 會攞到配對碼）。
批核：{approveCommand}
允許清單 DM：{policyKey}="allowlist" + {allowFromKey} 項目。
公開 DM：{policyKey}="open" + {allowFromKey} 包括 "*".
多用戶 DM：設定 session.dmScope="per-channel-peer"（或者多帳戶頻道用 "per-account-channel-peer"）去隔離會話。
文件：{docsLink}`,
  "wizard.channels.dmPolicy.accessTitle": "DM 存取",
  "wizard.channels.dmPolicy.selectTitle": "DM 政策",
  "wizard.channels.dmPolicy.pairing": "配對（建議）",
  "wizard.channels.dmPolicy.allowlist": "允許清單（淨係特定用戶）",
  "wizard.channels.dmPolicy.open": "公開（公開入嚟嘅 DM）",
  "wizard.channels.dmPolicy.disabled": "停用（忽略 DM）",
  "wizard.channels.statusNoteTitle": "頻道狀態",
  "wizard.channels.setupConfirm": "而家設定對話頻道？",
  "wizard.channels.pluginNotAvailable": "外掛唔可用。",
  "wizard.channels.noOnboarding": "重未支援入門引導。",
  "wizard.channels.selectPrompt": "揀一個頻道",
  "wizard.channels.selectedTitle": "已揀嘅頻道",

  "wizard.remote.discoverPrompt": "喺局域網發現網關（Bonjour）？",
  "wizard.remote.bonjourRequired": "Bonjour 發現需要 dns-sd（macOS）或者 avahi-browse（Linux）。",
  "wizard.remote.discoveryTitle": "發現",
  "wizard.remote.searching": "搜尋緊網關…",
  "wizard.remote.found": "搵到 {count} 個網關",
  "wizard.remote.noneFound": "搵唔到網關",
  "wizard.remote.selectGateway": "揀網關",
  "wizard.remote.manualUrl": "手動輸入網址",
  "wizard.remote.connectionMethod": "連線方法",
  "wizard.remote.directWs": "直接網關 WS",
  "wizard.remote.sshTunnel": "SSH 隧道（迴環）",
  "wizard.remote.sshNote": `喺使用 CLI 之前啟動隧道：
ssh -N -L 18789:127.0.0.1:18789 <用戶>@<主機>
文件：https://docs.openclaw.ai/gateway/remote`,
  "wizard.remote.wsUrlPrompt": "網關 WebSocket 網址",
  "wizard.remote.authPrompt": "網關認證",
  "wizard.remote.tokenPrompt": "網關信物",
};

export default wizardMessages;
