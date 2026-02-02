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
  'common.off': '关闭',
};

export default wizardMessages;
