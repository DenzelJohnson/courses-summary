# Current State

_Verified: 2026-09-11_

The completed Courses summary is merged into `master`; the temporary `codex/courses-summary` branch and worktree were removed after merged-result verification. Portable project memory, the Next.js toolchain, typed URL navigation, accessible header, responsive styling, and automated tests are implemented and verified. There are no active or blocked tasks.

## Required Outcome

- Identity label: **Courses**, with no subtitle.
- Primary tabs: 2Z03, 2GA3, 3BB4.
- Secondary tabs for every course: Syllabus, Lectures, Notes.
- Default selection: 2Z03 and Syllabus.
- Content areas: blank in this iteration.
- Presentation: screenshot-inspired two-row header with burgundy active pills; no copied branding.

## Backlog

The active task adds a persisted grade calculator only to 2Z03 Syllabus and publishes the static export to GitHub Pages. Other course content remains excluded.

## Verification So Far

- Vitest: 2 files, 5 tests passing in the final run on 2026-09-11.
- Next.js 16.3.5 production build: successful in the final run on 2026-09-11.
- Browser: desktop default, course/section navigation, invalid-value fallback, and 390 px mobile layout checked; mobile document width equals viewport width.
- Merged-result verification: 2 test files and 5 tests passed; the production build passed without workspace-root warnings after commit `a4eaeef`.
