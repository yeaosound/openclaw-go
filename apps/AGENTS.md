# apps/ Knowledge Base

## Overview

`apps/` contains native clients and shared Swift packages.
These are not pnpm workspace packages; their tooling is platform-native (Gradle/Xcode/SwiftPM).

## Structure

- apps/android/: Android node/client (Kotlin + Compose)
- apps/ios/: iOS app (SwiftUI, XcodeGen)
- apps/macos/: macOS app (SwiftPM + packaging/signing scripts)
- apps/shared/OpenClawKit/: shared Swift packages/resources (OpenClawKit/OpenClawProtocol/OpenClawChatUI)

## Cross-Cutting Contracts

- Gateway protocol types are generated for Swift and must stay in sync with TS:
  - TS schema sources: `src/gateway/protocol/schema/`
  - Generated artifacts checked by: `pnpm protocol:check`

## Where To Look

- Android build/test: apps/android/AGENTS.md
- iOS generation/signing/test: apps/ios/AGENTS.md
- macOS packaging/signing/dev loop: apps/macos/AGENTS.md
- Shared Swift packages + resources: apps/shared/OpenClawKit/AGENTS.md
