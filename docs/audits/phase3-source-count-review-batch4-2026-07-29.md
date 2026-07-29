# Phase 3 source-count review Batch 4 — 2026-07-29

Status: reviewed source-resolution boundary  
Canonical impact: none in this PR  
Baseline: 33 bridges / 34 incidents / 183 events / 241 evidence

## Scope

```text
bir_ev_000097
bir_ev_000098
bir_ev_000099
bir_ev_000102
bir_ev_000125
bir_ev_000126
bir_ev_000130
bir_ev_000131
bir_ev_000132
bir_ev_000153
```

## Evidence additions

| Event | Source template | New claim scope | Reason |
|---|---|---|---|
| `bir_ev_000097` | `bir_src_000120` | `security_context` | The official Dragonberry/Elderflower retrospective directly supports vulnerability discovery, risk characterization, and the absence of known exploitation. |
| `bir_ev_000098` | `bir_src_000119` | `security_patch` | The official Dragonberry advisory documents confidential coordination and the validator voting-power threshold for mitigation. |
| `bir_ev_000098` | `bir_src_000120` | `security_patch` | The official retrospective independently documents the private coordination and staged mitigation timeline. |
| `bir_ev_000099` | `bir_src_000119` | `security_patch` | The official advisory identifies the affected release lines and the coordinated public patch response. |
| `bir_ev_000099` | `bir_src_000120` | `security_patch` | The official retrospective supports the October 14 public release and the Dragonberry/Elderflower remediation sequence. |
| `bir_ev_000102` | `bir_src_000122` | `security_patch` | The official Huckleberry advisory identifies affected versions and the supported patched release lines, complementing the direct v7.0.1 release record. |
| `bir_ev_000125` | `bir_src_000149` | `incident_case` | SlowMist's same-day technical analysis supports disclosure, attacker tracing, and the initial incident response. |
| `bir_ev_000125` | `bir_src_000150` | `incident_case` | Numen Cyber Labs independently supports the disclosed routing/approval exploit, tracing, and early return context. |
| `bir_ev_000126` | `bir_src_000150` | `recovery` | The technical analysis directly states that approximately 70 percent of the stolen assets had been returned. |
| `bir_ev_000130` | `bir_src_000156` | `incident_case` | Magpie's official postmortem directly supports the router exploit, 221 affected wallets, and incident amount. |
| `bir_ev_000131` | `bir_src_000156` | `shutdown` | The official postmortem directly supports the dApp pause and shutdown during containment. |
| `bir_ev_000131` | `bir_src_000157` | `shutdown` | Magpie's official follow-up confirms the incident-response shutdown and security work before relaunch. |
| `bir_ev_000132` | `bir_src_000156` | `reimbursement` | The official postmortem states that affected users were reimbursed in full with the original assets. |
| `bir_ev_000132` | `bir_src_000157` | `reimbursement` | The official follow-up independently confirms completion of full refunds. |
| `bir_ev_000153` | `bir_src_000182` | `shutdown` | Taiko's official containment statement directly supports suspension of bridge withdrawals during the incident response. |

Each additional evidence record must preserve the reviewed source's bridge and incident linkage and source metadata while receiving a distinct evidence ID, target event ID, event-specific claim scope, and explanatory note.

## Count corrections

None.

All ten stored event counts can be satisfied with the reviewed source-backed event links. No unrelated source is duplicated merely to preserve a historical count.

## Expected canonical migration

```text
New event-scoped evidence records   15
Incident source_count updates         3 incidents / +9 records
Event source_count reductions         0
Resulting evidence total            256
Remaining event mismatches            7
Incident mismatches                   0
```

Affected incidents for derived-count synchronization:

```text
bir_inc_000028  +3
bir_inc_000029  +5
bir_inc_000033  +1
```

## Remaining mismatch window

```text
bir_ev_000154
bir_ev_000155
bir_ev_000158
bir_ev_000159
bir_ev_000168
bir_ev_000170
bir_ev_000171
```

## Safety rules

- do not move or delete existing evidence records;
- do not duplicate a source where its metadata or support does not match the event claim;
- preserve `incident_id` and synchronize the three affected incident derived counts;
- do not change event `source_count` values in this batch;
- do not change event text, dates, statuses, amounts, or historical claims;
- remove all temporary inventory and write-enabled workflow files before final review.

## Next

1. merge this source-resolution boundary;
2. implement the fifteen evidence additions and three incident derived-count synchronizations on a fresh branch;
3. verify 33 / 34 / 183 / 256 and 7 remaining mismatches;
4. run normal CI, merge, and production verification;
5. complete the final mismatch batch.
