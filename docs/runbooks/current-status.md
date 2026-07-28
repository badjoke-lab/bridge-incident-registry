# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

## Canonical state on Batch 1 review branch

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
Batch 1 canonical migration          implemented on review branch
```

## Source-count state

The contract is:

```text
incident.source_count = directly linked canonical evidence records
event.source_count    = directly linked canonical evidence records
```

Production-verified state before Batch 1:

```text
Total mismatches   47
Incident mismatch   0
Event mismatch     47
```

Batch 1 adds ten event-scoped evidence records derived from reviewed same-incident sources. No event text, date, status, or stored count changes.

Expected review-branch state:

```text
Total mismatches   37
Incident mismatch   0
Event mismatch     37
```

Records:

- `docs/audits/phase3-source-count-contract-2026-07-28.md`
- `docs/audits/phase3-source-count-mechanical-2026-07-28.md`
- `docs/audits/production-verification-phase3-source-count-mechanical-2026-07-28.md`
- `docs/audits/phase3-source-count-review-batch1-2026-07-28.md`
- `docs/audits/phase3-source-count-batch1-canonical-2026-07-28.md`

## Latest completed production checkpoint

```text
Canonical data PR      #79
Merge commit           3c4bae8905ff052e987f84bc798545b467de807d
Production verify      30367770935
Normal CI              30367770892
Verified state         33 / 34 / 183 / 211
Verified HTML routes   72
```

## Next

1. run the bounded Batch 1 generator and full repository suite;
2. remove temporary implementation files;
3. merge the cleaned 33 / 34 / 183 / 221 canonical PR;
4. production-verify all public data and 72 HTML routes;
5. continue with source-count review Batch 2.
