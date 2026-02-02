# Agents Subsystem

**Purpose:** Pi agent runtime, tool execution, and session management

## STRUCTURE

```
src/agents/
├── pi-tools.ts              # Main tool factory integrating Pi coding tools
├── openclaw-tools.ts        # OpenClaw-specific tools (browser, canvas, sessions)
├── pi-embedded-runner.ts    # Pi agent runtime exports
├── agent-scope.ts           # Agent identity resolution
├── tool-policy.ts           # Tool permission profiles
├── bash-tools.exec.ts       # Bash execution with sandboxing
├── pi-tool-definition-adapter.ts  # Pi tool format adapter
├── schema/
│   └── typebox.ts           # TypeBox helpers (stringEnum, etc.)
├── tools/
│   ├── common.ts            # Tool utilities (readStringParam, jsonResult)
│   ├── browser-tool.ts      # Browser control tool
│   ├── canvas-tool.ts       # Canvas/A2UI tool
│   ├── cron-tool.ts         # Cron job management
│   ├── gateway-tool.ts      # Gateway control tool
│   ├── nodes-tool.ts        # Device node tools
│   ├── sessions-*.ts        # Session management tools
│   └── *-actions.ts         # Channel-specific actions
└── pi-embedded-runner/
    └── run/                 # Pi agent execution
        └── attempt.ts       # Execution attempt orchestration
```

## KEY PATTERNS

### Tool Factory Pattern
```typescript
export function createOpenClawTools(options?: {...}): AnyAgentTool[] {
  const tools: AnyAgentTool[] = [
    createBrowserTool({...}),
    createCanvasTool(),
    // ...
  ];
  const pluginTools = resolvePluginTools({...});
  return [...tools, ...pluginTools];
}
```

### Tool Structure
```typescript
{
  label: "Display Name",
  name: "tool_name",           // lowercase with underscores
  description: "Detailed description for LLM",
  parameters: TypeBoxSchema,
  execute: async (toolCallId, args, signal, onUpdate) => {
    const params = args as Record<string, unknown>;
    const value = readStringParam(params, "key", { required: true });
    return jsonResult({ status: "ok", result });
  }
}
```

### Tool Policy System
- Profiles: `minimal`, `coding`, `messaging`, `full`
- Groups: `group:fs`, `group:runtime`, `group:sessions`, `group:ui`
- Resolution: global → agent → group → sandbox → subagent

### TypeBox Schema Conventions
- **NEVER** use `Type.Union([Type.Object(...)])` - rejected by OpenAI/Vertex
- Use `stringEnum()` helper for enums: `action: stringEnum(["start", "stop"])`
- Flatten action-based schemas with discriminator field
- Always add descriptions for LLM tool definitions

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new tool | `src/agents/tools/` | Copy existing tool pattern |
| Tool schema helpers | `src/agents/schema/typebox.ts` | stringEnum, channelTargetSchema |
| Tool utilities | `src/agents/tools/common.ts` | readStringParam, jsonResult |
| Tool policies | `src/agents/tool-policy.ts` | Profile and group definitions |
| Pi integration | `src/agents/pi-*.ts` | Pi agent runtime adapters |
| Plugin tools | `src/plugins/tools.ts` | Plugin tool resolution |

## ANTI-PATTERNS

- Using `Type.Union` for tool schemas - use flattened objects
- Casting args directly - use `readStringParam()` helpers
- Forgetting tool descriptions - required for LLM understanding
- Hardcoding tool names - use constants from policy

## NOTES

- Tools are validated at runtime via TypeBox schemas
- Plugin tools integrate via `resolvePluginTools()`
- Tool execution is sandboxed per session policy
- Results use `jsonResult()` or `imageResult()` helpers
- Tool names must be lowercase with underscores
