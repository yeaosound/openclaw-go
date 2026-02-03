# Commands Subsystem

**Purpose:** CLI command implementations and user-facing operations

## STRUCTURE

```
src/commands/
├── agent.ts                 # Agent command
├── onboard.ts               # Onboarding wizard entry
├── onboard-*.ts             # Onboarding helpers
├── status*.ts               # Status commands
├── doctor*.ts               # Doctor/diagnostics
├── channels*.ts             # Channel management
├── configure*.ts            # Configuration
├── health.ts                # Health checks
└── ...
```

## KEY PATTERNS

### Command Registration

Commands register via registry in `src/cli/program/register.*.ts`:

```typescript
export const agentCommand: CommandRegistration = {
  id: "agent",
  register({ program, context }) {
    program
      .command("agent")
      .description("Run agent")
      .option("-m, --message <msg>", "Message")
      .action(async (options) => {
        // Implementation
      });
  },
};
```

### CLI Option Conventions

- kebab-case: `--gateway-port`, `--non-interactive`
- Boolean negation: `--no-install-daemon`
- Enum docs: `quickstart|advanced|manual`

### Progress Display

```typescript
import { withProgress } from "../cli/progress.js";

await withProgress(async (progress) => {
  progress.setLabel("Setting up...");
  await doWork();
  progress.setPercent(100);
});
```

### Table Output

```typescript
import { renderTable } from "../terminal/table.js";

renderTable({
  columns: [
    { header: "Name", key: "name" },
    { header: "Status", key: "status", align: "center" },
  ],
  rows: data,
});
```

## WHERE TO LOOK

| Task            | Location                                          | Notes                     |
| --------------- | ------------------------------------------------- | ------------------------- |
| Add command     | `src/commands/` + `src/cli/program/register.*.ts` | Register in registry      |
| Onboarding flow | `src/commands/onboard*.ts`                        | Wizard implementation     |
| Status display  | `src/commands/status*.ts`                         | System status             |
| Health checks   | `src/commands/health.ts`                          | Gateway health            |
| Diagnostics     | `src/commands/doctor*.ts`                         | Troubleshooting           |
| CLI utilities   | `src/cli/`                                        | Progress, tables, theming |

## ANTI-PATTERNS

- Direct console.log - use themed output
- Hardcoded colors - use theme object
- Ignoring non-interactive mode - check hasExplicitOptions
- Blocking without progress - always show progress for long ops

## NOTES

- Commands are registered centrally in CLI program
- Use `withProgress()` for long-running operations
- Themed output via `src/terminal/theme.ts`
- Tables via `renderTable()` for consistent formatting
- Respect `NO_COLOR` and non-TTY environments
