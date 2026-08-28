# Record-growth Batch 06 review

Status: reviewed for bounded canonical promotion
Date: 2026-08-28
Tracking issue: #389

This review deliberately keeps the batch to three bridge lifecycle additions. It does not promote candidates whose historical launch boundary still lacks sufficiently strong evidence.

## Add now

### Mayan

Canonical boundary: bridge/cross-chain protocol, launch year **2023** only unless stronger exact-date evidence is found during canonicalization.

Reviewed evidence:
- Current first-party docs define Mayan as cross-chain routing/execution with Swift, MCTP and Wormhole Swap, including explicit bridge use cases: https://docs.mayan.finance/
- First-party 2024 funding/lifecycle post says Mayan launched one year earlier and connects Solana, Ethereum and EVM-compatible chains: https://mayan.finance/blog/mayan-secures-usd3-million-funding-to-fuel-the-future-of-cross-chain-trading
- First-party January 2023 blog index establishes active Wormhole/bridge-related Mayan work in early 2023: https://mayan.finance/blog

Do not invent an exact launch day. Wormhole Swap, Swift/MCTP and Mayan 2.0 are lifecycle/architecture evolution unless stronger evidence establishes a split. No incident is inferred.

### rhino.fi

Canonical bridge boundary: **2022-07-13**, when first-party material states DeversiFi becomes rhino.fi and launches cross-chain swaps with Polygon.

Reviewed evidence:
- Rebrand and cross-chain launch announcement: https://rhino.fi/blog/introducing-rhino-fi-the-first-frictionless-gateway-to-multi-chain-defi/
- First-party bridge architecture explanation describes collateralized bridges/liquidity outposts and says the model was built when cross-chain swaps to Polygon launched: https://rhino.fi/blog/understanding-cross-chain-bridging-with-rhino-fi

Do not backdate the bridge to the older DeversiFi L2 exchange launch. Preserve DeversiFi -> rhino.fi lineage in lifecycle context. No incident is inferred.

### Squid

Canonical launch boundary: **2023-01** month precision.

Reviewed evidence:
- First-party retrospective states Squid was conceptualized in 2022 and launched in January 2023: https://www.squidrouter.com/blog/technical-history-of-squid
- Current first-party help material describes the original Coral intent protocol using Axelar GMP and the later Squid Intents architecture using Squid's own TEE-based settlement infrastructure: https://support.squidrouter.com/squid-overview/supported-chains-dexs-tokens-and-bridges/what-is-axelar

Do not invent a launch day. Coral -> Squid Intents is lifecycle architecture evolution, not an incident. No incident is inferred.

## Needs research

### Layerswap

Current official docs clearly define Layerswap as a cross-chain bridging/swapping solution across 70+ chains: https://docs.layerswap.io/introduction

Historical launch boundary remains insufficiently supported for this batch. Keep research-only.

### Owlto Finance

Current official docs clearly define Owlto as an omni-chain liquidity protocol whose flagship product is the Owlto Cross-Chain Bridge: https://docs.owlto.finance/

Public material places Owlto in operation in 2023, but the reviewed set does not yet provide a sufficiently strong first-party launch boundary for canonical promotion. Keep research-only.

### HECO Bridge / HECO Chain gateway 2023

Remain research-only. Do not reuse HTX hot-wallet loss figures as bridge-specific loss figures.

## Promotion guardrails

- Repeat exact duplicate/name/domain checks against current main immediately before ID allocation.
- Add lifecycle only; incident count may remain unchanged.
- Each bridge and lifecycle event must be supported by primary/Tier-1 evidence.
- Use conservative date precision.
- Preserve protocol lineage; do not create entities merely for rebrands or architecture upgrades.
- Do not weaken source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality gates.
- Do not raise validation/performance ceilings for corpus growth.
