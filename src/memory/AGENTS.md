# src/memory/ Knowledge Base

## Overview

`src/memory/` implements local-first memory indexing + search over workspace files and session transcripts.
It blends keyword search (FTS/BM25) with vector search (sqlite-vec), and supports multiple embedding providers.

## Where To Look

- Main orchestrator/state machine: `src/memory/manager.ts` (`MemoryIndexManager`)
- Provider selection + clients: `src/memory/embeddings.ts`, `src/memory/embeddings-openai.ts`, `src/memory/embeddings-gemini.ts`
- Hybrid ranking/merge: `src/memory/hybrid.ts`
- SQLite schema + vec wiring: `src/memory/memory-schema.ts`, `src/memory/sqlite-vec.ts`, `src/memory/sqlite.ts`
- Batch embedding flows: `src/memory/batch-openai.ts`, `src/memory/batch-gemini.ts`

## Conventions (Deviations Only)

- Separate "index maintenance" (watchers, chunking, schema) from provider-specific embedding IO.
- Keep snippet and chunk-size limits explicit (used to control token/cost and UI display size).

## Anti-Patterns

- Mixing network IO, filesystem walking, and ranking logic in one unit (it becomes untestable).
- Changing chunking/ranking behavior without updating both unit tests and any UI assumptions about snippet size.
