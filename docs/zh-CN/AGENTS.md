# docs/zh-CN/ Knowledge Base

## OVERVIEW

`docs/zh-CN/` is the Simplified Chinese localization subtree.
Inherit global docs workflow from `docs/AGENTS.md`; this file is zh-CN delta only.

## STRUCTURE

- Mirrors English docs layout (`start/`, `providers/`, `platforms/`, etc.).
- Most files include `x-i18n` metadata with source traceability.

## WHERE TO LOOK

- Source page mapping: `docs/<path>.md` -> `docs/zh-CN/<path>.md`.
- Translation metadata shape: any zh-CN page frontmatter `x-i18n` block.
- Term consistency: `docs/.i18n/glossary.zh-CN.json`.
- Translation pipeline entry: `scripts/docs-i18n/main.go`.

## CONVENTIONS

- Preserve `x-i18n` fields (`source_path`, `source_hash`, workflow/model metadata) when updating translated pages.
- Keep command snippets, flags, JSON keys, and code identifiers untranslated.
- Keep doc slugs/anchors aligned with upstream English structure unless a redirect is explicitly added.
- Prefer glossary-consistent terminology across all zh-CN pages.
- If manually patching a translated page, avoid rewriting the entire file; keep diffs minimal.

## ANTI-PATTERNS

- Deleting `x-i18n` provenance metadata.
- Translating code blocks or command names.
- Diverging meaning from English source for operational/security instructions.
- Editing only zh-CN for a behavior change that should first land in English source docs.
