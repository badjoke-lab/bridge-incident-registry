# Record-growth Batch 14 review

Issue: #419

Review-only boundary for one bridge lifecycle addition. This file does not modify canonical JSON.

## Arbitrum Bridge — add_now

Canonical boundary: Arbitrum's native/canonical Ethereum ↔ Arbitrum One bridge.

Reviewed first-party evidence:

- Arbitrum's current official guide `How to bridge tokens to and from Arbitrum One` explicitly identifies the Arbitrum bridge as a native bridge and uses it as the official bridge example: https://blog.arbitrum.io/how-to-bridge-tokens-to-and-from-arbitrum-one/
- Arbitrum's official 2024 Stylus launch retrospective states that the public launch of Arbitrum One was August 31, 2021: https://blog.arbitrum.io/arbitrum-stylus-mainnet/
- Offchain Labs' contemporaneous 2021-08-31 launch post says Arbitrum One opened to everyone and explicitly discusses the token whitelist on `our bridge`, establishing bridge operation at public launch. This Medium-hosted source is review context only and should not be added as unarchived canonical evidence: https://offchain.medium.com/mainnet-for-everyone-27ce0f67c85e

Review decision:

- use **2021-08-31 day precision** for public Arbitrum Bridge availability;
- canonical name `Arbitrum Bridge`;
- native/canonical bridge lineage for Ethereum ↔ Arbitrum One;
- lifecycle-only addition; no incident, exploit, loss, or safety claim inferred;
- canonical evidence should use durable first-party Arbitrum-hosted sources so risky-host headroom does not regress.

## duplicate boundary

Current main at review start: `73972b996afe5689caaf26701c79ef115b3f110e`.

Canonical code search for `Arbitrum` inside `data/bridges.json` returned no hit. Repeat full name/alias/domain/slug checks immediately before canonical ID allocation.

## independent hold

Batch 13 Base Bridge remains HOLD because its correct current status is deprecated and source-quality policy requires archived evidence for terminal entities. Its archive capture failure does not block this active-bridge lane.

## guardrails

- Do not block independent active canonical growth on Batch 13 archival HOLD.
- No secondary-database row import.
- Do not add an unarchived risky-host source when durable first-party evidence supports the same canonical claim.
- Primary/Tier-1 evidence and schema-valid dates are required.
- Repeat alias/domain/slug duplicate checks before ID allocation.
- Preserve bridge/version/product lineage rather than manufacturing duplicates.
- Do not weaken source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality gates.
- Do not raise ceilings to fit corpus growth.
