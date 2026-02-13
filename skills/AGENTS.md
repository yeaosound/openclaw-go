# skills/ Knowledge Base

## OVERVIEW

`skills/` hosts bundled skills consumed by the agent runtime.
This file focuses on skill authoring/runtime contracts, not generic docs guidance.

## STRUCTURE

- One directory per skill, usually containing `SKILL.md` (+ optional `scripts/`, `references/`, assets).
- Utility authoring kit: `skills/skill-creator/`.
- Runtime loading logic lives outside this tree in `src/agents/skills/`.

## WHERE TO LOOK

- Skill load/merge precedence: `src/agents/skills/workspace.ts`.
- Frontmatter metadata parsing: `src/agents/skills/frontmatter.ts`.
- Invocation policy fields: `user-invocable`, `disable-model-invocation` frontmatter keys.
- Metadata JSON parsing behavior: `metadata` frontmatter (JSON5 parsed).

## CONVENTIONS

- Each usable skill folder must include `SKILL.md`.
- Keep skill names stable; runtime merges skills by skill name.
- Metadata in frontmatter should be valid JSON5 and minimal (`primaryEnv`, `requires`, `install` only when needed).
- Skill scripts should be optional helpers, not mandatory for the model to understand the skill.
- Keep examples realistic and safe to run in constrained environments.

## ANTI-PATTERNS

- Shipping large binaries/assets in skill folders without clear runtime need.
- Encoding environment-specific secrets directly in `SKILL.md`.
- Relying on non-portable shell assumptions without documenting requirements.
- Duplicating near-identical skills instead of parameterizing one skill.
