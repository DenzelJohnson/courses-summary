# 2DA4 Calculator and Tasks

## Scope

Add the 2DA4 saved weighted calculator and the 10-row assessment checklist requested by the user.
Assignments total 10%, labs total 10%, Midterm 1 is 30%, and the Final Exam is 50%. No MSAF or
alternate schemes are included.

## Status

Implementation and verification are complete. The feature is merged into local `master` as
`1124a60`.

## Evidence

- Pure calculator tests: 4 passing.
- Calculator component tests: 2 passing.
- Task data/table tests: 3 passing.
- 2DA4 route test: 1 passing.
- Full Vitest suite: 22 files, 60 tests passing.
- Next.js static production build: passing.

## Next action

Retry `git push origin master` after GitHub access to `DenzelJohnson/courses-summary` is restored;
the current attempt returned HTTP 403 (`Permission to DenzelJohnson/courses-summary.git denied to
denzel-johnson_gale`).
