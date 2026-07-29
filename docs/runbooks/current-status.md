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

1. strengthen primary-source coverage;
2. strengthen archive coverage;
3. harden URLs and domain-state handling;
4. strengthen remaining validators;
5. proceed to monitoring and candidate collection;
6. complete v1 documentation, accessibility, performance, and release checks.
