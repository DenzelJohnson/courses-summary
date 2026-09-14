# 2Z03 Grade Calculator Design

**Date:** 2026-09-11  
**Status:** Approved in conversation; awaiting written-spec review

## Objective

Replace the blank 2Z03 Syllabus content with a simple grade calculator. It accepts individual
marks for six assignments, five computer labs, two midterms, and the final exam; saves every mark
in the current browser; reports the current grade from completed work; compares Grading Schemes I
and II; and deploys as a static site on GitHub Pages. Every other course/section stays blank.

## Interface

The existing course header remains unchanged. The 2Z03 Syllabus content contains one compact
calculator with four groups:

- **Assignments · 24% · best 5 of 6** — Assignment 1 through Assignment 6.
- **Computer labs · 15% · best 4 of 5** — Lab 1 through Lab 5.
- **Midterms · 20% · 10% each** — Midterm 1 and Midterm 2, each with a mark field and a small
  `Missed` control.
- **Final exam · 41%** — one mark field.

Inputs accept percentages from 0 through 100, including decimals. Empty means not completed;
entering `0` means completed with a zero. Invalid text is not saved or included.

The result area uses minimal labels:

```text
Current
74.9%

Scheme I  74.9%     Scheme II  —
```

Scheme II is visually muted and shows an em dash until a final-exam mark exists. Once available,
both scheme marks appear and `Current` displays the higher value. No explanatory paragraphs,
projections, charts, letter grades, or motivational text appear.

## Grade Rules

The user-supplied syllabus screenshot is the authority for weights and missed-work policy. The
user confirmed that Scheme II replaces a midterm mark with the final-exam mark when the latter is
higher.

### Category Contributions

- Assignments: keep the highest five entered marks. Each retained assignment represents 4.8%.
  Before five are entered, every entered assignment contributes 4.8% to completed weight. A sixth
  entered assignment causes the lowest of the six to be excluded.
- Computer labs: keep the highest four entered marks. Each retained lab represents 3.75%. Before
  four are entered, every entered lab contributes 3.75% to completed weight. A fifth entered lab
  causes the lowest of the five to be excluded.
- Midterms: each entered midterm represents 10%.
- Final exam: an entered final represents 41%, plus 10% for each midterm marked missed.

### Current Grade

Current grade is the sum of earned weighted points divided by the sum of completed weights, then
multiplied by 100. Blank future work is excluded rather than treated as zero. For example, an 85%
assignment and a 70% first midterm produce `(85 × 4.8 + 70 × 10) ÷ 14.8 = 74.9%`.

### Scheme I

Scheme I uses every entered retained assignment/lab mark, every entered non-missed midterm mark,
and the final exam. A missed midterm contributes no completed weight until the final is entered;
then its 10% transfers to the final exam.

### Scheme II

Scheme II is available only after a final-exam mark is entered. It uses the same assignment/lab
rules and weights. For each entered midterm below the final-exam mark, the final-exam mark replaces
that midterm mark. A missed midterm is also represented by the final-exam mark. The higher of the
normalized Scheme I and Scheme II results is displayed as `Current`.

### Missed Work

- A blank assignment/lab is merely unfinished and is excluded from current grade.
- The best-five/best-four calculation naturally makes one missed or MSAF assignment/lab the
  excluded lowest item; no extra MSAF control is needed for those groups.
- One missed midterm transfers 10% to the final; both missed midterms transfer 20%, making the
  final worth 51% or 61% respectively once entered.

## Persistence

A versioned state object is stored in `localStorage` after every valid edit or missed-toggle
change and restored on the next visit. The storage key is `courses-summary:2z03:grades:v1`.
Persistence is limited to the current browser/device; no account, database, cookie, or network
sync is introduced. Corrupt or incompatible stored data is discarded safely and defaults to
empty fields.

## Component Architecture

- `GradeCalculator`: client component that restores/saves state and composes groups/results.
- `AssessmentGroup`: renders a category heading and its compact mark inputs.
- `MarkInput`: controlled percentage field with accessible label and validation.
- `grade-calculator.ts`: pure typed state, validation, best-of selection, scheme calculation, and
  normalized current-grade functions.
- `CourseContent`: renders the calculator only for 2Z03 + Syllabus and the existing blank landmark
  for the other eight selections.

The page becomes a statically exportable shell. Client-side URL selection preserves existing
bookmarkable `course` and `section` query parameters without requiring request-time server logic.

## GitHub Pages

Next.js uses `output: "export"`, generating the static site in `out/`. A GitHub Actions workflow
runs tests, builds the export, uploads `out/`, and deploys it through GitHub Pages. The workflow
derives the project base path from the repository name so assets and tab links work below
`/<repository>/`; a `username.github.io` repository uses the root path.

This follows the current official [Next.js static export guide](https://nextjs.org/docs/app/guides/static-exports)
and [GitHub Pages custom workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Publishing requires a GitHub repository and Pages configured to use GitHub Actions. Repository
creation, visibility, remote push, and Pages activation are external writes and will use the
GitHub identity and visibility approved by the user.

## Accessibility and Responsive Behavior

Every field has a visible label and numeric input mode. Keyboard focus remains visible. Result
updates are exposed through a polite live region. Groups form a responsive grid on wide screens
and a single column on narrow screens without horizontal overflow.

## Error Handling

Out-of-range values display the field as invalid and do not affect or overwrite the saved valid
state. Storage access failures leave the calculator usable for the current visit. Static export or
deployment failures stop the workflow before publishing.

## Testing and Acceptance Criteria

Automated tests verify:

1. Best five of six assignments and best four of five labs.
2. Completed-weight normalization and the 85 assignment / 70 midterm example yielding 74.9%.
3. Blank values excluded while an explicit zero is included.
4. Scheme II final-exam substitution and maximum-scheme selection.
5. One or two missed midterms shifting 10% or 20% to the final.
6. Scheme II remaining unavailable until a final mark exists.
7. State restoration, save-on-edit, invalid-storage fallback, and invalid-input behavior.
8. Calculator visibility only on 2Z03 Syllabus.
9. Static export creation and a successful GitHub Pages workflow configuration check.

Visual verification covers desktop and mobile layouts, input clarity, muted Scheme II state,
saved-value restoration, and unchanged blank states for the other course/section combinations.

## Out of Scope

- Content for 2DA4, 3BB4, Lectures, or Notes
- Required-final-grade projections or letter-grade conversion
- Cross-device synchronization, accounts, databases, or analytics
- Editing grading weights or adding assessment rows
