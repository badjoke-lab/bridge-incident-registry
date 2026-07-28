# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative.

## Canonical baseline on final restart review branch

```text
Bridges     33
Incidents   34
Events      183
Evidence    211
```

`main` remains at 33 / 34 / 182 / 210 until the final restart canonical PR merges.

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          complete through Batch 7
Phase 3  Full-corpus quality strengthening         active
         Full-corpus audit                         complete — PR #71
         First aftermath migration                 complete and production-verified
         Final restart source resolution           complete — PR #75
         Final restart canonical migration         implemented on review branch
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest completed publication checkpoint

```text
Canonical data PR        #73
Merge commit             a6794d5460eb263045c23ee1a850674b1a7beb98
Production verify run    30358827192
Normal CI run            30358827222
Verified state           33 / 34 / 182 / 210
Verified HTML routes     72
```

## Phase 3 audit trajectory

Initial audit baseline:

```text
completed_reimbursement_event   5 incidents
reopened_event                  15 incidents
incident_source_count            7 incidents
event_source_count              54 events
```

After the first aftermath migration:

```text
completed_reimbursement_event   0
reopened_event                   3
```

Final restart review-branch result:

```text
completed_reimbursement_event   0
reopened_event                   0
blocking errors                  0
```

## Final restart migration

Canonical changes:

```text
Existing event normalization   1
Incident status correction     1
Existing event status fix      1
New timeline event             1
New evidence record            1
Resulting events             183
Resulting evidence           211
```

Modeling results:

- LI.FI 2022 uses its existing patch/redeployment event rather than a duplicate event
- LI.FI 2024 historical restart timing is changed to `unknown` because containment reporting does not prove service restoration
- current operation remains separate from exact historical restart timing
- ChainSwap's August 20 relaunch is linked to the first July incident without claiming a durable reopening before the second exploit

Records:

- `docs/audits/full-corpus-quality-baseline-2026-07-28.md`
- `docs/audits/phase3-aftermath-source-resolution-2026-07-28.md`
- `docs/audits/phase3-aftermath-canonical-2026-07-28.md`
- `docs/audits/production-verification-phase3-aftermath-2026-07-28.md`
- `docs/audits/phase3-final-restart-source-resolution-2026-07-28.md`

## Production publication gate

The verifier waits for canonical `version.json` counts to converge before route checks.

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion remains mandatory.

## Remaining roadmap

1. merge and production-verify the final restart migration
2. define and normalize the `source_count` contract
3. primary-source strengthening
4. URL and archive hardening
5. validator strengthening
6. public-contract compatibility review
7. monitoring with no automatic publication
8. v1 documentation, accessibility, performance, and release checks

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
