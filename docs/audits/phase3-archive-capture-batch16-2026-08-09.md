# Phase 3 Archive Capture Batch 16 canonical migration — 2026-08-09

Status: complete  
Review audit: `docs/audits/phase3-archive-capture-batch16-review-2026-08-09.md`  
Canonical branch: `agent/phase3-archive-capture-batch16-canonical`  
Application run: `31264161126`

## Canonical change

Six evidence records received only the exact archive URLs approved by the reproducible Batch 16 review:

```text
bir_src_000069
bir_src_000027
bir_src_000026
bir_src_000168
bir_src_000173
bir_src_000176
```

No source URL, title, claim, publication date, source tier, reliability value, bridge linkage, incident linkage, event linkage, or other evidence field changed.

## Resulting source-quality state

```text
Evidence with archived_url          116
Terminal unarchived unique URLs      25
Terminal unarchived records          35
Risky-host unarchived unique URLs    18
Risky-host unarchived records        32
X/Twitter records unarchived         29
```

## Validation boundary

The application required exact evidence IDs and canonical source URLs, empty pre-existing archive fields, exactly six unique changed records, unchanged non-target records, and exact resulting queue metrics. The permanent source-quality ceilings were lowered from 28 to 25 terminal unique URLs and from 21 to 18 risky-host unique URLs.

The canonical JSON compact one-record-per-line representation was preserved. The temporary applicator and write-enabled workflow must not remain in the final branch diff.
