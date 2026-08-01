# Phase 3 archive capture Batch 3 review — 2026-08-01

Status: review complete  
Canonical changes: none in this PR

## Review result

```text
Candidate unique URLs                   6
Verified Wayback URLs                  6
Affected evidence records             6
Current archived evidence            21
Expected archived evidence after PR  27
Terminal unique-URL queue        46 -> 40
Risky-host unique-URL queue      75 -> 69
Terminal evidence-record queue   58 -> 52
Risky-host evidence-record queue 115 -> 109
```

All six candidates are first-party official Medium sources attached to terminal bridge records. Each accepted snapshot was discovered through the Wayback availability API and fetched as exact saved-page HTML. Every accepted replay returned HTTP 200, `text/html`, and at least the first 65,536 bytes without an exclusion or missing-capture response.

## Approved mappings

### ShuttleFlow / Conflux Network

```text
bir_src_000141
https://web.archive.org/web/20220922034804/https://medium.com/conflux-network/shuttleflow-protocol-passes-peckshield-security-audit-fe0aa0f20d27

bir_src_000142
https://web.archive.org/web/20241112012055/https://medium.com/conflux-network/shuttleflow-enabling-the-future-of-defi-through-true-multi-chain-connection-e60c2bada7d4

bir_src_000143
https://web.archive.org/web/20220921220844/https://medium.com/conflux-network/shuttleflow-v1-3-0-front-end-upgrade-released-301b2ab59437
```

### pNetwork

```text
bir_src_000085
https://web.archive.org/web/20220901155603/https://medium.com/pnetwork/introducing-pnetwork-v2-bfa7fcdcedb8

bir_src_000089
https://web.archive.org/web/20250523153354/https://medium.com/pnetwork/lessons-learnt-from-the-pgala-exploit-50e686730b98
```

### Qubit / Bunny same-operator ecosystem

```text
bir_src_000038
https://web.archive.org/web/20251115174815/https://pancakebunny.medium.com/the-next-chapter-dao-9630b2c087b
```

## Excluded known gap

`bir_src_000037`, the official Qubit compensation-plan page, remains unarchived. Batch 1 found no verified snapshot. It was not retried or assigned a guessed capture in Batch 3.

## Safety boundary

- only `archived_url` may be added in the canonical migration;
- original source URLs remain unchanged;
- titles, publishers, dates, claims, source tiers, reliability, primary status, and linkages remain unchanged;
- source and record counts remain unchanged;
- hard unique-URL ceilings may only decrease to the observed post-migration values;
- wildcard, nearest-date guesses without replay, and failed snapshots are prohibited.

## Next

Create a fresh canonical branch from latest `main`, apply these six exact snapshot mappings to six evidence records, tighten the archive-risk ceilings, remove the bounded generator and write-enabled workflow, pass full normal CI, merge, and run explicit production-content verification.