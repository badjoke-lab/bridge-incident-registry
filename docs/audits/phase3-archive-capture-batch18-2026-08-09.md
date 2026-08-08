# Phase 3 Archive Capture Batch 18 canonical migration — 2026-08-09

Status: complete  
Review audit: `docs/audits/phase3-archive-capture-batch18-review-2026-08-09.md`  
Canonical branch: `agent/phase3-archive-capture-batch18-canonical`  
Application run: `31265828548`

## Canonical change

Four evidence records received only the exact archive URLs approved by the reproducible Batch 18 review:

```text
bir_src_000137
bir_src_000197
bir_src_000192
bir_src_000132
```

No source URL, title, claim, publication date, source tier, reliability value, bridge linkage, incident linkage, event linkage, or other evidence field changed.

## Resulting source-quality state

```text
Evidence with archived_url          124
Terminal unarchived unique URLs      17
Terminal unarchived records          27
Risky-host unarchived unique URLs    18
Risky-host unarchived records        32
X/Twitter records unarchived         29
```

## Review-queue boundary

Batch 18 reviewed all nine remaining previously-unreviewed terminal/risky-host candidate URLs visible to the established reviewer. After this migration, further archive-preservation work must target already-reviewed deferred candidates or newly introduced canonical source URLs.

## Validation boundary

The application required exact evidence IDs and canonical source URLs, empty pre-existing archive fields, exactly four unique changed records, unchanged non-target records, and exact resulting queue metrics. The permanent terminal unique-URL ceiling was lowered from 21 to 17. The risky-host ceiling remains 18.

The canonical JSON compact one-record-per-line representation was preserved. The temporary applicator and write-enabled workflow must not remain in the final branch diff.
