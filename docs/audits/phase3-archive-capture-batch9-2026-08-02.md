# Phase 3 archive capture Batch 9 canonical migration — 2026-08-02

Status: canonical migration complete  
Review boundary: PR #145

## Canonical result

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url      80 -> 81
Terminal unarchived unique URLs     39
Risky-host unarchived unique URLs   36
Terminal unarchived records         51
Risky-host unarchived records       55
Incident source mismatches           0
Event source mismatches              0
Unknown URL status                   0
```

## Applied archive field

```text
bir_src_000203
https://web.archive.org/web/20230101195631/https://medium.com/poly-network/poly-network-mainnet-upgrade-goes-live-d708f4fa2cf1
```

## Preserved fields

Only `archived_url` was added. The original source URL, title, publisher, publication date, claim scope, source tier, reliability, primary flag, support flags, notes, and record linkages remain unchanged.

Source and canonical record counts remain unchanged. The source-quality baseline decreases only the risky-host unique-URL ceiling from 37 to 36; the terminal ceiling remains 39.

## Review closure

After this migration, no unarchived first-party or official Medium, Mirror, or Substack candidate remains under the current bounded selection policy, except the known unavailable Qubit compensation-plan source that still lacks a verified snapshot.

## Validation

The bounded migration workflow passed canonical validation, enum validation, exact source-count audit, source-quality audit, static build, and final `dist` consistency before committing the migration.

Explicit full-content production verification remains mandatory after merge.
