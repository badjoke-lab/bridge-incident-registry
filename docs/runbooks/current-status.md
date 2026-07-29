# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-29

## Canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    241
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      241
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
Safe source-count normalization      merged — PRs #79–#80
Source-count remediation Batch 1     complete — PRs #81–#83
Source-count remediation Batch 2     complete — PRs #84–#88
Source-count remediation Batch 3     complete — PRs #89–#92
Batch 3 production publication       verified — run 30424531817
```

## Source-count state

```text
Initial total mismatches          60
After safe normalization          47
After Batch 1                     37
After Batch 2                     27
After Batch 3                     17
Incident mismatches                0
```

Batch 3 changes:

- ten reviewed event-scoped evidence additions;
- four affected incident derived-count synchronizations totaling eight added links;
- `bir_ev_000079.source_count` corrected from 2 to 1;
- `bir_ev_000096.source_count` corrected from 2 to 1;
- no event text, dates, statuses, amounts, or historical claims changed.

Records:

- `docs/audits/phase3-source-count-review-batch3-2026-07-29.md`
- `docs/audits/phase3-source-count-batch3-canonical-2026-07-29.md`
- `docs/audits/production-deployment-retrigger-batch3-2026-07-29.md`
- `docs/audits/production-verification-phase3-source-count-batch3-2026-07-29.md`

## Latest completed production checkpoint

```text
Canonical data PR      #90
Canonical merge        83d61fc1b4778a7a255db2de152c7b8d168a170f
Deployment retrigger   5d23d7da414e65226f37caafbfce3884fd1aeb8c
Production verify      30424531817
Canonical normal CI    30424388432
Verified state         33 / 34 / 183 / 241
Verified HTML routes   72
Verified redirects     74
```

The first Batch 3 production-verification attempt failed correctly because production remained at the Batch 2 state. A docs-only main push retriggered Cloudflare Pages. The unchanged verifier then detected the canonical production state on attempt 1 and passed every public-contract assertion.

## Next

1. review source-count Batch 4 against the remaining 17 event mismatches;
2. migrate only source-backed event evidence links or correct unsupported stale counts;
3. continue bounded batches until exact equality is reached;
4. promote exact source-count equality to a hard CI gate only at zero mismatches;
5. strengthen primary-source and archive coverage.
