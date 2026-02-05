# apps/shared/OpenClawKit/ Knowledge Base

## Overview

This is the shared Swift package set used by iOS and macOS (and indirectly by Android via shared resources).
It also carries generated gateway protocol models used by native clients.

## Commands

- Build: `cd apps/shared/OpenClawKit && swift build`
- Test: `cd apps/shared/OpenClawKit && swift test`

## Protocol Sync

- Swift protocol models are checked by `pnpm protocol:check`.
- The generated Swift file lives under both:
  - `apps/shared/OpenClawKit/Sources/OpenClawProtocol/GatewayModels.swift`
  - `apps/macos/Sources/OpenClawProtocol/GatewayModels.swift`

If you change TS protocol schemas under `src/gateway/protocol/schema/`, run `pnpm protocol:check` and commit the generated artifacts.

## Resources

- Resources under `apps/shared/OpenClawKit/Sources/OpenClawKit/Resources/` are also consumed by Android (wired as an assets directory in Gradle).
