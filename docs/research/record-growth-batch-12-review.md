# Record-growth Batch 12 review

Issue: #413

Review-only boundary for one bridge lifecycle addition. This file does not modify canonical JSON.

## Polygon zkEVM Bridge — add_now

Canonical boundary: Polygon Labs' official Ethereum ↔ Polygon zkEVM bridge.

Reviewed first-party evidence:

- Polygon Labs' **2023-04-26** post `Announcing Polygon Bridge for Polygon zkEVM` explicitly announces the bridge and describes the bridge contracts on Ethereum and Polygon zkEVM: https://polygon.technology/blog/announcing-polygon-bridge-for-polygon-zkevm-2
- Polygon Labs' **2023-03-27** post confirms Polygon zkEVM Mainnet Beta was public and live: https://polygon.technology/blog/polygon-zkevm-mainnet-beta-is-live
- Polygon Labs' **2023-04-27** bridge guide instructs users to use the zkEVM Wallet Bridge flow from Ethereum Mainnet to Polygon zkEVM and says users can try the bridge: https://polygon.technology/blog/how-to-bridge-to-polygon-zkevm-mainnet-beta-in-3-easy-steps
- Polygon's current site exposes Portal as its bridge/swap/manage-assets entry point: https://portal.polygon.technology/

Review decision:

- use **2023-04-26 day precision** for the bridge-specific public availability boundary;
- do not backdate the bridge to the March 27 network launch without bridge-specific evidence;
- canonical name `Polygon zkEVM Bridge`;
- lifecycle-only addition; no incident, exploit, loss, or safety claim inferred;
- preserve later Wallet Suite / Portal migrations as product-surface evolution within the same bridge lineage unless first-party evidence establishes a distinct bridge product.

## duplicate boundary

Current main at review start: `943a39c74a0e5ad0cc6775fcc03b87ab75c00836`.

GitHub code search for `Polygon zkEVM` inside canonical `data/bridges.json` returned no hit. Batch 11 production verification also enumerated all 65 current bridge dossier routes and contained no Polygon zkEVM route. Repeat name/alias/domain/slug checks immediately before canonical ID allocation.

## retained research-only

- Scroll native bridge — current architecture/bridge docs are strong, but reviewed first-party evidence does not yet cleanly prove bridge public availability on the exact mainnet launch date.
- Polygon PoS Bridge / Polygon Portal lineage — current identity is clear; original historical bridge launch boundary remains insufficiently pinned for a separate canonical entity in this batch.
- Base / Arbitrum / Optimism native bridges, Layerswap, Owlto, and Shyft Bridge remain research-only under previously documented gaps.

## guardrails

- Do not pad the batch with weaker candidates.
- No secondary-database row import.
- Primary/Tier-1 evidence and schema-valid publication dates are required for canonical events/evidence.
- Repeat alias/domain/slug duplicate checks before ID allocation.
- Preserve bridge/version/product lineage rather than manufacturing duplicates.
- Do not weaken source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality gates.
- Do not raise ceilings to fit corpus growth.
