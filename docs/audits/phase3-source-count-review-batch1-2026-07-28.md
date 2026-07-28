# Phase 3 source-count review Batch 1 — 2026-07-28

Status: reviewed source-resolution boundary  
Canonical impact: none in this PR  
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

Each event has a stored count exactly one above its directly linked evidence-record count. The same-incident inventory shows that a canonical source already supports the event but is linked to a sibling event. The reviewed remedy is an additional event-scoped evidence record with a distinct claim scope.

No event count is reduced in this batch.

## Decisions

### `bir_ev_000013` — Poly Network exploit disclosed

Add an event-scoped record derived from `bir_src_000018`.

- source: Wired, “A Hacker Stole $610M of Cryptocurrency—and Returned Most of It”
- new claim scope: `incident_case`
- reason: the source independently supports the theft, approximate amount, and cross-chain incident context, while its existing record remains recovery-scoped to `bir_ev_000014`

### `bir_ev_000014` — Stolen funds returned in stages

Add an event-scoped record derived from `bir_src_000017`.

- source: Chainalysis, “Poly Network Attacker Returning Funds After Pulling Off Biggest DeFi Theft Ever”
- new claim scope: `recovery`
- reason: the source directly documents early staged returns; its existing record remains incident-scoped to `bir_ev_000013`

### `bir_ev_000016` — BSC Token Hub exploit disclosed

Add an event-scoped record derived from `bir_src_000022`.

- source: BNB Chain, “BNB Chain: A Decentralized Response”
- new claim scope: `incident_case`
- reason: the official retrospective explains the forged-proof exploit, nominal mint, validator response, and unrecovered amount; the existing record remains recovery-scoped to `bir_ev_000017`

### `bir_ev_000017` — BNB Smart Chain resumed after coordinated response

Add an event-scoped record derived from `bir_src_000021`.

- source: BNB Chain, “BNB Chain Ecosystem Update”
- new claim scope: `restart`
- reason: the official update covers the emergency suspension and return of network operation; the existing record remains incident-scoped to `bir_ev_000016`

### `bir_ev_000021` — Multichain announced cessation of operations

Add an event-scoped record derived from `bir_src_000028`.

- source: Multichain statement that service stopped indefinitely
- new claim scope: `shutdown`
- reason: the July 7 indefinite-stop statement is a separate official shutdown-stage source supporting the later cessation event; the existing record remains status-scoped to `bir_ev_000020`

### `bir_ev_000030` — Treasury coverage and staged recovery plan announced

Add an event-scoped record derived from `bir_src_000040`.

- source: THORChain postmortem for ETH Router exploits 1 and 2
- new claim scope: `recovery`
- reason: the primary postmortem directly assigns losses to treasury coverage and describes the staged recovery and reopening plan; the existing record remains incident-scoped to `bir_ev_000029`

### `bir_ev_000032` — THORChain returned to staged trading after remediation

Add an event-scoped record derived from `bir_src_000209`.

- source: THORChain, “THORChain's Layers of Security”
- new claim scope: `restart`
- reason: the official retrospective confirms that the chain restarted after the 2021 incidents; the existing record remains reimbursement-scoped to `bir_ev_000181`

### `bir_ev_000034` — TSS patch released and recovery options moved to governance

Add an event-scoped record derived from `bir_src_000045`.

- source: THORChain Exploit Report #1
- new claim scope: `recovery`
- reason: the primary report covers the patch and recovery-review state; the existing record remains incident-scoped to `bir_ev_000033`

### `bir_ev_000035` — Meter Passport false-deposit exploit disclosed

Add an event-scoped record derived from `bir_src_000048`.

- source: Meter Passport postmortem
- new claim scope: `incident_case`
- reason: the primary postmortem supports the exploit mechanism, liability amount, shutdown, and response; the existing record remains attached to the compensation-plan event

### `bir_ev_000037` — PASS compensation tokens distributed

Add an event-scoped record derived from `bir_src_000048`.

- source: Meter Passport postmortem
- new claim scope: `reimbursement`
- reason: the postmortem and its maintained incident record support the PASS compensation structure and distribution context; this is distinct from the postmortem's existing incident-level use on `bir_ev_000036`

## Expected canonical migration

```text
New event-scoped evidence records   10
Event source_count changes           0
Event text changes                   0
Incident changes                     0
Resulting evidence total           221
Remaining source-count mismatches   37
```

The implementation must assign evidence IDs from a fresh latest-main read rather than relying on this document as an ID reservation.

## Duplication rule

The repeated URLs are permitted because each new evidence record has:

- a different `event_id`;
- a distinct event-specific `claim_scope`;
- notes explaining why the source is reused;
- the same reliability, tier, publication, and URL metadata as the reviewed source record.

This is canonical event linkage, not artificial source inflation.

## Safety rules

- do not move or delete the existing evidence records;
- do not increase stored event counts;
- do not change event dates or historical claims;
- do not claim that a source supports a field absent from its existing support flags;
- do not merge temporary inventory scripts, workflows, or generated raw reports.

## Next

1. merge this boundary with no canonical changes;
2. create a fresh canonical branch from latest `main`;
3. add the ten event-scoped evidence records;
4. verify evidence total 221 and mismatch count 37;
5. run normal CI, merge, and production verification;
6. continue with Batch 2 of the remaining events.
