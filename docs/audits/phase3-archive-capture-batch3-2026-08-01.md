# Phase 3 archive capture Batch 3 — 2026-08-01

Status: canonical migration complete

## Result

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url      21 -> 27
Terminal unarchived unique URLs 46 -> 40
Risky-host unarchived unique URLs 75 -> 69
Terminal unarchived records      58 -> 52
Risky-host unarchived records   115 -> 109
Incident source mismatches            0
Event source mismatches               0
Unknown URL status                    0
```

## Updated evidence

```text
bir_src_000038
bir_src_000085
bir_src_000089
bir_src_000141
bir_src_000142
bir_src_000143
```

Six exact Wayback snapshots were applied to six first-party evidence records.

## Source groups

- ShuttleFlow / Conflux Network: three official Medium sources;
- pNetwork: two official Medium sources;
- Qubit / Bunny same-operator ecosystem: one official Medium source.

## Safety

- source URLs are unchanged;
- source tiers, reliability, primary status, claims, dates, and record linkages are unchanged;
- evidence and source counts are unchanged;
- only reviewed `archived_url` fields were added;
- unique-URL archive-risk ceilings were tightened to the observed values;
- `bir_src_000037` remains unarchived because no verified snapshot is available;
- the canonical mappings exactly match the reviewed boundary in PR #126.

## Validation

The bounded migration passed canonical validation, enum validation, exact source-count equality, source-quality validation, static build, and final-dist consistency before commit.

## Next

Remove the temporary generator and write-enabled workflow, run full normal CI, merge the canonical migration, and explicitly verify production content equality for all twenty-seven archive fields.