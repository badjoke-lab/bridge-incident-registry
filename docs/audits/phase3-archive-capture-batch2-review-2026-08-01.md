# Phase 3 archive capture Batch 2 review — 2026-08-01

Status: review complete  
Canonical changes: none in this PR

## Review result

```text
Candidate unique URLs                  8
Verified Wayback URLs                 8
Affected evidence records            11
Current archived evidence            10
Expected archived evidence after PR  21
Terminal unique-URL queue        54 -> 46
Risky-host unique-URL queue      83 -> 75
Terminal evidence-record queue   69 -> 58
Risky-host evidence-record queue 126 -> 115
```

All eight candidates are official Medium sources attached to terminal or deprecated Ren Protocol and Avalanche bridge-family records. Each accepted snapshot was discovered through the Wayback availability API and then fetched as exact saved-page HTML. Every accepted replay returned HTTP 200, `text/html`, and at least the first 65,536 bytes without an exclusion or missing-capture response.

## Approved mappings

### Ren Protocol

```text
bir_src_000126
https://web.archive.org/web/20250521035806/https://medium.com/renprotocol/renvm-mainnet-release-98cac4c6fa8e

bir_src_000127
https://web.archive.org/web/20250308100903/https://medium.com/renprotocol/introducing-renbridge-3-0-2b5f49aaf722

bir_src_000128
https://web.archive.org/web/20260226145159/https://medium.com/renprotocol/introducing-ren-2-0-43025b3d5d6

bir_src_000129
bir_src_000130
https://web.archive.org/web/20260725170101/https://medium.com/renprotocol/moving-on-from-alameda-da62a823ce93
```

### Avalanche bridge family

```text
bir_src_000133
https://web.archive.org/web/20221113235304/https://medium.com/avalancheavax/introducing-the-avalanche-ethereum-light-bridge-aelb-through-the-cyberfi-asset-management-b280e830702f

bir_src_000134
https://web.archive.org/web/20221113235737/https://medium.com/avalancheavax/preparing-for-the-next-generation-avalanche-bridge-ab-26f7521485e7

bir_src_000135
bir_src_000138
https://web.archive.org/web/20260429222010/https://medium.com/avalancheavax/new-avalanche-bridge-builds-on-intel-sgx-technology-in-breakthrough-for-cross-chain-8f854e0e72e0

bir_src_000136
bir_src_000139
https://web.archive.org/web/20230604024916/https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1
```

Evidence records sharing one canonical source URL must receive the same exact archive snapshot.

## Safety boundary

- only `archived_url` may be added in the canonical migration;
- original source URLs remain unchanged;
- titles, publishers, dates, claims, source tiers, reliability, primary status, and linkages remain unchanged;
- source and record counts remain unchanged;
- hard unique-URL ceilings may only decrease to the observed post-migration values;
- wildcard, nearest-date guesses without replay, and failed snapshots are prohibited;
- PR #121 was superseded and closed without merge; its long-running CDX-first output is not authoritative.

## Next

Create a fresh canonical branch from latest `main`, apply these eight exact snapshot mappings to eleven evidence records, tighten the archive-risk ceilings, remove the bounded generator and write-enabled workflow, pass full normal CI, merge, and run explicit production-content verification.