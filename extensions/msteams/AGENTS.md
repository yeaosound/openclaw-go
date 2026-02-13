# extensions/msteams/ Knowledge Base

## OVERVIEW

`extensions/msteams/` is the Microsoft Teams channel plugin package.
It integrates Bot Framework transport, Graph-assisted resolution, polls, attachments, and outbound routing.

## STRUCTURE

- Plugin entry + runtime singleton: `index.ts`, `src/runtime.ts`.
- Channel contract/policy/config wiring: `src/channel.ts`.
- Inbound monitor pipeline: `src/monitor.ts`, `src/monitor-handler*.ts`, `src/inbound.ts`.
- Outbound + context-aware reply routing: `src/send.ts`, `src/send-context.ts`, `src/reply-dispatcher.ts`.
- Identity/allowlist resolution: `src/resolve-allowlist.ts`, `src/token.ts`, `src/graph-chat.ts`.

## WHERE TO LOOK

- DM/group policy behavior and resolver hints: `src/channel.ts`.
- User/team/channel target resolution failures: `src/resolve-allowlist.ts`.
- Conversation mapping persistence: `src/conversation-store*.ts`.
- File consent/attachment flows: `src/file-consent*.ts`, `src/attachments/`.
- Poll behavior: `src/polls.ts`, `src/polls-store*.ts`.

## CONVENTIONS

- Use canonical target forms (`user:<id>`, `conversation:<id>`) for reliable routing.
- Keep runtime initialization through `setMSTeamsRuntime()` in plugin registration.
- Prefer stable IDs over display names (display-name resolution is best effort).
- Keep channel policy logic centralized in `channel.ts`/`policy.ts`.
- Current package has an outlier dependency shape (`openclaw` in dependencies + devDependencies); treat changes carefully to avoid runtime/tooling regressions.

## ANTI-PATTERNS

- Treating display names as durable identifiers.
- Forking allowlist parsing logic across inbound/outbound paths.
- Bypassing conversation store updates when adding new send paths.
- Mixing Bot Framework transport code with unrelated policy decisions in the same function.
