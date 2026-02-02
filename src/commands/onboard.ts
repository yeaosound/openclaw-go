import { readConfigFileSnapshot } from "../config/config.js";
import { assertSupportedRuntime } from "../infra/runtime-guard.js";
import {
  updateLanguageSetting,
  getAvailableLocalesWithNames,
} from "../i18n/config.js";
import { setLocale, getLocale, isAvailableLocale } from "../i18n/index.js";
import type { RuntimeEnv } from "../runtime.js";
import { defaultRuntime } from "../runtime.js";
import { resolveUserPath } from "../utils.js";
import { DEFAULT_WORKSPACE, handleReset } from "./onboard-helpers.js";
import { runInteractiveOnboarding } from "./onboard-interactive.js";
import { runNonInteractiveOnboarding } from "./onboard-non-interactive.js";
import { formatCliCommand } from "../cli/command-format.js";
import type { OnboardOptions } from "./onboard-types.js";

async function handleLanguageOption(
  opts: OnboardOptions,
  runtime: RuntimeEnv,
): Promise<void> {
  // Skip if lang is not specified or set to auto
  if (!opts.lang || opts.lang === "auto") {
    return;
  }

  // Validate and apply the specified language
  if (isAvailableLocale(opts.lang)) {
    if (getLocale() !== opts.lang) {
      setLocale(opts.lang);
      await updateLanguageSetting(opts.lang);
    }
  } else {
    const available = getAvailableLocalesWithNames()
      .map((l) => `${l.code} (${l.nativeName})`)
      .join(", ");
    runtime.error(
      `Invalid language "${opts.lang}". Available locales: ${available}`,
    );
    runtime.exit(1);
  }
}

export async function onboardCommand(
  opts: OnboardOptions,
  runtime: RuntimeEnv = defaultRuntime,
) {
  assertSupportedRuntime(runtime);

  // Handle language option early, before any UI is shown
  await handleLanguageOption(opts, runtime);

  const authChoice =
    opts.authChoice === "oauth" ? ("setup-token" as const) : opts.authChoice;
  const normalizedAuthChoice =
    authChoice === "claude-cli"
      ? ("setup-token" as const)
      : authChoice === "codex-cli"
        ? ("openai-codex" as const)
        : authChoice;
  if (opts.nonInteractive && (authChoice === "claude-cli" || authChoice === "codex-cli")) {
    runtime.error(
      [
        `Auth choice "${authChoice}" is deprecated.`,
        'Use "--auth-choice token" (Anthropic setup-token) or "--auth-choice openai-codex".',
      ].join("\n"),
    );
    runtime.exit(1);
    return;
  }
  if (authChoice === "claude-cli") {
    runtime.log('Auth choice "claude-cli" is deprecated; using setup-token flow instead.');
  }
  if (authChoice === "codex-cli") {
    runtime.log('Auth choice "codex-cli" is deprecated; using OpenAI Codex OAuth instead.');
  }
  const flow = opts.flow === "manual" ? ("advanced" as const) : opts.flow;
  const normalizedOpts =
    normalizedAuthChoice === opts.authChoice && flow === opts.flow
      ? opts
      : { ...opts, authChoice: normalizedAuthChoice, flow };

  if (normalizedOpts.nonInteractive && normalizedOpts.acceptRisk !== true) {
    runtime.error(
      [
        "Non-interactive onboarding requires explicit risk acknowledgement.",
        "Read: https://docs.openclaw.ai/security",
        `Re-run with: ${formatCliCommand("openclaw onboard --non-interactive --accept-risk ...")}`,
      ].join("\n"),
    );
    runtime.exit(1);
    return;
  }

  if (normalizedOpts.reset) {
    const snapshot = await readConfigFileSnapshot();
    const baseConfig = snapshot.valid ? snapshot.config : {};
    const workspaceDefault =
      normalizedOpts.workspace ?? baseConfig.agents?.defaults?.workspace ?? DEFAULT_WORKSPACE;
    await handleReset("full", resolveUserPath(workspaceDefault), runtime);
  }

  if (process.platform === "win32") {
    runtime.log(
      [
        "Windows detected.",
        "WSL2 is strongly recommended; native Windows is untested and more problematic.",
        "Guide: https://docs.openclaw.ai/windows",
      ].join("\n"),
    );
  }

  if (normalizedOpts.nonInteractive) {
    await runNonInteractiveOnboarding(normalizedOpts, runtime);
    return;
  }

  await runInteractiveOnboarding(normalizedOpts, runtime);
}

export type { OnboardOptions } from "./onboard-types.js";
