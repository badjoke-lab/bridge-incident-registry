# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

## Canonical state on final restart review branch

```text
Bridges     33
Incidents   34
Events      183
Evidence    211
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      211
```

`main` remains at 33 / 34 / 182 / 210 until the final restart canonical PR merges.

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
Full-corpus audit                 merged — PR #71
Aftermath source resolution       merged — PR #72
Aftermath canonical migration     merged — PR #73
Aftermath production publication  merged — PR #74
Final restart source resolution   merged — PR #75
Final restart canonical migration implemented on review branch
```

Final restart migration:

- LI.FI 2022 existing patch/redeployment event normalized to `bridge_reopened`
- LI.FI 2024 restart status corrected from `reopened` to `unknown`
- ChainSwap July 2 incident linked to the official August 20 bridge relaunch
- one new timeline event
- one new primary evidence record
- reopening warnings reduced from three to zero

Expected full-corpus state:

```text
Blocking errors                  0
Reimbursement warnings           0
Reopening warnings               0
```

## Last completed production checkpoint

```text
Canonical data PR      #73
Merge commit           a6794d5460eb263045c23ee1a850674b1a7beb98
Production verify      30358827192
Normal CI              30358827222
Verified state         33 / 34 / 182 / 210
Verified HTML routes   72
```

Records:

- `docs/audits/full-corpus-quality-baseline-2026-07-28.md`
- `docs/audits/phase3-aftermath-source-resolution-2026-07-28.md`
- `docs/audits/phase3-aftermath-canonical-2026-07-28.md`
- `docs/audits/production-verification-phase3-aftermath-2026-07-28.md`
- `docs/audits/phase3-final-restart-source-resolution-2026-07-28.md`

## Production verifier

The verifier:

- uses browser-compatible request headers
- waits for canonical `version.json` counts to converge before route checks
- uses a bounded default window of 20 attempts at 15-second intervals
- fails if publication does not converge within five minutes
- retains all count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertions

## Next

1. pass the complete repository suite on the cleaned final restart PR
2. merge and production-verify 33 / 34 / 183 / 211
3. define the `source_count` field contract before mechanical normalization
4. strengthen primary-source and archive coverage
