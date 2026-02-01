# Config Subsystem

**Purpose:** Configuration schemas, validation, and persistence

## STRUCTURE

```
src/config/
├── schema.ts                # JSON Schema generation, UI hints
├── zod-schema.ts            # Main Zod schema
├── zod-schema.providers-*.ts # Provider schemas
├── defaults.ts              # Default configuration values
├── io.ts                    # Config file I/O
├── types*.ts                # TypeScript type definitions
└── legacy.migrations*.ts    # Legacy config migrations
```

## KEY PATTERNS

### Zod Schema Definition
```typescript
import { z } from "zod";

export const OpenClawConfigSchema = z.object({
  gateway: GatewayConfigSchema,
  channels: ChannelsConfigSchema,
  agents: AgentsConfigSchema,
  // ...
});

export type OpenClawConfig = z.infer<typeof OpenClawConfigSchema>;
```

### Schema with UI Hints
```typescript
// schema.ts - generates JSON Schema with UI hints
export function buildOpenClawJsonSchema(): JsonSchema {
  return {
    type: "object",
    properties: {
      gateway: {
        type: "object",
        properties: {
          port: {
            type: "number",
            default: 18789,
            "ui:placeholder": "18789",
            "ui:description": "Port for gateway WebSocket server"
          }
        }
      }
    }
  };
}
```

### Config Resolution
```typescript
// Resolution order (last wins):
// 1. Defaults
// 2. Config file (~/.openclaw/openclaw.json)
// 3. Environment variables (OPENCLAW_*)
// 4. CLI options
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add config option | `src/config/zod-schema.ts` | Add to Zod schema |
| Add UI hint | `src/config/schema.ts` | For wizard display |
| Config types | `src/config/types*.ts` | TypeScript types |
| Config I/O | `src/config/io.ts` | File operations |
| Migrations | `src/config/legacy.migrations*.ts` | Legacy upgrades |

## ANTI-PATTERNS

- No Zod validation - always add schema
- Missing type export - export inferred type
- Hardcoded defaults - use defaults.ts
- Breaking changes without migration - add migration

## NOTES

- Config stored at `~/.openclaw/openclaw.json`
- Zod schemas provide runtime validation
- UI hints guide wizard generation
- Migrations handle legacy config upgrades
- Environment variables override config file
