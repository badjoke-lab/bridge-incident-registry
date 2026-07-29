# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-29

## Canonical review-branch state

```text
Bridges     33
Incidents   34
Events      183
Evidence    256
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      256
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
Source-count review Batch 4          merged — PR #93
Source-count migration Batch 4       implemented — PR #94
```

## Source-count state

```text
Initial total mismatches          60
After safe normalization          47
After Batch 1                     37
After Batch 2                     27
After Batch 3                     17
After Batch 4                      7
Incident mismatches                0
```

Batch 4 changes:

- fifteen reviewed event-scoped evidence additions;
- three affected incident derived-count synchronizations totaling nine added links;
- no event `source_count` corrections;
- no event text, dates, statuses, amounts, or historical claims changed.

Records:

- `docs/audits/phase3-source-count-review-batch4-2026-07-29.md`
- `docs/audits/phase3-source-count-batch4-canonical-2026-07-29.md`

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

Batch 3 remains the latest production-verified checkpoint until PR #94 merges and the live publication verifier passes. The Batch 4 review branch has removed all temporary generator, package-hook, and workflow-permission changes.

## Next

1. complete normal CI for PR #94;
2. merge the Batch 4 canonical migration;
3. verify production at 33 / 34 / 183 / 256 with all 72 canonical HTML routes;
4. complete the final source-count batch against the remaining 7 event mismatches;
5. promote exact source-count equality to a hard CI gate at zero mismatches;
6. strengthen primary-source and archive coverage.
