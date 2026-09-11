# Current State

_Verified: 2026-09-11_

The base Courses summary is merged into `master`. The 2Z03 calculator and GitHub Pages support are implemented and verified on `codex/2z03-grade-calculator`, pending approval to publish a public repository.

## Required Outcome

- Identity label: **Courses**, with no subtitle.
- Primary tabs: 2Z03, 2GA3, 3BB4.
- Secondary tabs for every course: Syllabus, Lectures, Notes.
- Default selection: 2Z03 and Syllabus.
- 2Z03 Syllabus: saved grade calculator with Scheme I/II comparison.
- All other content areas: blank.
- Presentation: screenshot-inspired two-row header with burgundy active pills; no copied branding.

## Deployment

The static export and Pages workflow are ready. GitHub owner `DenzelJohnson` is authenticated and the proposed `courses-summary` repository name is available; no repository has been created yet.

## Verification So Far

- Vitest: 6 files, 25 tests passing.
- Next.js 16.3.5 static production export succeeds with the GitHub Pages base path.
- Browser: calculation, saved-value refresh, both schemes, missed-midterm state, blank-view isolation, zero console errors, and 390 px layout verified; document width equals viewport width.
