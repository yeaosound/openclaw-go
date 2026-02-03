import { type Message, MessageType } from "@buape/carbon";
import { t } from "../../i18n/index.js";
import { formatDiscordUserTag } from "./format.js";

export function resolveDiscordSystemEvent(message: Message, location: string): string | null {
  switch (message.type) {
    case MessageType.ChannelPinnedMessage:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.pinnedMessage", { location }),
      );
    case MessageType.RecipientAdd:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.addedRecipient", { location }),
      );
    case MessageType.RecipientRemove:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.removedRecipient", { location }),
      );
    case MessageType.UserJoin:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.userJoined", { location }),
      );
    case MessageType.GuildBoost:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.guildBoost", { location }),
      );
    case MessageType.GuildBoostTier1:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.guildBoostTier1", { location }),
      );
    case MessageType.GuildBoostTier2:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.guildBoostTier2", { location }),
      );
    case MessageType.GuildBoostTier3:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.guildBoostTier3", { location }),
      );
    case MessageType.ThreadCreated:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.threadCreated", { location }),
      );
    case MessageType.AutoModerationAction:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.autoModeration", { location }),
      );
    case MessageType.GuildIncidentAlertModeEnabled:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.raidProtectionEnabled", { location }),
      );
    case MessageType.GuildIncidentAlertModeDisabled:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.raidProtectionDisabled", { location }),
      );
    case MessageType.GuildIncidentReportRaid:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.raidReported", { location }),
      );
    case MessageType.GuildIncidentReportFalseAlarm:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.raidFalseAlarm", { location }),
      );
    case MessageType.StageStart:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.stageStarted", { location }),
      );
    case MessageType.StageEnd:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.stageEnded", { location }),
      );
    case MessageType.StageSpeaker:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.stageSpeaker", { location }),
      );
    case MessageType.StageTopic:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.stageTopic", { location }),
      );
    case MessageType.PollResult:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.pollResults", { location }),
      );
    case MessageType.PurchaseNotification:
      return buildDiscordSystemEvent(
        message,
        location,
        t("channel.discord.system.purchase", { location }),
      );
    default:
      return null;
  }
}

function buildDiscordSystemEvent(message: Message, location: string, action: string) {
  const authorLabel = message.author ? formatDiscordUserTag(message.author) : "";
  const actor = authorLabel ? `${authorLabel} ` : "";
  return `Discord system: ${actor}${action}`;
}
