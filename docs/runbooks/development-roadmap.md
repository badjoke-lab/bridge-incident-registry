# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative.

## Canonical baseline on Phase 3 review branch

```text
Bridges     33
Incidents   34
Events      182
Evidence    210
```

`main` remains at 33 / 34 / 173 / 199 until the aftermath canonical PR merges.

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          complete through Batch 7
Phase 3  Full-corpus quality strengthening         active
         Full-corpus audit                         complete — PR #71
         Aftermath source resolution               complete — PR #72
         Aftermath canonical migration             implemented on review branch
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Completed Phase 2 publication checkpoint

```text
Canonical data PR        #69
Merge commit             eb6bc7366ea25be4441c72cdfa50b753477eef34
Production verify run    30309573252
Verified state           33 / 34 / 173 / 199
Verified HTML routes     72
```

## Phase 3 audit baseline

The full-corpus audit runs permanently in normal CI and currently reports zero blocking errors.

Baseline review categories before aftermath migration:

```text
completed_reimbursement_event   5 incidents
reopened_event                  15 incidents
incident_source_count            7 incidents
event_source_count              54 events
```

## Phase 3 aftermath canonical migration

Review-branch changes:

```text
Existing event normalizations   9
New timeline events             9
New evidence records           11
Resulting events              182
Resulting evidence            210
```

Modeling results:

- reimbursement completion can include a fully funded deficit backfill, but is not attacker-fund recovery
- qualified reimbursement scopes remain qualified
- chain resumption alone does not prove bridge reopening
- staged Poly Network restoration is represented separately from full roadmap completion
- THORChain's combined reimbursement amount is not fabricated into incident-specific allocations
- seven descriptive legacy reopening event types are normalized without duplicating historical events

Expected warning state after migration:

```text
completed_reimbursement_event   0
reopened_event                   3
incident_source_count            7
existing event_source_count drift remains separate
```

Remaining restart review:

1. LI.FI 2022
2. LI.FI 2024
3. ChainSwap July 2, 2021

Records:

- `docs/audits/full-corpus-quality-baseline-2026-07-28.md`
- `docs/audits/phase3-aftermath-source-resolution-2026-07-28.md`

## Production publication gate

The verifier waits for canonical `version.json` counts to converge before route checks.

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion remains mandatory.

## Remaining roadmap

1. merge and production-verify the Phase 3 aftermath canonical migration
2. resolve the three remaining restart warnings
3. define and normalize the `source_count` contract
4. primary-source strengthening
5. URL and archive hardening
6. validator strengthening
7. public-contract compatibility review
8. monitoring with no automatic publication
9. v1 documentation, accessibility, performance, and release checks

## Permanent rules

1. Never write canonical changes directly to main.
2. Use one branch and bounded PR per task.
3. Read canonical JSON before assigning IDs or counts.
4. Keep canonical and working data separate.
5. Do not merge temporary diagnostics or write-enabled workflows.
6. Preserve distinctions among loss, return, recovery, reimbursement, freezing, minting, and burning.
7. A disclosure is not automatically an exploit.
8. A relaunch announcement is not proof of reimbursement completion.
9. Historical SHAs are not live branch pointers.
10. Every PR must pass checks appropriate to its stage.
