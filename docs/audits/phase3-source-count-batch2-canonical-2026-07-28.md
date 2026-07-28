# Phase 3 source-count Batch 2 canonical migration — 2026-07-28

Status: implemented on review branch  
Source-resolution boundary: `docs/audits/phase3-source-count-review-batch2-2026-07-28.md`

## Expected canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    231
HTML routes 72
```

## Canonical changes

Ten reviewed event-scoped evidence records are added:

```text
bir_src_000222  -> bir_ev_000039
bir_src_000223  -> bir_ev_000039
bir_src_000224  -> bir_ev_000040
bir_src_000225  -> bir_ev_000043
bir_src_000226  -> bir_ev_000044
bir_src_000227  -> bir_ev_000045
bir_src_000228  -> bir_ev_000053
bir_src_000229  -> bir_ev_000059
bir_src_000230  -> bir_ev_000068
bir_src_000231  -> bir_ev_000069
```

Six affected incident `source_count` values are synchronized because every new evidence record preserves the reviewed `incident_id`.

```text
bir_inc_000014  +3
bir_inc_000015  +2
bir_inc_000016  +1
bir_inc_000017  +1
bir_inc_000019  +1
bir_inc_000021  +2
```

Two stale event counts are corrected:

```text
bir_ev_000044   3 -> 2
bir_ev_000054   2 -> 1
```

These reductions remove unsupported counts. No source is duplicated solely to retain a stale value.

## Expected audit result

```text
Total source-count mismatches   37 -> 27
Incident mismatches              0 -> 0
Event mismatches                37 -> 27
```

## Safety boundary

- no event text, date, status, or historical amount is changed;
- no existing evidence record is moved or deleted;
- repeated URLs are used only for distinct event and claim-scope linkage;
- source metadata and support flags are preserved from reviewed records;
- only six incident derived counts and two event derived counts change;
- temporary generator and write-enabled workflow must be removed before final review.

## Validation

The bounded generator must reject execution unless:

- the starting canonical state is exactly 33 / 34 / 183 / 221;
- the maximum evidence ID is `bir_src_000221`;
- every source template and target event exists;
- source and target event incident IDs match;
- exactly six incident derived counts require synchronization;
- the resulting evidence count is 231;
- incident mismatch count is zero;
- event mismatch count is exactly 27;
- all ten target events and both corrected events reach exact equality.

## Next

1. run the bounded generator;
2. pass the complete repository suite;
3. remove temporary implementation files;
4. merge the cleaned canonical PR;
5. production-verify 33 / 34 / 183 / 231 and all 72 routes;
6. continue with source-count review Batch 3.
