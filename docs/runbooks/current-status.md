# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

## Canonical state

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
Safe source-count normalization      merged — PRs #79–#80
Source-count remediation Batch 1     complete — PRs #81–#83
Source-count remediation Batch 2     merged — PRs #84–#85
Batch 2 deployment retrigger         merged — PR #87
Batch 2 production publication       verified — run 30374628843
```

## Source-count state

```text
Initial total mismatches          60
After safe normalization          47
After Batch 1                     37
After Batch 2                     27
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
- `docs/audits/production-deployment-retrigger-batch2-2026-07-28.md`
- `docs/audits/production-verification-phase3-source-count-batch2-2026-07-28.md`

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

Two earlier production-verification attempts failed correctly because production remained at the Batch 1 state. A diagnostic confirmed that no Batch 2 deployment had occurred. The docs-only main retrigger caused the existing Cloudflare Pages Git integration to publish, after which the unchanged verifier passed.

## Next

1. review source-count Batch 3;
2. migrate only source-backed event evidence links or correct unsupported stale counts;
3. continue bounded batches until all 27 event mismatches are resolved;
4. promote exact source-count equality to a hard CI gate only at zero mismatches;
5. strengthen primary-source and archive coverage.
