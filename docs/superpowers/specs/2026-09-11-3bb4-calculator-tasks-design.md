# 3BB4 Calculator and Tasks Design

**Status:** Approved in conversation on 2026-09-11

## Goal

Add the requested 3BB4 course-specific content while retaining the existing navigation and leaving
2Z03 and 2GA3 behavior unchanged. The 3BB4 Syllabus view receives a simple saved grade calculator;
the 3BB4 Tasks view receives a saved checklist table.

## Grade Calculator

The calculator has five mark inputs: Assignment 1, Assignment 2, Assignment 3, Midterm, and Final
Exam. Their weights are 10%, 10%, 10%, 20%, and 50%, respectively. A blank mark is excluded from
the current-course mark, so the displayed result is the weighted average of marks already entered.

Each assignment and the midterm has an MSAF toggle. Turning one on marks that assessment as missed.
Its weight moves to the final exam, matching the supplied policy. Until a final-exam mark exists,
the missed assessment is excluded from the current mark; once a final mark is entered, that mark is
also used for each transferred weight. The final exam itself has no MSAF toggle.

All inputs and MSAF states save immediately in a dedicated, versioned 3BB4 browser `localStorage`
key. This data is separate from 2Z03 grades and task-completion data. There is one current-mark
result and no alternative grading scheme.

## Tasks

The 3BB4 Tasks view uses the existing compact four-column structure: **Type**, **Name**, **Date**,
and **Checklist**. Checklist buttons are accessible, toggle between incomplete and completed, and
save immediately under a dedicated, versioned 3BB4 browser-storage key.

Rows are:

- Assignment 1, Assignment 2, and Assignment 3 — date `TBD`.
- Midterm — `Week of Oct 19–23 · 20:00` (take-home).
- Final Exam — date `TBD`.
- Lecture 1 through Lecture 18 — every date `TBD`, deliberately without inferred dates.

## Architecture and Verification

3BB4 gets isolated typed grade and task data contracts plus course-specific components. The shared
course-content switch chooses them only for 3BB4 Syllabus and Tasks, while stable internal section
URLs remain unchanged. The persisted task-completion hook may be parameterized by key so both
course tables use the same restore/save behavior without sharing stored states.

Tests cover the 3BB4 weighting and MSAF transfer rules, blank-mark current-grade behavior, state
validation, 23 task rows and their `TBD` dates, 3BB4-only rendering, checklist persistence, and no
regression to 2Z03. Full Vitest, static export, and a local-browser verification are required before
deployment to GitHub Pages.

## Out of Scope

Task editing, inferred lecture dates, assignment/final dates beyond `TBD`, input for lecture marks,
new grading schemes, changes to 2Z03, and any 2GA3-specific content are excluded.
