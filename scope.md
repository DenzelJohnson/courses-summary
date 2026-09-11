# Project Scope — Courses Summary

> Single source of truth for this project's moving parts and dependencies. Update this file in
> the same change that alters any item below. Mark unconfirmed dependencies `UNVERIFIED`.

_Last updated: 2026-09-11 by Codex_

## 1. Overview

This repository will contain a Next.js course-summary interface and its tool-neutral project
memory. The main page will expose course navigation for 2Z03, 2GA3, and 3BB4; each course will
contain Syllabus, Lectures, and Notes sections. Section content is intentionally empty initially.

## 2. Tech Stack

- Language/runtime: TypeScript on Node.js
- Framework: Next.js with the App Router and React
- Styling: CSS maintained in the repository
- Hosting/deploy target: Not selected
- Testing and package-manager details: To be selected in the implementation plan

## 3. Code Modules

No application modules exist yet. The approved design and implementation plan will define them.

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

- Course/section navigation contract -> will be produced by the page configuration and consumed
  by the primary tabs, secondary tabs, URL state, and blank content panel.
- Project operating memory -> will be governed by `AGENTS.md` and indexed by `docs/ai/INDEX.md`.

## 9. Known Fragilities / UNVERIFIED

- Deployment target and hosting conventions are not yet selected.
- No historical code or external project memory was present to reconcile as of 2026-09-11.
