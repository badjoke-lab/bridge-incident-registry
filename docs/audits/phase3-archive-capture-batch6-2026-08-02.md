# Phase 3 archive capture Batch 6 canonical migration — 2026-08-02

Status: canonical migration complete  
Review boundary: PR #135

## Canonical result

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url      53 -> 64
Terminal unarchived unique URLs     39
Risky-host unarchived unique URLs   53
Terminal unarchived records         51
Risky-host unarchived records       72
Incident source mismatches           0
Event source mismatches              0
Unknown URL status                   0
```

## Applied archive fields

```text
bir_src_000032
bir_src_000033
bir_src_000071
bir_src_000074
bir_src_000157
bir_src_000161
bir_src_000211
bir_src_000228
bir_src_000253
bir_src_000255
bir_src_000280
```

The eleven records correspond to six exact Wayback snapshots reviewed in PR #135:

- Magpie secure-path update;
- ChainSwap postmortem and compensation plan;
- ChainSwap relaunch;
- Rubic weekly incident report;
- Orbit Bridge service-resumption strategy;
- Orbit Bridge follow-up plan.

## Preserved fields

Only `archived_url` was added. Original source URLs, titles, publishers, publication dates, claim scopes, source tiers, reliability, primary flags, support flags, notes, and record linkages remain unchanged.

Source and canonical record counts remain unchanged. The source-quality baseline decreases only the risky-host unique-URL ceiling from 59 to 53; the terminal ceiling remains 39.

## Deferred sources

The two Meter sources, Allbridge compensation-plan announcement, and Nomad road-to-recovery update remain unarchived because their discovered captures did not pass exact replay during the bounded review. No wildcard or guessed archive URL was added.

## Validation

The bounded migration workflow passed canonical validation, enum validation, exact source-count audit, source-quality audit, static build, and final `dist` consistency before committing the migration.

Explicit full-content production verification remains mandatory after merge.
