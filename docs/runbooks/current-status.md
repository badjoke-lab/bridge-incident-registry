# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-29

## Canonical review-branch state

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
Source-count review Batch 3          merged — PR #89
Source-count migration Batch 3       implemented — PR #90
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

## Latest completed production checkpoint

```text
Canonical data PR      #85
Canonical merge        70bd5de1526cca5ce3122a7bdc23ea80d50179e0
Deployment retrigger   99941592b9e526661ad004e6504c26588737d7fc
Production verify      30374628843
Normal CI              30374629112
Verified state         33 / 34 / 183 / 231
Verified HTML routes   72
```

Batch 2 remains the latest production-verified checkpoint until PR #90 merges and the live publication verifier passes. The Batch 3 review branch has removed all temporary generator, package-hook, and workflow-permission changes.

## Next

1. complete normal CI for PR #90;
2. merge the Batch 3 canonical migration;
3. verify production at 33 / 34 / 183 / 241 with all 72 canonical HTML routes;
4. continue bounded source-count remediation with the remaining 17 event mismatches;
5. promote exact source-count equality to a hard CI gate only at zero mismatches;
6. strengthen primary-source and archive coverage.
