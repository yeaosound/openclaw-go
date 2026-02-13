# src/cli/ Knowledge Base

## OVERVIEW

`src/cli/` is command routing + Commander registration glue.
This subtree has two startup paths: route-first fast path and full Commander parsing.

## STRUCTURE

- Fast path: `src/cli/route.ts` + routed commands from `program/command-registry.ts`.
- Main entry: `src/cli/run-main.ts`.
- Program builder: `src/cli/program/build-program.ts`.
- Command registration tables: `src/cli/program/command-registry.ts`, `register.*.ts`, `register.subclis.ts`.

## WHERE TO LOOK

- Add a hot-path command that should bypass full program init:
  - Add a route in `src/cli/program/command-registry.ts`
  - Ensure it is safe for `tryRouteCli()` in `src/cli/route.ts`
- Debug lazy subcommand registration: `src/cli/program/register.subclis.ts`.
- Startup/argv normalization bugs: `src/cli/run-main.ts` and `src/cli/argv.ts`.
- Plugin CLI registration side effects: `run-main.ts` + `register.subclis.ts` (`plugins`/`pairing` entries).

## CONVENTIONS

- Respect env toggles:
  - `OPENCLAW_DISABLE_ROUTE_FIRST`
  - `OPENCLAW_DISABLE_LAZY_SUBCOMMANDS`
- Route-first code must keep imports light and avoid expensive side effects.
- Commands that need config/plugin context should pass through `ensureConfigReady` and plugin-loading gates.
- Keep CLI output stable and script-friendly for automation flows.

## ANTI-PATTERNS

- Registering a command only in Commander path when it also needs fast-path parity.
- Adding heavy plugin/config work into code paths that should remain route-first cheap.
- Silent behavior differences between lazy and eager subcommand registration.
- Mutating argv semantics in multiple places without centralizing in `argv.ts`/`run-main.ts`.
