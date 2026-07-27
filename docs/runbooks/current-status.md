# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

## Canonical state on Batch 7 review branch

```text
Bridges     33
Incidents   34
Events      173
Evidence    199
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        173
data/evidence.json      199
```

`main` remains at 30 / 32 / 150 / 181 until the Batch 7 data PR merges.

## Phase 2 record expansion

```text
Batch 1    complete
Batch 2    complete
Batch 3    complete
Batch 4    complete
Batch 5    complete
Batch 6A   merged and production-verified
Batch 6B   merged and production-verified
Batch 7    canonical implementation complete on review branch
```

Batch 7 review-branch additions:

```text
Bridge entities    3
Incident cases     2
Timeline events    23
Evidence records   18
Asset references   3
Chain references   3
```

Added candidates:

- Taiko Bridge
- Everclear / Connext
- Commons Bridge

Implementation record: `docs/batches/phase2-batch-07-implementation.md`.

## Previous publication checkpoint

```text
Batch 6B PR           #66
Merge commit          1d2ccf24edab7b764160da130fc2e36146e6f1b1
Production verify     30307942555
Verified state        30 / 32 / 150 / 181
Verified HTML routes  67
```

Audit: `docs/audits/production-verification-batch6b-2026-07-28.md`.

## Production verifier

The verifier:

- uses browser-compatible request headers
- waits for canonical `version.json` counts to converge before route checks
- uses a bounded default window of 20 attempts at 15-second intervals
- fails if publication does not converge within five minutes
- retains all count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertions

## Next

1. run normal PR CI against the cleaned Batch 7 branch
2. review the Taiko, Everclear, and Commons canonical diff
3. merge only after every required check passes
4. run explicit production verification against 33 / 34 / 173 / 199
5. verify all 72 canonical HTML routes
6. begin full-corpus quality work only after publication is confirmed

## Record expansion

Batch 7 data is not part of `main` until PR #69 merges. No temporary generator, diagnostic output, or write-enabled workflow remains in the cleaned review diff.
