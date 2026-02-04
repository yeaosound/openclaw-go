import { html, nothing } from "lit";
import { t } from "../../i18n/lit.js";
import type { ChannelAccountSnapshot, TelegramStatus } from "../types";
import type { ChannelsProps } from "./channels.types";
import { formatAgo } from "../format";
import { renderChannelConfigSection } from "./channels.config";

export function renderTelegramCard(params: {
  props: ChannelsProps;
  telegram?: TelegramStatus;
  telegramAccounts: ChannelAccountSnapshot[];
  accountCountLabel: unknown;
}) {
  const { props, telegram, telegramAccounts, accountCountLabel } = params;
  const hasMultipleAccounts = telegramAccounts.length > 1;

  const renderAccountCard = (account: ChannelAccountSnapshot) => {
    const probe = account.probe as { bot?: { username?: string } } | undefined;
    const botUsername = probe?.bot?.username;
    const label = account.name || account.accountId;
    return html`
      <div class="account-card">
        <div class="account-card-header">
          <div class="account-card-title">
            ${botUsername ? `@${botUsername}` : label}
          </div>
          <div class="account-card-id">${account.accountId}</div>
        </div>
        <div class="status-list account-card-status">
          <div>
            <span class="label">${t("views.channels.common.running")}</span>
            <span>${account.running ? t("views.channels.common.yes") : t("views.channels.common.no")}</span>
          </div>
          <div>
            <span class="label">${t("views.channels.common.configured")}</span>
            <span>${account.configured ? t("views.channels.common.yes") : t("views.channels.common.no")}</span>
          </div>
          <div>
            <span class="label">${t("views.channels.common.lastInbound")}</span>
            <span>${account.lastInboundAt ? formatAgo(account.lastInboundAt) : t("views.channels.common.na")}</span>
          </div>
          ${
            account.lastError
              ? html`
                <div class="account-card-error">
                  ${account.lastError}
                </div>
              `
              : nothing
          }
        </div>
      </div>
    `;
  };

  return html`
    <div class="card">
      <div class="card-title">${t("views.channels.telegram.title")}</div>
      <div class="card-sub">${t("views.channels.telegram.subtitle")}</div>
      ${accountCountLabel}

      ${
        hasMultipleAccounts
          ? html`
            <div class="account-card-list">
              ${telegramAccounts.map((account) => renderAccountCard(account))}
            </div>
          `
          : html`
            <div class="status-list" style="margin-top: 16px;">
              <div>
                <span class="label">${t("views.channels.common.configured")}</span>
                <span>${telegram?.configured ? t("views.channels.common.yes") : t("views.channels.common.no")}</span>
              </div>
              <div>
                <span class="label">${t("views.channels.common.running")}</span>
                <span>${telegram?.running ? t("views.channels.common.yes") : t("views.channels.common.no")}</span>
              </div>
              <div>
                <span class="label">${t("views.channels.common.mode")}</span>
                <span>${telegram?.mode ?? t("views.channels.common.na")}</span>
              </div>
              <div>
                <span class="label">${t("views.channels.common.lastStart")}</span>
                <span>${telegram?.lastStartAt ? formatAgo(telegram.lastStartAt) : t("views.channels.common.na")}</span>
              </div>
              <div>
                <span class="label">${t("views.channels.common.lastProbe")}</span>
                <span>${telegram?.lastProbeAt ? formatAgo(telegram.lastProbeAt) : t("views.channels.common.na")}</span>
              </div>
            </div>
          `
      }

      ${
        telegram?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${telegram.lastError}
          </div>`
          : nothing
      }

      ${
        telegram?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
            Probe ${telegram.probe.ok ? "ok" : "failed"} ·
            ${telegram.probe.status ?? ""} ${telegram.probe.error ?? ""}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: "telegram", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          ${t("views.channels.common.probe")}
        </button>
      </div>
    </div>
  `;
}
