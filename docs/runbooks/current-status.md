# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-29

## Canonical state

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
Final source-count review            complete — PR #96
Final source-count migration         complete — PR #97
Final deployment retrigger           complete — PR #99
Final production publication         verified — run 30427603790
Hard source-count equality gate      active
Source-quality baseline              complete — PR #100
Source-quality no-regression gate    active
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
- `docs/audits/production-deployment-retrigger-final-source-count-2026-07-29.md`
- `docs/audits/production-verification-phase3-source-count-final-2026-07-29.md`

## Source-quality baseline

```text
Primary evidence                         181 / 263
Tier 1 evidence                          199 / 263
Official-domain evidence                 121 / 263
Evidence with archived_url                 0 / 263
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        2 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          36 / 183
Events without tier 1 evidence           25 / 183
Terminal evidence without archive        76
Risky-host evidence without archive      90
X/Twitter evidence without archive       29
Unknown URL status                        2
Unique archive-priority evidence        132
```

The permanent source-quality checker treats these gap and archive-risk values as ceilings. New work may reduce them but may not increase them. Invalid source URLs and invalid archive URLs are blocking failures. Controlled fixtures prove bridge-primary, event-tier-1, and risky-host archive regressions are rejected.

Primary-source incident gaps:

- `bir_inc_000015` — LI.FI 2022 approval-drain exploit;
- `bir_inc_000026` — Nerve Bridge 2021 metapool exploit.

The Nerve incident is the only incident with no tier-1 evidence. Twenty-five events still have no tier-1 evidence.

Record:

- `docs/audits/phase3-source-quality-baseline-2026-07-29.md`

## Latest completed production checkpoint

```text
Canonical data PR      #97
Canonical merge        e03386ab6d1242e2918700839b8449faff5c40c6
Deployment retrigger   be5c6242647feb36c14d35f65e945f4e437ada70
Production verify      30427603790
Canonical normal CI    30427464812
Verified state         33 / 34 / 183 / 263
Verified HTML routes   72
Verified redirects     74
Generated at           2026-07-29T06:23:49.183Z
```

The first final production-verification attempt correctly failed because production remained at the 256-evidence state. The docs-only retrigger caused Cloudflare Pages to publish, after which the unchanged verifier passed on attempt 1.

## Next

1. close the Nerve Bridge incident tier-1 and primary-source gap;
2. close the LI.FI incident primary-source gap;
3. remediate the 25 event tier-1 gaps in bounded batches;
4. archive terminal and risky-host evidence, beginning with the 132-item priority queue;
5. resolve the two unknown URL-status records;
6. strengthen remaining validators and proceed to monitoring, candidate collection, and v1 hardening.
