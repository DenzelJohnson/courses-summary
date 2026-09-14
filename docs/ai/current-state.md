# Current State

_Verified: 2026-09-13_

The Courses summary, 2Z03 calculator, and 2Z03 Tasks table are merged into `master`, published,
and verified live.

## Required Outcome

- Identity label: **Courses**, with no subtitle.
- Primary tabs: 2Z03, 2DA4, 3BB4.
- Secondary tabs for every course: Syllabus, Lectures, Notes.
- Default selection: 2Z03 and Syllabus.
- 2Z03 Syllabus: saved grade calculator with Scheme I/II comparison.
- 2Z03 Tasks: 51-row chronological schedule with a saved completion checklist.
- 2DA4 Syllabus: saved weighted grade calculator with five assignments at 2% each, five labs at
  2% each, a 30% Midterm 1, and a 50% Final Exam.
- 2DA4 Tasks: saved 10-row chronological assessment checklist covering Labs 1–5, Assignments 1–4,
  and Midterm 1.
- 3BB4 Syllabus: saved grade calculator with three 10% assignments, a 20% midterm, a 50% final,
  and assignment/midterm MSAF controls that transfer weight to a saved final mark.
- 3BB4 Tasks: saved 23-row checklist with three assignments, a midterm, final exam, and Lectures
  1–18. Unknown dates are `TBD`.
- 2Z03 and 3BB4 Tasks: a bright purple divider follows the final table-ordered dated task on or
  before the browser's local calendar day; `TBD` tasks do not participate. Assignment, Lab,
  Midterm, and Exam rows have pale-purple emphasis; Lecture rows remain unhighlighted.
- Every Notes tab shows its matching public, read-only Google Docs publication in a responsive
  embedded viewer. Google Docs refreshes the published source independently.
- Presentation: screenshot-inspired two-row header with burgundy active pills; no copied branding.

## Deployment

Public repository: [DenzelJohnson/courses-summary](https://github.com/DenzelJohnson/courses-summary)

Live site: [denzeljohnson.github.io/courses-summary](https://denzeljohnson.github.io/courses-summary/)

## Verification So Far

- Vitest: 7 files, 26 tests passing from the repository root; nested worktrees are excluded from discovery.
- Next.js 16.3.5 static production export succeeds with the GitHub Pages base path.
- Browser: calculation, saved-value refresh, both schemes, missed-midterm state, blank-view isolation, zero console errors, and 390 px layout verified; document width equals viewport width.
- GitHub Actions Pages workflow run `34659436007`: build and deployment succeeded on 2026-09-11.
- Tasks feature evidence: 34 tests pass; static export passes; browser confirms four table columns,
  51 data rows, refresh persistence, blank 2DA4 Tasks, no console errors, and 390 px containment.
- GitHub Actions Pages workflow run `34663726911`: build and deployment succeeded on 2026-09-11.
- 3BB4 feature evidence: 15 Vitest files and 43 tests pass; static export passes; browser confirms
  calculator persistence, MSAF input disabling, 23 Tasks rows, saved checklist status, and 2Z03
  regression coverage. GitHub Actions Pages workflow
  [34772391175](https://github.com/DenzelJohnson/courses-summary/actions/runs/34772391175) succeeded
  on 2026-09-13 and the live 3BB4 Syllabus and Tasks views were checked.
- Timeline-emphasis feature evidence: 16 Vitest files and 48 tests pass; static export passes;
  local and live browser checks confirm the 2Z03 current-task divider and both tables' assessment
  emphasis. GitHub Actions Pages workflow
  [34773465419](https://github.com/DenzelJohnson/courses-summary/actions/runs/34773465419) succeeded
  on 2026-09-13.
- Notes-embed feature evidence: 17 Vitest files and 50 tests pass; static export passes;
  independent review found no issues; local and live browser checks confirm the 2Z03, 2DA4, and
  3BB4 published Docs frames. GitHub Actions Pages workflow
  [34774933276](https://github.com/DenzelJohnson/courses-summary/actions/runs/34774933276) succeeded
  on 2026-09-13.
- 2DA4 calculator/tasks feature evidence: 22 Vitest files and 60 tests pass; static production build
  succeeds. The calculator persists 12 validated marks with 10% assignments, 10% labs, 30% Midterm
  1, and 50% Final Exam. The Tasks view persists all 10 supplied assessment rows.
