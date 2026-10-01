# All Deliverables

## Scope

Add a fourth top-level All Deliverables tab containing the 34 currently known graded tasks across
2Z03, 2DA4, and 3BB4. Include both separately checkable parts of each 2DA4 lab. Exclude lectures
and unweighted 3BB4 tutorials. Keep checklist status tied to each course's existing saved state.

## Status

Implementation is complete on isolated branch `codex/all-deliverables`. Independent review found
no blocking issues; integration and publication are pending.

## Evidence

- Baseline: 23 Vitest files, 68 tests passing in an isolated worktree.
- Next.js 16 local static export and Vitest guides reviewed.
- New navigation and table tests first failed for the absent behavior, then passed after the
  implementation. Focused verification: 5 files, 16 tests passing.
- Full verification after the review follow-up: 25 Vitest files, 77 tests passing; Next.js
  static production build succeeds, and `git diff --check` is clean.
- Independent review found no Critical or Important issues. Its only minor test coverage note
  was addressed by checking two same-day orderings.
- Completion tests verify 2Z03, 2DA4, and 3BB4 continue using their existing storage keys and
  preserve saved lecture/tutorial states while the combined view is mounted.

## External State

No external writes for this task yet. The existing GitHub Pages site is the authorized delivery
target; the separate Notion Calendar task remains pending.

## Next Action

Merge into `master`, publish, and check the live combined table.
