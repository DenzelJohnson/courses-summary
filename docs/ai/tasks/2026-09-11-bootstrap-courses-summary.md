# Task: Bootstrap the Courses summary

- Status: ACTIVE
- Opened: 2026-09-11
- Updated: 2026-09-11
- Worktree: `.worktrees/courses-summary`
- Branch: `codex/courses-summary`
- Base commit: `3cd94ab`

## Objective

Create complete portable project memory and a verified Next.js course-summary shell.

## Scope

Included: neutral/provider instructions, all required `docs/ai/` files, npm/Next.js setup, typed URL navigation, two-row responsive header, blank content landmark, automated tests, build, and visual checks. Excluded: course content, persistence, authentication, editing, search, deployment, and external integrations.

## Acceptance Criteria

- A clean-room agent can find active work, authority, conflicts, recent changes, and the exact next action using repository files only.
- The page labels itself **Courses** and exposes 2Z03, 2GA3, and 3BB4.
- Each course exposes Syllabus, Lectures, and Notes.
- URL state is bookmarkable, invalid values default safely, and content stays blank.
- Tests and the production build pass; desktop and narrow layouts are visually checked.

## Context to Load

- `AGENTS.md`
- `docs/ai/INDEX.md`
- `scope.md`
- `docs/superpowers/specs/2026-09-11-courses-summary-design.md`
- `docs/superpowers/plans/2026-09-11-courses-summary.md`

## Current Checkpoint

The isolated worktree exists and memory files are being created. Application implementation has not begun. Intended files are enumerated in the implementation plan. No external state was changed.

## Evidence

- Design commit: `753e39d`
- Plan commit: `8e83f69`
- Worktree foundation commit: `3cd94ab`
- Repository was empty before the design work.

## Risks and Handoff

No known blocking risk. Exact next action: create the package and toolchain configuration, then run `npm install next@latest react@latest react-dom@latest`.

Information only in chat: none
