# 2DA4 Separate Lab Parts Design

## Goal

Give every attended 2DA4 lab week its own saved checklist row.

## Design

Each of the five graded labs becomes two task rows named exactly `Lab N - Part 1` and
`Lab N - Part 2`. Each row displays one Monday date, retains the previously supplied 2:30–5:20 PM
time where known, and uses that same date for sorting and the purple timeline divider. Lab 3 keeps
its time unspecified because no time was supplied.

The ten task rows are:

- Lab 1 - Part 1 — Mon, Sep 21 · 14:30–17:20
- Lab 1 - Part 2 — Mon, Sep 28 · 14:30–17:20
- Lab 2 - Part 1 — Mon, Oct 5 · 14:30–17:20
- Lab 2 - Part 2 — Mon, Oct 19 · 14:30–17:20
- Lab 3 - Part 1 — Mon, Oct 26
- Lab 3 - Part 2 — Mon, Nov 2
- Lab 4 - Part 1 — Mon, Nov 9 · 14:30–17:20
- Lab 4 - Part 2 — Mon, Nov 16 · 14:30–17:20
- Lab 5 - Part 1 — Mon, Nov 23 · 14:30–17:20
- Lab 5 - Part 2 — Mon, Nov 30 · 14:30–17:20

Part 1 keeps the existing `lab-N` ID to preserve saved completion state. Part 2 uses
`lab-N-part-2`. This increases the 2DA4 Tasks list from 47 to 52 rows while leaving the calculator's
five lab marks and 10% total lab weight unchanged.

## Verification

Data tests will assert all ten IDs, names, exact dates, ordering, and timeline dates. Component tests
will assert 52 task rows, distinct buttons for both parts, inherited Part 1 completion, fresh Part 2
completion, 12-hour time rendering, and assessment styling. The full suite, production build,
independent review, deployment workflow, and live page will also be checked.
