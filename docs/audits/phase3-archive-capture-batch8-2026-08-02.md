# Phase 3 archive capture Batch 8 canonical migration — 2026-08-02

Status: canonical migration complete  
Review boundary: PR #142

## Canonical result

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url      71 -> 80
Terminal unarchived unique URLs     39
Risky-host unarchived unique URLs   37
Terminal unarchived records         51
Risky-host unarchived records       56
Incident source mismatches           0
Event source mismatches              0
Unknown URL status                   0
```

## Applied archive fields

```text
bir_src_000073
bir_src_000102
bir_src_000162
bir_src_000163
bir_src_000170
bir_src_000204
bir_src_000268
bir_src_000270
bir_src_000279
```

The nine records correspond to nine exact Wayback snapshots reviewed in PR #142:

- ChainSwap ASAP token update;
- Synapse protocol introduction;
- three Rubic official sources;
- Poly Network September monthly report;
- Ronin validator community alert;
- Poly Network asset-recovery completion;
- Transit Finance update.

## Preserved fields

Only `archived_url` was added. Original source URLs, titles, publishers, publication dates, claim scopes, source tiers, reliability, primary flags, support flags, notes, and record linkages remain unchanged.

Source and canonical record counts remain unchanged. The source-quality baseline decreases only the risky-host unique-URL ceiling from 46 to 37; the terminal ceiling remains 39.

## Deferred source

The Poly Network mainnet-upgrade announcement remains unarchived because its discovered capture did not pass exact replay during the bounded review. No wildcard or guessed archive URL was added.

## Validation

The bounded migration workflow passed canonical validation, enum validation, exact source-count audit, source-quality audit, static build, and final `dist` consistency before committing the migration.

Explicit full-content production verification remains mandatory after merge.
