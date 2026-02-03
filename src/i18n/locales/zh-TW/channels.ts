// 简体中文翻译 - 頻道模块
export const channelMessages = {
  // ==================== Discord ====================
  // 权限和存取控制
  "channel.discord.notAllowed": "此頻道不允許。",
  "channel.discord.dmsDisabled": "Discord DM 已停用。",
  "channel.discord.notAuthorized": "您无权在此处使用此指令。",
  "channel.discord.groupDMsDisabled": "Discord 群組 DM 已停用。",
  "channel.discord.channelDisabled": "此頻道已停用。",

  // Slash 指令相关
  "channel.discord.slash.messageRequired": "需要訊息。",
  "channel.discord.slash.error": "抱歉，處理该指令时出了点問題。",
  "channel.discord.slash.buttonExpired": "抱歉，该按钮已不再有效。",
  "channel.discord.slash.menuOtherUser": "该菜单是针对其他使用者的。",
  "channel.discord.slash.commandNotFound": "找不到指令。",

  // 系統事件
  "channel.discord.system.pinnedMessage": "在 {location} 置顶了一条訊息",
  "channel.discord.system.addedRecipient": "在 {location} 新增了一个接收者",
  "channel.discord.system.removedRecipient": "在 {location} 移除了一个接收者",
  "channel.discord.system.userJoined": "在 {location} 使用者加入",
  "channel.discord.system.guildBoost": "在 {location} 提升了服務器",
  "channel.discord.system.guildBoostTier1": "在 {location} 提升了服務器（达到 Tier 1）",
  "channel.discord.system.guildBoostTier2": "在 {location} 提升了服務器（达到 Tier 2）",
  "channel.discord.system.guildBoostTier3": "在 {location} 提升了服務器（达到 Tier 3）",
  "channel.discord.system.threadCreated": "在 {location} 建立了一个线程",
  "channel.discord.system.autoModeration": "在 {location} 自動审核操作",
  "channel.discord.system.raidProtectionEnabled": "在 {location} 啟用 raid 保护",
  "channel.discord.system.raidProtectionDisabled": "在 {location} 停用 raid 保护",
  "channel.discord.system.raidReported": "在 {location} 報告了 raid",
  "channel.discord.system.raidFalseAlarm": "在 {location} 将 raid 報告标记为误报",
  "channel.discord.system.stageStarted": "在 {location} 舞台開始",
  "channel.discord.system.stageEnded": "在 {location} 舞台結束",
  "channel.discord.system.stageSpeaker": "在 {location} 舞台发言人已更新",
  "channel.discord.system.stageTopic": "在 {location} 舞台主题已更新",
  "channel.discord.system.pollResults": "在 {location} 发布了投票結果",
  "channel.discord.system.purchase": "在 {location} 購買通知",

  // 执行审批
  "channel.discord.exec.disabled": "Discord 执行审批已停用。",

  // ==================== Slack ====================
  // 权限和存取控制
  "channel.slack.notAllowed": "此頻道不允許。",
  "channel.slack.dmsDisabled": "Slack DM 已停用。",
  "channel.slack.notAuthorized": "您无权使用此指令。",
  "channel.slack.notAuthorizedHere": "您无权在此处使用此指令。",

  // Slash 指令相关
  "channel.slack.slash.messageRequired": "需要訊息。",
  "channel.slack.slash.error": "抱歉，處理该指令时出了点問題。",
  "channel.slack.slash.buttonExpired": "抱歉，该按钮已不再有效。",
  "channel.slack.slash.menuOtherUser": "该菜单是针对其他使用者的。",

  // 設定迁移
  "channel.slack.configWritesDisabled": "Slack 設定寫入已停用；跳过頻道設定迁移。",

  // ==================== Telegram ====================
  // 权限和存取控制
  "channel.telegram.groupDisabled": "此群組已停用。",
  "channel.telegram.topicDisabled": "此话题已停用。",
  "channel.telegram.notAuthorized": "您无权使用此指令。",
  "channel.telegram.groupCommandsDisabled": "Telegram 群組指令已停用。",
  "channel.telegram.groupNotAllowed": "此群組不允許。",
  "channel.telegram.commandNotFound": "找不到指令。",

  // 設定迁移
  "channel.telegram.configWritesDisabled": "Telegram 設定寫入已停用；跳过群組設定迁移。",

  // ==================== Signal ====================
  "channel.signal.reactionsDisabled": 'Signal 代理反应已停用（反应级别="{level}"）。',
  "channel.signal.reactionsDisabledViaActions": "Signal 反应已透過 actions.reactions 停用。",

  // ==================== LINE ====================
  "channel.line.error": "抱歉，處理您的訊息时出了点問題。",

  // ==================== 通用頻道訊息 ====================
  "channel.notConfigured": "頻道未設定。",
  "channel.disabled": "頻道已停用。",
  "channel.noPermission": "没有权限存取此頻道。",

  // ==================== 工具錯誤訊息 ====================
  // Discord 工具
  "channel.tools.discord.moderationDisabled": "Discord  moderation 已停用。",
  "channel.tools.discord.memberInfoDisabled": "Discord 成員訊息已停用。",
  "channel.tools.discord.roleInfoDisabled": "Discord 角色訊息已停用。",
  "channel.tools.discord.reactionsDisabled": "Discord 反应已停用。",
  "channel.tools.discord.emojiUploadsDisabled": "Discord 表情上傳已停用。",
  "channel.tools.discord.stickerUploadsDisabled": "Discord 贴纸上傳已停用。",
  "channel.tools.discord.roleChangesDisabled": "Discord 角色更改已停用。",
  "channel.tools.discord.channelInfoDisabled": "Discord 頻道訊息已停用。",
  "channel.tools.discord.voiceStatusDisabled": "Discord 语音狀態已停用。",
  "channel.tools.discord.eventsDisabled": "Discord 活动已停用。",
  "channel.tools.discord.channelManagementDisabled": "Discord 頻道管理已停用。",
  "channel.tools.discord.stickersDisabled": "Discord 贴纸已停用。",
  "channel.tools.discord.pollsDisabled": "Discord 投票已停用。",
  "channel.tools.discord.permissionsDisabled": "Discord 权限已停用。",
  "channel.tools.discord.messageReadsDisabled": "Discord 訊息讀取已停用。",
  "channel.tools.discord.messageSendsDisabled": "Discord 訊息傳送已停用。",
  "channel.tools.discord.messageEditsDisabled": "Discord 訊息編輯已停用。",
  "channel.tools.discord.messageDeletesDisabled": "Discord 訊息刪除已停用。",
  "channel.tools.discord.threadsDisabled": "Discord 线程已停用。",
  "channel.tools.discord.pinsDisabled": "Discord 置顶已停用。",
  "channel.tools.discord.searchDisabled": "Discord 搜尋已停用。",

  // Slack 工具
  "channel.tools.slack.reactionsDisabled": "Slack 反应已停用。",
  "channel.tools.slack.messagesDisabled": "Slack 訊息已停用。",
  "channel.tools.slack.pinsDisabled": "Slack 置顶已停用。",
  "channel.tools.slack.memberInfoDisabled": "Slack 成員訊息已停用。",
  "channel.tools.slack.emojiListDisabled": "Slack 表情列表已停用。",

  // WhatsApp 工具
  "channel.tools.whatsapp.reactionsDisabled": "WhatsApp 反应已停用。",
};

export default channelMessages;
