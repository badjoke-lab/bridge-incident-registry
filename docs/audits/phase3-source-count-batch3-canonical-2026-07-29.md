# Phase 3 source-count Batch 3 canonical migration — 2026-07-29

Status: implemented on canonical migration branch  
Review boundary: PR #89  
Baseline: 33 bridges / 34 incidents / 183 events / 231 evidence

## Canonical result

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       241
Remaining event mismatches      17
Incident mismatches              0
```

## New event-scoped evidence

| New evidence | Source template | Target event | Claim scope |
|---|---|---|---|
| `bir_src_000232` | `bir_src_000088` | `bir_ev_000071` | `recovery` |
| `bir_src_000233` | `bir_src_000088` | `bir_ev_000072` | `recovery` |
| `bir_src_000234` | `bir_src_000088` | `bir_ev_000073` | `reimbursement` |
| `bir_src_000235` | `bir_src_000100` | `bir_ev_000079` | `shutdown` |
| `bir_src_000236` | `bir_src_000104` | `bir_ev_000085` | `restart` |
| `bir_src_000237` | `bir_src_000109` | `bir_ev_000087` | `incident_case` |
| `bir_src_000238` | `bir_src_000108` | `bir_ev_000088` | `root_cause` |
| `bir_src_000239` | `bir_src_000112` | `bir_ev_000091` | `recovery` |
| `bir_src_000240` | `bir_src_000113` | `bir_ev_000091` | `recovery` |
| `bir_src_000241` | `bir_src_000118` | `bir_ev_000095` | `launch_date` |

Every added record preserves the reviewed source metadata, bridge linkage, and incident linkage while assigning a distinct evidence ID, target event ID, event-specific claim scope, and explanatory note.

## Incident derived-count synchronization

```text
bir_inc_000022  +3
bir_inc_000025  +1
bir_inc_000026  +2
bir_inc_000027  +2
```

The incident counts remain exact counts of canonical evidence records directly linked by `incident_id`.

## Event count corrections

```text
bir_ev_000079  2 -> 1
bir_ev_000096  2 -> 1
```

The Rainbow Bridge Ethereum Merge pause has one direct canonical source after the reviewed addition. The first IBC token transfer retains its one direct official source. No unrelated same-bridge source was duplicated merely to preserve a stale historical count.

## Safety boundary

- no bridge, incident, or event record was added or removed;
- no event text, date, status, amount, recovery, reimbursement, or restart claim changed;
- existing evidence records were not moved or deleted;
- only reviewed event-scoped evidence links and two supported count corrections were applied;
- temporary generator, package hook, and workflow permission changes were removed before final review.

## Validation target

The normal repository checks must verify:

- canonical JSON and enum validity;
- first-ten and full-corpus audits;
- 17 remaining event source-count warnings;
- zero incident source-count warnings;
- static build and final `dist` consistency;
- controlled audit and consistency failure fixtures.
