# Record-growth Batch 13 review

Issue: #417

Review-only boundary for one bridge lifecycle addition. This file does not modify canonical JSON.

## Base Bridge — add_now

Canonical boundary: Base's official/native Ethereum ↔ Base bridge path.

Reviewed first-party evidence:

- Base's official post `It’s Onchain Summer 🟡 and Base is open for bridging` states that Base is open for bridging and explicitly lists **Base Bridge** at `bridge.base.org` for bridging ETH to Base: https://blog.base.org/its-onchain-summer-%F0%9F%9F%A1-and-base-is-open-for-bridging
- Coinbase's official **2023-08-03** Onchain Summer announcement fixes the same public rollout date context for Base: https://www.coinbase.com/blog/celebrate-onchain-summer-with-coinbase
- Base's earlier official builder-mainnet post distinguishes the builder-only phase from later public general availability: https://blog.base.org/base-mainnet-is-open-for-builders

Review decision:

- use **2023-08-03 day precision** for public Base Bridge availability;
- do not backdate the public bridge to the earlier builder-only mainnet phase;
- canonical name `Base Bridge`;
- lifecycle-only addition; no incident, exploit, loss, or safety claim inferred;
- preserve later bridge UI/domain migrations inside the same native bridge lineage unless first-party evidence establishes a distinct bridge product.

## duplicate boundary

Current main at review start: `e4982e5abfbf32e3b21a3665d0ebad21b6f0b182`.

Canonical code search for exact `Base Bridge` inside `data/bridges.json` returned no hit. Batch 12 production verification enumerated all 66 bridge dossier routes and contained no Base Bridge route. Repeat full name/alias/domain/slug checks immediately before canonical ID allocation.

## retained research-only

- Scroll native bridge — exact first-public bridge availability remains insufficiently pinned.
- Arbitrum Bridge — current official identity is clear; original public bridge launch boundary still needs a clean first-party locator.
- Optimism Standard Bridge — current protocol identity is clear; original production/public bridge boundary requires historical first-party evidence.
- Polygon PoS Bridge / Polygon Portal lineage, Layerswap, Owlto, and Shyft Bridge remain research-only under previously documented gaps.

## guardrails

- Do not pad the batch with weaker candidates.
- No secondary-database row import.
- Primary/Tier-1 evidence and schema-valid dates are required before canonical promotion.
- Repeat alias/domain/slug duplicate checks before ID allocation.
- Preserve bridge/version/product lineage rather than manufacturing duplicates.
- Do not weaken source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality gates.
- Do not raise ceilings to fit corpus growth.
