# Development Execution Policy

Status: active operating rule

## Purpose

Keep implementation work moving independently from publication timing while preserving review, validation, and production safety.

This document must be read before starting or resuming any development PR.

## Source of truth

Development decisions are based on:

1. the current `main` branch
2. open pull requests and their diffs
3. canonical JSON
4. GitHub Actions results
5. the live recovery checkpoint

A deployment status, preview URL, old commit SHA, local artifact, or copied count must not replace those sources.

## Standard PR flow

Use this sequence for every bounded task:

1. read current `main`, open PRs, and the recovery checkpoint
2. read the relevant roadmap, batch scope, and this policy
3. inspect canonical files before assigning IDs or counts
4. finish the intended change set before writing where practical
5. create one branch for one bounded task
6. keep commits consolidated and avoid incremental placeholder writes
7. open the PR only after the intended implementation is substantially complete
8. use GitHub Actions as the normal merge gate
9. merge after the required checks pass
10. continue to the next development task without waiting for publication unless the task is an explicit production-verification gate

## Commit discipline

Prefer:

```text
one bounded task
one branch
one implementation commit
one optional follow-up fix commit
one squash merge
```

Do not add temporary files merely to confirm a branch, trigger a build, or probe repository state.

Do not merge:

- placeholder files
- no-op commits
- temporary diagnostics
- branch-check markers
- generated files that are meant to be recreated during build
- write-enabled workflows that are not part of the reviewed task

## Validation gates

The normal merge gate is repository validation.

Required checks depend on the task but may include:

```text
npm run check
npm run validate:data
npm run audit:first-ten
npm run public:build
npm run build
npm run public:check
npm run dist:check
```

A PR must not be merged merely because a remote preview rendered successfully.

A PR may be merged without waiting for a remote deployment when:

- its required GitHub checks have passed
- the diff has been reviewed
- canonical safety rules are satisfied
- production verification is assigned to a later explicit gate

## Publication policy

Publication is a separate delivery step, not the default development gate.

Rules:

- production publication originates from `main`
- branch previews are not required for ordinary data, validation, script, or documentation work
- use a dedicated preview only when visual behavior, routing, headers, or environment-specific behavior cannot be verified adequately in repository checks
- do not repeatedly poll publication status during ordinary PR work
- verify production at defined release, migration, routing, metadata, or remediation checkpoints

## Change-class policy

### Documentation-only changes

Run the relevant repository checks. A remote preview is not required unless the documentation is rendered into the public site.

### Canonical data changes

Require canonical validation, reference checks, public-data generation, and consistency checks. Production is verified at the next defined publication gate unless the PR changes a live route or public contract.

### Build and validator changes

Require controlled success and failure cases. Verify the final build artifact in CI.

### UI changes

Use repository checks first. Use a preview only when visual inspection is necessary.

### Routing, headers, metadata, and redirects

Require repository checks before merge and production verification at the next explicit production gate.

### Release or remediation closure

Require direct production verification and a recorded audit result.

## Build-trigger policy

Deployment configuration should avoid publication work for changes that do not affect the public application.

Paths that normally affect the public build include:

```text
src/**
public/**
data/**
scripts/**
config/**
astro.config.mjs
package.json
package-lock.json
tsconfig.json
```

Internal planning, staging, monitoring, and recovery documents should not trigger public publication unless the application imports them.

## Concurrent work

Multiple bounded PRs may be prepared sequentially from the latest merged `main` without waiting for the previous production publication to finish.

Do not base a new PR on an unmerged branch unless the dependency is intentional and recorded.

Before writing to an existing branch:

1. compare it with `main`
2. inspect unexpected commits
3. inspect open PRs
4. stop before overwriting unrelated or concurrent work

## Production verification gates

Direct production verification is required when closing work that changes:

- routes
- redirects
- canonical URLs
- robots or sitemap output
- response headers
- machine-readable public endpoints
- deployment configuration
- environment-dependent behavior
- release or remediation completion

The verification report must record the checked URLs, expected source, observed result, related PR, merge commit, and any remaining limitation.

## Recovery rule

Every recovery checkpoint must link to this document.

When work resumes after interruption, read in this order:

1. live `main` and open PRs
2. `docs/runbooks/recovery-checkpoint.md`
3. this policy
4. `docs/runbooks/development-roadmap.md`
5. the task-specific scope or audit document

## Permanent safety rules

- never write canonical changes directly to `main`
- canonical and working data remain separate
- monitoring does not publish canonical records
- counts are derived from canonical data
- historical SHAs are checkpoints, not live pointers
- publication timing must not silently change the repository source of truth
- production verification is explicit, recorded, and limited to the tasks that require it
