# Repository Operating Instructions

Before starting or resuming work in this repository, read these files in order:

1. `docs/runbooks/recovery-checkpoint.md`
2. `docs/runbooks/development-execution-policy.md`
3. `docs/runbooks/development-roadmap.md`
4. the task-specific batch, audit, or remediation document

Follow `development-execution-policy.md` for branch, commit, validation, merge, publication, and production-verification behavior.

Repository checks are the normal merge gate. Publication completion is required only for an explicit production-verification task.

Never write canonical data directly to `main`. Never mix canonical records with candidates, monitoring output, private notes, or temporary files.
