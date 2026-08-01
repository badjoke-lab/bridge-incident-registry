# Phase 3 archive capture Batch 5 review — 2026-08-01

Status: review complete  
Canonical changes: none in this PR

## Review result

```text
Selected unique URLs                   10
Verified Wayback URLs                   6
Affected evidence records              13
Current archived evidence              40
Expected archived evidence after PR    53
Terminal unique-URL queue              39
Risky-host unique-URL queue       65 -> 59
Terminal evidence-record queue         51
Risky-host evidence-record queue  96 -> 83
```

The review selected the first ten unique unarchived first-party or official Medium, Mirror, or Substack URLs from latest canonical data, prioritizing terminal bridges, Tier 1 sources, and primary records. The known unavailable Qubit compensation-plan URL remained excluded.

Batch 5 increased request bounds and replay retries to distinguish transient Wayback failures from missing captures. The acceptance rule did not change: every approved snapshot returned HTTP 200, `text/html`, and at least the first 65,536 bytes without an exclusion or missing-capture response.

## Approved mappings

### THORChain router postmortem

```text
bir_src_000040
bir_src_000042
bir_src_000217
https://web.archive.org/web/20260508231435/https://medium.com/thorchain/post-mortem-eth-router-exploits-1-2-and-premature-return-to-trading-incident-2908928c5fb
```

### Meter Passport postmortem

```text
bir_src_000048
bir_src_000220
bir_src_000221
https://web.archive.org/web/20260725205241/https://medium.com/meter-io/post-mortem-report-meter-passport-12af6b50393d
```

### Synapse metapool postmortem

```text
bir_src_000104
bir_src_000236
bir_src_000276
https://web.archive.org/web/20220628053149/https://synapseprotocol.medium.com/11-06-2021-post-mortem-of-synapse-metapool-exploit-3003b4df4ef4
```

### Nomad root-cause analysis

```text
bir_src_000065
bir_src_000269
https://web.archive.org/web/20250729023040/https://medium.com/nomad-xyz-blog/nomad-bridge-hack-root-cause-analysis-875ad2e5aacd
```

### Orbit Bridge official incident statement

```text
bir_src_000030
https://web.archive.org/web/20260715114539/https://medium.com/orbit-chain/official-statement-regarding-orbit-bridge-exploit-551928f3dc52
```

### Orbit Bridge recovery plan

```text
bir_src_000031
https://web.archive.org/web/20240512005240/https://medium.com/orbit-chain/orbit-bridge-exploit-asset-recovery-and-ecosystem-normalization-plan-draft-3aa7ac2a6e4a
```

Evidence records sharing one canonical source URL must receive the same exact archive snapshot.

## Deferred candidates

Four selected URLs did not pass exact replay and remain unarchived:

- Magpie secure-path update — no capture discovered;
- ChainSwap postmortem and compensation plan — a capture was discovered but replay fetch failed;
- ChainSwap relaunch announcement — no capture discovered;
- Rubic weekly incident report — no capture discovered.

These outcomes do not justify wildcard, guessed, or unverifiable archive URLs. They may be retried in a later bounded review.

## Safety boundary

- only `archived_url` may be added in the canonical migration;
- original source URLs remain unchanged;
- titles, publishers, dates, claims, source tiers, reliability, primary status, and linkages remain unchanged;
- source and record counts remain unchanged;
- the terminal queue does not change because all six approved sources belong to non-terminal current bridge states;
- the risky-host unique ceiling may only decrease from 65 to 59;
- transient verification failures are not reclassified as permanent archive absence;
- wildcard, nearest-date guesses without successful replay, and failed snapshots are prohibited.

## Next

Create a fresh canonical branch from latest `main`, apply these six exact snapshot mappings to thirteen evidence records, tighten the risky-host archive ceiling, remove the bounded generator and write-enabled workflow, pass full normal CI, merge, and run explicit production-content verification.