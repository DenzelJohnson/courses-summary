# Task: Build and publish the 2Z03 grade calculator

- Status: ACTIVE
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

The calculator, browser persistence, static navigation, and GitHub Pages workflow are implemented on the feature branch. A verified local development server is running at `http://127.0.0.1:3000` in session `30215`. The authenticated GitHub owner is `DenzelJohnson`, and `DenzelJohnson/courses-summary` does not currently exist. No external repository or Pages settings have been changed.

## Evidence

- User screenshot supplies weights and missed-work rules.
- User confirmed Scheme II replaces a lower midterm with the final-exam mark.
- User confirmed completed-weight normalization using only entered assessments.
- Official Next.js and GitHub Pages documentation are linked from the design.
- Vitest: 6 files and 25 tests passing.
- Static export: Next.js build succeeds and `out/index.html` references `/courses-summary/_next/` assets when the deployment base path is set.
- Browser: 85 on Assignment 1 and 70 on Midterm 1 produce 74.9%; refresh restores both values; final-exam Scheme II, missed-midterm disabling, blank views, zero console errors, and 390 px no-overflow layout are verified.
- Feature commits: `043d330`, `da599a1`, `ff892fa`, `71244ad`, and `764a65b`.

## Risks and Handoff

Creating a public repository exposes the full Git history, so repository visibility still requires explicit user approval. Exact next action: obtain approval to create public `DenzelJohnson/courses-summary`, then merge to `master`, create/push the repository, enable Pages, and verify the live deployment.

Information only in chat: none
