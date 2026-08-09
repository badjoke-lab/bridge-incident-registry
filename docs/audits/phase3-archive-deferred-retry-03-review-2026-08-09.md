# Phase 3 Archive Deferred Retry 03 review — 2026-08-09

Status: complete review only  
Canonical data changed: no

## Inventory boundary

After Deferred Archive Retry 02 completed, a fresh inventory rebuilt the reviewed-but-unarchived pool from permanent Archive Capture review audits and current canonical evidence.

```text
Inventory run                           31298598605
Reviewed but still unarchived records           42
Reviewed but still unarchived unique URLs       29
Recent Retry 01/02 unique URLs                  17
Fresh not-recently-retried unique URLs          12
```

All 12 fresh URLs were X/Twitter sources. Retry 03 selected ten higher-value fresh URLs, prioritising first-party, official, terminal, incident-response, reimbursement, and restoration evidence. The two fresh URLs left for a later scope were the Holograph postmortem-announcement status and a secondary PeckShield Unizen transfer alert.

## Execution

```text
Review run        31298657490
Review job        93207769169
Selected URLs              10
Approved URLs               0
Approved records            0
```

The established archive reviewer ran two independent exact-CDX and replay passes. Approval still required the same exact archive URL in both passes, HTTP 200 HTML, at least 65,536 bytes, and temporal compatibility with the latest grouped canonical publication date.

## Deferred again

No selected URL satisfied the unchanged two-pass reproducible exact-replay boundary.

- Syndicate Commons Bridge compromise statement — `bir_src_000193`, `bir_src_000261`, `bir_src_000262`, `bir_src_000266`, `bir_src_000267`: no exact capture discovered in either pass.
- Everclear wind-down announcement — `bir_src_000187`, `bir_src_000284`: no exact capture discovered in either pass.
- Unizen reimbursement announcement — `bir_src_000172`, `bir_src_000281`: four captures, all temporally eligible, in both passes; no accepted replay.
- Taiko incident and containment statement — `bir_src_000182`, `bir_src_000256`, `bir_src_000257`, `bir_src_000273`: no exact capture discovered in either pass.
- Taiko bridge reopening and make-whole statement — `bir_src_000183`, `bir_src_000258`, `bir_src_000259`, `bir_src_000283`: no exact capture discovered in either pass.
- Wormhole exploit acknowledgement — `bir_src_000063`: three captures, all temporally eligible, in both passes; no accepted replay.
- Wormhole restoration statement — `bir_src_000064`, `bir_src_000202`: no accepted replay; second-pass CDX requests were rate-limited with HTTP 429.
- Aurora Labs CEO May Rainbow Bridge account — `bir_src_000096`: no accepted replay; second-pass CDX requests were rate-limited with HTTP 429.
- SOCKET incident-response update — `bir_src_000081`: first pass found three captures with one temporally eligible but no accepted replay; second-pass CDX requests were rate-limited with HTTP 429.
- Holograph exploit statement — `bir_src_000112`, `bir_src_000239`: first pass found six temporally eligible captures but no accepted replay; second-pass CDX requests were rate-limited with HTTP 429.

HTTP 429 results are treated as unavailable, not as approval evidence. No retry result was promoted from one-pass discovery, capture presence, or temporal eligibility alone.

## Canonical effect

None. The current source-quality state remains:

```text
Evidence with archived_url           127
Terminal unarchived unique URLs       15
Terminal unarchived records           25
Risky-host unarchived unique URLs     16
Risky-host unarchived records         30
X/Twitter records unarchived          29
```

No canonical application PR is justified for Retry 03.

## Next preservation boundary

Two fresh URLs were intentionally not included in Retry 03:

- `bir_src_000277` — Holograph incident postmortem announcement
- `bir_src_000282` — PeckShield Unizen Tornado transfer alert

A later explicit review scope may evaluate these remaining fresh URLs. Retry 03 failures must not be immediately recycled merely because some passes encountered CDX rate limiting.

## Safety boundary

This review changes no canonical data. Archive acceptance requirements remain unchanged. The temporary review workflow is removed before the review PR is opened.
