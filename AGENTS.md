# OpenClaw Repository Knowledge Base

## OVERVIEW

OpenClaw Go is a TypeScript/Node ESM gateway plus extension workspace plus native clients.
This fork tracks upstream OpenClaw while adding multi-language support and local customizations.

Execution entry flow (important when debugging startup behavior):
- `openclaw.mjs` -> `dist/entry.js` (source `src/entry.ts`) -> `src/cli/run-main.ts`
- Route-first fast path in `src/cli/route.ts` can execute before full Commander registration.

Hierarchy rule for this knowledge base:
- Root file: global contracts only.
- Child `AGENTS.md`: delta-only local rules for that subtree.

## STRUCTURE

- `src/` core runtime (CLI, gateway, agents, channels, plugin runtime, security)
- `extensions/` workspace plugin packages (channels/tools/auth/providers)
- `apps/` native clients (android/ios/macos) and shared Swift packages
- `ui/` browser Control UI (Vite + Lit)
- `scripts/` build/test/release/protocol/native automation
- `docs/` Mintlify docs content + zh-CN mirror + templates
- `skills/` bundled runtime skills

High-signal child guides:
- `src/AGENTS.md`, `extensions/AGENTS.md`, `apps/AGENTS.md`, `ui/AGENTS.md`, `packages/AGENTS.md`
- `src/cli/AGENTS.md`, `src/telegram/AGENTS.md`
- `scripts/AGENTS.md`, `skills/AGENTS.md`
- `docs/AGENTS.md`, `docs/zh-CN/AGENTS.md`
- `apps/macos/Sources/AGENTS.md`
- `extensions/matrix/AGENTS.md`, `extensions/msteams/AGENTS.md`

## WHERE TO LOOK

Task to starting points:
- Gateway protocol change -> `src/gateway/protocol/schema/`, `scripts/protocol-gen.ts`, `scripts/protocol-gen-swift.ts`
- CLI startup/routing issue -> `src/cli/run-main.ts`, `src/cli/route.ts`, `src/cli/program/`
- Telegram behavior/threading -> `src/telegram/bot.ts`, `src/telegram/bot-handlers.ts`, `src/telegram/send.ts`, `src/telegram/targets.ts`
- Plugin loading/validation -> `src/plugins/`, `src/plugin-sdk/`, `extensions/*/openclaw.plugin.json`
- Matrix or Teams channel plugin logic -> `extensions/matrix/`, `extensions/msteams/`
- macOS app packaging/signing -> `scripts/restart-mac.sh`, `scripts/package-mac-app.sh`, `scripts/codesign-mac-app.sh`, `apps/macos/`
- Docs nav/redirect/i18n behavior -> `docs/docs.json`, `docs/.i18n/`, `docs/zh-CN/`

## CONVENTIONS

Repo-local deviations that are easy to miss:
- TypeScript is ESM with NodeNext semantics; keep `.js` import specifiers inside `.ts`.
- Lint/format uses Ox tools (`oxlint`, `oxfmt`) instead of ESLint/Prettier.
- Tests are mostly colocated `*.test.ts`; aggregate test entry is `scripts/test-parallel.mjs`.
- Extensions should import `openclaw/plugin-sdk` as the stable API boundary.
- Docs site config is `docs/docs.json` (Mintlify). zh-CN docs carry `x-i18n` metadata.
- BOOT template contract: if startup action sends a message, return `NO_REPLY` (`docs/reference/templates/BOOT.md`).
- HEARTBEAT template contract: empty/comment-only file means skip heartbeat API calls (`docs/reference/templates/HEARTBEAT.md`).
- Swift protocol model files are generated from TS schema and must stay synced via `pnpm protocol:check`.

## ANTI-PATTERNS

- Editing generated artifacts by hand:
  - `dist/protocol.schema.json`
  - `apps/macos/Sources/OpenClawProtocol/GatewayModels.swift`
  - `apps/shared/OpenClawKit/Sources/OpenClawProtocol/GatewayModels.swift`
- Assuming only Commander path exists; route-first may bypass command registration.
- Mixing core internals into extension public API instead of `openclaw/plugin-sdk`.
- Broad, unfocused staging (`git add .`) for narrow changes.
- Treating `dist/` as source of truth during normal development.

## COMMANDS

Core workflows:
- Dev: `pnpm dev`, `pnpm openclaw`, `pnpm gateway:watch`
- Build: `pnpm build`, `pnpm ui:build`
- Test: `pnpm test`, `pnpm test:e2e`, `pnpm test:coverage`, `pnpm test:ui`
- Lint/format: `pnpm lint`, `pnpm format`, `pnpm lint:fix`, `pnpm format:fix`
- Docs: `pnpm docs:dev`, `pnpm docs:build`
- Protocol sync check: `pnpm protocol:check`
- macOS dev/package: `bash scripts/restart-mac.sh`, `bash scripts/package-mac-app.sh`
