# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

## Canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    221
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      221
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
Source-count review Batch 1          merged — PR #81
Batch 1 canonical migration          merged — PR #82
Batch 1 production publication       verified — run 30370374622
```

## Source-count state

```text
Initial total mismatches          60
After safe normalization          47
After Batch 1                     37
Incident mismatches                0
```

Batch 1 added ten reviewed event-scoped evidence records and synchronized seven affected incident derived counts. No event text, dates, statuses, or stored event source counts changed.

Records:

- `docs/audits/phase3-source-count-contract-2026-07-28.md`
- `docs/audits/phase3-source-count-mechanical-2026-07-28.md`
- `docs/audits/production-verification-phase3-source-count-mechanical-2026-07-28.md`
- `docs/audits/phase3-source-count-review-batch1-2026-07-28.md`
- `docs/audits/phase3-source-count-batch1-canonical-2026-07-28.md`
- `docs/audits/production-verification-phase3-source-count-batch1-2026-07-28.md`

## Latest completed production checkpoint

```text
Canonical data PR      #82
Merge commit           626ac6b91c5ce9165938034055ccb7edc14071a7
Production verify      30370374622
Normal CI              30370374443
Verified state         33 / 34 / 183 / 221
Verified HTML routes   72
```

The first production attempt exhausted the unchanged five-minute convergence window. The retry passed after Cloudflare publication converged; no verification condition was relaxed.

## Next

1. review source-count Batch 2;
2. migrate only source-backed event evidence links;
3. continue bounded batches until all 37 event mismatches are resolved;
4. promote exact source-count equality to a hard CI gate only at zero mismatches;
5. strengthen primary-source and archive coverage.
