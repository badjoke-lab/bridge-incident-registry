# Verus-Ethereum Bridge May 2026 incident review

Status: reviewed for bounded canonical application  
Reviewed: 2026-08-20  
Issue: #331

## Decision

The May 17, 2026 Verus-Ethereum Bridge exploit is a **separate canonical incident candidate** from the already-published July 23 case `bir_inc_000041`.

A stable first-party source exists in Verus's official GitHub release history for incident existence, bridge restoration state, remaining backing loss after recovery, restitution mechanics, and the July reopen/re-pause sequence. Reproducible Ethereum transaction data plus multiple contemporaneous security/news analyses independently establish the May attack transaction, affected assets and approximate gross loss.

Canonical application is authorized as a **second incident on existing bridge `bir_bridge_000039`**, subject to the permanent schema/source-count/source-quality/build/accessibility/performance/browser/Series/production gates.

## Incident boundary

Etherscan records the direct bridge transaction at:

```text
2026-05-17 23:55:23 UTC
```

Canonical incident date target:

```text
incident_date           2026-05-17
incident_date_precision day
```

The direct Ethereum exploit transaction is:

```text
0x6990f01720f57fc515d0e976a0c4f8157e0a9529194c4c15d190e98d087eb321
```

Reviewed attacker / drainer identifiers:

```text
attacker EOA   0x5aBb91B9c01A5Ed3aE762d32B236595B459D5777
drainer        0x65Cb8b128Bf6e690761044CCECA422bb239C25F9
```

The attack drained approximately:

```text
1,625.37 ETH
103.567 tBTC
147,658.84 USDC
approximately USD 11.4–11.6 million contemporaneous value
```

The exact USD amount is not first-party and must remain a mixed-source estimate rather than an asserted precise canonical loss.

## Root-cause boundary

The strongest reproducible technical analyses converge on a cross-chain import/message-validation failure rather than validator-key compromise, reentrancy, or a simple Ethereum balance/accounting bug. The attacker was able to make the Ethereum import path accept crafted cross-chain data and release reserve assets.

For BIR target vocabulary, `message_verification_failure` is the supported category. The canonical summary must remain high-level and must not publish exploit reproduction instructions.

Important source distinction:

- official Verus GitHub release history is first-party authority for incident existence and recovery/restoration lifecycle;
- the detailed May exploit mechanism is supported by reproducible transaction/security analysis rather than by the later restoration release alone;
- a Bitcointalk mirror of a Verus Team announcement contains a more detailed first-party-style timeline and explicitly disputes early oversimplified Wormhole/balance-spoofing descriptions, but it is not the sole canonical primary source because the stable first-party locator is the official GitHub release history.

## First-party recovery / backing-loss boundary

Verus v1.2.17 states that the May 17 exploit, **after some asset recovery**, left approximately **26.6% of the ETH and tBTC held in the Ethereum contract as backing lost**, with roughly 73.4% of those reserves available for restoration.

This establishes:

```text
recovery_status = partial_recovery
```

It does **not** establish that 26.6% of the original attacker take remained unrecovered on a simple gross-loss basis. It describes the backing state after recovery and must not be converted into an invented recovered-USD amount.

Contemporaneous reporting and on-chain tracing separately record the exploiter returning about 4,052.4 ETH, roughly 75% of the consolidated proceeds, while retaining about 1,350 ETH as a bounty. This is useful recovery evidence, but first-party release semantics remain authoritative for the backing/restoration boundary.

## Restitution / reimbursement boundary

Verus v1.2.17 describes a deterministic network restoration process for affected holdings:

- affected vETH / tBTC.vETH balances and nested baskets are adjusted to reflect the backing reduction;
- unaffected basket reserves are returned to affected addresses where applicable;
- affected users receive a restitution credit representing reduced vETH / tBTC.vETH value, distributed after the Ethereum bridge restoration process.

This is stronger than a mere reimbursement announcement, but the reviewed source does not prove that every restitution credit was fully distributed to completion.

Canonical target:

```text
reimbursement_status = in_progress
has_reimbursement_history = true
```

Do not classify the attacker bounty as user reimbursement.

## Restart boundary

Verus v1.2.17 keeps actual Ethereum↔Verus imports/exports paused while restoration and contract-upgrade voting proceeds.

Verus v1.2.17-1, released July 12, enables voting to upgrade the Ethereum bridge contracts and reopen the Verus↔Ethereum connection, and asks bridgekeepers to help reopen bridge traffic. That release starts the reopen process; it is not by itself proof that traffic was already fully reopened at the exact July 12 release time.

Verus v1.2.17-2, released July 16, states that a researcher found a potential cross-chain exploit that was confirmed **not ever exploited** and that an oracle notification disabled cross-chain functions **again** until nodes upgraded. That first-party wording establishes that cross-chain functions had been re-enabled before this later re-pause. The separate July 23 exploit independently confirms that the bridge import path was functioning again before the second incident.

Therefore the May incident has this bounded aftermath sequence:

```text
bridge paused / restoration started
restitution in progress
bridge functionality re-enabled sometime after the July 12 reopen process began and before the July 16 re-pause
bridge paused again July 16 for a separate reportedly unexploited vulnerability
bridge functional again before the separate July 23 exploit
```

For the May incident record, `restart_status = reopened` is supportable. The exact first reopen timestamp remains unknown, so any canonical `bridge_reopened` event must use an approximate date/description rather than falsely asserting that completion occurred at the July 12 release timestamp.

The July 16 re-pause is a later lifecycle event and must not be mistaken for another exploited May incident or for the July 23 exploit.

Because the bridge is currently paused after the later July incident, the May incident's historical restart must not overwrite the bridge entity's current `paused` status.

## Canonical application target

Apply against the current post-July bridge entity rather than creating a second bridge entity.

Expected bounded changes:

```text
bridge `bir_bridge_000039`
  major_incident_count        1 -> 2
  has_reimbursement_history   false -> true
  keep current bridge status  paused

new incident
  May 17 2026 Verus-Ethereum Bridge exploit
  incident_type               exploit
  attack_vector_category      message_verification_failure
  affected chains             verus, ethereum
  affected assets             eth, tbtc, usdc
  gross loss                  about USD 11.4–11.6 million, mixed-source
  recovery                    partial_recovery
  reimbursement               in_progress
  restart                     reopened (May aftermath; exact timestamp not asserted)
  keep May/July incidents separate

bounded lifecycle events
  exploit occurred
  partial funds returned / recovery established
  restoration/restitution process established
  approximate bridge reopening before the July 16 re-pause
  July 16 security re-pause as a distinct reportedly unexploited-vulnerability lifecycle event
```

The existing July incident `bir_inc_000041` and its recovery/reimbursement/reopen unknowns must remain unchanged.

## Evidence package for application

First-party / stable lifecycle sources:

- Verus official GUI release history: https://github.com/VerusCoin/Verus-Desktop/releases
- Verus official CLI v1.2.17: https://github.com/VerusCoin/VerusCoin/releases/tag/v1.2.17
- Verus GUI v1.2.17: https://github.com/VerusCoin/Verus-Desktop/releases/tag/v1.2.17
- Verus GUI v1.2.17-1: https://github.com/VerusCoin/Verus-Desktop/releases/tag/v1.2.17-1
- Verus GUI v1.2.17-2: https://github.com/VerusCoin/Verus-Desktop/releases/tag/v1.2.17-2
- Verus bridge documentation: https://docs.verus.io/eth-bridge/

Reproducible / independent incident sources:

- exploit transaction: https://etherscan.io/tx/0x6990f01720f57fc515d0e976a0c4f8157e0a9529194c4c15d190e98d087eb321
- attacker address: https://etherscan.io/address/0x5abb91b9c01a5ed3ae762d32b236595b459d5777
- contemporaneous loss report: https://www.theblock.co/news/ecosystems/2026-05-17-verus-ethereum-bridge-exploit-401571
- recovery report: https://www.theblock.co/news/ecosystems/2026-05-22-verus-bridge-exploiter-returns-4052-eth-402319
- independent transaction/root-cause analysis: https://u0.rs/verus-bridge-exploit-2026-05

The detailed analysis source may contain exploit reproduction material. BIR may use it for internal claim validation but must keep public canonical descriptions at a non-operational, high-level root-cause boundary.

## Guardrails

1. May and July remain separate incident cases on one bridge entity.
2. Do not copy May recovery, restitution, bounty, or reopen state into the July incident.
3. Do not invent an exact first-party USD loss or recovered-USD total.
4. Do not equate attacker-fund return, backing restoration, unaffected-reserve reimbursement, restitution credit, and bounty; they are distinct claims.
5. Do not treat the July 16 reported unexploited vulnerability as another exploit.
6. Do not publish PoC/reproduction instructions or payload details.
7. Do not weaken source tiers, archive requirements, risky-host ceilings, performance budgets, Series consistency, or production-equality gates.
8. Canonical application must start from fresh current main and re-check IDs/counts because another thread may advance BIR in parallel.
