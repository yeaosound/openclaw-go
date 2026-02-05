# apps/android/ Knowledge Base

## Overview

Android app is a Kotlin/Compose "node" client that connects to the gateway, provides device capabilities, and renders chat/canvas UI.

## Commands

From repo root:
- Build: `pnpm android:assemble`
- Install: `pnpm android:install`
- Run: `pnpm android:run`
- Unit tests: `pnpm android:test`

Directly:
- `cd apps/android && ./gradlew :app:assembleDebug`
- `cd apps/android && ./gradlew :app:testDebugUnitTest`

## Conventions / Gotchas

- Lint and Kotlin warnings are treated as errors.
- Android assets include resources from `apps/shared/OpenClawKit/Sources/OpenClawKit/Resources/` (shared across platforms).
- SDK location may default to `~/Library/Android/sdk` if env vars are unset.
