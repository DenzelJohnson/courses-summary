# 3BB4 Tutorials, Task Times, and Calendar Entries

## Scope

Add 12 Tuesday 3BB4 tutorial checklist rows from September 15 through December 8, 2026, excluding
the October 12–18 Fall Break. Render all stored Task-table times in 12-hour AM/PM notation. Add
the requested 2Z03 assignment/lab and 2DA4 assignment events to the user's Notion Calendar after
an immediate pre-submission confirmation.

## Status

Dashboard implementation and local verification are complete on `codex/3bb4-tutorials-and-times`.
Publishing to `master` and the Notion Calendar write remain pending.

## Evidence

- Shared date-format tests cover 23:59, 14:30–17:20, 20:00, and undated rows.
- 3BB4 task-data tests enumerate Tutorial 1–12 and prove October 13 is absent.
- Full Vitest suite: 23 files, 67 tests passing.
- Next.js static production build: passing.
- Independent review found and the implementation now covers an out-of-order task-date regression
  in the current-task divider.

## External State

- Planned Notion Calendar writes: 11 2Z03 assignment/lab events at 9:00 PM–11:55 PM and four
  2DA4 assignment events at 8:00 PM–11:00 PM.
- No calendar events have been created in this task yet. Calendar submission requires a fresh,
  action-time user confirmation.

## Next action

Merge the verified dashboard branch, push `master`, confirm the Pages deployment, then ask for
the immediate confirmation required before creating the calendar events.
