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
  - Archive Capture Batches 1–13: complete and production-verified
  - next: further bounded archive work and justified primary-evidence remediation
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

## Current quality boundary

```text
Evidence with archived_url            94
Terminal unarchived unique URLs       36
Risky-host unarchived unique URLs     27
Events without primary                16
Events without Tier 1                  6
Unknown URL status                     0
Canonical production content match  true
```

## Immediate execution order

1. choose the next bounded archive-preservation scope from the remaining queues;
2. run a review-only exact replay and temporal-fit audit;
3. apply only reviewed mappings in a separate canonical PR;
4. explicitly verify production when canonical public content changes;
5. remediate event primary-evidence gaps where source hierarchy can be improved safely;
6. strengthen validators;
7. implement review-gated monitoring and candidate collection;
8. complete v1 hardening and release closure.

## Permanent boundary

- never write canonical records directly to `main`;
- do not treat monitoring signals as canonical incidents;
- do not accept wildcard, guessed, short, failed, or temporally incompatible archive captures;
- repository checks are the normal merge gate;
- production verification is required only for explicit publication, routing, metadata, public-contract, deployment, release, or remediation gates;
- a build-input refresh may be used once when necessary, but it must not change canonical content or verification expectations.
