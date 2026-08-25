# Record Growth Batch 02 Review — 2026-08-25

Issue: #371
Program: #365
Base after Batch 01: 42 bridges / 47 incidents / 214 events / 352 evidence.

## Decision

Authorize canonical application for two reviewed historical incident gaps. The research-lane candidates in #371 are not authorized by this review.

### 1. Anyswap / Multichain Router V3 exploit — 2021-07-10

Disposition: `add_now` on the existing Multichain bridge entity.

Reviewed first-party boundary:

- Multichain/Anyswap published an exploit statement for the prototype V3 cross-chain liquidity pools.
- The statement identifies four malicious transactions across Ethereum, BSC and Fantom.
- Reported theft is 2,398,496.02 USDC and 5,509,222.73 MIM.
- Root cause is repeated ECDSA R value / nonce reuse exposing the MPC private key.
- The operator states the normal V1/V2 bridge was not affected; do not generalize the impact beyond the V3 prototype pools.
- The operator committed to compensate user losses and later documented a V3 relaunch.

Canonical boundary:

- distinct incident on existing Multichain identity;
- preserve exact token amounts rather than inventing a USD aggregate;
- compensation commitment is not compensation completion;
- relaunch must be a separate lifecycle event;
- do not overwrite or merge the 2022 router-approval incident or 2023 abnormal MPC outflow incident.

Primary source locator reviewed:

- https://medium.com/multichainorg/anyswap-multichain-router-v3-exploit-statement-6833f1b7e6fb

### 2. QANplatform QANX bridge wallet hack — 2022-10-11

Disposition: `add_now` as a new bridge entity and incident, subject to fresh-main identity and ID allocation.

Reviewed first-party boundary:

- QANplatform's recovery/claim material identifies a bridge wallet hack beginning 2022-10-11 08:16:39 UTC on BSC and immediately afterward on Ethereum.
- The old QANX token was replaced with a new token contract.
- Pre-hack holders were eligible for 100% replacement under the published claim rules; separate rules applied to post-hack buyers.
- An incident-specific `qanx-bridge` repository exists under the official QANplatform GitHub organization.

Canonical boundary:

- bridge wallet compromise / bridge incident, not a generic chain exploit;
- token replacement and compensation are aftermath events, distinct from the exploit itself;
- do not infer a stolen USD amount unless a reviewed source supports one consistently;
- if exact current bridge operational status is not first-party supported, keep it conservative rather than asserting active/reopened.

Primary source locators reviewed:

- https://claim.qanplatform.com/
- https://github.com/QANplatform/qanx-bridge

## Research lane — no canonical authority from this review

- BXH 2021: bridge-native scope and exact exploit boundary remain unresolved.
- HECO Bridge 2023: must separate bridge/gateway loss from contemporaneous HTX hot-wallet loss.
- Cellframe 2023: insufficient reproducible first-party incident authority.

## Required canonical gates

The application PR must use fresh-main IDs and pass the existing data/schema enum, full-corpus, exact source-count, source-quality, production-content, build, accessibility, performance, dist and Series checks. Do not weaken ceilings or validators to make this batch pass.
