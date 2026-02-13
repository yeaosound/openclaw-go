# extensions/matrix/ Knowledge Base

## OVERVIEW

`extensions/matrix/` is the Matrix channel plugin package.
It owns Matrix-specific config, monitoring, target resolution, and outbound delivery.

## STRUCTURE

- Plugin entry + runtime injection: `index.ts`, `src/runtime.ts`.
- Channel contract implementation: `src/channel.ts`.
- Matrix core modules: `src/matrix/` (`client/`, `monitor/`, `send/`, `actions/`).
- Config + onboarding: `src/config-schema.ts`, `src/onboarding.ts`.

## WHERE TO LOOK

- Channel metadata/pairing/security policies: `src/channel.ts`.
- Sender/room normalization and allowlist behavior: `src/matrix/monitor/allowlist.ts`.
- Outbound target parsing and message send logic: `src/matrix/send/targets.ts`, `src/matrix/send.ts`.
- Runtime client creation/auth errors: `src/matrix/client.ts`, `src/matrix/client/create-client.ts`.
- CLI/directory resolution behavior: `src/resolve-targets.ts`, `src/directory-live.ts`.

## CONVENTIONS

- Extension boundary import is `openclaw/plugin-sdk`.
- Keep runtime singleton initialization via `setMatrixRuntime()` before channel registration.
- Preserve canonical ID forms (`user:`, room IDs/aliases) and lowercase normalization where implemented.
- Keep policy defaults explicit in channel plugin metadata instead of scattering across helpers.

## ANTI-PATTERNS

- Directly importing OpenClaw core internals instead of SDK surfaces.
- Re-implementing target parsing in multiple files.
- Bypassing monitor/send helper layers with raw SDK calls in unrelated modules.
- Storing account secrets/tokens outside the channel config resolution path.
