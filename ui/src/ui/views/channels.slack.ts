import { html, nothing } from "lit";
import { t } from "../../i18n/lit.js";
import type { SlackStatus } from "../types";
import type { ChannelsProps } from "./channels.types";
import { formatAgo } from "../format";
import { renderChannelConfigSection } from "./channels.config";

export function renderSlackCard(params: {
  props: ChannelsProps;
  slack?: SlackStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, slack, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">${t("views.channels.slack.title")}</div>
      <div class="card-sub">${t("views.channels.slack.subtitle")}</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">${t("views.channels.common.configured")}</span>
          <span>${slack?.configured ? t("views.channels.common.yes") : t("views.channels.common.no")}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.common.running")}</span>
          <span>${slack?.running ? t("views.channels.common.yes") : t("views.channels.common.no")}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.common.lastStart")}</span>
          <span>${slack?.lastStartAt ? formatAgo(slack.lastStartAt) : "n/a"}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.common.lastProbe")}</span>
          <span>${slack?.lastProbeAt ? formatAgo(slack.lastProbeAt) : "n/a"}</span>
        </div>
      </div>

      ${
        slack?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${slack.lastError}
          </div>`
          : nothing
      }

      ${
        slack?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
            Probe ${slack.probe.ok ? "ok" : "failed"} ·
            ${slack.probe.status ?? ""} ${slack.probe.error ?? ""}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: "slack", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          Probe
        </button>
      </div>
    </div>
  `;
}
