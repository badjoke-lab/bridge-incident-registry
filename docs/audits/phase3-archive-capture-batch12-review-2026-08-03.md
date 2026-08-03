# Phase 3 Archive Capture Batch 12 review — 2026-08-03

Status: review complete  
Base main: `f58f33e638e9781d8fd599a7778caf26deae3410`  
Review PR: `#157`  
Review run: `30791003886`  
Review job: `91614325087`

## Boundary

Batch 12 reviewed ten exact canonical source URLs from the remaining terminal and risky-host queues.

A URL was technically eligible only when Wayback CDX returned a concrete exact-path capture and an independent replay passed all of the following:

```text
HTTP status       200
Content-Type      text/html
Minimum body      65,536 bytes
Fetch timeout     12 seconds
Wildcard capture  prohibited
Guessed capture   prohibited
```

For X/Twitter records, `x.com` and `twitter.com` were treated only as hostname aliases for the same exact account and status ID.

Technical replay success was not sufficient by itself. The snapshot also had to be temporally compatible with the canonical claim. A capture that predates the state asserted by the evidence record was not approved.

## Final approved mappings

### Celer cBridge DNS incident warning

```text
Canonical URL  https://x.com/CelerNetwork/status/1560046913436946432
Archive URL    https://web.archive.org/web/20220826131239/https://twitter.com/celernetwork/status/1560046913436946432
Replay status  200
Content-Type   text/html; charset=utf-8
Replay bytes   130,815
Evidence IDs   bir_src_000076
Queues         terminal, risky-host
```

### Celer cBridge restoration and compensation update

```text
Canonical URL  https://x.com/CelerNetwork/status/1560123830844411904
Archive URL    https://web.archive.org/web/20250725082946/https://x.com/CelerNetwork/status/1560123830844411904
Replay status  200
Content-Type   text/html; charset=utf-8
Replay bytes   273,965
Evidence IDs   bir_src_000271, bir_src_000274
Queues         terminal, risky-host
```

### SOCKET incident acknowledgement

```text
Canonical URL  https://x.com/SocketDotTech/status/1747349422730813525
Archive URL    https://web.archive.org/web/20240123172459/https://twitter.com/SocketDotTech/status/1747349422730813525
Replay status  200
Content-Type   text/html; charset=utf-8
Replay bytes   198,358
Evidence IDs   bir_src_000080
Queues         terminal, risky-host
```

### Rubic incident announcement

```text
Canonical URL  https://x.com/CryptoRubic/status/1606970530032230403
Archive URL    https://web.archive.org/web/20221231003917/https://twitter.com/CryptoRubic/status/1606970530032230403
Replay status  200
Content-Type   text/html; charset=utf-8
Replay bytes   196,516
Evidence IDs   bir_src_000165, bir_src_000272
Queues         terminal, risky-host
```

Final approved scope:

```text
Approved unique URLs     4
Approved evidence records 6
```

## Technical replay passed but canonical approval rejected

### Holograph documentation

```text
Canonical URL     https://docs.holograph.xyz/
Technical archive https://web.archive.org/web/20221018191533/https://docs.holograph.xyz/
Replay status     200
Content-Type      text/html; charset=utf-8
Replay bytes      264,132
Evidence ID       bir_src_000116
Canonical claim   post-protocol/current documentation state reviewed in 2026
Capture date      2022-10-18
Decision          deferred — claim-time mismatch
```

The canonical record describes the domain state observed in 2026, when it no longer represented the historical omnichain protocol. A 2022 snapshot predates that state and therefore cannot preserve the claim made by `bir_src_000116`. It is not approved despite passing the byte and replay boundary.

## Other deferred candidates

```text
BNB Chain Fusion retirement notice             no accepted exact replay
SOCKET route-removal and restart update         no accepted exact replay
pNetwork v2 end-of-life page                    no accepted exact replay
Syndicate Commons terminal reimbursement page  no accepted exact replay
Transit Finance recovery update                concrete captures found, replay fetches failed
```

No wildcard, guessed, short, failed, or temporally incompatible snapshot is approved.

## Expected canonical effect

If applied without source drift, the four approved unique URLs update six evidence records and reduce the no-regression ceilings as follows:

```text
Evidence with archived_url          85 -> 91
Terminal unarchived unique URLs     36 -> 32
Terminal unarchived evidence        47 -> 41
Risky-host unarchived unique URLs   33 -> 29
Risky-host unarchived evidence      51 -> 45
X/Twitter evidence unarchived       38 -> 32
```

Canonical source URLs, claims, source hierarchy, reliability, dates, linkages, and record counts must remain unchanged. This review PR does not modify canonical data.