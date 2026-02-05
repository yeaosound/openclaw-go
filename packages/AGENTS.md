# packages/ Knowledge Base

## Overview

`packages/` contains compatibility shims that forward legacy CLIs to OpenClaw.
These packages are intentionally small and should stay boring.

## Packages

- `packages/clawdbot`: legacy `clawdbot` CLI shim -> forwards to `openclaw`
- `packages/moltbot`: legacy `moltbot` CLI shim -> forwards to `openclaw`

## Conventions / Gotchas

- These shims depend on `openclaw` via `workspace:*`.
- The `bin/*` entrypoints may be produced/packaged during publish or postinstall; avoid changing behavior here unless you are also updating install tooling.
