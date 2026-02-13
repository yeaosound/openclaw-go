# docs/ Knowledge Base

## OVERVIEW

`docs/` is the Mintlify documentation source tree for OpenClaw.
This file only covers docs-local workflow and i18n mechanics.

## STRUCTURE

- `docs/docs.json`: site config, nav groups, redirects, topbar links, theme metadata.
- `docs/start/`, `docs/providers/`, `docs/platforms/`, `docs/nodes/`: primary product docs.
- `docs/reference/templates/`: runtime prompt templates (BOOT/HEARTBEAT contracts matter operationally).
- `docs/.i18n/`: translation glossary + translation memory cache.
- `docs/zh-CN/`: localized mirror (has its own child AGENTS file).

## WHERE TO LOOK

- Add/move nav pages: `docs/docs.json` (navigation + redirects must be updated together).
- Edit onboarding/setup copy: `docs/start/`.
- Update provider/channel instructions: `docs/providers/`, `docs/channels/`.
- Edit template semantics consumed by runtime: `docs/reference/templates/BOOT.md`, `docs/reference/templates/HEARTBEAT.md`.
- i18n glossary or TM behavior: `docs/.i18n/glossary.zh-CN.json`, `docs/.i18n/*.tm.jsonl`, `scripts/docs-i18n/`.

## CONVENTIONS

- Mintlify config lives in `docs/docs.json` (not `package.json`, not `mint.json`).
- Keep path slugs stable; if a page path changes, add a redirect in `docs/docs.json`.
- Frontmatter should stay concise and actionable (`read_when`, `summary`, `title` where used).
- Template docs under `docs/reference/templates/` are behavioral contracts, not marketing copy.
- Keep CLI commands/examples copy-pasteable; prefer `openclaw ...` over pseudo commands.

## ANTI-PATTERNS

- Changing docs paths without adding redirects.
- Treating translation memory files as source-of-truth prose.
- Updating template docs without checking runtime implications.
- Duplicating the same long guidance in both English and zh-CN manually when scripts can sync.
