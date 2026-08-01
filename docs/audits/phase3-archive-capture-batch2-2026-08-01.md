# Phase 3 archive capture Batch 2 — 2026-08-01

Status: canonical migration complete

## Result

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url      10 -> 21
Terminal unarchived unique URLs 54 -> 46
Risky-host unarchived unique URLs 83 -> 75
Terminal unarchived records      69 -> 58
Risky-host unarchived records   126 -> 115
Incident source mismatches            0
Event source mismatches               0
Unknown URL status                    0
```

## Updated evidence

```text
bir_src_000126
bir_src_000127
bir_src_000128
bir_src_000129
bir_src_000130
bir_src_000133
bir_src_000134
bir_src_000135
bir_src_000136
bir_src_000138
bir_src_000139
```

Eight exact Wayback snapshots were applied to eleven evidence records. Duplicate evidence records sharing one canonical source URL received the same exact archive snapshot.

## Source groups

- Ren Protocol: four verified official Medium URLs covering five evidence records;
- Avalanche bridge family: four verified official Medium URLs covering six evidence records.

## Safety

- source URLs are unchanged;
- source tiers, reliability, primary status, claims, dates, and record linkages are unchanged;
- evidence and source counts are unchanged;
- only reviewed `archived_url` fields were added;
- unique-URL archive-risk ceilings were tightened to the observed values;
- the canonical mappings exactly match the reviewed boundary in PR #122.

## Validation

The bounded migration passed canonical validation, enum validation, exact source-count equality, source-quality validation, static build, and final-dist consistency before commit.

## Next

Remove the temporary generator and write-enabled workflow, run full normal CI, merge the canonical migration, and explicitly verify production content equality for all twenty-one archive fields.