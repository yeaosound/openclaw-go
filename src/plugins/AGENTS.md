# src/plugins/ Knowledge Base

## Overview

`src/plugins/` is plugin discovery + manifest validation + runtime wiring.
Extensions are workspace packages under `extensions/*`, but core should treat them as untrusted modules loaded via the plugin system.

## Where To Look

- Plugin manifest validation/registry: `src/plugins/manifest.ts`, `src/plugins/manifest-registry.ts`
- Plugin runtime facade for extensions: `src/plugins/runtime/` (notably `src/plugins/runtime/index.ts`)
- Plugin SDK surface (what extensions import): `src/plugin-sdk/index.ts`
- HTTP route registration for plugins: `src/plugins/http-registry.ts`, `src/plugins/http-path.ts`

## Conventions (Deviations Only)

- Extension author API is via `openclaw/plugin-sdk` only.
- The runtime facade (`src/plugins/runtime/`) intentionally centralizes exported capabilities; avoid leaking arbitrary internals.
- Config validation is manifest/schema driven; do not require executing plugin code just to validate config.

## Anti-Patterns

- Importing `extensions/*` from core code.
- Expanding the runtime facade without considering backward compatibility for existing plugins.
- Adding plugin configuration that is not representable in schema (plugins must be configurable without code execution).
