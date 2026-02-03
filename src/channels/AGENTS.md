# Channels Subsystem

**Purpose:** Messaging channel abstractions and shared infrastructure

## STRUCTURE

```
src/channels/
├── plugins/
│   ├── types.plugin.ts      # ChannelPlugin interface
│   ├── types.adapters.ts    # Adapter interfaces
│   ├── types.core.ts        # Core types (capabilities, etc.)
│   ├── catalog.ts           # Plugin discovery
│   ├── config-writes.ts     # Config persistence
│   ├── pairing.ts           # DM pairing system
│   └── onboarding/          # Onboarding adapters
├── registry.ts              # Channel registry
├── chat-type.ts             # Chat type normalization
├── mention-gating.ts        # Mention requirement handling
├── command-gating.ts        # Command authorization
├── session.ts               # Session recording
└── allowlists/              # Allowlist utilities
```

## KEY PATTERNS

### ChannelPlugin Interface
All channels implement this interface:
```typescript
export type ChannelPlugin<ResolvedAccount> = {
  id: ChannelId;
  meta: ChannelMeta;
  capabilities: ChannelCapabilities;
  config: ChannelConfigAdapter<ResolvedAccount>;
  setup?: ChannelSetupAdapter;
  pairing?: ChannelPairingAdapter;
  security?: ChannelSecurityAdapter<ResolvedAccount>;
  groups?: ChannelGroupAdapter;
  outbound?: ChannelOutboundAdapter;
  gateway?: ChannelGatewayAdapter<ResolvedAccount>;
};
```

### Account Resolution Pattern
```typescript
// Pattern: listAccountIds → resolveAccount → ResolvedAccount
export function listXAccountIds(cfg: OpenClawConfig): string[]
export function resolveXAccount(params: {...}): ResolvedXAccount
```

### DM Policy System
Standardized policies:
- `pairing` (default) - Requires approval code
- `allowlist` - Only allowlisted senders
- `open` - Any sender allowed
- `disabled` - All DMs blocked

### Message Context Building
```typescript
// 1. Resolve routing
const route = resolveAgentRoute({ cfg, channel, accountId, peer });
// 2. Access control check
const allowed = isSenderAllowed({ allow: effectiveAllow, senderId });
// 3. Group/DM policy enforcement
// 4. Mention gating for groups
// 5. Build inbound envelope
// 6. Record session for reply routing
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add channel plugin | `src/channels/plugins/types.plugin.ts` | Implement ChannelPlugin |
| Onboarding adapter | `src/channels/plugins/onboarding/` | CLI wizard integration |
| DM policies | `src/channels/plugins/pairing.ts` | Pairing code system |
| Mention gating | `src/channels/mention-gating.ts` | Group mention requirements |
| Allowlists | `src/channels/allowlists/` | ID normalization |
| Channel registry | `src/channels/registry.ts` | Channel metadata |

## ANTI-PATTERNS

- Bypassing allowlist checks - always check isSenderAllowed
- Hardcoding channel IDs - use ChannelId type
- Ignoring DM policies - respect pairing/allowlist settings
- Missing account resolution - follow list/resolve pattern

## NOTES

- All channels use consistent account resolution
- DM policies are enforced at context build time
- Mention gating works across all group-capable channels
- Allowlists support multiple ID formats per channel
- Onboarding adapters provide CLI wizard integration
