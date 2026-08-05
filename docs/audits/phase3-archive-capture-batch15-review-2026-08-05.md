# Phase 3 Archive Capture Batch 15 review — 2026-08-05

Status: complete  
Repository: `badjoke-lab/bridge-incident-registry`  
Review branch: `agent/phase3-archive-capture-batch15-review`

## Boundary

Batch 15 selected ten exact canonical source URLs from the remaining terminal and risky-host queues after excluding every evidence ID already recorded in Archive Capture Batch 1 through Batch 14 review audits.

The review made no canonical-data changes. Each candidate was checked twice independently with the same permanent boundary:

- exact CDX lookup only;
- no wildcard or guessed captures;
- `x.com` and `twitter.com` aliases only for the same account and status ID;
- HTTP 200 replay;
- HTML content type;
- minimum replay size of 65,536 bytes;
- snapshot date on or after the latest canonical publication date for the grouped source URL;
- canonical approval only when the same exact archive URL reproduced in both runs.

## Review execution

```text
Initial tooling-only failed run  30982460789
Initial failed job               92229633807
Successful review run            30982525139
Successful review job            92229837506
Run 1 generated at               2026-08-05T06:47:11.228Z
Run 2 generated at               2026-08-05T06:47:54.369Z
Selected unique URLs             10
Reproducible approved URLs        7
Approved evidence records         9
```

The initial run failed before candidate review because it tried to read the temporary Batch 14 reviewer from the cleaned branch tip. The corrected run read the immutable historical reviewer commit `7bd452ee8a86073355266cd0bbeec4bada8eb1b9`. No canonical file was touched by either run.

## Reproducible approved mappings

### Elliptic BSC Token Hub analysis

```text
Queue          terminal
Canonical URL  https://www.elliptic.co/blog/analysis/attack-mints-569-million-worth-of-bnb-tokens-in-bsc-bridge-exploit
Archive URL    https://web.archive.org/web/20230922124338/https://www.elliptic.co/blog/analysis/attack-mints-569-million-worth-of-bnb-tokens-in-bsc-bridge-exploit
Run 1 bytes    98,857
Run 2 bytes    98,857
Evidence IDs   bir_src_000023
```

### BNB Chain decentralized response

```text
Queue          terminal
Canonical URL  https://www.bnbchain.org/en/blog/bnb-chain-a-decentralized-response
Archive URL    https://web.archive.org/web/20221011125745/https://www.bnbchain.org/en/blog/bnb-chain-a-decentralized-response/
Run 1 bytes    83,743
Run 2 bytes    83,743
Evidence IDs   bir_src_000022, bir_src_000205, bir_src_000214
```

### SlowMist pGALA analysis

```text
Queue          terminal+risky
Canonical URL  https://slowmist.medium.com/slowmist-the-root-cause-of-the-pgala-event-is-that-the-plaintext-of-the-private-key-was-leaked-on-6e117ccf5473
Archive URL    https://web.archive.org/web/20250913010536/https://slowmist.medium.com/slowmist-the-root-cause-of-the-pgala-event-is-that-the-plaintext-of-the-private-key-was-leaked-on-6e117ccf5473
Run 1 bytes    137,069
Run 2 bytes    137,069
Evidence IDs   bir_src_000091
```

The pGALA snapshot is later than the 2022 publication date but satisfies the existing claim-time boundary because it is an exact replay of the same canonical source URL captured after publication. No earlier accepted exact replay was available within the tested replay set.

### BNB Chain October 2022 technology update

```text
Queue          terminal
Canonical URL  https://www.bnbchain.org/en/blog/technology-update-of-bnb-chain-in-october-2022
Archive URL    https://web.archive.org/web/20221108164017/https://bnbchain.org/en/blog/technology-update-of-bnb-chain-in-october-2022/
Run 1 bytes    79,299
Run 2 bytes    79,299
Evidence IDs   bir_src_000206
```

### FBI Harmony attribution statement

```text
Queue          terminal
Canonical URL  https://www.fbi.gov/news/press-releases/fbi-confirms-lazarus-group-cyber-actors-responsible-for-harmonys-horizon-bridge-currency-theft
Archive URL    https://web.archive.org/web/20230124144331/https://www.fbi.gov/news/press-releases/fbi-confirms-lazarus-group-cyber-actors-responsible-for-harmonys-horizon-bridge-currency-theft
Run 1 bytes    79,390
Run 2 bytes    79,390
Evidence IDs   bir_src_000014
```

### SlowMist Transit Swap analysis duplicate record

```text
Queue          risky
Canonical URL  https://slowmist.medium.com/cross-chain-dex-aggregator-transit-swap-hacked-analysis-74ba39c22020
Archive URL    https://web.archive.org/web/20221002090056/https://slowmist.medium.com/cross-chain-dex-aggregator-transit-swap-hacked-analysis-74ba39c22020
Run 1 bytes    106,310
Run 2 bytes    106,310
Evidence IDs   bir_src_000149
```

This exact source URL already has the same verified snapshot on `bir_src_000248`. Batch 15 reviews the still-unarchived duplicate evidence record separately; it does not introduce a new source URL or a different snapshot.

### Dcentralab Rubic analysis

```text
Queue          risky
Canonical URL  https://medium.com/dcentralab-diligence/dcentralab-diligence-analysis-rubic-dex-aggregator-hack-d5ffd2505239
Archive URL    https://web.archive.org/web/20221226210143/https://medium.com/dcentralab-diligence/dcentralab-diligence-analysis-rubic-dex-aggregator-hack-d5ffd2505239
Run 1 bytes    121,390
Run 2 bytes    121,390
Evidence IDs   bir_src_000167
```

## Deferred

### Aurora Labs CEO Rainbow Bridge account

```text
Evidence ID   bir_src_000099
Canonical     https://x.com/AlexAuroraDev/status/1561686828367003648
Run 1         no accepted exact replay
Run 2         no accepted exact replay
Decision      defer
```

### QuillAudits November 2022 monthly article

```text
Evidence ID   bir_src_000164
Canonical     https://quillaudits.medium.com/november-2022-kickstart-with-32-million-in-defi-hacks-7898032cb7c0
Run 1         no accepted exact replay
Run 2         CDX request timeout; no accepted exact replay
Decision      defer
```

### QuillAudits Rubic exploit analysis

```text
Evidence ID   bir_src_000166
Canonical     https://quillaudits.medium.com/decoding-rubic-exchange-exploit-quillaudits-44828e71c417
Run 1         CDX request timeout; no accepted exact replay
Run 2         accepted 155,613-byte replay at 20221227131535
Decision      defer because the exact snapshot did not reproduce in both runs
```

## Projected canonical effect

If all seven reviewed mappings are applied to the nine evidence records on a fresh canonical branch, the expected ceilings are:

```text
Evidence with archived_url          101 -> 110
Terminal unarchived unique URLs      33 -> 28
Terminal unarchived records          45 -> 38
Risky-host unarchived unique URLs    24 -> 21
Risky-host unarchived records        38 -> 35
X/Twitter records unarchived         30 -> 30
```

These values are projections. The permanent source-quality validator remains authoritative and must reject any incorrect ceiling before commit.

## Safety

A separate canonical PR may add only the seven exact reviewed `archived_url` mappings above. Source URLs, titles, claims, publication dates, source hierarchy, reliability, bridge/event/incident linkages, and all other canonical fields must remain unchanged.
