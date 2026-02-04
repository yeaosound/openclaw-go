import { html, nothing } from "lit";
import { t } from "../../i18n/lit.js";
import type { GoogleChatStatus } from "../types";
import type { ChannelsProps } from "./channels.types";
import { formatAgo } from "../format";
import { renderChannelConfigSection } from "./channels.config";

export function renderGoogleChatCard(params: {
  props: ChannelsProps;
  googleChat?: GoogleChatStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, googleChat, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">${t("views.channels.googlechat.title")}</div>
      <div class="card-sub">${t("views.channels.googlechat.subtitle")}</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">${t("views.channels.common.configured")}</span>
          <span>${googleChat ? (googleChat.configured ? t("views.channels.common.yes") : t("views.channels.common.no")) : t("views.channels.common.na")}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.common.running")}</span>
          <span>${googleChat ? (googleChat.running ? t("views.channels.common.yes") : t("views.channels.common.no")) : t("views.channels.common.na")}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.googlechat.credential")}</span>
          <span>${googleChat?.credentialSource ?? t("views.channels.common.na")}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.googlechat.audience")}</span>
          <span>
            ${
              googleChat?.audienceType
                ? `${googleChat.audienceType}${googleChat.audience ? ` · ${googleChat.audience}` : ""}`
                : t("views.channels.common.na")
            }
          </span>
        </div>
        <div>
          <span class="label">${t("views.channels.common.lastStart")}</span>
          <span>${googleChat?.lastStartAt ? formatAgo(googleChat.lastStartAt) : t("views.channels.common.na")}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.common.lastProbe")}</span>
          <span>${googleChat?.lastProbeAt ? formatAgo(googleChat.lastProbeAt) : t("views.channels.common.na")}</span>
        </div>
      </div>

      ${
        googleChat?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${googleChat.lastError}
          </div>`
          : nothing
      }

      ${
        googleChat?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
            Probe ${googleChat.probe.ok ? "ok" : "failed"} ·
            ${googleChat.probe.status ?? ""} ${googleChat.probe.error ?? ""}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: "googlechat", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          ${t("views.channels.common.probe")}
        </button>
      </div>
    </div>
  `;
}
