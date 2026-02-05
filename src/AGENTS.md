# src/ Knowledge Base

## Overview

`src/` is the core OpenClaw runtime: CLI wiring, gateway server, agents/tools, channel abstractions, plugin runtime, security, memory, and cross-cutting infrastructure.

Read subsystem guides first (they intentionally go deeper than this file):
- src/agents/AGENTS.md
- src/channels/AGENTS.md
- src/commands/AGENTS.md
- src/config/AGENTS.md
- src/gateway/AGENTS.md

## Structure (High Signal Only)

- src/entry.ts: CLI bootstrap/respawn; ultimately loads the CLI runner.
- src/index.ts: package entry (exports + CLI when run as main module).
- src/cli/: Commander program, registrars, routing fast-path.
- src/gateway/: WebSocket control plane + HTTP surfaces + protocol.
- src/agents/: tool system, sandboxing, policies, Pi integration.
- src/channels/: ChannelPlugin contracts + shared enforcement (pairing/allowlists/gating).
- src/plugins/: plugin discovery, manifest validation, runtime API for extensions.
- src/plugin-sdk/: the only stable import surface for extensions (`openclaw/plugin-sdk`).
- src/security/: audits + hardening utilities.
- src/memory/: indexing/search (sqlite + sqlite-vec + providers).
- src/infra/: long-running runners and shared operational plumbing.
- src/hooks/: internal hook system (bundled + user-managed + workspace hooks).

## Where To Look

- Add a new CLI command: src/commands/ + src/cli/program/register.*.ts
- Add a new gateway WS message: src/gateway/protocol/schema/ + gateway message handler
- Add a new tool: src/agents/tools/ (and tool policies in src/agents/tool-policy.ts)
- Add a new plugin capability: src/plugins/runtime/ (public-ish runtime facade)
- Add new plugin author API: src/plugin-sdk/index.ts (re-export from internal types/helpers)
- Add a new security check: src/security/audit*.ts (and surface it via CLI doctor/audit flows)
- Memory search behavior: src/memory/manager.ts + src/memory/embeddings*.ts + src/memory/hybrid.ts

## Conventions (Deviations Only)

- TypeScript is compiled as ESM; keep `.js` extensions in import specifiers inside `.ts`.
- Prefer subsystem boundaries over ad-hoc imports:
  - Extensions import `openclaw/plugin-sdk`.
  - Core code avoids importing extension packages directly.

## Anti-Patterns

- Leaking plugin-only APIs into core (or vice-versa). If something is for extensions, it belongs behind `src/plugin-sdk/` + runtime injection.
- Pulling heavyweight plugin registries into shared hot paths; keep plugin lookup at execution boundaries.
- Adding more giant "god" files; split by domain (protocol vs dispatch, IO vs decision logic).
