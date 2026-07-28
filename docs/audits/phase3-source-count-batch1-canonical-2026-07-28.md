# Phase 3 source-count Batch 1 canonical migration — 2026-07-28

Status: implemented on review branch  
Source-resolution boundary: `docs/audits/phase3-source-count-review-batch1-2026-07-28.md`

## Expected canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    221
HTML routes 72
```

## Canonical additions

Ten event-scoped evidence records are added without changing events, incidents, bridges, dates, claims, or stored source counts.

```text
bir_src_000212  -> bir_ev_000013
bir_src_000213  -> bir_ev_000014
bir_src_000214  -> bir_ev_000016
bir_src_000215  -> bir_ev_000017
bir_src_000216  -> bir_ev_000021
bir_src_000217  -> bir_ev_000030
bir_src_000218  -> bir_ev_000032
bir_src_000219  -> bir_ev_000034
bir_src_000220  -> bir_ev_000035
bir_src_000221  -> bir_ev_000037
```

Each new record is derived from a reviewed same-incident source and has a distinct event ID, event-specific claim scope, and explanatory note. Existing evidence records are retained unchanged.

## Expected audit result

```text
Total source-count mismatches   47 -> 37
Incident mismatches              0 -> 0
Event mismatches                47 -> 37
```

All ten target events must have exact equality between stored `source_count` and directly linked canonical evidence records after the migration.

## Safety boundary

- no event count is changed;
- no event or incident text is changed;
- no evidence record is moved or deleted;
- repeated URLs are used only for distinct event-scoped claim linkage;
- reliability, tier, publication date, publisher, URL, and support flags are preserved from the reviewed source records;
- temporary generator and write-enabled workflow must be removed before final review.

## Validation

The bounded generator must reject execution unless:

- the starting canonical state is exactly 33 / 34 / 183 / 211;
- the maximum existing evidence ID is `bir_src_000211`;
- all ten source templates and target events exist;
- every source and target event belong to the same incident;
- the resulting evidence count is 221;
- incident mismatch count remains zero;
- event mismatch count becomes exactly 37;
- every Batch 1 target event reaches exact source-count equality.

## Next

1. run the bounded generator;
2. pass the full repository suite;
3. remove temporary implementation files;
4. merge the cleaned canonical PR;
5. production-verify 33 / 34 / 183 / 221 and all 72 canonical HTML routes;
6. continue with source-count review Batch 2.
