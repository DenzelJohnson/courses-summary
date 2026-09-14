# 3BB4 Tutorials, Task Times, and Calendar Design

## Goals

- Add 12 dated 3BB4 Tuesday tutorials from September 15 through December 8, 2026, excluding the
  October 12–18 Fall Break.
- Render every task-table time in 12-hour AM/PM notation.
- Add 15 external calendar events: every 2Z03 assignment/lab from 9:00 PM–11:55 PM and every
  2DA4 assignment from 8:00 PM–11:00 PM, on their Fall 2026 task dates.

## Site behavior

`threeBB4Tasks` will add `Tutorial 1` through `Tutorial 12` as `Lecture`-type rows dated every
Tuesday: Sep 15, 22, 29; Oct 6, 20, 27; Nov 3, 10, 17, 24; Dec 1, 8. Each has a matching
calendar date, and no Oct 13 tutorial exists.

A shared `formatTaskDate` helper will convert time substrings such as `14:30`, `17:30`, `20:00`,
and `23:59` to `2:30 PM`, `5:30 PM`, `8:00 PM`, and `11:59 PM` at render time. It leaves dates,
week ranges, and `TBD` unchanged. Task sort order and calendar dates remain numeric and unchanged.

## Calendar behavior

In Notion Calendar, first check for an existing event with the same course/task title and date;
create only missing entries in the default calendar. The entries are:

- 2Z03 Assignments 1–6 and Labs 1–5 on Sep 24; Oct 1, 8, 22, 26; Nov 5, 12, 19, 26; Dec 3, 10,
  each from 9:00 PM–11:55 PM.
- 2DA4 Assignments 1–4 on Oct 5, Oct 26, Nov 16, and Nov 30, each from 8:00 PM–11:00 PM.

## Verification

Tests cover the exact tutorial count, dates, excluded break date, 12-hour formatter, and rendered
table time. Full tests and production export verify the app. The calendar is verified manually by
visibly confirming each created event in Notion Calendar.
