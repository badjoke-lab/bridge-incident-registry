# Phase 3 Archive Capture Batch 12 — 2026-08-03

Status: canonical application pending  
Review PR: `#157`  
Review merge: `9d5fd337b1a8383613bc27fe844eee67794f8f3c`

## Approved canonical scope

Batch 12 applies only the four unique URL mappings approved by the permanent review boundary:

```text
bir_src_000076  Celer DNS incident warning
bir_src_000271  Celer restoration and compensation update
bir_src_000274  Celer restoration and compensation update
bir_src_000080  SOCKET incident acknowledgement
bir_src_000165  Rubic incident announcement
bir_src_000272  Rubic incident announcement
```

The Holograph documentation replay is excluded because its 2022 capture predates the current-state claim reviewed in 2026. BNB Chain Fusion, SOCKET restart, pNetwork end-of-life, Commons terminal, and Transit Finance remain deferred.

## Canonical changes

- add six exact reviewed `archived_url` fields;
- keep `terminal_unarchived` ceiling at 36 because the approved records belong to active bridges;
- reduce `risky_host_unarchived` ceiling from 33 to 29.

No bridge, incident, event, or evidence record is added or removed. Source URLs, claims, source hierarchy, reliability, dates, linkages, and all non-archive fields remain unchanged.

## Validator reconciliation

The permanent validator establishes the authoritative pre-application record counts:

```text
Terminal unarchived records   49
Risky-host unarchived records 51
```

The previous runbook value of 47 terminal records was a documentation error. Batch 12 does not change the terminal queue.

## Expected post-application state

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url           91
Terminal unarchived unique URLs      36
Terminal unarchived records          49
Risky-host unarchived unique URLs    29
Risky-host unarchived records        45
X/Twitter records unarchived         32
Incident source mismatches            0
Event source mismatches               0
Unknown URL status                    0
```

Production verification remains required after canonical merge. Counts alone do not prove publication; every transformed field in all four public datasets must match.