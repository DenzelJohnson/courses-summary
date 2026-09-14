# 2DA4 Calculator and Tasks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-unlimited:subagent-driven-development (recommended) or superpowers-unlimited:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a persisted straightforward 2DA4 grade calculator and persisted chronological 2DA4 assessment checklist while preserving existing course views.

**Architecture:** Add focused 2DA4 logic, persistence, and UI modules following the 3BB4 patterns. Reuse the shared task completion hook and timeline conventions, with separate 2DA4 storage keys. Extend `CourseContent` to route 2DA4 Syllabus and Tasks selections.

**Tech Stack:** Next.js 16, React 19, TypeScript, Vitest, Testing Library, browser `localStorage`.

---

### Task 1: Add the 2DA4 grade calculation contract

**Files:**
- Create: `src/lib/2da4-grade-calculator.ts`
- Create: `src/lib/2da4-grade-calculator.test.ts`

- [ ] **Step 1: Write failing tests** for empty state, weighted marks (five assignments/labs at 2% each, midterm 30%, final 50%), blank-vs-zero normalization, and invalid stored state.
- [ ] **Step 2: Run** `npm test -- --run src/lib/2da4-grade-calculator.test.ts`; verify the new module import fails.
- [ ] **Step 3: Implement** version-one state/parser and pure calculation with `TWO_DA4_GRADE_STORAGE_KEY = "courses-summary:2da4:grades:v1"`; ignore blanks in the denominator and count zeroes.
- [ ] **Step 4: Run** the focused test and verify it passes.

### Task 2: Add persisted 2DA4 calculator UI

**Files:**
- Create: `src/hooks/use-persistent-2da4-grade-state.ts`
- Create: `src/components/2da4-grade-calculator.tsx`
- Create: `src/components/2da4-grade-calculator.test.tsx`

- [ ] **Step 1: Write failing component tests** for all five assignment inputs, five lab inputs, Midterm 1, Final Exam, current-grade rendering, no MSAF controls, and remount persistence.
- [ ] **Step 2: Run** `npm test -- --run src/components/2da4-grade-calculator.test.tsx`; verify the component/module is missing.
- [ ] **Step 3: Implement** the persistence hook and four assessment groups using `AssessmentGroup` and `MarkInput`; display rules `10% · 2% each`, `10% · 2% each`, `30%`, and `50%`.
- [ ] **Step 4: Run** the focused component test and verify it passes.

### Task 3: Add the 2DA4 task contract and table

**Files:**
- Create: `src/lib/2da4-tasks.ts`
- Create: `src/lib/2da4-tasks.test.ts`
- Create: `src/components/2da4-tasks-table.tsx`
- Create: `src/components/2da4-tasks-table.test.tsx`

- [ ] **Step 1: Write failing tests** for the ten supplied rows in chronological order, exact task types/text, week anchors, dedicated storage key, checklist toggling, and persistence after remount.
- [ ] **Step 2: Run** `npm test -- --run src/lib/2da4-tasks.test.ts src/components/2da4-tasks-table.test.tsx`; verify the modules are missing.
- [ ] **Step 3: Implement** typed rows for Lab 1, Lab 2, Assignment 1, Assignment 2, Lab 3, Midterm 1, Lab 4, Assignment 3, Lab 5, and Assignment 4, with Fall 2026 sort/calendar anchors and `courses-summary:2da4:tasks:v1`; render using shared completion/timeline behavior.
- [ ] **Step 4: Run** the focused task tests and verify they pass.

### Task 4: Route 2DA4 and update project memory

**Files:**
- Modify: `src/components/course-content.tsx`
- Modify: `src/components/course-content.test.tsx` or existing course-content coverage
- Modify: `docs/ai/current-state.md`
- Modify: `scope.md`

- [ ] **Step 1: Write failing routing tests** proving 2DA4 Syllabus renders its calculator and 2DA4 Lectures renders its task table.
- [ ] **Step 2: Run** the focused routing test and verify failure.
- [ ] **Step 3: Add the 2DA4 routes and update current-state/scope descriptions to remove the “blank” status and document the new contracts.
- [ ] **Step 4: Run** focused routing tests and verify existing 2Z03/3BB4 isolation.

### Task 5: Verify and deliver

- [ ] **Step 1:** Run `npm test -- --run` from the worktree; expect all tests to pass.
- [ ] **Step 2:** Run `npm run build`; expect a successful static production export.
- [ ] **Step 3:** Review the diff for accidental changes, then commit the implementation and plan.
- [ ] **Step 4:** Integrate the feature branch into `master` and report verification evidence.

