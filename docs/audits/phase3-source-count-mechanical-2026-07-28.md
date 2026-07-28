# Phase 3 source-count mechanical normalization — 2026-07-28

Status: implemented on review branch  
Contract: `docs/audits/phase3-source-count-contract-2026-07-28.md`  
Canonical totals: 33 bridges / 34 incidents / 183 events / 211 evidence

## Scope

This bounded migration changes only stale derived `source_count` values where the direct canonical evidence links already determine the correct count.

No evidence record, historical claim, timeline date, incident status, or record total is changed.

## Incident normalization

```text
bir_inc_000019   4 -> 3
bir_inc_000020   5 -> 4
bir_inc_000027   5 -> 4
bir_inc_000031   7 -> 6
bir_inc_000032  10 -> 8
bir_inc_000033   5 -> 4
bir_inc_000034   5 -> 6
```

All 34 incident `source_count` values now equal their directly linked canonical evidence-record counts.

## Event normalization

```text
bir_ev_000010   2 -> 3
bir_ev_000015   1 -> 2
bir_ev_000067   1 -> 2
bir_ev_000070   2 -> 3
bir_ev_000139   1 -> 3
bir_ev_000172   1 -> 2
```

These six events already had the additional direct evidence links. The migration updates only the stale stored counts.

## Result

```text
Total source-count mismatches   60 -> 47
Incident mismatches              7 -> 0
Event mismatches                53 -> 47
```

The remaining 47 events all have a stored count greater than their directly linked evidence-record count. They are not mechanically reduced because the mismatch may indicate missing event-scoped evidence linkage.

## Validation boundary

The temporary generator required:

- canonical totals to remain 33 / 34 / 183 / 211;
- exactly 13 intended changes;
- zero remaining incident mismatches;
- exactly 47 remaining event mismatches;
- every remaining event mismatch to be a stored-count-above-direct-count case.

The temporary generator and write-enabled workflow were removed before final review.

## Next

1. pass the normal repository CI on the cleaned branch;
2. merge the bounded canonical PR;
3. production-verify the unchanged record totals and all 72 canonical HTML routes;
4. review the remaining 47 event evidence-link mismatches in bounded batches;
5. promote exact equality to a hard CI gate only after all event mismatches are resolved.
