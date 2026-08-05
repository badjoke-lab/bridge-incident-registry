# Phase 3 Archive Capture Batch 13 — 2026-08-05

Status: canonical application in progress; production verification pending  
Review PR: `#173`  
Review merge: `fba6c668207ba1fb2613840df81123a54da5b669`

## Approved canonical scope

Batch 13 applies only the three unique URL mappings approved by the permanent review boundary:

```text
bir_src_000248  SlowMist Transit Swap exploit analysis
bir_src_000275  SOCKET fund recovery update
bir_src_000278  Transit Finance recovery update
```

Approved archive URLs:

```text
bir_src_000248
https://web.archive.org/web/20221002090056/https://slowmist.medium.com/cross-chain-dex-aggregator-transit-swap-hacked-analysis-74ba39c22020

bir_src_000275
https://web.archive.org/web/20240123171406/https://twitter.com/socketdottech/status/1749734794320363802

bir_src_000278
https://web.archive.org/web/20221002214601/https://twitter.com/transitfinance/status/1576463550557483008
```

Holograph, Taiko, Syndicate Commons, Unizen, and Everclear remain deferred. Short, missing, wildcard, guessed, failed, or temporally incompatible captures are not added.

## Canonical changes

- add three exact reviewed `archived_url` fields;
- keep `terminal_unarchived` ceiling at 36 because all approved records belong to active bridges;
- reduce `risky_host_unarchived` unique-URL ceiling from 29 to 27.

No bridge, incident, event, or evidence record is added or removed. Source URLs, claims, source hierarchy, reliability, dates, linkages, and all non-archive fields remain unchanged.

## Validator reconciliation

The first canonical attempt applied the three exact mappings and passed bounded mutation, type/Astro, data, enum, first-ten, full-corpus, and exact source-count checks. The source-quality validator then rejected the provisional `26` risky-host unique-URL ceiling because the observed authoritative value was `27`.

The classification is:

- SOCKET and Transit Finance are two distinct X/Twitter risky-host URLs and reduce the unique queue by two;
- SlowMist Medium gains an archive capture but is outside the validator's risky-host host set;
- all three evidence records leave the record-level risky-host report, reducing its count from 45 to 42.

The first attempt committed nothing. Its temporary workflow and script remained only on the bounded branch for correction and rerun.

## Expected canonical state

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url           94
Terminal unarchived unique URLs      36
Terminal unarchived records          49
Risky-host unarchived unique URLs    27
Risky-host unarchived records        42
X/Twitter records unarchived         30
Incident source mismatches            0
Event source mismatches               0
Unknown URL status                    0
```

## Safety

The canonical applicator must:

1. verify each exact evidence ID and canonical source URL;
2. require each target `archived_url` to be absent before mutation;
3. change only the three reviewed archive fields and the reconciled risky-host ceiling;
4. run canonical validation, enum validation, full-corpus audit, exact source-count audit, source-quality audit, controlled failure tests, type/Astro check, static build, and built-output consistency tests;
5. remove its temporary script and workflow before the final branch state.

Production verification remains required after canonical merge. Counts alone do not prove publication; every transformed field in all four public datasets must match.
