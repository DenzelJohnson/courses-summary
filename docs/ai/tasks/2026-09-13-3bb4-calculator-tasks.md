# Task: Build and publish 3BB4 calculator and Tasks

- Status: COMPLETE
- Opened: 2026-09-13
- Updated: 2026-09-13

## Objective

Add isolated, saved 3BB4 Syllabus grade calculation and a 23-row Tasks checklist without changing
2Z03 or adding content to 2GA3.

## Scope

Included: 3BB4 assessment marks, assignment/midterm MSAF state with final-weight transfer, current
grade, separate browser storage, three assignments, one midterm, one final exam, eighteen undated
lectures, saved completion state, test/build/browser verification, and GitHub Pages publication.
Excluded: inferred dates, editable tasks, new 2Z03 behavior, and 2GA3 content.

## Current Checkpoint

The feature is merged into `master`, pushed, and verified on GitHub Pages. The approved design is
`docs/superpowers/specs/2026-09-11-3bb4-calculator-tasks-design.md` and the implementation plan is
`docs/superpowers/plans/2026-09-13-3bb4-calculator-tasks.md`.

## Evidence

- New 3BB4 calculator state saves under `courses-summary:3bb4:grades:v1`; 2Z03 remains under its
  existing key.
- New 3BB4 task completion saves under `courses-summary:3bb4:tasks:v1`; the shared hook now takes
  the caller's key so 2Z03 remains isolated.
- Vitest: 15 files and 43 tests pass. Static production export passes.
- Browser at `http://127.0.0.1:3001`: an 85 Assignment 1 and 70 Midterm show 75.0%; MSAF Assignment
  2 disables its input and both values restore after refresh. The Tasks table has 23 data rows;
  Lecture 18 completion restores after refresh. Existing 2Z03 Tasks and calculator remain present.
- GitHub Pages workflow [34772391175](https://github.com/DenzelJohnson/courses-summary/actions/runs/34772391175)
  completed successfully for merged commit `b896d35`. The live Syllabus shows the 3BB4 calculator,
  and the live Tasks view shows three assignments, the dated midterm, final, and Lectures 1–18.

## Risks and Handoff

All unknown dates intentionally remain `TBD`. MSAF moves each affected assignment (10%) or midterm
(20%) to the final when a final mark is present. No known handoff risk remains.
