// 简体中文翻译 - 向导模块
export const wizardMessages = {
  // Language selection
  'wizard.language.select': '请选择您的首选语言',
  'wizard.language.current': '当前',
  'wizard.language.changed': '语言已切换为: {locale}',

  // Onboarding
  'wizard.intro.title': 'OpenClaw 入门',

  // Security warning
  'wizard.security.title': '安全警告',
  'wizard.security.note': `安全警告 — 请仔细阅读。

OpenClaw 是一个业余项目，目前处于测试阶段。请预期会有各种问题。
如果启用了工具，此机器人可以读取文件并执行操作。
错误的提示可能会诱使它执行不安全的操作。

如果您对基本安全和访问控制感到不舒服，请不要运行 OpenClaw。
在启用工具或将其暴露给互联网之前，请向有经验的人寻求帮助。

推荐的安全基线：
- 配对/白名单 + @提及限制
- 沙箱 + 最小权限工具
- 将机密信息保留在代理可访问的文件系统之外
- 对于具有工具或不受信任收件箱的任何机器人，使用最强大的可用模型

定期运行：
openclaw security audit --deep
openclaw security audit --fix

必读：https://docs.openclaw.ai/gateway/security`,
  'wizard.security.confirm': '我理解这很强大且存在固有风险。继续吗？',

  // Config handling
  'wizard.config.existing': '检测到现有配置',
  'wizard.config.invalid': '配置无效',
  'wizard.config.issues.title': '配置问题',
  'wizard.config.action': '配置处理',
  'wizard.config.action.keep': '使用现有值',
  'wizard.config.action.modify': '更新值',
  'wizard.config.action.reset': '重置',
  'wizard.config.reset.scope': '重置范围',
  'wizard.config.reset.config': '仅配置',
  'wizard.config.reset.config-creds-sessions': '配置 + 凭证 + 会话',
  'wizard.config.reset.full': '完全重置（配置 + 凭证 + 会话 + 工作区）',
  'wizard.config.invalid.hint': '配置无效。运行 `{command}` 修复它，然后重新运行入门程序。',

  // Onboarding mode
  'wizard.onboarding.mode': '入门模式',
  'wizard.onboarding.quickstart.label': '快速开始',
  'wizard.onboarding.quickstart.hint': '稍后在 {command} 中配置详细信息。',
  'wizard.onboarding.advanced.label': '手动',
  'wizard.onboarding.advanced.hint': '配置端口、网络、Tailscale 和身份验证选项。',
  'wizard.onboarding.remote.notice': '快速开始仅支持本地网关。切换到手动模式。',

  // Gateway configuration
  'wizard.gateway.port': '网关端口',
  'wizard.gateway.bind': '网关绑定',
  'wizard.gateway.bind.loopback': '本地回环 (127.0.0.1)',
  'wizard.gateway.bind.lan': '局域网',
  'wizard.gateway.bind.tailnet': 'Tailnet',
  'wizard.gateway.bind.auto': '自动',
  'wizard.gateway.bind.custom': '自定义',
  'wizard.gateway.customIp': '网关自定义 IP',
  'wizard.gateway.auth': '网关认证',
  'wizard.gateway.auth.mode': '网关身份验证模式',
  'wizard.gateway.auth.token': '网关令牌',
  'wizard.gateway.auth.token.default': '令牌（默认）',
  'wizard.gateway.auth.password': '密码',
  'wizard.gateway.tailscale': 'Tailscale 暴露',
  'wizard.gateway.tailscale.off': '关闭',
  'wizard.gateway.tailscale.serve': 'Serve',
  'wizard.gateway.tailscale.funnel': 'Funnel',
  'wizard.gateway.tailscale.noExposure': '无 Tailscale 暴露',
  'wizard.gateway.probe.success': '网关可访问！',
  'wizard.gateway.probe.failed': '无法访问网关。',
  'wizard.quickstart.title': '快速开始',
  'wizard.quickstart.directToChannels': '直接连接到聊天频道。',
  'wizard.quickstart.nodeRuntime': '快速开始使用 Node 作为网关服务（稳定且受支持）。',
  'wizard.quickstart.keepingSettings': '保留您当前的网关设置：',

  // Channel setup
  'wizard.channels.setup': '设置频道',
  'wizard.channels.select': '选择要配置的频道',
  'wizard.channels.select.quickstart': '选择频道（快速开始）',
  'wizard.channels.status.title': '频道状态',
  'wizard.channels.status.configured': '已配置',
  'wizard.channels.status.notConfigured': '未配置',
  'wizard.channels.status.pluginDisabled': '插件已禁用',
  'wizard.channels.status.installPlugin': '安装插件以启用',
  'wizard.channels.status.plugin': '插件',
  'wizard.channels.status.install': '安装',
  'wizard.channels.how.title': '频道工作方式',
  'wizard.channels.how.dmSecurity': 'DM 安全：默认是配对模式；未知 DM 会收到配对码。',
  'wizard.channels.how.approveWith': '使用以下命令批准',
  'wizard.channels.how.publicDms': '公共 DM 需要 dmPolicy="open" + allowFrom=["*"]。',
  'wizard.channels.how.multiUser': '多用户 DM：设置 session.dmScope="per-channel-peer"（或多账户频道使用 "per-account-channel-peer"）来隔离会话。',

  // Model/auth setup
  'wizard.model.provider.title': '模型/认证提供商',
  'wizard.model.provider.choice': '模型/认证选择',
  'wizard.model.default.title': '默认模型',
  'wizard.model.default.keep': '默认模型（留空以保持）',
  'wizard.model.filter.provider': '按提供商筛选模型',

  // Skills setup
  'wizard.skills.setup': '设置技能',
  'wizard.skills.select': '选择要启用的技能',

  // Hooks setup
  'wizard.hooks.setup': '设置内部钩子',

  // Finalization
  'wizard.finalize.title': '设置完成',
  'wizard.finalize.completion': '是否要安装 shell 补全？',
  'wizard.finalize.hints': `提示：
- 运行 {doctor} 检查安装
- 运行 {status} 查看网关状态
- 运行 {help} 获取帮助`,

  // Common
  'wizard.cancelled': '向导已取消',
  'wizard.back': '返回',
  'wizard.next': '下一步',
  'wizard.finish': '完成',

  // Setup mode
  'wizard.setup.question': '您想要设置什么？',
  'wizard.setup.local': '本地网关（在此设备上运行）',
  'wizard.setup.remote': '远程网关（连接到现有网关）',

  // Generic
  'common.yes': '是',
  'common.no': '否',
  'common.skip': '跳过',
  'common.skipForNow': '暂时跳过',
  'common.done': '完成',
  'common.off': '关闭',
  'common.continue': '继续',
  'common.finished': '已完成',
  'common.required': '必填',
  'common.cancelled': '已取消',
  'wizard.skills.skipHint': '继续而不安装依赖项',

  // Skills - detailed
  'wizard.skills.status.eligible': '符合条件',
  'wizard.skills.status.missing': '缺少依赖',
  'wizard.skills.status.blocked': '被白名单阻止',
  'wizard.skills.status.title': '技能状态',
  'wizard.skills.configurePrompt': '立即配置技能？（推荐）',
  'wizard.skills.homebrew.title': '推荐使用 Homebrew',
  'wizard.skills.homebrew.desc': '许多技能依赖通过 Homebrew 分发。\n没有 brew，您需要手动从源码构建或下载发行版。',
  'wizard.skills.homebrew.showCommand': '显示 Homebrew 安装命令？',
  'wizard.skills.homebrew.installTitle': 'Homebrew 安装',
  'wizard.skills.homebrew.run': '运行：',
  'wizard.skills.nodeManagerPrompt': '技能安装的首选节点管理器',
  'wizard.skills.installPrompt': '安装缺少的技能依赖',
  'wizard.skills.installing': '正在安装 {name}…',
  'wizard.skills.installed': '已安装 {name}',
  'wizard.skills.installFailed': '安装失败：{name}',
  'wizard.skills.doctorTip': '提示：运行 `openclaw doctor` 检查技能 + 依赖项。',
  'wizard.skills.docs': '文档：https://docs.openclaw.ai/skills',
  'wizard.skills.envPrompt': '为 {skill} 设置 {env}？',
  'wizard.skills.envInput': '输入 {env}',
  'wizard.skills.defaultHint': '安装',

  // Hooks - detailed
  'wizard.hooks.title': '钩子',
  'wizard.hooks.description': '钩子让您可以在发出代理命令时自动执行操作。',
  'wizard.hooks.example': '示例：在发出 /new 时将会话上下文保存到内存。',
  'wizard.hooks.docs': '了解更多：https://docs.openclaw.ai/hooks',
  'wizard.hooks.none.title': '无可用钩子',
  'wizard.hooks.none.desc': '未找到符合条件的钩子。您可以稍后在配置中配置钩子。',
  'wizard.hooks.enablePrompt': '启用钩子？',
  'wizard.hooks.configured.title': '钩子已配置',
  'wizard.hooks.configured.manage': '您稍后可以使用以下命令管理钩子：',

  // Systemd
  'wizard.systemd.title': 'Systemd',
  'wizard.systemd.unavailable': 'Systemd 用户服务不可用。跳过持久化检查和服务安装。',
  'wizard.systemd.unavailableSkip': 'Systemd 用户服务不可用；跳过服务安装。使用您的容器管理器或 `docker compose up -d`。',
  'wizard.systemd.lingerReason': 'Linux 安装默认使用 systemd 用户服务。没有持久化，systemd 会在注销/空闲时停止用户会话并终止网关。',

  // Gateway Service
  'wizard.gateway.service.installPrompt': '安装网关服务（推荐）',
  'wizard.gateway.service.alreadyInstalled': '网关服务已安装',
  'wizard.gateway.service.restart': '重启',
  'wizard.gateway.service.reinstall': '重新安装',
  'wizard.gateway.service.option.skip': '跳过',
  'wizard.gateway.service.progress.label': '网关服务',
  'wizard.gateway.service.progress.restarting': '正在重启网关服务…',
  'wizard.gateway.service.progress.restarted': '网关服务已重启。',
  'wizard.gateway.service.progress.uninstalling': '正在卸载网关服务…',
  'wizard.gateway.service.progress.uninstalled': '网关服务已卸载。',
  'wizard.gateway.service.progress.preparing': '正在准备网关服务…',
  'wizard.gateway.service.progress.installing': '正在安装网关服务…',
  'wizard.gateway.service.progress.failed': '网关服务安装失败。',
  'wizard.gateway.service.progress.installed': '网关服务已安装。',
  'wizard.gateway.service.error.title': '网关',
  'wizard.gateway.service.error.message': '网关服务安装失败：{error}',

  // Health Check
  'wizard.health.docs': '文档：',
  'wizard.health.help.title': '健康检查帮助',

  // Apps
  'wizard.apps.title': '可选应用',
  'wizard.apps.description': '添加节点以获得额外功能：\n- macOS 应用（系统 + 通知）\n- iOS 应用（相机/画布）\n- Android 应用（相机/画布）',

  // Control UI
  'wizard.controlui.title': '控制界面',
  'wizard.controlui.webui': 'Web 界面',
  'wizard.controlui.webuiWithToken': 'Web 界面（带令牌）',
  'wizard.controlui.gatewayWs': '网关 WS',
  'wizard.controlui.gatewayReachable': '网关：可访问',
  'wizard.controlui.gatewayNotDetected': '网关：未检测到',
  'wizard.controlui.docs': '文档：https://docs.openclaw.ai/web/control-ui',

  // TUI
  'wizard.tui.title': '启动 TUI（最佳选择！）',
  'wizard.tui.description': '这是让您的代理成为您的定义性操作。\n请慢慢来。\n您告诉它的越多，体验就会越好。\n我们将发送："醒醒，我的朋友！"',
  'wizard.tui.message': '醒醒，我的朋友！',

  // Token
  'wizard.token.title': '令牌',
  'wizard.token.description': '网关令牌：网关 + 控制界面的共享身份验证。',
  'wizard.token.storage': '存储位置：~/.openclaw/openclaw.json (gateway.auth.token) 或 OPENCLAW_GATEWAY_TOKEN。',
  'wizard.token.webuiStorage': 'Web 界面将此副本存储在浏览器的 localStorage 中 (openclaw.control.settings.v1)。',
  'wizard.token.getLink': '随时获取带令牌的链接：',

  // Hatch
  'wizard.hatch.title': '您想如何启动您的机器人？',
  'wizard.hatch.option.tui': '在 TUI 中启动（推荐）',
  'wizard.hatch.option.web': '打开 Web 界面',
  'wizard.hatch.option.later': '稍后执行',

  // Dashboard
  'wizard.dashboard.title': '仪表板就绪',
  'wizard.dashboard.link': '仪表板链接（带令牌）：{url}',
  'wizard.dashboard.opened': '已在您的浏览器中打开。保留该标签页以控制 OpenClaw。',
  'wizard.dashboard.copyPaste': '在您的浏览器中复制/粘贴此 URL 以控制 OpenClaw。',

  // Later
  'wizard.later.title': '稍后',
  'wizard.later.description': '当您准备好时：{command}',
  'wizard.skipUi': '跳过控制界面/TUI 提示。',

  // Workspace Backup
  'wizard.workspaceBackup.title': '工作区备份',
  'wizard.workspaceBackup.description': '备份您的代理工作区。\n文档：https://docs.openclaw.ai/concepts/agent-workspace',

  // Security
  'wizard.security.final.title': '安全',
  'wizard.security.final.desc': '在您的计算机上运行代理存在风险 — 加固您的设置：https://docs.openclaw.ai/security',

  // Web Search
  'wizard.websearch.title': '网页搜索（可选）',
  'wizard.websearch.enabled': '网页搜索已启用，因此您的代理可以在需要时在线查找信息。',
  'wizard.websearch.apiKeyConfig': 'API 密钥：存储在配置中 (tools.web.search.apiKey)。',
  'wizard.websearch.apiKeyEnv': 'API 密钥：通过 BRAVE_API_KEY 环境变量提供（网关环境）。',
  'wizard.websearch.disabled': '如果您希望您的代理能够搜索网页，您需要一个 API 密钥。\n\nOpenClaw 使用 Brave Search 作为 `web_search` 工具。没有 Brave Search API 密钥，网页搜索将无法工作。\n\n交互式设置：\n- 运行：openclaw configure --section web\n- 启用 web_search 并粘贴您的 Brave Search API 密钥\n\n替代方案：在网关环境中设置 BRAVE_API_KEY（无需更改配置）。\n文档：https://docs.openclaw.ai/tools/web',

  // What Now
  'wizard.whatnow.title': '接下来',
  'wizard.whatnow.description': '接下来：https://openclaw.ai/showcase ("大家都在构建什么")。',

  // Completion
  'wizard.completion.outro.dashboard': '入门完成。仪表板已在您的浏览器中打开；保留该标签页以控制 OpenClaw。',
  'wizard.completion.outro.seeded': '入门完成。Web 界面已在后台初始化；随时使用上面的链接打开它。',
  'wizard.completion.outro.link': '入门完成。使用上面的令牌化仪表板链接来控制 OpenClaw。',

  // Shell Completion
  'wizard.completion.prompt': '安装 shell 补全脚本？',

  // Onboarding
  'wizard.onboarding.invalidFlow': '无效的 --flow（使用 quickstart、manual 或 advanced）。',
  'wizard.channels.skip': '跳过频道设置。',
  'wizard.skills.skip': '跳过技能设置。',
};

export default wizardMessages;
