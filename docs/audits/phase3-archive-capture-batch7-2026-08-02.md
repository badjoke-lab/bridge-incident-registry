# Phase 3 archive capture Batch 7 canonical migration — 2026-08-02

Status: canonical migration complete  
Review boundary: PR #139

## Canonical result

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url      64 -> 71
Terminal unarchived unique URLs     39
Risky-host unarchived unique URLs   46
Terminal unarchived records         51
Risky-host unarchived records       65
Incident source mismatches           0
Event source mismatches              0
Unknown URL status                   0
```

## Applied archive fields

```text
bir_src_000049
bir_src_000051
bir_src_000054
bir_src_000066
bir_src_000067
bir_src_000072
bir_src_000103
```

The seven records correspond to seven exact Wayback snapshots reviewed in PR #139:

- Meter monthly recovery update;
- Meter Passport v1.5 audit announcement;
- Allbridge compensation-plan announcement;
- Nomad road-to-recovery update;
- Nomad relaunch guide;
- ChainSwap July 11 postmortem;
- Synapse Hadean mainnet launch.

## Preserved fields

Only `archived_url` was added. Original source URLs, titles, publishers, publication dates, claim scopes, source tiers, reliability, primary flags, support flags, notes, and record linkages remain unchanged.

Source and canonical record counts remain unchanged. The source-quality baseline decreases only the risky-host unique-URL ceiling from 53 to 46; the terminal ceiling remains 39.

## Deferred sources

The ChainSwap ASAP token update, Synapse protocol introduction, and Rubic tokenomics update remain unarchived because their discovered or attempted captures did not pass exact replay during the bounded review. No wildcard or guessed archive URL was added.

## Validation

The bounded migration workflow passed canonical validation, enum validation, exact source-count audit, source-quality audit, static build, and final `dist` consistency before committing the migration.

Explicit full-content production verification remains mandatory after merge.
