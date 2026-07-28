# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative.

## Canonical baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    211
```

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          complete through Batch 7
Phase 3  Full-corpus quality strengthening         active
         Full-corpus audit                         complete — PR #71
         Reimbursement/restart normalization       complete — PRs #72–#76
         Production verification                   complete — run 30361214486
         Source-count contract                     next
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest publication checkpoint

```text
Canonical data PR        #76
Merge commit             5cc54661b3a3f349ba5aa898930e35279f70df3b
Production verify run    30361214486
Normal CI run            30361214318
Verified state           33 / 34 / 183 / 211
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

Current state:

```text
completed_reimbursement_event   0
reopened_event                   0
blocking errors                  0
```

## Completed aftermath normalization

The completed migrations:

- normalized descriptive legacy restart events without duplicating history;
- added source-backed Ronin, Wormhole, Poly Network, BSC Token Hub, THORChain, Allbridge, and ChainSwap aftermath records;
- distinguished reimbursement, deficit backfill, attacker-fund recovery, chain resumption, and bridge reopening;
- retained qualified reimbursement scopes;
- corrected LI.FI 2024 exact restart timing to `unknown` instead of inferring it from containment or later current operation.

Records:

- `docs/audits/full-corpus-quality-baseline-2026-07-28.md`
- `docs/audits/phase3-aftermath-source-resolution-2026-07-28.md`
- `docs/audits/phase3-aftermath-canonical-2026-07-28.md`
- `docs/audits/production-verification-phase3-aftermath-2026-07-28.md`
- `docs/audits/phase3-final-restart-source-resolution-2026-07-28.md`
- `docs/audits/phase3-final-restart-canonical-2026-07-28.md`
- `docs/audits/production-verification-phase3-final-restart-2026-07-28.md`

## Production publication gate

The verifier waits for canonical `version.json` counts to converge before route checks.

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion remains mandatory.

## Remaining roadmap

1. define and normalize the `source_count` contract
2. primary-source strengthening
3. URL and archive hardening
4. validator strengthening
5. public-contract compatibility review
6. monitoring with no automatic publication
7. v1 documentation, accessibility, performance, and release checks

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
