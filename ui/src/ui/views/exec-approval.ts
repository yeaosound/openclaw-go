import { html, nothing } from "lit";

import { t, translate } from "../../i18n/lit.js";
import type { AppViewState } from "../app-view-state";

function formatRemaining(ms: number): string {
  const remaining = Math.max(0, ms);
  const totalSeconds = Math.floor(remaining / 1000);
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const minutes = Math.floor(totalSeconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h`;
}

function renderMetaRow(label: string, value?: string | null) {
  if (!value) return nothing;
  return html`<div class="exec-approval-meta-row"><span>${label}</span><span>${value}</span></div>`;
}

function translateMetaRow(key: string, value?: string | null) {
  if (!value) return nothing;
  const label = translate(`views.execApproval.fields.${key}` as any);
  return renderMetaRow(label, value);
}

export function renderExecApprovalPrompt(state: AppViewState) {
  const active = state.execApprovalQueue[0];
  if (!active) return nothing;
  const request = active.request;
  const remainingMs = active.expiresAtMs - Date.now();
  const remaining = remainingMs > 0 ? `expires in ${formatRemaining(remainingMs)}` : "expired";
  const queueCount = state.execApprovalQueue.length;
  return html`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">${t("views.execApproval.title")}</div>
            <div class="exec-approval-sub">${remaining}</div>
          </div>
          ${
            queueCount > 1
              ? html`<div class="exec-approval-queue">${t("views.execApproval.queue.pending", { count: queueCount })}</div>`
              : nothing
          }
        </div>
        <div class="exec-approval-command mono">${request.command}</div>
        <div class="exec-approval-meta">
          ${translateMetaRow("host", request.host)}
          ${translateMetaRow("agent", request.agentId)}
          ${translateMetaRow("session", request.sessionKey)}
          ${renderMetaRow("CWD", request.cwd)}
          ${translateMetaRow("resolved", request.resolvedPath)}
          ${translateMetaRow("security", request.security)}
          ${translateMetaRow("ask", request.ask)}
        </div>
        ${
          state.execApprovalError
            ? html`<div class="exec-approval-error">${t("views.execApproval.error")}: ${state.execApprovalError}</div>`
            : nothing
        }
        <div class="exec-approval-actions">
          <button
            class="btn primary"
            ?disabled=${state.execApprovalBusy}
            @click=${() => state.handleExecApprovalDecision("allow-once")}
          >
            Allow once
          </button>
          <button
            class="btn"
            ?disabled=${state.execApprovalBusy}
            @click=${() => state.handleExecApprovalDecision("allow-always")}
          >
            Always allow
          </button>
          <button
            class="btn danger"
            ?disabled=${state.execApprovalBusy}
            @click=${() => state.handleExecApprovalDecision("deny")}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  `;
}
