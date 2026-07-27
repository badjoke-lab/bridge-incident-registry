# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

## Canonical state on Batch 6B review branch

```text
Bridges     30
Incidents   32
Events      150
Evidence    181
```

Canonical source files:

```text
data/bridges.json       30
data/incidents.json     32
data/events.json        150
data/evidence.json      181
```

`main` remains at the prior 28 / 29 / 134 / 160 state until the Batch 6B data PR merges.

## Public-consistency remediation

```text
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete — PR #52
PR 4  Canonical metadata and discovery       complete — PR #53
PR 5  Legacy redirects                       complete — PR #54
PR 6  Post-build consistency CI              complete — PR #58
PR 7  Production verification                complete — PR #59
```

## Phase 2 record expansion

```text
Batch 1    complete
Batch 2    complete
Batch 3    complete
Batch 4    complete
Batch 5    complete
Batch 6A   merged and production-verified
Batch 6B   canonical implementation complete on review branch
Batch 7    planned
```

Batch 6B review-branch additions:

```text
Bridge entities   2
Incident cases    3
Timeline events   16
Evidence records  21
Asset references  2
```

Added candidates:

- Rubic
- Unizen

Implementation record: `docs/batches/phase2-batch-06b-implementation.md`.

## Batch 6A publication checkpoint

```text
PR #63                 c074d411b9c1d99b0f5cd56c5ade3125952de13c
Production verify      30306303489
Verified state         28 / 29 / 134 / 160
Verified HTML routes   62
```

Audit: `docs/audits/production-verification-batch6a-2026-07-28.md`.

## Production verifier

The verifier uses browser-compatible request headers because Cloudflare returned Error 1010 to the previous custom automation User-Agent. Verification assertions remain unchanged.

## Next

1. run normal PR CI against the cleaned Batch 6B branch
2. review the Rubic and Unizen canonical diff
3. merge only after every required check passes
4. run explicit production verification against the 30 / 32 / 150 / 181 state
5. verify all 67 canonical HTML routes
6. begin Batch 7 after publication is confirmed

## Record expansion

Batch 6B data is not part of `main` until PR #66 merges. No temporary generator or write-enabled workflow remains in the cleaned review diff.
