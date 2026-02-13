# src/telegram/ Knowledge Base

## OVERVIEW

`src/telegram/` contains Telegram channel transport, bot update handling, target parsing, delivery formatting, and retry/error policy logic.
This area is threading/topic and dedupe sensitive.

## STRUCTURE

- Bot lifecycle + middleware: `bot.ts`.
- Update handlers and batching: `bot-handlers.ts`, `bot-updates.ts`.
- Outbound send/edit/reaction logic: `send.ts`.
- Target parsing/normalization: `targets.ts`.
- Thread helper contracts: `bot/helpers.ts`.

## WHERE TO LOOK

- Duplicate or replayed updates: dedupe in `bot.ts` + `bot-updates.ts`.
- Forum topic/thread bugs: `getTelegramSequentialKey()` in `bot.ts`, thread params in `send.ts`.
- Callback query behavior: `bot-handlers.ts` callback handlers + inline button scope checks.
- Wrong recipient parsing: `parseTelegramTarget()` and `stripTelegramInternalPrefixes()` in `targets.ts`.
- Parse-mode fallback/formatting issues: `send.ts`, `format.ts`, `caption.ts`.

## CONVENTIONS

- Preserve thread context when sending:
  - `message_thread_id` for forum topics
  - `reply_parameters`/`reply_to_message_id` when replying
- Always normalize internal target prefixes through `targets.ts`; do not ad-hoc parse chat IDs.
- Route Telegram API calls through existing retry + error logging wrappers (`withTelegramApiErrorLogging`, retry runner).
- Keep sequentialization key logic aligned with update types to avoid cross-chat blocking.
- Keep dedupe + offset handling conservative (skip older updates, process new once).

## ANTI-PATTERNS

- Dropping thread params in fallback code paths.
- Adding new update handlers without dedupe/ordering considerations.
- Bypassing shared send helpers and constructing raw Bot API calls inline.
- Treating usernames/chat IDs/topic IDs as interchangeable formats.
