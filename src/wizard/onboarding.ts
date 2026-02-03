import type {
  GatewayAuthChoice,
  OnboardMode,
  OnboardOptions,
  ResetScope,
} from "../commands/onboard-types.js";
import type { OpenClawConfig } from "../config/config.js";
import type { RuntimeEnv } from "../runtime.js";
import type { QuickstartGatewayDefaults, WizardFlow } from "./onboarding.types.js";
import { ensureAuthProfileStore } from "../agents/auth-profiles.js";
import { listChannelPlugins } from "../channels/plugins/index.js";
import { formatCliCommand } from "../cli/command-format.js";
import { installCompletion } from "../cli/completion-cli.js";
import { promptAuthChoiceGrouped } from "../commands/auth-choice-prompt.js";
import {
  applyAuthChoice,
  resolvePreferredProviderForAuthChoice,
  warnIfModelConfigLooksOff,
} from "../commands/auth-choice.js";
import { applyPrimaryModel, promptDefaultModel } from "../commands/model-picker.js";
import { setupChannels } from "../commands/onboard-channels.js";
import {
  applyWizardMetadata,
  DEFAULT_WORKSPACE,
  ensureWorkspaceAndSessions,
  handleReset,
  printWizardHeader,
  probeGatewayReachable,
  summarizeExistingConfig,
} from "../commands/onboard-helpers.js";
import { setupInternalHooks } from "../commands/onboard-hooks.js";
import { promptRemoteGatewayConfig } from "../commands/onboard-remote.js";
import { setupSkills } from "../commands/onboard-skills.js";
import {
  DEFAULT_GATEWAY_PORT,
  readConfigFileSnapshot,
  resolveGatewayPort,
  writeConfigFile,
} from "../config/config.js";
import { logConfigUpdated } from "../config/logging.js";
import {
  getAvailableLocalesWithNames,
  updateLanguageSetting,
  getLanguageSettings,
} from "../i18n/config.js";
import { setLocale, getLocale } from "../i18n/index.js";
import { t } from "../i18n/index.js";
import { defaultRuntime } from "../runtime.js";
import { resolveUserPath } from "../utils.js";
import { finalizeOnboardingWizard } from "./onboarding.finalize.js";
import { configureGatewayForOnboarding } from "./onboarding.gateway-config.js";
import { WizardCancelledError, type WizardPrompter } from "./prompts.js";

async function promptLanguageSelection(
  opts: OnboardOptions,
  prompter: WizardPrompter,
  runtime: RuntimeEnv,
): Promise<string | undefined> {
  // Skip if language was specified via command line (not auto)
  if (opts.lang && opts.lang !== "auto") {
    return opts.lang;
  }

  const currentSettings = await getLanguageSettings();
  const locales = getAvailableLocalesWithNames();

  const selectedLocale = await prompter.select({
    message: t("wizard.language.select"),
    options: locales.map((loc) => ({
      value: loc.code,
      label: `${loc.nativeName} (${loc.name})`,
      hint: loc.code === currentSettings.locale ? t("wizard.language.current") : undefined,
    })),
    initialValue: currentSettings.locale,
  });

  if (selectedLocale !== getLocale()) {
    setLocale(selectedLocale);
    await updateLanguageSetting(selectedLocale);
    runtime.log(t("wizard.language.changed", { locale: selectedLocale }));
  }

  return selectedLocale;
}

async function requireRiskAcknowledgement(params: {
  opts: OnboardOptions;
  prompter: WizardPrompter;
}) {
  if (params.opts.acceptRisk === true) {
    return;
  }

  await params.prompter.note(t("wizard.security.note"), t("wizard.security.title"));

  const ok = await params.prompter.confirm({
    message: t("wizard.security.confirm"),
    initialValue: false,
  });
  if (!ok) {
    throw new WizardCancelledError("risk not accepted");
  }
}

export async function runOnboardingWizard(
  opts: OnboardOptions,
  runtime: RuntimeEnv = defaultRuntime,
  prompter: WizardPrompter,
) {
  printWizardHeader(runtime);

  // Prompt for language selection in interactive mode
  let selectedLang: string | undefined;
  if (!opts.nonInteractive) {
    selectedLang = await promptLanguageSelection(opts, prompter, runtime);
  }

  await prompter.intro(t("wizard.intro.title"));
  await requireRiskAcknowledgement({ opts, prompter });

  const snapshot = await readConfigFileSnapshot();
  let baseConfig: OpenClawConfig = snapshot.valid ? snapshot.config : {};

  if (snapshot.exists && !snapshot.valid) {
    await prompter.note(summarizeExistingConfig(baseConfig), t("wizard.config.invalidTitle"));
    if (snapshot.issues.length > 0) {
      await prompter.note(
        [
          ...snapshot.issues.map((iss) => `- ${iss.path}: ${iss.message}`),
          "",
          "Docs: https://docs.openclaw.ai/gateway/configuration",
        ].join("\n"),
        t("wizard.config.issuesTitle"),
      );
    }
    await prompter.outro(
      t("wizard.config.invalidOutro", { command: formatCliCommand("openclaw doctor") }),
    );
    runtime.exit(1);
    return;
  }

  const quickstartHint = t("wizard.onboarding.quickstartHint", {
    command: formatCliCommand("openclaw configure"),
  });
  const manualHint = t("wizard.onboarding.manualHint");
  const explicitFlowRaw = opts.flow?.trim();
  const normalizedExplicitFlow = explicitFlowRaw === "manual" ? "advanced" : explicitFlowRaw;
  if (
    normalizedExplicitFlow &&
    normalizedExplicitFlow !== "quickstart" &&
    normalizedExplicitFlow !== "advanced"
  ) {
    runtime.error(t("wizard.onboarding.invalidFlow"));
    runtime.exit(1);
    return;
  }
  const explicitFlow: WizardFlow | undefined =
    normalizedExplicitFlow === "quickstart" || normalizedExplicitFlow === "advanced"
      ? normalizedExplicitFlow
      : undefined;
  let flow: WizardFlow =
    explicitFlow ??
    (await prompter.select({
      message: t("wizard.onboarding.mode"),
      options: [
        {
          value: "quickstart",
          label: t("wizard.onboarding.quickstart.label"),
          hint: quickstartHint,
        },
        { value: "advanced", label: t("wizard.onboarding.advanced.label"), hint: manualHint },
      ],
      initialValue: "quickstart",
    }));

  if (opts.mode === "remote" && flow === "quickstart") {
    await prompter.note(
      t("wizard.onboarding.remote.notice"),
      t("wizard.onboarding.quickstart.label"),
    );
    flow = "advanced";
  }

  if (snapshot.exists) {
    await prompter.note(summarizeExistingConfig(baseConfig), t("wizard.config.existing"));

    const action = await prompter.select({
      message: t("wizard.config.action"),
      options: [
        { value: "keep", label: t("wizard.config.action.keep") },
        { value: "modify", label: t("wizard.config.action.modify") },
        { value: "reset", label: t("wizard.config.action.reset") },
      ],
    });

    if (action === "reset") {
      const workspaceDefault = baseConfig.agents?.defaults?.workspace ?? DEFAULT_WORKSPACE;
      const resetScope = (await prompter.select({
        message: t("wizard.config.reset.scope"),
        options: [
          { value: "config", label: t("wizard.config.reset.config") },
          {
            value: "config+creds+sessions",
            label: t("wizard.config.reset.config-creds-sessions"),
          },
          {
            value: "full",
            label: t("wizard.config.reset.full"),
          },
        ],
      })) as ResetScope;
      await handleReset(resetScope, resolveUserPath(workspaceDefault), runtime);
      baseConfig = {};
    }
  }

  const quickstartGateway: QuickstartGatewayDefaults = (() => {
    const hasExisting =
      typeof baseConfig.gateway?.port === "number" ||
      baseConfig.gateway?.bind !== undefined ||
      baseConfig.gateway?.auth?.mode !== undefined ||
      baseConfig.gateway?.auth?.token !== undefined ||
      baseConfig.gateway?.auth?.password !== undefined ||
      baseConfig.gateway?.customBindHost !== undefined ||
      baseConfig.gateway?.tailscale?.mode !== undefined;

    const bindRaw = baseConfig.gateway?.bind;
    const bind =
      bindRaw === "loopback" ||
      bindRaw === "lan" ||
      bindRaw === "auto" ||
      bindRaw === "custom" ||
      bindRaw === "tailnet"
        ? bindRaw
        : "loopback";

    let authMode: GatewayAuthChoice = "token";
    if (
      baseConfig.gateway?.auth?.mode === "token" ||
      baseConfig.gateway?.auth?.mode === "password"
    ) {
      authMode = baseConfig.gateway.auth.mode;
    } else if (baseConfig.gateway?.auth?.token) {
      authMode = "token";
    } else if (baseConfig.gateway?.auth?.password) {
      authMode = "password";
    }

    const tailscaleRaw = baseConfig.gateway?.tailscale?.mode;
    const tailscaleMode =
      tailscaleRaw === "off" || tailscaleRaw === "serve" || tailscaleRaw === "funnel"
        ? tailscaleRaw
        : "off";

    return {
      hasExisting,
      port: resolveGatewayPort(baseConfig),
      bind,
      authMode,
      tailscaleMode,
      token: baseConfig.gateway?.auth?.token,
      password: baseConfig.gateway?.auth?.password,
      customBindHost: baseConfig.gateway?.customBindHost,
      tailscaleResetOnExit: baseConfig.gateway?.tailscale?.resetOnExit ?? false,
    };
  })();

  if (flow === "quickstart") {
    const formatBind = (value: "loopback" | "lan" | "auto" | "custom" | "tailnet") => {
      if (value === "loopback") {
        return t("wizard.gateway.bind.loopback");
      }
      if (value === "lan") {
        return t("wizard.gateway.bind.lan");
      }
      if (value === "custom") {
        return t("wizard.gateway.bind.custom");
      }
      if (value === "tailnet") {
        return t("wizard.gateway.bind.tailnet");
      }
      return t("wizard.gateway.bind.auto");
    };
    const formatAuth = (value: GatewayAuthChoice) => {
      if (value === "token") {
        return t("wizard.gateway.auth.token.default");
      }
      return t("wizard.gateway.auth.password");
    };
    const formatTailscale = (value: "off" | "serve" | "funnel") => {
      if (value === "off") {
        return t("common.off");
      }
      if (value === "serve") {
        return t("wizard.gateway.tailscale.serve");
      }
      return t("wizard.gateway.tailscale.funnel");
    };
    const quickstartLines = quickstartGateway.hasExisting
      ? [
          t("wizard.quickstart.keepingSettings"),
          `${t("wizard.gateway.port")}: ${quickstartGateway.port}`,
          `${t("wizard.gateway.bind")}: ${formatBind(quickstartGateway.bind)}`,
          ...(quickstartGateway.bind === "custom" && quickstartGateway.customBindHost
            ? [`${t("wizard.gateway.customIp")}: ${quickstartGateway.customBindHost}`]
            : []),
          `${t("wizard.gateway.auth")}: ${formatAuth(quickstartGateway.authMode)}`,
          `${t("wizard.gateway.tailscale")}: ${formatTailscale(quickstartGateway.tailscaleMode)}`,
          t("wizard.quickstart.directToChannels"),
        ]
      : [
          `${t("wizard.gateway.port")}: ${DEFAULT_GATEWAY_PORT}`,
          `${t("wizard.gateway.bind")}: ${t("wizard.gateway.bind.loopback")}`,
          `${t("wizard.gateway.auth")}: ${t("wizard.gateway.auth.token.default")}`,
          `${t("wizard.gateway.tailscale")}: ${t("common.off")}`,
          t("wizard.quickstart.directToChannels"),
        ];
    await prompter.note(quickstartLines.join("\n"), t("wizard.quickstart.title"));
  }

  const localPort = resolveGatewayPort(baseConfig);
  const localUrl = `ws://127.0.0.1:${localPort}`;
  const localProbe = await probeGatewayReachable({
    url: localUrl,
    token: baseConfig.gateway?.auth?.token ?? process.env.OPENCLAW_GATEWAY_TOKEN,
    password: baseConfig.gateway?.auth?.password ?? process.env.OPENCLAW_GATEWAY_PASSWORD,
  });
  const remoteUrl = baseConfig.gateway?.remote?.url?.trim() ?? "";
  const remoteProbe = remoteUrl
    ? await probeGatewayReachable({
        url: remoteUrl,
        token: baseConfig.gateway?.remote?.token,
      })
    : null;

  const mode =
    opts.mode ??
    (flow === "quickstart"
      ? "local"
      : ((await prompter.select({
          message: t("wizard.setup.question"),
          options: [
            {
              value: "local",
              label: t("wizard.setup.local"),
              hint: localProbe.ok
                ? `Gateway reachable (${localUrl})`
                : `No gateway detected (${localUrl})`,
            },
            {
              value: "remote",
              label: t("wizard.setup.remote"),
              hint: !remoteUrl
                ? t("wizard.setup.noRemoteUrl")
                : remoteProbe?.ok
                  ? `Gateway reachable (${remoteUrl})`
                  : `Configured but unreachable (${remoteUrl})`,
            },
          ],
        })) as OnboardMode));

  if (mode === "remote") {
    let nextConfig = await promptRemoteGatewayConfig(baseConfig, prompter);
    // Ensure language setting is preserved (may have been set during language prompt)
    if (selectedLang) {
      nextConfig = { ...nextConfig, lang: selectedLang };
    }
    nextConfig = applyWizardMetadata(nextConfig, { command: "onboard", mode });
    await writeConfigFile(nextConfig);
    logConfigUpdated(runtime);
    await prompter.outro(t("wizard.setup.remoteConfigured"));
    return;
  }

  const workspaceInput =
    opts.workspace ??
    (flow === "quickstart"
      ? (baseConfig.agents?.defaults?.workspace ?? DEFAULT_WORKSPACE)
      : await prompter.text({
          message: t("wizard.workspace.prompt"),
          initialValue: baseConfig.agents?.defaults?.workspace ?? DEFAULT_WORKSPACE,
        }));

  const workspaceDir = resolveUserPath(workspaceInput.trim() || DEFAULT_WORKSPACE);

  let nextConfig: OpenClawConfig = {
    ...baseConfig,
    // Preserve language setting from config (may have been set during language prompt)
    lang: selectedLang ?? baseConfig.lang,
    agents: {
      ...baseConfig.agents,
      defaults: {
        ...baseConfig.agents?.defaults,
        workspace: workspaceDir,
      },
    },
    gateway: {
      ...baseConfig.gateway,
      mode: "local",
    },
  };

  const authStore = ensureAuthProfileStore(undefined, {
    allowKeychainPrompt: false,
  });
  const authChoiceFromPrompt = opts.authChoice === undefined;
  const authChoice =
    opts.authChoice ??
    (await promptAuthChoiceGrouped({
      prompter,
      store: authStore,
      includeSkip: true,
    }));

  const authResult = await applyAuthChoice({
    authChoice,
    config: nextConfig,
    prompter,
    runtime,
    setDefaultModel: true,
    opts: {
      tokenProvider: opts.tokenProvider,
      token: opts.authChoice === "apiKey" && opts.token ? opts.token : undefined,
    },
  });
  nextConfig = authResult.config;

  if (authChoiceFromPrompt) {
    const modelSelection = await promptDefaultModel({
      config: nextConfig,
      prompter,
      allowKeep: true,
      ignoreAllowlist: true,
      preferredProvider: resolvePreferredProviderForAuthChoice(authChoice),
    });
    if (modelSelection.model) {
      nextConfig = applyPrimaryModel(nextConfig, modelSelection.model);
    }
  }

  await warnIfModelConfigLooksOff(nextConfig, prompter);

  const gateway = await configureGatewayForOnboarding({
    flow,
    baseConfig,
    nextConfig,
    localPort,
    quickstartGateway,
    prompter,
    runtime,
  });
  nextConfig = gateway.nextConfig;
  const settings = gateway.settings;

  if (opts.skipChannels ?? opts.skipProviders) {
    await prompter.note(t("wizard.channels.skip"), t("wizard.channels.title"));
  } else {
    const quickstartAllowFromChannels =
      flow === "quickstart"
        ? listChannelPlugins()
            .filter((plugin) => plugin.meta.quickstartAllowFrom)
            .map((plugin) => plugin.id)
        : [];
    nextConfig = await setupChannels(nextConfig, runtime, prompter, {
      allowSignalInstall: true,
      forceAllowFromChannels: quickstartAllowFromChannels,
      skipDmPolicyPrompt: flow === "quickstart",
      skipConfirm: flow === "quickstart",
      quickstartDefaults: flow === "quickstart",
    });
  }

  await writeConfigFile(nextConfig);
  logConfigUpdated(runtime);
  await ensureWorkspaceAndSessions(workspaceDir, runtime, {
    skipBootstrap: Boolean(nextConfig.agents?.defaults?.skipBootstrap),
  });

  if (opts.skipSkills) {
    await prompter.note(t("wizard.skills.skip"), t("wizard.skills.title"));
  } else {
    nextConfig = await setupSkills(nextConfig, workspaceDir, runtime, prompter);
  }

  // Setup hooks (session memory on /new)
  nextConfig = await setupInternalHooks(nextConfig, runtime, prompter);

  nextConfig = applyWizardMetadata(nextConfig, { command: "onboard", mode });
  await writeConfigFile(nextConfig);

  await finalizeOnboardingWizard({
    flow,
    opts,
    baseConfig,
    nextConfig,
    workspaceDir,
    settings,
    prompter,
    runtime,
  });

  const installShell = await prompter.confirm({
    message: t("wizard.completion.prompt"),
    initialValue: true,
  });

  if (installShell) {
    const shell = process.env.SHELL?.split("/").pop() || "zsh";
    // We pass 'yes=true' to skip any double-confirmation inside the helper,
    // as the wizard prompt above serves as confirmation.
    await installCompletion(shell, true);
  }
}
