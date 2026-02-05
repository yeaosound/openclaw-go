# src/security/ Knowledge Base

## Overview

`src/security/` implements security hardening and the security audit surface. It is the first stop for:
- "Can this be exploited?" questions
- gateway exposure checks
- config/state filesystem permission checks
- protections against prompt-injection / external content hazards

## Where To Look

- Security audit report generation: `src/security/audit.ts`
- Extra audit checks and finding collectors: `src/security/audit-extra.ts`
- External content safety rules: `src/security/external-content.ts`
- Windows ACL inspection helpers: `src/security/windows-acl.ts`

## Conventions (Deviations Only)

- Keep external/untrusted content out of system/tool prompts by default; sanitize before interpolating.
- Prefer explicit "finding" objects (id/severity/detail/remediation) over ad-hoc logging.
- Audit logic should be deterministic and testable (dependency injection hooks are common).

## Anti-Patterns

- Treating external content as instructions (see `src/security/external-content.ts`).
- Adding new audit checks that call the network by default; gate deep probes behind an option.
- Swallowing errors in audit checks; surface them as findings with remediation guidance.
