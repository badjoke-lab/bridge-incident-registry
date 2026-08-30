# Record-growth Batch 18 review

Issue: #435

Review-only boundary for one bridge lifecycle addition.

## Metis Bridge — add_now

Canonical boundary: Metis' official Ethereum ↔ Metis Andromeda asset bridge.

Reviewed first-party evidence:

- Metis, `Metis to Launch Andromeda, Honoring Our Commitment to Decentralization`, published 2021-11-03: https://www.metis.io/blog/metis-to-launch-andromeda-honoring-our-commitment-to-decentralization
  - says Andromeda would launch during the week of November 15, 2021;
  - explicitly lists `Metis Bridge` as part of the Andromeda structure;
  - defines it as the bridge transferring tokens between Ethereum mainnet and Metis Layer 2;
  - therefore supports a **2021-11 month-precision** launch boundary, but not a fabricated exact day.
- Metis, `Metis DAC staking starts Nov 26`: https://www.metis.io/blog/metis-dac-staking-starts-nov-26
  - instructs users in November 2021 to bridge METIS from Ethereum mainnet to the newly released Andromeda mainnet via `bridge.metis.io`;
  - confirms the bridge was operational during the launch month.
- Current official bridge: https://bridge.metis.io/
  - remains a live Metis-branded bridge interface.
- Current Metis bridge directory: https://www.metis.io/bridge
  - continues to identify the Metis official bridge alongside third-party options.

Review decision:

- canonical name `Metis Bridge`;
- launch boundary **2021-11 month precision**;
- no exact November day should be inferred from the planned launch week or later staking instructions;
- initial/current canonical route is Ethereum ↔ Metis Andromeda;
- BIR chain reference already contains `metis`, so canonical application uses `ethereum + metis`;
- lifecycle-only addition; no incident, exploit, loss, or safety conclusion inferred.

## duplicate boundary

Repository code search for `Metis Bridge` returned no canonical record before this review. Canonical application repeated name/slug/domain duplicate guards before ID allocation.

## retained hold / research-only

- Base Bridge — HOLD on deprecated-entity archival/source-quality requirements.
- ShuttleFlow — launch and shutdown are pinned, but terminal evidence archival requirements remain unsatisfied.
- Scroll native bridge — exact bridge-first-public boundary remains insufficiently pinned.
- Orion Bridge — Orion→Lumia migration/legacy state requires terminal-lifecycle treatment rather than active classification.
- Layerswap and Polygon PoS / Polygon Portal — historical first-public bridge boundary remains insufficiently pinned.
- ZKsync Era default/official bridge — current bridge identity is strong, but do not equate Era network public launch with bridge-first-public availability until first-party historical evidence pins that boundary.

## guardrails

- No secondary-database row import.
- Do not infer an incident from bridge existence.
- Do not fabricate day precision.
- Repeat duplicate checks before IDs.
- Do not weaken source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality gates.
- Do not raise ceilings to fit corpus growth.

## Canonical application result

Applied on `canonical/growth-batch-18-metis-bridge` after strict baseline and duplicate guards.

- `bir_bridge_000071` — Metis Bridge
- launch: `2021-11` month precision
- `bir_ev_000245` — launch lifecycle event
- `bir_src_000401` — first-party Metis Andromeda launch announcement
- chain boundary: `ethereum + metis`
- no incident inferred
- resulting corpus: **71 bridges / 51 incidents / 245 events / 400 evidence**
- source-quality, source-count, schema, full-corpus, accessibility, performance, build, and dist gates passed without ceiling changes
