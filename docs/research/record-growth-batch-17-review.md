# Record-growth Batch 17 review

Issue: #431

Review-only boundary for one bridge lifecycle addition. Canonical JSON remains unchanged in this PR.

## Injective Bridge — add_now

Canonical boundary: Injective's native cross-chain bridge, initially live for Ethereum/ERC-20 transfers on the Injective Hub and later expanded with IBC support and subsequent bridge upgrades.

Reviewed first-party evidence:

- Injective, `Injective Update: September 2021`, published 2021-10-01: https://injective.com/blog/injective-update-september-2021/
  - states the Injective Bridge went live on the Injective Hub during September 2021;
  - states it enabled users to bridge ERC-20 tokens to the Injective Chain;
  - supports **2021-09 month precision**, not an invented day.
- Injective, `Injective IBC Bridge Launch`, published 2021-11-02: https://blog.injective.com/injective-ibc-bridge-launch/
  - states IBC was enabled on Injective and the IBC-enabled Injective Bridge became officially live;
  - supports an expansion event, not a replacement bridge entity.
- Injective Canonical Chain Mainnet release: https://injective.com/blog/injective-canonical-chain-mainnet-release
  - describes the Injective Bridge as a production deployment of the Cosmos Gravity Bridge and as the native cross-chain path for users;
  - supports continuity through the Canonical Chain upgrade.
- Injective March 2024 community update: https://injective.com/blog/the-march-community-update-inevm-on-mainnet-issue/
  - documents the Ionic upgrade to the Injective Bridge;
  - supports continuing bridge lineage rather than a historical-only UI.

Review decision:

- canonical name `Injective Bridge`;
- launch boundary **2021-09 month precision**;
- no September day should be inferred from the October retrospective;
- initial chain boundary is Ethereum ↔ Injective; current BIR chain reference has no dedicated Injective key, therefore canonical application should use `ethereum + unknown` unless a separate bounded reference-enrichment task adds an Injective key first;
- later IBC enablement and Ionic upgrade remain lifecycle context on the same bridge lineage;
- lifecycle-only addition; no incident, exploit, loss, or safety conclusion inferred.

## duplicate boundary

Repository search for `Injective Bridge` returned no canonical hit before this review. Repeat canonical name/alias/domain/slug checks immediately before ID allocation.

## retained hold / research-only

- Base Bridge — HOLD on deprecated-entity archival/source-quality requirements.
- ShuttleFlow — launch and shutdown dates are pinned, but terminal evidence archival requirements must be satisfied before canonicalization.
- Scroll native bridge — exact bridge-first-public date remains insufficiently pinned.
- Orion Bridge — 2022-01-31 launch is pinned, but Orion→Lumia migration/legacy status requires terminal-lifecycle treatment rather than an active record.
- Layerswap — active identity is strong, exact first-public bridge date still insufficiently pinned first-party.

## guardrails

- No secondary-database row import.
- Do not infer an incident from bridge existence.
- Do not fabricate day precision or a new chain-reference key.
- Repeat duplicate checks before IDs.
- Preserve bridge upgrades as lifecycle unless first-party evidence establishes a distinct successor.
- Do not weaken source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality gates.
- Do not raise ceilings to fit corpus growth.

## Canonical application result

Applied on `canonical/growth-batch-17-injective-bridge` after strict baseline and duplicate guards.

- `bir_bridge_000070` — Injective Bridge
- launch: `2021-09` month precision
- `bir_ev_000244` — launch lifecycle event
- `bir_src_000400` — Injective first-party September 2021 retrospective
- chain boundary: `ethereum + unknown`; no Injective reference key invented
- no incident inferred
- resulting corpus: **70 bridges / 51 incidents / 244 events / 399 evidence**
- build output: 129 HTML routes, 84 redirects, 70 bridge dossiers, 51 incident dossiers
- source-quality, source-count, schema, full-corpus, accessibility, performance, and dist gates passed without ceiling changes
