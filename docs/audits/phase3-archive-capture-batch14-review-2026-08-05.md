# Phase 3 Archive Capture Batch 14 review — 2026-08-05

Status: review complete  
Base main: `af236b10fccb6d43066ee5893500637ee542baa1`  
Initial review run: `30975365325`  
Initial review job: `92208128844`  
Reproducibility rerun: `30975486768`  
Reproducibility job: `92208484223`

## Selection boundary

Batch 14 selected ten previously unreviewed exact canonical source URLs from the remaining preservation queues.

The selector:

- scanned all prior `phase3-archive-capture-batch*-review*.md` files;
- excluded every evidence ID already present in a prior archive review;
- grouped duplicate evidence records by normalized canonical URL;
- treated `x.com` and `twitter.com` as aliases only for the same account and status ID;
- selected five terminal-bridge URLs and five risky-host URLs, oldest publication date first;
- found 100 previously reviewed evidence IDs and 49 eligible previously unreviewed unique URLs before selecting the bounded ten-URL scope.

## Replay boundary

A mapping is eligible only when an exact-path Wayback capture independently passes:

```text
HTTP status       200
Content-Type      text/html
Minimum body      65,536 bytes
Fetch timeout     12 seconds
Wildcard capture  prohibited
Guessed capture   prohibited
Temporal boundary capture date on or after the latest canonical publication date for the grouped URL
```

Because one first-pass result was not reproducible, the final approval boundary is the intersection of the two completed runs. A URL approved in only one run is deferred rather than canonicalized.

## Selected scope

```text
pNetwork pBTC-on-BSC exploit analysis
Qubit Bridge Collapse Exploited to the Tune of $80 Million
Hackers steal $100 million from Harmony's Horizon bridge
Summary of the Horizon Bridge Incident
BNB Chain Ecosystem Update
Wormhole acknowledged the network exploit
Wormhole announced restoration of funds and service
Knownsec Blockchain Lab | Li.Finance attack incident
LI.FI Attack: a Cross-chain Bridge Vulnerability? No, It’s Due to Unchecked External Call!
Aurora Labs CEO account of the May Rainbow Bridge attack attempt
```

## Approved mappings

### Qubit Bridge Collapse Exploited to the Tune of $80 Million

```text
Queue          terminal+risky
Canonical URL  https://certik.medium.com/qubit-bridge-collapse-exploited-to-the-tune-of-80-million-a7ab9068e1a0
Archive URL    https://web.archive.org/web/20220128170828/https://certik.medium.com/qubit-bridge-collapse-exploited-to-the-tune-of-80-million-a7ab9068e1a0
Run 1 bytes    114,737
Run 2 bytes    114,732
Evidence IDs   bir_src_000036
```

### Hackers steal $100 million from Harmony's Horizon bridge

```text
Queue          terminal
Canonical URL  https://www.cnbc.com/2022/06/24/hackers-steal-100-million-in-crypto-from-harmonys-horizon-bridge.html
Archive URL    https://web.archive.org/web/20220624104205/https://www.cnbc.com/2022/06/24/hackers-steal-100-million-in-crypto-from-harmonys-horizon-bridge.html
Run 1 bytes    848,937
Run 2 bytes    848,933
Evidence IDs   bir_src_000013
```

### BNB Chain Ecosystem Update

```text
Queue          terminal
Canonical URL  https://www.bnbchain.org/en/blog/bnb-chain-ecosystem-update
Archive URL    https://web.archive.org/web/20221007090234/https://www.bnbchain.org/en/blog/bnb-chain-ecosystem-update/
Run 1 bytes    76,925
Run 2 bytes    76,932
Evidence IDs   bir_src_000021, bir_src_000215
```

### Knownsec Blockchain Lab | Li.Finance attack incident

```text
Queue          risky
Canonical URL  https://medium.com/@Knownsec_Blockchain_Lab/knownsec-blockchain-lab-li-finance-attack-incident-6304c6c728c9
Archive URL    https://web.archive.org/web/20221101043044/https://medium.com/@Knownsec_Blockchain_Lab/knownsec-blockchain-lab-li-finance-attack-incident-6304c6c728c9
Run 1 bytes    181,579
Run 2 bytes    181,577
Evidence IDs   bir_src_000057, bir_src_000226
```

### LI.FI Attack: a Cross-chain Bridge Vulnerability? No, It’s Due to Unchecked External Call!

```text
Queue          risky
Canonical URL  https://blocksecteam.medium.com/li-fi-attack-a-cross-chain-bridge-vulnerability-no-its-due-to-unchecked-external-call-c31e7dadf60f
Archive URL    https://web.archive.org/web/20220325073816/https://blocksecteam.medium.com/li-fi-attack-a-cross-chain-bridge-vulnerability-no-its-due-to-unchecked-external-call-c31e7dadf60f
Run 1 bytes    148,682
Run 2 bytes    148,679
Evidence IDs   bir_src_000059
```

Final approved scope:

```text
Approved unique URLs      5
Approved evidence records 7
```

## Deferred candidates

### pNetwork pBTC-on-BSC exploit analysis

No exact capture was returned in either run.

```text
Evidence ID  bir_src_000087
Decision     deferred — no exact capture
```

### Summary of the Horizon Bridge Incident

The first run replayed one 76,663-byte exact HTML capture successfully. The reproducibility rerun timed out during CDX discovery and did not independently reproduce the mapping. It is excluded from the final approval intersection.

```text
Evidence ID  bir_src_000068
Decision     deferred — not reproducible across both completed runs
```

### Wormhole acknowledged the network exploit

Three exact temporally eligible captures replayed as HTTP 200 HTML, but only 5,133–6,496 bytes.

```text
Evidence ID  bir_src_000063
Decision     deferred — short replay
```

### Wormhole announced restoration of funds and service

No exact capture was returned for either hostname alias in either run.

```text
Evidence IDs bir_src_000064, bir_src_000202
Decision     deferred — no exact capture
```

### Aurora Labs CEO account of the May Rainbow Bridge attack attempt

The first run had one transient x.com CDX timeout and no capture on the twitter.com alias. The unchanged rerun completed both aliases without discovery errors and returned no exact capture.

```text
Evidence ID  bir_src_000096
Decision     deferred — no exact capture on completed rerun
```

No wildcard, guessed, short, failed, temporally incompatible, or non-reproducible snapshot is approved.

## Expected canonical effect

```text
Evidence with archived_url          94 -> 101
Terminal unarchived unique URLs     36 -> 33
Terminal unarchived evidence        49 -> 45
Risky-host unarchived unique URLs   27 -> 24
Risky-host unarchived evidence      42 -> 38
X/Twitter evidence unarchived       30 -> 30
Incident source-count mismatches     0 -> 0
Event source-count mismatches        0 -> 0
Unknown URL status                   0 -> 0
```

Canonical source URLs, claims, source hierarchy, reliability, dates, linkages, and record counts must remain unchanged.

## Safety

This review changes no canonical data. The five approved mappings must be applied on a fresh branch in a separate canonical PR. The temporary review runner and workflow must not remain in the final review diff.
