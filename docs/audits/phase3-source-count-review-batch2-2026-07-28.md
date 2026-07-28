# Phase 3 source-count review Batch 2 — 2026-07-28

Status: reviewed source-resolution boundary  
Canonical impact: none in this PR  
Baseline: 33 bridges / 34 incidents / 183 events / 221 evidence

## Scope

```text
bir_ev_000039
bir_ev_000040
bir_ev_000043
bir_ev_000044
bir_ev_000045
bir_ev_000053
bir_ev_000054
bir_ev_000059
bir_ev_000068
bir_ev_000069
```

## Evidence additions

| Event | Source template | New claim scope | Reason |
|---|---|---|---|
| `bir_ev_000039` | `bir_src_000053` | `incident_case` | Allbridge's official relaunch analysis documents the pool-accounting exploit, total amount, shutdown, remediation, and return to service. |
| `bir_ev_000039` | `bir_src_000055` | `incident_case` | Contemporaneous reporting independently supports the initial exploit amount and attacker-return context. |
| `bir_ev_000040` | `bir_src_000053` | `recovery` | The official analysis confirms that most stolen funds were recovered and used in the recovery process. |
| `bir_ev_000043` | `bir_src_000058` | `incident_case` | Contemporaneous reporting supports the LI.FI 2022 drain, affected-wallet count, amount, patching, and reimbursement split. |
| `bir_ev_000044` | `bir_src_000057` | `restart` | Knownsec's technical reconstruction supports redeployment, protocol restoration, and compensation handling. |
| `bir_ev_000045` | `bir_src_000060` | `incident_case` | LI.FI's official report supports the 2024 exploit mechanism, affected wallets, amount, containment, and compensation review. |
| `bir_ev_000053` | `bir_src_000071` | `reimbursement` | ChainSwap's official July 2 postmortem directly announces treasury-funded compensation and describes progress. |
| `bir_ev_000059` | `bir_src_000079` | `reimbursement` | Contemporaneous reporting based on Celer's updates supports the commitment to compensate affected users. |
| `bir_ev_000068` | `bir_src_000086` | `restart` | pNetwork's official postmortem supports the deployed fix and gradual reactivation of unaffected bridges. |
| `bir_ev_000069` | `bir_src_000086` | `reimbursement` | The same official postmortem supports the DAO-led compensation process for pBTC-on-BSC holders. |

Each additional evidence record must preserve the reviewed source's incident linkage and source metadata while receiving a distinct evidence ID, target event ID, event-specific claim scope, and explanatory note.

## Count corrections

### `bir_ev_000044`

Stored count: 3  
Direct evidence after the reviewed addition: 2  
Decision: reduce `source_count` from 3 to 2.

Only `bir_src_000058` and the reviewed event-scoped duplicate of `bir_src_000057` support the patch/redeployment and reimbursement event. `bir_src_000059` supports the exploit amount but does not carry reimbursement or reopen support flags, so it is not duplicated merely to preserve the stale count.

### `bir_ev_000054`

Stored count: 2  
Direct evidence: 1  
Decision: reduce `source_count` from 2 to 1.

`bir_src_000072` directly supports the second ChainSwap exploit and shutdown. Same-incident sources `bir_src_000073` and `bir_src_000074` support token replacement/compensation and later relaunch, not a second independent source for the exploit-and-shutdown event.

## Expected canonical migration

```text
New event-scoped evidence records   10
Incident source_count updates        6
Event source_count reductions        2
Resulting evidence total           231
Remaining source-count mismatches   27
Incident mismatches                  0
```

Affected incidents for derived-count synchronization:

```text
bir_inc_000014  +3
bir_inc_000015  +2
bir_inc_000016  +1
bir_inc_000017  +1
bir_inc_000019  +1
bir_inc_000021  +2
```

## Safety rules

- do not move or delete existing evidence records;
- do not duplicate a source where its support flags do not match the event claim;
- preserve `incident_id` and synchronize the affected incident derived counts;
- change only two stale event `source_count` values;
- do not change event text, dates, statuses, or historical amounts;
- remove all temporary inventory and implementation files before final review.

## Next

1. merge this source-resolution boundary;
2. implement the ten evidence additions, six incident derived-count updates, and two event count corrections on a fresh branch;
3. verify 33 / 34 / 183 / 231 and 27 remaining mismatches;
4. run normal CI, merge, and production verification;
5. continue with Batch 3.
