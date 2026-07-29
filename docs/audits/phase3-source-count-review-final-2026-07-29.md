# Phase 3 final source-count review — 2026-07-29

Status: reviewed source-resolution boundary  
Canonical impact: none in this PR  
Baseline: 33 bridges / 34 incidents / 183 events / 256 evidence

## Scope

```text
bir_ev_000154
bir_ev_000155
bir_ev_000158
bir_ev_000159
bir_ev_000168
bir_ev_000170
bir_ev_000171
```

## Evidence additions

| Event | Source template | New claim scope | Reason |
|---|---|---|---|
| `bir_ev_000154` | `bir_src_000182` | `amount` | Taiko's official incident statement directly supports the approximate USD 1.7 million loss estimate before containment. |
| `bir_ev_000155` | `bir_src_000183` | `restart` | Taiko's official reopening statement supports restored one-to-one backing, reviewed fixes, and the reopening boundary. |
| `bir_ev_000158` | `bir_src_000183` | `status` | The same official reopening statement directly supports the temporary conservative withdrawal quotas retained after reopening. |
| `bir_ev_000159` | `bir_src_000189` | `launch_date` | Everclear's official blog archive preserves the historical Connext launch and product-publication chronology supporting the 2018 origin year. |
| `bir_ev_000168` | `bir_src_000193` | `shutdown` | Syndicate's official compromise statement directly supports the Commons Bridge and liquidity pause during containment. |
| `bir_ev_000170` | `bir_src_000193` | `reimbursement` | The same primary statement directly supports the commitment of sufficient SYND reserves for affected users. |
| `bir_ev_000171` | `bir_src_000195` | `reimbursement` | The official Commons terminal page directly supports automatic reimbursement to Base wallets plus the additional 15 percent. |

Each additional evidence record must preserve the reviewed source's bridge and incident linkage and source metadata while receiving a distinct evidence ID, target event ID, event-specific claim scope, and explanatory note.

## Count corrections

None.

All seven stored event counts can be satisfied with reviewed source-backed event links. No unrelated source is duplicated merely to preserve a historical count.

## Expected canonical migration

```text
New event-scoped evidence records    7
Incident source_count updates         2 incidents / +6 records
Event source_count reductions         0
Resulting evidence total            263
Remaining event mismatches            0
Incident mismatches                   0
```

Affected incidents for derived-count synchronization:

```text
bir_inc_000033  +3
bir_inc_000034  +3
```

## Hard-gate transition

After the canonical migration passes the full-corpus audit with exact equality:

- event `source_count` equality becomes a blocking CI assertion;
- incident `source_count` equality remains a blocking CI assertion;
- no warning allowance remains for source-count mismatches;
- controlled failure fixtures must prove that either mismatch type fails CI.

## Safety rules

- do not move or delete existing evidence records;
- do not duplicate a source where its metadata or support does not match the event claim;
- preserve `incident_id` and synchronize the two affected incident derived counts;
- do not change event `source_count` values in this migration;
- do not change event text, dates, statuses, amounts, or historical claims;
- remove all temporary inventory and write-enabled workflow files before final review.

## Next

1. merge this final source-resolution boundary;
2. implement the seven evidence additions and two incident derived-count synchronizations on a fresh branch;
3. verify 33 / 34 / 183 / 263 with exact event and incident source-count equality;
4. promote source-count equality from warning to hard CI failure;
5. run normal CI, merge, and production verification;
6. continue primary-source, archive, URL, and validator strengthening.
