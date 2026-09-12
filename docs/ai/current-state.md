# Current State

_Verified: 2026-09-11_

The Courses summary, 2Z03 calculator, and 2Z03 Tasks table are merged into `master`, published,
and verified live.

## Required Outcome

- Identity label: **Courses**, with no subtitle.
- Primary tabs: 2Z03, 2GA3, 3BB4.
- Secondary tabs for every course: Syllabus, Lectures, Notes.
- Default selection: 2Z03 and Syllabus.
- 2Z03 Syllabus: saved grade calculator with Scheme I/II comparison.
- 2Z03 Tasks: 51-row chronological schedule with a saved completion checklist.
- All other content areas: blank.
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
  51 data rows, refresh persistence, blank 2GA3 Tasks, no console errors, and 390 px containment.
- GitHub Actions Pages workflow run `34663726911`: build and deployment succeeded on 2026-09-11.
