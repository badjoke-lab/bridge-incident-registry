# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative.

## Canonical baseline on Batch 6B review branch

```text
Bridges     30
Incidents   32
Events      150
Evidence    181
```

`main` remains at 28 / 29 / 134 / 160 until the Batch 6B data PR merges.

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
         Batch 6B Rubic + Unizen                    implemented on review branch
         Batch 7                                   planned
Emergency public consistency                       complete — PR #59
Phase 3  Full-corpus quality strengthening         planned
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Completed emergency sequence

```text
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete — PR #52
PR 4  Canonical metadata and discovery       complete — PR #53
PR 5  Legacy redirects                       complete — PR #54
PR 6  Post-build consistency CI              complete — PR #58
PR 7  Production verification                complete — PR #59
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

## Phase 2 Batch 6B implementation

Canonical candidates:

- Rubic
- Unizen

Review-branch additions:

```text
Bridge entities   2
Incident cases    3
Timeline events   16
Evidence records  21
Asset references  2
```

Modeling results:

- Rubic's historical RBC/BRBC bridge wallet compromise remains separate from the later RubicProxy approval exploit
- the former native bridge component is deprecated/replaced while the Rubic aggregator remains active
- Unizen reimbursement is `in_progress`, not completed
- Unizen's trade-aggregation contract incident does not propagate to UIP providers
- RBC/BRBC token quantity, attacker proceeds, collateral effects, and USD loss remain distinct

Required completion steps:

1. run normal PR CI against the cleaned branch
2. review all canonical additions and source links
3. merge only after every required check passes
4. verify production at 30 / 32 / 150 / 181
5. verify all 67 canonical HTML routes
6. record the production audit before starting Batch 7

Records:

- `docs/batches/phase2-batch-06b-source-resolution-2026-07-28.md`
- `docs/batches/phase2-batch-06b-implementation.md`

## Candidate queue after Batch 6

Non-canonical candidate research currently includes:

- Taiko bridge exploit and recovery
- Everclear / Connext lifecycle and shutdown
- Syndicate Commons Bridge exploit, reimbursement, and operator-lifecycle context

These candidates require dedicated scope review and current-source verification before canonical promotion.

## Remaining roadmap

1. complete Batch 6B PR and production verification
2. Phase 2 Batch 7
3. full-corpus audit
4. primary-source strengthening
5. aftermath normalization
6. URL and archive hardening
7. validator strengthening
8. public-contract compatibility review
9. monitoring with no automatic publication
10. v1 documentation, accessibility, performance, and release checks

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
