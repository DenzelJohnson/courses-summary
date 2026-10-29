# Task: Update 3BB4 Assignment 2 and 2Z03 Midterm 1 dates

- Status: ACTIVE (publication)
- Opened: 2026-10-29
- Updated: 2026-10-29
- Worktree: repository root
- Branch: master
- Base commit: b41701a

## Objective and Acceptance Criteria

Set 3BB4 Assignment 2 to November 2, 2026 at 11:59 PM, and move 2Z03 Midterm 1
from October 30 to November 2, 2026 at 5:30 PM, following the user's correction.
Both course Tasks views and All Deliverables must use the updated dates, ordering,
and timeline anchors. Existing task IDs and completion storage remain compatible.

## Current Checkpoint

- Updated `src/lib/3bb4-tasks.ts` and `src/lib/course-tasks.ts`.
- Updated the existing data assertions in their tests and the undated-row assertion in
  `src/lib/all-deliverables.test.ts`.
- Updated `scope.md` and `docs/ai/current-state.md`.
- The task catalogs produce date text, sort order, and calendar anchors consumed by
  course tables, All Deliverables, and the shared timeline helper. No external automation
  writes these catalogs; no consumer interface changed.
- Preserved pre-existing INDEX, scope, and local coursework-task changes.

## Evidence

- Before the production edit, two focused tests failed for the old dates and TBD count.
- The follow-up correction first failed the existing midterm date assertion, then changed
  Midterm 1 to `Mon, Nov 2 · 17:30` with sort order `202011021730` and anchor `20261102`.
- Focused data and table verification: six files, 17 tests passing.
- After the correction: four focused files, 13 tests passing; full suite remains 77 tests
  passing and the static production build succeeds.
- `npm test`: 25 files, 77 tests passing.
- `NEXT_PUBLIC_BASE_PATH=/courses-summary npm run build`: passing static export.
- `git diff --check`: passing.

## External State and Handoff

Publication is authorized by the user. No known implementation issues. Next action:
commit and push only this task's changes, preserving unrelated coursework edits, then
verify the resulting Pages deployment and the corrected dates in both course views
and All Deliverables.

Information only in chat: none
