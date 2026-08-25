# Record Growth Batch 02 Canonical Allocation — 2026-08-25

Issue: #371
Review authority: #374
Base main: 441d981d099e6ddb8672d1ed1f5f088735ed5cb2
Current canonical counts: 42 bridges / 47 incidents / 214 events / 353 evidence IDs allocated through bir_src_000353.

## Fresh-main allocation

- New bridge: `bir_bridge_000043` — QANplatform QANX Bridge
- Existing bridge: `bir_bridge_000007` — Multichain / Anyswap identity for the 2021 V3 incident
- New incidents: `bir_inc_000048` (Anyswap V3 2021), `bir_inc_000049` (QANplatform 2022)
- New events begin at `bir_ev_000215`
- New evidence begins at `bir_src_000354`

## Required event structure

### bir_inc_000048 — Anyswap / Multichain Router V3 exploit

1. exploit / disclosure on 2021-07-10
2. compensation commitment after the exploit
3. V3 relaunch as a separate lifecycle event

Keep exact token amounts (2,398,496.02 USDC and 5,509,222.73 MIM) without manufacturing a USD aggregate. Do not generalize impact to the normal V1/V2 bridge.

### bir_inc_000049 — QANplatform QANX bridge wallet hack

1. bridge-wallet compromise beginning 2022-10-11 08:16:39 UTC on BSC, followed immediately on Ethereum
2. old-QANX replacement / new-token migration
3. compensation / claim program as a distinct aftermath event

Do not assert a stolen USD amount unless a reviewed source supports it. Keep current operational status conservative if first-party reopening evidence is absent.

## Canonical gates

Application must pass the existing schema/enum, first-ten, full-corpus, exact source-count, source-quality, production-content, build, accessibility, performance, dist, Series and production-equality gates without weakening any ceiling or validator.
