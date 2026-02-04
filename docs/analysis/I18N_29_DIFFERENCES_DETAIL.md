# 29个差异键详细清单

**生成时间**: 2026-02-03

---

## 📊 差异汇总

| 文件 | 缺失键数 | 类型 |
|------|---------|------|
| cli.ts | ~200+ | CLI命令描述 |
| wizard.ts | 20 | 向导消息 |
| channels.ts | 80+ | 频道消息 |

**注意**: 实际差异比预估的29个多很多，主要是cli.ts和channels.ts有大量命令描述和频道消息。

---

## 1. cli.ts 缺失的键（部分列表）

### CLI命令描述 (主要缺失)

```
cli.approvals.allowlist.add.description
cli.approvals.allowlist.description
cli.approvals.allowlist.remove.description
cli.approvals.description
cli.approvals.get.description
cli.approvals.set.description
cli.browser.auth.description
cli.browser.close-id.description
cli.browser.close.description
cli.browser.color-scheme.description
cli.browser.console.description
cli.browser.cookie-set.description
cli.browser.cookies-clear.description
cli.browser.cookies.description
cli.browser.description
cli.browser.device.description
cli.browser.errors.description
cli.browser.extension-install.description
cli.browser.extension-path.description
cli.browser.extension.description
cli.browser.focus-id.description
cli.browser.focus.description
cli.browser.geolocation.description
cli.browser.headers.description
cli.browser.highlight.description
cli.browser.locale.description
cli.browser.network.description
cli.browser.new.description
cli.browser.offline.description
cli.browser.open.description
cli.browser.pdf.description
cli.browser.profile-create.description
cli.browser.profile-delete.description
cli.browser.profiles.description
cli.browser.requests.description
cli.browser.reset.description
cli.browser.screenshot.description
cli.browser.set.description
cli.browser.shortcuts.description
cli.browser.snapshot.description
cli.browser.start.description
cli.browser.status.description
cli.browser.stop.description
cli.browser.storage.description
cli.browser.tabs.description
cli.browser.timezone.description
cli.browser.trace-start.description
cli.browser.trace-stop.description
cli.browser.trace.description
cli.browser.viewport.description
cli.channels.add.description
cli.channels.capabilities.description
cli.channels.description
cli.channels.link.description
cli.channels.list.description
cli.channels.logout.description
cli.channels.logs.description
cli.channels.remove.description
cli.channels.resolve.description
cli.channels.status.description
cli.config.description
cli.config.get.description
cli.config.set.description
cli.config.unset.description
cli.cron.add.description
cli.cron.description
cli.cron.disable.description
cli.cron.edit.description
cli.cron.enable.description
cli.cron.list.description
cli.cron.rm.description
cli.cron.run.description
cli.cron.runs.description
cli.cron.status.description
cli.devices.approve.description
cli.devices.description
cli.devices.list.description
cli.devices.reject.description
cli.devices.revoke.description
cli.devices.rotate.description
cli.gateway.call.description
cli.gateway.deep.description
cli.gateway.description
cli.gateway.discover.description
cli.gateway.health.description
cli.gateway.install.description
cli.gateway.restart.description
cli.gateway.run.description
cli.gateway.start.description
cli.gateway.status.description
cli.gateway.stop.description
cli.gateway.uninstall.description
cli.gateway.usage.description
cli.hooks.check.description
cli.hooks.description
cli.hooks.disable.description
cli.hooks.enable.description
cli.hooks.info.description
cli.hooks.install.description
cli.hooks.list.description
cli.hooks.update.description
cli.memory.checking
cli.memory.description
cli.memory.index.description
cli.memory.indexing
cli.memory.search.description
cli.memory.status.description
cli.message.ban.description
cli.message.broadcast.description
cli.message.channel.description
cli.message.channel.info.description
cli.message.channel.list.description
cli.message.delete.description
cli.message.edit.description
cli.message.event.create.description
cli.message.event.description
cli.message.event.list.description
cli.message.kick.description
cli.message.member.description
cli.message.member.info.description
cli.message.permissions.description
cli.message.pin.description
cli.message.pins.description
cli.message.poll.description
cli.message.react.description
cli.message.reactions.description
cli.message.read.description
cli.message.role.add.description
cli.message.role.description
cli.message.role.info.description
cli.message.role.remove.description
cli.message.search.description
cli.message.send.description
cli.message.thread.create.description
cli.message.thread.description
cli.message.thread.list.description
cli.message.thread.reply.description
cli.message.timeout.description
cli.message.unpin.description
cli.message.voice.description
cli.message.voice.status.description
cli.models.aliases.add.description
cli.models.aliases.description
cli.models.aliases.list.description
cli.models.aliases.remove.description
cli.models.auth.add.description
cli.models.auth.description
cli.models.auth.login.description
cli.models.auth.order.clear.description
cli.models.auth.order.description
cli.models.auth.order.get.description
cli.models.auth.order.set.description
cli.models.auth.pasteToken.description
cli.models.auth.setupToken.description
cli.models.description
cli.models.fallbacks.add.description
cli.models.fallbacks.clear.description
cli.models.fallbacks.description
cli.models.fallbacks.list.description
cli.models.fallbacks.remove.description
cli.models.imageFallbacks.add.description
cli.models.imageFallbacks.clear.description
cli.models.imageFallbacks.description
cli.models.imageFallbacks.list.description
cli.models.imageFallbacks.remove.description
cli.models.list.description
cli.models.scan.description
cli.models.set.description
cli.models.setImage.description
cli.models.status.description
cli.nodes.camera.description
cli.nodes.camera.list.description
cli.nodes.camera.photo.description
cli.nodes.camera.video.description
cli.nodes.canvas.a2ui.description
cli.nodes.canvas.a2ui.push.description
cli.nodes.canvas.a2ui.reset.description
cli.nodes.canvas.description
cli.nodes.canvas.eval.description
cli.nodes.canvas.hide.description
cli.nodes.canvas.navigate.description
cli.nodes.canvas.show.description
cli.nodes.canvas.snapshot.description
cli.nodes.description
cli.nodes.invoke.description
cli.nodes.invoke.shell.description
cli.nodes.location.description
cli.nodes.location.get.description
cli.nodes.notify.description
cli.nodes.pairing.approve.description
cli.nodes.pairing.list.description
cli.nodes.pairing.reject.description
cli.nodes.pairing.rename.description
cli.nodes.screen.description
cli.nodes.screen.record.description
cli.nodes.status.describe.description
cli.nodes.status.list.description
cli.nodes.status.pending.description
cli.plugins.description
cli.plugins.disable.description
cli.plugins.doctor.description
cli.plugins.enable.description
cli.plugins.install.description
cli.plugins.list.description
cli.plugins.show.description
cli.plugins.update.description
cli.sandbox.description
cli.sandbox.explain.description
cli.sandbox.list.description
cli.sandbox.recreate.description
cli.security.audit.description
cli.security.description
cli.skills.check.description
cli.skills.description
cli.skills.info.description
cli.skills.list.description
cli.system.description
cli.system.event.description
cli.system.heartbeat.description
cli.system.heartbeat.disable.description
cli.system.heartbeat.enable.description
cli.system.heartbeat.last.description
cli.system.presence.description
```

### 其他CLI字符串

```
"Capture a short screen recording from a node (prints MEDIA:<path>)"
"Capture a short video clip from a node camera (prints MEDIA:<path>)"
"Capture a snapshot (default: ai; aria is the accessibility tree)"
"Clear per-agent auth order override (fall back to config/round-robin)"
"Config helpers (get/set/unset). Run without subcommand for the wizard."
"Describe a node (capabilities + supported invoke commands)"
"Install the Chrome extension to a stable local path"
"Login to GitHub Copilot via GitHub device flow (TTY required)"
"Paste a token into auth-profiles.json and update config"
"Print the path to the installed Chrome extension (load unpacked)"
"Run a provider CLI to create/sync a token (TTY required)"
"Set per-agent auth order override (locks rotation to this list)"
"Show per-agent auth order override (from auth-profiles.json)"
"Show provider capabilities (intents/scopes + supported features)"
cli.progress.done
cli.progress.loading
cli.service.alreadyRunning
cli.service.installed
cli.service.notInstalled
cli.service.notRunning
cli.status.error
cli.status.failed
cli.status.info
cli.status.success
cli.status.warning
```

---

## 2. wizard.ts 缺失的键（20个）

```
"API key: provided via BRAVE_API_KEY env var (Gateway environment)."
"Add nodes for extra features:\n- macOS app (system + notifications)\n- iOS app (camera/canvas)\n- Android app (camera/canvas)"
"Back up your agent workspace.\nDocs: https://docs.openclaw.ai/concepts/agent-workspace"
"Bonjour discovery requires dns-sd (macOS) or avahi-browse (Linux)."
"Config invalid. Run `{command}` to repair it, then re-run onboarding."
"Copy/paste this URL in a browser on this machine to control OpenClaw."
"DM security: default is pairing; unknown DMs get a pairing code."
"If you want your agent to be able to search the web, you'll need an API key.\n\nOpenClaw uses Brave Search for the `web_search` tool..."
"Linux installs use a systemd user service by default..."
"Many skill dependencies are shipped via Homebrew..."
"No eligible hooks found. You can configure hooks later in your config."
"Onboarding complete. Dashboard opened with your token..."
"Onboarding complete. Use the tokenized dashboard link above to control OpenClaw."
"Onboarding complete. Web UI seeded in the background..."
"QuickStart only supports local gateways. Switching to Manual mode."
"QuickStart uses Node for the Gateway service (stable + supported)."
"Running agents on your computer is risky — harden your setup..."
"Stored in: ~/.openclaw/openclaw.json (gateway.auth.token) or OPENCLAW_GATEWAY_TOKEN."
"Systemd user services are unavailable. Skipping lingering checks and service install."
```

---

## 3. channels.ts 缺失的键（80+个）

### Discord 消息

```
channel.disabled
channel.discord.channelDisabled
channel.discord.dmsDisabled
channel.discord.exec.disabled
channel.discord.groupDMsDisabled
channel.discord.notAllowed
channel.discord.notAuthorized
channel.discord.slash.buttonExpired
channel.discord.slash.commandNotFound
channel.discord.slash.error
channel.discord.slash.menuOtherUser
channel.discord.slash.messageRequired
channel.discord.system.addedRecipient
channel.discord.system.autoModeration
channel.discord.system.guildBoost
channel.discord.system.guildBoostTier1
channel.discord.system.guildBoostTier2
channel.discord.system.guildBoostTier3
channel.discord.system.pinnedMessage
channel.discord.system.pollResults
channel.discord.system.purchase
channel.discord.system.raidFalseAlarm
channel.discord.system.raidProtectionDisabled
channel.discord.system.raidProtectionEnabled
channel.discord.system.raidReported
channel.discord.system.removedRecipient
channel.discord.system.stageEnded
channel.discord.system.stageSpeaker
channel.discord.system.stageStarted
channel.discord.system.stageTopic
channel.discord.system.threadCreated
channel.discord.system.userJoined
```

### 其他频道消息

```
channel.line.error
channel.noPermission
channel.notConfigured
channel.signal.reactionsDisabled
channel.signal.reactionsDisabledViaActions
channel.slack.configWritesDisabled
channel.slack.dmsDisabled
channel.slack.notAllowed
channel.slack.notAuthorized
channel.slack.notAuthorizedHere
channel.slack.slash.buttonExpired
channel.slack.slash.error
channel.slack.slash.menuOtherUser
channel.slack.slash.messageRequired
channel.telegram.commandNotFound
channel.telegram.configWritesDisabled
channel.telegram.groupCommandsDisabled
channel.telegram.groupDisabled
channel.telegram.groupNotAllowed
channel.telegram.notAuthorized
channel.telegram.topicDisabled
```

### 工具消息

```
channel.tools.discord.channelInfoDisabled
channel.tools.discord.channelManagementDisabled
channel.tools.discord.emojiUploadsDisabled
channel.tools.discord.eventsDisabled
channel.tools.discord.memberInfoDisabled
channel.tools.discord.messageDeletesDisabled
channel.tools.discord.messageEditsDisabled
channel.tools.discord.messageReadsDisabled
channel.tools.discord.messageSendsDisabled
channel.tools.discord.moderationDisabled
channel.tools.discord.permissionsDisabled
channel.tools.discord.pinsDisabled
channel.tools.discord.pollsDisabled
channel.tools.discord.reactionsDisabled
channel.tools.discord.roleChangesDisabled
channel.tools.discord.roleInfoDisabled
channel.tools.discord.searchDisabled
channel.tools.discord.stickerUploadsDisabled
channel.tools.discord.stickersDisabled
channel.tools.discord.threadsDisabled
channel.tools.discord.voiceStatusDisabled
channel.tools.slack.emojiListDisabled
channel.tools.slack.memberInfoDisabled
channel.tools.slack.messagesDisabled
channel.tools.slack.pinsDisabled
channel.tools.slack.reactionsDisabled
channel.tools.whatsapp.reactionsDisabled
```

---

## 📋 总结

### 实际差异规模

| 文件 | 预估差异 | 实际差异 | 说明 |
|------|---------|---------|------|
| cli.ts | 13 | 200+ | 主要是命令描述 |
| wizard.ts | 13 | 20 | 向导消息 |
| channels.ts | 3 | 80+ | 频道和工具消息 |
| **总计** | **29** | **300+** | **远超预期** |

### 优先级建议

**高优先级** (用户可见):
1. channels.ts - 频道错误消息（用户经常使用）
2. wizard.ts - 向导消息（新用户必看）

**中优先级**:
3. cli.ts - 命令描述（帮助文本）

### 工作量估算

- **channels.ts**: 80个键 × 2分钟 = 约2.5小时
- **wizard.ts**: 20个键 × 2分钟 = 约40分钟
- **cli.ts**: 200个键 × 1分钟 = 约3小时（描述较简单）

**总计**: 约6-7小时完成所有补齐

---

**重要发现**: 实际差异远超预估的29个，需要重新评估工作量。建议优先补齐channels.ts和wizard.ts（约3小时），cli.ts可以后续逐步完善。
