# Taiko June 2026 canonical Bridge incident review

Status: reviewed for bounded canonical application  
Reviewed: 2026-08-20  
Issue: #342

## Decision

Taiko's June 21–22, 2026 security incident is a **strong BIR canonical candidate**. Taiko Labs has published a detailed first-party postmortem that identifies the canonical Bridge and ERC20Vault as the withdrawal surface, establishes the attack mechanism, provides an itemized impact timeline, records emergency pause and remediation, states that users were fully made whole, and records the July 2 bridge reopening.

No existing Taiko bridge entity or incident is present in BIR. Canonical application is authorized as a new bridge entity plus one incident, subject to the permanent schema/source-count/source-quality/build/accessibility/performance/browser/Series/production-equality gates.

## Entity boundary

First-party Taiko mainnet material identifies the official bridge at:

```text
https://bridge.taiko.xyz
```

The bridge connects Ethereum and Taiko and is the protocol's canonical asset-transfer path. The incident postmortem explicitly identifies the canonical `Bridge` and `ERC20Vault` as the contracts from which forged withdrawals were ultimately paid.

Canonical entity target:

```text
canonical_name      Taiko Bridge
slug                taiko-bridge
type                canonical_bridge
status              active
primary_chains      ethereum, taiko
operator_name       Taiko Foundation / Taiko Labs
operator_type       foundation
major_incident_count 1
has_unresolved_incident true
has_reimbursement_history true
```

`status = active` is supported because the first-party postmortem states that the bridge and vault were recollateralized and unpaused on July 2 and normal operations resumed under conservative quotas.

## Incident boundary

Reviewed attack start:

```text
2026-06-21 19:04 UTC
```

Taiko's timeline records the first rogue-prover registration, first fraudulent proof and first forged withdrawal claims at approximately 19:04 UTC. Funds began leaving at approximately 22:07 UTC. The incident was contained on June 22 at 05:40 UTC when emergency proposal #31 paused the Bridge and ERC20Vault.

Canonical incident target:

```text
incident_date             2026-06-21
incident_type             exploit
reported_loss             about USD 1.75 million
loss_amount_basis         reported_by_project
amount_confidence         high
recovery_status           partial_recovery
reimbursement_status      completed
restart_status            reopened
current_outcome           active_after_incident
attack_vector_category    message_verification_failure
postmortem_available      available
is_unresolved             true
```

The incident remains unresolved only in the narrower attacker-fund recovery/law-enforcement sense. User compensation, bridge backing and operational restart are complete.

## Root-cause boundary

Taiko explicitly says the attacker did **not** break the ZK proving math and did **not** exploit a bug in the Bridge contracts themselves.

The first-party root cause required multiple conditions:

1. an SGX enclave signing key had been exposed in a public repository;
2. attestation accepted a debug-enabled enclave because the debug flag was not rejected;
3. the attacker could therefore produce correctly signed / attested proofs over a fake chain state;
4. forged proposal age data triggered the protocol's permissionless proving fallback and bypassed the prover whitelist;
5. the resulting forged finalized state made fraudulent bridge withdrawals claimable.

BIR's existing `message_verification_failure` category is the least-distorting supported vocabulary because the public incident boundary is acceptance of forged proof/state data in the finalization path. `validator_key_compromise` would incorrectly reduce the incident to a stolen validator key; `smart_contract_bug` would contradict Taiko's explicit statement about the bridge contracts; a new Taiko-specific enum is unnecessary.

Canonical prose must remain non-operational. It may explain that forged proof/state acceptance became possible after an exposed prover signing key and deficient SGX attestation check, but it must not reproduce payload construction or step-by-step exploitation instructions.

## Loss boundary

The first-party postmortem reports the incident at approximately USD 1.75 million and itemizes successful token withdrawals including:

```text
USDC    649,761 plus a later 26,000
crvUSD  156,832
USDT    138,140
CRV     126,161
iZi     2,140,403
WETH    20.70
WBTC    about 0.43
weETH   about 0.53
ETH     about 278
TAIKO   1,990,000
```

The postmortem also records much larger fraudulent claims that **never paid** and were force-resolved during recovery. Those non-paid claims must never be added to the canonical reported loss.

Canonical display amount:

```text
about USD 1.75 million
```

Because this value is first-party and the underlying successful withdrawals are itemized, `loss_amount_basis = reported_by_project` and `amount_confidence = high` are supportable. Do not invent a more precise USD total from historical token prices.

## Recovery boundary

Attacker-fund recovery is partial, not full.

The first-party postmortem records:

- 17 ETH returned to the Taiko treasury;
- approximately 1.99 million TAIKO frozen at MEXC, with return dependent on law-enforcement process;
- approximately 530 ETH moved through Tornado Cash;
- approximately 366 ETH still in two known attacker wallets at the postmortem boundary.

Canonical target:

```text
recovery_status = partial_recovery
```

Do not convert the frozen TAIKO into recovered funds until returned, and do not infer a recovered-USD total.

## User compensation / backing boundary

This is distinct from attacker-fund recovery.

Taiko states that:

- the Foundation / Taiko Labs covered the complete shortfall from operating cash;
- the bridge was recollateralized 1:1 in kind before reopening;
- every L2 balance was fully backed when the network resumed;
- every user was made whole;
- attacker-fund recovery was never a prerequisite for user restoration.

Canonical target:

```text
reimbursement_status = completed
has_reimbursement_history = true
```

The canonical event should describe complete user backfill / recollateralization, not falsely label it as complete attacker-fund recovery.

## Pause, remediation and restart boundary

First-party lifecycle:

```text
2026-06-22 05:40  Bridge + ERC20Vault paused; incident contained
2026-06-25        OpenZeppelin incident-response review completed; recovery contracts deployed
2026-06-29        Proposal #34 executed; debug-SGX fix live; fraudulent checkpoints invalidated; stuck claims resolved; pre-attack state restored
2026-06-30        Bridge recollateralized 1:1 in kind
2026-07-02        Proposal #35 executed; Bridge + ERC20Vault unpaused; normal operations resumed under conservative quotas
```

Canonical target:

```text
restart_status  reopened
current_outcome active_after_incident
bridge status   active
```

The postmortem additionally describes the later Unzen hard fork as defense-in-depth. That upgrade may be noted as remediation context but is not required to prove July 2 reopening.

## Evidence package for canonical application

Tier 1 / first-party:

1. Taiko Labs postmortem  
   https://paragraph.com/@taiko-labs/taiko-security-incident-a-postmortem-and-next-steps

   Claim scope: incident existence, exact timeline, root cause, bridge/vault pause, itemized withdrawals, approximate USD impact, recovery, Foundation backfill, recollateralization, remediation and July 2 reopening.

2. Taiko Labs mainnet / bridge identity article  
   https://paragraph.com/@taiko-labs/taiko-is-live-on-ethereum-mainnet

   Claim scope: official bridge identity, Ethereum↔Taiko bridge role, quota model and Taiko publisher identity.

3. Official Taiko bridge  
   https://bridge.taiko.xyz

   Claim scope: current bridge entity / live service identity. This supports current availability but should not replace the first-party July 2 restart statement.

Independent corroboration:

4. CoinDesk, `Taiko halts its Ethereum layer-2 network after a bridge exploit, token dives`  
   https://www.coindesk.com/tech/2026/06/22/taiko-halts-its-ethereum-layer-2-network-after-a-bridge-exploit-token-dives-10

   Claim scope: contemporaneous independent incident and approximate loss corroboration. Early shorthand must not override the later first-party technical root-cause account.

Additional first-party / on-chain proposal and transaction locators embedded in the postmortem may be added as event-scoped evidence where stable exact URLs are available during canonical application. Do not add risky X posts merely to inflate source_count.

## Source-quality / preservation boundary

The core Taiko Labs sources are hosted on `paragraph.com`. `paragraph.com` is not in BIR's current risky-host set:

```text
x.com
twitter.com
medium.com
mirror.xyz
substack.com
docs.google.com
notion.site
```

Therefore adding the Taiko Labs postmortem does not consume the already-saturated risky-host-unarchived ceiling. Publisher semantics must remain explicit: first-party Taiko Labs content on a third-party publishing host, not `taiko.xyz` itself.

The GitHub organization `taikoxyz` is verified for `taiko.xyz`, further supporting the publisher identity, but repository/org identity is not a substitute for claim-specific incident evidence.

## Reference-data implications

`taiko` already exists in `data/reference/chains.json`.

Existing asset keys cover several affected assets (`usdc`, `usdt`, `weth`, `wbtc`). Canonical application should add normalized asset references only for itemized affected assets that are not already present and are actually used in `affected_assets` / loss claims, likely including:

```text
crvusd
crv
izi
weeth
taiko-token
```

Re-check current reference data immediately before application because another branch may add them first.

## Expected bounded canonical shape

If current main remains at the post-Verus checkpoint, expected new IDs are approximately:

```text
bridge     bir_bridge_000040
incident   bir_inc_000043
events     bir_ev_000200+
evidence   bir_src_000326+
```

These are planning hints only. The canonical branch must derive fresh IDs from then-current `main` and fail closed if any expected tail has moved.

Recommended lifecycle events:

```text
exploit_occurred
bridge_paused
funds_recovered
reimbursement_completed
bridge_reopened
postmortem_published   (only if a stable publication date can be established)
```

Do not manufacture an exact postmortem publication day if the source metadata available to BIR only supports a coarser precision.

## Guardrails

1. Do not call this a bridge-contract bug; the first-party postmortem explicitly rejects that framing.
2. Do not reduce the incident to key compromise alone; preserve the SGX attestation + forged-proof/finality path.
3. Do not publish operational exploitation details or step-by-step payload construction.
4. Do not count unpaid fraudulent claims as actual loss.
5. Keep attacker-fund recovery separate from Foundation backfill and user compensation.
6. Do not call the frozen MEXC TAIKO recovered unless a later first-party source confirms return.
7. Preserve July 2 reopen / active entity status under conservative quotas.
8. Do not weaken source tiers, risky-host ceilings, archive rules, source-count equality, performance budgets, browser gates, Series consistency, or production equality.
9. Canonical application must start from fresh current main and re-check all IDs/counts/reference keys before any mutation.
