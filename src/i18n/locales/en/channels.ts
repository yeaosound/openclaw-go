// English translations - Channels module
export const channelMessages = {
  // ==================== Discord ====================
  // Permissions and access control
  "channel.discord.notAllowed": "This channel is not allowed.",
  "channel.discord.dmsDisabled": "Discord DMs are disabled.",
  "channel.discord.notAuthorized": "You are not authorized to use this command.",
  "channel.discord.groupDMsDisabled": "Discord group DMs are disabled.",
  "channel.discord.channelDisabled": "This channel is disabled.",

  // Slash command related
  "channel.discord.slash.messageRequired": "Message required.",
  "channel.discord.slash.error": "Sorry, something went wrong handling that command.",
  "channel.discord.slash.buttonExpired": "Sorry, that button is no longer valid.",
  "channel.discord.slash.menuOtherUser": "That menu is for another user.",
  "channel.discord.slash.commandNotFound": "Command not found.",

  // System events
  "channel.discord.system.pinnedMessage": "pinned a message in {location}",
  "channel.discord.system.addedRecipient": "added a recipient in {location}",
  "channel.discord.system.removedRecipient": "removed a recipient in {location}",
  "channel.discord.system.userJoined": "user joined in {location}",
  "channel.discord.system.guildBoost": "boosted the server in {location}",
  "channel.discord.system.guildBoostTier1": "boosted the server (Tier 1 reached) in {location}",
  "channel.discord.system.guildBoostTier2": "boosted the server (Tier 2 reached) in {location}",
  "channel.discord.system.guildBoostTier3": "boosted the server (Tier 3 reached) in {location}",
  "channel.discord.system.threadCreated": "created a thread in {location}",
  "channel.discord.system.autoModeration": "auto moderation action in {location}",
  "channel.discord.system.raidProtectionEnabled": "raid protection enabled in {location}",
  "channel.discord.system.raidProtectionDisabled": "raid protection disabled in {location}",
  "channel.discord.system.raidReported": "raid reported in {location}",
  "channel.discord.system.raidFalseAlarm": "raid report marked false alarm in {location}",
  "channel.discord.system.stageStarted": "stage started in {location}",
  "channel.discord.system.stageEnded": "stage ended in {location}",
  "channel.discord.system.stageSpeaker": "stage speaker updated in {location}",
  "channel.discord.system.stageTopic": "stage topic updated in {location}",
  "channel.discord.system.pollResults": "poll results posted in {location}",
  "channel.discord.system.purchase": "purchase notification in {location}",

  // Exec approvals
  "channel.discord.exec.disabled": "Discord exec approvals: disabled",

  // ==================== Slack ====================
  // Permissions and access control
  "channel.slack.notAllowed": "This channel is not allowed.",
  "channel.slack.dmsDisabled": "Slack DMs are disabled.",
  "channel.slack.notAuthorized": "You are not authorized to use this command.",
  "channel.slack.notAuthorizedHere": "You are not authorized to use this command here.",

  // Slash command related
  "channel.slack.slash.messageRequired": "Message required.",
  "channel.slack.slash.error": "Sorry, something went wrong handling that command.",
  "channel.slack.slash.buttonExpired": "Sorry, that button is no longer valid.",
  "channel.slack.slash.menuOtherUser": "That menu is for another user.",

  // Config migration
  "channel.slack.configWritesDisabled":
    "Slack config writes disabled; skipping channel config migration.",

  // ==================== Telegram ====================
  // Permissions and access control
  "channel.telegram.groupDisabled": "This group is disabled.",
  "channel.telegram.topicDisabled": "This topic is disabled.",
  "channel.telegram.notAuthorized": "You are not authorized to use this command.",
  "channel.telegram.groupCommandsDisabled": "Telegram group commands are disabled.",
  "channel.telegram.groupNotAllowed": "This group is not allowed.",
  "channel.telegram.commandNotFound": "Command not found.",

  // Config migration
  "channel.telegram.configWritesDisabled":
    "Telegram config writes disabled; skipping group config migration.",

  // ==================== Signal ====================
  "channel.signal.reactionsDisabled": 'Signal agent reactions disabled (reactionLevel="{level}").',
  "channel.signal.reactionsDisabledViaActions":
    "Signal reactions are disabled via actions.reactions.",

  // ==================== LINE ====================
  "channel.line.error": "Sorry, something went wrong processing your message.",

  // ==================== Generic channel messages ====================
  "channel.notConfigured": "Channel not configured.",
  "channel.disabled": "Channel disabled.",
  "channel.noPermission": "No permission to access this channel.",

  // ==================== Tool error messages ====================
  // Discord tools
  "channel.tools.discord.moderationDisabled": "Discord moderation is disabled.",
  "channel.tools.discord.memberInfoDisabled": "Discord member info is disabled.",
  "channel.tools.discord.roleInfoDisabled": "Discord role info is disabled.",
  "channel.tools.discord.reactionsDisabled": "Discord reactions are disabled.",
  "channel.tools.discord.emojiUploadsDisabled": "Discord emoji uploads are disabled.",
  "channel.tools.discord.stickerUploadsDisabled": "Discord sticker uploads are disabled.",
  "channel.tools.discord.roleChangesDisabled": "Discord role changes are disabled.",
  "channel.tools.discord.channelInfoDisabled": "Discord channel info is disabled.",
  "channel.tools.discord.voiceStatusDisabled": "Discord voice status is disabled.",
  "channel.tools.discord.eventsDisabled": "Discord events are disabled.",
  "channel.tools.discord.channelManagementDisabled": "Discord channel management is disabled.",
  "channel.tools.discord.stickersDisabled": "Discord stickers are disabled.",
  "channel.tools.discord.pollsDisabled": "Discord polls are disabled.",
  "channel.tools.discord.permissionsDisabled": "Discord permissions are disabled.",
  "channel.tools.discord.messageReadsDisabled": "Discord message reads are disabled.",
  "channel.tools.discord.messageSendsDisabled": "Discord message sends are disabled.",
  "channel.tools.discord.messageEditsDisabled": "Discord message edits are disabled.",
  "channel.tools.discord.messageDeletesDisabled": "Discord message deletes are disabled.",
  "channel.tools.discord.threadsDisabled": "Discord threads are disabled.",
  "channel.tools.discord.pinsDisabled": "Discord pins are disabled.",
  "channel.tools.discord.searchDisabled": "Discord search is disabled.",

  // Slack tools
  "channel.tools.slack.reactionsDisabled": "Slack reactions are disabled.",
  "channel.tools.slack.messagesDisabled": "Slack messages are disabled.",
  "channel.tools.slack.pinsDisabled": "Slack pins are disabled.",
  "channel.tools.slack.memberInfoDisabled": "Slack member info is disabled.",
  "channel.tools.slack.emojiListDisabled": "Slack emoji list is disabled.",

  // WhatsApp tools
  "channel.tools.whatsapp.reactionsDisabled": "WhatsApp reactions are disabled.",
};

export default channelMessages;
