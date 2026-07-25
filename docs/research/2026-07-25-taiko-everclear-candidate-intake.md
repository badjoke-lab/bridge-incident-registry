# Taiko, Everclear, and Syndicate candidate intake — 2026-07-25

Status: non-canonical research queue  
Scope: future Bridge Incident Registry review  
Canonical impact: none

## Operating boundary

Bridge Incident Registry record expansion remains paused until the seven-step public-consistency remediation is complete. This document preserves three time-sensitive, evidence-backed candidates without changing:

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
```

No candidate is approved for canonical promotion by this document. IDs, entity boundaries, classifications, loss fields, recovery fields, and relationship fields must be derived again from current canonical data after the remediation hold is lifted.

## Candidate 1 — Taiko bridge exploit and recovery

### Provisional relevance

```text
candidate_type: bridge_incident_and_recovery
candidate_priority: high
likely_entity: Taiko L1 Bridge / Taiko bridge infrastructure
incident_date: 2026-06-21
public_confirmation_date: 2026-06-22
reopened_date: 2026-07-02
canonical_decision: deferred_until_record_expansion_resumes
```

### Reviewed facts

- Taiko confirmed that its chain-state verification mechanism and bridge message-proof verification had been compromised.
- Forged message proofs were accepted on Ethereum L1 without legitimate source-chain events, enabling fraudulent bridge withdrawals and unauthorized releases from the token vault.
- Taiko halted block production, stopped L1 Bridge and ERC20Vault withdrawals, and warned users that bridges deployed on Taiko were not secure during containment.
- Taiko estimated losses at approximately USD 1.7 million before the pause.
- The recovery plan closed the attack path, reviewed fixes with independent security specialists, restored one-to-one bridge backing, restarted the network, and reopened the bridge.
- On 2 July 2026, Taiko stated that the bridge was open, the network was restored, and every affected user had been made whole. Conservative withdrawal quotas remained as a safeguard.

### Required canonical modeling review

Before promotion, determine:

1. whether the canonical entity should be named `Taiko Bridge`, `Taiko L1 Bridge`, or another first-party identity;
2. whether the incident should cover only the Ethereum-facing canonical bridge or all bridge deployments affected by the compromised chain state;
3. the exact asset-level loss composition rather than only the aggregate estimate;
4. whether reimbursement came entirely from Taiko reserves and whether any attacker funds were recovered;
5. the final postmortem root cause and any distinction between exposed signing material, prover enrollment, source-signal validation, and message-proof verification;
6. whether temporary withdrawal quotas require a separate recovery-stage event;
7. the correct incident outcome, recovery status, reimbursement status, and final verification date under the current BIR schema.

### Source set

Primary:

- Initial Taiko incident statement: https://x.com/taikoxyz/status/2068858818352865626
- Taiko bridge reopening and make-whole statement: https://x.com/taikoxyz/status/2072533556224548918

Independent:

- The Block, `Ethereum Layer 2 Taiko halts block production following exploit; urges users to withdraw funds`: https://www.theblock.co/post/405486/taiko-confirms-exploit
- Crypto Economy, `Taiko Reopens Bridge after $1.7M Exploit`: https://crypto-economy.com/taiko-reopens-bridge-after-1-7m-exploit/

### Safety notes

- Do not describe the USD 1.7 million as a final audited loss until the postmortem and asset breakdown are reviewed.
- Do not collapse stolen value, treasury recollateralization, user reimbursement, and attacker-fund recovery into one field.
- Do not retain the original social-media claim that users should still withdraw after the bridge reopened on 2 July 2026.

## Candidate 2 — Everclear / Connext protocol sunset

### Provisional relevance

```text
candidate_type: bridge_interoperability_lifecycle
candidate_priority: high
likely_entity: Everclear
lineage_name: Connext
announcement_date: 2026-05-21
shutdown_state: reported_effective
canonical_decision: deferred_until_record_expansion_resumes
```

### Reviewed facts

- Everclear was a cross-chain clearing and settlement protocol previously known as Connext.
- On 21 May 2026, the project announced the wind-down of Everclear Foundation, Everclear Labs, and product development.
- Reporting based on the first-party announcement states that the protocol had already been sunset, with the UI and chain no longer operational.
- Everclear stated that, to its knowledge, users and partners had withdrawn remaining TVL and no funds were stuck; users who believed otherwise were directed to contact the legacy Connext operations address.
- The project attributed the shutdown to failure to build sufficient commercial depth and sustainable revenue despite substantial reported monthly volume and a B2B pivot.
- Possible open-sourcing or DAO continuation was discussed, but no operational successor should be inferred without direct evidence.

### Required canonical modeling review

Before promotion, determine:

1. whether Connext and Everclear should be one rebranded canonical entity or linked predecessor/successor entities;
2. the exact rebrand date and the relationship among Connext Network, Everclear protocol, Everclear chain, Foundation, and Labs;
3. whether this is a bridge entity, interoperability entity, or clearing-layer entity under BIR's current boundary rules;
4. whether there was any incident or user-loss case, or whether the record is lifecycle-only;
5. the effective shutdown dates for the protocol, UI, chain, Foundation, and Labs rather than assigning one unsupported universal date;
6. whether any residual TVL or claims remained after the announcement;
7. whether a later DAO or open-source continuation became an operational successor.

### Source set

Primary:

- Everclear wind-down announcement: https://twitter.com/EverclearOrg/status/2057488000003477886

Independent:

- The Block, `CLEAR token tanks 48% as Everclear winds down protocol, foundation and labs unit`: https://www.theblock.co/post/402252/clear-token-tanks-48-everclear-winds-down-protocol-foundation-labs-unit
- JinaCoin, `クロスチェーン決済のエバークリア閉鎖`: https://jinacoin.ne.jp/everclear-close-20260522/

### Safety notes

- Do not create an exploit or loss incident merely because the protocol shut down.
- Do not state that all funds were definitively withdrawn beyond the operator's qualified statement without additional verification.
- Do not treat a possible DAO continuation or code release as a launched successor.
- Preserve the distinction between the Connext-to-Everclear rebrand and the later Everclear shutdown.

## Candidate 3 — Syndicate Commons Bridge exploit and Labs wind-down

### Provisional relevance

```text
candidate_type: bridge_incident_reimbursement_and_operator_lifecycle
candidate_priority: high
likely_entity: Syndicate Bridge / Commons Bridge
incident_date: 2026-04-29
labs_wind_down_announcement: 2026-05-21
reported_reimbursement_state: made_whole
canonical_decision: deferred_until_record_expansion_resumes
```

### Reviewed facts

- Syndicate identified a compromise of the Commons Bridge, its official cross-chain bridge for moving SYND among Ethereum, Base, and Commons Chain.
- Approximately 18.45 million SYND were drained through the bridge proxy on Base and sold for roughly USD 330,000–400,000 before proceeds were moved to Ethereum.
- The operator began tracing the attack with security firms, advised users not to provide liquidity during the response, and stated that it held sufficient SYND reserves to help affected users.
- Later technical analysis attributes the drain to compromise of the bridge proxy's privileged upgrade path and replacement of the legitimate implementation with a malicious one. This remains subject to primary-source/postmortem confirmation before canonical root-cause assignment.
- On 21 May 2026, Syndicate Labs announced that it would wind down because the rollup infrastructure market had shifted. The first-party thread expressly stated that the bridge compromise did not cause the Labs wind-down.
- The same first-party thread stated that the affected customer and SYND holders on Commons Chain had been made whole using treasury reserves.
- Syndicate Network Collective, a separate Wyoming DUNA with governance authority, was described as independent from Syndicate Labs. The code remained open source and a successor maintainer was invited.
- Current first-party documentation still lists Syndicate Bridge and Relay bridge routes as live. The Labs wind-down therefore must not be converted automatically into a dead bridge classification.

### Required canonical modeling review

Before promotion, determine:

1. whether the canonical bridge entity should be named `Syndicate Bridge`, `Commons Bridge`, or modeled as a bridge family with route/deployment notes;
2. whether the affected proxy was the canonical fast bridge, the standard rollup bridge, or a separate Commons-specific component;
3. the exact amount of SYND created or removed, the realized sale proceeds, and any direct user-fund component;
4. whether the exploit produced unauthorized minting, reserve drain, or another supply/accounting effect under BIR definitions;
5. the primary-source technical root cause and whether a leaked key, upgrade-admin compromise, missing multisig, or malicious implementation is the final supported classification;
6. which users or customer chains were reimbursed, the reimbursement date, and whether treasury replacement was complete;
7. the operational status of each route after reimbursement and after Syndicate Labs began winding down;
8. the relationship among Syndicate Labs, Syndicate Network Collective, Commons Chain, the bridge contracts, and any successor maintainer;
9. whether Labs wind-down belongs as an entity lifecycle event while the bridge remains active, limited, community-maintained, or later discontinued.

### Source set

Primary:

- Syndicate Commons Bridge compromise statement: https://twitter.com/syndicateio/status/2049352309784904187
- Syndicate Labs wind-down and reimbursement thread: https://x.com/syndicateio/status/2057291537860706672
- Syndicate bridging documentation: https://docs.syndicate.io/en/docs/synd/bridging

Independent / technical:

- The Block, `Syndicate suffers exploit linked to Commons bridge compromise`: https://www.theblock.co/post/399318/syndicate-exploit
- The Block, `Syndicate Labs to wind down operations after five years`: https://www.theblock.co/post/402130/syndicate-labs-wind-down
- DARKNAVY, `Syndicate Commons Bridge Upgrade Compromise`: https://www.darknavy.org/web3/exploits/syndicate-commons-bridge-upgrade-compromise/

### Safety notes

- Do not use the Labs shutdown as proof that bridge contracts or routes are dead.
- Do not describe the exploit as the cause of the Labs wind-down; the operator stated the opposite.
- Keep stolen/drained token quantity, realized attacker proceeds, user loss, market-price damage, and treasury reimbursement separate.
- Do not treat available treasury tokens as proof of completed reimbursement without the later first-party make-whole statement and route-specific review.
- Do not infer that the Network Collective or an unidentified maintainer is an operational successor.

## Cross-registry exclusions from the same social-media list

The following are not promoted into BIR by this intake:

- Dango: the reviewed July item is an exchange and chain wind-down. Its earlier trading exploit does not become a bridge incident merely because bridge rate limits affected response options.
- Odos: DEX aggregation service wind-down; not a bridge incident.
- Goldfinch: lending/yield wind-down and recovery management; not bridge infrastructure.
- Cascade: reported vault/perpetuals exploit; no reviewed bridge or interoperability failure established.
- Sophon, ZERO Network, Over Protocol, and Mint Chain: chain or infrastructure shutdowns do not become BIR records without bridge-specific lifecycle or incident evidence.
- Leap Wallet and Tally: wallet and governance-platform lifecycle cases, respectively.

## Resume action

After remediation PR 7 completes:

```text
1. re-read current canonical bridge and incident files
2. run name, alias, domain, and lineage duplicate checks
3. decide Taiko, Everclear, and Syndicate entity boundaries
4. obtain archived primary posts and final postmortem / shutdown documentation
5. prepare dedicated reviewed scope PRs
6. assign IDs only from the then-current canonical maximums
7. promote through separate canonical-data PRs after required checks pass
```
