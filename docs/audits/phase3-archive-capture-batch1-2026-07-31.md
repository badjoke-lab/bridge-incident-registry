# Phase 3 archive capture Batch 1 — 2026-07-31

Status: canonical migration complete

## Result

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url       0 -> 10
Terminal unarchived unique URLs 59 -> 54
Risky-host unarchived unique URLs 88 -> 83
Terminal unarchived records      79 -> 69
Risky-host unarchived records   136 -> 126
Incident source mismatches            0
Event source mismatches               0
Unknown URL status                    0
```

## Updated evidence

```text
bir_src_000035
bir_src_000039
bir_src_000086
bir_src_000088
bir_src_000090
bir_src_000230
bir_src_000231
bir_src_000232
bir_src_000233
bir_src_000234
```

Five verified Wayback snapshots were applied to ten evidence records. Duplicate evidence records that share one canonical source URL received the same exact archive snapshot.

## Safety

- source URLs are unchanged;
- source tiers, reliability, primary status, claims, and record linkages are unchanged;
- evidence and source counts are unchanged;
- only reviewed `archived_url` fields were added;
- `bir_src_000037` remains unarchived because no verified snapshot was available;
- unique-URL archive-risk ceilings were tightened to the observed values.

## Validation

The bounded migration passed canonical validation, enum validation, exact source-count equality, source-quality validation, static build, and final-dist consistency before commit.

## Next

Remove the temporary generator and write-enabled workflow, run full normal CI, merge the canonical migration, and explicitly verify production content equality for all archive fields.
