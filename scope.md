# Project Scope — Courses Summary

> Single source of truth for this project's moving parts and dependencies. Update this file in
> the same change that alters any item below. Mark unconfirmed dependencies `UNVERIFIED`.

_Last updated: 2026-09-11 by Codex_

## 1. Overview

This repository contains a Next.js course-summary interface and its tool-neutral project memory.
The main page exposes course navigation for 2Z03, 2GA3, and 3BB4; each course contains Syllabus,
Lectures, and Notes. The 2Z03 Syllabus contains a persisted grade calculator, while the other
eight content selections remain empty.

## 2. Tech Stack

- Language/runtime: TypeScript 7.0.2 on Node.js
- Framework: Next.js 16.3.5 with the App Router and React 19.3.0
- Styling: CSS maintained in the repository
- Hosting/deploy target: GitHub Pages static export through GitHub Actions
- Testing/package management: Vitest 5.0.0, Testing Library, and npm with `package-lock.json`

## 3. Code Modules

| Module/path | Responsibility | Reads | Writes |
|---|---|---|---|
| `src/lib/navigation.ts` | Course/section values, validation, labels, and URLs | Search parameters | Resolved selection and link URLs |
| `src/app/page.tsx` | Render the static route shell | Course shell | Rendered page |
| `src/components/course-shell.tsx` | Resolve client-side URL selection and compose the page | Search parameters and navigation contract | Active header and course content |
| `src/components/course-header.tsx` | Compose identity and both navigation levels | Resolved selection and navigation contract | Tab-link props |
| `src/components/tab-navigation.tsx` | Render accessible navigation links | Tab-link props | Semantic navigation markup |
| `src/components/empty-section.tsx` | Stable blank content landmark | None | Empty `main` landmark |
| `src/app/globals.css` | Desktop/mobile visual hierarchy | Component class names and active attributes | Presentation |
| `src/**/*.test.ts(x)` | Verify navigation and header behavior | Public module/component behavior | Test evidence |
| `next.config.ts` | Configure workspace discovery and static export | Current working directory and deployment base path | Turbopack root and exported site configuration |
| `src/lib/grade-calculator.ts` | Validate persisted state and calculate current/Scheme I/Scheme II marks | Versioned grade state | Pure calculation result |
| `src/components/grade-calculator.tsx` | Render inputs/results and synchronize browser storage | User input and `localStorage` | Versioned saved grade state |
| `src/components/course-content.tsx` | Select calculator or blank content | Course and section selection | Page content |
| `.github/workflows/deploy-pages.yml` | Test, export, and deploy static site | Git commit and package scripts | GitHub Pages artifact/deployment |

## 4. Databases

None. Browser `localStorage` is client-side persistence, not a project database.

## 5. Spreadsheets

None.

## 6. External Services, Web Apps, and Accounts

GitHub will host the repository and Pages site. Repository identity and visibility are pending user approval. Browser `localStorage` stores only grade inputs on the current device under `courses-summary:2z03:grades:v1`.

## 7. Automations

The GitHub Actions Pages workflow runs on pushes to `master` and manual dispatch. No
other project automation or scheduled task is known.

## 8. Dependency Map

- Course/section navigation contract -> produced by `src/lib/navigation.ts`; consumed by
  `src/app/page.tsx`, `src/components/course-header.tsx`, both tab rows, and automated tests.
- Search parameter selection -> produced by the browser URL; consumed by `resolveSelection`; the
  resolved values produce active states and all navigation URLs.
- Component class/attribute names -> produced by React components; consumed by `globals.css`.
- Turbopack workspace root -> produced by `next.config.ts`; consumed by `next dev` and `next build` so unrelated parent lockfiles are ignored.
- Project operating memory -> governed by `AGENTS.md` and indexed by `docs/ai/INDEX.md`.
- No automation or external service reads or writes these contracts.
- Grade-state contract -> produced by calculator inputs and `localStorage`; consumed by the pure
  grade engine and result display. No server receives the marks.
- Static base path -> produced by the GitHub Actions environment and Next.js configuration;
  consumed by exported assets and internal navigation links.
- `out/` export -> produced by `npm run build`; consumed by the GitHub Pages upload/deploy actions.

## 9. Known Fragilities / UNVERIFIED

- GitHub repository name, owner, visibility, and final Pages URL remain `UNVERIFIED` until publication.
- No historical code or external project memory was present to reconcile as of 2026-09-11.
