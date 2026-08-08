# Phase 3 Archive Capture Batch 17 canonical migration — 2026-08-09

Status: complete  
Review audit: `docs/audits/phase3-archive-capture-batch17-review-2026-08-09.md`  
Canonical branch: `agent/phase3-archive-capture-batch17-canonical`  
Application run: `31265101180`

## Canonical change

Four evidence records received only the exact archive URLs approved by the reproducible Batch 17 review:

```text
bir_src_000188
bir_src_000024
bir_src_000070
bir_src_000196
```

No source URL, title, claim, publication date, source tier, reliability value, bridge linkage, incident linkage, event linkage, or other evidence field changed.

## Resulting source-quality state

```text
Evidence with archived_url          120
Terminal unarchived unique URLs      21
Terminal unarchived records          31
Risky-host unarchived unique URLs    18
Risky-host unarchived records        32
X/Twitter records unarchived         29
```

## Validation boundary

The application required exact evidence IDs and canonical source URLs, empty pre-existing archive fields, exactly four unique changed records, unchanged non-target records, and exact resulting queue metrics. The permanent terminal unique-URL ceiling was lowered from 25 to 21. The risky-host ceiling remains 18.

The canonical JSON compact one-record-per-line representation was preserved. The temporary applicator and write-enabled workflow must not remain in the final branch diff.
