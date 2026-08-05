# Phase 3 Archive Capture Batch 15 deployment refresh — 2026-08-05

Status: refresh prepared  
Canonical PR: `#182`  
Canonical merge: `39134a5d7b717c467a49d96b5fd7104047cd0a50`  
Initial production run: `30983843765`  
Initial production job: `92234015826`

## Initial production observation

```text
Observed generated_at  2026-08-05T06:55:22.730Z
Record counts          33 / 34 / 183 / 284
First mismatch         bir_src_000014
Rejected attempts      1–20
```

The custom domain returned matching record counts but stale same-count evidence content. The permanent verifier rejected the publication before route checks because the public `bir_src_000014` record did not equal the canonical-derived Batch 15 record.

## Refresh boundary

This branch changes only the non-executable Batch marker comment in `scripts/build-public-site.mjs` from Batch 14 to Batch 15 and records this audit.

The refresh does not change:

- canonical data;
- the seven build steps or their execution order;
- generated public-data semantics;
- routes, metadata, redirects, sitemap, or robots;
- validators or production-verification expectations.

Only one build-input refresh is permitted for this publication. If the immediate rerun still observes `generated_at 2026-08-05T06:55:22.730Z`, no second refresh commit may be added. The unchanged full-content verifier must be rerun after deployment latency.
