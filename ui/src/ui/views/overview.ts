import { html } from "lit";

import type { GatewayHelloOk } from "../gateway";
import { formatAgo, formatDurationMs } from "../format";
import { formatNextRun } from "../presenter";
import type { UiSettings } from "../storage";
import { t } from "../../i18n/lit.js";

export type OverviewProps = {
  connected: boolean;
  hello: GatewayHelloOk | null;
  settings: UiSettings;
  password: string;
  lastError: string | null;
  presenceCount: number;
  sessionsCount: number | null;
  cronEnabled: boolean | null;
  cronNext: number | null;
  lastChannelsRefresh: number | null;
  onSettingsChange: (next: UiSettings) => void;
  onPasswordChange: (next: string) => void;
  onSessionKeyChange: (next: string) => void;
  onConnect: () => void;
  onRefresh: () => void;
};

export function renderOverview(props: OverviewProps) {
  const snapshot = props.hello?.snapshot as
    | { uptimeMs?: number; policy?: { tickIntervalMs?: number } }
    | undefined;
  const uptime = snapshot?.uptimeMs ? formatDurationMs(snapshot.uptimeMs) : "n/a";
  const tick = snapshot?.policy?.tickIntervalMs ? `${snapshot.policy.tickIntervalMs}ms` : "n/a";
  const authHint = (() => {
    if (props.connected || !props.lastError) return null;
    const lower = props.lastError.toLowerCase();
    const authFailed = lower.includes("unauthorized") || lower.includes("connect failed");
    if (!authFailed) return null;
    const hasToken = Boolean(props.settings.token.trim());
    const hasPassword = Boolean(props.password.trim());
    if (!hasToken && !hasPassword) {
      return html`
        <div class="muted" style="margin-top: 8px">
          ${t("views.overview.hints.authRequired")}
          <div style="margin-top: 6px">
            <span class="mono">openclaw dashboard --no-open</span> ${t("views.overview.hints.tokenCommand")}<br />
            <span class="mono">openclaw doctor --generate-gateway-token</span> ${t("views.overview.hints.generateTokenCommand")}
          </div>
          <div style="margin-top: 6px">
            <a
              class="session-link"
              href="https://docs.openclaw.ai/web/dashboard"
              target="_blank"
              rel="noreferrer"
              title="Control UI auth docs (opens in new tab)"
              >${t("views.overview.hints.authDocs")}</a
            >
          </div>
        </div>
      `;
    }
    return html`
      <div class="muted" style="margin-top: 8px">
        ${t("views.overview.hints.authFailed")}
        <span class="mono">openclaw dashboard --no-open</span>, or update the token, then click Connect.
        <div style="margin-top: 6px">
          <a
            class="session-link"
            href="https://docs.openclaw.ai/web/dashboard"
            target="_blank"
            rel="noreferrer"
            title="Control UI auth docs (opens in new tab)"
            >${t("views.overview.hints.authDocs")}</a
          >
        </div>
      </div>
    `;
  })();
  const insecureContextHint = (() => {
    if (props.connected || !props.lastError) return null;
    const isSecureContext = typeof window !== "undefined" ? window.isSecureContext : true;
    if (isSecureContext !== false) return null;
    const lower = props.lastError.toLowerCase();
    if (!lower.includes("secure context") && !lower.includes("device identity required")) {
      return null;
    }
    return html`
      <div class="muted" style="margin-top: 8px">
        ${t("views.overview.hints.insecureContext")}
        <span class="mono">http://127.0.0.1:18789</span> on the gateway host.
        <div style="margin-top: 6px">
          ${t("views.overview.hints.insecureHint")}
          <span class="mono">gateway.controlUi.allowInsecureAuth: true</span> ${t("views.overview.hints.insecureConfig")}
        </div>
        <div style="margin-top: 6px">
          <a
            class="session-link"
            href="https://docs.openclaw.ai/gateway/tailscale"
            target="_blank"
            rel="noreferrer"
            title="Tailscale Serve docs (opens in new tab)"
            >Docs: Tailscale Serve</a
          >
          <span class="muted"> · </span>
          <a
            class="session-link"
            href="https://docs.openclaw.ai/web/control-ui#insecure-http"
            target="_blank"
            rel="noreferrer"
            title="Insecure HTTP docs (opens in new tab)"
            >Docs: Insecure HTTP</a
          >
        </div>
      </div>
    `;
  })();

  return html`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">${t("views.overview.gatewayAccess.title")}</div>
        <div class="card-sub">${t("views.overview.gatewayAccess.subtitle")}</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>${t("views.overview.gatewayAccess.webSocketUrl")}</span>
            <input
              .value=${props.settings.gatewayUrl}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                props.onSettingsChange({ ...props.settings, gatewayUrl: v });
              }}
              placeholder=${t("views.overview.gatewayAccess.webSocketPlaceholder")}
            />
          </label>
          <label class="field">
            <span>${t("views.overview.gatewayAccess.gatewayToken")}</span>
            <input
              .value=${props.settings.token}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                props.onSettingsChange({ ...props.settings, token: v });
              }}
              placeholder=${t("views.overview.gatewayAccess.tokenPlaceholder")}
            />
          </label>
          <label class="field">
            <span>${t("views.overview.gatewayAccess.password")}</span>
            <input
              type="password"
              .value=${props.password}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                props.onPasswordChange(v);
              }}
              placeholder=${t("views.overview.gatewayAccess.passwordPlaceholder")}
            />
          </label>
          <label class="field">
            <span>${t("views.overview.gatewayAccess.defaultSessionKey")}</span>
            <input
              .value=${props.settings.sessionKey}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                props.onSessionKeyChange(v);
              }}
            />
          </label>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" @click=${() => props.onConnect()}>${t("views.overview.gatewayAccess.connect")}</button>
          <button class="btn" @click=${() => props.onRefresh()}>${t("views.overview.gatewayAccess.refresh")}</button>
          <span class="muted">${t("views.overview.gatewayAccess.applyHint")}</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">${t("views.overview.snapshot.title")}</div>
        <div class="card-sub">${t("views.overview.snapshot.subtitle")}</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">${t("views.overview.snapshot.status")}</div>
            <div class="stat-value ${props.connected ? "ok" : "warn"}">
              ${props.connected ? t("views.overview.snapshot.connected") : t("views.overview.snapshot.disconnected")}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("views.overview.snapshot.uptime")}</div>
            <div class="stat-value">${uptime}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("views.overview.snapshot.tickInterval")}</div>
            <div class="stat-value">${tick}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("views.overview.snapshot.lastChannelsRefresh")}</div>
            <div class="stat-value">
              ${props.lastChannelsRefresh ? formatAgo(props.lastChannelsRefresh) : "n/a"}
            </div>
          </div>
        </div>
        ${
          props.lastError
            ? html`<div class="callout danger" style="margin-top: 14px;">
              <div>${props.lastError}</div>
              ${authHint ?? ""}
              ${insecureContextHint ?? ""}
            </div>`
            : html`
                <div class="callout" style="margin-top: 14px">
                  ${t("views.overview.hints.channelsHint")}
                </div>
              `
        }
      </div>
    </section>

    <section class="grid grid-cols-3" style="margin-top: 18px;">
      <div class="card stat-card">
        <div class="stat-label">${t("views.overview.stats.instances")}</div>
        <div class="stat-value">${props.presenceCount}</div>
        <div class="muted">${t("views.overview.stats.instancesHint")}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">${t("views.overview.stats.sessions")}</div>
        <div class="stat-value">${props.sessionsCount ?? "n/a"}</div>
        <div class="muted">${t("views.overview.stats.sessionsHint")}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">${t("views.overview.stats.cron")}</div>
        <div class="stat-value">
          ${props.cronEnabled == null ? "n/a" : props.cronEnabled ? t("views.cron.status.enabled") : t("views.cron.status.no")}
        </div>
        <div class="muted">${t("views.overview.stats.cronNext")} ${formatNextRun(props.cronNext)}</div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">${t("views.overview.notes.title")}</div>
      <div class="card-sub">${t("views.overview.notes.subtitle")}</div>
      <div class="note-grid" style="margin-top: 14px;">
        <div>
          <div class="note-title">${t("views.overview.notes.tailscale.title")}</div>
          <div class="muted">
            ${t("views.overview.notes.tailscale.content")}
          </div>
        </div>
        <div>
          <div class="note-title">${t("views.overview.notes.session.title")}</div>
          <div class="muted">${t("views.overview.notes.session.content")}</div>
        </div>
        <div>
          <div class="note-title">${t("views.overview.notes.cron.title")}</div>
          <div class="muted">${t("views.overview.notes.cron.content")}</div>
        </div>
      </div>
    </section>
  `;
}
