# Phase 3 Archive Capture Batch 13 review — 2026-08-05

Status: review complete  
Base main: `2977e1534a5983afc312e04e8176ea2bc5fd339e`  
Review PR: `#173`  
Review merge: `fba6c668207ba1fb2613840df81123a54da5b669`  
Completed review run: `30969286547`  
Completed review job: `92189914803`

## Boundary

Batch 13 reviewed ten exact canonical source URLs selected from the remaining archive-preservation queue.

A URL was technically eligible only when Wayback CDX returned a concrete exact-path capture and an independent replay passed all of the following:

```text
HTTP status       200
Content-Type      text/html
Minimum body      65,536 bytes
Fetch timeout     12 seconds
Wildcard capture  prohibited
Guessed capture   prohibited
```

For X/Twitter records, `x.com` and `twitter.com` were treated only as hostname aliases for the same exact account and status ID. A snapshot also had to be dated on or after the canonical source publication date.

The first Ubuntu-hosted review run (`30968992240`) remained queued without a runner assignment. The same reviewed script and inputs were moved unchanged to a macOS-hosted runner; run `30969286547` completed successfully. This runner change did not alter the review boundary or candidate set.

## Selected scope

```text
Holograph incident and containment statement
SlowMist Transit Swap exploit analysis
Taiko incident and containment statement
Taiko bridge reopening and make-whole statement
Syndicate Commons Bridge compromise statement
SOCKET fund recovery update
Holograph incident postmortem announcement
Transit Finance recovery update
Unizen reimbursement announcement
Everclear wind-down announcement
```

## Approved mappings

### SlowMist Transit Swap exploit analysis

```text
Canonical URL  https://slowmist.medium.com/cross-chain-dex-aggregator-transit-swap-hacked-analysis-74ba39c22020
Archive URL    https://web.archive.org/web/20221002090056/https://slowmist.medium.com/cross-chain-dex-aggregator-transit-swap-hacked-analysis-74ba39c22020
Replay status  200
Content-Type   text/html; charset=utf-8
Replay bytes   106,310
Evidence IDs   bir_src_000248
Queue          general archive preservation; not counted by the risky-host validator
```

### SOCKET fund recovery update

```text
Canonical URL  https://x.com/SocketDotTech/status/1749734794320363802
Archive URL    https://web.archive.org/web/20240123171406/https://twitter.com/socketdottech/status/1749734794320363802
Replay status  200
Content-Type   text/html; charset=utf-8
Replay bytes   199,610
Evidence IDs   bir_src_000275
Queue          risky-host
```

### Transit Finance recovery update

```text
Canonical URL  https://x.com/TransitFinance/status/1576463550557483008
Archive URL    https://web.archive.org/web/20221002214601/https://twitter.com/transitfinance/status/1576463550557483008
Replay status  200
Content-Type   text/html; charset=utf-8
Replay bytes   132,926
Evidence IDs   bir_src_000278
Queue          risky-host
```

Final approved scope:

```text
Approved unique URLs      3
Approved evidence records 3
```

All three approved records belong to active bridges. The terminal queue is unchanged.

## Deferred candidates

### Holograph incident and containment statement

Six temporally eligible exact captures replayed as HTTP 200 HTML, but all were only 5,141–6,649 bytes. They remain below the permanent 65,536-byte boundary.

```text
Evidence ID  bir_src_000239
Decision     deferred — short replay
```

### Taiko incident and containment statement

No exact capture was returned for either the x.com or twitter.com form of the same status ID.

```text
Evidence IDs bir_src_000256, bir_src_000257, bir_src_000273
Decision     deferred — no exact capture
```

### Taiko bridge reopening and make-whole statement

No exact capture was returned for either hostname form.

```text
Evidence IDs bir_src_000258, bir_src_000259, bir_src_000283
Decision     deferred — no exact capture
```

### Syndicate Commons Bridge compromise statement

No exact capture was returned for either hostname form.

```text
Evidence IDs bir_src_000261, bir_src_000262, bir_src_000266, bir_src_000267
Decision     deferred — no exact capture
```

### Holograph incident postmortem announcement

Two temporally eligible exact captures replayed as HTTP 200 HTML, but only 5,149 and 6,566 bytes.

```text
Evidence ID  bir_src_000277
Decision     deferred — short replay
```

### Unizen reimbursement announcement

Four temporally eligible exact captures replayed as HTTP 200 HTML, but only 5,008–6,826 bytes.

```text
Evidence ID  bir_src_000281
Decision     deferred — short replay
```

### Everclear wind-down announcement

No exact capture was returned for either hostname form.

```text
Evidence ID  bir_src_000284
Decision     deferred — no exact capture
```

No wildcard, guessed, short, failed, or temporally incompatible snapshot is approved.

## Validator reconciliation

The initial review estimate treated all three approved URLs as members of the risky-host queue and projected `29 -> 26`. The canonical source-quality validator established the authoritative classification:

- the two X/Twitter URLs reduce the risky-host unique-URL queue;
- the SlowMist Medium URL improves archive coverage but is not counted by the risky-host host set;
- all three records reduce the risky-host evidence-record count because the record-level report includes their active-bridge preservation obligations.

The corrected expected effect is:

```text
Evidence with archived_url          91 -> 94
Terminal unarchived unique URLs     36 -> 36
Terminal unarchived evidence        49 -> 49
Risky-host unarchived unique URLs   29 -> 27
Risky-host unarchived evidence      45 -> 42
X/Twitter evidence unarchived       32 -> 30
```

Canonical source URLs, claims, source hierarchy, reliability, dates, linkages, and record counts must remain unchanged.

## Safety

This review changes no canonical data. The three approved mappings must be applied on a fresh branch in a separate canonical PR. The temporary review runner and workflow are removed from the final review branch.
