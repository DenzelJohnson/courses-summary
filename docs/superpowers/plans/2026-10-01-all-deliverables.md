# All Deliverables Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-unlimited:subagent-driven-development (recommended) or superpowers-unlimited:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fourth primary tab with one combined, saved checklist of graded course tasks.

**Architecture:** Keep each course task catalog and storage key authoritative. A pure aggregation
module selects and sorts graded tasks; a client table uses the three existing completion hooks.
Navigation handles the combined tab as a distinct primary selection.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Vitest, Testing Library, GitHub Pages.

---

### Task 1: Add primary navigation selection

**Files:** `src/lib/navigation.ts`, `src/lib/navigation.test.ts`,
`src/components/course-header.tsx`, `src/components/course-header.test.tsx`,
`src/components/course-shell.test.tsx`.

- [ ] Add failing tests: `resolveSelection({course: "all-deliverables"})` selects the new tab;
  its header link has `aria-current="page"`, its URL is `/?course=all-deliverables`, and the
  course section navigation is absent. Existing course tabs preserve their current section.
- [ ] Run `npm test -- src/lib/navigation.test.ts src/components/course-header.test.tsx src/components/course-shell.test.tsx` and confirm the new assertions fail because the tab is absent.
- [ ] Add `PrimaryTab = Course | "all-deliverables"`; resolve the new query value while retaining
  the 2Z03/Syllabus default; add the fourth primary link and hide secondary navigation when
  selected. From the combined tab, course links point to their Tasks sections.
- [ ] Rerun the three focused test files and confirm they pass.

### Task 2: Select graded rows

**Files:** `src/lib/all-deliverables.ts`, `src/lib/all-deliverables.test.ts`.

- [ ] Add failing tests requiring 34 rows (14 2Z03, 15 2DA4, 5 3BB4), no lecture or tutorial,
  both parts of every 2DA4 lab, known dates ascending, and `TBD` last.
- [ ] Run `npm test -- src/lib/all-deliverables.test.ts` and confirm missing-module failure.
- [ ] Compose course-tagged rows from `courseTasks`, `twoDA4Tasks`, and `threeBB4Tasks`; keep
  only Assignment, Lab, Midterm, and Exam types. Compare `calendarDate` first, time within a
  day second, and source course/order for a deterministic tie; put null dates last.
- [ ] Rerun the focused test file and confirm it passes.

### Task 3: Render combined saved checklist

**Files:** `src/components/all-deliverables-table.tsx`,
`src/components/all-deliverables-table.test.tsx`, `src/components/course-content.tsx`,
`src/app/globals.css`.

- [ ] Add failing tests for the five columns, 34 rows, date formatting, purple assessment class,
  current-day divider, and saved status moving from a course Tasks table to the combined table
  and back. Verify toggling one course does not modify the other course's key.
- [ ] Run `npm test -- src/components/all-deliverables-table.test.tsx` and confirm the new tests fail.
- [ ] Call `usePersistentTaskCompletions` three times with the existing storage keys and full task
  ID lists; render a course-tagged row and route its toggle to the matching hook. Render the
  component when primary selection is `all-deliverables`. Reuse shared task styling with a
  five-column table adjustment.
- [ ] Rerun the focused component test and confirm it passes.

### Task 4: Verify and publish

**Files:** `scope.md`, `docs/ai/current-state.md`,
`docs/ai/tasks/2026-10-01-all-deliverables.md`, `docs/ai/tasks/ACTIVE.md`.

- [ ] Update project memory with the new navigation, aggregation, and completion dependencies.
- [ ] Run `npm test -- --run`, `npm run build`, and `git diff --check`.
- [ ] Review the branch, merge into `master`, rerun full verification, push, and wait for the
  GitHub Pages workflow tied to the pushed commit.
- [ ] Inspect the live combined table and its course-specific saved checklist behavior.
- [ ] Record deployment evidence, close the active task, and confirm local `master` matches origin.
