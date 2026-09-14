# 3BB4 Tutorials and Task-Time Display Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-unlimited:subagent-driven-development (recommended) or superpowers-unlimited:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Fall 2026 3BB4 Tuesday tutorial schedule and display all task-table times in 12-hour AM/PM notation.

**Architecture:** Extend the typed 3BB4 task data with generated tutorial rows. Introduce a pure task-date formatter and use it in all three existing task-table components, leaving stored schedule strings, sort order, and calendar anchors intact.

**Tech Stack:** TypeScript, React, Vitest, Next.js static export.

---

### Task 1: Define tutorial rows and human-readable time formatting

**Files:**
- Create: `src/lib/task-date.ts`
- Create: `src/lib/task-date.test.ts`
- Modify: `src/lib/3bb4-tasks.ts`
- Modify: `src/lib/3bb4-tasks.test.ts`

- [ ] **Step 1: Write failing tests** for 12 Tuesday tutorials (Sep 15–Dec 8 excluding Oct 13) and time conversions such as `23:59` to `11:59 PM`.
- [ ] **Step 2: Run** focused tests and verify tutorial/formatter assertions fail.
- [ ] **Step 3: Implement** tutorial task definitions and `formatTaskDate`.
- [ ] **Step 4: Run** focused tests and verify they pass.

### Task 2: Render formatted dates in every task table

**Files:**
- Modify: `src/components/tasks-table.tsx`
- Modify: `src/components/2da4-tasks-table.tsx`
- Modify: `src/components/3bb4-tasks-table.tsx`
- Modify: `src/components/2da4-tasks-table.test.tsx`
- Modify: `src/components/3bb4-tasks-table.test.tsx`

- [ ] **Step 1: Write failing table tests** for an AM/PM date and a visible 3BB4 tutorial.
- [ ] **Step 2: Run** focused component tests and verify failure.
- [ ] **Step 3: Use** `formatTaskDate` in every Date cell.
- [ ] **Step 4: Run** focused component tests and verify they pass.

### Task 3: Verify and deliver

- [ ] **Step 1: Update** `docs/ai/current-state.md` and the active task record with the 12 tutorials and 12-hour display contract.
- [ ] **Step 2: Run** the full Vitest suite and `npm run build`.
- [ ] **Step 3: Review** the diff, commit, merge into `master`, push, and verify GitHub Pages deployment.
- [ ] **Step 4: Add** the 15 approved Notion Calendar events manually, after immediate action-time confirmation, and visibly verify them.
