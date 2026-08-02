# Phase 3 archive capture Batch 7 review — 2026-08-02

Status: review complete  
Canonical changes: none in this PR

## Review result

```text
Selected unique URLs                   10
Verified Wayback URLs                   7
Affected evidence records               7
Current archived evidence              64
Expected archived evidence after PR    71
Terminal unique-URL queue              39
Risky-host unique-URL queue       53 -> 46
Terminal evidence-record queue         51
Risky-host evidence-record queue  72 -> 65
```

The review selected the first ten unique unarchived first-party or official Medium, Mirror, or Substack URLs from latest canonical data, prioritizing terminal bridges, Tier 1 sources, and primary records. The known unavailable Qubit compensation-plan URL remained excluded.

Every approved snapshot returned HTTP 200, `text/html`, and at least the first 65,536 replay bytes without an exclusion or missing-capture response. Four sources deferred in Batch 6 passed under the unchanged replay standard in this batch.

## Approved mappings

### Meter monthly recovery update

```text
bir_src_000049
https://web.archive.org/web/20221110135030/https://medium.com/meter-io/the-meter-monthly-february-2022-7172b75f40a5
```

### Meter Passport v1.5 audit announcement

```text
bir_src_000051
https://web.archive.org/web/20260726003029/https://medium.com/meter-io/meter-passport-v1-5-completes-a-rigorous-audit-by-haechi-760cbda5959
```

### Allbridge compensation-plan announcement

```text
bir_src_000054
https://web.archive.org/web/20230405082243/https://allbridge.medium.com/compensation-plan-announcement-3c0593987763
```

### Nomad road-to-recovery update

```text
bir_src_000066
https://web.archive.org/web/20250612171546/https://medium.com/nomad-xyz-blog/the-road-to-recovery-6abe5eec8ff1
```

### Nomad relaunch guide

```text
bir_src_000067
https://web.archive.org/web/20251117051032/https://medium.com/nomad-xyz-blog/nomad-bridge-relaunch-guide-3a4ef6624f90
```

### ChainSwap July 11 postmortem

```text
bir_src_000072
https://web.archive.org/web/20260322055929/https://chain-swap.medium.com/chainswap-exploit-11-july-2021-post-mortem-6e4e346e5a32
```

### Synapse Hadean mainnet launch

```text
bir_src_000103
https://web.archive.org/web/20240714155645/https://medium.com/synapse-protocol/synapses-mainnet-launch-the-hadean-phase-d09fc74b2272
```

## Deferred candidates

Three selected URLs did not pass exact replay and remain unarchived:

- ChainSwap ASAP token update — capture discovered but replay fetch failed;
- Synapse protocol introduction — no capture discovered during this run;
- Rubic tokenomics update — capture discovered but replay fetch failed.

These outcomes do not justify wildcard, guessed, or unverifiable archive URLs. They may be retried in a later bounded review.

## Safety boundary

- only `archived_url` may be added in the canonical migration;
- original source URLs remain unchanged;
- titles, publishers, dates, claims, source tiers, reliability, primary status, and linkages remain unchanged;
- source and record counts remain unchanged;
- the terminal queue does not change because all seven approved sources belong to non-terminal current bridge states;
- the risky-host unique ceiling may only decrease from 53 to 46;
- transient verification failures are not reclassified as permanent archive absence;
- wildcard, nearest-date guesses without successful replay, and failed snapshots are prohibited.

## Next

Create a fresh canonical branch from latest `main`, apply these seven exact snapshot mappings to seven evidence records, tighten the risky-host archive ceiling, remove the bounded generator and write-enabled workflow, pass full normal CI, merge, and run explicit production-content verification.
