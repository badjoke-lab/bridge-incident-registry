# Phase 3 archive capture Batch 5 — 2026-08-01

Status: canonical migration complete

## Result

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url      40 -> 53
Terminal unarchived unique URLs      39
Risky-host unarchived unique URLs 65 -> 59
Terminal unarchived records          51
Risky-host unarchived records   96 -> 83
Incident source mismatches            0
Event source mismatches               0
Unknown URL status                    0
```

## Updated evidence

```text
bir_src_000030
bir_src_000031
bir_src_000040
bir_src_000042
bir_src_000048
bir_src_000065
bir_src_000104
bir_src_000217
bir_src_000220
bir_src_000221
bir_src_000236
bir_src_000269
bir_src_000276
```

Six exact Wayback snapshots were applied to thirteen first-party Tier 1 evidence records. Records sharing one canonical source URL received the same exact snapshot.

## Source groups

- THORChain router postmortem: three evidence records;
- Meter Passport postmortem: three evidence records;
- Synapse metapool postmortem: three evidence records;
- Nomad root-cause analysis: two evidence records;
- Orbit Bridge official incident statement: one evidence record;
- Orbit Bridge recovery plan: one evidence record.

## Safety

- source URLs are unchanged;
- source tiers, reliability, primary status, claims, dates, and record linkages are unchanged;
- evidence and source counts are unchanged;
- only reviewed `archived_url` fields were added;
- the terminal archive ceiling remains 39 because all approved records belong to non-terminal current bridge states;
- the risky-host unique ceiling was tightened from 65 to 59;
- four deferred candidates remain unarchived and received no guessed snapshot;
- the canonical mappings exactly match the reviewed boundary in PR #132.

## Validation

The bounded migration passed canonical validation, enum validation, exact source-count equality, source-quality validation, static build, and final-dist consistency before commit.

## Next

Remove the temporary generator and write-enabled workflow, run full normal CI, merge the canonical migration, and explicitly verify production content equality for all fifty-three archive fields.