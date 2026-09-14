# 2DA4 Calculator and Tasks

## Scope

Add the 2DA4 saved weighted calculator and the 10-row assessment checklist requested by the user.
Assignments total 10%, labs total 10%, Midterm 1 is 30%, and the Final Exam is 50%. No MSAF or
alternate schemes are included. The Tasks table has 37 Monday/Wednesday/Friday lectures from
September 9 through December 9, excluding October 12–18, plus the original 10 assessments.

## Status

Implementation and verification are complete. The feature is merged into local `master`; the latest
wording correction is `78b2bd5`. The lecture-schedule change is implemented in the
`codex/2da4-lectures` worktree and has passed full verification; it is ready for integration and deployment.

## Evidence

- Pure calculator tests: 4 passing.
- Calculator component tests: 2 passing.
- Task data/table tests: 3 passing.
- 2DA4 route test: 1 passing.
- Full Vitest suite: 22 files, 60 tests passing.
- Next.js static production build: passing.
- Lecture schedule: 37 dated rows, Oct 12–18 excluded, and 61 total tests passing.

## Next action

Merge the lecture-schedule branch into `master`, push it using the active `DenzelJohnson` GitHub
account, and verify the Pages workflow.
