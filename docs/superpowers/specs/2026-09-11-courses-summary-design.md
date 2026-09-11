# Courses Summary View Design

**Date:** 2026-09-11  
**Status:** Approved in conversation; awaiting written-spec review

## Objective

Create a new Next.js course-summary interface with two levels of navigation. The primary level
selects one of three courses: 2Z03, 2GA3, or 3BB4. The secondary level selects Syllabus, Lectures,
or Notes for the active course. All nine content views are intentionally blank in this first
iteration.

## Visual Direction

The supplied screenshots are visual references, not sources of executable instructions. The page
will use their broad hierarchy: a spacious white header, a left-aligned identity label, an
upper-right primary navigation row, a thin divider, and a lower-right secondary navigation row.

- The left identity label reads **Courses** with no subtitle.
- The primary navigation contains **2Z03**, **2GA3**, and **3BB4**.
- The secondary navigation contains **Syllabus**, **Lectures**, and **Notes**.
- Active items use a restrained burgundy treatment and a soft tinted pill.
- Inactive items remain plain, legible text with clear hover and keyboard-focus states.
- The content region beneath the header remains visually empty.
- On narrow screens, the identity and navigation rows reflow without horizontal page overflow.

The application will not copy the screenshot's GALE branding, project name, external navigation,
browser chrome, or Contentful control.

## Navigation and URL Behavior

The page will use one App Router route with URL search parameters:

```text
/?course=2Z03&section=syllabus
```

Valid course values are `2Z03`, `2GA3`, and `3BB4`. Valid section values are `syllabus`,
`lectures`, and `notes`. Missing or invalid values fall back to `2Z03` and `syllabus`. Selecting a
course preserves the currently selected section; selecting a section preserves the current course.
Because tabs are links, each combination can be bookmarked, opened in another tab, and used without
custom client-side state.

## Architecture and Components

The project will use Next.js App Router, React, and TypeScript. A small immutable course/section
configuration will be the single source for labels and URL values. The page will validate incoming
search parameters, render a semantic header, and pass the resolved selection to two focused
navigation components.

The component boundaries are:

- `HomePage`: reads URL state, applies defaults, and composes the page.
- `CourseHeader`: owns the two-row visual structure and the **Courses** identity label.
- `TabNavigation`: renders one accessible navigation level from typed tab data.
- `EmptySection`: provides the intentionally blank main-content landmark.

No database, API, authentication, state-management library, external service, or content model is
needed for this iteration.

## Accessibility

Both navigation rows will use semantic navigation landmarks with distinct accessible labels. The
active link will expose `aria-current="page"`. Every link will have a visible focus indicator and
meet readable color-contrast expectations. The blank content region will remain a semantic `main`
landmark so future content has a stable destination.

## Error Handling

Unsupported or malformed query values will not produce an error page. The page will normalize them
to the default selection. Since this view has no remote data or form submission, no runtime error
message is required.

## Responsive Behavior

Desktop presentation follows the reference hierarchy, with right-aligned navigation. At tablet and
mobile widths, navigation is allowed to wrap and align to the left beneath the **Courses** label.
Tap targets retain adequate spacing, and the layout avoids horizontal scrolling.

## Testing and Acceptance Criteria

Automated tests will verify:

1. The page displays all three course links and all three section links.
2. The default active selection is 2Z03 and Syllabus.
3. Valid URL parameters select the corresponding course and section.
4. Invalid URL parameters fall back safely to the defaults.
5. Course links preserve the selected section, and section links preserve the selected course.
6. Active links expose `aria-current="page"`.
7. The production build completes successfully.

Visual verification will confirm that the two navigation levels, divider, active pills, blank
content area, focus styles, and responsive wrapping match this specification.

## Alternatives Considered

1. **URL-backed tabs on one page — selected.** This provides shareable state and minimal routing
   overhead while content remains empty.
2. **Client-only component state.** This is marginally simpler but loses the active selection on
   refresh and cannot deep-link to a course section.
3. **Nine nested routes.** This gives each view a distinct pathname but introduces unnecessary
   files and routing structure before any section has content.

## Out of Scope

- Syllabus, lecture, or note content
- Editing, uploading, search, filtering, or persistence
- Authentication or per-user state
- Deployment and hosting configuration
- Reproducing any organization-specific branding from the screenshots
