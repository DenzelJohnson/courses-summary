# Task: Embed published course notes

- Status: COMPLETE
- Opened: 2026-09-13
- Updated: 2026-09-13

## Objective

Replace the blank Notes view for 2Z03, 2DA4, and 3BB4 with the matching read-only published
Google Doc.

## Scope

Included: publishing the three user-specified Docs to the web in Google Docs, a typed public URL
catalog, responsive iframe viewers, course-router selection, tests, GitHub Pages deployment, and
project-memory updates. Excluded: editable document access, Google API credentials, server-side
authentication, Drive synchronization, or changes to Syllabus and Tasks behavior.

## External Writes

The user authorized public read-only publication and confirmed the final Google Docs dialog for all
three named documents. Google Docs now publishes the following viewer sources:

- 2Z03: `2PACX-1vTPcjqEjkdf3KnqjxUyuRa6bqFgd7Cu2pK4NDW00KGFW7Wbkn5clI-nu_KSW8kjSLn3IN34Z8fJZ3nK`
- 2DA4: `2PACX-1vRhv5DGQ60uuzZTgA-6b0OUh4FEhZ1B7e1iY0N6aEYU3zebhaoLnAmXmyZY8Z5CMPqhOJBip-dUIhAh`
- 3BB4: `2PACX-1vTzW8evEt5CjYQUYniIiAQ-HcmK3g2q9VkSc2unLfI-VAn6moRMDhj7nKiN6OVDGoHVV7JaCZiWoQxQ`

## Current Checkpoint

Design: `docs/superpowers/specs/2026-09-13-course-notes-embeds-design.md`.
Plan: `docs/superpowers/plans/2026-09-13-course-notes-embeds.md`.
Automate Pipeline is authorized to choose routine implementation, review, integration, and Pages
publication steps without further approval checkpoints.

The public mapping is covered by a catalog test and the router tests every course's Notes iframe;
17 Vitest files / 50 tests and the static production build pass. Independent review found no
issues. Local and deployed browser checks confirm all three published Google Docs frames load at
their respective Notes URLs. The feature was merged and published on `master` as `f82c536`.
GitHub Pages workflow [34774933276](https://github.com/DenzelJohnson/courses-summary/actions/runs/34774933276)
succeeded on 2026-09-13.
