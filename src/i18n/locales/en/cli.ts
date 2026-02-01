// English translations for CLI module
export const cliMessages = {
  // plugins-cli.ts
  'cli.plugins.description': 'Manage OpenClaw plugins/extensions',
  'cli.plugins.list.description': 'List discovered plugins',
  'cli.plugins.show.description': 'Show plugin details',
  'cli.plugins.enable.description': 'Enable a plugin in config',
  'cli.plugins.disable.description': 'Disable a plugin in config',
  'cli.plugins.install.description': 'Install a plugin (path, archive, or npm spec)',
  'cli.plugins.update.description': 'Update installed plugins (npm installs only)',
  'cli.plugins.doctor.description': 'Report plugin load issues',

  // gateway-cli
  'cli.gateway.description': 'Run the WebSocket Gateway',
  'cli.gateway.run.description': 'Run the WebSocket Gateway (foreground)',
  'cli.gateway.status.description': 'Show gateway service status + probe the Gateway',
  'cli.gateway.install.description': 'Install the Gateway service (launchd/systemd/schtasks)',
  'cli.gateway.uninstall.description': 'Uninstall the Gateway service',
  'cli.gateway.start.description': 'Start the Gateway service',
  'cli.gateway.stop.description': 'Stop the Gateway service',
  'cli.gateway.restart.description': 'Restart the Gateway service',
  'cli.gateway.call.description': 'Call a Gateway method',
  'cli.gateway.usage.description': 'Fetch usage cost summary from session logs',
  'cli.gateway.health.description': 'Fetch Gateway health',
  'cli.gateway.deep.description': 'Show gateway reachability + discovery + health + status summary',
  'cli.gateway.discover.description': 'Discover gateways via Bonjour',

  // browser-cli
  'cli.browser.description': "Manage OpenClaw's dedicated browser (Chrome/Chromium)",
  'cli.browser.status.description': 'Show browser status',
  'cli.browser.start.description': 'Start the browser (no-op if already running)',
  'cli.browser.stop.description': 'Stop the browser (best-effort)',
  'cli.browser.reset.description': 'Reset browser profile (moves it to Trash)',
  'cli.browser.tabs.description': 'List open tabs',
  'cli.browser.shortcuts.description': 'Tab shortcuts (index-based)',
  'cli.browser.new.description': 'Open a new tab (about:blank)',
  'cli.browser.focus.description': 'Focus tab by index (1-based)',
  'cli.browser.close.description': 'Close tab by index (1-based); default: first tab',
  'cli.browser.open.description': 'Open a URL in a new tab',

  // memory-cli
  'cli.memory.description': 'Memory search tools',
  'cli.memory.status.description': 'Show memory search index status',
  'cli.memory.index.description': 'Reindex memory files',
  'cli.memory.search.description': 'Search memory files',
  'cli.memory.indexing': 'Indexing memory…',
  'cli.memory.checking': 'Checking memory…',

  // Service status
  'cli.service.alreadyRunning': 'Service already running',
  'cli.service.notRunning': 'Service not running',
  'cli.service.installed': 'Service installed',
  'cli.service.notInstalled': 'Service not installed',

  // Progress and status
  'cli.progress.loading': 'Loading…',
  'cli.progress.done': 'Done',
  'cli.status.success': 'Success',
  'cli.status.failed': 'Failed',
  'cli.status.warning': 'Warning',
  'cli.status.error': 'Error',
  'cli.status.info': 'Info',
};

export default cliMessages;
