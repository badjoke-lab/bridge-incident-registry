# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

## Canonical state on Batch 2 review branch

```text
Bridges     33
Incidents   34
Events      183
Evidence    231
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      231
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
Safe source-count normalization      merged — PR #79
Production publication               merged — PR #80
Source-count remediation Batch 1     complete — PRs #81–#83
Source-count review Batch 2          merged — PR #84
Batch 2 canonical migration          implemented on review branch
```

## Source-count state

```text
Initial total mismatches          60
After safe normalization          47
After Batch 1                     37
After Batch 2                     27 expected
Incident mismatches                0
```

Batch 2 changes:

- ten reviewed event-scoped evidence additions;
- six affected incident derived-count synchronizations;
- `bir_ev_000044.source_count` corrected from 3 to 2;
- `bir_ev_000054.source_count` corrected from 2 to 1;
- no event text, dates, statuses, or historical claims changed.

Records:

- `docs/audits/phase3-source-count-review-batch2-2026-07-28.md`
- `docs/audits/phase3-source-count-batch2-canonical-2026-07-28.md`

## Latest completed production checkpoint

```text
Canonical data PR      #82
Merge commit           626ac6b91c5ce9165938034055ccb7edc14071a7
Production verify      30370374622
Normal CI              30370374443
Verified state         33 / 34 / 183 / 221
Verified HTML routes   72
```

## Next

1. run the bounded Batch 2 generator and full repository suite;
2. remove temporary implementation files;
3. merge the cleaned 33 / 34 / 183 / 231 canonical PR;
4. production-verify all public data and 72 HTML routes;
5. continue with source-count review Batch 3.
