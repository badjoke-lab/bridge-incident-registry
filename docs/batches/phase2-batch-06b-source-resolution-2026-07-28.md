# Phase 2 Batch 6B source resolution — 2026-07-28

Status: reviewed canonical implementation boundary  
Canonical impact: none  
Parent scope: `docs/batches/phase2-batch-06-scope.md`

## Purpose

Resolve the remaining Rubic and Unizen source, entity, incident, amount, recovery, reimbursement, and current-state gates without converting unknown outcomes into completed ones.

Both candidates may now proceed to a dedicated Batch 6B canonical-data PR.

## Rubic

### Canonical entity

```text
canonical_name: Rubic
aliases:
  - Rubic Exchange
  - Rubic Cross-Chain Tech Aggregator
type: bridge_aggregator
status: active
```

Rubic remains one canonical entity in v0. Its former native RBC/BRBC bridge is recorded as historical component context rather than a separate entity. Future deployment-level modeling may split it if the corpus adopts component records.

### Incident 1 — RBC/BRBC bridge operator-wallet compromise

Incident date:

```text
2022-11-02
```

Boundary:

- the compromised private key controlled a dedicated wallet used for the RBC/BRBC bridge and staking rewards
- Rubic stated that no swap or staking contracts were exploited and user swap/staking funds were safe
- the former native bridge had already been disabled at the end of October and Rubic was using an external bridge
- approximately 35 million RBC/BRBC were released or sold from the compromised bridge wallet
- Rubic reported approximately 138 ETH proceeds remaining in the attacker wallet at the time of its update
- later first-party tokenomics material stated that the additional 35 million RBC broke the RBC/BRBC collateral relationship and contributed to a token relaunch decision

Canonical outcome:

```text
incident_type: abnormal_transfers
recovery_status: unknown
reimbursement_status: not_applicable
restart_status: replaced
current_outcome: deprecated_after_incident
```

Do not convert 35 million RBC/BRBC into a USD loss without a defensible valuation basis. Preserve token quantity, realized proceeds, bridge collateral effect, and market-price effect separately.

Primary sources:

- https://cryptorubic.medium.com/rubic-weekly-report-11-04-2022-ce6196be68b8
- https://cryptorubic.medium.com/introducing-the-new-rubic-tokenomics-the-way-forward-abca6cf11d8d
- https://cryptorubic.medium.com/cross-chain-bridge-rbc-brbc-and-brbc-tutorial-92158999cabe

Independent context:

- https://quillaudits.medium.com/november-2022-kickstart-with-32-million-in-defi-hacks-7898032cb7c0

### Incident 2 — RubicProxy routing and approval exploit

Incident date:

```text
2022-12-25
```

Boundary:

- a whitelisted USDC address could receive arbitrary calls through the affected RubicProxy routing path
- the attacker used approved user allowances to transfer USDC
- approximately USD 1.4–1.5 million was reported stolen and converted to roughly 1,188 ETH
- Rubic stopped affected contracts and advised users to revoke approvals
- reviewed sources do not establish attacker return or completed user reimbursement
- later first-party material states that rewritten contracts were audited and launched in April 2023

Canonical outcome:

```text
incident_type: exploit
recovery_status: none
reimbursement_status: unknown
restart_status: replaced
current_outcome: active_after_incident
```

Use a narrow USD 1.4–1.5 million range. Do not repeat the erroneous USD 14.47 million rendering found in one secondary article when describing approximately 1,188 ETH.

Primary and first-party sources:

- https://x.com/CryptoRubic/status/1606970530032230403
- https://rubic.exchange/blog/rubics-new-security-architecture/
- https://cryptorubic.medium.com/how-to-swap-using-rubic-contracts-3da46f0c830c

Independent technical sources:

- https://quillaudits.medium.com/decoding-rubic-exchange-exploit-quillaudits-44828e71c417
- https://medium.com/dcentralab-diligence/dcentralab-diligence-analysis-rubic-dex-aggregator-hack-d5ffd2505239
- https://medium.com/neptune-mutual/how-was-rubic-protocol-hacked-a39f4e9d8e00

### Rubic current-state boundary

Current Rubic pages and 2023 contract documentation support an active bridge-aggregator classification. The historical native RBC/BRBC bridge remains deprecated/replaced and must not inherit the entity's current active status.

## Unizen

### Canonical entity

```text
canonical_name: Unizen
aliases:
  - Unizen Trade
  - Unizen Trade Aggregator
  - Unizen Interoperability Protocol
  - UIP
type: bridge_aggregator
status: active
```

`bridge_aggregator` remains preferred because current documentation presents Unizen as a DEX/trade aggregator while UIP aggregates third-party interoperability providers as a component.

### Incident — March 2024 external-call approval exploit

Incident date:

```text
2024-03-08
```

Boundary:

- the affected Ethereum trade-aggregation contract exposed approved user assets through an unsafe external-call path
- the incident did not establish compromise of UIP's third-party bridge providers
- security firms reported approximately USD 2.1–2.18 million stolen, primarily involving USDT converted to DAI
- Unizen offered a 20 percent bounty and worked with law enforcement and forensic providers
- Unizen's official 11 March post announced immediate reimbursement for more than 99 percent of affected users, beginning with wallets losing USD 750,000 or less
- wallets above USD 750,000 were to be handled case by case
- SlowMist later reported that the CTO announced approximately USD 185,000 recovered from four hackers
- an August 2024 transfer of most remaining stolen funds to Tornado Cash prevents any inference of full attacker return

Canonical outcome:

```text
incident_type: exploit
recovery_status: partial_recovery
reimbursement_status: in_progress
restart_status: reopened
current_outcome: active_after_incident
is_unresolved: true
```

Do not mark reimbursement completed. The official post proves announcement and commencement, not final settlement for every wallet, especially losses above the threshold.

Primary and first-party sources:

- https://x.com/unizen_io/status/1767075963475505522
- https://x.com/peckshield/status/1766210445415727608
- https://twitter.com/MartinGranstrom/status/1766898480386101440
- https://docs.unizen.io/
- https://docs.unizen.io/introduction-to-unizen/unizen-overview/unizen-interoperability-protocol-uip
- https://docs.unizen.io/other/security-audits
- https://docs.unizen.io/api-introduction/version-2-of-our-smart-contracts

Independent technical and outcome sources:

- https://www.halborn.com/blog/post/explained-the-unizen-hack-march-2024
- https://slowmist.medium.com/slowmist-monthly-security-report-web3-security-loss-at-approximately-139-million-665dd2c75dcc
- https://cryptonews.com/news/unizen-security-breach-results-1m-loss-vows-reimbursments/
- https://www.tradingview.com/news/cointelegraph%3Af66d5f9aa094b%3A0-unizen-hacker-transfers-2-1m-stolen-funds-to-tornado-cash/

### Unizen current-state boundary

Current official documentation, audit listings, UIP documentation, and version-two contract documentation support active operation after the incident. Current activity does not prove reimbursement completion.

## Batch 6B implementation target

The dedicated canonical PR should add:

```text
Bridge entities   2
Incident cases    3
```

Expected timeline coverage:

### Rubic

- historical RBC/BRBC bridge launch/context
- native bridge disabled/replaced
- operator-wallet compromise disclosed
- 35 million token/collateral effect recorded
- tokenomics migration announced
- RubicProxy exploit
- affected contracts paused
- post-incident security architecture and rewritten contracts
- active current state

### Unizen

- exploit occurred and approvals revoked
- law-enforcement and bounty response
- reimbursement announced and started
- partial recovery reported
- contract/security changes and active current state

## Permanent safety rules

- an operator wallet is not a user-fund reserve unless evidence establishes that scope
- native bridge collateral effects are distinct from aggregator user-approval losses
- token quantity, realized proceeds, nominal USD value, and market-price damage remain separate
- reimbursement announcement and commencement are not completion
- partial attacker recovery does not imply user reimbursement
- integrated bridge providers do not inherit an aggregator contract exploit
- current active operation does not erase a deprecated historical bridge component
