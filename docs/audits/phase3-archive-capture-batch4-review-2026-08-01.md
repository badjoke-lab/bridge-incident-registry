# Phase 3 archive capture Batch 4 review — 2026-08-01

Status: review complete  
Canonical changes: none in this PR

## Review result

```text
Selected unique URLs                   10
Verified Wayback URLs                   4
Affected evidence records              13
Current archived evidence              27
Expected archived evidence after PR    40
Terminal unique-URL queue         40 -> 39
Risky-host unique-URL queue       69 -> 65
Terminal evidence-record queue    52 -> 51
Risky-host evidence-record queue 109 -> 96
```

Canonical data selected the first ten unique unarchived first-party or official Medium, Mirror, or Substack URLs, prioritizing terminal bridges, Tier 1 sources, and primary records. The known unavailable Qubit compensation-plan URL was excluded.

Four candidates passed exact Wayback replay. Each accepted saved page returned HTTP 200, `text/html`, and at least the first 65,536 bytes without an exclusion or missing-capture response.

## Approved mappings

### Connext / Everclear history

```text
bir_src_000190
https://web.archive.org/web/20251010212405/https://medium.com/connext/xpollinate-is-now-connext-bridge-d294baea94c2
```

### Allbridge Core

```text
bir_src_000053
bir_src_000210
bir_src_000222
bir_src_000224
https://web.archive.org/web/20260727170405/https://allbridge.medium.com/allbridge-core-updates-following-the-relaunch-9f7716eeb5da
```

### Magpie Protocol

```text
bir_src_000156
bir_src_000251
bir_src_000252
bir_src_000254
https://web.archive.org/web/20250427092212/https://medium.com/@Magpieprotocol/magpie-protocol-smart-contract-vulnerability-post-mortem-f6400db0a25e
```

### THORChain

```text
bir_src_000207
bir_src_000208
bir_src_000209
bir_src_000218
https://web.archive.org/web/20260421175030/https://medium.com/thorchain/thorchains-layers-of-security-e308d537acf1
```

Evidence records sharing one canonical source URL must receive the same exact archive snapshot.

## Deferred candidates

Six selected URLs did not pass the bounded run. Their results included availability/CDX fetch failures, HTTP 503, timeouts, and one replay fetch failure. These outcomes do not prove that no archive exists.

Deferred source groups:

- THORChain ETH router postmortem;
- Meter Passport postmortem;
- Synapse metapool postmortem;
- Magpie recovery-path update;
- Nomad root-cause analysis;
- ChainSwap postmortem and compensation plan.

They remain unarchived and may be retried in a later bounded review. No wildcard or guessed archive is assigned.

## Safety boundary

- only `archived_url` may be added in the canonical migration;
- original source URLs remain unchanged;
- titles, publishers, dates, claims, source tiers, reliability, primary status, and linkages remain unchanged;
- source and record counts remain unchanged;
- hard unique-URL ceilings may only decrease to the observed post-migration values;
- transient verification failures are not reclassified as permanent archive absence;
- wildcard, nearest-date guesses without successful replay, and failed snapshots are prohibited.

## Next

Create a fresh canonical branch from latest `main`, apply these four exact snapshot mappings to thirteen evidence records, tighten the archive-risk ceilings, remove the bounded generator and write-enabled workflow, pass full normal CI, merge, and run explicit production-content verification.