# 2DA4 Lecture Schedule Design

## Goal

Add the complete Fall 2026 2DA4 lecture schedule to the existing 2DA4 Tasks table.

## Schedule

- Lecture 1 is Wednesday, September 9, 2026; Lecture 2 is Friday, September 11, 2026.
- Subsequent lectures occur each Monday, Wednesday, and Friday.
- No lecture occurs during the October 12–18, 2026 week.
- The final two lectures are Monday, December 7 and Wednesday, December 9, 2026.
- The schedule contains 37 lectures, numbered in date order as `Lecture 1` through `Lecture 37`.

## Implementation

`src/lib/2da4-tasks.ts` will add typed `Lecture` rows with noon sort times and their matching
calendar dates. They share the existing 2DA4 completion storage key and table, but remain visually
unhighlighted because the table already styles only non-lecture rows as assessments.

Existing labs, assignments, and Midterm 1 remain unchanged and interleave chronologically with the
new lecture rows. The existing timeline helper will use each lecture’s calendar date without any
new component or persistence behavior.

## Testing

Tests will assert all 37 lecture labels/dates, the skipped October 12–18 week, the December 9 end
date, chronological ordering alongside assessments, and no regression to the shared checklist
behavior.
