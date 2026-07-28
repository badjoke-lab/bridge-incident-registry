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
Full-corpus audit                    merged — PR #71
Aftermath and restart normalization  merged — PRs #72–#77
Source-count contract                merged — PR #78
Source-count mechanical migration    merged — PR #79
Production publication               verified — run 30367770935
```

Completed aftermath work:

- reimbursement-completion warnings reduced from five to zero;
- reopening warnings reduced from fifteen to zero;
- legacy descriptive restart event types normalized without duplicate history;
- recovery, reimbursement, deficit backfill, chain resumption, and bridge reopening kept separate;
- LI.FI 2024 exact restart timing corrected to `unknown`;
- ChainSwap July 2 incident linked to the official August 20 relaunch.

Full-corpus aftermath state:

```text
Blocking errors                  0
Reimbursement warnings           0
Reopening warnings               0
```

## Source-count migration

The contract is:

```text
incident.source_count = directly linked canonical evidence records
event.source_count    = directly linked canonical evidence records
```

The 13 safe derived values are merged and production-verified without changing evidence linkage or historical claims.

```text
Total mismatches   60 -> 47
Incident mismatch  7 -> 0
Event mismatch    53 -> 47
```

The remaining 47 events require evidence-link review and must not be mechanically reduced.

Records:

- `docs/audits/phase3-source-count-contract-2026-07-28.md`
- `docs/audits/phase3-source-count-mechanical-2026-07-28.md`
- `docs/audits/production-verification-phase3-source-count-mechanical-2026-07-28.md`

## Latest production checkpoint

```text
Canonical data PR      #79
Merge commit           3c4bae8905ff052e987f84bc798545b467de807d
Production verify      30367770935
Normal CI              30367770892
Verified state         33 / 34 / 183 / 211
Verified HTML routes   72
```

## Production verifier

The verifier:

- uses browser-compatible request headers;
- waits for canonical `version.json` counts to converge before route checks;
- uses a bounded default window of 20 attempts at 15-second intervals;
- fails if publication does not converge within five minutes;
- retains all count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertions.

## Next

1. split the remaining 47 event evidence-link mismatches into bounded source-review batches;
2. add, relink, or remove event-scoped evidence only after source review;
3. promote exact source-count equality to a hard CI gate only after mismatch count reaches zero;
4. strengthen primary-source and archive coverage.
