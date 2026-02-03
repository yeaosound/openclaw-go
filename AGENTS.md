# OpenClaw Knowledge Base

**Generated:** 2026-02-01
**Project:** OpenClaw - Personal AI Assistant Gateway
**Repository:** https://github.com/openclaw/openclaw

## OVERVIEW

OpenClaw is a personal AI assistant gateway that connects to multiple messaging channels (WhatsApp, Telegram, Discord, Slack, Signal, iMessage, etc.) and provides a unified interface for AI agent interactions. Built with TypeScript/Node.js in a pnpm workspace monorepo structure.

**Core Stack:** TypeScript 5.9, Node 22+, ESM, Vitest, TypeBox, Commander.js, Pi Agent Core

## STRUCTURE

```
openclaw/
├── src/                    # Main TypeScript source
│   ├── agents/            # Agent runtime, tools, Pi integration
│   ├── gateway/           # WebSocket control plane, protocol
│   ├── channels/          # Channel abstractions, shared infrastructure
│   ├── telegram/          # Telegram Bot API integration
│   ├── discord/           # Discord.js integration
│   ├── slack/             # Slack Bolt integration
│   ├── signal/            # Signal CLI integration
│   ├── imessage/          # macOS iMessage integration
│   ├── web/               # WhatsApp Web (Baileys)
│   ├── line/              # LINE Messaging API
│   ├── cli/               # CLI framework, commands
│   ├── commands/          # CLI command implementations
│   ├── config/            # Configuration, Zod schemas
│   ├── infra/             # Infrastructure, runners, state
│   ├── routing/           # Session routing, bindings
│   ├── sessions/          # Session management
│   ├── plugins/           # Plugin system, registry
│   ├── security/          # Audit, permissions
│   ├── memory/            # Vector memory, embeddings
│   └── ...
├── extensions/            # 32 extension packages (channels, tools, auth)
├── apps/                  # Mobile/desktop apps (Android, iOS, macOS)
├── packages/              # Internal packages (clawdbot, moltbot)
├── ui/                    # Web UI (Vite)
├── skills/                # Skill templates (markdown-based)
├── docs/                  # Mintlify documentation
└── scripts/               # Build/dev automation
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new channel | `extensions/` or `src/<channel>/` | Copy existing extension pattern |
| Channel plugin API | `src/channels/plugins/types.plugin.ts` | ChannelPlugin interface |
| Tool development | `src/agents/tools/` + `src/plugin-sdk/` | Tool factory patterns |
| CLI commands | `src/commands/` | Commander-based |
| Gateway protocol | `src/gateway/protocol/` | WebSocket message types |
| Configuration | `src/config/` | Zod schemas, validation |
| Session routing | `src/routing/` | Session keys, bindings |
| Security audit | `src/security/` | Audit, allowlists |
| Tests | Colocated `*.test.ts` | Vitest framework |

## CONVENTIONS

### File Organization
- **kebab-case** for all source files
- Colocated tests: `*.test.ts` alongside source
- E2E tests: `*.e2e.test.ts`
- Barrel files: `index.ts` with `export * from "./file.js"`

### Import/Export
- ESM only with `.js` extensions even for TypeScript
- Named exports preferred
- Type imports: `import type { X } from "./x.js"`

### TypeBox Schemas
- **NEVER** use `Type.Union([Type.Object(...)])` - rejected by OpenAI/Vertex
- Use `stringEnum()` helper for enums
- Flatten action-based schemas with discriminator field
- Always add descriptions for LLM tool definitions

### Error Handling
- Custom Error classes extending Error
- Type guards: `isXxxError(err): err is XxxError`
- Pattern: `err instanceof Error ? err.message : String(err)`

### Naming
- Classes: PascalCase
- Types/Interfaces: PascalCase
- Functions/Variables: camelCase
- Constants: UPPER_SNAKE_CASE

### Tool Development
- Tool factories receive context, return `AnyAgentTool[]`
- Use `readStringParam()`, `readNumberParam()` helpers
- Return results via `jsonResult()` or `imageResult()`
- Tool names: lowercase with underscores

## ANTI-PATTERNS

- `as any` or `@ts-ignore` - strictly forbidden
- `Type.Union([Type.Object(...)])` in TypeBox - use flattened schemas
- `workspace:*` in extension dependencies - use devDependencies
- Empty catch blocks - always handle errors
- Files >700 LOC - split/refactor when feasible
- Manual `git add`/`git commit` - use `scripts/committer`

## UNIQUE STYLES

### Respawn Entry Pattern
`src/entry.ts` respawns itself to inject `--disable-warning=ExperimentalWarning` before loading CLI

### Plugin SDK Resolution
Extensions resolve `openclaw/plugin-sdk` via jiti alias at runtime, avoiding circular workspace deps

### Session Key Format
`agent:{agentId}:{channel}:{accountId}:{peerKind}:{peerId}`

### Channel Plugin Architecture
All channels implement `ChannelPlugin` interface with standardized adapters (config, setup, gateway, security, outbound)

### DM Policy System
Standardized policies: `pairing` (default), `allowlist`, `open`, `disabled`

## COMMANDS

```bash
# Development
pnpm dev                    # Run with auto-reload
pnpm openclaw              # Run CLI in dev mode
pnpm gateway:watch         # Gateway dev with watch

# Build & Test
pnpm build                 # Full TypeScript build
pnpm test                  # Run parallel test suites
pnpm test:unit             # Unit tests only
pnpm test:e2e              # E2E tests
pnpm test:coverage         # Coverage report

# Lint/Format
pnpm lint                  # Run oxlint (type-aware)
pnpm lint:fix              # Auto-fix lint + format
pnpm format                # Check formatting
pnpm format:fix            # Write formatting fixes

# Platform-specific
pnpm mac:package           # Package macOS app
pnpm ios:run               # Build and run iOS
pnpm android:run           # Build and run Android
```

## NOTES

- Runtime: Node 22+ or Bun (both supported)
- Package manager: pnpm 10.23.0 (enforced in CI)
- Test framework: Vitest v4 with V8 coverage (70% threshold)
- Linting: Oxlint + Oxfmt (not ESLint/Prettier)
- Build output: `dist/` directory
- Config location: `~/.openclaw/openclaw.json`
- Session storage: `~/.openclaw/sessions/`
- Credentials: `~/.openclaw/credentials/`

## KEY SUBSYSTEMS

| Subsystem | Location | Description |
|-----------|----------|-------------|
| Agent Runtime | `src/agents/` | Pi integration, tool execution, policies |
| Gateway | `src/gateway/` | WebSocket control plane, protocol |
| Channels | `src/channels/` + extensions/ | Messaging channel plugins |
| CLI | `src/cli/` + `src/commands/` | Command framework, wizards |
| Config | `src/config/` | Zod schemas, validation |
| Routing | `src/routing/` | Session keys, agent bindings |
| Plugins | `src/plugins/` | Plugin registry, loading |
| Security | `src/security/` | Audit, execution approvals |
| Memory | `src/memory/` | Vector search, embeddings |
| Extensions | `extensions/*` | 32 workspace packages |

## TESTING

- Unit tests: Colocated `*.test.ts` files
- E2E tests: `*.e2e.test.ts` suffix
- Live tests: Require API keys (`OPENCLAW_LIVE_TEST=1`)
- Docker tests: `pnpm test:docker:*` for integration
- Coverage: 70% threshold (lines, functions, branches, statements)

## DOCUMENTATION

- User docs: https://docs.openclaw.ai (Mintlify)
- Architecture: See docs/concepts/architecture
- Channels: See docs/channels/
- Configuration: See docs/gateway/configuration
