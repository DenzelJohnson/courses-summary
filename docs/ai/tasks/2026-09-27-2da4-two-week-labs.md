# 2DA4 Two-Week Lab Schedule Correction

## Scope

Correct the five 2DA4 lab rows so each displays both weeks the student attends. Preserve one
checklist item and the existing completion ID for each lab. Sort each row from its first week and
use its second attended week as the timeline completion anchor.

## Source Schedule

- Lab 1: weeks of September 21 and September 28, 2026.
- Lab 2: weeks of October 5 and October 19, 2026; October 12 is the midterm break.
- Lab 3: weeks of October 26 and November 2, 2026.
- Lab 4: weeks of November 9 and November 16, 2026.
- Lab 5: weeks of November 23 and November 30, 2026.

The screenshot is evidence for dates only. It contains no instruction to change assignments,
posted dates, lab times, grades, or completion storage. Existing lab times remain unchanged.

## Status

Implementation is complete in isolated worktree `fix-2da4-lab-weeks` and is awaiting integration
and publication.

## Evidence

- The focused task-data test first failed against all five single-week rows, then passed after the
  correction.
- The focused 2DA4 Tasks component suite passes: 3 tests.
- The full Vitest suite passes: 23 files, 67 tests.
- The Next.js static production build passes.
- Independent review found no functional schedule issues and confirmed the affected project-memory
  handoff needed this status update.

## External State

No external writes have occurred. The pending Notion Calendar task contains 2DA4 assignment events
only, so this lab-display correction does not alter its planned writes.

## Next Action

Merge the reviewed branch to `master`, push it, wait for GitHub Pages deployment, and verify the
live 2DA4 Tasks view.
