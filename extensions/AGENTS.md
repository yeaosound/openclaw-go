# Extensions

**Purpose:** 32 plugin packages extending OpenClaw with channels, tools, and auth

## STRUCTURE

```
extensions/
├── msteams/                 # Microsoft Teams channel (58 files)
├── matrix/                  # Matrix channel (64 files)
├── discord/                 # Discord channel plugin (3 files)
├── telegram/                # Telegram channel plugin (3 files)
├── voice-call/              # Voice calling (Twilio/Telnyx/Plivo)
├── twitch/                  # Twitch channel
├── nostr/                   # Nostr protocol
├── bluebubbles/             # BlueBubbles iMessage proxy
├── zalo/, zalouser/         # Zalo channels
├── mattermost/              # Mattermost channel
├── memory-lancedb/          # Vector memory with LanceDB
├── llm-task/                # LLM task tools
├── lobster/                 # External subprocess tool
├── google-gemini-cli-auth/  # OAuth for Gemini CLI
└── ... (32 total)
```

## KEY PATTERNS

### Extension package.json
```json
{
  "name": "@openclaw/<name>",
  "openclaw": {
    "extensions": ["./index.ts"],
    "channel": {        // For channel extensions
      "id": "matrix",
      "label": "Matrix",
      "docsPath": "/channels/matrix"
    }
  },
  "dependencies": {     // Runtime deps
    "@microsoft/agents-hosting": "^2.x"
  },
  "devDependencies": {  // Type resolution
    "openclaw": "workspace:*"
  },
  "peerDependencies": {
    "openclaw": ">=2026.1.26"
  }
}
```

### Channel Extension Entry
```typescript
// index.ts
import type { OpenClawPluginApi } from "openclaw/plugin-sdk";

const plugin = {
  id: "msteams",
  name: "Microsoft Teams",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpenClawPluginApi) {
    api.registerChannel({ plugin: msteamsPlugin });
    // Optional: api.registerHttpHandler(handleWebhook);
  }
};
export default plugin;
```

### Tool Extension Entry
```typescript
// index.ts
export default function register(api: OpenClawPluginApi) {
  api.registerTool(
    (ctx) => {
      if (ctx.sandboxed) return null;  // Disable in sandboxes
      return createTool(api);
    },
    { optional: true }  // Requires explicit allowlist
  );
}
```

### Runtime Access Pattern
```typescript
// src/runtime.ts
let runtime: PluginRuntime | null = null;
export function setChannelRuntime(next: PluginRuntime) { runtime = next; }
export function getChannelRuntime(): PluginRuntime {
  if (!runtime) throw new Error("Runtime not initialized");
  return runtime;
}
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add channel extension | `extensions/<name>/` | Copy msteams/matrix pattern |
| Add tool extension | `extensions/<name>/` | Copy lobster/llm-task pattern |
| SDK imports | `openclaw/plugin-sdk` | All SDK exports |
| Channel plugin interface | `src/channels/plugins/types.plugin.ts` | ChannelPlugin definition |
| Extension examples | `extensions/matrix/`, `extensions/msteams/` | Full implementations |

## ANTI-PATTERNS

- `workspace:*` in dependencies - use devDependencies
- Importing from `openclaw` directly - use `openclaw/plugin-sdk`
- No peerDependency version - specify minimum version
- Missing configSchema - always provide schema

## NOTES

- Extensions are workspace packages
- Runtime resolves `openclaw/plugin-sdk` via jiti alias
- Channel extensions implement ChannelPlugin interface
- Tool extensions use factory functions with optional registration
- Install via `openclaw plugins install`
