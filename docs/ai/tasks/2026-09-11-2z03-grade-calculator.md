# Task: Build and publish the 2Z03 grade calculator

- Status: ACTIVE
- Opened: 2026-09-11
- Updated: 2026-09-11
- Worktree: repository root
- Branch: `master`
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

The calculator design is approved in conversation and written for user review. No application or deployment files have been changed for this feature. The existing local development server is running on `127.0.0.1:3001` in session `10320`. `next-env.d.ts` is modified only by that development server's generated type-path switch. No GitHub repository or Pages settings have been changed.

## Evidence

- User screenshot supplies weights and missed-work rules.
- User confirmed Scheme II replaces a lower midterm with the final-exam mark.
- User confirmed completed-weight normalization using only entered assessments.
- Official Next.js and GitHub Pages documentation are linked from the design.

## Risks and Handoff

GitHub repository identity and visibility still require resolution before publication. Exact next action: obtain written-spec approval, then create the implementation plan.

Information only in chat: none
