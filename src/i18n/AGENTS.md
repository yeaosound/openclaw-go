# src/i18n/ Knowledge Base

## Overview

`src/i18n/` provides backend/CLI localization for this fork. It includes:
- locale packs under `src/i18n/locales/` (e.g. `src/i18n/locales/en/`)
- extraction/build tooling under `src/i18n/scripts/`

## Where To Look

- Runtime i18n API: `src/i18n/index.ts`, `src/i18n/config.ts`
- Locale content: `src/i18n/locales/`
- Key extraction/build scripts: `src/i18n/scripts/`

## Conventions (Deviations Only)

- Treat locale packs as source-controlled artifacts; keep key names stable.
- If changing user-facing CLI strings, update all supported locales (or add explicit fallback behavior).

## Anti-Patterns

- Duplicating message keys across namespaces when a shared key exists.
- Ad-hoc string literals in CLI flows where translation is expected.
