import { installSkill } from "../agents/skills-install.js";
import { buildWorkspaceSkillStatus } from "../agents/skills-status.js";
import { formatCliCommand } from "../cli/command-format.js";
import type { OpenClawConfig } from "../config/config.js";
import type { RuntimeEnv } from "../runtime.js";
import type { WizardPrompter } from "../wizard/prompts.js";
import { detectBinary, resolveNodeManagerOptions } from "./onboard-helpers.js";
import { t } from "../i18n/index.js";

function summarizeInstallFailure(message: string): string | undefined {
  const cleaned = message.replace(/^Install failed(?:\s*\([^)]*\))?\s*:?\s*/i, "").trim();
  if (!cleaned) {
    return undefined;
  }
  const maxLen = 140;
  return cleaned.length > maxLen ? `${cleaned.slice(0, maxLen - 1)}…` : cleaned;
}

function formatSkillHint(skill: {
  description?: string;
  install: Array<{ label: string }>;
}): string {
  const desc = skill.description?.trim();
  const installLabel = skill.install[0]?.label?.trim();
  const combined = desc && installLabel ? `${desc} — ${installLabel}` : desc || installLabel;
  if (!combined) {
    return t('wizard.skills.defaultHint');
  }
  const maxLen = 90;
  return combined.length > maxLen ? `${combined.slice(0, maxLen - 1)}…` : combined;
}

function upsertSkillEntry(
  cfg: OpenClawConfig,
  skillKey: string,
  patch: { apiKey?: string },
): OpenClawConfig {
  const entries = { ...cfg.skills?.entries };
  const existing = (entries[skillKey] as { apiKey?: string } | undefined) ?? {};
  entries[skillKey] = { ...existing, ...patch };
  return {
    ...cfg,
    skills: {
      ...cfg.skills,
      entries,
    },
  };
}

export async function setupSkills(
  cfg: OpenClawConfig,
  workspaceDir: string,
  runtime: RuntimeEnv,
  prompter: WizardPrompter,
): Promise<OpenClawConfig> {
  const report = buildWorkspaceSkillStatus(workspaceDir, { config: cfg });
  const eligible = report.skills.filter((s) => s.eligible);
  const missing = report.skills.filter((s) => !s.eligible && !s.disabled && !s.blockedByAllowlist);
  const blocked = report.skills.filter((s) => s.blockedByAllowlist);

  const needsBrewPrompt =
    process.platform !== "win32" &&
    report.skills.some((skill) => skill.install.some((option) => option.kind === "brew")) &&
    !(await detectBinary("brew"));

  await prompter.note(
    [
      `${t('wizard.skills.status.eligible')}: ${eligible.length}`,
      `${t('wizard.skills.status.missing')}: ${missing.length}`,
      `${t('wizard.skills.status.blocked')}: ${blocked.length}`,
    ].join("\n"),
    t('wizard.skills.status.title'),
  );

  const shouldConfigure = await prompter.confirm({
    message: t('wizard.skills.configurePrompt'),
    initialValue: true,
  });
  if (!shouldConfigure) {
    return cfg;
  }

  if (needsBrewPrompt) {
    await prompter.note(
      t('wizard.skills.homebrew.desc'),
      t('wizard.skills.homebrew.title'),
    );
    const showBrewInstall = await prompter.confirm({
      message: t('wizard.skills.homebrew.showCommand'),
      initialValue: true,
    });
    if (showBrewInstall) {
      await prompter.note(
        [
          t('wizard.skills.homebrew.run'),
          '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
        ].join("\n"),
        t('wizard.skills.homebrew.installTitle'),
      );
    }
  }

  const nodeManager = (await prompter.select({
    message: t('wizard.skills.nodeManagerPrompt'),
    options: resolveNodeManagerOptions(),
  })) as "npm" | "pnpm" | "bun";

  let next: OpenClawConfig = {
    ...cfg,
    skills: {
      ...cfg.skills,
      install: {
        ...cfg.skills?.install,
        nodeManager,
      },
    },
  };

  const installable = missing.filter(
    (skill) => skill.install.length > 0 && skill.missing.bins.length > 0,
  );
  if (installable.length > 0) {
    const toInstall = await prompter.multiselect({
      message: t('wizard.skills.installPrompt'),
      options: [
        {
          value: "__skip__",
          label: t('common.skipForNow'),
          hint: t('wizard.skills.skipHint'),
        },
        ...installable.map((skill) => ({
          value: skill.name,
          label: `${skill.emoji ?? "🧩"} ${skill.name}`,
          hint: formatSkillHint(skill),
        })),
      ],
    });

    const selected = toInstall.filter((name) => name !== "__skip__");
    for (const name of selected) {
      const target = installable.find((s) => s.name === name);
      if (!target || target.install.length === 0) {
        continue;
      }
      const installId = target.install[0]?.id;
      if (!installId) {
        continue;
      }
      const spin = prompter.progress(t('wizard.skills.installing', { name }));
      const result = await installSkill({
        workspaceDir,
        skillName: target.name,
        installId,
        config: next,
      });
      if (result.ok) {
        spin.stop(t('wizard.skills.installed', { name }));
      } else {
        const code = result.code == null ? "" : ` (exit ${result.code})`;
        const detail = summarizeInstallFailure(result.message);
        spin.stop(t('wizard.skills.installFailed', { name }) + `${code}${detail ? ` — ${detail}` : ""}`);
        if (result.stderr) {
          runtime.log(result.stderr.trim());
        } else if (result.stdout) {
          runtime.log(result.stdout.trim());
        }
        runtime.log(
          t('wizard.skills.doctorTip'),
        );
        runtime.log(t('wizard.skills.docs'));
      }
    }
  }

  for (const skill of missing) {
    if (!skill.primaryEnv || skill.missing.env.length === 0) {
      continue;
    }
    const wantsKey = await prompter.confirm({
      message: t('wizard.skills.envPrompt', { skill: skill.name, env: skill.primaryEnv }),
      initialValue: false,
    });
    if (!wantsKey) {
      continue;
    }
    const apiKey = String(
      await prompter.text({
        message: t('wizard.skills.envInput', { env: skill.primaryEnv }),
        validate: (value) => (value?.trim() ? undefined : t('common.required')),
      }),
    );
    next = upsertSkillEntry(next, skill.skillKey, { apiKey: apiKey.trim() });
  }

  return next;
}
