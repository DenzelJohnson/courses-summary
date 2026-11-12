# Task: Publish Fall 2026 final exam schedule

- Status: COMPLETE
- Opened: 2026-11-12
- Worktree: repository root
- Branch: master
- Base commit: 1821323

## Objective

Use the user-supplied exam schedule: 3BB4 Friday, December 11 at 4:00 PM;
2DA4 Monday, December 14 at 7:30 PM; 2Z03 Monday, December 21 at 12:30 PM.
Show them in the course Tasks tables and All Deliverables, then publish to GitHub Pages.

## Checkpoint

Updated the three task catalogs, existing schedule and table tests, scope, and the
current-state row counts. 2DA4 gains a checkable final exam row; 3BB4 and 2Z03 keep their
existing final exam IDs. No storage key or task interface changes. The calendar anchors
drive the combined ordering and the timeline; there is no external calendar write.
Preserve unrelated local coursework, index, and scope edits when staging.

## Evidence and next action

The updated focused assertions failed before the catalog changes as expected: the final
dates were missing and the 2DA4 and combined row counts were short.
- Focused suite: six files, 16 tests passing.
- Full suite: 25 files, 77 tests passing.
- Static production build with GitHub Pages base path and `git diff --check` passed.

Pushed commit `1bfb592` to `origin/master`. GitHub Pages workflow
[43265937730](https://github.com/DenzelJohnson/courses-summary/actions/runs/43265937730)
passed its build and deploy jobs on 2026-11-12. Live All Deliverables displayed all
three final exam rows in chronological order with the requested times.
Unrelated local coursework and index/scope edits remain uncommitted. No remaining
schedule work; save this deployment checkpoint.

Information only in chat: none
