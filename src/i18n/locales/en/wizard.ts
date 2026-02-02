// English translations for wizard module
export const wizardMessages = {
  // Language selection
  'wizard.language.select': 'Select your preferred language',
  'wizard.language.current': 'current',
  'wizard.language.changed': 'Language changed to: {locale}',

  // Onboarding
  'wizard.intro.title': 'OpenClaw Onboarding',

  // Security warning
  'wizard.security.title': 'Security Warning',
  'wizard.security.note': `Security warning — please read.

OpenClaw is a hobby project and still in beta. Expect sharp edges.
This bot can read files and run actions if tools are enabled.
A bad prompt can trick it into doing unsafe things.

If you're not comfortable with basic security and access control, don't run OpenClaw.
Ask someone experienced to help before enabling tools or exposing it to the internet.

Recommended baseline:
- Pairing/allowlists + mention gating
- Sandbox + least-privilege tools
- Keep secrets out of the agent's reachable filesystem
- Use the strongest available model for any bot with tools or untrusted inboxes

Run regularly:
openclaw security audit --deep
openclaw security audit --fix

Must read: https://docs.openclaw.ai/gateway/security`,
  'wizard.security.confirm': 'I understand this is powerful and inherently risky. Continue?',

  // Config handling
  'wizard.config.existing': 'Existing config detected',
  'wizard.config.invalid': 'Config invalid',
  'wizard.config.issues.title': 'Config issues',
  'wizard.config.action': 'Config handling',
  'wizard.config.action.keep': 'Use existing values',
  'wizard.config.action.modify': 'Update values',
  'wizard.config.action.reset': 'Reset',
  'wizard.config.reset.scope': 'Reset scope',
  'wizard.config.reset.config': 'Config only',
  'wizard.config.reset.config-creds-sessions': 'Config + creds + sessions',
  'wizard.config.reset.full': 'Full reset (config + creds + sessions + workspace)',
  'wizard.config.invalid.hint': 'Config invalid. Run `{command}` to repair it, then re-run onboarding.',

  // Onboarding mode
  'wizard.onboarding.mode': 'Onboarding mode',
  'wizard.onboarding.quickstart.label': 'QuickStart',
  'wizard.onboarding.quickstart.hint': 'Configure details later via {command}.',
  'wizard.onboarding.advanced.label': 'Manual',
  'wizard.onboarding.advanced.hint': 'Configure port, network, Tailscale, and auth options.',
  'wizard.onboarding.remote.notice': 'QuickStart only supports local gateways. Switching to Manual mode.',

  // Gateway configuration
  'wizard.gateway.port': 'Gateway port',
  'wizard.gateway.bind': 'Gateway bind',
  'wizard.gateway.bind.loopback': 'Loopback (127.0.0.1)',
  'wizard.gateway.bind.lan': 'LAN',
  'wizard.gateway.bind.tailnet': 'Tailnet',
  'wizard.gateway.bind.auto': 'Auto',
  'wizard.gateway.bind.custom': 'Custom',
  'wizard.gateway.customIp': 'Gateway custom IP',
  'wizard.gateway.auth': 'Gateway auth',
  'wizard.gateway.auth.mode': 'Gateway authentication mode',
  'wizard.gateway.auth.token': 'Gateway token',
  'wizard.gateway.auth.token.default': 'Token (default)',
  'wizard.gateway.auth.password': 'Password',
  'wizard.gateway.tailscale': 'Tailscale exposure',
  'wizard.gateway.tailscale.off': 'Off',
  'wizard.gateway.tailscale.serve': 'Serve',
  'wizard.gateway.tailscale.funnel': 'Funnel',
  'wizard.gateway.tailscale.noExposure': 'No Tailscale exposure',
  'wizard.gateway.probe.success': 'Gateway reachable!',
  'wizard.gateway.probe.failed': 'Cannot reach gateway.',
  'wizard.quickstart.title': 'QuickStart',
  'wizard.quickstart.directToChannels': 'Direct to chat channels.',
  'wizard.quickstart.nodeRuntime': 'QuickStart uses Node for the Gateway service (stable + supported).',
  'wizard.quickstart.keepingSettings': 'Keeping your current gateway settings:',

  // Channel setup
  'wizard.channels.setup': 'Set up channels',
  'wizard.channels.select': 'Select channels to configure',
  'wizard.channels.select.quickstart': 'Select channel (QuickStart)',
  'wizard.channels.status.title': 'Channel status',
  'wizard.channels.status.configured': 'configured',
  'wizard.channels.status.notConfigured': 'not configured',
  'wizard.channels.status.pluginDisabled': 'plugin disabled',
  'wizard.channels.status.installPlugin': 'install plugin to enable',
  'wizard.channels.status.plugin': 'plugin',
  'wizard.channels.status.install': 'install',
  'wizard.channels.how.title': 'How channels work',
  'wizard.channels.how.dmSecurity': 'DM security: default is pairing; unknown DMs get a pairing code.',
  'wizard.channels.how.approveWith': 'Approve with',
  'wizard.channels.how.publicDms': 'Public DMs require dmPolicy="open" + allowFrom=["*"].',
  'wizard.channels.how.multiUser': 'Multi-user DMs: set session.dmScope="per-channel-peer" (or "per-account-channel-peer" for multi-account channels) to isolate sessions.',

  // Model/auth setup
  'wizard.model.provider.title': 'Model/auth provider',
  'wizard.model.provider.choice': 'Model/auth choice',
  'wizard.model.default.title': 'Default model',
  'wizard.model.default.keep': 'Default model (blank to keep)',
  'wizard.model.filter.provider': 'Filter models by provider',

  // Skills setup
  'wizard.skills.setup': 'Set up skills',
  'wizard.skills.select': 'Select skills to enable',

  // Hooks setup
  'wizard.hooks.setup': 'Set up internal hooks',

  // Finalization
  'wizard.finalize.title': 'Setup Complete',
  'wizard.finalize.completion': 'Would you like to install shell completion?',
  'wizard.finalize.hints': `Hints:
- Run {doctor} to check installation
- Run {status} to view gateway status
- Run {help} for help`,

  // Common
  'wizard.cancelled': 'Wizard cancelled',
  'wizard.back': 'Back',
  'wizard.next': 'Next',
  'wizard.finish': 'Finish',

  // Setup mode
  'wizard.setup.question': 'What do you want to set up?',
  'wizard.setup.local': 'Local gateway (run on this device)',
  'wizard.setup.remote': 'Remote gateway (connect to existing gateway)',

  // Generic
  'common.yes': 'Yes',
  'common.no': 'No',
  'common.skip': 'Skip',
  'common.skipForNow': 'Skip for now',
  'common.off': 'Off',
};

export default wizardMessages;
