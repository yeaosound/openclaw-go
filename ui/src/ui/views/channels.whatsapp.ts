import { html, nothing } from "lit";
import type { WhatsAppStatus } from "../types";
import type { ChannelsProps } from "./channels.types";
import { t } from "../../i18n/lit.js";
import { formatAgo } from "../format";
import { renderChannelConfigSection } from "./channels.config";
import { formatDuration } from "./channels.shared";

export function renderWhatsAppCard(params: {
  props: ChannelsProps;
  whatsapp?: WhatsAppStatus;
  accountCountLabel: unknown;
}) {
  const { props, whatsapp, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">${t("views.channels.whatsapp.title")}</div>
      <div class="card-sub">${t("views.channels.whatsapp.subtitle")}</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">${t("views.channels.common.configured")}</span>
          <span>${whatsapp?.configured ? t("views.channels.common.yes") : t("views.channels.common.no")}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.whatsapp.linked")}</span>
          <span>${whatsapp?.linked ? t("views.channels.common.yes") : t("views.channels.common.no")}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.common.running")}</span>
          <span>${whatsapp?.running ? t("views.channels.common.yes") : t("views.channels.common.no")}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.common.connected")}</span>
          <span>${whatsapp?.connected ? t("views.channels.common.yes") : t("views.channels.common.no")}</span>
        </div>
        <div>
          <span class="label">Last connect</span>
          <span>
            ${whatsapp?.lastConnectedAt ? formatAgo(whatsapp.lastConnectedAt) : "n/a"}
          </span>
        </div>
        <div>
          <span class="label">Last message</span>
          <span>
            ${whatsapp?.lastMessageAt ? formatAgo(whatsapp.lastMessageAt) : "n/a"}
          </span>
        </div>
        <div>
          <span class="label">Auth age</span>
          <span>
            ${whatsapp?.authAgeMs != null ? formatDuration(whatsapp.authAgeMs) : "n/a"}
          </span>
        </div>
      </div>

      ${
        whatsapp?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${whatsapp.lastError}
          </div>`
          : nothing
      }

      ${
        props.whatsappMessage
          ? html`<div class="callout" style="margin-top: 12px;">
            ${props.whatsappMessage}
          </div>`
          : nothing
      }

      ${
        props.whatsappQrDataUrl
          ? html`<div class="qr-wrap">
            <img src=${props.whatsappQrDataUrl} alt=${t("views.channels.whatsapp.qrTitle")} />
          </div>`
          : nothing
      }

      <div class="row" style="margin-top: 14px; flex-wrap: wrap;">
        <button
          class="btn primary"
          ?disabled=${props.whatsappBusy}
          @click=${() => props.onWhatsAppStart(false)}
        >
          ${props.whatsappBusy ? t("views.channels.whatsapp.working") : t("views.channels.whatsapp.showQr")}
        </button>
        <button
          class="btn"
          ?disabled=${props.whatsappBusy}
          @click=${() => props.onWhatsAppStart(true)}
        >
          Relink
        </button>
        <button
          class="btn"
          ?disabled=${props.whatsappBusy}
          @click=${() => props.onWhatsAppWait()}
        >
          Wait for scan
        </button>
        <button
          class="btn danger"
          ?disabled=${props.whatsappBusy}
          @click=${() => props.onWhatsAppLogout()}
        >
          Logout
        </button>
        <button class="btn" @click=${() => props.onRefresh(true)}>
          Refresh
        </button>
      </div>

      ${renderChannelConfigSection({ channelId: "whatsapp", props })}
    </div>
  `;
}
