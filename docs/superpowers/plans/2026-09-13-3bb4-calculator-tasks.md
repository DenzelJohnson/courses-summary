# 3BB4 Calculator and Tasks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-unlimited:subagent-driven-development (recommended) or superpowers-unlimited:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add saved 3BB4 Syllabus grade calculation with MSAF transfer and a saved 23-row Tasks checklist.

**Architecture:** Keep 3BB4 data and browser-storage contracts independent from 2Z03. Add pure grade/task modules, small client components that own browser interactions, then extend the existing course-content switch to select the new views. Parameterize the shared task-completion hook by storage key so each course restores only its own checked rows.

**Tech Stack:** Next.js 16 App Router static export, React 19 client components, TypeScript, Vitest, Testing Library, browser `localStorage`.

---

## File Structure

- Create `src/lib/3bb4-grade-calculator.ts`: versioned 3BB4 grade state, validation, and current-grade calculation.
- Create `src/lib/3bb4-grade-calculator.test.ts`: unit coverage for weighting, MSAF transfer, blanks, and stored-state parsing.
- Create `src/hooks/use-persistent-3bb4-grade-state.ts`: browser-only restore/save lifecycle for 3BB4 grade state.
- Create `src/hooks/use-persistent-3bb4-grade-state.test.tsx`: save and restoration coverage.
- Create `src/components/3bb4-grade-calculator.tsx`: accessible 3BB4 calculator UI.
- Create `src/components/3bb4-grade-calculator.test.tsx`: calculator interaction and persistence coverage.
- Create `src/lib/3bb4-tasks.ts`: fixed 23-row 3BB4 schedule and unique storage key.
- Create `src/lib/3bb4-tasks.test.ts`: task-data coverage.
- Modify `src/hooks/use-persistent-task-completions.ts`: accept a storage key instead of importing the 2Z03 key.
- Modify `src/hooks/use-persistent-task-completions.test.tsx`: verify a supplied key is used and invalid data is ignored.
- Create `src/components/3bb4-tasks-table.tsx`: 3BB4 table UI using shared completion persistence.
- Create `src/components/3bb4-tasks-table.test.tsx`: 23 rows and checklist persistence.
- Modify `src/components/tasks-table.tsx`: pass the established 2Z03 completion key to the shared hook.
- Modify `src/components/grade-calculator.test.tsx`: assert 3BB4 view selection and 2Z03 non-regression.
- Modify `src/components/course-content.tsx`: select 3BB4 views only for Syllabus and Tasks.
- Modify `scope.md`, `docs/ai/tasks/ACTIVE.md`, and `docs/ai/tasks/2026-09-13-3bb4-calculator-tasks.md`: record contracts, progress, and verification evidence.

### Task 1: Establish the 3BB4 grade engine

**Files:**
- Create: `src/lib/3bb4-grade-calculator.test.ts`
- Create: `src/lib/3bb4-grade-calculator.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import {
  calculate3BB4Grade,
  createEmpty3BB4GradeState,
  parseStored3BB4GradeState,
} from "./3bb4-grade-calculator";

describe("calculate3BB4Grade", () => {
  it("normalizes only entered marks", () => {
    const state = createEmpty3BB4GradeState();
    state.assignments[0] = 85;
    state.midterm = 70;
    expect(calculate3BB4Grade(state)).toBeCloseTo(75, 4);
  });

  it("uses the final mark for each MSAF-transferred weight", () => {
    const state = createEmpty3BB4GradeState();
    state.assignments[0] = 90;
    state.missedAssignments[1] = true;
    state.missedMidterm = true;
    state.finalExam = 80;
    expect(calculate3BB4Grade(state)).toBeCloseTo(81.1111, 4);
  });

  it("excludes a missed assessment until the final is entered", () => {
    const state = createEmpty3BB4GradeState();
    state.missedMidterm = true;
    expect(calculate3BB4Grade(state)).toBeNull();
  });

  it("restores only valid version-one state", () => {
    const state = createEmpty3BB4GradeState();
    state.assignments[2] = 64;
    expect(parseStored3BB4GradeState(JSON.stringify(state))).toEqual(state);
    expect(parseStored3BB4GradeState('{"version":2}')).toBeNull();
  });
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- src/lib/3bb4-grade-calculator.test.ts`

Expected: FAIL because `3bb4-grade-calculator` does not exist.

- [ ] **Step 3: Implement the minimal engine**

```ts
export const THREE_BB4_GRADE_STORAGE_KEY = "courses-summary:3bb4:grades:v1";
export type ThreeBB4Mark = number | null;
export type ThreeBB4GradeState = {
  version: 1;
  assignments: ThreeBB4Mark[];
  missedAssignments: boolean[];
  midterm: ThreeBB4Mark;
  missedMidterm: boolean;
  finalExam: ThreeBB4Mark;
};

export function createEmpty3BB4GradeState(): ThreeBB4GradeState {
  return { version: 1, assignments: [null, null, null], missedAssignments: [false, false, false], midterm: null, missedMidterm: false, finalExam: null };
}

export function calculate3BB4Grade(state: ThreeBB4GradeState): number | null {
  const items: Array<[ThreeBB4Mark, number]> = state.assignments.map((mark, index) => [
    state.missedAssignments[index] && state.finalExam !== null ? state.finalExam : mark,
    10,
  ]);
  items.push([state.missedMidterm && state.finalExam !== null ? state.finalExam : state.midterm, 20]);
  items.push([state.finalExam, 50]);
  const entered = items.filter(([mark]) => mark !== null);
  const weight = entered.reduce((sum, [, itemWeight]) => sum + itemWeight, 0);
  return weight === 0 ? null : (entered.reduce((sum, [mark, itemWeight]) => sum + (mark! * itemWeight) / 100, 0) / weight) * 100;
}
```

Implement `parseStored3BB4GradeState` with the same finite 0–100 mark and exact-array-length validation pattern used in `src/lib/grade-calculator.ts`. For a missed assessment without a final mark, insert `null` rather than its old mark so it is excluded.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `npm test -- src/lib/3bb4-grade-calculator.test.ts`

Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/3bb4-grade-calculator.ts src/lib/3bb4-grade-calculator.test.ts
git commit -m "feat: add 3bb4 grade engine"
```

### Task 2: Add saved 3BB4 calculator interaction

**Files:**
- Create: `src/hooks/use-persistent-3bb4-grade-state.ts`
- Create: `src/hooks/use-persistent-3bb4-grade-state.test.tsx`
- Create: `src/components/3bb4-grade-calculator.tsx`
- Create: `src/components/3bb4-grade-calculator.test.tsx`

- [ ] **Step 1: Write failing persistence and UI tests**

```tsx
it("shows a current mark and saves MSAF state", async () => {
  render(<ThreeBB4GradeCalculator />);
  fireEvent.change(screen.getByLabelText("Assignment 1"), { target: { value: "85" } });
  fireEvent.change(screen.getByLabelText("Midterm"), { target: { value: "70" } });
  expect(screen.getByTestId("3bb4-current-grade")).toHaveTextContent("75.0%");
  fireEvent.click(screen.getByLabelText("MSAF Assignment 2"));
  await waitFor(() => expect(JSON.parse(localStorage.getItem(THREE_BB4_GRADE_STORAGE_KEY) ?? "null").missedAssignments[1]).toBe(true));
});

it("restores saved 3BB4 marks after remounting", async () => {
  const first = render(<ThreeBB4GradeCalculator />);
  fireEvent.change(screen.getByLabelText("Final exam"), { target: { value: "80" } });
  first.unmount();
  render(<ThreeBB4GradeCalculator />);
  await waitFor(() => expect(screen.getByLabelText("Final exam")).toHaveValue(80));
});
```

- [ ] **Step 2: Run focused UI tests to verify they fail**

Run: `npm test -- src/components/3bb4-grade-calculator.test.tsx src/hooks/use-persistent-3bb4-grade-state.test.tsx`

Expected: FAIL because the hook and component do not exist.

- [ ] **Step 3: Implement browser persistence and calculator UI**

```tsx
export function ThreeBB4GradeCalculator() {
  const [state, setState] = usePersistent3BB4GradeState();
  const current = useMemo(() => calculate3BB4Grade(state), [state]);
  const updateAssignment = (index: number, mark: ThreeBB4Mark) =>
    setState((currentState) => ({
      ...currentState,
      assignments: currentState.assignments.map((value, itemIndex) => itemIndex === index ? mark : value),
    }));
  const toggleMissedAssignment = (index: number) =>
    setState((currentState) => {
      const missed = !currentState.missedAssignments[index];
      return {
        ...currentState,
        assignments: currentState.assignments.map((value, itemIndex) => itemIndex === index && missed ? null : value),
        missedAssignments: currentState.missedAssignments.map((value, itemIndex) => itemIndex === index ? missed : value),
      };
    });
  return (
    <section className="grade-calculator" aria-label="3BB4 grade calculator">
      <section className="grade-result" aria-label="3BB4 grade results" aria-live="polite">
        <span className="grade-result__label">Current</span>
        <strong data-testid="3bb4-current-grade">{current === null ? "—" : `${current.toFixed(1)}%`}</strong>
      </section>
      <div className="assessment-groups">
        <AssessmentGroup title="Assignments" rule="30% · 10% each">
          {state.assignments.map((mark, index) => (
            <div className="midterm-field" key={`assignment-${index + 1}`}>
              <MarkInput disabled={state.missedAssignments[index]} label={`Assignment ${index + 1}`} value={mark} onChange={(value) => updateAssignment(index, value)} />
              <label className="missed-control"><input aria-label={`MSAF Assignment ${index + 1}`} checked={state.missedAssignments[index]} onChange={() => toggleMissedAssignment(index)} type="checkbox" /><span>MSAF</span></label>
            </div>
          ))}
        </AssessmentGroup>
        <AssessmentGroup title="Midterm" rule="20%"><div className="midterm-field"><MarkInput disabled={state.missedMidterm} label="Midterm" value={state.midterm} onChange={(midterm) => setState((currentState) => ({ ...currentState, midterm }))} /><label className="missed-control"><input aria-label="MSAF Midterm" checked={state.missedMidterm} onChange={() => setState((currentState) => ({ ...currentState, midterm: null, missedMidterm: !currentState.missedMidterm }))} type="checkbox" /><span>MSAF</span></label></div></AssessmentGroup>
        <AssessmentGroup title="Final exam" rule="50%"><MarkInput label="Final exam" value={state.finalExam} onChange={(finalExam) => setState((currentState) => ({ ...currentState, finalExam }))} /></AssessmentGroup>
      </div>
    </section>
  );
}
```

Use `useEffect` to restore only after hydration and save only after restoration, matching the existing 2Z03 hook. MSAF controls disable and clear their related mark, named `MSAF Assignment N` and `MSAF Midterm`; do not add extra explanatory copy.

- [ ] **Step 4: Run focused UI tests to verify they pass**

Run: `npm test -- src/components/3bb4-grade-calculator.test.tsx src/hooks/use-persistent-3bb4-grade-state.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/use-persistent-3bb4-grade-state.ts src/hooks/use-persistent-3bb4-grade-state.test.tsx src/components/3bb4-grade-calculator.tsx src/components/3bb4-grade-calculator.test.tsx
git commit -m "feat: add saved 3bb4 calculator"
```

### Task 3: Define 3BB4 task data and isolate checklist storage

**Files:**
- Create: `src/lib/3bb4-tasks.ts`
- Create: `src/lib/3bb4-tasks.test.ts`
- Modify: `src/hooks/use-persistent-task-completions.ts`
- Modify: `src/hooks/use-persistent-task-completions.test.tsx`
- Modify: `src/components/tasks-table.tsx`

- [ ] **Step 1: Write failing data and key-parameter tests**

```ts
it("contains three assignments, a midterm, final, and eighteen undated lectures", () => {
  expect(threeBB4Tasks).toHaveLength(23);
  expect(threeBB4Tasks.filter((task) => task.type === "Lecture")).toHaveLength(18);
  expect(threeBB4Tasks.filter((task) => task.date === "TBD")).toHaveLength(22);
  expect(threeBB4Tasks.find((task) => task.id === "midterm")).toMatchObject({
    date: "Week of Oct 19–23 · 20:00",
  });
});
```

```tsx
function Harness() {
  const { completed, toggle } = usePersistentTaskCompletions("test:tasks:v1", ["task-1"]);
  return <button onClick={() => toggle("task-1")}>{completed["task-1"] ? "done" : "open"}</button>;
}
```

- [ ] **Step 2: Run focused tests to verify they fail**

Run: `npm test -- src/lib/3bb4-tasks.test.ts src/hooks/use-persistent-task-completions.test.tsx`

Expected: FAIL because the task module and storage-key argument do not exist.

- [ ] **Step 3: Implement task data and key parameter**

```ts
export const THREE_BB4_TASK_COMPLETION_STORAGE_KEY = "courses-summary:3bb4:tasks:v1";
export const threeBB4Tasks: readonly CourseTask[] = [
  ...[1, 2, 3].map((number) => ({ id: `assignment-${number}`, type: "Assignment" as const, name: `Assignment ${number}`, date: "TBD", sortOrder: number })),
  { id: "midterm", type: "Midterm", name: "Midterm", date: "Week of Oct 19–23 · 20:00", sortOrder: 4 },
  { id: "final-exam", type: "Exam", name: "Final Exam", date: "TBD", sortOrder: 5 },
  ...Array.from({ length: 18 }, (_, index) => ({ id: `lecture-${index + 1}`, type: "Lecture" as const, name: `Lecture ${index + 1}`, date: "TBD", sortOrder: index + 6 })),
];
```

Change the hook signature to `usePersistentTaskCompletions(storageKey: string, taskIds: readonly string[])`, and replace both uses of `TASK_COMPLETION_STORAGE_KEY` within it with `storageKey`. Update `TasksTable` to pass `TASK_COMPLETION_STORAGE_KEY` explicitly. Preserve corrupt-data handling and allowed-ID filtering.

- [ ] **Step 4: Run focused tests to verify they pass**

Run: `npm test -- src/lib/3bb4-tasks.test.ts src/hooks/use-persistent-task-completions.test.tsx src/components/tasks-table.test.tsx`

Expected: PASS with unchanged 2Z03 table coverage.

- [ ] **Step 5: Commit**

```bash
git add src/lib/3bb4-tasks.ts src/lib/3bb4-tasks.test.ts src/hooks/use-persistent-task-completions.ts src/hooks/use-persistent-task-completions.test.tsx src/components/tasks-table.tsx
git commit -m "feat: add isolated 3bb4 task data"
```

### Task 4: Render the 3BB4 Tasks view and wire course selection

**Files:**
- Create: `src/components/3bb4-tasks-table.tsx`
- Create: `src/components/3bb4-tasks-table.test.tsx`
- Modify: `src/components/course-content.tsx`
- Modify: `src/components/grade-calculator.test.tsx`

- [ ] **Step 1: Write failing table and selection tests**

```tsx
it("renders 23 3BB4 tasks and persists completion", async () => {
  render(<ThreeBB4TasksTable />);
  expect(screen.getAllByRole("row")).toHaveLength(24);
  fireEvent.click(screen.getByRole("button", { name: "Mark Lecture 18 completed" }));
  await waitFor(() => expect(localStorage.getItem(THREE_BB4_TASK_COMPLETION_STORAGE_KEY)).toContain('"lecture-18":true'));
});

it("selects 3BB4 content without changing 2Z03", () => {
  const view = render(<CourseContent course="3BB4" section="syllabus" />);
  expect(screen.getByRole("region", { name: "3BB4 grade calculator" })).toBeInTheDocument();
  view.rerender(<CourseContent course="3BB4" section="lectures" />);
  expect(screen.getByRole("region", { name: "3BB4 Tasks" })).toBeInTheDocument();
  view.rerender(<CourseContent course="2Z03" section="syllabus" />);
  expect(screen.getByRole("region", { name: "Grade calculator" })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run focused tests to verify they fail**

Run: `npm test -- src/components/3bb4-tasks-table.test.tsx src/components/grade-calculator.test.tsx`

Expected: FAIL because the 3BB4 table and content routing do not exist.

- [ ] **Step 3: Implement table and course switch**

```tsx
export function ThreeBB4TasksTable() {
  const { completed, toggle } = usePersistentTaskCompletions(
    THREE_BB4_TASK_COMPLETION_STORAGE_KEY,
    threeBB4Tasks.map((task) => task.id),
  );
  return (
    <main className="course-content" aria-label="Course content">
      <section className="tasks-table" aria-label="3BB4 Tasks">
        <table><thead><tr><th scope="col">Type</th><th scope="col">Name</th><th scope="col">Date</th><th scope="col">Checklist</th></tr></thead>
          <tbody>{threeBB4Tasks.map((task) => { const isCompleted = completed[task.id] === true; return <tr key={task.id}><td>{task.type}</td><td>{task.name}</td><td>{task.date}</td><td><button aria-label={`Mark ${task.name} ${isCompleted ? "incomplete" : "completed"}`} className={isCompleted ? "task-toggle task-toggle--completed" : "task-toggle"} onClick={() => toggle(task.id)} type="button">{isCompleted ? "Completed" : "Incomplete"}</button></td></tr>; })}</tbody>
        </table>
      </section>
    </main>
  );
}
```

Use this small semantic table directly rather than adding a shared abstraction. Add these selection branches before the generic blank fallback:

```tsx
if (course === "3BB4" && section === "syllabus") return <ThreeBB4GradeCalculator />;
if (course === "3BB4" && section === "lectures") return <ThreeBB4TasksTable />;
```

- [ ] **Step 4: Run focused tests to verify they pass**

Run: `npm test -- src/components/3bb4-tasks-table.test.tsx src/components/grade-calculator.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/3bb4-tasks-table.tsx src/components/3bb4-tasks-table.test.tsx src/components/course-content.tsx src/components/grade-calculator.test.tsx
git commit -m "feat: show 3bb4 calculator and tasks"
```

### Task 5: Record scope, verify, and publish

**Files:**
- Modify: `scope.md`
- Create: `docs/ai/tasks/2026-09-13-3bb4-calculator-tasks.md`
- Modify: `docs/ai/tasks/ACTIVE.md`

- [ ] **Step 1: Write the active-task record**

```markdown
# Task: Build and publish 3BB4 calculator and Tasks

- Status: ACTIVE
- Opened: 2026-09-13

## Objective

Add isolated, persisted 3BB4 Syllabus and Tasks views without changing 2Z03.
```

- [ ] **Step 2: Update project memory and scope**

Replace planned 3BB4 module entries in `scope.md` with exact created paths, storage keys, and producer/consumer edges. Link the task from `ACTIVE.md` while work is active.

- [ ] **Step 3: Run verification**

Run: `npm test -- --run && npm run build`

Expected: all Vitest files pass and the static GitHub Pages export completes.

- [ ] **Step 4: Launch a local browser verification via `run-local-host`**

Run the approved local-host workflow, then verify `?course=3BB4&section=syllabus` accepts a mark, MSAF disables its input, and values persist after refresh. Verify `?course=3BB4&section=lectures` has 23 data rows and a saved checklist button; confirm the 2Z03 Syllabus and Tasks views remain present.

- [ ] **Step 5: Commit, merge, publish, and record evidence**

```bash
git add scope.md docs/ai/tasks
git commit -m "docs: record 3bb4 calculator and tasks verification"
git push origin master
```

After the GitHub Actions Pages run succeeds, inspect the live 3BB4 views, update the task to `COMPLETE` with the workflow URL/run, test/build/browser evidence, and commit/push that documentation checkpoint.
