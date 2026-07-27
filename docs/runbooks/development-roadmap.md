# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative.

## Canonical baseline

```text
Bridges     33
Incidents   34
Events      173
Evidence    199
```

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          complete through Batch 7
         Batch 1                                   complete
         First-ten quality hardening               complete
         Batch 2                                   complete
         Batch 3                                   complete
         Batch 4                                   complete
         Batch 5                                   complete
         Batch 6A Transit + Magpie                  complete and production-verified
         Batch 6B Rubic + Unizen                    complete and production-verified
         Batch 7 Taiko + Everclear + Commons        complete and production-verified
Phase 3  Full-corpus quality strengthening         next
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Completed Phase 2 Batch 7

```text
Canonical data PR        #69
Merge commit             eb6bc7366ea25be4441c72cdfa50b753477eef34
Production verify run    30309573252
Verified state           33 / 34 / 173 / 199
Verified HTML routes     72
```

Canonical additions:

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

Records:

- `docs/batches/phase2-batch-07-scope-2026-07-28.md`
- `docs/batches/phase2-batch-07-implementation.md`
- `docs/audits/production-verification-batch7-2026-07-28.md`

## Production publication gate

The verifier waits for canonical `version.json` counts to converge before route checks.

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion remains mandatory.

## Phase 3 — full-corpus quality strengthening

Next sequence:

1. inventory all current enum and descriptive-value drift
2. audit amount claims, recovery, reimbursement, restart, and current-outcome consistency across all incidents
3. audit entity status against linked incident and lifecycle events
4. audit evidence source tiers, URL states, archive coverage, and source counts
5. separate mechanical normalization from changes that alter historical claims
6. add controlled failure fixtures for any strengthened validator rule
7. apply reviewed canonical migrations through bounded data PRs
8. verify production after every public-data change

## Remaining roadmap

1. Phase 3 full-corpus audit and normalization
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
