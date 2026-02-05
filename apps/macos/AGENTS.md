# apps/macos/ Knowledge Base

## Overview

macOS app is built with SwiftPM but packaged/signed via repo scripts.
This area is signing- and env-heavy; prefer using the scripts unless you are working on pure Swift code.

## Commands

- Fast dev loop: `bash scripts/restart-mac.sh`
- Package app: `bash scripts/package-mac-app.sh`
- SwiftPM build: `cd apps/macos && swift build --product OpenClaw`
- SwiftPM tests: `cd apps/macos && swift test`

## Signing / Packaging Notes

- Packaging writes an app bundle under `dist/` (e.g. `OpenClaw.app`; generated, not committed).
- Signing identity selection and Team ID checks are enforced by scripts.
- Environment toggles exist for dev workflows (ad-hoc signing, timestamps, validation); keep them documented in the scripts.
