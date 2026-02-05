# apps/ios/ Knowledge Base

## Overview

iOS app is SwiftUI-based and uses XcodeGen to generate the Xcode project. Lint/format are enforced via SwiftLint/SwiftFormat.

## Commands

From repo root:
- Generate project: `pnpm ios:gen`
- Build: `pnpm ios:build`
- Run (sim): `pnpm ios:run`

Directly:
- `cd apps/ios && xcodegen generate`
- Then use Xcode or `xcodebuild` on `OpenClaw.xcodeproj`.

## Conventions / Gotchas

- Xcode project is generated (do not hand-edit a checked-in .xcodeproj).
- SwiftLint/SwiftFormat configs are repo-scoped; failures block builds in CI.
- Fastlane expects secrets/env in `apps/ios/fastlane/` via a local `.env` (gitignored; created locally).
