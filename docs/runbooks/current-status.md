# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

## Canonical state on Phase 3 review branch

```text
Bridges     33
Incidents   34
Events      182
Evidence    210
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        182
data/evidence.json      210
```

`main` remains at 33 / 34 / 173 / 199 until the Phase 3 aftermath canonical PR merges.

## Phase 2 record expansion

```text
Batch 1    complete
Batch 2    complete
Batch 3    complete
Batch 4    complete
Batch 5    complete
Batch 6A   merged and production-verified
Batch 6B   merged and production-verified
Batch 7    merged and production-verified
```

## Phase 3 quality strengthening

```text
Full-corpus audit             merged — PR #71
Aftermath source resolution   merged — PR #72
Aftermath canonical migration implemented on review branch
```

Phase 3 aftermath changes:

- seven legacy descriptive reopening event types normalized to `bridge_reopened`
- Ronin generic aftermath event converted to sourced reimbursement completion
- Wormhole deficit backfill normalized to reimbursement completion
- nine new timeline events
- eleven new evidence records
- public reimbursement semantics added to SPEC and methodology
- reimbursement-completion warnings reduced from five to zero
- reopening warnings reduced from fifteen to three

The remaining restart reviews are:

```text
bir_inc_000015  LI.FI 2022
bir_inc_000016  LI.FI 2024
bir_inc_000017  ChainSwap July 2, 2021
```

## Last completed production checkpoint

```text
Canonical data PR      #69
Merge commit           eb6bc7366ea25be4441c72cdfa50b753477eef34
Production verify      30309573252
Verified state         33 / 34 / 173 / 199
Verified HTML routes   72
```

Records:

- `docs/audits/full-corpus-quality-baseline-2026-07-28.md`
- `docs/audits/phase3-aftermath-source-resolution-2026-07-28.md`

## Production verifier

The verifier:

- uses browser-compatible request headers
- waits for canonical `version.json` counts to converge before route checks
- uses a bounded default window of 20 attempts at 15-second intervals
- fails if publication does not converge within five minutes
- retains all count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertions

## Next

1. pass the complete repository suite on the cleaned Phase 3 aftermath PR
2. merge only after normal CI succeeds
3. run explicit production verification at 33 / 34 / 182 / 210
4. resolve the three remaining restart warnings through source review or status correction
5. define the `source_count` field contract before mechanical normalization
