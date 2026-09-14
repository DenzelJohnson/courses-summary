# Task: Build and publish the 2Z03 grade calculator

- Status: COMPLETE
- Opened: 2026-09-11
- Updated: 2026-09-11
- Worktree: `.worktrees/2z03-grade-calculator`
- Branch: `codex/2z03-grade-calculator`
- Base commit: `3ca721a`

## Objective

Implement, verify, and publish the persisted 2Z03 Syllabus grade calculator defined by the approved design.

## Scope

Included: fixed assessment inputs, missed-midterm controls, current-grade normalization, Scheme I/II comparison, browser persistence, 2Z03-only rendering, static export, GitHub Pages workflow, repository publication, and deployment verification. Excluded: other course content, projections, accounts, databases, and configurable grading rules.

## Acceptance Criteria

- Individual marks persist after refresh in the current browser.
- Current grade uses only completed weighted work.
- Both schemes follow the confirmed syllabus rules and the higher result is prominent.
- Only 2Z03 Syllabus contains the calculator.
- Tests, static production export, and visual checks pass.
- The site is accessible at its verified GitHub Pages URL.

## Context to Load

- `AGENTS.md`
- `docs/ai/INDEX.md`
- `scope.md`
- `docs/superpowers/specs/2026-09-11-2z03-grade-calculator-design.md`
- `docs/superpowers/specs/2026-09-11-courses-summary-design.md`

## Current Checkpoint

The calculator, browser persistence, static navigation, and GitHub Pages workflow are merged to `master` and published. Repository: `https://github.com/DenzelJohnson/courses-summary`. Live site: `https://denzeljohnson.github.io/courses-summary/`. A local preview remains available at `http://127.0.0.1:3000` in session `30215`.

## Evidence

- User screenshot supplies weights and missed-work rules.
- User confirmed Scheme II replaces a lower midterm with the final-exam mark.
- User confirmed completed-weight normalization using only entered assessments.
- Official Next.js and GitHub Pages documentation are linked from the design.
- Vitest: 7 files and 26 tests passing from the repository root.
- Static export: Next.js build succeeds and `out/index.html` references `/courses-summary/_next/` assets when the deployment base path is set.
- Browser: 85 on Assignment 1 and 70 on Midterm 1 produce 74.9%; refresh restores both values; final-exam Scheme II, missed-midterm disabling, blank views, zero console errors, and 390 px no-overflow layout are verified.
- Feature commits: `043d330`, `da599a1`, `ff892fa`, `71244ad`, `764a65b`, and `d63e8ef`.
- GitHub Pages run `34659436007` completed successfully. Live-site checks confirmed the 74.9% example, refresh persistence, blank 2DA4 Notes, and no browser console errors.
- A root-only test-discovery regression test prevents nested `.worktrees/` from loading duplicate React dependencies.

## Risks and Handoff

GitHub Pages was unavailable while the repository was private (HTTP 422 under the current account plan), so the user authorized the required public visibility. No known handoff risk remains.

Information only in chat: none
