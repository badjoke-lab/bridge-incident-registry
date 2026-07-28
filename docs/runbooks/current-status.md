# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

## Canonical state

```text
Bridges     33
Incidents   34
Events      182
Evidence    210
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        182
data/evidence.json      210
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
Full-corpus audit             merged — PR #71
Aftermath source resolution   merged — PR #72
Aftermath canonical migration merged — PR #73
Production publication        verified — run 30358827192
```

Phase 3 aftermath changes:

- seven legacy descriptive reopening event types normalized to `bridge_reopened`
- Ronin generic aftermath event converted to sourced reimbursement completion
- Wormhole deficit backfill normalized to reimbursement completion
- nine new timeline events
- eleven new evidence records
- public reimbursement semantics added to SPEC and methodology
- reimbursement-completion warnings reduced from five to zero
- reopening warnings reduced from fifteen to three

The remaining restart reviews are:

```text
bir_inc_000015  LI.FI 2022
bir_inc_000016  LI.FI 2024
bir_inc_000017  ChainSwap July 2, 2021
```

## Latest production checkpoint

```text
Canonical data PR      #73
Merge commit           a6794d5460eb263045c23ee1a850674b1a7beb98
Production verify      30358827192
Normal CI              30358827222
Verified state         33 / 34 / 182 / 210
Verified HTML routes   72
```

Records:

- `docs/audits/full-corpus-quality-baseline-2026-07-28.md`
- `docs/audits/phase3-aftermath-source-resolution-2026-07-28.md`
- `docs/audits/phase3-aftermath-canonical-2026-07-28.md`
- `docs/audits/production-verification-phase3-aftermath-2026-07-28.md`

## Production verifier

The verifier:

- uses browser-compatible request headers
- waits for canonical `version.json` counts to converge before route checks
- uses a bounded default window of 20 attempts at 15-second intervals
- fails if publication does not converge within five minutes
- retains all count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertions

## Next

1. resolve the three remaining restart warnings through source review or status correction
2. define the `source_count` field contract before mechanical normalization
3. strengthen primary-source and archive coverage
4. continue bounded Phase 3 migrations with normal CI and production verification
