# Phase 3 Archive Deferred Retry 02 review — 2026-08-09

Status: complete review only  
Canonical data changed: no

## Execution

```text
Review run        31267768565
Review job        93128593589
Selected URLs              10
Approved URLs               1
Approved records            1
```

Deferred Retry 02 used ten reviewed-but-unarchived URLs that were not among the eight URLs immediately re-deferred in Retry 01. The scope combined non-X technical/official/reporting sources with three high-value first-party social sources.

The established archive reviewer ran two independent exact-CDX and replay passes. Approval required the same exact archive URL in both passes, HTTP 200 HTML, at least 65,536 bytes, and temporal compatibility with the latest grouped canonical publication date.

## Reproducible approved mapping

### QuillAudits — Decoding Rubic Exchange Exploit

```text
Evidence ID    bir_src_000166
Queue          risky
Canonical URL  https://quillaudits.medium.com/decoding-rubic-exchange-exploit-quillaudits-44828e71c417
Archive URL    https://web.archive.org/web/20221227131535/https://quillaudits.medium.com/decoding-rubic-exchange-exploit-quillaudits-44828e71c417
Run 1 bytes    155612
Run 2 bytes    155612
Captures       6 / 6 temporally eligible in each pass
```

The exact snapshot reproduced identically in both completed passes.

## Deferred again

The following nine selected URLs did not satisfy the unchanged reproducible exact-replay boundary:

- `bir_src_000116` — Holograph documentation: 33 exact captures in each pass, but none were temporally eligible for the canonical 2026-06-16 publication boundary.
- `bir_src_000087` — Rekt pNetwork analysis: no exact capture discovered in either pass.
- `bir_src_000004`, `bir_src_000008`, `bir_src_000012`, `bir_src_000016` — arXiv bridge-hacks review grouped under one canonical URL: seven temporally eligible captures in each pass, but no accepted replay.
- `bir_src_000198` — DarkNavy Syndicate Commons Bridge analysis: no exact capture discovered in either pass.
- `bir_src_000199` — The Block Syndicate Labs wind-down report: no exact capture discovered in either pass.
- `bir_src_000164` — QuillAudits November 2022 Medium article: no exact capture discovered in either pass.
- `bir_src_000099` — Aurora Labs CEO X status: no exact capture discovered in either pass.
- `bir_src_000174` — Unizen CTO Twitter update: one temporally eligible capture in each pass, but no accepted replay.
- `bir_src_000194` — Syndicate wind-down/reimbursement X thread: no exact capture discovered in either pass.

No acceptance rule was weakened to convert these records.

## Projected canonical effect

If and only if the approved mapping is applied in a separate canonical PR, the expected source-quality state is:

```text
Evidence with archived_url          126 -> 127
Terminal unarchived unique URLs      15 -> 15
Terminal unarchived records          25 -> 25
Risky-host unarchived unique URLs    17 -> 16
Risky-host unarchived records        31 -> 30
X/Twitter records unarchived         29 -> 29
```

The permanent validator remains authoritative. Any mismatch between these projections and the validator must fail the canonical application rather than weakening a ceiling.

## Safety boundary

This review changes no canonical data. A separate fresh branch may apply only `bir_src_000166` with the exact archive URL reproduced above. Source URLs, titles, claims, publication dates, source hierarchy, reliability, and record linkages must remain unchanged.
