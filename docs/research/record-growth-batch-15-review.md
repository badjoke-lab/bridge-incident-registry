# Record-growth Batch 15 review

Issue: #423

Review-only boundary for one bridge lifecycle addition. This file does not modify canonical JSON.

## Optimism Standard Bridge — add_now

Canonical boundary: Optimism/OP Mainnet's native Standard Bridge between Ethereum and OP Mainnet.

Reviewed evidence:

- Current Optimism documentation identifies the Standard Bridge as the token bridging system available on OP Mainnet and standard OP Stack chains, composed of `L1StandardBridge` and `L2StandardBridge`: https://docs.optimism.io/app-developers/guides/bridging/standard-bridge
- Current Optimism bridging basics documentation says OP Mainnet has a system called the Standard Bridge for moving ETH/ERC-20 tokens between Ethereum and OP Mainnet: https://docs.optimism.io/app-developers/guides/bridging/basics
- Optimism's contemporaneous first-party 2021-07-13 launch post says that starting that day anybody could deposit into Optimistic Ethereum and explicitly describes a redesigned token bridge supporting DAI, WBTC, USDT, EURT, ETH, and SNX at launch: https://medium.com/ethereum-optimism/announcing-uniswap-v3-on-optimism-6fb033398a11
- Uniswap Labs' contemporaneous 2021-07-13 launch post independently corroborates that users could migrate assets through the Optimism Gateway and that the Optimism team retained upgrade rights over the bridge contract at launch: https://blog.uniswap.org/uniswap-optimism-alpha
- Optimism's March 2021 OpenZeppelin audit hosted on `docs.optimism.io` documents the token bridge contracts and L1/L2 gateway mechanics before public launch: https://docs.optimism.io/audit-reports/2021_03-OVM_and_Rollup-OpenZeppelin.pdf

Review decision:

- use **2021-07-13 day precision** for public Standard Bridge availability;
- canonical name `Optimism Standard Bridge`;
- aliases may include `Optimism Bridge`, `Optimism Gateway`, and `OP Mainnet Standard Bridge` only after exact duplicate checks;
- preserve one native bridge lineage across Gateway/front-end naming and later Bedrock contract upgrades rather than creating separate entities;
- lifecycle-only addition; no incident, exploit, loss, or safety claim inferred;
- keep the historical Medium-hosted first-party post as review context unless an acceptable archived/durable equivalent is available without consuming additional risky-host headroom.

## duplicate boundary

Current main at review start: `cf1e87557fc458390ab85b3399c83c2f4687d2a3`.

Repository code search for `Optimism Standard Bridge` returned no hit. Repeat full canonical name/alias/domain/slug checks immediately before canonical ID allocation.

## independent hold

Batch 13 Base Bridge remains HOLD on deprecated-entity archival/source-quality requirements. This does not block the independent active-bridge lane.

## guardrails

- No secondary-database row import.
- Do not infer an incident from bridge existence.
- Repeat alias/domain/slug duplicate checks before ID allocation.
- Preserve bridge/version/front-end lineage rather than manufacturing duplicates.
- Prefer durable first-party evidence in canonical rows; do not raise risky-host/source-quality ceilings.
- Do not weaken source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality gates.
- Do not raise ceilings to fit corpus growth.
