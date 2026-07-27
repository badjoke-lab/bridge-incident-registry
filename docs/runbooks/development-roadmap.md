# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative.

## Canonical baseline on Batch 7 review branch

```text
Bridges     33
Incidents   34
Events      173
Evidence    199
```

`main` remains at 30 / 32 / 150 / 181 until the Batch 7 data PR merges.

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          active
         Batch 1                                   complete
         First-ten quality hardening               complete
         Batch 2                                   complete
         Batch 3                                   complete
         Batch 4                                   complete
         Batch 5                                   complete
         Batch 6A Transit + Magpie                  complete and production-verified
         Batch 6B Rubic + Unizen                    complete and production-verified
         Batch 7 Taiko + Everclear + Commons        implemented on review branch
Phase 3  Full-corpus quality strengthening         next after Batch 7 publication
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Completed Batch 6 publication checkpoint

```text
Canonical data PR        #66
Merge commit             1d2ccf24edab7b764160da130fc2e36146e6f1b1
Production verify run    30307942555
Verified state           30 / 32 / 150 / 181
Verified HTML routes     67
```

## Phase 2 Batch 7 implementation

Canonical candidates:

- Taiko Bridge
- Everclear / Connext
- Commons Bridge

Review-branch additions:

```text
Bridge entities    3
Incident cases     2
Timeline events    23
Evidence records   18
Asset references   3
Chain references   3
```

Modeling results:

- Taiko recollateralization remains separate from attacker-fund recovery
- Taiko reimbursement is completed and the bridge is active after reopening
- Everclear and Connext remain one rebranded lifecycle entity without a fabricated incident
- Everclear documentation availability is not active-operation proof after shutdown
- Commons Bridge is separated from the broader Syndicate Bridge family
- Commons reimbursement is completed and the route is dead / not reopened
- Commons token quantity, attacker proceeds, user loss, price effects, and treasury reimbursement remain separate
- Syndicate Labs wind-down is not asserted as the incident cause

Required completion steps:

1. run normal PR CI against the cleaned branch
2. review all canonical additions and source links
3. merge only after every required check passes
4. verify production at 33 / 34 / 173 / 199
5. verify all 72 canonical HTML routes
6. record the production audit
7. start Phase 3 full-corpus quality work only after publication is confirmed

Records:

- `docs/batches/phase2-batch-07-scope-2026-07-28.md`
- `docs/batches/phase2-batch-07-implementation.md`

## Production publication gate

The verifier waits for canonical `version.json` counts to converge before route checks.

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion remains mandatory.

## Work after Batch 7

1. full-corpus audit
2. primary-source strengthening
3. aftermath normalization
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
