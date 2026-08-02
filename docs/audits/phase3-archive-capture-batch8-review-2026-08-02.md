# Phase 3 archive capture Batch 8 review — 2026-08-02

Status: review complete  
Canonical changes: none in this PR

## Review result

```text
Selected unique URLs                   10
Verified Wayback URLs                   9
Affected evidence records               9
Current archived evidence              71
Expected archived evidence after PR    80
Terminal unique-URL queue              39
Risky-host unique-URL queue       46 -> 37
Terminal evidence-record queue         51
Risky-host evidence-record queue  65 -> 56
```

The review selected the first ten unique unarchived first-party or official Medium, Mirror, or Substack URLs from latest canonical data, prioritizing terminal bridges, Tier 1 sources, and primary records. The known unavailable Qubit compensation-plan URL remained excluded.

Every approved snapshot returned HTTP 200, `text/html`, and at least the first 65,536 replay bytes without an exclusion or missing-capture response. All three sources deferred in Batch 7 passed under the unchanged replay standard in this batch.

## Approved mappings

### ChainSwap ASAP token update

```text
bir_src_000073
https://web.archive.org/web/20240305013123/https://chain-swap.medium.com/asap-token-important-update-67073aae925c
```

### Synapse protocol introduction

```text
bir_src_000102
https://web.archive.org/web/20250624094748/https://medium.com/synapse-protocol/introducing-synapse-protocol-2af926143deb
```

### Rubic tokenomics update

```text
bir_src_000162
https://web.archive.org/web/20250317123228/https://cryptorubic.medium.com/introducing-the-new-rubic-tokenomics-the-way-forward-abca6cf11d8d
```

### Rubic cross-chain bridge tutorial

```text
bir_src_000163
https://web.archive.org/web/20221130071532/https://cryptorubic.medium.com/cross-chain-bridge-rbc-brbc-and-brbc-tutorial-92158999cabe
```

### Rubic contract-swap guide

```text
bir_src_000170
https://web.archive.org/web/20251010113314/https://cryptorubic.medium.com/how-to-swap-using-rubic-contracts-3da46f0c830c
```

### Poly Network September monthly report

```text
bir_src_000204
https://web.archive.org/web/20221126020156/https://medium.com/poly-network/poly-network-monthly-report-sep-a4cdd9f3fb7a
```

### Ronin validator community alert

```text
bir_src_000268
https://web.archive.org/web/20230401061939/https://roninblockchain.substack.com/p/community-alert-ronin-validators
```

### Poly Network asset-recovery completion

```text
bir_src_000270
https://web.archive.org/web/20221013202750/https://medium.com/poly-network/poly-network-asset-recovery-complete-a7ba33c2f2e4
```

### Transit Finance update

```text
bir_src_000279
https://web.archive.org/web/20221020165004/https://medium.com/@TransitSwap/updates-about-transitfinance-d05176918897
```

## Deferred candidate

One selected URL did not pass exact replay and remains unarchived:

- Poly Network mainnet-upgrade announcement — a capture was discovered, but replay fetch failed and CDX lookup timed out.

This outcome does not justify a wildcard, guessed, or unverifiable archive URL. It may be retried in a later bounded review.

## Safety boundary

- only `archived_url` may be added in the canonical migration;
- original source URLs remain unchanged;
- titles, publishers, dates, claims, source tiers, reliability, primary status, and linkages remain unchanged;
- source and record counts remain unchanged;
- the terminal queue does not change because all nine approved sources belong to non-terminal current bridge states;
- the risky-host unique ceiling may only decrease from 46 to 37;
- transient verification failures are not reclassified as permanent archive absence;
- wildcard, nearest-date guesses without successful replay, and failed snapshots are prohibited.

## Next

Create a fresh canonical branch from latest `main`, apply these nine exact snapshot mappings to nine evidence records, tighten the risky-host archive ceiling, remove the bounded generator and write-enabled workflow, pass full normal CI, merge, and run explicit production-content verification.
