# Task Timeline and Assessment Emphasis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-unlimited:subagent-driven-development (recommended) or superpowers-unlimited:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mark the current point in both task schedules and visually emphasize assessed work.

**Architecture:** Add an optional numeric `calendarDate` to typed task data and a pure helper that selects the final dated row on or before an injected local date. Each existing table adds derived row classes; CSS owns the divider and pale-purple assessment treatment.

**Tech Stack:** TypeScript, React 19 client components, Next.js 16 static export, Vitest, Testing Library, CSS.

---

### Task 1: Add typed calendar dates and a pure timeline selector

**Files:**
- Create: `src/lib/task-timeline.ts`
- Create: `src/lib/task-timeline.test.ts`
- Modify: `src/lib/course-tasks.ts`
- Modify: `src/lib/3bb4-tasks.ts`
- Modify: `src/lib/course-tasks.test.ts`
- Modify: `src/lib/3bb4-tasks.test.ts`

- [ ] **Step 1: Write the failing selector tests**

```ts
import { describe, expect, it } from "vitest";
import type { CourseTask } from "./course-tasks";
import { findLatestCurrentTaskId } from "./task-timeline";

const tasks: readonly CourseTask[] = [
  { id: "sep-19", type: "Lecture", name: "Lecture", date: "Fri, Sep 19", sortOrder: 1, calendarDate: 20260919 },
  { id: "sep-20-lecture", type: "Lecture", name: "Lecture", date: "Sat, Sep 20", sortOrder: 2, calendarDate: 20260920 },
  { id: "sep-20-assignment", type: "Assignment", name: "Assignment", date: "Sat, Sep 20", sortOrder: 3, calendarDate: 20260920 },
  { id: "sep-21", type: "Lecture", name: "Lecture", date: "Sun, Sep 21", sortOrder: 4, calendarDate: 20260921 },
];

describe("findLatestCurrentTaskId", () => {
  it("returns the last same-day row", () => expect(findLatestCurrentTaskId(tasks, new Date(2026, 8, 20))).toBe("sep-20-assignment"));
  it("returns the latest earlier row across a date gap", () => expect(findLatestCurrentTaskId(tasks, new Date(2026, 8, 19))).toBe("sep-19"));
  it("returns null when every task is future or undated", () => expect(findLatestCurrentTaskId([{ ...tasks[0], calendarDate: null }], new Date(2026, 8, 18))).toBeNull());
});
```

- [ ] **Step 2: Run the selector test to verify it fails**

Run: `npm test -- src/lib/task-timeline.test.ts`

Expected: FAIL because `task-timeline` does not exist.

- [ ] **Step 3: Implement the data contract and helper**

```ts
export type CourseTask = {
  id: string;
  type: CourseTaskType;
  name: string;
  date: string;
  sortOrder: number;
  calendarDate?: number | null;
};

export function findLatestCurrentTaskId(tasks: readonly CourseTask[], now: Date): string | null {
  const currentDate = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  return tasks.reduce<string | null>((latestId, task) => task.calendarDate !== null && task.calendarDate !== undefined && task.calendarDate <= currentDate ? task.id : latestId, null);
}
```

Generate each 2Z03 `calendarDate` from its supplied month/day and year 2026 while retaining the displayed date strings and current ordering. Give 3BB4's midterm `calendarDate: 20261023`; give its undated entries `calendarDate: null`.

- [ ] **Step 4: Extend schedule-data tests**

```ts
expect(courseTasks.find((task) => task.id === "lecture-1")?.calendarDate).toBe(20260910);
expect(courseTasks.find((task) => task.id === "final-exam")?.calendarDate).toBeNull();
expect(threeBB4Tasks.find((task) => task.id === "midterm")?.calendarDate).toBe(20261023);
```

- [ ] **Step 5: Run focused tests and commit**

Run: `npm test -- src/lib/task-timeline.test.ts src/lib/course-tasks.test.ts src/lib/3bb4-tasks.test.ts`

Expected: PASS.

```bash
git add src/lib/task-timeline.ts src/lib/task-timeline.test.ts src/lib/course-tasks.ts src/lib/3bb4-tasks.ts src/lib/course-tasks.test.ts src/lib/3bb4-tasks.test.ts
git commit -m "feat: add task timeline selection"
```

### Task 2: Apply table classes and visual treatment

**Files:**
- Modify: `src/components/tasks-table.tsx`
- Modify: `src/components/3bb4-tasks-table.tsx`
- Modify: `src/components/tasks-table.test.tsx`
- Modify: `src/components/3bb4-tasks-table.test.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Write failing rendering tests**

```tsx
expect(screen.getByText("Assignment 1").closest("tr")).toHaveClass("task-row--assessment");
expect(screen.getByText("Lecture 1 · 1 Introduction, 1.1 Definitions and terminology").closest("tr")).not.toHaveClass("task-row--assessment");
expect(screen.getByText("Lecture 2 · 1.2 Initial value problems").closest("tr")).toHaveClass("task-row--current");
```

Mock the current date as September 13, 2026 so the 2Z03 divider appears on Lecture 2. In the 3BB4 test, assert assessment styling for Assignment 1 and no current-row class before October 23.

- [ ] **Step 2: Run focused component tests to verify they fail**

Run: `npm test -- src/components/tasks-table.test.tsx src/components/3bb4-tasks-table.test.tsx`

Expected: FAIL because neither table applies the row classes.

- [ ] **Step 3: Apply derived classes in both tables**

```tsx
const currentTaskId = findLatestCurrentTaskId(courseTasks, new Date());
const rowClassName = [task.type !== "Lecture" ? "task-row--assessment" : "", task.id === currentTaskId ? "task-row--current" : ""].filter(Boolean).join(" ");
<tr className={rowClassName} key={task.id}>
```

Use the corresponding 3BB4 task list in its table. Do not persist or display the derived date state.

- [ ] **Step 4: Add CSS**

```css
.task-row--assessment td { background: #f3edff; }
.task-row--current td { border-bottom: 5px solid #8b3dff; }
```

Keep the existing checklist control styling and responsive scroll behavior unchanged.

- [ ] **Step 5: Run focused tests and commit**

Run: `npm test -- src/components/tasks-table.test.tsx src/components/3bb4-tasks-table.test.tsx`

Expected: PASS.

```bash
git add src/components/tasks-table.tsx src/components/3bb4-tasks-table.tsx src/components/tasks-table.test.tsx src/components/3bb4-tasks-table.test.tsx src/app/globals.css
git commit -m "feat: emphasize current and assessed tasks"
```

### Task 3: Verify and publish

**Files:**
- Modify: `docs/ai/tasks/2026-09-13-task-timeline-and-assessment-emphasis.md`
- Modify: `docs/ai/tasks/ACTIVE.md`
- Modify: `docs/ai/current-state.md`
- Modify: `scope.md`

- [ ] **Step 1: Run full verification**

Run: `npm test -- --run && npm run build`

Expected: all tests pass and Next.js produces a static export.

- [ ] **Step 2: Verify locally through the approved local-host workflow**

Open both Tasks views. Confirm the thick purple divider sits after the latest dated row on or before today, assessment rows have a pale-purple background, lecture rows remain unhighlighted, and completion persistence still works.

- [ ] **Step 3: Record and publish**

Update the active task with test/build/browser evidence, merge the verified branch into `master`, push to the established GitHub repository, wait for the Pages workflow, inspect the live page, then mark the task COMPLETE and clear `ACTIVE.md`.
