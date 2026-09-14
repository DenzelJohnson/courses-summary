# 2DA4 Calculator and Tasks Design

## Goal

Add a saved 2DA4 grade calculator and a saved 2DA4 assessment checklist while preserving the
existing 2Z03 and 3BB4 views.

## Requirements

- The 2DA4 Syllabus view renders a straightforward weighted calculator.
- Assignment marks contribute 10% total, divided equally across five assignments (2% each).
- Lab marks contribute 10% total, divided equally across five labs (2% each).
- Midterm 1 contributes 30%.
- The Final Exam contributes 50%.
- Blank inputs are excluded from the current-grade denominator, matching the existing calculators;
  entered zeroes count as real marks.
- There are no MSAF controls, missed-assessment rules, alternate schemes, or final-weight transfers.
- Marks are validated as blank or numbers from 0 through 100 and persisted in a dedicated 2DA4
  browser-storage key.
- The 2DA4 Tasks view renders these ten rows in chronological order and persists checklist state:
  - Lab 1 — Mon, Sep 21 · 14:30–17:20
  - Lab 2 — Mon, Oct 5 · 14:30–17:20
  - Assignment 1 — Mon, Oct 5 · 23:00 via Avenue
  - Assignment 2 — Mon, Oct 26
  - Lab 3 — Weeks of Oct 26
  - Midterm 1 — Fri, Nov 6 · 17:30–19:30
  - Lab 4 — Weeks of Nov 9 · 14:30–17:20
  - Assignment 3 — Mon, Nov 16 (extra week due to Midterm)
  - Lab 5 — Weeks of Nov 23 · 14:30–17:20
  - Assignment 4 — Mon, Nov 30
- Week-based rows use their week’s Monday as the timeline anchor. Rows without a supplied time
  display the date or week text without inventing a time.
- Each task row uses the existing Type/Name/Date/Checklist table and shared completion hook, with
  a dedicated 2DA4 storage key so it cannot overwrite another course’s checklist.

## Architecture

Create focused 2DA4 modules following the established 3BB4 pattern:

- `src/lib/2da4-grade-calculator.ts` owns the versioned state shape, parser, storage key, and pure
  weighted-grade calculation.
- `src/hooks/use-persistent-2da4-grade-state.ts` owns browser persistence for that state.
- `src/components/2da4-grade-calculator.tsx` owns the four assessment groups and input updates.
- `src/lib/2da4-tasks.ts` owns typed task rows, sort order, calendar anchors, and storage key.
- `src/components/2da4-tasks-table.tsx` renders the task list with the existing checklist/timeline
  conventions.
- `src/components/course-content.tsx` selects these components for `2DA4` Syllabus and Lectures.

The 2DA4 grade state contains five assignment marks, five lab marks, one midterm mark, and one
final-exam mark. The pure calculator accumulates each nonblank mark multiplied by its item weight,
then divides by the sum of weights entered. With all marks present, the denominator is 100.

## Testing

Tests will cover:

- weighted calculations, blank-vs-zero behavior, invalid saved-state rejection, and persistence;
- rendering and updating all 2DA4 inputs without MSAF controls;
- 2DA4 task ordering, exact labels/dates, checklist persistence, and blank-view isolation;
- regression coverage showing 2Z03 and 3BB4 calculators/tasks remain unchanged.
