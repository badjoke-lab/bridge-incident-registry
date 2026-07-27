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
Phase 2  Record expansion                          active
         Batch 1                                   complete
         First-ten quality hardening               complete
         Batch 2                                   complete
         Batch 3                                   complete
         Batch 4                                   complete
         Batch 5                                   complete
         Batch 6 scope                             complete
         Batch 6 source resolution                 complete
         Batch 6A Transit + Magpie                  complete and production-verified
         Batch 6B Rubic + Unizen                    complete and production-verified
         Batch 7                                   next
Emergency public consistency                       complete — PR #59
Phase 3  Full-corpus quality strengthening         planned
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Completed Phase 2 Batch 6A

```text
Canonical data PR        #63
Merge commit             c074d411b9c1d99b0f5cd56c5ade3125952de13c
Production verify run    30306303489
Verified state           28 / 29 / 134 / 160
Verified HTML routes     62
```

Records:

- `docs/batches/phase2-batch-06a-implementation.md`
- `docs/audits/production-verification-batch6a-2026-07-28.md`

## Completed Phase 2 Batch 6B

```text
Canonical data PR        #66
Merge commit             1d2ccf24edab7b764160da130fc2e36146e6f1b1
Production verify run    30307748017
Verified state           30 / 32 / 150 / 181
Verified HTML routes     67
```

Canonical records:

- Rubic
- Unizen

Additions:

```text
Bridge entities   2
Incident cases    3
Timeline events   16
Evidence records  21
Asset references  2
```

Modeling results:

- Rubic's RBC/BRBC bridge-wallet compromise remains separate from its RubicProxy approval exploit
- the former native bridge component is deprecated/replaced while the Rubic aggregator remains active
- RBC/BRBC token quantity, attacker proceeds, collateral effects, USD loss, and market effects remain separate
- Unizen reimbursement remains `in_progress`, not completed
- partial recovery does not imply complete user restitution
- Unizen's trade-aggregation contract incident does not propagate to UIP providers

Records:

- `docs/batches/phase2-batch-06b-source-resolution-2026-07-28.md`
- `docs/batches/phase2-batch-06b-implementation.md`
- `docs/audits/production-verification-batch6b-2026-07-28.md`

## Production publication gate

The production verifier now waits for canonical `version.json` counts to converge before starting route checks.

Default bounded wait:

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every existing count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion still runs. Failure to converge within the bounded window remains a hard failure.

## Phase 2 Batch 7

Next actions:

1. verify latest `main` and open PRs after the Batch 6B audit merges
2. define a reviewed candidate scope before assigning IDs
3. prioritize candidates with meaningful incident, recovery, migration, or shutdown history
4. derive all IDs from the 30 / 32 / 150 / 181 baseline
5. use a separate scope PR and canonical-data PR
6. run repository and production verification after merge

## Candidate queue available for review

Non-canonical research currently includes:

- Taiko bridge exploit and recovery
- Everclear / Connext lifecycle and shutdown
- Syndicate Commons Bridge exploit, reimbursement, and operator-lifecycle context

These candidates require a dedicated Batch 7 boundary decision. Candidate documents are not canonical records.

## Remaining roadmap

1. Phase 2 Batch 7
2. full-corpus audit
3. primary-source strengthening
4. aftermath normalization
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
