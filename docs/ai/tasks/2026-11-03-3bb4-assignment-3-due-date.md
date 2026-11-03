# Task: Set and publish 3BB4 Assignment 3 due date

- Status: COMPLETE
- Opened: 2026-11-03
- Updated: 2026-11-03
- Worktree: repository root
- Branch: master
- Base commit: f6e7823

## Objective and Source

The user's assignment screenshot states Assignment 3 is due Wednesday, December 9,
2026 at 23:59 via Avenue. Set that date and publish it, as explicitly requested.

## Scope and Checkpoint

- Update the shared 3BB4 task catalog and its calendar anchor to `20261209`.
- Both 3BB4 Tasks and All Deliverables consume the same catalog. Timeline selection and
  cross-course ordering consume the anchor; existing completion IDs stay compatible.
- Update existing task-data assertions and the combined table's remaining undated-row count.
- No automation directly writes the catalog. GitHub Pages publishes the static export.
- Changed files: `src/lib/3bb4-tasks.ts`, its test, `src/lib/all-deliverables.test.ts`,
  `scope.md`, `docs/ai/current-state.md`, this task, and the active registry.
- Preserve unrelated local INDEX, scope, and coursework-task changes when staging.

## Evidence

- Before the catalog edit, the existing data test failed: 20 TBD tasks instead of 19.
- Focused data/table verification: four files, ten tests passing.
- `npm test`: 25 files, 77 tests passing.
- `NEXT_PUBLIC_BASE_PATH=/courses-summary npm run build`: passing static export.
- `git diff --check`: passing.

## External State and Next Action

Published commit `9223c8b` to `origin/master`. GitHub Pages workflow
[41708903181](https://github.com/DenzelJohnson/courses-summary/actions/runs/41708903181)
passed its build and deployment jobs on 2026-11-03.

Live browser verification confirmed both 3BB4 Tasks and All Deliverables show Assignment 3
as `Wed, Dec 9 · 11:59 PM via Avenue`. No known issues or remaining deadline work.
Unrelated local coursework and INDEX/scope changes remain uncommitted.
Next action: commit and push the deployment-evidence checkpoint.

Information only in chat: none
