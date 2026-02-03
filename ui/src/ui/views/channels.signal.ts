import { html, nothing } from "lit";
import type { SignalStatus } from "../types";
import type { ChannelsProps } from "./channels.types";
import { t } from "../../i18n/lit.js";
import { formatAgo } from "../format";
import { renderChannelConfigSection } from "./channels.config";

export function renderSignalCard(params: {
  props: ChannelsProps;
  signal?: SignalStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, signal, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">${t("views.channels.signal.title")}</div>
      <div class="card-sub">${t("views.channels.signal.subtitle")}</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">${t("views.channels.common.configured")}</span>
          <span>${signal?.configured ? t("views.channels.common.yes") : t("views.channels.common.no")}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.common.running")}</span>
          <span>${signal?.running ? t("views.channels.common.yes") : t("views.channels.common.no")}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.signal.baseUrl")}</span>
          <span>${signal?.baseUrl ?? "n/a"}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.common.lastStart")}</span>
          <span>${signal?.lastStartAt ? formatAgo(signal.lastStartAt) : "n/a"}</span>
        </div>
        <div>
          <span class="label">${t("views.channels.common.lastProbe")}</span>
          <span>${signal?.lastProbeAt ? formatAgo(signal.lastProbeAt) : "n/a"}</span>
        </div>
      </div>

      ${
        signal?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${signal.lastError}
          </div>`
          : nothing
      }

      ${
        signal?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
            Probe ${signal.probe.ok ? "ok" : "failed"} ·
            ${signal.probe.status ?? ""} ${signal.probe.error ?? ""}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: "signal", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          Probe
        </button>
      </div>
    </div>
  `;
}
