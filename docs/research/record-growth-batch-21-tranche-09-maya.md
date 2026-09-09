# Batch 21 tranche 09 review — Maya Protocol / MAYAChain 2026

Status: APPROVED FOR CANONICAL MUTATION
Baseline main: `abf1afd32ae7b14cd982950cf677f4430b903c03`
Baseline counts: 81 bridges / 62 incidents / 271 events / 433 evidence

## Duplicate audit

Direct canonical review found no existing Maya Protocol or MAYAChain bridge/entity and no August 18, 2026 incident.

## Entity boundary

MAYAChain is a decentralized cross-chain liquidity protocol. Official Maya documentation states that it observes native-chain deposits into network vaults and executes native-asset cross-chain swaps through threshold-signed outbound transactions. BIR therefore models Maya Protocol / MAYAChain as an interoperability protocol rather than as a conventional lock-and-mint token bridge.

## Incident boundary

- incident date: 2026-08-18
- a crafted transaction containing 23 messages chained multiple accounting/state-handling flaws
- the sequence triggered a false theft condition, credited an unfunded slash subsidy into a thin ARB.LINK pool, and allowed the attacker to extract protocol liquidity
- MAYAChain trading/network operation was halted for containment
- later public Maya recovery updates continued to describe trading as paused while fixes and a migration/recovery process were prepared; no unrestricted restart is admitted in this tranche

## Amount boundary

Canonical direct-loss display: approximately $1.7 million.

Contemporaneous reporting based on Maya's own disclosures separates the attacker's direct extraction from a much larger decline in pool value. About 20.83 BTC was moved to the attacker's Bitcoin address, with additional assets bringing the direct estimate to roughly $1.7 million. The approximately $10.9 million decline in pool value reflects CACAO price collapse/arbitrage fallout and MUST NOT be added to canonical stolen-funds loss.

## Technical boundary

Independent BlockSec analysis supports a composed business/accounting-logic failure rather than a private-key compromise. The exploit depended on several defects interacting across observed-transaction/outbound reconciliation and liquidity accounting. Canonical classification should remain `contract_logic_error` / protocol-accounting logic rather than inventing a single isolated bug as the sole root cause.

## Evidence admitted

1. Maya Protocol official developer documentation — protocol/entity architecture and native cross-chain swap/vault model.
   - https://docs.mayaprotocol.com/mayachain-dev-docs/introduction
2. CoinDesk, 2026-08-19 — contemporaneous incident report citing Maya founder disclosure; supports halt, approximately $1.7M direct extraction, 20.83 BTC external transfer, and separation from approximately $10.9M pool-value decline.
   - https://www.coindesk.com/markets/2026/08/19/maya-protocol-exploit-drains-bitcoin-and-other-assets-as-pool-value-drops-usd11-million
3. BlockSec, 2026-08 — independent technical analysis of the chained accounting/state-validation exploit.
   - https://blocksec.com/blog/web3-security-term-finance-mayachain-exploits

## Canonical guardrails

- do not model the approximately $10.9M pool-value decline as attacker theft
- do not infer a key compromise
- do not infer full recovery, reimbursement, or unrestricted restart
- do not create a MAYAChain or CACAO reference key inside this incident-growth tranche; preserve exact names in prose and use existing keyed vocabulary conservatively
- keep attacker attribution unknown
