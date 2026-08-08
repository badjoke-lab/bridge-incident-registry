# Phase 3 Archive Capture Batch 18 deployment refresh — 2026-08-09

Status: refresh prepared  
Canonical PR: `#195`  
Canonical merge: `50ca3782c4940e095ff94de2cce220a3ee0c7da5`  
Initial production run: `31266002708`  
Initial production job: `93124105488`

## Initial production observation

```text
Record counts          33 / 34 / 183 / 284
First mismatch         bir_src_000132
Rejected attempts      1–20
Attempts 1–14          generated_at 2026-08-08T15:57:37.030Z
Attempts 15–20         generated_at 2026-08-08T16:06:25.283Z
Content match          false throughout
```

The custom domain returned matching record counts throughout the window. A newer generated build appeared at attempt 15, but the public `bir_src_000132` record still did not equal the canonical-derived Batch 18 record. The permanent verifier correctly rejected publication before route checks.

## Refresh boundary

This branch changes only the non-executable Batch marker comment in `scripts/build-public-site.mjs` from Batch 15 to Batch 18 and records this audit.

The refresh does not change:

- canonical data;
- the seven build steps or their execution order;
- generated public-data semantics;
- routes, metadata, redirects, sitemap, or robots;
- validators or production-verification expectations.

Only one build-input refresh is permitted for Batch 18 publication. If the next verifier still observes stale content, no second refresh commit may be added. The unchanged full-content verifier must remain authoritative; queue/deployment latency must be investigated without weakening expectations.
