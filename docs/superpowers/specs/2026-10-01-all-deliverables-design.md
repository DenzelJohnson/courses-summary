# All Deliverables Design

## Goal

Add **All Deliverables** as the fourth primary navigation tab. It displays every existing task
whose type belongs to a weighted grading category for its course.

## Rows and order

Reuse the three course task catalogs. Include Assignment, Lab, Midterm, and Exam rows. This
includes both separately checkable parts of each 2DA4 lab and all six 2Z03 assignments and five
labs, even though each course's grading policy may drop a lowest mark. Exclude every Lecture row,
including the 3BB4 tutorials, which are stored as Lecture tasks and have no grading weight.
The initial combined view has 34 rows: 14 from 2Z03, 15 from 2DA4, and 5 from 3BB4.

Sort known Fall 2026 calendar dates across courses, then time within a day. Put undated `TBD`
rows last. The columns are Course, Type, Name, Date, and Checklist. Reuse the existing date
formatter, pale-purple assessment rows, and purple divider after the latest dated row on or
before the local day.

## Navigation and persistence

The bookmarkable URL is `/?course=all-deliverables`. Selecting it hides the course-specific
Syllabus/Tasks/Notes row. Course links from this view open each course's Tasks section.
The combined table reads and writes the existing per-course task completion keys. It passes the
full task ID list for each course to the persistence hook so mounting the combined view cannot
remove saved lecture or tutorial completion. A checklist action updates only its source course.
Returning to a course Tasks view shows that saved status.

## Verification

Test URL resolution and header state, all 34 graded rows and their chronological ordering,
absence of lectures/tutorials, per-course checklist synchronization, and existing course views.
Run the focused and full Vitest suites, static production build, and live GitHub Pages check.
