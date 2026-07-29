# Phase 3 source-count review Batch 3 — 2026-07-29

Status: reviewed source-resolution boundary  
Canonical impact: none in this PR  
Baseline: 33 bridges / 34 incidents / 183 events / 231 evidence

## Scope

```text
bir_ev_000071
bir_ev_000072
bir_ev_000073
bir_ev_000079
bir_ev_000085
bir_ev_000087
bir_ev_000088
bir_ev_000091
bir_ev_000095
bir_ev_000096
```

## Evidence additions

| Event | Source template | New claim scope | Reason |
|---|---|---|---|
| `bir_ev_000071` | `bir_src_000088` | `recovery` | pNetwork's official postmortem documents the emergency whitehat drain, the 12,977 BNB amount, and the recovery purpose. |
| `bir_ev_000072` | `bir_src_000088` | `recovery` | The same official postmortem directly documents the replacement contract and snapshot-based recovery plan. |
| `bir_ev_000073` | `bir_src_000088` | `reimbursement` | The official postmortem includes the legal and compliance delay update for the planned redistribution. |
| `bir_ev_000079` | `bir_src_000100` | `shutdown` | Aurora Labs' official restart notice identifies the Ethereum Merge pause and the bridge's later return. |
| `bir_ev_000085` | `bir_src_000104` | `restart` | Synapse's official postmortem documents validator restoration, pending-transaction processing, and migration to new pools. |
| `bir_ev_000087` | `bir_src_000109` | `incident_case` | Halborn's independent analysis supports the Nerve metapool exploit, affected pools, and approximate amount. |
| `bir_ev_000088` | `bir_src_000108` | `root_cause` | BlockSec's technical analysis directly supports the inconsistent exchange-amount calculation and Saddle-derived root cause. |
| `bir_ev_000091` | `bir_src_000112` | `recovery` | Holograph's official incident statement supports the protocol lock and coordinated freezing response. |
| `bir_ev_000091` | `bir_src_000113` | `recovery` | Contemporaneous independent reporting quotes the official response and supports the freeze and containment context. |
| `bir_ev_000095` | `bir_src_000118` | `launch_date` | IBC's official three-year retrospective supports the March 29 inaugural connection date. |

Each additional evidence record must preserve the reviewed source's bridge and incident linkage and source metadata while receiving a distinct evidence ID, target event ID, event-specific claim scope, and explanatory note.

## Count corrections

### `bir_ev_000079`

Stored count: 2  
Direct evidence after the reviewed addition: 1  
Decision: reduce `source_count` from 2 to 1.

`bir_src_000100` directly supports the Ethereum Merge pause and restart. Other Rainbow Bridge records support launch, architecture, attack attempts, current operation, or unrelated security context, but do not provide a second direct source for this maintenance pause.

### `bir_ev_000096`

Stored count: 2  
Direct evidence: 1  
Decision: reduce `source_count` from 2 to 1.

`bir_src_000118` directly supports the April 2 first token transfer. `bir_src_000117` provides general protocol history and supports the inaugural connection event, but it is not duplicated merely to preserve a stale count for the distinct first-transfer claim.

## Expected canonical migration

```text
New event-scoped evidence records   10
Incident source_count updates         4 incidents / +8 records
Event source_count reductions         2
Resulting evidence total            241
Remaining source-count mismatches    17
Incident mismatches                   0
```

Affected incidents for derived-count synchronization:

```text
bir_inc_000022  +3
bir_inc_000025  +1
bir_inc_000026  +2
bir_inc_000027  +2
```

## Safety rules

- do not move or delete existing evidence records;
- do not duplicate a source where its metadata or support does not match the event claim;
- preserve `incident_id` and synchronize the four affected incident derived counts;
- change only the two reviewed stale event `source_count` values;
- do not change event text, dates, statuses, amounts, or historical claims;
- remove all temporary inventory and write-enabled workflow files before final review.

## Next

1. merge this source-resolution boundary;
2. implement the ten evidence additions, four incident derived-count synchronizations, and two event count corrections on a fresh branch;
3. verify 33 / 34 / 183 / 241 and 17 remaining mismatches;
4. run normal CI, merge, and production verification;
5. continue with Batch 4.
