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
  'wizard.gateway.auth.mode': 'Gateway authentication mode',
  'wizard.gateway.auth.token': 'Gateway token',
  'wizard.gateway.probe.success': 'Gateway reachable!',
  'wizard.gateway.probe.failed': 'Cannot reach gateway.',

  // Channel setup
  'wizard.channels.setup': 'Set up channels',
  'wizard.channels.select': 'Select channels to configure',

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
};

export default wizardMessages;
