# Record-growth Batch 10 review

Issue: #405

Review-only boundary for one bridge lifecycle addition. This file does not modify canonical JSON.

## Linea Native Bridge — add_now

Canonical boundary: Linea's native / official bridge between Ethereum and Linea.

Reviewed first-party evidence:

- Linea's official community announcement on **2023-07-18** states Linea Mainnet Alpha access was being opened to the entire Linea community and explicitly directs users to `https://bridge.linea.build/` to onboard to Linea: https://community.linea.build/t/linea-mainnet-is-live/6557
- Linea's first-party **2023-07-18** blog post says Linea Mainnet Alpha had been released on July 11 and instructs public users to bridge Ethereum to LineaETH as part of using mainnet: https://linea.build/blog/linea-celebrates-a-successful-voyage-with-the-networks-first-nft-collection
- Current `https://bridge.linea.build/` redirects into Linea's current first-party bridge page. The current page distinguishes a **Native Bridge** and labels it as Linea's official bridge from Ethereum: https://bridge.linea.build/

Review decision:

- use **2023-07-18 day precision** for the general-public native bridge availability boundary;
- do not use the earlier July 11 network/mainnet-alpha partner release date as if it independently proves general-public bridge availability;
- canonical name `Linea Native Bridge`;
- lifecycle-only addition; no incident, exploit, loss, or safety claim inferred;
- preserve later UI migration, bridge aggregator additions, and token-bridge component evolution as lifecycle/product evolution within the native bridge lineage unless later first-party evidence establishes a separate historical product;
- current status may be represented as active because the current Linea first-party site still exposes and labels the Native Bridge as its official Ethereum bridge.

## duplicate boundary

Current main at review start: `d56312ab7e1bc85268542af09718284c3f2220f1`.

An exhaustive search of canonical `data/bridges.json` found no existing `Linea` entity/alias/domain reference. This was repeated against main after review merge before canonical ID allocation.

## retained research-only

- Mantle Mainnet Bridge — current identity and July 17, 2023 mainnet context are strong, but bridge-specific first-public availability should be separately pinned.
- Scroll native bridge — current and launch-period evidence is promising; bridge-specific launch boundary still needs an explicit first-party locator.
- Polygon Portal / PoS Bridge — current official identity is clear; original historical bridge launch boundary remains insufficiently pinned.
- Base / Arbitrum / Optimism native bridges, Layerswap, Owlto, and Shyft Bridge remain research-only under previously documented gaps.

## guardrails

- Do not pad the batch with weaker candidates.
- Lifecycle breadth may increase while incident count remains unchanged.
- No secondary-database row import.
- Primary/Tier-1 evidence and schema-valid publication dates are required for canonical events/evidence.
- Repeat alias/domain/slug duplicate checks before ID allocation.
- Preserve bridge/version/product lineage rather than manufacturing duplicates.
- Do not weaken source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality gates.
- Do not raise ceilings to fit corpus growth.

## canonical application result

Applied as `bir_bridge_000064` / `bir_ev_000238` / `bir_src_000390`. Canonical validation produced **64 bridges / 51 incidents / 238 events / 389 evidence** with source-count equality and source-quality no-regression passing. Current-count documents were synchronized to the same values; temporary application and count-sync workflows were removed before final PR validation.
