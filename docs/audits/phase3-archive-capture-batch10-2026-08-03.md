# Phase 3 archive capture Batch 10 — 2026-08-03

Status: canonical migration complete; production verification required  
Review boundary: PR #148

## Canonical result

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url      81 -> 84
Terminal unique-URL queue       39 -> 37
Risky-host unique-URL queue     36 -> 34
Terminal evidence records       51 -> 48
Risky-host evidence records     55 -> 52
Incident source mismatches             0
Event source mismatches                0
Unknown URL status                     0
```

## Applied mappings

```text
bir_src_000025
https://web.archive.org/web/20230706234540/https://twitter.com/MultichainOrg/status/1677096839731097600

bir_src_000028
bir_src_000216
https://web.archive.org/web/20230707164230/https://twitter.com/MultichainOrg/status/1677180114227056641
```

The first mapping preserves Multichain's official abnormal MPC asset-movement statement. The second preserves the official indefinite-stop statement and is reused by two separately scoped evidence records sharing the same canonical source URL.

## Safety

- only the two exact mappings approved in the Batch 10 review are applied;
- source URLs, claims, source tiers, reliability, primary status, publication dates, and record linkages remain unchanged;
- source and record counts remain unchanged;
- archive-risk ceilings count normalized unique source URLs rather than duplicate evidence records;
- terminal and risky-host unique-URL ceilings each decrease by two;
- eight deferred review candidates remain unarchived and receive no wildcard, short replay, or guessed snapshot;
- complete production-content verification remains mandatory after merge.
