# Record-growth Batch 16 review

Issue: #427

Review-only boundary for one bridge lifecycle addition. Canonical JSON remains unchanged in this PR.

## Shyft Bridge — add_now

Canonical boundary: the Ethereum ↔ Shyft Mainnet bridge deployed by the Shyft Node Federation, with current first-party terminology identifying the technology as Byfrost (Shyft Bridge).

Reviewed first-party evidence:

- Shyft Network, 2021-09-02, “The Shyft Federation Deploys the Shyft Bridge”: https://www.shyft.network/newsroom/the-shyft-federation-deploys-the-shyft-bridge
  - explicitly announces deployment on Shyft Mainnet;
  - explicitly describes transfer of ERC assets from Ethereum to Shyft Network;
  - provides a day-precision public bridge boundary.
- Current Shyft glossary: https://www.shyft.network/glossary
  - defines `Byfrost (Shyft Bridge)` as Shyft Network bridging technology for interoperable cross-chain asset transfer and management.
- Current Shyft homepage: https://www.shyft.network/
  - confirms the network remains publicly represented and states Mainnet launched in July 2021.

Review decision:

- use **2021-09-02 day precision** for bridge deployment/public availability;
- canonical name `Shyft Bridge`;
- aliases `Byfrost` and `Byfrost (Shyft Bridge)` only after exact duplicate guard;
- preserve the 2021 Shyft Bridge and current Byfrost naming as one lineage;
- do not claim a current end-user bridge UI unless independently evidenced;
- lifecycle-only addition; no incident, exploit, loss, or safety claim inferred.

## canonical application correction

Canonical application added `bir_bridge_000069`, launch event `bir_ev_000243`, and first-party launch evidence `bir_src_000399`. The resulting corpus is **69 bridges / 51 incidents / 243 events / 398 evidence**.

A later first-party Shyft tokenomics post dated 2021-10-01 states that Byfrost had not yet launched and was expected later that year. That evidence materially narrows the naming boundary: canonical data therefore **does not** backdate `Byfrost` or `Byfrost (Shyft Bridge)` to the 2021-09-02 Shyft Bridge deployment and does not store either as a launch-day alias. Current glossary terminology remains lineage context only unless a separate Byfrost launch boundary is established.

The canonical applicator passed data/schema/full-corpus/source-count/source-quality gates. Count synchronization subsequently built **128 canonical HTML routes**, preserved **84 legacy redirects**, and validated **44 reviewed Series relationships** without raising any ceiling.

## duplicate boundary

Current main at review start: `9be3d3beb04f9c223dff120b7b98099cc69fb189`.

Repository search for `Shyft Bridge` returned no canonical hit. Repeat canonical name/alias/domain/slug checks immediately before ID allocation.

## retained research-only / hold

- Base Bridge — HOLD on deprecated-entity archival/source-quality requirements.
- Scroll native bridge — current identity and mainnet bridge existence confirmed, but exact bridge-first-public date remains insufficiently pinned; do not infer the Mainnet date is the bridge date.
- Polygon PoS Bridge / Polygon Portal — current first-party identity is clear, original bridge launch boundary remains insufficiently pinned.
- Layerswap — current bridge identity is clear, historical launch boundary remains insufficiently pinned first-party.

## guardrails

- No secondary-database row import.
- Do not infer an incident from bridge existence.
- Do not invent current UI availability.
- Repeat alias/domain/slug duplicate checks before IDs.
- Preserve historical/current naming lineage rather than manufacturing duplicates.
- Do not weaken source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality gates.
- Do not raise ceilings to fit corpus growth.
