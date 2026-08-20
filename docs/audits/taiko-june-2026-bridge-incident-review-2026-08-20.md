# Taiko June 2026 bridge incident enrichment review

Status: reviewed for bounded enrichment of existing canonical records  
Reviewed: 2026-08-20  
Issue: #342  
Review PR: #343

## Correction after canonical inventory inspection

The initial review text incorrectly stated that Taiko was absent from BIR. A fresh exact-main inspection performed by the fail-closed canonical applicator proved that Taiko is already canonical:

```text
bridge     bir_bridge_000031  taiko-bridge
incident   bir_inc_000033     taiko-bridge-2026-message-proof-exploit
events     bir_ev_000151–bir_ev_000158
incident-linked evidence     10 records
```

The initial repository search missed these existing records. The first canonical application attempt stopped before mutation on the explicit duplicate assertion `Taiko bridge already exists`. No duplicate bridge, incident, event, or evidence record was created.

This review therefore authorizes **enrichment of the existing Taiko records only**. It does not authorize a new entity or a second June 2026 incident.

## Existing canonical state that needs enrichment

Before this enrichment, `bir_inc_000033` already records the June 21 incident, pause, recollateralization, July 2 reopening and completed user make-whole outcome. Its weaker boundaries are:

```text
reported loss             approximately USD 1.7 million
reported assets           unknown
amount confidence         medium
recovery_status           none
postmortem_available      unclear
is_unresolved             false
root-cause detail         intentionally broad / incomplete
```

The detailed Taiko Labs postmortem materially improves those fields and also resolves the prior known-unknown concerning the relationship among signing material, prover enrollment, attestation and final accepted proof/state.

## First-party postmortem authority

Taiko Labs published:

```text
https://paragraph.com/@taiko-labs/taiko-security-incident-a-postmortem-and-next-steps
```

The reviewed page exposes a July 2026 publication boundary but not a reliable day-level publication date. Canonical evidence must therefore use:

```text
published_at            2026-07
published_at_precision  month
```

Do not manufacture a day.

The postmortem states that the attacker did **not** break the ZK proving math and did **not** exploit a bug in the Bridge contracts themselves. It identifies a multi-condition trust failure:

1. an SGX prover signing key had been exposed in a public repository;
2. attestation failed to reject a debug-enabled enclave;
3. the attacker could therefore produce correctly signed / attested proofs over a fake L2 state;
4. forged proposal-age data enabled the permissionless proving fallback and bypassed the normal prover-whitelist boundary;
5. the forged finalized L2 state made fraudulent canonical Bridge / ERC20Vault withdrawals claimable.

BIR keeps the existing classification:

```text
attack_vector_category = message_verification_failure
```

This is more accurate than reducing the incident to validator-key compromise or claiming a Bridge-contract bug. Public prose must remain non-operational and must not reproduce exploit payload construction or step-by-step exploitation instructions.

## Loss enrichment

Taiko's postmortem reports approximately **USD 1.75 million** of actual successful withdrawals and itemizes affected assets including ETH, WETH, USDC, crvUSD, USDT, CRV, iZi, WBTC, weETH and TAIKO.

Larger fraudulent claims that never paid are explicitly excluded from canonical loss.

Enrichment target:

```text
reported_loss_usd_display  about $1.75 million
reported_loss_usd          1750000
loss_amount_basis          reported_by_project
amount_confidence          high
reported_loss_assets       detailed reviewed asset set
```

Do not derive a more precise USD total from historical token prices.

## Recovery versus reimbursement

The existing record correctly establishes completed user make-whole / recollateralization, but `recovery_status = none` is no longer accurate once the postmortem is admitted.

The postmortem records:

- 17 ETH returned to the Taiko treasury;
- approximately 1.99 million TAIKO frozen at MEXC, return dependent on law-enforcement process;
- approximately 530 ETH moved through Tornado Cash;
- approximately 366 ETH remained in known attacker wallets at the postmortem boundary.

Therefore:

```text
recovery_status       partial_recovery
reimbursement_status  completed
restart_status        reopened
current_outcome       active_after_incident
is_unresolved         true
```

The unresolved flag now refers only to incomplete attacker-fund / law-enforcement recovery. It does **not** reopen the already-completed user compensation, bridge backing or operational restart outcomes.

The bridge entity must likewise change `has_unresolved_incident` from false to true while remaining `status = active`.

## Existing lifecycle retained

No new events are required. Existing events `bir_ev_000151`–`bir_ev_000158` already model:

```text
exploit / fraudulent withdrawal
bridge pause
withdrawal suspension
loss estimate
recollateralization / remediation
July 2 reopening
completed user make-whole
conservative post-reopen quotas
```

The enrichment should update their descriptions, amount and affected-asset set where the postmortem improves precision. Only `bir_ev_000151` receives a new linked first-party postmortem evidence record, so its `source_count` increases from 2 to 3. Other existing event source counts remain unchanged.

Do not invent a separate dated attacker-fund-recovery event because the reviewed postmortem does not provide a single supported recovery milestone date suitable for that event.

## Bridge identity and launch enrichment

Existing entity `bir_bridge_000031` remains the same canonical Taiko Bridge entity.

First-party Taiko mainnet material:

```text
https://paragraph.com/@taiko-labs/taiko-is-live-on-ethereum-mainnet
```

supports the May 27, 2024 launch boundary and official Ethereum↔Taiko bridge identity. The bridge entity may therefore be enriched with:

```text
launch_date            2024-05-27
launch_date_precision  day
official_url           https://bridge.taiko.xyz/
```

No entity split, successor or new bridge ID is authorized.

## Evidence delta

Only two new evidence records are required:

1. `bir_src_000326` — Taiko Labs detailed incident postmortem; incident-linked and linked to `bir_ev_000151`.
2. `bir_src_000327` — Taiko Labs mainnet / bridge-identity article; bridge-entity evidence only.

Expected exact counts after enrichment:

```text
Bridges    39
Incidents  42
Events     199
Evidence   327
```

Expected source-count deltas:

```text
bir_inc_000033  10 -> 11
bir_ev_000151    2 -> 3
```

All other Taiko event source counts remain unchanged.

## Source-quality boundary

Both new Taiko Labs sources are hosted on `paragraph.com`. The current BIR risky-host set is:

```text
x.com
twitter.com
medium.com
mirror.xyz
substack.com
docs.google.com
notion.site
```

`paragraph.com` is not in that set. Adding these two first-party Tier 1 sources does not increase the saturated `risky_host_unarchived <= 16` count.

Expected quality arithmetic from the accepted 325-evidence baseline:

```text
Primary evidence          229 / 325 -> 231 / 327
Tier 1 evidence           246 / 325 -> 248 / 327
Archived evidence         130 / 325 -> 130 / 327
Risky-host unarchived      16       -> 16
```

Existing unarchived Taiko X evidence is not removed or rewritten by this enrichment; the stable postmortem is additive first-party authority.

## Reference-data delta

The Taiko chain key already exists. Add only missing affected-asset reference keys if they remain absent on the exact application base:

```text
crvusd
crv
izi
weeth
taiko
```

The applicator must fail closed if another branch has already introduced any of those keys.

## Guardrails

1. Do not create a duplicate Taiko bridge or second June 2026 incident.
2. Do not call the incident a Bridge-contract bug; the first-party postmortem explicitly rejects that framing.
3. Do not reduce the incident to key compromise alone; preserve the SGX attestation + forged proof/state path.
4. Do not publish operational exploitation instructions.
5. Do not count unpaid fraudulent claims as loss.
6. Keep attacker-fund recovery separate from completed Foundation/Taiko Labs user backfill.
7. Do not treat frozen MEXC TAIKO as recovered until returned.
8. Preserve active bridge status after July 2 while marking the incident unresolved only for attacker-fund recovery.
9. Do not weaken source tiers, risky-host ceilings, archive rules, source-count equality, performance budgets, browser gates, Series consistency or production equality.
10. Exact-main assertions must stop the enrichment if counts, IDs or reference keys have moved.

## Authorized bounded result

The correct operation is:

`existing Taiko canonical record enrichment / no entity-count growth / no incident-count growth / no event-count growth / +2 stable first-party evidence records`
