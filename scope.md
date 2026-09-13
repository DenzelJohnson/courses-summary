# Project Scope — Courses Summary

> Single source of truth for this project's moving parts and dependencies. Update this file in
> the same change that alters any item below. Mark unconfirmed dependencies `UNVERIFIED`.

_Last updated: 2026-09-13 by Codex_

## 1. Overview

This repository contains a Next.js course-summary interface and its tool-neutral project memory.
The main page exposes course navigation for 2Z03, 2GA3, and 3BB4; each course contains Syllabus,
Tasks, and Notes. The 2Z03 Syllabus contains a persisted grade calculator and its Tasks view
contains a fixed course schedule with saved completion states. The 3BB4 Syllabus has its own
persisted calculator and Tasks view; the 2GA3 selections remain empty.

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
| `vitest.config.ts` | Configure project test discovery | Vitest defaults and repository layout | Root-only test suite, excluding nested worktrees |
| `src/lib/grade-calculator.ts` | Validate persisted state and calculate current/Scheme I/Scheme II marks | Versioned grade state | Pure calculation result |
| `src/components/grade-calculator.tsx` | Render inputs/results and synchronize browser storage | User input and `localStorage` | Versioned saved grade state |
| `src/components/course-content.tsx` | Select calculator or blank content | Course and section selection | Page content |
| `src/lib/course-tasks.ts` | Define the fixed 51-row 2Z03 task schedule and completion-state contract | None | Typed task rows and storage key |
| `src/hooks/use-persistent-task-completions.ts` | Restore, save, and toggle task completion state | Task IDs and browser storage | Completion map |
| `src/components/tasks-table.tsx` | Render the 2Z03 chronological task table and toggle completion | Task rows and completion map | Saved completion state and table UI |
| `src/lib/3bb4-grade-calculator.ts` | Validate versioned 3BB4 marks and calculate current grade with MSAF final-weight transfer | 3BB4 grade state | Pure current grade |
| `src/hooks/use-persistent-3bb4-grade-state.ts` | Restore and save 3BB4 grade state in browser storage | 3BB4 grade state and browser storage | Versioned 3BB4 grade state |
| `src/components/3bb4-grade-calculator.tsx` | Render 3BB4 mark inputs, MSAF controls, and current grade | 3BB4 grade state | Saved grade state and calculator UI |
| `src/lib/3bb4-tasks.ts` | Define fixed 23-row 3BB4 task data and completion storage key | None | Typed 3BB4 task rows and storage key |
| `src/components/3bb4-tasks-table.tsx` | Render 3BB4 task table and saved checklist state | 3BB4 task rows and completion map | Checklist table UI |
| `.github/workflows/deploy-pages.yml` | Test, export, and deploy static site | Git commit and package scripts | GitHub Pages artifact/deployment |

## 4. Databases

None. Browser `localStorage` is client-side persistence, not a project database.

## 5. Spreadsheets

None.

## 6. External Services, Web Apps, and Accounts

GitHub hosts the public `DenzelJohnson/courses-summary` repository and Pages site at
`https://denzeljohnson.github.io/courses-summary/`. Browser `localStorage` stores only grade inputs
on the current device under `courses-summary:2z03:grades:v1` and task completion state under a
separate versioned 2Z03 key. 3BB4 uses `courses-summary:3bb4:grades:v1` and
`courses-summary:3bb4:tasks:v1`, so no course reads or overwrites the other's data.

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
- Task-schedule contract -> produced by `src/lib/course-tasks.ts`; consumed by the 2Z03 Tasks
  table and its tests. The schedule is fixed course data and has no external producer.
- Task-completion contract -> produced by a Tasks-table toggle and browser `localStorage`; consumed
  by `use-persistent-task-completions` and the same Tasks table after reload. No server,
  automation, or grade-calculator module receives it.
- 3BB4 grade-state contract -> produced by 3BB4 calculator inputs and MSAF toggles; consumed by
  `3bb4-grade-calculator.ts`, its persistence hook, and result display. It uses a distinct storage
  key and has no producer or consumer outside the browser.
- 3BB4 task contract -> produced by `3bb4-tasks.ts`; consumed only by the 3BB4 Tasks table and the
  keyed shared completion hook. It must not affect the 2Z03 task schedule.
- Shared completion-hook signature -> produced by `use-persistent-task-completions.ts`; consumed
  by both the 2Z03 and 3BB4 Tasks tables and its tests. Each caller supplies its task IDs and a
  course-specific storage key, so their saved completion maps remain isolated.
- Static base path -> produced by the GitHub Actions environment and Next.js configuration;
  consumed by exported assets and internal navigation links.
- `out/` export -> produced by `npm run build`; consumed by the GitHub Pages upload/deploy actions.
- Vitest exclusion contract -> produced by `vitest.config.ts`; consumed by root test discovery so
  nested `.worktrees/` do not load a second dependency tree.

## 9. Known Fragilities / UNVERIFIED

- GitHub Pages requires this repository to be public on the current account plan; a private-repository
  Pages enablement attempt returned HTTP 422 on 2026-09-11.
- No historical code or external project memory was present to reconcile as of 2026-09-11.
