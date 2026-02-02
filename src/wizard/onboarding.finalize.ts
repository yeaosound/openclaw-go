import fs from "node:fs/promises";
import path from "node:path";

import { DEFAULT_BOOTSTRAP_FILENAME } from "../agents/workspace.js";
import {
  DEFAULT_GATEWAY_DAEMON_RUNTIME,
  GATEWAY_DAEMON_RUNTIME_OPTIONS,
} from "../commands/daemon-runtime.js";
import { healthCommand } from "../commands/health.js";
import { formatHealthCheckFailure } from "../commands/health-format.js";
import {
  detectBrowserOpenSupport,
  formatControlUiSshHint,
  openUrl,
  openUrlInBackground,
  probeGatewayReachable,
  waitForGatewayReachable,
  resolveControlUiLinks,
} from "../commands/onboard-helpers.js";
import { formatCliCommand } from "../cli/command-format.js";
import { t } from "../i18n/index.js";
import type { OnboardOptions } from "../commands/onboard-types.js";
import type { OpenClawConfig } from "../config/config.js";
import { resolveGatewayService } from "../daemon/service.js";
import { isSystemdUserServiceAvailable } from "../daemon/systemd.js";
import { ensureControlUiAssetsBuilt } from "../infra/control-ui-assets.js";
import type { RuntimeEnv } from "../runtime.js";
import { runTui } from "../tui/tui.js";
import { resolveUserPath } from "../utils.js";
import {
  buildGatewayInstallPlan,
  gatewayInstallErrorHint,
} from "../commands/daemon-install-helpers.js";
import type { GatewayWizardSettings, WizardFlow } from "./onboarding.types.js";
import type { WizardPrompter } from "./prompts.js";

type FinalizeOnboardingOptions = {
  flow: WizardFlow;
  opts: OnboardOptions;
  baseConfig: OpenClawConfig;
  nextConfig: OpenClawConfig;
  workspaceDir: string;
  settings: GatewayWizardSettings;
  prompter: WizardPrompter;
  runtime: RuntimeEnv;
};

export async function finalizeOnboardingWizard(options: FinalizeOnboardingOptions) {
  const { flow, opts, baseConfig, nextConfig, settings, prompter, runtime } = options;

  const withWizardProgress = async <T>(
    label: string,
    options: { doneMessage?: string },
    work: (progress: { update: (message: string) => void }) => Promise<T>,
  ): Promise<T> => {
    const progress = prompter.progress(label);
    try {
      return await work(progress);
    } finally {
      progress.stop(options.doneMessage);
    }
  };

  const systemdAvailable =
    process.platform === "linux" ? await isSystemdUserServiceAvailable() : true;
  if (process.platform === "linux" && !systemdAvailable) {
    await prompter.note(
      t('wizard.systemd.unavailable'),
      t('wizard.systemd.title'),
    );
  }

  if (process.platform === "linux" && systemdAvailable) {
    const { ensureSystemdUserLingerInteractive } = await import("../commands/systemd-linger.js");
    await ensureSystemdUserLingerInteractive({
      runtime,
      prompter: {
        confirm: prompter.confirm,
        note: prompter.note,
      },
      reason: t('wizard.systemd.lingerReason'),
      requireConfirm: false,
    });
  }

  const explicitInstallDaemon =
    typeof opts.installDaemon === "boolean" ? opts.installDaemon : undefined;
  let installDaemon: boolean;
  if (explicitInstallDaemon !== undefined) {
    installDaemon = explicitInstallDaemon;
  } else if (process.platform === "linux" && !systemdAvailable) {
    installDaemon = false;
  } else if (flow === "quickstart") {
    installDaemon = true;
  } else {
    installDaemon = await prompter.confirm({
      message: t('wizard.gateway.service.installPrompt'),
      initialValue: true,
    });
  }

  if (process.platform === "linux" && !systemdAvailable && installDaemon) {
    await prompter.note(
      t('wizard.systemd.unavailableSkip'),
      t('wizard.gateway.service.progress.label'),
    );
    installDaemon = false;
  }

  if (installDaemon) {
    const daemonRuntime =
      flow === "quickstart"
        ? DEFAULT_GATEWAY_DAEMON_RUNTIME
        : await prompter.select({
            message: t('wizard.gateway.runtime.prompt'),
            options: GATEWAY_DAEMON_RUNTIME_OPTIONS,
            initialValue: opts.daemonRuntime ?? DEFAULT_GATEWAY_DAEMON_RUNTIME,
          });
    if (flow === "quickstart") {
      await prompter.note(
        t('wizard.quickstart.nodeRuntime'),
        t('wizard.gateway.runtime.title'),
      );
    }
    const service = resolveGatewayService();
    const loaded = await service.isLoaded({ env: process.env });
    if (loaded) {
      const action = await prompter.select({
        message: t('wizard.gateway.service.alreadyInstalled'),
        options: [
          { value: "restart", label: t('wizard.gateway.service.restart') },
          { value: "reinstall", label: t('wizard.gateway.service.reinstall') },
          { value: "skip", label: t('wizard.gateway.service.option.skip') },
        ],
      });
      if (action === "restart") {
        await withWizardProgress(
          t('wizard.gateway.service.progress.label'),
          { doneMessage: t('wizard.gateway.service.progress.restarted') },
          async (progress) => {
            progress.update(t('wizard.gateway.service.progress.restarting'));
            await service.restart({
              env: process.env,
              stdout: process.stdout,
            });
          },
        );
      } else if (action === "reinstall") {
        await withWizardProgress(
          t('wizard.gateway.service.progress.label'),
          { doneMessage: t('wizard.gateway.service.progress.uninstalled') },
          async (progress) => {
            progress.update(t('wizard.gateway.service.progress.uninstalling'));
            await service.uninstall({ env: process.env, stdout: process.stdout });
          },
        );
      }
    }

    if (!loaded || (loaded && !(await service.isLoaded({ env: process.env })))) {
      const progress = prompter.progress(t('wizard.gateway.service.progress.label'));
      let installError: string | null = null;
      try {
        progress.update(t('wizard.gateway.service.progress.preparing'));
        const { programArguments, workingDirectory, environment } = await buildGatewayInstallPlan({
          env: process.env,
          port: settings.port,
          token: settings.gatewayToken,
          runtime: daemonRuntime,
          warn: (message, title) => prompter.note(message, title),
          config: nextConfig,
        });

        progress.update(t('wizard.gateway.service.progress.installing'));
        await service.install({
          env: process.env,
          stdout: process.stdout,
          programArguments,
          workingDirectory,
          environment,
        });
      } catch (err) {
        installError = err instanceof Error ? err.message : String(err);
      } finally {
        progress.stop(
          installError ? t('wizard.gateway.service.progress.failed') : t('wizard.gateway.service.progress.installed'),
        );
      }
      if (installError) {
        await prompter.note(t('wizard.gateway.service.error.message', { error: installError }), t('wizard.gateway.service.error.title'));
        await prompter.note(gatewayInstallErrorHint(), t('wizard.gateway.service.error.title'));
      }
    }
  }

  if (!opts.skipHealth) {
    const probeLinks = resolveControlUiLinks({
      bind: nextConfig.gateway?.bind ?? "loopback",
      port: settings.port,
      customBindHost: nextConfig.gateway?.customBindHost,
      basePath: undefined,
    });
    // Daemon install/restart can briefly flap the WS; wait a bit so health check doesn't false-fail.
    await waitForGatewayReachable({
      url: probeLinks.wsUrl,
      token: settings.gatewayToken,
      deadlineMs: 15_000,
    });
    try {
      await healthCommand({ json: false, timeoutMs: 10_000 }, runtime);
    } catch (err) {
      runtime.error(formatHealthCheckFailure(err));
      await prompter.note(
        [
          t('wizard.health.docs'),
          "https://docs.openclaw.ai/gateway/health",
          "https://docs.openclaw.ai/gateway/troubleshooting",
        ].join("\n"),
        t('wizard.health.help.title'),
      );
    }
  }

  const controlUiEnabled =
    nextConfig.gateway?.controlUi?.enabled ?? baseConfig.gateway?.controlUi?.enabled ?? true;
  if (!opts.skipUi && controlUiEnabled) {
    const controlUiAssets = await ensureControlUiAssetsBuilt(runtime);
    if (!controlUiAssets.ok && controlUiAssets.message) {
      runtime.error(controlUiAssets.message);
    }
  }

  await prompter.note(
    t('wizard.apps.description'),
    t('wizard.apps.title'),
  );

  const controlUiBasePath =
    nextConfig.gateway?.controlUi?.basePath ?? baseConfig.gateway?.controlUi?.basePath;
  const links = resolveControlUiLinks({
    bind: settings.bind,
    port: settings.port,
    customBindHost: settings.customBindHost,
    basePath: controlUiBasePath,
  });
  const tokenParam =
    settings.authMode === "token" && settings.gatewayToken
      ? `?token=${encodeURIComponent(settings.gatewayToken)}`
      : "";
  const authedUrl = `${links.httpUrl}${tokenParam}`;
  const gatewayProbe = await probeGatewayReachable({
    url: links.wsUrl,
    token: settings.authMode === "token" ? settings.gatewayToken : undefined,
    password: settings.authMode === "password" ? nextConfig.gateway?.auth?.password : "",
  });
  const gatewayStatusLine = gatewayProbe.ok
    ? t('wizard.controlui.gatewayReachable')
    : `${t('wizard.controlui.gatewayNotDetected')}${gatewayProbe.detail ? ` (${gatewayProbe.detail})` : ""}`;
  const bootstrapPath = path.join(
    resolveUserPath(options.workspaceDir),
    DEFAULT_BOOTSTRAP_FILENAME,
  );
  const hasBootstrap = await fs
    .access(bootstrapPath)
    .then(() => true)
    .catch(() => false);

  await prompter.note(
    [
      `${t('wizard.controlui.webui')}: ${links.httpUrl}`,
      tokenParam ? `${t('wizard.controlui.webuiWithToken')}: ${authedUrl}` : undefined,
      `${t('wizard.controlui.gatewayWs')}: ${links.wsUrl}`,
      gatewayStatusLine,
      t('wizard.controlui.docs'),
    ]
      .filter(Boolean)
      .join("\n"),
    t('wizard.controlui.title'),
  );

  let controlUiOpened = false;
  let controlUiOpenHint: string | undefined;
  let seededInBackground = false;
  let hatchChoice: "tui" | "web" | "later" | null = null;

  if (!opts.skipUi && gatewayProbe.ok) {
    if (hasBootstrap) {
      await prompter.note(
        t('wizard.tui.description'),
        t('wizard.tui.title'),
      );
    }

    await prompter.note(
      [
        t('wizard.token.description'),
        t('wizard.token.storage'),
        t('wizard.token.webuiStorage'),
        `${t('wizard.token.getLink')}: ${formatCliCommand("openclaw dashboard --no-open")}`,
      ].join("\n"),
      t('wizard.token.title'),
    );

    hatchChoice = await prompter.select({
      message: t('wizard.hatch.title'),
      options: [
        { value: "tui", label: t('wizard.hatch.option.tui') },
        { value: "web", label: t('wizard.hatch.option.web') },
        { value: "later", label: t('wizard.hatch.option.later') },
      ],
      initialValue: "tui",
    });

    if (hatchChoice === "tui") {
      await runTui({
        url: links.wsUrl,
        token: settings.authMode === "token" ? settings.gatewayToken : undefined,
        password: settings.authMode === "password" ? nextConfig.gateway?.auth?.password : "",
        // Safety: onboarding TUI should not auto-deliver to lastProvider/lastTo.
        deliver: false,
        message: hasBootstrap ? t('wizard.tui.message') : undefined,
      });
      if (settings.authMode === "token" && settings.gatewayToken) {
        seededInBackground = await openUrlInBackground(authedUrl);
      }
      if (seededInBackground) {
        await prompter.note(
          `${t('wizard.webui.seeded')}: ${formatCliCommand("openclaw dashboard --no-open")}`,
          t('wizard.controlui.title'),
        );
      }
    } else if (hatchChoice === "web") {
      const browserSupport = await detectBrowserOpenSupport();
      if (browserSupport.ok) {
        controlUiOpened = await openUrl(authedUrl);
        if (!controlUiOpened) {
          controlUiOpenHint = formatControlUiSshHint({
            port: settings.port,
            basePath: controlUiBasePath,
            token: settings.gatewayToken,
          });
        }
      } else {
        controlUiOpenHint = formatControlUiSshHint({
          port: settings.port,
          basePath: controlUiBasePath,
          token: settings.gatewayToken,
        });
      }
      await prompter.note(
        [
          `${t('wizard.dashboard.link')}: ${authedUrl}`,
          controlUiOpened
            ? t('wizard.dashboard.opened')
            : t('wizard.dashboard.copyPaste'),
          controlUiOpenHint,
        ]
          .filter(Boolean)
          .join("\n"),
        t('wizard.dashboard.title'),
      );
    } else {
      await prompter.note(
        t('wizard.later.description', { command: formatCliCommand("openclaw dashboard --no-open") }),
        t('wizard.later.title'),
      );
    }
  } else if (opts.skipUi) {
    await prompter.note(t('wizard.skipUi'), t('wizard.controlui.title'));
  }

  await prompter.note(
    t('wizard.workspaceBackup.description'),
    t('wizard.workspaceBackup.title'),
  );

  await prompter.note(
    t('wizard.security.final.desc'),
    t('wizard.security.final.title'),
  );

  const shouldOpenControlUi =
    !opts.skipUi &&
    settings.authMode === "token" &&
    Boolean(settings.gatewayToken) &&
    hatchChoice === null;
  if (shouldOpenControlUi) {
    const browserSupport = await detectBrowserOpenSupport();
    if (browserSupport.ok) {
      controlUiOpened = await openUrl(authedUrl);
      if (!controlUiOpened) {
        controlUiOpenHint = formatControlUiSshHint({
          port: settings.port,
          basePath: controlUiBasePath,
          token: settings.gatewayToken,
        });
      }
    } else {
      controlUiOpenHint = formatControlUiSshHint({
        port: settings.port,
        basePath: controlUiBasePath,
        token: settings.gatewayToken,
      });
    }

    await prompter.note(
      [
        `Dashboard link (with token): ${authedUrl}`,
        controlUiOpened
          ? "Opened in your browser. Keep that tab to control OpenClaw."
          : "Copy/paste this URL in a browser on this machine to control OpenClaw.",
        controlUiOpenHint,
      ]
        .filter(Boolean)
        .join("\n"),
      "Dashboard ready",
    );
  }

  const webSearchKey = (nextConfig.tools?.web?.search?.apiKey ?? "").trim();
  const webSearchEnv = (process.env.BRAVE_API_KEY ?? "").trim();
  const hasWebSearchKey = Boolean(webSearchKey || webSearchEnv);
  await prompter.note(
    hasWebSearchKey
      ? [
          t('wizard.websearch.enabled'),
          "",
          webSearchKey
            ? t('wizard.websearch.apiKeyConfig')
            : t('wizard.websearch.apiKeyEnv'),
          "Docs: https://docs.openclaw.ai/tools/web",
        ].join("\n")
      : t('wizard.websearch.disabled'),
    t('wizard.websearch.title'),
  );

  await prompter.note(
    t('wizard.whatnow.desc'),
    t('wizard.whatnow.title'),
  );

  await prompter.outro(
    controlUiOpened
      ? t('wizard.completion.dashboardOpened')
      : seededInBackground
        ? t('wizard.completion.webUiSeeded')
        : t('wizard.completion.useLink'),
  );
}
