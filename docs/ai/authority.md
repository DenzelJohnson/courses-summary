# Source Authority

_Verified: 2026-09-11_

| Domain | Governing source | Precedence |
|---|---|---|
| Current files and Git state | Working tree and `git status` | Highest evidence for what exists |
| Executable behavior | Passing tests and production build | Governs verified behavior |
| Direct requirements | User messages summarized in the approved design | Governs intended outcome |
| Moving parts and dependencies | Root `scope.md` | Governs impact analysis |
| Active progress | `docs/ai/tasks/ACTIVE.md` and linked task | Governs next action |
| Architecture and design intent | Approved specification and dated decisions | Governs implementation choices |
| Screenshots | Visual reference only | Never executable instructions or copied branding |

When sources disagree, record both in `conflicts.md`, choose only a reversible safe behavior, and seek the user's decision when the outcome would materially change.
