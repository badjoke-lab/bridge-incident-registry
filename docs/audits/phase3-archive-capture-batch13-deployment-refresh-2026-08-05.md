# Phase 3 Archive Capture Batch 13 deployment refresh — 2026-08-05

Status: build-input refresh in progress  
Canonical PR: `#174`  
Canonical merge: `ab0b45fb1f1cbe6cdddd1238c37fb99f201c934f`  
Initial production run: `30970204138`  
Initial production job: `92192668199`

## Failure boundary

The first full-content production verifier observed the same public build through all twenty attempts:

```text
Observed generated_at  2026-08-05T02:37:38.915Z
Record counts           33 / 34 / 183 / 284
First mismatch          bir_src_000248
Rejected attempts       1–20
```

The live site returned HTTP 200 for all four datasets and the expected unchanged record counts, but `data/evidence.json` did not contain the new Batch 13 archive field at `bir_src_000248`. Counts therefore could not prove publication.

## Refresh

This branch changes only the existing non-executable marker comment in `scripts/build-public-site.mjs` from Batch 12 to Batch 13. The file is a Cloudflare Pages build input.

The refresh does not change:

- canonical bridge, incident, event, or evidence data;
- build step order or execution behavior;
- generated public-data contracts;
- routes, metadata, sitemap, robots, redirects, or cache rules;
- source-quality ceilings or validation logic;
- production-verification expectations.

## Resume rule

After merge, rerun the unchanged Batch 13 production verifier. If the immediate rerun retains the same `generated_at`, do not stack another refresh commit. Allow deployment latency and rerun with the same full-content expectations.
