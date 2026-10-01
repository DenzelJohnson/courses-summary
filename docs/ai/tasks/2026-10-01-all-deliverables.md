# All Deliverables

## Scope

Add a fourth top-level All Deliverables tab containing the 34 currently known graded tasks across
2Z03, 2DA4, and 3BB4. Include both separately checkable parts of each 2DA4 lab. Exclude lectures
and unweighted 3BB4 tutorials. Keep checklist status tied to each course's existing saved state.

## Status

Complete. Merged into `master` at `057c0bc` and published to GitHub Pages.

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
- Merged `master` verification: 25 Vitest files, 77 tests passing; Next.js static production build
  succeeds and `git diff --check` is clean.
- GitHub Pages [workflow 36881457755](https://github.com/DenzelJohnson/courses-summary/actions/runs/36881457755)
  built and deployed `057c0bc` successfully on 2026-10-01. The live browser shows the fourth tab,
  34 graded rows plus the table header, both parts of each 2DA4 lab, no tutorials or lectures,
  dates followed by `TBD`, and existing checklist states. At a 1280 px viewport, the page has no
  horizontal overflow and the header tabs fit within the viewport.

## External State

Pushed merge commit `057c0bc` to the public `DenzelJohnson/courses-summary` repository, triggering
the successful Pages deployment above. The separate Notion Calendar task remains pending.

## Next Action

None for this task.
