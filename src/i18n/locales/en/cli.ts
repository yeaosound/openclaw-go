// English translations for CLI module
export const cliMessages = {
  // plugins-cli.ts
  "cli.plugins.description": "Manage OpenClaw plugins/extensions",
  "cli.plugins.list.description": "List discovered plugins",
  "cli.plugins.show.description": "Show plugin details",
  "cli.plugins.enable.description": "Enable a plugin in config",
  "cli.plugins.disable.description": "Disable a plugin in config",
  "cli.plugins.install.description": "Install a plugin (path, archive, or npm spec)",
  "cli.plugins.update.description": "Update installed plugins (npm installs only)",
  "cli.plugins.doctor.description": "Report plugin load issues",

  // gateway-cli
  "cli.gateway.description": "Run the WebSocket Gateway",
  "cli.gateway.run.description": "Run the WebSocket Gateway (foreground)",
  "cli.gateway.status.description": "Show gateway service status + probe the Gateway",
  "cli.gateway.install.description": "Install the Gateway service (launchd/systemd/schtasks)",
  "cli.gateway.uninstall.description": "Uninstall the Gateway service",
  "cli.gateway.start.description": "Start the Gateway service",
  "cli.gateway.stop.description": "Stop the Gateway service",
  "cli.gateway.restart.description": "Restart the Gateway service",
  "cli.gateway.call.description": "Call a Gateway method",
  "cli.gateway.usage.description": "Fetch usage cost summary from session logs",
  "cli.gateway.health.description": "Fetch Gateway health",
  "cli.gateway.deep.description": "Show gateway reachability + discovery + health + status summary",
  "cli.gateway.discover.description": "Discover gateways via Bonjour",

  // browser-cli
  "cli.browser.description": "Manage OpenClaw's dedicated browser (Chrome/Chromium)",
  "cli.browser.status.description": "Show browser status",
  "cli.browser.start.description": "Start the browser (no-op if already running)",
  "cli.browser.stop.description": "Stop the browser (best-effort)",
  "cli.browser.reset.description": "Reset browser profile (moves it to Trash)",
  "cli.browser.tabs.description": "List open tabs",
  "cli.browser.shortcuts.description": "Tab shortcuts (index-based)",
  "cli.browser.new.description": "Open a new tab (about:blank)",
  "cli.browser.focus.description": "Focus tab by index (1-based)",
  "cli.browser.focus-id.description": "Focus a tab by target id (or unique prefix)",
  "cli.browser.close.description": "Close tab by index (1-based); default: first tab",
  "cli.browser.close-id.description": "Close a tab (target id optional)",
  "cli.browser.open.description": "Open a URL in a new tab",
  "cli.browser.profiles.description": "List all browser profiles",
  "cli.browser.profile-create.description": "Create a new browser profile",
  "cli.browser.profile-delete.description": "Delete a browser profile",
  "cli.browser.set.description": "Browser environment settings",
  "cli.browser.viewport.description": "Set viewport size (alias for resize)",
  "cli.browser.offline.description": "Toggle offline mode",
  "cli.browser.headers.description": "Set extra HTTP headers (JSON object)",
  "cli.browser.auth.description": "Set HTTP basic auth credentials",
  "cli.browser.geolocation.description": "Set geolocation (and grant permission)",
  "cli.browser.color-scheme.description": "Emulate prefers-color-scheme",
  "cli.browser.timezone.description": "Override timezone (CDP)",
  "cli.browser.locale.description": "Override locale (CDP)",
  "cli.browser.device.description": 'Apply a Playwright device descriptor (e.g. "iPhone 14")',
  "cli.browser.screenshot.description": "Capture a screenshot (MEDIA:<path>)",
  "cli.browser.snapshot.description":
    "Capture a snapshot (default: ai; aria is the accessibility tree)",
  "cli.browser.extension.description": "Chrome extension helpers",
  "cli.browser.extension-install.description":
    "Install the Chrome extension to a stable local path",
  "cli.browser.extension-path.description":
    "Print the path to the installed Chrome extension (load unpacked)",
  "cli.browser.console.description": "Get recent console messages",
  "cli.browser.pdf.description": "Save page as PDF",
  "cli.browser.network.description": "Wait for a network response and return its body",
  "cli.browser.cookies.description": "Read/write cookies",
  "cli.browser.cookie-set.description": "Set a cookie (requires --url or domain+path)",
  "cli.browser.cookies-clear.description": "Clear all cookies",
  "cli.browser.storage.description": "Read/write localStorage/sessionStorage",
  "cli.browser.highlight.description": "Highlight an element by ref",
  "cli.browser.errors.description": "Get recent page errors",
  "cli.browser.requests.description": "Get recent network requests (best-effort)",
  "cli.browser.trace.description": "Record a Playwright trace",
  "cli.browser.trace-start.description": "Start trace recording",
  "cli.browser.trace-stop.description": "Stop trace recording and write a .zip",

  // channels-cli
  "cli.channels.description": "Manage chat channel accounts",
  "cli.channels.list.description": "List configured channels + auth profiles",
  "cli.channels.status.description": "Show gateway channel status (use status --deep for local)",
  "cli.channels.capabilities.description":
    "Show provider capabilities (intents/scopes + supported features)",
  "cli.channels.resolve.description": "Resolve channel/user names to IDs",
  "cli.channels.logs.description": "Show recent channel logs from the gateway log file",
  "cli.channels.add.description": "Add or update a channel account",
  "cli.channels.remove.description": "Disable or delete a channel account",
  "cli.channels.link.description": "Link a channel account (if supported)",
  "cli.channels.logout.description": "Log out of a channel session (if supported)",

  // config-cli
  "cli.config.description":
    "Config helpers (get/set/unset). Run without subcommand for the wizard.",
  "cli.config.get.description": "Get a config value by dot path",
  "cli.config.set.description": "Set a config value by dot path",
  "cli.config.unset.description": "Remove a config value by dot path",

  // memory-cli
  "cli.memory.description": "Memory search tools",
  "cli.memory.status.description": "Show memory search index status",
  "cli.memory.index.description": "Reindex memory files",
  "cli.memory.search.description": "Search memory files",
  "cli.memory.indexing": "Indexing memory…",
  "cli.memory.checking": "Checking memory…",

  // system-cli
  "cli.system.description": "System tools (events, heartbeat, presence)",
  "cli.system.event.description": "Enqueue a system event and optionally trigger a heartbeat",
  "cli.system.heartbeat.description": "Heartbeat controls",
  "cli.system.heartbeat.last.description": "Show the last heartbeat event",
  "cli.system.heartbeat.enable.description": "Enable heartbeats",
  "cli.system.heartbeat.disable.description": "Disable heartbeats",
  "cli.system.presence.description": "List system presence entries",

  // security-cli
  "cli.security.description": "Security tools (audit)",
  "cli.security.audit.description": "Audit config + local state for common security foot-guns",

  // models-cli
  "cli.models.description": "Model discovery, scanning, and configuration",
  "cli.models.list.description": "List models (configured by default)",
  "cli.models.status.description": "Show configured model state",
  "cli.models.set.description": "Set the default model",
  "cli.models.setImage.description": "Set the image model",
  "cli.models.aliases.description": "Manage model aliases",
  "cli.models.aliases.list.description": "List model aliases",
  "cli.models.aliases.add.description": "Add or update a model alias",
  "cli.models.aliases.remove.description": "Remove a model alias",
  "cli.models.fallbacks.description": "Manage model fallback list",
  "cli.models.fallbacks.list.description": "List fallback models",
  "cli.models.fallbacks.add.description": "Add a fallback model",
  "cli.models.fallbacks.remove.description": "Remove a fallback model",
  "cli.models.fallbacks.clear.description": "Clear all fallback models",
  "cli.models.imageFallbacks.description": "Manage image model fallback list",
  "cli.models.imageFallbacks.list.description": "List image fallback models",
  "cli.models.imageFallbacks.add.description": "Add an image fallback model",
  "cli.models.imageFallbacks.remove.description": "Remove an image fallback model",
  "cli.models.imageFallbacks.clear.description": "Clear all image fallback models",
  "cli.models.scan.description": "Scan OpenRouter free models for tools + images",
  "cli.models.auth.description": "Manage model auth profiles",
  "cli.models.auth.add.description": "Interactive auth helper (setup-token or paste token)",
  "cli.models.auth.login.description": "Run a provider plugin auth flow (OAuth/API key)",
  "cli.models.auth.setupToken.description":
    "Run a provider CLI to create/sync a token (TTY required)",
  "cli.models.auth.pasteToken.description":
    "Paste a token into auth-profiles.json and update config",
  "cli.models.auth.loginGithubCopilot.description":
    "Login to GitHub Copilot via GitHub device flow (TTY required)",
  "cli.models.auth.order.description": "Manage per-agent auth profile order overrides",
  "cli.models.auth.order.get.description":
    "Show per-agent auth order override (from auth-profiles.json)",
  "cli.models.auth.order.set.description":
    "Set per-agent auth order override (locks rotation to this list)",
  "cli.models.auth.order.clear.description":
    "Clear per-agent auth order override (fall back to config/round-robin)",

  // hooks-cli
  "cli.hooks.description": "Manage internal agent hooks",
  "cli.hooks.list.description": "List all hooks",
  "cli.hooks.info.description": "Show detailed information about a hook",
  "cli.hooks.check.description": "Check hooks eligibility status",
  "cli.hooks.enable.description": "Enable a hook",
  "cli.hooks.disable.description": "Disable a hook",
  "cli.hooks.install.description": "Install a hook pack (path, archive, or npm spec)",
  "cli.hooks.update.description": "Update installed hooks (npm installs only)",

  // exec-approvals-cli
  "cli.approvals.description": "Manage exec approvals (gateway or node host)",
  "cli.approvals.get.description": "Fetch exec approvals snapshot",
  "cli.approvals.set.description": "Replace exec approvals with a JSON file",
  "cli.approvals.allowlist.description": "Edit the per-agent allowlist",
  "cli.approvals.allowlist.add.description": "Add a glob pattern to an allowlist",
  "cli.approvals.allowlist.remove.description": "Remove a glob pattern from an allowlist",

  // devices-cli
  "cli.devices.description": "Device pairing and auth tokens",
  "cli.devices.list.description": "List pending and paired devices",
  "cli.devices.approve.description": "Approve a pending device pairing request",
  "cli.devices.reject.description": "Reject a pending device pairing request",
  "cli.devices.rotate.description": "Rotate a device token for a role",
  "cli.devices.revoke.description": "Revoke a device token for a role",

  // sandbox-cli
  "cli.sandbox.description": "Manage sandbox containers (Docker-based agent isolation)",
  "cli.sandbox.list.description": "List sandbox containers and their status",
  "cli.sandbox.recreate.description": "Remove containers to force recreation with updated config",
  "cli.sandbox.explain.description": "Explain effective sandbox/tool policy for a session/agent",

  // skills-cli
  "cli.skills.description": "List and inspect available skills",
  "cli.skills.list.description": "List all available skills",
  "cli.skills.info.description": "Show detailed information about a skill",
  "cli.skills.check.description": "Check which skills are ready vs missing requirements",

  // cron-cli
  "cli.cron.description": "Manage cron jobs (via Gateway)",
  "cli.cron.status.description": "Show cron scheduler status",
  "cli.cron.list.description": "List cron jobs",
  "cli.cron.add.description": "Add a cron job",
  "cli.cron.rm.description": "Remove a cron job",
  "cli.cron.enable.description": "Enable a cron job",
  "cli.cron.disable.description": "Disable a cron job",
  "cli.cron.runs.description": "Show cron run history (JSONL-backed)",
  "cli.cron.run.description": "Run a cron job now (debug)",
  "cli.cron.edit.description": "Edit a cron job (patch fields)",

  // nodes-cli
  "cli.nodes.description": "Manage gateway-owned node pairing",
  "cli.nodes.pairing.list.description": "List pending pairing requests",
  "cli.nodes.pairing.approve.description": "Approve a pending pairing request",
  "cli.nodes.pairing.reject.description": "Reject a pending pairing request",
  "cli.nodes.pairing.rename.description": "Rename a paired node (display name override)",
  "cli.nodes.status.list.description": "List known nodes with connection status and capabilities",
  "cli.nodes.status.describe.description":
    "Describe a node (capabilities + supported invoke commands)",
  "cli.nodes.status.pending.description": "List pending and paired nodes",
  "cli.nodes.camera.description": "Capture camera media from a paired node",
  "cli.nodes.camera.list.description": "List available cameras on a node",
  "cli.nodes.camera.photo.description": "Capture a photo from a node camera (prints MEDIA:<path>)",
  "cli.nodes.camera.video.description":
    "Capture a short video clip from a node camera (prints MEDIA:<path>)",
  "cli.nodes.canvas.description": "Capture or render canvas content from a paired node",
  "cli.nodes.canvas.snapshot.description": "Capture a canvas snapshot (prints MEDIA:<path>)",
  "cli.nodes.canvas.show.description": "Show the canvas (optionally with a target URL/path)",
  "cli.nodes.canvas.hide.description": "Hide the canvas",
  "cli.nodes.canvas.navigate.description": "Navigate the canvas to a URL",
  "cli.nodes.canvas.eval.description": "Evaluate JavaScript in the canvas",
  "cli.nodes.canvas.a2ui.description": "Render A2UI content on the canvas",
  "cli.nodes.canvas.a2ui.push.description": "Push A2UI JSONL to the canvas",
  "cli.nodes.canvas.a2ui.reset.description": "Reset A2UI renderer state",
  "cli.nodes.location.description": "Fetch location from a paired node",
  "cli.nodes.location.get.description": "Fetch the current location from a node",
  "cli.nodes.invoke.description": "Invoke a command on a paired node",
  "cli.nodes.invoke.shell.description": "Run a shell command on a node (mac only)",
  "cli.nodes.screen.description": "Capture screen recordings from a paired node",
  "cli.nodes.screen.record.description":
    "Capture a short screen recording from a node (prints MEDIA:<path>)",
  "cli.nodes.notify.description": "Send a local notification on a node (mac only)",

  // message subcommands
  "cli.message.broadcast.description": "Broadcast a message to multiple targets",
  "cli.message.pin.description": "Pin a message",
  "cli.message.unpin.description": "Unpin a message",
  "cli.message.pins.description": "List pinned messages",
  "cli.message.permissions.description": "Fetch channel permissions",
  "cli.message.search.description": "Search Discord messages",
  "cli.message.send.description": "Send a message",
  "cli.message.react.description": "Add or remove a reaction",
  "cli.message.reactions.description": "List reactions on a message",
  "cli.message.read.description": "Read recent messages",
  "cli.message.edit.description": "Edit a message",
  "cli.message.delete.description": "Delete a message",
  "cli.message.thread.description": "Thread actions",
  "cli.message.thread.create.description": "Create a thread",
  "cli.message.thread.list.description": "List threads",
  "cli.message.thread.reply.description": "Reply in a thread",
  "cli.message.poll.description": "Send a poll",
  "cli.message.role.description": "Role actions",
  "cli.message.role.info.description": "List roles",
  "cli.message.role.add.description": "Add role to a member",
  "cli.message.role.remove.description": "Remove role from a member",
  "cli.message.channel.description": "Channel actions",
  "cli.message.channel.info.description": "Fetch channel info",
  "cli.message.channel.list.description": "List channels",
  "cli.message.member.description": "Member actions",
  "cli.message.member.info.description": "Fetch member info",
  "cli.message.voice.description": "Voice actions",
  "cli.message.voice.status.description": "Fetch voice status",
  "cli.message.event.description": "Event actions",
  "cli.message.event.list.description": "List scheduled events",
  "cli.message.event.create.description": "Create a scheduled event",
  "cli.message.timeout.description": "Timeout a member",
  "cli.message.kick.description": "Kick a member",
  "cli.message.ban.description": "Ban a member",

  // Service status
  "cli.service.alreadyRunning": "Service already running",
  "cli.service.notRunning": "Service not running",
  "cli.service.installed": "Service installed",
  "cli.service.notInstalled": "Service not installed",

  // Progress and status
  "cli.progress.loading": "Loading…",
  "cli.progress.done": "Done",
  "cli.status.success": "Success",
  "cli.status.failed": "Failed",
  "cli.status.warning": "Warning",
  "cli.status.error": "Error",
  "cli.status.info": "Info",

  // update-cli.ts - Update steps
  "update.step.cleanCheck": "Working directory is clean",
  "update.step.upstreamCheck": "Upstream branch exists",
  "update.step.gitFetch": "Fetching latest changes",
  "update.step.gitRebase": "Rebasing onto target commit",
  "update.step.gitRevParseUpstream": "Resolving upstream commit",
  "update.step.gitRevList": "Enumerating candidate commits",
  "update.step.gitClone": "Cloning git checkout",
  "update.step.preflightWorktree": "Preparing preflight worktree",
  "update.step.preflightCleanup": "Cleaning preflight worktree",
  "update.step.depsInstall": "Installing dependencies",
  "update.step.build": "Building",
  "update.step.uiBuild": "Building UI",
  "update.step.doctor": "Running doctor checks",
  "update.step.gitRevParseHead": "Verifying update",
  "update.step.globalUpdate": "Updating via package manager",
  "update.step.globalInstall": "Installing global package",

  // update-cli.ts - Quips
  "update.quip.levelUp": "Leveled up! New skills unlocked. You're welcome.",
  "update.quip.freshCode": "Fresh code, same lobster. Miss me?",
  "update.quip.backAndBetter": "Back and better. Did you even notice I was gone?",
  "update.quip.newTricks": "Update complete. I learned some new tricks while I was out.",
  "update.quip.moreSass": "Upgraded! Now with 23% more sass.",
  "update.quip.evolved": "I've evolved. Try to keep up.",
  "update.quip.newVersion": "New version, who dis? Oh right, still me but shinier.",
  "update.quip.patchedPolished": "Patched, polished, and ready to pinch. Let's go.",
  "update.quip.molted": "The lobster has molted. Harder shell, sharper claws.",
  "update.quip.updateDone": "Update done! Check the changelog or just trust me, it's good.",
  "update.quip.reborn": "Reborn from the boiling waters of npm. Stronger now.",
  "update.quip.cameBackSmarter": "I went away and came back smarter. You should try it sometime.",
  "update.quip.bugsFeared": "Update complete. The bugs feared me, so they left.",
  "update.quip.oldVersion": "New version installed. Old version sends its regards.",
  "update.quip.firmwareFresh": "Firmware fresh. Brain wrinkles: increased.",
  "update.quip.seenThings": "I've seen things you wouldn't believe. Anyway, I'm updated.",
  "update.quip.backOnline": "Back online. The changelog is long but our friendship is longer.",
  "update.quip.peterFixed": "Upgraded! Peter fixed stuff. Blame him if it breaks.",
  "update.quip.moltingComplete": "Molting complete. Please don't look at my soft shell phase.",
  "update.quip.versionBump": "Version bump! Same chaos energy, fewer crashes (probably).",

  // update-cli.ts - Status and UI
  "update.status.title": "OpenClaw update status",
  "update.result.title": "Update Result:",
  "update.steps.title": "Steps:",
  "update.progress.title": "Updating OpenClaw...",
  "update.complete": "Update complete.",
  "update.cancelled": "Update cancelled.",

  // update-cli.ts - Errors and warnings
  "update.error.invalidConfig": "Config is invalid; cannot set update channel.",
  "update.downgrade.required": "Downgrade confirmation required.",
  "update.downgrade.warning": "Downgrading can break configuration. Re-run in a TTY to confirm.",
  "update.downgrade.confirm":
    "Downgrading from {currentVersion} to {targetLabel} can break configuration. Continue?",
  "update.tagNote": "Note: --tag applies to npm installs only; git updates ignore it.",
  "update.skipped.dirty":
    "Skipped: working directory has uncommitted changes. Commit or stash them first.",
  "update.error.timeoutInvalid": "--timeout must be a positive integer (seconds)",
  "update.wizard.ttyRequired":
    "Update wizard requires a TTY. Use `openclaw update --channel <stable|beta|dev>` instead.",

  // update-cli.ts - Channel selection
  "update.channel.select": "Update channel",
  "update.channel.keep": "Keep current ({channel})",
  "update.channel.stable": "Stable",
  "update.channel.stableHint": "Tagged releases (npm latest)",
  "update.channel.beta": "Beta",
  "update.channel.betaHint": "Prereleases (npm beta)",
  "update.channel.dev": "Dev",
  "update.channel.devHint": "Git main",

  // update-cli.ts - Gateway restart
  "update.restartGateway.prompt": "Restart the gateway service after update?",

  // reset.ts
  "reset.scope.message": "Reset scope",
  "reset.scope.config.label": "Config only",
  "reset.scope.config.hint": "openclaw.json",
  "reset.scope.configCredsSessions.label": "Config + credentials + sessions",
  "reset.scope.configCredsSessions.hint": "keeps workspace + auth profiles",
  "reset.scope.full.label": "Full reset",
  "reset.scope.full.hint": "state dir + workspace",
  "reset.confirm": "Proceed with {scope} reset?",
  "reset.cancelled": "Reset cancelled.",
  "reset.error.nonInteractiveYes": "Non-interactive mode requires --yes.",
  "reset.error.nonInteractiveScope": "Non-interactive mode requires --scope.",

  // doctor.ts - Main messages
  "doctor.intro": "OpenClaw doctor",
  "doctor.complete": "Doctor complete.",

  // doctor.ts - Gateway messages
  "doctor.gateway.title": "Gateway",
  "doctor.gateway.modeUnset": "gateway.mode is unset; gateway start will be blocked.",
  "doctor.gateway.fixConfigure": "Fix: run {command} and set Gateway mode (local/remote).",
  "doctor.gateway.fixDirect": "Or set directly: {command}",
  "doctor.gateway.missingConfig": "Missing config: run {command} first.",
  "doctor.gateway.auth.title": "Gateway auth",
  "doctor.gateway.auth.off":
    "Gateway auth is off or missing a token. Token auth is now the recommended default (including loopback).",
  "doctor.gateway.auth.tokenConfigured": "Gateway token configured.",
  "doctor.gateway.auth.generatePrompt": "Generate and configure a gateway token now?",

  // doctor.ts - Legacy state messages
  "doctor.legacy.title": "Legacy state detected",
  "doctor.legacy.migratePrompt": "Migrate legacy state (sessions/agent/WhatsApp auth) now?",

  // doctor.ts - Hooks messages
  "doctor.hooks.title": "Hooks",
  "doctor.hooks.modelNotResolved": '- hooks.gmail.model "{model}" could not be resolved',

  // doctor.ts - Config messages
  "doctor.config.invalid": "Invalid config:",

  // doctor.ts - Systemd linger
  "doctor.systemd.lingerWarning":
    "Gateway runs as a systemd user service. Without lingering, systemd stops the user session on logout/idle and kills the Gateway.",

  // doctor.ts - Workspace
  "doctor.workspace.title": "Workspace",

  // doctor-auth.ts
  "doctor.auth.title": "Auth profiles",
  "doctor.auth.deprecatedDetected":
    "Deprecated external CLI auth profiles detected (no longer supported):",
  "doctor.auth.removePrompt": "Remove deprecated CLI auth profiles now?",
  "doctor.auth.updateOAuthPrompt": "Update Anthropic OAuth profile id in config now?",
  "doctor.auth.refreshPrompt": "Refresh expiring OAuth tokens now? (static tokens need re-auth)",
  "doctor.auth.model.title": "Model auth",
  "doctor.auth.cooldowns.title": "Auth profile cooldowns",
  "doctor.auth.topUp": "Top up credits (provider billing) or switch provider.",
  "doctor.auth.waitCooldown": "Wait for cooldown or switch provider.",

  // doctor-config-flow.ts
  "doctor.config.title": "Config",
  "doctor.config.invalidNote": "Config invalid; doctor will run with best-effort config.",
  "doctor.config.warnings.title": "Config warnings",
  "doctor.config.legacyKeys.title": "Legacy config keys detected",
  "doctor.config.repairPrompt": "Apply recommended config repairs now?",
  "doctor.config.zen.title": "OpenCode Zen",
  "doctor.config.unknownKeys.title": "Unknown config keys",
  "doctor.changes.title": "Doctor changes",
  "doctor.warnings.title": "Doctor warnings",

  // doctor-gateway-daemon-flow.ts
  "doctor.gateway.launchAgent.notLoaded": "LaunchAgent is listed but not loaded in launchd.",
  "doctor.gateway.launchAgent.repaired": "{title} LaunchAgent repaired.",
  "doctor.gateway.service.notInstalled": "Gateway service not installed.",
  "doctor.gateway.service.installPrompt": "Install gateway service now?",
  "doctor.gateway.service.runtime": "Gateway service runtime",
  "doctor.gateway.service.installFailed": "Gateway service install failed: {error}",
  "doctor.gateway.service.startPrompt": "Start gateway service now?",
  "doctor.gateway.service.restartPrompt": "Restart gateway service now?",
  "doctor.gateway.notRunning": "Gateway not running.",
  "doctor.gateway.connection": "Gateway connection",
  "doctor.gateway.port.title": "Gateway port",
  "doctor.gateway.lastError": "Last gateway error: {error}",

  // doctor-gateway-services.ts
  "doctor.gateway.nixMode": "Nix mode detected; skip service updates.",
  "doctor.gateway.remoteMode": "Gateway mode is remote; skipped local service audit.",
  "doctor.gateway.entrypoint.mismatch":
    "Gateway service entrypoint does not match the current install.",
  "doctor.gateway.overwritePrompt": "Overwrite gateway service config with current defaults now?",
  "doctor.gateway.updatePrompt": "Update gateway service config to the recommended defaults now?",
  "doctor.gateway.removeLegacyPrompt": "Remove legacy gateway services (clawdbot/moltbot) now?",

  // doctor-gateway-health.ts
  "doctor.gateway.health.notRunning": "Gateway not running.",

  // doctor-sandbox.ts
  "doctor.sandbox.title": "Sandbox",
  "doctor.sandbox.scriptNotFound": "Unable to locate {script}. Run it from the repo root.",
  "doctor.sandbox.imageMissing": "Sandbox {kind} image missing: {image}. {hint}",
  "doctor.sandbox.dockerNotAvailable": "Docker not available; skipping sandbox image checks.",

  // doctor-ui.ts
  "doctor.ui.title": "UI",
  "doctor.ui.sourcesNotPresent": "Skipping UI build: ui/ sources not present.",
  "doctor.ui.building": "Building Control UI assets... (this may take a moment)",
  "doctor.ui.buildComplete": "UI build complete.",
  "doctor.ui.rebuildStale": "Rebuilding stale UI assets... (this may take a moment)",
  "doctor.ui.rebuildComplete": "UI rebuild complete.",
  "doctor.ui.buildPrompt": "Build Control UI assets now?",
  "doctor.ui.rebuildPrompt": "Rebuild UI now? (Detected protocol mismatch requiring update)",

  // doctor-update.ts
  "doctor.update.title": "Update",
  "doctor.update.running": "Running update (fetch/rebase/build/ui:build/doctor)…",
  "doctor.update.prompt": "Update OpenClaw from git before running doctor?",
};

export default cliMessages;
