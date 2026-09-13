# Task Timeline and Assessment Emphasis Design

**Status:** Approved in conversation on 2026-09-13

## Goal

Make both existing Tasks views easier to scan by marking the current point in the course timeline
and emphasizing assessed work. The change applies only to 2Z03 and 3BB4 Tasks; it does not alter
checklist behavior or grade calculators.

## Timeline Divider

Each task has an optional numeric calendar day in Fall 2026. The view compares that day with the
browser's local calendar day, ignoring the time of day. It adds a thick, bright-purple divider
directly after the last table row dated today or earlier. When several tasks share a day, the last
row in their existing table order receives the divider. `TBD` rows never qualify.

2Z03's supplied dates are interpreted as Fall 2026. For 3BB4, only the known midterm date range
participates: its final day, October 23, is used as the completed-range boundary. The undated
assignments, final, and lectures do not move the divider. A course with no known task on or before
today has no divider.

## Assessment Emphasis

Every entire table row whose type is Assignment, Lab, Midterm, or Exam receives a subtle pale-purple
background. Lecture rows remain unhighlighted. There are no tutorial rows in the current schedules;
future ungraded tutorials should remain unhighlighted unless their task data explicitly marks them
as graded.

## Architecture and Verification

Extend the shared `CourseTask` contract with an optional calendar-day value. A pure task-timeline
helper determines the final eligible task ID from task data and an injected `Date`; both task tables
use it to apply the divider class. CSS supplies the purple divider and assessment-row background.

Tests cover: today-inclusive selection, last-row selection for same-day tasks, a gap between tasks,
no divider for all-future/undated data, Fall 2026 2Z03 dates, 3BB4's October 23 boundary, and
assessment versus lecture class rendering. Full Vitest, static export, local browser checks, and
the GitHub Pages deployment confirm delivery.

## Out of Scope

Changing task dates shown to the user, adding new task types, editing schedule rows in the browser,
notifications, filters, sorting controls, or changes to grade calculators are excluded.
