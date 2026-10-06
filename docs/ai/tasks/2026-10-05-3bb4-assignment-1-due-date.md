# Task: Set 3BB4 Assignment 1 due date

- Status: ACTIVE (publication)
- Opened: 2026-10-05
- Updated: 2026-10-05
- Worktree: repository root
- Branch: master
- Base commit: 4cbc88a

## Objective

Set 3BB4 Assignment 1's due date to October 6, 2026.

## Scope and Acceptance Criteria

The shared task catalog must show `Tue, Oct 6` with calendar anchor `20261006` in both
3BB4 Tasks and All Deliverables. No due time was supplied. Keep the existing task ID
and completion storage contract.

## Context to Load

- `src/lib/3bb4-tasks.ts`
- `src/lib/all-deliverables.ts`
- `scope.md`

## Current Checkpoint

Updated `src/lib/3bb4-tasks.ts`, existing assertions in `src/lib/3bb4-tasks.test.ts`
and `src/lib/all-deliverables.test.ts`, `scope.md`, and `docs/ai/current-state.md`.
The date flows through the existing table, aggregation, and timeline consumers without
changing their contracts. No automation directly writes the task catalog.

The user explicitly authorized bypassing the audit protocol for this request after the
session's missing current-turn receipt was reported. No audit-health claim is made.

## Evidence

- Before the catalog edit, focused tests failed as expected: 22 TBD tasks instead of 21.
- Focused data and table checks: four files, ten tests passing.
- `npm test`: 25 files, 77 tests passing.
- `NEXT_PUBLIC_BASE_PATH=/courses-summary npm run build`: passing static export.
- Publication authorized by the user. Preparing the verified change for GitHub Pages;
  deployment result pending.

## Risks and Handoff

No known local issues. Next action: commit and push the reviewed change, then verify
the resulting GitHub Pages deployment and both live task views.

Information only in chat: none
