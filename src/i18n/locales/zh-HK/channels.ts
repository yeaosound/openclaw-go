// 香港粵語翻譯 - 頻道模組（書面粵語）
export const channelMessages = {
  // ==================== Discord ====================
  // Permissions and access control
  "channel.discord.notAllowed": "呢個頻道唔允許。",
  "channel.discord.dmsDisabled": "Discord DM 已經停用。",
  "channel.discord.notAuthorized": "你未經授權使用呢個命令。",
  "channel.discord.groupDMsDisabled": "Discord 群組 DM 已經停用。",
  "channel.discord.channelDisabled": "呢個頻道已經停用。",

  // Slash command related
  "channel.discord.slash.messageRequired": "需要訊息。",
  "channel.discord.slash.error": "對唔住，處理嗰個命令嗰陣出錯。",
  "channel.discord.slash.buttonExpired": "對唔住，呢個按鈕唔再有效。",
  "channel.discord.slash.menuOtherUser": "嗰個選單係俾另一個用戶嘅。",
  "channel.discord.slash.commandNotFound": "搵唔到命令。",

  // System events
  "channel.discord.system.pinnedMessage": "喺 {location} 置頂咗一個訊息",
  "channel.discord.system.addedRecipient": "喺 {location} 新增咗一個收件人",
  "channel.discord.system.removedRecipient": "喺 {location} 移除咗一個收件人",
  "channel.discord.system.userJoined": "用戶喺 {location} 加入",
  "channel.discord.system.guildBoost": "喺 {location} 提升咗伺服器",
  "channel.discord.system.guildBoostTier1": "喺 {location} 提升咗伺服器（達到第 1 級）",
  "channel.discord.system.guildBoostTier2": "喺 {location} 提升咗伺服器（達到第 2 級）",
  "channel.discord.system.guildBoostTier3": "喺 {location} 提升咗伺服器（達到第 3 級）",
  "channel.discord.system.threadCreated": "喺 {location} 建立咗一個對話串",
  "channel.discord.system.autoModeration": "喺 {location} 執行咗自動審查動作",
  "channel.discord.system.raidProtectionEnabled": "喺 {location} 啟用咗突襲保護",
  "channel.discord.system.raidProtectionDisabled": "喺 {location} 停用咗突襲保護",
  "channel.discord.system.raidReported": "喺 {location} 報告咗突襲",
  "channel.discord.system.raidFalseAlarm": "喺 {location} 將突襲報告標記為誤報",
  "channel.discord.system.stageStarted": "喺 {location} 開始咗舞台",
  "channel.discord.system.stageEnded": "喺 {location} 結束咗舞台",
  "channel.discord.system.stageSpeaker": "喺 {location} 更新咗舞台講者",
  "channel.discord.system.stageTopic": "喺 {location} 更新咗舞台主題",
  "channel.discord.system.pollResults": "喺 {location} 公佈咗投票結果",
  "channel.discord.system.purchase": "喺 {location} 嘅購買通知",

  // Exec approvals
  "channel.discord.exec.disabled": "Discord 執行批核：已停用",

  // ==================== Slack ====================
  // Permissions and access control
  "channel.slack.notAllowed": "呢個頻道唔允許。",
  "channel.slack.dmsDisabled": "Slack DM 已經停用。",
  "channel.slack.notAuthorized": "你未經授權使用呢個命令。",
  "channel.slack.notAuthorizedHere": "你未經授權喺呢度使用呢個命令。",

  // Slash command related
  "channel.slack.slash.messageRequired": "需要訊息。",
  "channel.slack.slash.error": "對唔住，處理嗰個命令嗰陣出錯。",
  "channel.slack.slash.buttonExpired": "對唔住，呢個按鈕唔再有效。",
  "channel.slack.slash.menuOtherUser": "嗰個選單係俾另一個用戶嘅。",

  // Config migration
  "channel.slack.configWritesDisabled": "Slack 配置寫入已停用；略過頻道配置遷移。",

  // ==================== Telegram ====================
  // Permissions and access control
  "channel.telegram.groupDisabled": "呢個群組已經停用。",
  "channel.telegram.topicDisabled": "呢個主題已經停用。",
  "channel.telegram.notAuthorized": "你未經授權使用呢個命令。",
  "channel.telegram.groupCommandsDisabled": "Telegram 群組命令已經停用。",
  "channel.telegram.groupNotAllowed": "呢個群組唔允許。",
  "channel.telegram.commandNotFound": "搵唔到命令。",

  // Config migration
  "channel.telegram.configWritesDisabled": "Telegram 配置寫入已停用；略過群組配置遷移。",

  // ==================== Signal ====================
  "channel.signal.reactionsDisabled": 'Signal 智能體反應已經停用（reactionLevel="{level}"）。',
  "channel.signal.reactionsDisabledViaActions": "Signal 反應透過 actions.reactions 停用。",

  // ==================== LINE ====================
  "channel.line.error": "對唔住，處理你嘅訊息嗰陣出錯。",

  // ==================== Generic channel messages ====================
  "channel.notConfigured": "頻道未配置。",
  "channel.disabled": "頻道已經停用。",
  "channel.noPermission": "冇權限存取呢個頻道。",

  // ==================== Tool error messages ====================
  // Discord tools
  "channel.tools.discord.moderationDisabled": "Discord 審查已停用。",
  "channel.tools.discord.memberInfoDisabled": "Discord 成員資訊已停用。",
  "channel.tools.discord.roleInfoDisabled": "Discord 角色資訊已停用。",
  "channel.tools.discord.reactionsDisabled": "Discord 反應已停用。",
  "channel.tools.discord.emojiUploadsDisabled": "Discord 表情符號上傳已停用。",
  "channel.tools.discord.stickerUploadsDisabled": "Discord 貼紙上傳已停用。",
  "channel.tools.discord.roleChangesDisabled": "Discord 角色變更已停用。",
  "channel.tools.discord.channelInfoDisabled": "Discord 頻道資訊已停用。",
  "channel.tools.discord.voiceStatusDisabled": "Discord 語音狀態已停用。",
  "channel.tools.discord.eventsDisabled": "Discord 活動已停用。",
  "channel.tools.discord.channelManagementDisabled": "Discord 頻道管理已停用。",
  "channel.tools.discord.stickersDisabled": "Discord 貼紙已停用。",
  "channel.tools.discord.pollsDisabled": "Discord 投票已停用。",
  "channel.tools.discord.permissionsDisabled": "Discord 權限已停用。",
  "channel.tools.discord.messageReadsDisabled": "Discord 訊息讀取已停用。",
  "channel.tools.discord.messageSendsDisabled": "Discord 訊息傳送已停用。",
  "channel.tools.discord.messageEditsDisabled": "Discord 訊息編輯已停用。",
  "channel.tools.discord.messageDeletesDisabled": "Discord 訊息刪除已停用。",
  "channel.tools.discord.threadsDisabled": "Discord 對話串已停用。",
  "channel.tools.discord.pinsDisabled": "Discord 置頂已停用。",
  "channel.tools.discord.searchDisabled": "Discord 搜尋已停用。",

  // Slack tools
  "channel.tools.slack.reactionsDisabled": "Slack 反應已停用。",
  "channel.tools.slack.messagesDisabled": "Slack 訊息已停用。",
  "channel.tools.slack.pinsDisabled": "Slack 置頂已停用。",
  "channel.tools.slack.memberInfoDisabled": "Slack 成員資訊已停用。",
  "channel.tools.slack.emojiListDisabled": "Slack 表情符號清單已停用。",

  // WhatsApp tools
  "channel.tools.whatsapp.reactionsDisabled": "WhatsApp 反應已停用。",
};

export default channelMessages;
