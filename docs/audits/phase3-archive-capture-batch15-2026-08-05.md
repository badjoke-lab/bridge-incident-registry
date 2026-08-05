# Phase 3 Archive Capture Batch 15 canonical migration — 2026-08-05

Status: complete  
Review audit: `docs/audits/phase3-archive-capture-batch15-review-2026-08-05.md`  
Canonical branch: `agent/phase3-archive-capture-batch15-canonical`  
Application run: `30983237442`

## Canonical change

Nine evidence records received only the exact reviewed `archived_url` values:

```text
bir_src_000023
bir_src_000022
bir_src_000205
bir_src_000214
bir_src_000091
bir_src_000206
bir_src_000014
bir_src_000149
bir_src_000167
```

Seven exact snapshot mappings were applied. The BNB Chain decentralized-response source is shared by three evidence records. The Transit Swap SlowMist source reuses the exact snapshot already verified for another canonical evidence record.

No source URL, title, claim, publication date, source tier, reliability value, bridge linkage, incident linkage, event linkage, or other evidence field changed.

## Resulting source-quality state

```text
Evidence with archived_url          110
Terminal unarchived unique URLs      28
Terminal unarchived records          38
Risky-host unarchived unique URLs    21
Risky-host unarchived records        35
X/Twitter records unarchived         30
```

## Validation boundary

The application requires exact ID and canonical-URL matches, an empty pre-existing `archived_url`, exactly nine unique changed records, and exact resulting queue metrics. The permanent source-quality validator ceilings were lowered from 33 to 28 terminal unique URLs and from 24 to 21 risky-host unique URLs.

The temporary applicator and write-enabled workflow must be removed before the canonical pull request is opened.
