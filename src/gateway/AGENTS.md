# Gateway Subsystem

**Purpose:** WebSocket control plane for sessions, channels, and client communication

## STRUCTURE

```
src/gateway/
├── server.impl.ts           # Gateway server implementation
├── server/
│   └── ws-connection/
│       └── message-handler.ts   # WebSocket message dispatch
├── openresponses-http.ts    # HTTP API responses
├── session-utils.ts         # Session utilities
├── protocol/
│   ├── schema/
│   │   ├── types.ts         # Protocol type definitions
│   │   ├── primitives.ts    # Base schema primitives
│   │   └── *.ts             # Domain-specific schemas
│   └── protocol.ts          # Protocol exports
└── ...
```

## KEY PATTERNS

### WebSocket Message Handler

Central dispatch for gateway protocol messages:

```typescript
// src/gateway/server/ws-connection/message-handler.ts
export async function handleGatewayMessage(
  connection: GatewayConnection,
  message: GatewayMessage,
): Promise<void> {
  switch (message.type) {
    case "connect":
      await handleConnect(connection, message.payload);
      break;
    case "invoke":
      await handleInvoke(connection, message.payload);
      break;
    // ... more handlers
  }
}
```

### Protocol Schema Conventions

```typescript
// Export both schema and inferred type
export const ConnectParamsSchema = Type.Object({ ... });
export type ConnectParams = Static<typeof ConnectParamsSchema>;

// Use primitives for reusable validation
export const NonEmptyString = Type.String({ minLength: 1 });
```

### Gateway Message Types

- `connect` - Client connection handshake
- `invoke` - Tool/method invocation
- `subscribe` - Event subscription
- `ping`/`pong` - Keepalive
- `disconnect` - Graceful disconnect

## WHERE TO LOOK

| Task                  | Location                                              | Notes                          |
| --------------------- | ----------------------------------------------------- | ------------------------------ |
| Add protocol message  | `src/gateway/protocol/schema/`                        | Add to appropriate domain file |
| Message dispatch      | `src/gateway/server/ws-connection/message-handler.ts` | Handle new message types       |
| HTTP responses        | `src/gateway/openresponses-http.ts`                   | OpenAI-compatible HTTP API     |
| Session utilities     | `src/gateway/session-utils.ts`                        | Session key helpers            |
| Server implementation | `src/gateway/server.impl.ts`                          | Core server logic              |

## ANTI-PATTERNS

- Adding messages without schemas - all messages need TypeBox schemas
- Breaking protocol compatibility - version negotiation required
- Direct socket access - use GatewayConnection abstraction
- Synchronous handlers - always async for I/O

## NOTES

- Protocol is versioned for compatibility
- Messages are JSON with TypeBox validation
- Server supports multiple simultaneous connections
- Uses WebSocket for real-time, HTTP for OpenAI-compatible API
- Connection state managed per-client
