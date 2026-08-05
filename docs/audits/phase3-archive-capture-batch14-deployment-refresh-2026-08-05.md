# Phase 3 Archive Capture Batch 14 deployment refresh — 2026-08-05

Status: build-input refresh pending merge  
Canonical PR: `#178`  
Canonical merge: `ca225d1df10b4a81d72a0fe60fd2713b6e8b543a`  
Initial production run: `30976024931`  
Initial production job: `92210067226`

## Initial verification result

```text
Observed generated_at  2026-08-05T04:41:17.057Z
First mismatch         bir_src_000013
Rejected attempts      1–20
Record counts          33 / 34 / 183 / 284
```

The initial verifier correctly rejected prior same-count evidence content for all twenty attempts. Count equality did not satisfy the publication gate.

## Refresh boundary

This refresh changes one non-executable marker comment in `scripts/build-public-site.mjs` from Batch 13 to Batch 14.

It does not change:

- canonical bridge, incident, event, or evidence content;
- build execution order;
- runtime behavior;
- public contracts;
- routes, metadata, sitemap, robots, or redirects;
- validation logic;
- production-verification expectations.

## Required follow-up

After merge, rerun the unchanged full-content verifier. The only completion condition is complete canonical-derived public-content equality, including all seven Batch 14 archive mappings.

No second refresh commit is permitted if an immediate rerun still observes `generated_at 2026-08-05T04:41:17.057Z`. In that case, preserve the same expectations and allow deployment latency before rerunning.
