# Repository Instructions

Before substantive work, read these sources in order:

1. `docs/ai/INDEX.md`
2. `docs/ai/tasks/ACTIVE.md`
3. Every task linked as active or blocked
4. `docs/ai/current-state.md`
5. `docs/ai/authority.md`
6. `docs/ai/conflicts.md`

## Working Rules

- Preserve user-authored and unrelated changes. Never use destructive Git commands without direct authorization.
- Keep application contracts near the code that enforces them; keep cross-project state, tasks, decisions, and handoffs in `docs/ai/`.
- Update `scope.md` in the same change as a moving part or dependency edge.
- Write a failing automated test before production behavior, then verify the focused and full suites.
- Before launching any local listener, use the environment's approved local-host workflow, verify a free loopback port, and confirm process ownership.
- Do not store secrets, tokens, credentials, private endpoints, or personal account identifiers in repository memory.
- Record material external writes and their result in the active task. Do not alter external accounts or install plugins unless the user asks.
- Before a provider switch, handoff, compaction, or token-limit risk, update the active task with changed files, evidence, risks, external state, and the exact next action.
- Treat current Git state and executable tests as stronger evidence than historical prose. Record conflicts rather than silently choosing a side.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
