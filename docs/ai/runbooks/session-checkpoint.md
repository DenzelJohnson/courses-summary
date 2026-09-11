# Session Checkpoint Runbook

Before a handoff, provider switch, compaction, token-limit risk, or stopping:

1. Read `tasks/ACTIVE.md` and update each linked task's status.
2. Record changed files and commits, focused/full test output, build status, and visual checks.
3. Record unresolved risks, blockers, assumptions, and any external state changed.
4. Update `current-state.md`, `source-register.md`, `conflicts.md`, and `scope.md` when their facts changed.
5. Write one exact next command or action that can be performed without chat history.
6. Confirm the task contains `Information only in chat: none`.
7. Run `git status --short --branch` and include the result in the checkpoint.
