# src/infra/ Knowledge Base

## Overview

`src/infra/` is operational plumbing: runners/loops, outbound delivery, state migrations, approvals plumbing, and "long-lived" utilities used across gateway + channels.

This directory is a hotspot for security and reliability changes.

## Where To Look

- Execution approvals plumbing: `src/infra/exec-approvals.ts`
- Heartbeats (periodic polling / keepalives): `src/infra/heartbeat-runner.ts`
- Outbound delivery/session buffering: `src/infra/outbound/`
- Updates/upgrades: `src/infra/update-runner.ts`, `src/cli/update-cli.ts`
- State migrations: `src/infra/state-migrations.ts`
- Process/network helpers: `src/infra/exec*.ts`, `src/infra/ports*.ts`, `src/infra/bonjour-discovery.ts`

## Conventions (Deviations Only)

- Many modules here are used by both CLI and long-running gateway processes; keep side effects explicit and injectable for tests.
- Prefer pure "decision" helpers separated from IO (fs/network/spawn).

## Anti-Patterns

- Silent fallbacks that reduce security posture (approvals/allowlists) without a clear audit trail.
- Hidden global state (mutable singletons) unless there is an explicit lifecycle owner.
- Hardcoded ports/paths (use config resolvers in `src/config/paths.ts`).
