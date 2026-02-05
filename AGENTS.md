# OpenClaw Go Knowledge Base

Generated: 2026-02-05T00:53:57+08:00
Branch: main
Commit: bcb13cab7

## Overview

OpenClaw Go is an optimized fork of OpenClaw: a TypeScript/Node (ESM) gateway that connects messaging channels (WhatsApp/Telegram/Discord/Slack/Signal/iMessage/etc.) to a unified agent runtime, with a local Web control UI and native companion apps.

Origin (this fork): https://github.com/yeaosound/openclaw-go
Upstream: https://github.com/openclaw/openclaw
Official docs index: https://docs.openclaw.ai/llms.txt

## Structure

openclaw-go/
- src/                     Core runtime (gateway, agents, channels, plugins, security, etc.)
- extensions/              Workspace plugin packages (channels/tools/auth)
- ui/                      Web control UI (Vite + Lit)
- apps/                    Native apps (android/ios/macos) + shared Swift packages
- packages/                Compatibility shims (clawdbot, moltbot)
- scripts/                 Build/dev/test/packaging automation
- docs/                    Mintlify docs content
- dist/                    Compiled output (often present in-repo)

## Where To Look

Task -> Start here
- Add/modify gateway protocol -> src/gateway/protocol/ (schemas), scripts/protocol-gen*.ts
- Add/modify gateway server behavior -> src/gateway/
- Add a tool / tool policy -> src/agents/ (tools/, tool-policy.ts)
- Add a channel capability (generic) -> src/channels/
- Add a channel plugin (extension) -> extensions/ (and extensions/AGENTS.md)
- Plugin SDK surface area -> src/plugin-sdk/index.ts
- Plugin runtime loading/validation -> src/plugins/
- Security audit / hardening -> src/security/
- Memory indexing/search -> src/memory/
- Web control UI -> ui/
- Native apps + signing/build -> apps/

Key AGENTS.md guides (start here):
- src/AGENTS.md
- src/gateway/AGENTS.md
- src/agents/AGENTS.md
- src/channels/AGENTS.md
- extensions/AGENTS.md
- ui/AGENTS.md
- apps/AGENTS.md

More focused guides:
- src/commands/AGENTS.md, src/config/AGENTS.md
- src/security/AGENTS.md, src/memory/AGENTS.md
- src/plugins/AGENTS.md, src/hooks/AGENTS.md, src/infra/AGENTS.md
- src/i18n/AGENTS.md, packages/AGENTS.md

## Project Conventions (Deviations Only)

- ESM everywhere; TypeScript source imports use `.js` extensions in import specifiers (NodeNext semantics).
- Formatting/linting uses Ox tools (oxfmt/oxlint), not Prettier/ESLint.
- Tests are colocated `*.test.ts`; `pnpm test` runs multiple Vitest suites via `scripts/test-parallel.mjs`.
- Extensions should import from `openclaw/plugin-sdk` (not `openclaw` internals).
- UI build outputs to `dist/control-ui` (configured in ui/vite.config.ts).

## Anti-Patterns (This Repo)

- `as any` / `@ts-ignore` in runtime code.
- Editing `dist/` by hand (treat as build output unless explicitly doing a release artifact update).
- `workspace:*` in `extensions/*` runtime `dependencies` (keep `openclaw` in devDependencies/peerDependencies).
- Staging the entire repo with `git add .` for a focused change; use `scripts/committer` with explicit paths.

## Commands

- Dev: `pnpm dev`, `pnpm openclaw`, `pnpm gateway:watch`
- Build: `pnpm build`, `pnpm ui:build`
- Test: `pnpm test`, `pnpm test:e2e`, `pnpm test:coverage`, `pnpm test:ui`
- Lint/format: `pnpm lint`, `pnpm format`, `pnpm lint:fix`, `pnpm format:fix`
- Protocol sync: `pnpm protocol:check`
- macOS app dev/package: `bash scripts/restart-mac.sh`, `bash scripts/package-mac-app.sh`

## Notes / Gotchas

- Runtime requirement: Node >= 22.12 (see package.json engines). CI also exercises Bun lanes.
- CLI bootstrap is layered: openclaw.mjs -> dist/entry.js (source: src/entry.ts) -> src/cli/run-main.ts.
- Local state/config defaults live under `~/.openclaw/` (config, sessions, credentials, logs).
