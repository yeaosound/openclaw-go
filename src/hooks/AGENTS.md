# src/hooks/ Knowledge Base

## Overview

`src/hooks/` implements internal hooks (event-driven automation) and the discovery/precedence rules for hook sources.

For hook packaging format details, also read: `src/hooks/bundled/README.md`.

## Where To Look

- Bundled hooks (ship with OpenClaw): `src/hooks/bundled/*` (each has `HOOK.md` + `handler.ts`)
- Hook discovery/management code: `src/hooks/` (hook registry, enable/disable, execution)

## Conventions (Deviations Only)

- Hook structure is fixed:
  - `HOOK.md` has YAML frontmatter + docs.
  - `handler.ts` default export is the handler.
- Hook precedence (highest to lowest): workspace hooks -> managed hooks (~/.openclaw/hooks) -> bundled hooks.

## Anti-Patterns

- Hooks that assume a specific channel/session without checking the event context.
- Hooks that execute tools/commands implicitly without a user request/allowlist.
- Writing files outside the workspace/state dirs without explicit config and audit visibility.
