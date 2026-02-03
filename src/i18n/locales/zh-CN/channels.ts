// 简体中文翻译 - 频道模块
export const channelMessages = {
  // ==================== Discord ====================
  // 权限和访问控制
  "channel.discord.notAllowed": "此频道不允许。",
  "channel.discord.dmsDisabled": "Discord DM 已禁用。",
  "channel.discord.notAuthorized": "您无权在此处使用此命令。",
  "channel.discord.groupDMsDisabled": "Discord 群组 DM 已禁用。",
  "channel.discord.channelDisabled": "此频道已禁用。",

  // Slash 命令相关
  "channel.discord.slash.messageRequired": "需要消息。",
  "channel.discord.slash.error": "抱歉，处理该命令时出了点问题。",
  "channel.discord.slash.buttonExpired": "抱歉，该按钮已不再有效。",
  "channel.discord.slash.menuOtherUser": "该菜单是针对其他用户的。",
  "channel.discord.slash.commandNotFound": "找不到命令。",

  // 系统事件
  "channel.discord.system.pinnedMessage": "在 {location} 置顶了一条消息",
  "channel.discord.system.addedRecipient": "在 {location} 添加了一个接收者",
  "channel.discord.system.removedRecipient": "在 {location} 移除了一个接收者",
  "channel.discord.system.userJoined": "在 {location} 用户加入",
  "channel.discord.system.guildBoost": "在 {location} 提升了服务器",
  "channel.discord.system.guildBoostTier1": "在 {location} 提升了服务器（达到 Tier 1）",
  "channel.discord.system.guildBoostTier2": "在 {location} 提升了服务器（达到 Tier 2）",
  "channel.discord.system.guildBoostTier3": "在 {location} 提升了服务器（达到 Tier 3）",
  "channel.discord.system.threadCreated": "在 {location} 创建了一个线程",
  "channel.discord.system.autoModeration": "在 {location} 自动审核操作",
  "channel.discord.system.raidProtectionEnabled": "在 {location} 启用 raid 保护",
  "channel.discord.system.raidProtectionDisabled": "在 {location} 禁用 raid 保护",
  "channel.discord.system.raidReported": "在 {location} 报告了 raid",
  "channel.discord.system.raidFalseAlarm": "在 {location} 将 raid 报告标记为误报",
  "channel.discord.system.stageStarted": "在 {location} 舞台开始",
  "channel.discord.system.stageEnded": "在 {location} 舞台结束",
  "channel.discord.system.stageSpeaker": "在 {location} 舞台发言人已更新",
  "channel.discord.system.stageTopic": "在 {location} 舞台主题已更新",
  "channel.discord.system.pollResults": "在 {location} 发布了投票结果",
  "channel.discord.system.purchase": "在 {location} 购买通知",

  // 执行审批
  "channel.discord.exec.disabled": "Discord 执行审批已禁用。",

  // ==================== Slack ====================
  // 权限和访问控制
  "channel.slack.notAllowed": "此频道不允许。",
  "channel.slack.dmsDisabled": "Slack DM 已禁用。",
  "channel.slack.notAuthorized": "您无权使用此命令。",
  "channel.slack.notAuthorizedHere": "您无权在此处使用此命令。",

  // Slash 命令相关
  "channel.slack.slash.messageRequired": "需要消息。",
  "channel.slack.slash.error": "抱歉，处理该命令时出了点问题。",
  "channel.slack.slash.buttonExpired": "抱歉，该按钮已不再有效。",
  "channel.slack.slash.menuOtherUser": "该菜单是针对其他用户的。",

  // 配置迁移
  "channel.slack.configWritesDisabled": "Slack 配置写入已禁用；跳过频道配置迁移。",

  // ==================== Telegram ====================
  // 权限和访问控制
  "channel.telegram.groupDisabled": "此群组已禁用。",
  "channel.telegram.topicDisabled": "此话题已禁用。",
  "channel.telegram.notAuthorized": "您无权使用此命令。",
  "channel.telegram.groupCommandsDisabled": "Telegram 群组命令已禁用。",
  "channel.telegram.groupNotAllowed": "此群组不允许。",
  "channel.telegram.commandNotFound": "找不到命令。",

  // 配置迁移
  "channel.telegram.configWritesDisabled": "Telegram 配置写入已禁用；跳过群组配置迁移。",

  // ==================== Signal ====================
  "channel.signal.reactionsDisabled": 'Signal 代理反应已禁用（反应级别="{level}"）。',
  "channel.signal.reactionsDisabledViaActions": "Signal 反应已通过 actions.reactions 禁用。",

  // ==================== LINE ====================
  "channel.line.error": "抱歉，处理您的消息时出了点问题。",

  // ==================== 通用频道消息 ====================
  "channel.notConfigured": "频道未配置。",
  "channel.disabled": "频道已禁用。",
  "channel.noPermission": "没有权限访问此频道。",

  // ==================== 工具错误消息 ====================
  // Discord 工具
  "channel.tools.discord.moderationDisabled": "Discord  moderation 已禁用。",
  "channel.tools.discord.memberInfoDisabled": "Discord 成员信息已禁用。",
  "channel.tools.discord.roleInfoDisabled": "Discord 角色信息已禁用。",
  "channel.tools.discord.reactionsDisabled": "Discord 反应已禁用。",
  "channel.tools.discord.emojiUploadsDisabled": "Discord 表情上传已禁用。",
  "channel.tools.discord.stickerUploadsDisabled": "Discord 贴纸上传已禁用。",
  "channel.tools.discord.roleChangesDisabled": "Discord 角色更改已禁用。",
  "channel.tools.discord.channelInfoDisabled": "Discord 频道信息已禁用。",
  "channel.tools.discord.voiceStatusDisabled": "Discord 语音状态已禁用。",
  "channel.tools.discord.eventsDisabled": "Discord 活动已禁用。",
  "channel.tools.discord.channelManagementDisabled": "Discord 频道管理已禁用。",
  "channel.tools.discord.stickersDisabled": "Discord 贴纸已禁用。",
  "channel.tools.discord.pollsDisabled": "Discord 投票已禁用。",
  "channel.tools.discord.permissionsDisabled": "Discord 权限已禁用。",
  "channel.tools.discord.messageReadsDisabled": "Discord 消息读取已禁用。",
  "channel.tools.discord.messageSendsDisabled": "Discord 消息发送已禁用。",
  "channel.tools.discord.messageEditsDisabled": "Discord 消息编辑已禁用。",
  "channel.tools.discord.messageDeletesDisabled": "Discord 消息删除已禁用。",
  "channel.tools.discord.threadsDisabled": "Discord 线程已禁用。",
  "channel.tools.discord.pinsDisabled": "Discord 置顶已禁用。",
  "channel.tools.discord.searchDisabled": "Discord 搜索已禁用。",

  // Slack 工具
  "channel.tools.slack.reactionsDisabled": "Slack 反应已禁用。",
  "channel.tools.slack.messagesDisabled": "Slack 消息已禁用。",
  "channel.tools.slack.pinsDisabled": "Slack 置顶已禁用。",
  "channel.tools.slack.memberInfoDisabled": "Slack 成员信息已禁用。",
  "channel.tools.slack.emojiListDisabled": "Slack 表情列表已禁用。",

  // WhatsApp 工具
  "channel.tools.whatsapp.reactionsDisabled": "WhatsApp 反应已禁用。",
};

export default channelMessages;
