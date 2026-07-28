# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative.

## Canonical baseline

```text
Bridges     33
Incidents   34
Events      182
Evidence    210
```

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          complete through Batch 7
Phase 3  Full-corpus quality strengthening         active
         Full-corpus audit                         complete — PR #71
         Aftermath source resolution               complete — PR #72
         Aftermath canonical migration             complete — PR #73
         Aftermath production verification         complete — run 30358827192
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest publication checkpoint

```text
Canonical data PR        #73
Merge commit             a6794d5460eb263045c23ee1a850674b1a7beb98
Production verify run    30358827192
Normal CI run            30358827222
Verified state           33 / 34 / 182 / 210
Verified HTML routes     72
```

## Phase 3 audit baseline

The full-corpus audit runs permanently in normal CI and reports zero blocking errors.

Baseline review categories before the first aftermath migration:

```text
completed_reimbursement_event   5 incidents
reopened_event                  15 incidents
incident_source_count            7 incidents
event_source_count              54 events
```

## Completed aftermath migration

Canonical changes:

```text
Existing event normalizations    9
New timeline events              9
New evidence records            11
Resulting events               182
Resulting evidence             210
```

Modeling results:

- reimbursement completion can include a fully funded deficit backfill, but is not attacker-fund recovery
- qualified reimbursement scopes remain qualified
- chain resumption alone does not prove bridge reopening
- staged Poly Network restoration is represented separately from full roadmap completion
- THORChain's combined reimbursement amount is not fabricated into incident-specific allocations
- seven descriptive legacy reopening event types were normalized without duplicating historical events

Current warning state:

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
- `docs/audits/phase3-aftermath-canonical-2026-07-28.md`
- `docs/audits/production-verification-phase3-aftermath-2026-07-28.md`

## Production publication gate

The verifier waits for canonical `version.json` counts to converge before route checks.

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion remains mandatory.

## Remaining roadmap

1. resolve the three remaining restart warnings
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
