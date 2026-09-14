# 2Z03 Grade Calculator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-unlimited:subagent-driven-development (recommended) or superpowers-unlimited:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a saved, current-weight 2Z03 grade calculator with Scheme I/II comparison and publish the static Next.js site to GitHub Pages.

**Architecture:** Pure TypeScript owns the grading contract and calculations; a focused client hook owns versioned browser persistence; React components render fixed assessment inputs and results only for 2Z03 Syllabus. The route reads query parameters in a client shell so Next.js can statically export the site, while a GitHub Actions workflow tests, builds, and deploys `out/`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS, localStorage, Vitest, Testing Library, GitHub Actions, GitHub Pages

---

## File Map

- `src/lib/grade-calculator.ts`: grade-state types, validation, best-of rules, schemes, normalization.
- `src/lib/grade-calculator.test.ts`: pure calculation and storage-shape tests.
- `src/hooks/use-persistent-grade-state.ts`: browser restore/save lifecycle.
- `src/hooks/use-persistent-grade-state.test.tsx`: persistence behavior.
- `src/components/mark-input.tsx`: one percentage field with local invalid draft handling.
- `src/components/assessment-group.tsx`: compact group layout.
- `src/components/grade-calculator.tsx`: state updates, groups, missed toggles, result panel.
- `src/components/grade-calculator.test.tsx`: user-visible calculator behavior.
- `src/components/course-content.tsx`: calculator visibility boundary.
- `src/components/course-shell.tsx`: client query-state shell for static export.
- `src/components/tab-navigation.tsx`: switch anchors to Next.js links for base-path support.
- `src/app/page.tsx`: static Suspense boundary.
- `src/app/globals.css`: calculator and responsive presentation.
- `next.config.ts`: static export and CI-provided base path.
- `.github/workflows/deploy-pages.yml`: Pages build/deploy automation.

### Task 1: Implement the pure grading engine with TDD

**Files:**
- Create: `src/lib/grade-calculator.test.ts`
- Create: `src/lib/grade-calculator.ts`

- [ ] **Step 1: Write failing tests for normalization, best-of rules, schemes, and missed tests**

Define tests around this public API:

```ts
import {
  calculateGrades,
  createEmptyGradeState,
  parseStoredGradeState,
} from "./grade-calculator";

it("calculates 74.9% from an 85 assignment and 70 midterm", () => {
  const state = createEmptyGradeState();
  state.assignments[0] = 85;
  state.midterms[0] = 70;
  expect(calculateGrades(state).schemeOne).toBeCloseTo(74.8649, 4);
});

it("keeps the best five assignments and best four labs", () => {
  const state = createEmptyGradeState();
  state.assignments = [100, 90, 80, 70, 60, 10];
  state.labs = [100, 80, 60, 40, 0];
  expect(calculateGrades(state).schemeOne).toBeCloseTo(76.1538, 4);
});

it("counts an explicit zero but excludes blank work", () => {
  const state = createEmptyGradeState();
  state.assignments[0] = 0;
  state.assignments[1] = 100;
  expect(calculateGrades(state).schemeOne).toBe(50);
});

it("uses the final exam for lower and missed midterms in scheme two", () => {
  const state = createEmptyGradeState();
  state.midterms = [50, 90];
  state.missedMidterms = [false, true];
  state.finalExam = 80;
  const grades = calculateGrades(state);
  expect(grades.schemeOne).toBeCloseTo(75.082, 3);
  expect(grades.schemeTwo).toBe(80);
  expect(grades.current).toBe(80);
});

it("does not expose scheme two before a final mark exists", () => {
  expect(calculateGrades(createEmptyGradeState()).schemeTwo).toBeNull();
});

it("rejects corrupt or incompatible saved state", () => {
  expect(parseStoredGradeState('{"version":2}')).toBeNull();
  expect(parseStoredGradeState("not-json")).toBeNull();
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `npm test -- src/lib/grade-calculator.test.ts`  
Expected: FAIL because `grade-calculator.ts` does not exist.

- [ ] **Step 3: Implement the typed state and formulas**

Use this contract:

```ts
export const GRADE_STORAGE_KEY = "courses-summary:2z03:grades:v1";

export type Mark = number | null;
export type GradeState = {
  version: 1;
  assignments: Mark[];
  labs: Mark[];
  midterms: Mark[];
  missedMidterms: boolean[];
  finalExam: Mark;
};

export type GradeResult = {
  current: number | null;
  schemeOne: number | null;
  schemeTwo: number | null;
};
```

`createEmptyGradeState()` returns arrays of lengths 6, 5, 2, and 2. Validation accepts only
`null` or finite values from 0 through 100 and exact array lengths/version. `parseStoredGradeState`
catches JSON errors and returns `null` on any mismatch.

For each category, sort entered marks descending and retain at most its count. Accumulate weighted
points as `mark * weight / 100`, track completed weight, and normalize with
`points / completedWeight * 100`. Assignment item weight is 4.8, lab item weight is 3.75,
midterm item weight is 10, and final base weight is 41. Scheme I excludes unfinished work and uses
the final mark for a missed midterm only after the final exists. Scheme II is `null` without a
final; otherwise each entered lower midterm and each missed midterm uses the final mark. `current`
is the higher available scheme.

- [ ] **Step 4: Run focused and full tests**

Run: `npm test -- src/lib/grade-calculator.test.ts && npm test`  
Expected: all grade-engine tests and the existing five tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/grade-calculator.ts src/lib/grade-calculator.test.ts
git commit -m "feat: add 2z03 grading engine"
```

### Task 2: Add versioned browser persistence with TDD

**Files:**
- Create: `src/hooks/use-persistent-grade-state.test.tsx`
- Create: `src/hooks/use-persistent-grade-state.ts`

- [ ] **Step 1: Write failing hook tests**

Use a harness that exposes the state and an update button. Test that the hook starts empty, restores
a valid object from `GRADE_STORAGE_KEY`, falls back on corrupt JSON, and writes the complete v1
object after an update. Clear `localStorage` before every test.

```tsx
function Harness() {
  const [state, setState] = usePersistentGradeState();
  return (
    <>
      <output>{state.assignments[0] ?? "empty"}</output>
      <button onClick={() => setState((value) => ({
        ...value,
        assignments: value.assignments.map((mark, index) => index === 0 ? 85 : mark),
      }))}>Set mark</button>
    </>
  );
}
```

- [ ] **Step 2: Run and confirm RED**

Run: `npm test -- src/hooks/use-persistent-grade-state.test.tsx`  
Expected: FAIL because the hook module does not exist.

- [ ] **Step 3: Implement restore/save lifecycle**

The client hook initializes with `createEmptyGradeState()`, restores once in `useEffect`, and saves
subsequent state changes with `localStorage.setItem(GRADE_STORAGE_KEY, JSON.stringify(state))`.
Guard the first save so it cannot overwrite a valid stored object before restoration. Catch storage
read/write failures and keep the in-memory calculator usable.

- [ ] **Step 4: Run focused and full tests, then commit**

Run: `npm test -- src/hooks/use-persistent-grade-state.test.tsx && npm test`  
Expected: all hook and existing tests pass.

```bash
git add src/hooks
git commit -m "feat: persist 2z03 marks locally"
```

### Task 3: Build the calculator interface with TDD

**Files:**
- Create: `src/components/grade-calculator.test.tsx`
- Create: `src/components/mark-input.tsx`
- Create: `src/components/assessment-group.tsx`
- Create: `src/components/grade-calculator.tsx`
- Create: `src/components/course-content.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Write failing user-visible behavior tests**

Render `GradeCalculator`, enter `85` in Assignment 1 and `70` in Midterm 1, and assert `74.9%` is
shown as Scheme I/current while Scheme II shows `—`. Enter `80` in Final exam and assert Scheme II
updates. Toggle Midterm 2 as missed and assert its input disables. Remount and assert entered marks
restore. Render `CourseContent` for each relevant selection and assert the calculator exists only
for 2Z03 Syllabus.

- [ ] **Step 2: Run and confirm RED**

Run: `npm test -- src/components/grade-calculator.test.tsx`  
Expected: FAIL because the calculator components do not exist.

- [ ] **Step 3: Implement the focused components**

`MarkInput` uses `type="number"`, `inputMode="decimal"`, `min="0"`, `max="100"`, and `step="any"`.
It keeps the visible string locally so invalid drafts remain visible with `aria-invalid="true"` but
calls `onChange` only for empty or valid values. `AssessmentGroup` renders a heading, compact rule
label, and responsive field grid.

`GradeCalculator` uses the persistence hook and immutable array replacement helpers. It renders
exactly 6 assignment fields, 5 lab fields, 2 midterm fields with `Missed` checkboxes, and 1 final
field. Its result live region formats non-null grades to one decimal place and renders:

```tsx
<section className="grade-result" aria-live="polite">
  <span>Current</span>
  <strong>{formatGrade(grades.current)}</strong>
  <div className="scheme-results">
    <span>Scheme I <b>{formatGrade(grades.schemeOne)}</b></span>
    <span className="scheme-result--muted">Scheme II <b>{formatGrade(grades.schemeTwo)}</b></span>
  </div>
</section>
```

`CourseContent` renders `<GradeCalculator />` only when `course === "2Z03" && section ===
"syllabus"`; otherwise it renders `EmptySection`.

- [ ] **Step 4: Add restrained responsive styles**

Extend the existing burgundy/cream visual system with a centered calculator max width, white
category panels, compact two/three-column field grids, simple bordered inputs, a prominent result
card, visibly muted Scheme II, and a single-column breakpoint at 720 px. Do not add explanatory
copy, icons, charts, or animation.

- [ ] **Step 5: Run focused/full tests and commit**

Run: `npm test -- src/components/grade-calculator.test.tsx && npm test`  
Expected: all calculator and existing tests pass.

```bash
git add src/components src/app/globals.css
git commit -m "feat: add saved 2z03 grade calculator"
```

### Task 4: Make navigation statically exportable with TDD

**Files:**
- Create: `src/components/course-shell.test.tsx`
- Create: `src/components/course-shell.tsx`
- Modify: `src/components/tab-navigation.tsx`
- Modify: `src/app/page.tsx`
- Modify: `next.config.ts`

- [ ] **Step 1: Write a failing course-shell test**

Mock `next/navigation` so `useSearchParams()` returns 2Z03 + syllabus; assert the calculator is
visible. Return 2DA4 + syllabus and assert only the blank `main` landmark appears. Retain the
existing header test to verify selection-preserving URLs.

- [ ] **Step 2: Run and confirm RED**

Run: `npm test -- src/components/course-shell.test.tsx`  
Expected: FAIL because `course-shell.tsx` does not exist.

- [ ] **Step 3: Implement the client shell and static page**

`CourseShell` is a client component that reads `useSearchParams()`, passes its entries to
`resolveSelection`, and renders `CourseHeader` plus `CourseContent`. Replace raw anchors in
`TabNavigation` with `next/link` so configured base paths are applied. `page.tsx` becomes:

```tsx
import { Suspense } from "react";
import { CourseShell } from "@/components/course-shell";
import { EmptySection } from "@/components/empty-section";

export default function HomePage() {
  return (
    <Suspense fallback={<EmptySection />}>
      <CourseShell />
    </Suspense>
  );
}
```

- [ ] **Step 4: Configure static export and repository base path**

Keep the existing Turbopack root and add:

```ts
output: "export",
trailingSlash: true,
basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
```

- [ ] **Step 5: Verify tests and static output**

Run: `npm test && npm run build && test -s out/index.html`  
Expected: all tests pass, build exits 0, and `out/index.html` exists.

- [ ] **Step 6: Commit**

```bash
git add src/components/course-shell.tsx src/components/course-shell.test.tsx src/components/tab-navigation.tsx src/app/page.tsx next.config.ts
git commit -m "feat: support static course navigation"
```

### Task 5: Add and verify the GitHub Pages workflow

**Files:**
- Create: `.github/workflows/deploy-pages.yml`
- Modify: `.gitignore`

- [ ] **Step 1: Add the static output ignore**

Add `out/` to `.gitignore`.

- [ ] **Step 2: Create the Pages workflow**

The workflow triggers on pushes to `master` and `workflow_dispatch`, grants `contents: read`,
`pages: write`, and `id-token: write`, and allows one `pages` deployment at a time. Its build job
uses `actions/checkout@v4`, `actions/setup-node@v4` with Node 22/npm cache,
`actions/configure-pages@v5`, `npm ci`, `npm test`, and `npm run build`. Set
`NEXT_PUBLIC_BASE_PATH` to `/${{ github.event.repository.name }}` unless the repository name ends
with `.github.io`, where it is empty. Upload `out/` with `actions/upload-pages-artifact@v4`. A
dependent deploy job uses the `github-pages` environment and `actions/deploy-pages@v4`.

- [ ] **Step 3: Validate workflow and export locally**

Run:

```bash
npm test
NEXT_PUBLIC_BASE_PATH=/courses-summary npm run build
test -s out/index.html
rg -n "/courses-summary/_next/" out/index.html
```

Expected: tests/build pass, export exists, and generated asset URLs include the project base path.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/deploy-pages.yml .gitignore
git commit -m "ci: deploy static site to github pages"
```

### Task 6: Visual and persistence verification

**Files:**
- Modify only if verification exposes a defect, using a new failing test first.

- [ ] **Step 1: Start through `$run-local-host`**

Stop only the project server launched in session `10320`, then invoke `$run-local-host` from the
implementation worktree. Confirm the selected loopback port and ownership.

- [ ] **Step 2: Verify calculator behavior in the browser**

Open `/?course=2Z03&section=syllabus`. Enter Assignment 1 = 85 and Midterm 1 = 70; confirm Current
and Scheme I show 74.9%, Scheme II is muted and shows `—`, and refresh preserves both inputs. Enter
a final mark and verify Scheme II appears. Check a missed midterm, best-of category behavior,
keyboard focus, and no console errors.

- [ ] **Step 3: Verify isolation and responsive layout**

Confirm 2Z03 Lectures, 2DA4 Syllabus, and 3BB4 Syllabus remain blank. At 390 px, confirm all inputs
and results fit without horizontal overflow.

- [ ] **Step 4: Run full verification and commit any test-driven corrections**

Run: `npm test && npm run build && test -s out/index.html && git diff --check`  
Expected: all commands exit 0.

### Task 7: Publish and verify GitHub Pages

**Files:**
- Update: `scope.md`
- Update: `docs/ai/current-state.md`
- Update: `docs/ai/source-register.md`
- Update: `docs/ai/tasks/ACTIVE.md`
- Update: `docs/ai/tasks/2026-09-11-2z03-grade-calculator.md`

- [ ] **Step 1: Confirm the imminent public GitHub write**

Report that publication will create a public repository named `courses-summary`, push the full Git
history, enable GitHub Pages, and run the deployment workflow. Obtain action-time confirmation if
the GitHub tooling requires it or if repository visibility was not explicitly approved.

- [ ] **Step 2: Verify GitHub CLI identity without exposing credentials**

Run: `gh auth status && gh api user --jq .login`  
Expected: an authenticated username; do not print tokens.

- [ ] **Step 3: Create and push the repository**

Run: `gh repo create courses-summary --public --source=. --remote=origin --push`  
Expected: `origin` exists and `master` is pushed. If the name already exists, stop and ask rather
than modifying an unrelated repository.

- [ ] **Step 4: Enable Pages and follow deployment**

```bash
repo_slug=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
gh api --method POST "repos/$repo_slug/pages" -f build_type=workflow
gh run list --workflow deploy-pages.yml --limit 1
```

If Pages already exists, inspect it and update only its build type when safe. Wait for the exact
workflow run to complete, then inspect its conclusion and deployment URL.

- [ ] **Step 5: Verify the live site**

Open the returned Pages URL and confirm the Courses header, all tabs, 2Z03 calculator, saved-value
behavior, base-path assets, and blank non-2Z03 views. Check for console errors and horizontal
overflow.

- [ ] **Step 6: Close durable project state**

Record the GitHub owner/repository, visibility, Pages URL, workflow run, final test/build/browser
evidence, commits, and exact resume action. Mark the task complete only after the live URL works;
then change `docs/ai/tasks/ACTIVE.md` to `No active or blocked tasks.` Commit and push the final
checkpoint.
