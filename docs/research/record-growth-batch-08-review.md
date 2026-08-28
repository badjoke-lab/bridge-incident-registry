# Record-growth Batch 08 review

Issue: #397

Review-only boundary for three bridge lifecycle additions. This file does not modify canonical JSON.

## SKALE IMA Bridge — add_now

Canonical boundary: SKALE's Interchain Messaging Agent / IMA bridge between Ethereum and SKALE chains, introduced **2021-07-20**.

Reviewed first-party evidence:

- SKALE's July 20, 2021 launch article introduces the SKALE IMA Bridge and describes ETH, ERC-20, ERC-721, ERC-1155 and arbitrary-message transfer between Ethereum and SKALE: https://www.skale.space/blog/introduction-of-the-skale-ima-bridge
- Current SKALE Portal exposes a bridge entry point: https://portal.skale.space/
- SKALE's 2025 docs announcement explicitly says the SKALE Bridge docs were rebuilt and covers Ethereum↔SKALE token and message transfer: https://www.skale.space/blog/introducing-the-new-skale-docs

Review decision: use 2021-07-20 day precision. Treat Portal/UI/intent integrations as later lifecycle evolution unless primary evidence establishes a separate canonical bridge product. No incident inferred.

## Cronos Bridge — add_now

Canonical boundary: the first-party Cronos bridge available from the Cronos mainnet launch on **2021-11-08** for Crypto.org Chain ↔ Cronos transfers.

Reviewed first-party evidence:

- Cronos mainnet-beta launch article states the Cronos Bridge would be available from day one and specifically live on November 8, 2021: https://blog.cronos.org/p/cronos-mainnet-beta-is-now-live-def60afb5148
- Current first-party bridge interface remains available: https://cronos.org/bridge/
- Current official Cronos docs retain the Cronos Bridge web-app flow: https://github.com/crypto-org-chain/cronos-docs/blob/gitbook/for-users/bridge/other_chain/webapp.md

Review decision: use 2021-11-08 day precision. Do not collapse third-party bridge integrations or later independent IBC channels into separate incidents. No incident inferred.

## Findora Rialto Bridge — add_now

Canonical boundary: Rialto mainnet cross-chain bridge, launched **2022-03-22** according to the company-issued Findora launch release.

Reviewed evidence:

- Findora-issued March 22, 2022 release states Rialto launched on Findora mainnet and connected Findora with BNB Chain: https://www.prweb.com/releases/findora-celebrates-launch-of-rialto-bridge-with-10m-campaign-to-pay-user-s-gas-fees-and-reward-bug-hunters-844795912.html
- Current Findora user documentation identifies Rialto as a bridge for moving assets to Findora: https://docs.findora.org/general-user-materials/bridge-tokens-to-findora
- Current Findora introduction identifies Rialto Bridge among mainnet ecosystem dApps: https://docs.findora.org/basics/introduction

Review decision: use 2022-03-22 day precision unless a stronger earlier first-party mainnet launch source appears during canonicalization. ChainBridge ancestry is architecture context, not a second entity. No incident inferred.

## retained research-only

- Shyft Bridge — strong first-party 2021-09-02 deployment announcement, but current bridge-specific lifecycle/status is not cleanly established enough for this batch.
- Layerswap — current bridge identity is clear; historical initial launch remains insufficiently pinned.
- Owlto Finance — current bridge identity is clear; historical initial launch remains insufficiently pinned by first-party evidence.
- HECO Bridge / HECO Chain gateway 2023 — keep research-only; HTX hot-wallet loss figures are not bridge-specific loss evidence.

## duplicate boundary

Name-level searches against current main returned no hits for SKALE IMA Bridge, Cronos Bridge, or Findora Rialto. Because GitHub code search can be incomplete, this is not final proof of absence. Canonicalization must repeat alias/domain/slug checks against then-current main before IDs are allocated.

## guardrails

- Lifecycle breadth may increase while incident count remains unchanged.
- No incident, loss, exploit, or safety conclusion may be inferred from bridge existence or architecture.
- Primary/Tier-1 evidence and schema-valid publication dates are required for canonical events/evidence.
- Preserve bridge/product lineage instead of manufacturing entities from UI, routing, or integration changes.
- Do not weaken source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality gates.
- Do not raise ceilings to fit corpus growth.
