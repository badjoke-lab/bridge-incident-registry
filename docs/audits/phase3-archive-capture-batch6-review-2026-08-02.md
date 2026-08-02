# Phase 3 archive capture Batch 6 review — 2026-08-02

Status: review complete  
Canonical changes: none in this PR

## Review result

```text
Selected unique URLs                   10
Verified Wayback URLs                   6
Affected evidence records              11
Current archived evidence              53
Expected archived evidence after PR    64
Terminal unique-URL queue              39
Risky-host unique-URL queue       59 -> 53
Terminal evidence-record queue         51
Risky-host evidence-record queue  83 -> 72
```

The review selected the first ten unique unarchived first-party or official Medium, Mirror, or Substack URLs from latest canonical data, prioritizing terminal bridges, Tier 1 sources, and primary records. The known unavailable Qubit compensation-plan URL remained excluded.

Every approved snapshot returned HTTP 200, `text/html`, and at least the first 65,536 replay bytes without an exclusion or missing-capture response. The four previously deferred Magpie, ChainSwap, and Rubic sources passed under the unchanged replay standard in this batch.

## Approved mappings

### Magpie secure-path update

```text
bir_src_000157
bir_src_000253
bir_src_000255
https://web.archive.org/web/20241205032757/https://medium.com/@Magpieprotocol/magpie-protocol-charting-a-secure-path-following-exploit-c7046d9fc3ca
```

### ChainSwap postmortem and compensation plan

```text
bir_src_000071
bir_src_000228
https://web.archive.org/web/20260306154253/https://chain-swap.medium.com/chainswap-post-mortem-and-compensation-plan-90cad50898ab
```

### ChainSwap relaunch

```text
bir_src_000074
bir_src_000211
https://web.archive.org/web/20220929042722/https://chain-swap.medium.com/chainswap-re-launch-we-are-live-5e85d2f9c80f
```

### Rubic weekly incident report

```text
bir_src_000161
bir_src_000280
https://web.archive.org/web/20221104145206/https://cryptorubic.medium.com/rubic-weekly-report-11-04-2022-ce6196be68b8
```

### Orbit Bridge service-resumption strategy

```text
bir_src_000032
https://web.archive.org/web/20260713041951/https://medium.com/orbit-chain/orbit-bridge-strategies-for-service-resumption-draft-250c1acb3ecc
```

### Orbit Bridge follow-up plan

```text
bir_src_000033
https://web.archive.org/web/20260713041950/https://medium.com/orbit-chain/orbit-bridge-follow-up-plan-e65d8cbabbb5
```

Evidence records sharing one canonical source URL must receive the same exact archive snapshot.

## Deferred candidates

Four selected URLs did not pass exact replay and remain unarchived:

- Meter monthly February 2022 — capture discovered but replay fetch failed;
- Meter Passport v1.5 audit announcement — capture discovered but replay fetch failed after CDX 503;
- Allbridge compensation-plan announcement — capture discovered but replay fetch failed;
- Nomad road-to-recovery update — capture discovered but replay fetch failed.

These outcomes do not justify wildcard, guessed, or unverifiable archive URLs. They may be retried in a later bounded review.

## Safety boundary

- only `archived_url` may be added in the canonical migration;
- original source URLs remain unchanged;
- titles, publishers, dates, claims, source tiers, reliability, primary status, and linkages remain unchanged;
- source and record counts remain unchanged;
- the terminal queue does not change because all approved sources belong to non-terminal current bridge states;
- the risky-host unique ceiling may only decrease from 59 to 53;
- transient verification failures are not reclassified as permanent archive absence;
- wildcard, nearest-date guesses without successful replay, and failed snapshots are prohibited.

## Next

Create a fresh canonical branch from latest `main`, apply these six exact snapshot mappings to eleven evidence records, tighten the risky-host archive ceiling, remove the bounded generator and write-enabled workflow, pass full normal CI, merge, and run explicit production-content verification.
