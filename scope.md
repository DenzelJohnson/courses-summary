# Project Scope — Courses Summary

> Single source of truth for this project's moving parts and dependencies. Update this file in
> the same change that alters any item below. Mark unconfirmed dependencies `UNVERIFIED`.

_Last updated: 2026-09-11 by Codex_

## 1. Overview

This repository will contain a Next.js course-summary interface and its tool-neutral project
memory. The main page will expose course navigation for 2Z03, 2GA3, and 3BB4; each course will
contain Syllabus, Lectures, and Notes sections. Section content is intentionally empty initially.

## 2. Tech Stack

- Language/runtime: TypeScript 7.0.2 on Node.js
- Framework: Next.js 16.3.5 with the App Router and React 19.3.0
- Styling: CSS maintained in the repository
- Hosting/deploy target: Not selected
- Testing/package management: Vitest 5.0.0, Testing Library, and npm with `package-lock.json`

## 3. Code Modules

| Module/path | Responsibility | Reads | Writes |
|---|---|---|---|
| `src/lib/navigation.ts` | Course/section values, validation, labels, and URLs | Search parameters | Resolved selection and link URLs |
| `src/app/page.tsx` | Resolve selection and compose the route | Search parameters and navigation contract | Rendered page |
| `src/components/course-header.tsx` | Compose identity and both navigation levels | Resolved selection and navigation contract | Tab-link props |
| `src/components/tab-navigation.tsx` | Render accessible navigation links | Tab-link props | Semantic navigation markup |
| `src/components/empty-section.tsx` | Stable blank content landmark | None | Empty `main` landmark |
| `src/app/globals.css` | Desktop/mobile visual hierarchy | Component class names and active attributes | Presentation |
| `src/**/*.test.ts(x)` | Verify navigation and header behavior | Public module/component behavior | Test evidence |
| `next.config.ts` | Anchor Next.js workspace discovery to this repository | Current working directory | Turbopack root configuration |

## 4. Databases

None.

## 5. Spreadsheets

None.

## 6. External Services, Web Apps, and Accounts

None.

## 7. Automations

No project automations or scheduled tasks were found in the empty repository. The user has not
identified an external automation that reads or writes project contracts.

## 8. Dependency Map

- Course/section navigation contract -> produced by `src/lib/navigation.ts`; consumed by
  `src/app/page.tsx`, `src/components/course-header.tsx`, both tab rows, and automated tests.
- Search parameter selection -> produced by the browser URL; consumed by `resolveSelection`; the
  resolved values produce active states and all navigation URLs.
- Component class/attribute names -> produced by React components; consumed by `globals.css`.
- Turbopack workspace root -> produced by `next.config.ts`; consumed by `next dev` and `next build` so unrelated parent lockfiles are ignored.
- Project operating memory -> governed by `AGENTS.md` and indexed by `docs/ai/INDEX.md`.
- No automation or external service reads or writes these contracts.

## 9. Known Fragilities / UNVERIFIED

- Deployment target and hosting conventions are not selected because deployment is out of scope.
- No historical code or external project memory was present to reconcile as of 2026-09-11.
