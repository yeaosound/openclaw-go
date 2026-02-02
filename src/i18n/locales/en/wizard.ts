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
  'common.done': 'Done',
  'common.off': 'Off',
  'common.continue': 'Continue',
  'common.finished': 'Finished',
  'common.required': 'Required',
  'common.cancelled': 'Cancelled',
  'wizard.skills.skipHint': 'Continue without installing dependencies',

  // Skills - detailed
  'wizard.skills.status.eligible': 'Eligible',
  'wizard.skills.status.missing': 'Missing requirements',
  'wizard.skills.status.blocked': 'Blocked by allowlist',
  'wizard.skills.status.title': 'Skills status',
  'wizard.skills.configurePrompt': 'Configure skills now? (recommended)',
  'wizard.skills.homebrew.title': 'Homebrew recommended',
  'wizard.skills.homebrew.desc': 'Many skill dependencies are shipped via Homebrew.\nWithout brew, you\'ll need to build from source or download releases manually.',
  'wizard.skills.homebrew.showCommand': 'Show Homebrew install command?',
  'wizard.skills.homebrew.installTitle': 'Homebrew install',
  'wizard.skills.homebrew.run': 'Run:',
  'wizard.skills.nodeManagerPrompt': 'Preferred node manager for skill installs',
  'wizard.skills.installPrompt': 'Install missing skill dependencies',
  'wizard.skills.installing': 'Installing {name}…',
  'wizard.skills.installed': 'Installed {name}',
  'wizard.skills.installFailed': 'Install failed: {name}',
  'wizard.skills.doctorTip': 'Tip: run `openclaw doctor` to review skills + requirements.',
  'wizard.skills.docs': 'Docs: https://docs.openclaw.ai/skills',
  'wizard.skills.envPrompt': 'Set {env} for {skill}?',
  'wizard.skills.envInput': 'Enter {env}',
  'wizard.skills.defaultHint': 'install',

  // Hooks - detailed
  'wizard.hooks.title': 'Hooks',
  'wizard.hooks.description': 'Hooks let you automate actions when agent commands are issued.',
  'wizard.hooks.example': 'Example: Save session context to memory when you issue /new.',
  'wizard.hooks.docs': 'Learn more: https://docs.openclaw.ai/hooks',
  'wizard.hooks.none.title': 'No Hooks Available',
  'wizard.hooks.none.desc': 'No eligible hooks found. You can configure hooks later in your config.',
  'wizard.hooks.enablePrompt': 'Enable hooks?',
  'wizard.hooks.configured.title': 'Hooks Configured',
  'wizard.hooks.configured.manage': 'You can manage hooks later with:',

  // Systemd
  'wizard.systemd.title': 'Systemd',
  'wizard.systemd.unavailable': 'Systemd user services are unavailable. Skipping lingering checks and service install.',
  'wizard.systemd.unavailableSkip': 'Systemd user services are unavailable; skipping service install. Use your container supervisor or `docker compose up -d`.',
  'wizard.systemd.lingerReason': 'Linux installs use a systemd user service by default. Without lingering, systemd stops the user session on logout/idle and kills the Gateway.',

  // Gateway Service
  'wizard.gateway.service.installPrompt': 'Install Gateway service (recommended)',
  'wizard.gateway.service.alreadyInstalled': 'Gateway service already installed',
  'wizard.gateway.service.restart': 'Restart',
  'wizard.gateway.service.reinstall': 'Reinstall',
  'wizard.gateway.service.option.skip': 'Skip',
  'wizard.gateway.service.progress.label': 'Gateway service',
  'wizard.gateway.service.progress.restarting': 'Restarting Gateway service…',
  'wizard.gateway.service.progress.restarted': 'Gateway service restarted.',
  'wizard.gateway.service.progress.uninstalling': 'Uninstalling Gateway service…',
  'wizard.gateway.service.progress.uninstalled': 'Gateway service uninstalled.',
  'wizard.gateway.service.progress.preparing': 'Preparing Gateway service…',
  'wizard.gateway.service.progress.installing': 'Installing Gateway service…',
  'wizard.gateway.service.progress.failed': 'Gateway service install failed.',
  'wizard.gateway.service.progress.installed': 'Gateway service installed.',
  'wizard.gateway.service.error.title': 'Gateway',
  'wizard.gateway.service.error.message': 'Gateway service install failed: {error}',

  // Health Check
  'wizard.health.docs': 'Docs:',
  'wizard.health.help.title': 'Health check help',

  // Apps
  'wizard.apps.title': 'Optional apps',
  'wizard.apps.description': 'Add nodes for extra features:\n- macOS app (system + notifications)\n- iOS app (camera/canvas)\n- Android app (camera/canvas)',

  // Control UI
  'wizard.controlui.title': 'Control UI',
  'wizard.controlui.webui': 'Web UI',
  'wizard.controlui.webuiWithToken': 'Web UI (with token)',
  'wizard.controlui.gatewayWs': 'Gateway WS',
  'wizard.controlui.gatewayReachable': 'Gateway: reachable',
  'wizard.controlui.gatewayNotDetected': 'Gateway: not detected',
  'wizard.controlui.docs': 'Docs: https://docs.openclaw.ai/web/control-ui',

  // TUI
  'wizard.tui.title': 'Start TUI (best option!)',
  'wizard.tui.description': 'This is the defining action that makes your agent you.\nPlease take your time.\nThe more you tell it, the better the experience will be.\nWe will send: "Wake up, my friend!"',
  'wizard.tui.message': 'Wake up, my friend!',

  // Token
  'wizard.token.title': 'Token',
  'wizard.token.description': 'Gateway token: shared auth for the Gateway + Control UI.',
  'wizard.token.storage': 'Stored in: ~/.openclaw/openclaw.json (gateway.auth.token) or OPENCLAW_GATEWAY_TOKEN.',
  'wizard.token.webuiStorage': 'Web UI stores a copy in this browser\'s localStorage (openclaw.control.settings.v1).',
  'wizard.token.getLink': 'Get the tokenized link anytime:',

  // Hatch
  'wizard.hatch.title': 'How do you want to hatch your bot?',
  'wizard.hatch.option.tui': 'Hatch in TUI (recommended)',
  'wizard.hatch.option.web': 'Open the Web UI',
  'wizard.hatch.option.later': 'Do this later',

  // Dashboard
  'wizard.dashboard.title': 'Dashboard ready',
  'wizard.dashboard.link': 'Dashboard link (with token): {url}',
  'wizard.dashboard.opened': 'Opened in your browser. Keep that tab to control OpenClaw.',
  'wizard.dashboard.copyPaste': 'Copy/paste this URL in a browser on this machine to control OpenClaw.',

  // Later
  'wizard.later.title': 'Later',
  'wizard.later.description': 'When you\'re ready: {command}',
  'wizard.skipUi': 'Skipping Control UI/TUI prompts.',

  // Workspace Backup
  'wizard.workspaceBackup.title': 'Workspace backup',
  'wizard.workspaceBackup.description': 'Back up your agent workspace.\nDocs: https://docs.openclaw.ai/concepts/agent-workspace',

  // Security
  'wizard.security.final.title': 'Security',
  'wizard.security.final.desc': 'Running agents on your computer is risky — harden your setup: https://docs.openclaw.ai/security',

  // Web Search
  'wizard.websearch.title': 'Web search (optional)',
  'wizard.websearch.enabled': 'Web search is enabled, so your agent can look things up online when needed.',
  'wizard.websearch.apiKeyConfig': 'API key: stored in config (tools.web.search.apiKey).',
  'wizard.websearch.apiKeyEnv': 'API key: provided via BRAVE_API_KEY env var (Gateway environment).',
  'wizard.websearch.disabled': 'If you want your agent to be able to search the web, you\'ll need an API key.\n\nOpenClaw uses Brave Search for the `web_search` tool. Without a Brave Search API key, web search won\'t work.\n\nSet it up interactively:\n- Run: openclaw configure --section web\n- Enable web_search and paste your Brave Search API key\n\nAlternative: set BRAVE_API_KEY in the Gateway environment (no config changes).\nDocs: https://docs.openclaw.ai/tools/web',

  // What Now
  'wizard.whatnow.title': 'What now',
  'wizard.whatnow.description': 'What now: https://openclaw.ai/showcase ("What People Are Building").',

  // Completion
  'wizard.completion.outro.dashboard': 'Onboarding complete. Dashboard opened with your token; keep that tab to control OpenClaw.',
  'wizard.completion.outro.seeded': 'Onboarding complete. Web UI seeded in the background; open it anytime with the tokenized link above.',
  'wizard.completion.outro.link': 'Onboarding complete. Use the tokenized dashboard link above to control OpenClaw.',

  // Shell Completion
  'wizard.completion.prompt': 'Install shell completion script?',

  // Onboarding
  'wizard.onboarding.invalidFlow': 'Invalid --flow (use quickstart, manual, or advanced).',
  'wizard.channels.skip': 'Skipping channel setup.',
  'wizard.skills.skip': 'Skipping skills setup.',
};

export default wizardMessages;
