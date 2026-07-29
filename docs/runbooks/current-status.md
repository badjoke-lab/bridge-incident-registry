# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-29

## Canonical review-branch state

```text
Bridges     33
Incidents   34
Events      183
Evidence    263
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      263
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
Source-count remediation Batch 4     complete — PRs #93–#95
Final source-count review            merged — PR #96
Final source-count migration         implemented — PR #97
Hard source-count equality gate      implemented — PR #97
```

## Source-count state

```text
Initial total mismatches          60
After safe normalization          47
After Batch 1                     37
After Batch 2                     27
After Batch 3                     17
After Batch 4                      7
After final migration              0
Incident mismatches                0
Event mismatches                   0
```

Final migration changes:

- seven reviewed event-scoped evidence additions;
- two affected incident derived-count synchronizations totaling six added links;
- no event `source_count` corrections;
- permanent exact-equality checker added;
- controlled incident and event drift fixtures added;
- no event text, dates, statuses, amounts, or historical claims changed.

Records:

- `docs/audits/phase3-source-count-review-final-2026-07-29.md`
- `docs/audits/phase3-source-count-final-canonical-2026-07-29.md`

## Latest completed production checkpoint

```text
Canonical data PR      #94
Canonical merge        fd210052b40ff038156b22d116848751990b5633
Publication trigger    44e785c0e286ff16a5bcd1fddc1e9ce2b9fbc37c
Production verify      30426111329
Canonical normal CI    30425990662
Verified state         33 / 34 / 183 / 256
Verified HTML routes   72
Verified redirects     74
```

Batch 4 is the latest production-verified checkpoint. PR #97 carries the exact-equality canonical state and must pass normal CI, merge, publish, and production verification before becoming the live checkpoint.

## Next

1. complete normal CI for PR #97;
2. merge the final source-count canonical migration;
3. verify production at 33 / 34 / 183 / 263 with all 72 canonical HTML routes;
4. confirm exact equality in public JSON and permanent CI;
5. continue primary-source, archive, URL, and validator strengthening;
6. proceed to monitoring and v1 hardening.
