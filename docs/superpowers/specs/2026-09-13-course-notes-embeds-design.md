# Course Notes Embeds Design

## Goal

Show the selected course's Google Doc directly in every Notes view as a read-only, responsive
mirror of its published Google Docs page.

## Chosen approach

Each specified Google Doc is published through Google Docs' **Publish to the web** control. The
application renders the resulting public URL with `?embedded=true` in a native iframe. This is the
only approach that works in the static GitHub Pages app without sending a viewer to Google sign-in
or adding an account-authentication backend.

The viewer uses no extra visible copy, buttons, or editable source links. Google owns the document
content and refreshes the published version independently; the site owns only the three public
viewer URLs and the frame presentation.

## Data and rendering contract

`src/lib/course-notes.ts` will export a `CourseNotes` record keyed by the existing `Course` union.
Each entry contains a public `embedUrl` and accessible iframe title. It is the sole producer of
course-specific viewer data.

`NotesViewer` will consume one course key and render one titled iframe. `CourseContent` will select
the viewer whenever `section === "notes"`, before the course-specific Syllabus and Tasks branches.
The existing Syllabus, Tasks, navigation, storage, and query-string contracts do not change.

Published sources:

- 2Z03: `https://docs.google.com/document/d/e/2PACX-1vTPcjqEjkdf3KnqjxUyuRa6bqFgd7Cu2pK4NDW00KGFW7Wbkn5clI-nu_KSW8kjSLn3IN34Z8fJZ3nK/pub?embedded=true`
- 2DA4: `https://docs.google.com/document/d/e/2PACX-1vRhv5DGQ60uuzZTgA-6b0OUh4FEhZ1B7e1iY0N6aEYU3zebhaoLnAmXmyZY8Z5CMPqhOJBip-dUIhAh/pub?embedded=true`
- 3BB4: `https://docs.google.com/document/d/e/2PACX-1vTzW8evEt5CjYQUYniIiAQ-HcmK3g2q9VkSc2unLfI-VAn6moRMDhj7nKiN6OVDGoHVV7JaCZiWoQxQ/pub?embedded=true`

## Presentation and accessibility

The iframe fills the available content region with no card chrome, reserves a viewport-sized
height before load, and adapts on narrow screens. A unique `title` names the course notes for
screen readers. It loads eagerly because it is the complete Notes screen.

## Verification

Unit tests will assert the complete public mapping and verify that each Notes selection renders
the matching iframe while non-Notes selections retain their existing content. The full Vitest suite
and static build must pass. Local and deployed browser checks will verify that all three Google
Docs frames visibly load in their respective Notes views.
