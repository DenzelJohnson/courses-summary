# 2Z03 Tasks Table Design

**Status:** Approved in conversation on 2026-09-11

## Goal

Rename the secondary **Lectures** tab to **Tasks** and give only the 2Z03 Tasks view a compact,
chronological course-summary table. The 2DA4 and 3BB4 Tasks views remain blank.

## Interface

The table has exactly four columns: **Type**, **Name**, **Date**, and **Checklist**. Rows are
ordered by calendar date. The checklist cell is one accessible button that toggles between
`Incomplete` and `Completed`; no extra controls, filters, or explanatory text are added.

Each row's completion state is saved immediately in browser `localStorage` using a dedicated,
versioned 2Z03 key. It is independent of calculator marks and resets only when browser storage is
cleared.

## Schedule Data

The table includes 51 rows:

- 37 lectures, titled from the supplied lecture outline. Lecture 1 and 2 occur Thursday September
  10 and Friday September 11, 2020. Afterwards, lectures are Tuesday, Thursday, Friday; October
  12–18 is omitted; the next three occur October 20, 22, and 23; the last two are December 8 and
  10.
- Assignments: September 24 23:59; October 8 23:59; October 26 08:00; November 12 23:59;
  November 26 23:59; December 10 23:59.
- Labs: October 1, October 22, November 5, November 19, and December 3, all at 23:59.
- Midterms: October 30 18:30 and November 26 18:30.
- Final Exam: date `TBD`.

Lecture titles map in order to the supplied syllabus outline: 1–2 introduction and initial-value
problems; 3–5 direction fields and separable equations; 6–8 linear/nonlinear models; 9–11 second-
order and homogeneous linear equations; 12–14 continued/undetermined coefficients; 15–17 variation
of parameters and Cauchy–Euler; 18–20 initial/boundary value problems; 21–23 Laplace transform;
24–26 translation and rational properties; 27–29 continued/Dirac delta/separable PDEs; 30–32
classical boundary value problems, continued, heat equation; 33–35 Laplace/wave equations,
continued; 36–37 catch-up and review.

## Architecture and Verification

`src/lib/navigation.ts` remains the navigation contract but changes the visible section label from
Lectures to Tasks. A new typed schedule module supplies every fixed row and a dedicated completion
storage key. A client-side Tasks table owns restoration and save lifecycle, while `CourseContent`
selects it only for `2Z03 + lectures` (the stable internal section value avoids changing URLs).

Tests cover label rendering, all 51 schedule rows, chronological ordering, 2Z03-only rendering,
toggle behavior, and restoration after remount. Full Vitest, static export with the Pages base path,
and a browser check verify the deployed behavior.

## Out of Scope

Editing the schedule in the browser, filters, sorting controls, grade-calculator changes, task
content for 2DA4/3BB4, and a final-exam date are excluded.
