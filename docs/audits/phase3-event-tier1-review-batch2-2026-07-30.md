# Phase 3 event Tier 1 review Batch 2 — 2026-07-30

Status: review complete  
Canonical data changed: no

## Baseline

```text
Events                         183
Evidence                       271
Events without Tier 1 evidence 19
Previously intentional gaps      4
Unreviewed gaps                 15
Batch 2 targets                 10
```

## Decision summary

```text
Reviewed events                  10
Tier 1 primary additions approved 8
Intentional secondary events      2
Expected evidence total         279
Expected event Tier 1 gaps       11
Expected event primary gaps      20
Expected source-count drift       0
```

## Approved additions

### `bir_ev_000139` — RubicProxy approval exploit occurred

Decision: add an event-scoped copy of `bir_src_000165`.

Rubic's official incident announcement directly supports the exploit, approximate amount, affected approval path, and containment action. The three existing direct records remain useful technical secondary analyses.

### `bir_ev_000151` — Forged Taiko bridge messages accepted on Ethereum

Decision: add an event-scoped copy of `bir_src_000182`.

Taiko's official incident and containment statement directly supports the fraudulent bridge-message acceptance, affected assets, and immediate shutdown response.

### `bir_ev_000060` — cBridge frontend restored with additional monitoring

Decision: add an event-scoped copy of `bir_src_000271`.

Celer's first-party incident update states that the frontend would be restored with additional monitoring and also records the compensation commitment. This directly supports the reopen event.

### `bir_ev_000064` — SOCKET reported recovery of 1,032 ETH

Decision: add a new first-party evidence record using SOCKET's official fund-recovery update:

```text
https://x.com/SocketDotTech/status/1749734794320363802
```

The update reports successful recovery of 1,032 ETH from the January 16 incident and says a recovery and distribution plan would follow.

### `bir_ev_000084` — Approximately $8.2 million nUSD transfer left unprocessed

Decision: add an event-scoped copy of `bir_src_000104`.

Synapse's first-party postmortem directly explains that validators did not process the malicious bridge transaction and that the funds remained available for affected liquidity providers.

### `bir_ev_000093` — Investigation attributed incident to former contractor

Decision: add a new first-party evidence record using Holograph's official postmortem announcement:

```text
https://x.com/holographxyz/status/1807946057235718349
```

The announcement reports completion of the incident postmortem with Halborn and identifies the former-contractor access path described by the event. Existing secondary reporting remains useful corroboration.

### `bir_ev_000126` — Main attacker returned approximately 70 percent

Decision: add a new first-party evidence record using Transit Finance's official recovery update:

```text
https://x.com/TransitFinance/status/1576463550557483008
```

The update reports that approximately 70 percent of stolen assets had been returned and identifies the receiving addresses. It directly supports the event without relying only on later reporting.

### `bir_ev_000127` — Additional BNB returns reported

Decision: add a new first-party evidence record using Transit Finance's official October recovery and reimbursement update:

```text
https://medium.com/@TransitSwap/updates-about-transitfinance-d05176918897
```

The update records a second returned-funds batch including 10,000 BNB and describes cumulative returned funds and the remaining reimbursement plan. It directly supports the later recovery event.

## Intentional secondary evidence

### `bir_ev_000087` — Nerve Bridge metapools exploited

Decision: retain Tier 2 evidence.

No reviewed first-party incident statement or qualifying Tier 1 incident source was found. BlockSec and Halborn analyses support the exploit and amount claims but remain security-firm secondary analysis under the existing source hierarchy. The event must not be upgraded by reclassifying those sources.

### `bir_ev_000088` — BlockSec published Nerve Bridge root-cause analysis

Decision: retain Tier 2 evidence.

The event is specifically about publication of a BlockSec root-cause analysis. The BlockSec report directly proves that publication, but its role remains a security-firm analytical source and therefore Tier 2. A Tier 1 operator source is neither available nor required to change the identity of the publisher.

These two events join the four intentional secondary events retained from Batch 1:

```text
bir_ev_000006
bir_ev_000009
bir_ev_000012
bir_ev_000051
```

## Expected canonical migration

A fresh canonical branch should add eight event-scoped primary evidence records and synchronize eight event counts across seven incidents.

```text
Evidence                       271 -> 279
Primary evidence              189 -> 197
Tier 1 evidence               207 -> 215
Events without primary         28 -> 20
Events without Tier 1          19 -> 11
Incident source mismatches       0
Event source mismatches          0
```

Four approved additions reuse already counted risky-host URLs. Four introduce new exact or subdomain risky-host URLs: SOCKET X, Holograph X, Transit X, and Transit Medium. The canonical migration must explicitly recalculate and fix the unique-URL archive-risk ceiling rather than infer it from evidence-record counts.

## Safety boundary

- canonical JSON is unchanged in this review PR;
- no existing source is reclassified;
- no event date, amount, status, or historical outcome is changed;
- only sources that directly support the target event claim are approved;
- temporary generator, inventory, and write-enabled workflow must be removed before merge;
- canonical migration must occur on a fresh branch after this review boundary merges.

## Remaining unreviewed gaps

```text
bir_ev_000136
bir_ev_000146
bir_ev_000150
bir_ev_000156
bir_ev_000164
```

After the expected eight additions, the 11 remaining event Tier 1 gaps will consist of these five unreviewed events and six intentional secondary events.
