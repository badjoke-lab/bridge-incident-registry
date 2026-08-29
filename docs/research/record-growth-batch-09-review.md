# Record-growth Batch 09 review

Issue: #401

Review-only boundary for one bridge lifecycle addition. This file does not modify canonical JSON.

## StarkGate — add_now

Canonical boundary: StarkGate, StarkWare's native / official bridge between Ethereum and Starknet.

Reviewed first-party evidence:

- Starknet's **2022-04-04** StarkGate Alpha article introduces StarkGate as the first version of StarkNet Bridge. The article contains an explicit dated update: **May 9, 2022 — StarkGate is live on Mainnet**: https://www.starknet.io/blog/starkgate-alpha/
- Starknet's current bridge directory identifies **StarkGate as the official bridge between Ethereum and Starknet**: https://www.starknet.io/bridges-and-onramps/
- Current Starknet protocol documentation says StarkGate, developed by StarkWare, bridges ETH and ERC-20 tokens between Ethereum and Starknet and documents current mainnet bridge components: https://docs.starknet.io/learn/protocol/starkgate
- Starknet's **2024-02-22** StarkGate 2.0 article independently states that StarkWare launched StarkGate in May 2022 as the native Ethereum↔Starknet bridge, and that the new version was live on mainnet: https://www.starknet.io/blog/starkgate-2-0-version-update/

Review decision:

- use **2022-05-09 day precision** as the mainnet launch boundary;
- canonical name `StarkGate`;
- lifecycle-only addition; no incident, exploit, loss, or safety claim inferred;
- preserve StarkGate 2.0, legacy per-token bridges, and later multi-bridge UI integrations as lifecycle/version evolution of the StarkGate lineage rather than manufacturing separate historical entities unless later primary evidence requires a split;
- current status may be represented as active because current first-party Starknet pages still designate StarkGate as the official bridge and publish current mainnet contracts.

## duplicate boundary

Current main at review start: `ce928cc8ca2e81951e6d8187f9c227a42317c227`.

An exhaustive search of canonical `data/bridges.json` found no existing `StarkGate` or `starknet` entity/alias/domain reference. This must be repeated immediately before canonical ID allocation.

## retained research-only

- Base Standard Bridge — current protocol identity is clear, but exact first-party public launch boundary and historical frontend lineage need a cleaner dated source.
- Arbitrum native bridge — network launch is dated, but bridge-specific public launch still needs stronger first-party evidence.
- Optimism Gateway / Standard Bridge — protocol/current identity is clear, but initial public launch boundary remains insufficiently pinned.
- Layerswap and Owlto — current bridge identity is strong; first-party initial launch boundary remains weak.
- Shyft Bridge — strong 2021 deployment announcement; current bridge-specific lifecycle/status remains insufficiently clean.

## guardrails

- Do not pad this batch with weaker candidates.
- Lifecycle breadth may increase while incident count remains unchanged.
- No secondary-database row import.
- Primary/Tier-1 evidence and schema-valid publication dates are required for canonical events/evidence.
- Repeat alias/domain/slug duplicate checks before ID allocation.
- Preserve bridge/version/product lineage rather than manufacturing duplicates.
- Do not weaken source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality gates.
- Do not raise ceilings to fit corpus growth.
