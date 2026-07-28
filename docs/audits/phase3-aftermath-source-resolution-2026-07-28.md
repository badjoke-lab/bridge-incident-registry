# Phase 3 aftermath source resolution — 2026-07-28

Status: reviewed implementation boundary  
Canonical impact: none

## Scope

The Phase 3 full-corpus audit identified:

```text
completed_reimbursement_event   5 incidents
reopened_event                  15 incidents
```

The inventory review shows that these 20 warnings are not 20 identical missing-event defects. They split into:

1. legacy descriptive event types that already record reopening;
2. source-backed missing events;
3. status semantics that require correction rather than event fabrication;
4. records that remain unresolved pending a stronger historical source.

## Safety rules

- Do not create a duplicate event when an existing event already records the same historical action.
- Do not equate chain or validator resumption with bridge resumption.
- Do not equate deficit recapitalization, attacker-fund recovery, and user reimbursement without stating the amount scope.
- Do not infer reopening only from current operation years later.
- Preserve partial reopening when services were restored gradually.
- Every claim-changing canonical edit requires direct supporting evidence.

## Reimbursement contract

For BIR, `reimbursement_status = completed` may include a project, treasury, investor, or sponsor fully restoring user claims or bridge liabilities, even when the mechanism is a deficit backfill rather than individual claim payments.

This does not mean attacker funds were recovered. Canonical timelines and descriptions must name the actual mechanism:

```text
attacker return / recovery
operator or sponsor deficit backfill
user claim payment
liquidity-provider recovery payment
```

A `reimbursement_completed` event is allowed only when the reviewed source establishes completion for the stated scope. Qualified scopes such as “all affected users who submitted the form” must remain qualified.

## Class A — mechanical event-type normalization

The following existing events already record a reopening or operational restoration. Their descriptive legacy `event_type` values should be normalized to `bridge_reopened`; titles and descriptions preserve the narrower historical wording.

| Incident | Event | Current event type | Canonical event type | Basis |
|---|---|---|---|---|
| `bir_inc_000011` | `bir_ev_000032` | `network_reopened` | `bridge_reopened` | THORChain returned to staged trading after remediation. |
| `bir_inc_000013` | `bir_ev_000038` | `bridge_upgrade` | `bridge_reopened` | Audited Meter Passport v1.5 went live. |
| `bir_inc_000014` | `bir_ev_000042` | `bridge_relaunched` | `bridge_reopened` | Allbridge Core relaunch was explicitly documented. |
| `bir_inc_000018` | `bir_ev_000056` | `bridge_relaunched` | `bridge_reopened` | ChainSwap published that the bridge was live again. |
| `bir_inc_000019` | `bir_ev_000060` | `frontend_restored` | `bridge_reopened` | The affected cBridge frontend was restored. |
| `bir_inc_000020` | `bir_ev_000063` | `service_restored` | `bridge_reopened` | SOCKET restored the affected service after removing the vulnerable route. |
| `bir_inc_000025` | `bir_ev_000085` | `bridge_restored_and_liquidity_migration_started` | `bridge_reopened` | Synapse restored the bridge and began liquidity migration. |

These are vocabulary migrations, not new historical claims.

## Class B — source-backed missing reopening events

### Ronin — `bir_inc_000001`

Add `bridge_reopened` dated `2022-06-28`.

Ronin's official reopening notice states that the bridge was officially open and ready for deposits and withdrawals.

Source:

- https://blog.roninchain.com/p/the-ronin-bridge-is-open-

### Wormhole — `bir_inc_000002`

Add `bridge_reopened` dated `2022-02-03`.

The existing official Wormhole source associated with the deficit backfill also announces restoration of funds and service. Reopening must remain a separate event from the reimbursement/backfill event.

Existing source:

- `bir_src_000064`

### Poly Network — `bir_inc_000005`

Add a staged restart sequence rather than one unsupported instant full restart:

1. `bridge_partially_reopened` dated `2021-08-16`, when the upgraded mainnet went live and cross-chain functionality began returning;
2. `bridge_reopened` with month precision `2021-09`, when Poly Network reported completion of its operations-resumption roadmap.

Sources:

- https://medium.com/poly-network/poly-network-mainnet-upgrade-goes-live-d708f4fa2cf1
- https://medium.com/poly-network/poly-network-monthly-report-sep-a4cdd9f3fb7a

The incident may retain `restart_status = reopened` because the later source supports completion, while the timeline preserves gradual restoration.

### BSC Token Hub — `bir_inc_000006`

Do not normalize `bir_ev_000017` (`network_resumed`) to `bridge_reopened`; that event describes BNB Smart Chain resumption.

Add a separate `bridge_reopened` event dated `2022-10-12` only after linking the official cross-chain re-enablement source. BNB Chain stated that the cross-chain infrastructure patch was intended to re-enable transfers and that previously paused cross-chain transfers would resume after the upgrade took effect.

Sources:

- https://www.bnbchain.org/en/blog/bnb-chain-a-decentralized-response
- https://www.bnbchain.org/en/blog/technology-update-of-bnb-chain-in-october-2022

### THORChain exploit 1 — `bir_inc_000010`

Add an incident-specific `bridge_reopened` event with month precision `2021-10`, aligned with the existing staged-trading return recorded for the second July incident.

The two incidents belong to the same operational shutdown and restart period, but each incident record currently claims `restart_status = reopened`; each therefore requires a linked timeline event or a different status contract.

Sources:

- `bir_src_000040`
- https://medium.com/thorchain/thorchains-layers-of-security-e308d537acf1

## Class C — source-backed reimbursement completion

### Ronin — `bir_inc_000001`

Add `reimbursement_completed` dated `2022-06-28`.

The official reopening notice states that remaining liabilities were fully reimbursed by Sky Mavis, funds were fully backed 1:1, and users were made whole.

Source:

- https://blog.roninchain.com/p/the-ronin-bridge-is-open-

### Wormhole — `bir_inc_000002`

Normalize existing `bir_ev_000005` from `deficit_backfilled` to `reimbursement_completed` while preserving its title and description as a sponsor-funded deficit backfill.

This is not attacker-fund recovery. It is completed reimbursement under the BIR contract because the sponsor restored the bridge deficit and user-backed balances.

Existing sources:

- `bir_src_000006`
- `bir_src_000064`

### THORChain exploit 1 and exploit 2 — `bir_inc_000010`, `bir_inc_000011`

Add one incident-linked `reimbursement_completed` event to each incident, dated `2022-05-11`.

THORChain's later official security review states that after the chain restarted, liquidity providers and node operators were fully reimbursed approximately USD 16 million. The event descriptions must note that the published amount covers the combined 2021 exploit aftermath rather than assigning a fabricated incident-specific split.

Source:

- https://medium.com/thorchain/thorchains-layers-of-security-e308d537acf1

### Allbridge — `bir_inc_000014`

Add `reimbursement_completed` dated `2023-05-30` with the qualified scope:

> Recovery payments were provided to all affected users who submitted the application form.

Do not broaden this to every possible affected address or claim.

Source:

- https://allbridge.medium.com/allbridge-core-updates-following-the-relaunch-9f7716eeb5da

## Class D — restart claims requiring further review

Do not add or normalize reopening events yet for:

| Incident | Reason |
|---|---|
| `bir_inc_000015` — LI.FI 2022 | Existing evidence establishes patching and partial reimbursement, but the reviewed corpus does not contain a direct historical reopening statement. |
| `bir_inc_000016` — LI.FI 2024 | Official incident reporting establishes containment and a compensation plan, not the exact service-restoration point. |
| `bir_inc_000017` — ChainSwap July 2 | The bridge was fixed quickly, but the second exploit followed within days; a distinct verified reopening point for the first incident is not yet established. |

For these records, the next canonical PR must either:

1. add a direct reopening source and event; or
2. revise `restart_status` to `unknown` or another supported value.

Current operation alone is not sufficient evidence for the historical restart date.

## Expected warning reduction

After Classes A–C are implemented:

```text
completed_reimbursement_event   5 -> 0
reopened_event                  15 -> 3
```

The remaining three restart warnings are intentionally retained until the source/status review is complete.

## Separate source-count work

`incident_source_count` and `event_source_count` are not part of this aftermath PR. Their field contract must be fixed independently before any mechanical normalization.

## Implementation sequence

1. merge this source-resolution boundary with no canonical changes;
2. create a fresh canonical branch from latest `main`;
3. normalize the seven legacy reopening event types;
4. add the source-backed reopening and reimbursement events and evidence;
5. add the reimbursement semantic definition to the specification/methodology;
6. leave the three unsupported restart claims unresolved or correct their statuses;
7. run the complete repository audit and controlled-failure suite;
8. merge only after normal CI succeeds;
9. run explicit production verification against the new counts and routes.
