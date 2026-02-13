# scripts/ Knowledge Base

## OVERVIEW

`scripts/` contains operational automation for build, test, release, protocol generation, docs i18n, and native app packaging/signing.
Use these scripts instead of ad-hoc one-off commands when a script already exists.

## STRUCTURE

- Protocol generation: `scripts/protocol-gen.ts`, `scripts/protocol-gen-swift.ts`.
- macOS packaging/signing: `scripts/restart-mac.sh`, `scripts/package-mac-app.sh`, `scripts/codesign-mac-app.sh`.
- docs i18n pipeline: `scripts/docs-i18n/*.go`.
- E2E/docker flows: `scripts/e2e/*.sh`, `scripts/docker/**`.
- Build/test helpers: `scripts/test-parallel.mjs`, `scripts/ui.js`, `scripts/bundle-a2ui.sh`.

## WHERE TO LOOK

- Protocol drift check failures: `scripts/protocol-gen.ts`, `scripts/protocol-gen-swift.ts`, then run `pnpm protocol:check`.
- macOS local restart issues: `scripts/restart-mac.sh`.
- Sparkle/signing/team-id failures: `scripts/package-mac-app.sh`, `scripts/codesign-mac-app.sh`.
- Docs translation batching: `scripts/docs-i18n/main.go`.
- install/onboard Docker regressions: `scripts/test-install-sh-*.sh`, `scripts/e2e/*.sh`.

## CONVENTIONS

- Scripts are expected to run from repo root unless they explicitly `cd`.
- Keep env toggles documented in the script help/output (especially signing/security toggles).
- Generated outputs should be produced by scripts, not manual file edits.
- Prefer deterministic, non-interactive flags for CI-safe execution.
- For mac packaging, use script toggles (`SKIP_TSC`, `SKIP_UI_BUILD`, signing vars) instead of editing script logic for local runs.

## ANTI-PATTERNS

- Hand-editing generated protocol artifacts instead of running generators.
- Introducing hidden side effects (writing outside repo/home without clear need).
- Duplicating an existing script flow in a new script with slightly different flags.
- Hardcoding local absolute paths or machine-specific credentials.
