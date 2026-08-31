# Record-growth Batch 19 review

Issue: #439

Review-only boundary for one bridge lifecycle addition.

## Ad-Astra Bridge — add_now

Canonical boundary: MultiversX's first-party cross-chain bridge between its network (then Elrond) and EVM-compatible chains, launched first for Ethereum as the Ad Astra Portal and later presented through the MultiversX Bridge interface.

Reviewed first-party evidence:

- MultiversX/Elrond, `Ad Astra Portal: Elrond Ethereum Bridge Goes Live`, published 2022-05-24: https://multiversx.com/blog/ad-astra-portal-elrond-ethereum-bridge-goes-live
  - explicitly announces the go-live of the Elrond Ad Astra Portal;
  - describes it as a newly launched token bridge between Elrond and Ethereum;
  - supports a **2022-05-24 day-precision** launch boundary.
- Current MultiversX bridge architecture docs: https://docs.multiversx.com/bridge/architecture/
  - define `Ad-Astra Bridge` as the system transferring ERC20 tokens between EVM-compatible chains and MultiversX;
  - state that Ethereum and BSC bridges are currently available.
- Current MultiversX terminology docs: https://docs.multiversx.com/welcome/terminology/
  - continue to define `Ad-Astra Bridge` as the MultiversX cross-chain bridge.
- MultiversX, `MultiversX Bridge Is Live`, published 2023-03-15: https://multiversx.com/blog/multiversx-bridge-is-live
  - documents the later MultiversX Bridge interface/branding expansion and BSC support;
  - treat this as lifecycle/UI expansion of the same bridge lineage unless contrary first-party evidence establishes a separate successor.

Review decision:

- canonical name `Ad-Astra Bridge`;
- launch boundary **2022-05-24 day precision**;
- aliases may include `Ad Astra Portal`, `Elrond Ad Astra Portal`, and `MultiversX Bridge` if canonical duplicate guards remain clean;
- initial launch route is Ethereum ↔ Elrond/MultiversX;
- BIR chain reference currently has no dedicated MultiversX key, so canonical application should use `ethereum + unknown` rather than inventing a chain key;
- 2023 BSC expansion and MultiversX Bridge UI remain lifecycle context within the same lineage;
- lifecycle-only addition; no incident, exploit, loss, or safety conclusion inferred.

## duplicate boundary

Repository code search for `Ad Astra`, `MultiversX Bridge`, and `Elrond bridge` returned no canonical record before this review. Canonical application must repeat full name/alias/domain/slug duplicate guards immediately before ID allocation.

## retained hold / research-only

- Base Bridge — HOLD on deprecated-entity archival/source-quality requirements.
- ShuttleFlow — launch and shutdown are pinned, but terminal evidence archival requirements remain unsatisfied.
- Scroll native bridge — exact bridge-first-public boundary remains insufficiently pinned.
- Orion Bridge — Orion→Lumia migration/legacy state requires terminal-lifecycle treatment rather than active classification.
- Layerswap and Polygon PoS / Polygon Portal — historical first-public bridge boundary remains insufficiently pinned.
- ZKsync Era official/default bridge — current bridge identity is strong, but historical bridge-first-public boundary remains insufficiently pinned.

## guardrails

- No secondary-database row import.
- Do not infer an incident from bridge existence.
- Do not fabricate a MultiversX chain-reference key.
- Preserve the 2023 branding/UI expansion as lifecycle unless first-party evidence establishes a distinct successor.
- Repeat duplicate checks before IDs.
- Do not weaken source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality gates.
- Do not raise ceilings to fit corpus growth.
