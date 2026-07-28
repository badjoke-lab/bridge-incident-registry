# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

## Canonical state

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
Final restart canonical migration merged — PR #76
Production publication            verified — run 30361214486
```

Completed Phase 3 aftermath work:

- reimbursement-completion warnings reduced from five to zero
- reopening warnings reduced from fifteen to zero
- legacy descriptive restart event types normalized without duplicate history
- recovery, reimbursement, deficit backfill, chain resumption, and bridge reopening kept separate
- LI.FI 2024 exact restart timing corrected to `unknown`
- ChainSwap July 2 incident linked to the official August 20 relaunch

Full-corpus state:

```text
Blocking errors                  0
Reimbursement warnings           0
Reopening warnings               0
```

## Latest production checkpoint

```text
Canonical data PR      #76
Merge commit           5cc54661b3a3f349ba5aa898930e35279f70df3b
Production verify      30361214486
Normal CI              30361214318
Verified state         33 / 34 / 183 / 211
Verified HTML routes   72
```

Records:

- `docs/audits/full-corpus-quality-baseline-2026-07-28.md`
- `docs/audits/phase3-aftermath-source-resolution-2026-07-28.md`
- `docs/audits/phase3-aftermath-canonical-2026-07-28.md`
- `docs/audits/production-verification-phase3-aftermath-2026-07-28.md`
- `docs/audits/phase3-final-restart-source-resolution-2026-07-28.md`
- `docs/audits/phase3-final-restart-canonical-2026-07-28.md`
- `docs/audits/production-verification-phase3-final-restart-2026-07-28.md`

## Production verifier

The verifier:

- uses browser-compatible request headers
- waits for canonical `version.json` counts to converge before route checks
- uses a bounded default window of 20 attempts at 15-second intervals
- fails if publication does not converge within five minutes
- retains all count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertions

## Next

1. define the `source_count` field contract
2. normalize source counts only after the contract is fixed
3. strengthen primary-source and archive coverage
4. continue bounded Phase 3 migrations with normal CI and production verification
