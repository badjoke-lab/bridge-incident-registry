# Record-growth Batch 11 review

Issue: #409

Review-only boundary for one bridge lifecycle addition. This file does not modify canonical JSON.

## Mantle Mainnet Bridge — add_now

Canonical boundary: Mantle's official/canonical bridge between Ethereum and Mantle Network.

Reviewed first-party evidence:

- Mantle's official 2023-07-11 migration guide states migration channels would open on **2023-07-17 06:00 UTC** and that MNT on Ethereum L1 could be bridged to Mantle Network through the **Mantle canonical bridge**: https://www.mantle.xyz/blog/announcements/bit-to-mnt-user-guide
- Mantle's official 2023-07-17 Mainnet Alpha launch post establishes that Mantle Network Mainnet Alpha was live on that date: https://www.mantle.xyz/blog/announcements/mantle-network-mainnet-alpha
- Mantle's official 2023-09-06 onboarding guide explicitly states that the **official Mantle Bridge on Mainnet operates by connecting to Ethereum Mainnet**: https://www.mantle.xyz/blog/developers/getting-onboarded-to-mantle-mainnet

Review decision:

- use **2023-07-17 day precision** for the public Mantle Mainnet Bridge availability boundary;
- canonical name `Mantle Mainnet Bridge`;
- lifecycle-only addition; no incident, exploit, loss, or safety claim inferred;
- preserve later bridge UI/product changes within the same native/canonical bridge lineage unless first-party evidence requires a split;
- current status may be represented as active only if the canonical application re-verifies a current first-party Mantle bridge surface immediately before publication.

## canonical application result

Applied on `canonical/growth-batch-11-mantle-mainnet-bridge` after the review PR merged.

- `bir_bridge_000065` — Mantle Mainnet Bridge
- `bir_ev_000239` — 2023-07-17 launch/public-availability lifecycle event
- `bir_src_000391`–`bir_src_000392` — two primary/Tier-1 Mantle sources
- incidents added: **0**
- resulting canonical counts: **65 bridges / 51 incidents / 239 events / 391 evidence**
- data validation, enum validation, full-corpus blocking audit, exact source-count equality, source-quality no-regression, build, and dist consistency passed before final PR CI
- temporary applicator and count-sync workflows were removed from the branch before final review

## duplicate boundary

Current main at review start: `137931f8be5ed966b529981511f34adeeda964bb`.

GitHub code search for `Mantle` inside canonical `data/bridges.json` returned no hit. Batch 10 production verification also enumerated all 64 current bridge dossier routes and contained no Mantle route. The canonical applicator repeated name/domain/alias guards against the 64/51/238/389 baseline before allocating `bir_bridge_000065`.

## retained research-only

- Scroll native bridge — current bridge docs are strong; bridge-specific first-public availability still needs a clean first-party launch locator.
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
