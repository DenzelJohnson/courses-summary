# 2DA4 Two-Week Labs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-unlimited:subagent-driven-development (recommended) or superpowers-unlimited:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct every 2DA4 lab task to show both attended weeks while preserving checklist state and accurate timeline behavior.

**Architecture:** Update the existing static task-data contract only. Keep stable lab IDs and first-week sort positions, but use each second week as the timeline anchor because completion spans both weeks.

**Tech Stack:** TypeScript, Vitest, React Testing Library, Next.js 16 static export

---

### Task 1: Correct the 2DA4 lab schedule contract

**Files:**
- Modify: `src/lib/2da4-tasks.test.ts`
- Modify: `src/lib/2da4-tasks.ts`

- [ ] **Step 1: Write the failing test**

Assert that Labs 1–5 have exact two-week labels, retain their first-week `sortOrder`, and use the
second week for `calendarDate`.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- --run src/lib/2da4-tasks.test.ts`

Expected: FAIL because the current rows show only one week and anchor the first week.

- [ ] **Step 3: Write the minimal implementation**

Replace each lab's Date text and `calendarDate` with the two-week schedule from the approved design.
Keep IDs, names, task types, and first-week `sortOrder` unchanged.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `npm test -- --run src/lib/2da4-tasks.test.ts`

Expected: PASS.

### Task 2: Verify rendering and document the delivered state

**Files:**
- Modify: `docs/ai/current-state.md`
- Modify: `docs/ai/tasks/2026-09-27-2da4-two-week-labs.md`
- Modify: `docs/ai/tasks/ACTIVE.md`

- [ ] **Step 1: Run component and full verification**

Run: `npm test -- --run src/components/2da4-tasks-table.test.tsx`

Run: `npm test -- --run`

Run: `npm run build`

Expected: all commands exit successfully with no failures.

- [ ] **Step 2: Update project memory**

Record the exact two-week lab schedule, passing test/build evidence, delivery commit, and Pages
deployment result. Remove this task from `ACTIVE.md` after publication verification.

- [ ] **Step 3: Review, integrate, and publish**

Review the diff against the design, merge to `master`, push to the already-authorized GitHub
repository, wait for the Pages workflow, and verify the live 2DA4 Tasks view.
