# 2DA4 Two-Week Labs Design

## Goal

Correct the 2DA4 Tasks view so Labs 1–5 accurately show both weeks the student attends.

## Design

Each lab remains one task row with its existing `lab-N` ID, preserving saved checklist state. Its
Date cell displays both week-start dates without adding unsupported times. The row's `sortOrder`
uses the first attended week so it enters the chronological table at the start of the lab. Its
`calendarDate` uses the second attended week so the purple latest-passed divider does not treat the
two-week lab as finished after week one.

The corrected display values are:

- Lab 1 — `Weeks of Sep 21 and Sep 28`
- Lab 2 — `Weeks of Oct 5 and Oct 19`
- Lab 3 — `Weeks of Oct 26 and Nov 2`
- Lab 4 — `Weeks of Nov 9 and Nov 16`
- Lab 5 — `Weeks of Nov 23 and Nov 30`

Assignments, lectures, Midterm 1, weights, task IDs, local-storage keys, and checklist behavior are
unchanged. October 12 remains excluded as the midterm break.

## Verification

Data tests will assert every lab's exact display text, first-week sort order, and second-week
timeline anchor. Existing component, full-suite, and production-build checks will guard rendering,
persistence, other courses, and static export.
