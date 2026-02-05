# ui/ Knowledge Base

## Overview

`ui/` is the Web control panel.
Stack: Vite + TypeScript + Lit (custom elements), Vitest (browser mode) with Playwright.

## Entry Points

- HTML shell: `ui/index.html`
- Bootstrap: `ui/src/main.ts` (init i18n, import the app)
- Root component: `ui/src/ui/app.ts` (`<openclaw-app>`, no Shadow DOM)
- Rendering switchboard: `ui/src/ui/app-render.ts`

## State + Data Flow

- State is stored directly on the LitElement instance via `@state()` fields.
- Controllers mutate the host state in place: `ui/src/ui/controllers/*`.
- Settings persist to `localStorage` key: `openclaw.control.settings.v1` (`ui/src/ui/storage.ts`).
- Gateway transport is WebSocket-based: `ui/src/ui/gateway.ts` and `ui/src/ui/app-gateway.ts`.

## i18n

- i18next-based, initialized before app import: `ui/src/i18n/*`.
- Language is cached in `localStorage` key: `openclaw-language`.

## Build/Test

- Dev: `pnpm ui:dev` (wrapper) or `pnpm --dir ui dev`
- Build: `pnpm ui:build` (outputs to `dist/control-ui`)
- Test: `pnpm test:ui` or `pnpm --dir ui test` (Vitest + Playwright)

## Anti-Patterns

- Introducing React-style state containers; the UI is intentionally Lit + local reactive state.
- Adding Shadow DOM without auditing CSS assumptions (app currently renders into light DOM).
- Hardcoding gateway URLs/tokens; route through settings + query-param ingestion.
