# Phase 3 archive capture Batch 4 — 2026-08-01

Status: canonical migration complete

## Result

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url      27 -> 40
Terminal unarchived unique URLs 40 -> 39
Risky-host unarchived unique URLs 69 -> 65
Terminal unarchived records      52 -> 51
Risky-host unarchived records   109 -> 96
Incident source mismatches            0
Event source mismatches               0
Unknown URL status                    0
```

## Updated evidence

```text
bir_src_000053
bir_src_000156
bir_src_000190
bir_src_000207
bir_src_000208
bir_src_000209
bir_src_000210
bir_src_000218
bir_src_000222
bir_src_000224
bir_src_000251
bir_src_000252
bir_src_000254
```

Four exact Wayback snapshots were applied to thirteen first-party Tier 1 evidence records. Records sharing one canonical source URL received the same exact snapshot.

## Source groups

- Connext / Everclear history: one source and one evidence record;
- Allbridge Core: one source and four evidence records;
- Magpie Protocol: one source and four evidence records;
- THORChain: one source and four evidence records.

## Safety

- source URLs are unchanged;
- source tiers, reliability, primary status, claims, dates, and record linkages are unchanged;
- evidence and source counts are unchanged;
- only reviewed `archived_url` fields were added;
- unique-URL archive-risk ceilings were tightened to the observed values;
- six deferred verification failures remain unarchived and received no guessed snapshot;
- the canonical mappings exactly match the reviewed boundary in PR #129.

## Validation

The bounded migration passed canonical validation, enum validation, exact source-count equality, source-quality validation, static build, and final-dist consistency before commit.

## Next

Remove the temporary generator and write-enabled workflow, run full normal CI, merge the canonical migration, and explicitly verify production content equality for all forty archive fields.