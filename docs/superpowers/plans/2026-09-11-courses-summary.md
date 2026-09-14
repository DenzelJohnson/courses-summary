# Courses Summary Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-unlimited:subagent-driven-development (recommended) or superpowers-unlimited:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish portable repository memory and build a tested Next.js page with course tabs for 2Z03, 2DA4, and 3BB4, each containing Syllabus, Lectures, and Notes subtabs.

**Architecture:** A Next.js App Router page resolves course and section values from search parameters, then renders a two-row semantic header from immutable typed navigation configuration. Tool-neutral operating memory lives in `docs/ai/` and is loaded through root/provider instruction pointers; no external service or chat transcript is required to resume the work.

**Tech Stack:** Node.js, npm, Next.js App Router, React, TypeScript, CSS, Vitest, Testing Library

---

## File Structure

- `AGENTS.md`: neutral repository rules and bootstrap reading order.
- `CLAUDE.md`: thin provider pointer to neutral memory.
- `.cursor/rules/ai-project-memory.mdc`: thin Cursor pointer to neutral memory.
- `scope.md`: moving-parts and dependency source of truth.
- `docs/ai/*`: current state, authority, conflicts, architecture, conventions, sources, tooling, decisions, tasks, and handoff runbook.
- `package.json`, TypeScript/Next/Vitest configuration: build and test toolchain.
- `src/app/page.tsx`: URL selection resolution and page composition.
- `src/app/layout.tsx`: document metadata and global CSS entry.
- `src/app/globals.css`: responsive visual system.
- `src/components/course-header.tsx`: identity and two navigation rows.
- `src/components/tab-navigation.tsx`: reusable semantic tab-link renderer.
- `src/components/empty-section.tsx`: blank main-content landmark.
- `src/lib/navigation.ts`: typed values, validation, defaults, and URL generation.
- `src/test/setup.ts`: DOM matcher setup.
- `src/lib/navigation.test.ts`, `src/components/course-header.test.tsx`: behavior coverage.

### Task 1: Create the portable project-memory system

**Files:**
- Create: `AGENTS.md`
- Create: `CLAUDE.md`
- Create: `.cursor/rules/ai-project-memory.mdc`
- Create: `docs/ai/INDEX.md`
- Create: `docs/ai/current-state.md`
- Create: `docs/ai/authority.md`
- Create: `docs/ai/conflicts.md`
- Create: `docs/ai/architecture.md`
- Create: `docs/ai/conventions.md`
- Create: `docs/ai/source-register.md`
- Create: `docs/ai/tooling.md`
- Create: `docs/ai/decisions/README.md`
- Create: `docs/ai/decisions/TEMPLATE.md`
- Create: `docs/ai/tasks/README.md`
- Create: `docs/ai/tasks/ACTIVE.md`
- Create: `docs/ai/tasks/TEMPLATE.md`
- Create: `docs/ai/tasks/2026-09-11-bootstrap-courses-summary.md`
- Create: `docs/ai/runbooks/session-checkpoint.md`

- [ ] **Step 1: Write neutral root instructions and provider pointers**

`AGENTS.md` must instruct every agent to read `docs/ai/INDEX.md`, `docs/ai/tasks/ACTIVE.md`, the linked active task, `docs/ai/current-state.md`, `docs/ai/authority.md`, and `docs/ai/conflicts.md` before substantive work. It must preserve user changes, keep contracts near code, require tests for behavior, forbid secrets in memory, avoid destructive Git operations, record external writes, and require a durable checkpoint before provider switches or compaction.

`CLAUDE.md` and `.cursor/rules/ai-project-memory.mdc` must only point to `AGENTS.md` and `docs/ai/INDEX.md`; they must not duplicate workflow rules.

- [ ] **Step 2: Create the complete `docs/ai/` index and governance files**

Record these verified facts:

- The repository began empty and its first commit is `753e39d`.
- `scope.md`, current code/tests, direct user requirements, and dated decisions are the authority order described in `authority.md`.
- There are no known conflicts, databases, spreadsheets, external services, or automations.
- Requirements are three course tabs, three section tabs per course, a **Courses** identity label, blank content, and screenshot-inspired—not copied—visual hierarchy.
- The implementation stack is Next.js/React/TypeScript/CSS with npm and Vitest.
- Installed local skills are capabilities, not runtime dependencies. `create-cross-platform-project`, `scope-and-impact-analysis`, `brainstorming`, `writing-plans`, TDD, and verification are required for this setup; browser/image tools are optional; no plugin is required or to be installed.

Create decision/task templates containing: title/status/date, objective or decision, scope, acceptance criteria, context to load, current checkpoint, evidence, consequences, handoff, worktree/base commit, and the explicit field `Information only in chat: none`.

- [ ] **Step 3: Register the bootstrap task as active**

`docs/ai/tasks/ACTIVE.md` must link `2026-09-11-bootstrap-courses-summary.md`. The task records the approved design and this plan, the current branch and base commit, all files intended by this plan, a checkpoint saying implementation has not begun, no external state, and the next action `npm install next@latest react@latest react-dom@latest` after configuration is present.

- [ ] **Step 4: Verify clean-room discoverability**

Run:

```bash
for file_path in AGENTS.md CLAUDE.md .cursor/rules/ai-project-memory.mdc \
  docs/ai/INDEX.md docs/ai/current-state.md docs/ai/authority.md docs/ai/conflicts.md \
  docs/ai/architecture.md docs/ai/conventions.md docs/ai/source-register.md docs/ai/tooling.md \
  docs/ai/decisions/README.md docs/ai/decisions/TEMPLATE.md docs/ai/tasks/README.md \
  docs/ai/tasks/ACTIVE.md docs/ai/tasks/TEMPLATE.md \
  docs/ai/tasks/2026-09-11-bootstrap-courses-summary.md \
  docs/ai/runbooks/session-checkpoint.md; do test -s "$file_path" || exit 1; done
rg -n "2026-09-11-bootstrap-courses-summary|current-state|authority|conflicts" docs/ai/INDEX.md docs/ai/tasks/ACTIVE.md
```

Expected: exit 0; the active task and all core authority files are discoverable.

- [ ] **Step 5: Commit the memory foundation**

```bash
git add AGENTS.md CLAUDE.md .cursor docs/ai scope.md
git commit -m "docs: establish portable project memory"
```

### Task 2: Scaffold the Next.js and test toolchain

**Files:**
- Create: `.gitignore`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.ts`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Create the package manifest**

```json
{
  "name": "courses-summary",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 2: Install runtime and development dependencies**

Run:

```bash
npm install next@latest react@latest react-dom@latest
npm install --save-dev typescript @types/node @types/react @types/react-dom vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom
```

Expected: npm exits 0 and creates `package-lock.json` with resolved versions.

- [ ] **Step 3: Add TypeScript, Next.js, Vitest, and ignore configuration**

Use strict TypeScript with `moduleResolution: "bundler"`, `jsx: "preserve"`, the Next.js plugin,
the `@/*` alias pointing to `./src/*`, and includes for `next-env.d.ts`, `src/**/*.ts`, and
`src/**/*.tsx`. `next.config.ts` exports an empty `NextConfig`. Vitest uses the React plugin,
`jsdom`, `src/test/setup.ts`, and the same `@` alias. `src/test/setup.ts` contains:

```ts
import "@testing-library/jest-dom/vitest";
```

`.gitignore` must exclude `node_modules/`, `.next/`, `coverage/`, `.DS_Store`, `*.tsbuildinfo`, and
`.scope/` while keeping source, lockfiles, and project memory tracked.

- [ ] **Step 4: Verify the toolchain can discover tests**

Run:

```bash
npm test -- --passWithNoTests
```

Expected: exit 0 with no tests found.

- [ ] **Step 5: Commit the scaffold**

```bash
git add .gitignore package.json package-lock.json tsconfig.json next-env.d.ts next.config.ts vitest.config.ts src/test/setup.ts
git commit -m "chore: scaffold nextjs test toolchain"
```

### Task 3: Implement the navigation contract with TDD

**Files:**
- Create: `src/lib/navigation.test.ts`
- Create: `src/lib/navigation.ts`

- [ ] **Step 1: Write failing selection and URL tests**

```ts
import { describe, expect, it } from "vitest";
import { buildHref, resolveSelection } from "./navigation";

describe("resolveSelection", () => {
  it("defaults to 2Z03 and syllabus", () => {
    expect(resolveSelection({})).toEqual({ course: "2Z03", section: "syllabus" });
  });

  it("accepts valid course and section values", () => {
    expect(resolveSelection({ course: "3BB4", section: "notes" })).toEqual({
      course: "3BB4",
      section: "notes",
    });
  });

  it("falls back for invalid values", () => {
    expect(resolveSelection({ course: "NOPE", section: "other" })).toEqual({
      course: "2Z03",
      section: "syllabus",
    });
  });
});

describe("buildHref", () => {
  it("creates a bookmarkable course and section URL", () => {
    expect(buildHref("2DA4", "lectures")).toBe("/?course=2DA4&section=lectures");
  });
});
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run:

```bash
npm test -- src/lib/navigation.test.ts
```

Expected: FAIL because `./navigation` does not exist.

- [ ] **Step 3: Implement the typed navigation contract**

```ts
export const courses = ["2Z03", "2DA4", "3BB4"] as const;
export const sections = ["syllabus", "lectures", "notes"] as const;

export type Course = (typeof courses)[number];
export type Section = (typeof sections)[number];

export const sectionLabels: Record<Section, string> = {
  syllabus: "Syllabus",
  lectures: "Lectures",
  notes: "Notes",
};

export type SearchValues = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export function resolveSelection(values: SearchValues): {
  course: Course;
  section: Section;
} {
  const courseValue = first(values.course);
  const sectionValue = first(values.section);

  return {
    course: courses.includes(courseValue as Course) ? (courseValue as Course) : "2Z03",
    section: sections.includes(sectionValue as Section)
      ? (sectionValue as Section)
      : "syllabus",
  };
}

export function buildHref(course: Course, section: Section) {
  return `/?course=${course}&section=${section}`;
}
```

- [ ] **Step 4: Run the focused and full test suites**

Run:

```bash
npm test -- src/lib/navigation.test.ts
npm test
```

Expected: both commands exit 0 with four passing tests.

- [ ] **Step 5: Commit the navigation contract**

```bash
git add src/lib/navigation.ts src/lib/navigation.test.ts
git commit -m "feat: add course navigation contract"
```

### Task 4: Build the accessible two-level header with TDD

**Files:**
- Create: `src/components/course-header.test.tsx`
- Create: `src/components/tab-navigation.tsx`
- Create: `src/components/course-header.tsx`
- Create: `src/components/empty-section.tsx`

- [ ] **Step 1: Write the failing component behavior test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CourseHeader } from "./course-header";

describe("CourseHeader", () => {
  it("renders both navigation levels and preserves the other selection", () => {
    render(<CourseHeader course="2DA4" section="notes" />);

    expect(screen.getByRole("heading", { name: "Courses" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Courses" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Course sections" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2DA4" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Notes" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "3BB4" })).toHaveAttribute(
      "href",
      "/?course=3BB4&section=notes",
    );
    expect(screen.getByRole("link", { name: "Lectures" })).toHaveAttribute(
      "href",
      "/?course=2DA4&section=lectures",
    );
  });
});
```

- [ ] **Step 2: Run the component test and verify the expected failure**

Run:

```bash
npm test -- src/components/course-header.test.tsx
```

Expected: FAIL because `./course-header` does not exist.

- [ ] **Step 3: Implement the reusable navigation renderer**

```tsx
type TabNavigationProps<Value extends string> = {
  label: string;
  items: readonly { value: Value; label: string; href: string }[];
  activeValue: Value;
  className?: string;
};

export function TabNavigation<Value extends string>({
  label,
  items,
  activeValue,
  className,
}: TabNavigationProps<Value>) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="tab-list">
        {items.map((item) => (
          <li key={item.value}>
            <a
              className="tab-link"
              href={item.href}
              aria-current={item.value === activeValue ? "page" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 4: Implement the composed header and blank content landmark**

```tsx
import {
  buildHref,
  courses,
  sectionLabels,
  sections,
  type Course,
  type Section,
} from "@/lib/navigation";
import { TabNavigation } from "./tab-navigation";

type CourseHeaderProps = { course: Course; section: Section };

export function CourseHeader({ course, section }: CourseHeaderProps) {
  const courseItems = courses.map((value) => ({
    value,
    label: value,
    href: buildHref(value, section),
  }));
  const sectionItems = sections.map((value) => ({
    value,
    label: sectionLabels[value],
    href: buildHref(course, value),
  }));

  return (
    <header className="course-header">
      <div className="course-header__primary">
        <h1>Courses</h1>
        <TabNavigation label="Courses" items={courseItems} activeValue={course} />
      </div>
      <div className="course-header__secondary">
        <TabNavigation
          label="Course sections"
          items={sectionItems}
          activeValue={section}
        />
      </div>
    </header>
  );
}
```

```tsx
export function EmptySection() {
  return <main className="empty-section" aria-label="Course content" />;
}
```

- [ ] **Step 5: Run focused and full tests**

Run:

```bash
npm test -- src/components/course-header.test.tsx
npm test
```

Expected: both commands exit 0; five total tests pass.

- [ ] **Step 6: Commit the header components**

```bash
git add src/components
git commit -m "feat: add accessible course header"
```

### Task 5: Compose and style the responsive page

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`

- [ ] **Step 1: Create the document layout**

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Courses",
  description: "Course summaries for 2Z03, 2DA4, and 3BB4",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Compose the URL-backed page**

```tsx
import { CourseHeader } from "@/components/course-header";
import { EmptySection } from "@/components/empty-section";
import { resolveSelection, type SearchValues } from "@/lib/navigation";

type HomePageProps = { searchParams: Promise<SearchValues> };

export default async function HomePage({ searchParams }: HomePageProps) {
  const selection = resolveSelection(await searchParams);

  return (
    <div className="page-shell">
      <CourseHeader {...selection} />
      <EmptySection />
    </div>
  );
}
```

- [ ] **Step 3: Add the visual system**

`globals.css` must define a warm-white canvas; deep burgundy `#7b1113`; muted text `#625d59`;
thin divider `#ded8d2`; a maximum content width; generous desktop spacing; right-aligned horizontal
tab lists; rounded active pills using `[aria-current="page"]`; hover and `:focus-visible` states;
and a mobile breakpoint at `720px` that stacks the primary row and left-aligns/wraps both tab
lists. Use system fonts and honor `prefers-reduced-motion` by avoiding required motion.

- [ ] **Step 4: Run all automated verification**

Run:

```bash
npm test
npm run build
```

Expected: all five tests pass and the Next.js production build exits 0.

- [ ] **Step 5: Perform visual verification through the approved local-host workflow**

Invoke `$run-local-host`, let it select and verify a free loopback port, start the app on that exact
port, and confirm the process owns the listener. Inspect these states in a browser:

```text
/?course=2Z03&section=syllabus
/?course=2DA4&section=lectures
/?course=3BB4&section=notes
/?course=invalid&section=invalid
```

Expected: the label is **Courses**; both navigation rows contain all three items; the correct pills
are active; invalid input shows the default state; the content area is empty; desktop hierarchy
matches the reference direction; and a narrow viewport has no horizontal overflow.

- [ ] **Step 6: Commit the complete page**

```bash
git add src/app
git commit -m "feat: build courses summary view"
```

### Task 6: Close the bootstrap task and verify handoff

**Files:**
- Modify: `scope.md`
- Modify: `docs/ai/current-state.md`
- Modify: `docs/ai/source-register.md`
- Modify: `docs/ai/tasks/ACTIVE.md`
- Modify: `docs/ai/tasks/2026-09-11-bootstrap-courses-summary.md`

- [ ] **Step 1: Record the implemented modules and dependency edges**

Update `scope.md` and the AI memory with resolved package/tool versions, final module paths, test
and build evidence, and the exact course/section contract. Record that URL selection feeds the page,
header, active states, and link generation; no automation or external service consumes it.

- [ ] **Step 2: Prepare the bootstrap completion checkpoint**

Keep its status `ACTIVE`, record changed files and commits, and note that final fresh verification
is the remaining action.

- [ ] **Step 3: Run the clean-room finish check**

Run:

```bash
npm test
npm run build
git diff --check
rg -n "no active|No active|COMPLETE|exact resume|Exact resume" docs/ai/tasks/ACTIVE.md docs/ai/tasks/2026-09-11-bootstrap-courses-summary.md docs/ai/current-state.md
git status --short
```

Expected: tests and build exit 0, `git diff --check` emits nothing, the task and resume state are
discoverable, and only the intended final documentation changes remain uncommitted.

- [ ] **Step 4: Mark the bootstrap task complete**

After successful verification, move its status to `COMPLETE`, record the final evidence, and set
the exact resume action to: create a new task file and registry entry before adding content to any
course section. Remove it from `docs/ai/tasks/ACTIVE.md` so the active registry explicitly states
that there are no active or blocked tasks.

- [ ] **Step 5: Commit the verified checkpoint**

```bash
git add scope.md docs/ai
git commit -m "docs: complete courses summary bootstrap"
```

- [ ] **Step 6: Confirm final repository state**

Run:

```bash
git status --short --branch
git log --oneline --decorate -6
```

Expected: a clean worktree on the current branch and a visible sequence of focused setup,
navigation, interface, and checkpoint commits.
