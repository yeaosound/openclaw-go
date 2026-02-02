import { html, nothing } from "lit";

import { t } from "../../i18n/lit.js";
import { formatAgo } from "../format";
import type { IMessageStatus } from "../types";
import type { ChannelsProps } from "./channels.types";
import { renderChannelConfigSection } from "./channels.config";

export function renderIMessageCard(params: {
  props: ChannelsProps;
  imessage?: IMessageStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, imessage, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">${t("views.channels.imessage.title")}</div>
      <div class="card-sub">${t("views.channels.imessage.subtitle")}</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">${t("views.channels.common.configured")}</span>
          <span>${imessage?.configured ? t("views.channels.common.yes") : t("views.channels.common.no")}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.common.running")}</span>
          <span>${imessage?.running ? t("views.channels.common.yes") : t("views.channels.common.no")}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.common.lastStart")}</span>
          <span>${imessage?.lastStartAt ? formatAgo(imessage.lastStartAt) : "n/a"}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.common.lastProbe")}</span>
          <span>${imessage?.lastProbeAt ? formatAgo(imessage.lastProbeAt) : "n/a"}</span>
        </div>
      </div>

      ${
        imessage?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${imessage.lastError}
          </div>`
          : nothing
      }

      ${
        imessage?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
            Probe ${imessage.probe.ok ? "ok" : "failed"} ·
            ${imessage.probe.error ?? ""}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: "imessage", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          Probe
        </button>
      </div>
    </div>
  `;
}
