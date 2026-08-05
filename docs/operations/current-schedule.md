# BIR implementation schedule

Status: active  
Updated: 2026-08-05

This file no longer carries an independent historical schedule. The authoritative roadmap is `docs/runbooks/development-roadmap.md`; the restart point is `docs/runbooks/recovery-checkpoint.md`.

## Reporting rule

After every merged pull request, report:

1. the full schedule,
2. the current position,
3. what the merge changed,
4. the next action before continuing.

## Current schedule

- Phase 0 — specification and foundation: complete
- Phase 1 — canonical model, UI, validation, and seeds: complete
- Phase 2 — record expansion: complete through Batch 7
- Phase 3 — full-corpus quality strengthening: active
  - source-count remediation: complete
  - source-quality baseline and remediation: complete
  - event Tier 1 remediation: complete and production-verified
  - Archive Capture Batches 1–12: complete and production-verified
  - next: Archive Capture Batch 13 and justified primary-evidence remediation
- Phase 4 — public contract stabilization: complete
- Phase 5 — monitoring and candidate collection: planned
- Release — v1 documentation, accessibility, performance, compatibility, and release checks: planned

## Current baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    284
```

## Immediate execution order

1. Archive Capture Batch 13 bounded review;
2. separate canonical application for reviewed exact snapshots, if any;
3. explicit production verification when the canonical archive batch is published;
4. event primary-evidence remediation where source hierarchy can be improved safely;
5. validator hardening;
6. review-gated monitoring and candidate collection;
7. v1 hardening and release closure.

## Permanent boundary

- never write canonical records directly to `main`;
- do not treat monitoring signals as canonical incidents;
- do not accept wildcard, guessed, short, or temporally incompatible archive captures;
- repository checks are the normal merge gate;
- production verification is required only for explicit publication, routing, metadata, public-contract, deployment, release, or remediation gates.
