# Course Notes Embeds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-unlimited:subagent-driven-development (recommended) or superpowers-unlimited:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the matching published Google Doc in each course's Notes view.

**Architecture:** A typed catalog maps each existing `Course` value to a public Google Docs embed
URL. A small presentational component consumes that catalog; the existing course-content router
selects it for every `notes` section without changing other views.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS, Vitest, Testing Library.

---

### Task 1: Define the public notes catalog

**Files:**

- Create: `src/lib/course-notes.ts`
- Create: `src/lib/course-notes.test.ts`
- Modify: `scope.md`
- Create: `docs/ai/tasks/2026-09-13-course-notes-embeds.md`
- Modify: `docs/ai/tasks/ACTIVE.md`

- [ ] **Step 1: Write the failing catalog test**

```ts
import { describe, expect, it } from "vitest";
import { courseNotes } from "./course-notes";

describe("courseNotes", () => {
  it("maps every course to a public Google Docs embed URL", () => {
    expect(courseNotes["2Z03"].embedUrl).toContain("2PACX-1vTPcjq");
    expect(courseNotes["2GA3"].embedUrl).toContain("2PACX-1vRhv5D");
    expect(courseNotes["3BB4"].embedUrl).toContain("2PACX-1vTzW8e");
    expect(Object.values(courseNotes).every(({ embedUrl }) => embedUrl.endsWith("?embedded=true"))).toBe(true);
  });
});
```

- [ ] **Step 2: Run `npm test -- src/lib/course-notes.test.ts` and verify it fails because the catalog module is absent.**

- [ ] **Step 3: Add the typed `CourseNotes` record with the exact three URLs in `docs/superpowers/specs/2026-09-13-course-notes-embeds-design.md`.**

- [ ] **Step 4: Update `scope.md` and the active task record.** Record that Google Docs publishes and refreshes the public content; no project automation consumes the URLs.

- [ ] **Step 5: Run `npm test -- src/lib/course-notes.test.ts` and verify the catalog test passes.**

- [ ] **Step 6: Commit with `git commit -m "feat: add course notes catalog"`.**

### Task 2: Render responsive Notes viewers

**Files:**

- Create: `src/components/notes-viewer.tsx`
- Modify: `src/components/course-content.tsx`
- Modify: `src/components/grade-calculator.test.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add failing router assertions.** Render `CourseContent` with each course and `section="notes"`; assert an iframe titled `<course> notes` uses the corresponding published URL and the prior empty main landmark is absent.

- [ ] **Step 2: Run `npm test -- src/components/grade-calculator.test.tsx` and verify the Notes assertions fail because the router returns `EmptySection`.**

- [ ] **Step 3: Create `NotesViewer`.** It accepts `{ course: Course }`, reads `courseNotes[course]`, and returns:

```tsx
<main className="notes-viewer" aria-label="Course notes">
  <iframe className="notes-viewer__frame" src={notes.embedUrl} title={notes.title} />
</main>
```

- [ ] **Step 4: Update `CourseContent`.** Return `<NotesViewer course={course} />` when `section === "notes"`, before existing 2Z03 and 3BB4 conditions.

- [ ] **Step 5: Add CSS.** Use existing responsive content gutters, `width: 100%`, no border, and a `min-height` based on `100dvh` so the iframe has a stable full-page viewer size before it loads. Do not add visible text or controls.

- [ ] **Step 6: Run `npm test -- src/components/grade-calculator.test.tsx` and verify original and new assertions pass.**

- [ ] **Step 7: Commit with `git commit -m "feat: embed course notes"`.**

### Task 3: Verify and publish

**Files:**

- Modify: `docs/ai/tasks/2026-09-13-course-notes-embeds.md`
- Modify: `docs/ai/current-state.md`
- Modify: `docs/ai/tasks/ACTIVE.md`

- [ ] **Step 1: Run `npm test -- --run && npm run build`.** Expect every Vitest file and the static export to pass.

- [ ] **Step 2: Request a read-only review against the branch base and resolve every Critical or Important finding.**

- [ ] **Step 3: Start the app with `run-local-host`; inspect `/?course=2Z03&section=notes`, `/?course=2GA3&section=notes`, and `/?course=3BB4&section=notes`.** Expect a course-specific published Google Doc in each responsive viewer.

- [ ] **Step 4: Merge the reviewed branch to `master`, rerun the complete test/build command, push, wait for the GitHub Pages workflow, and inspect all three live Notes views.**

- [ ] **Step 5: Mark the active task COMPLETE with test/build/review/deployment evidence, update `current-state.md`, clear `ACTIVE.md`, commit, push, and remove the owned feature worktree.**

## Plan self-review

- Spec coverage: Tasks 1 and 2 cover the three public sources, routing, accessibility, and frame presentation; Task 3 covers verification, deployment, and durable project memory.
- Placeholder scan: no unresolved product decision or implementation placeholder remains.
- Type consistency: `CourseNotes`, `courseNotes`, `NotesViewer`, and `Course` are used consistently in every task.
