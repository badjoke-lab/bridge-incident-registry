# Phase 3 source-count Batch 4 canonical migration — 2026-07-29

Status: implemented on canonical migration branch  
Review boundary: PR #93  
Baseline: 33 bridges / 34 incidents / 183 events / 241 evidence

## Canonical result

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       256
Remaining event mismatches       7
Incident mismatches              0
```

## New event-scoped evidence

| New evidence | Source template | Target event | Claim scope |
|---|---|---|---|
| `bir_src_000242` | `bir_src_000120` | `bir_ev_000097` | `security_context` |
| `bir_src_000243` | `bir_src_000119` | `bir_ev_000098` | `security_patch` |
| `bir_src_000244` | `bir_src_000120` | `bir_ev_000098` | `security_patch` |
| `bir_src_000245` | `bir_src_000119` | `bir_ev_000099` | `security_patch` |
| `bir_src_000246` | `bir_src_000120` | `bir_ev_000099` | `security_patch` |
| `bir_src_000247` | `bir_src_000122` | `bir_ev_000102` | `security_patch` |
| `bir_src_000248` | `bir_src_000149` | `bir_ev_000125` | `incident_case` |
| `bir_src_000249` | `bir_src_000150` | `bir_ev_000125` | `incident_case` |
| `bir_src_000250` | `bir_src_000150` | `bir_ev_000126` | `recovery` |
| `bir_src_000251` | `bir_src_000156` | `bir_ev_000130` | `incident_case` |
| `bir_src_000252` | `bir_src_000156` | `bir_ev_000131` | `shutdown` |
| `bir_src_000253` | `bir_src_000157` | `bir_ev_000131` | `shutdown` |
| `bir_src_000254` | `bir_src_000156` | `bir_ev_000132` | `reimbursement` |
| `bir_src_000255` | `bir_src_000157` | `bir_ev_000132` | `reimbursement` |
| `bir_src_000256` | `bir_src_000182` | `bir_ev_000153` | `shutdown` |

Every added record preserves the reviewed source metadata, bridge linkage, and incident linkage while assigning a distinct evidence ID, target event ID, event-specific claim scope, and explanatory note.

## Incident derived-count synchronization

```text
bir_inc_000028  +3
bir_inc_000029  +5
bir_inc_000033  +1
```

The incident counts remain exact counts of canonical evidence records directly linked by `incident_id`.

## Event count corrections

None.

The fifteen reviewed links satisfy the ten stored event counts. No event `source_count` value changed.

## Safety boundary

- no bridge, incident, or event record was added or removed;
- no event count, text, date, status, amount, recovery, reimbursement, or restart claim changed;
- existing evidence records were not moved or deleted;
- only reviewed event-scoped evidence links and three incident derived-count synchronizations were applied;
- temporary generator, package hook, and workflow permission changes were removed before final review.

## Validation target

The normal repository checks must verify:

- canonical JSON and enum validity;
- first-ten and full-corpus audits;
- 7 remaining event source-count warnings;
- zero incident source-count warnings;
- static build and final `dist` consistency;
- controlled audit and consistency failure fixtures.
