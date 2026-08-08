# Phase 3 Archive Deferred Retry 01 canonical migration — 2026-08-09

Status: complete  
Review audit: `docs/audits/phase3-archive-deferred-retry-01-review-2026-08-09.md`  
Canonical branch: `agent/phase3-archive-deferred-retry-01-canonical`  
Application run: `31267034260`

## Canonical change

Two evidence records received only the exact archive URLs approved by Deferred Retry 01:

```text
bir_src_000037
bir_src_000068
```

No source URL, title, claim, publication date, source tier, reliability value, bridge linkage, incident linkage, event linkage, or other evidence field changed.

## Resulting source-quality state

```text
Evidence with archived_url          126
Terminal unarchived unique URLs      15
Terminal unarchived records          25
Risky-host unarchived unique URLs    17
Risky-host unarchived records        31
X/Twitter records unarchived         29
```

## Validation boundary

The application required exact evidence IDs and canonical source URLs, empty pre-existing archive fields, exactly two unique changed records, unchanged non-target records, and exact resulting queue metrics. The permanent terminal unique-URL ceiling was lowered from 17 to 15 and the risky-host unique-URL ceiling from 18 to 17.

The canonical JSON compact one-record-per-line representation was preserved. The temporary applicator and write-enabled workflow must not remain in the final branch diff.
