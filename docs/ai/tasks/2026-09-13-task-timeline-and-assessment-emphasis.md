# Task: Add current timeline marker and assessment emphasis

- Status: COMPLETE
- Opened: 2026-09-13
- Updated: 2026-09-13

## Objective

Add a thick purple divider after the last 2Z03 or 3BB4 task dated today or earlier, and visually
emphasize entire Assignment, Lab, Midterm, and Exam rows.

## Scope

Included: Fall 2026 2Z03 date interpretation, the known 3BB4 midterm range boundary, a shared
pure timeline helper, 2Z03/3BB4 table classes, CSS, tests, GitHub Pages publication, and verified
project-memory updates. Excluded: user-visible date changes, `TBD` inference, new tasks, and
calculator changes.

## Current Checkpoint

Approved design: `docs/superpowers/specs/2026-09-13-task-timeline-and-assessment-emphasis-design.md`.
Automate Pipeline is authorized to proceed through planning, implementation, integration, and
publication without routine approval checkpoints.

The shared date helper ignores times and `TBD` values, then marks the final table-ordered task
dated today or earlier. Both tables apply the resulting divider class and emphasize assessed task
rows. Evidence: 16 Vitest files / 48 tests pass, the static production build passes, independent
review found no issues, and local plus live browser checks confirmed the 2Z03 divider and both
courses' assessment treatment. The feature was merged and published on `master` as `1bedae7`.
GitHub Pages workflow [34773465419](https://github.com/DenzelJohnson/courses-summary/actions/runs/34773465419)
succeeded on 2026-09-13.
