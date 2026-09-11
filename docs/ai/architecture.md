# Architecture

_Updated: 2026-09-11_

- `src/app/`: Next.js route composition, metadata, and global presentation.
- `src/components/`: focused React interface units.
- `src/lib/`: typed course/section contract, validation, and URL creation.
- `src/test/`: shared test environment setup.
- `docs/superpowers/`: approved design and executable implementation plan.
- `docs/ai/`: tool-neutral project state, decisions, tasks, and handoffs.
- `scope.md`: inventory of moving parts and dependency edges.

Search parameters are the persistence boundary for selection state. No database, API, or external service is part of the architecture.
