# Phase 3 source-count review Batch 1 — 2026-07-28

Status: reviewed source-resolution boundary, implementation correction recorded  
Baseline: 33 bridges / 34 incidents / 183 events / 211 evidence

## Scope

This batch reviews ten of the forty-seven remaining event `source_count` mismatches.

```text
bir_ev_000013
bir_ev_000014
bir_ev_000016
bir_ev_000017
bir_ev_000021
bir_ev_000030
bir_ev_000032
bir_ev_000034
bir_ev_000035
bir_ev_000037
```

Each event has a stored count exactly one above its directly linked evidence-record count. A reviewed same-incident source already supports each event but is linked to a sibling event. The remedy is an additional event-scoped evidence record with a distinct claim scope.

No event count is reduced or increased.

## Decisions

| Event | Source template | New claim scope | Reviewed reason |
|---|---|---|---|
| `bir_ev_000013` | `bir_src_000018` | `incident_case` | Wired independently supports the Poly Network theft, approximate amount, and cross-chain incident context. |
| `bir_ev_000014` | `bir_src_000017` | `recovery` | Chainalysis directly documents early staged returns. |
| `bir_ev_000016` | `bir_src_000022` | `incident_case` | BNB Chain's official retrospective supports the forged-proof exploit, nominal mint, validator response, and unrecovered amount. |
| `bir_ev_000017` | `bir_src_000021` | `restart` | BNB Chain's official update supports the emergency suspension and return of network operation. |
| `bir_ev_000021` | `bir_src_000028` | `shutdown` | Multichain's indefinite-stop statement is a separate official shutdown-stage source supporting later cessation. |
| `bir_ev_000030` | `bir_src_000040` | `recovery` | THORChain's primary postmortem assigns losses to treasury coverage and describes staged recovery and reopening. |
| `bir_ev_000032` | `bir_src_000209` | `restart` | THORChain's official retrospective confirms restart after the 2021 incidents. |
| `bir_ev_000034` | `bir_src_000045` | `recovery` | THORChain Exploit Report #1 supports the patch and governance recovery-review state. |
| `bir_ev_000035` | `bir_src_000048` | `incident_case` | Meter's primary postmortem supports the exploit mechanism, liability amount, shutdown, and response. |
| `bir_ev_000037` | `bir_src_000048` | `reimbursement` | Meter's primary postmortem supports the PASS compensation structure and distribution context. |

## Implementation correction

The original boundary expected no incident changes. Generator validation exposed a cross-level consequence: every new evidence record preserves the reviewed `incident_id`, so direct incident evidence counts also increase.

Removing `incident_id` would create an artificial event-only record and weaken canonical linkage. The correct implementation therefore synchronizes the derived `source_count` value for the seven affected incidents.

Affected incidents:

```text
bir_inc_000005  +2
bir_inc_000006  +2
bir_inc_000007  +1
bir_inc_000010  +1
bir_inc_000011  +1
bir_inc_000012  +1
bir_inc_000013  +2
```

This is not a new historical claim. It is required by the already merged contract:

```text
incident.source_count = count(evidence where evidence.incident_id == incident.id)
event.source_count    = count(evidence where evidence.event_id == event.id)
```

## Corrected expected canonical migration

```text
New event-scoped evidence records   10
Incident source_count updates        7
Event source_count changes           0
Event text changes                   0
Resulting evidence total           221
Remaining source-count mismatches   37
```

## Duplication rule

The repeated URLs are permitted because each new evidence record has a different `event_id`, a distinct event-specific `claim_scope`, and an explanatory note. Reliability, tier, publisher, publication date, URL, and support flags remain inherited from the reviewed source record.

This is canonical event linkage, not artificial source inflation.

## Safety rules

- do not move or delete existing evidence records;
- do not change event dates, text, status, or stored source counts;
- update only the seven incident derived counts affected by preserved `incident_id` links;
- do not claim that a source supports a field absent from its existing support flags;
- do not merge temporary inventory or implementation files.

## Next

1. add the ten event-scoped evidence records;
2. synchronize the seven affected incident source counts;
3. verify evidence total 221 and mismatch count 37;
4. run normal CI, merge, and production verification;
5. continue with Batch 2.
