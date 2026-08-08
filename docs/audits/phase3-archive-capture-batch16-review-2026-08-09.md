# Phase 3 Archive Capture Batch 16 review — 2026-08-09

Status: complete review only  
Canonical data changed: no

## Execution

```text
Review run      31263861856
Review job      93118742843
Branch          agent/phase3-archive-capture-batch16-review
Selected URLs   10
Approved URLs    6
Approved records 6
```

The review reused the established bounded archive-capture reviewer from immutable commit `7bd452ee8a86073355266cd0bbeec4bada8eb1b9` and ran two independent exact-CDX and replay passes.

Approval required all of the following in both passes:

- exact canonical source URL lookup, with only the established x.com/twitter.com same-status alias exception;
- snapshot date on or after the latest canonical `published_at` for the grouped URL;
- HTTP 200 HTML replay;
- at least 65,536 replay bytes;
- the same exact archive URL reproduced in both passes.

Wildcard, guessed, short, failed, temporally incompatible, or non-reproducible captures were not approved.

## Selection boundary

```text
Previously reviewed evidence IDs excluded  125
Eligible previously unreviewed unique URLs  29
Selected exact canonical source URLs        10
```

The selected scope consisted of five terminal-queue URLs and five risky-host URLs, oldest publication date first within each queue.

## Reproducible approved mappings

### State of Harmony Q1 2023

```text
Evidence ID    bir_src_000069
Queue          terminal
Canonical URL  https://blog.harmony.one/p/state-of-harmony-q1-2023
Archive URL    https://web.archive.org/web/20230518082336/https://blog.harmony.one/p/state-of-harmony-q1-2023
Run 1 bytes    234277
Run 2 bytes    234277
```

### Multichain Bridges Exploited for Nearly $130M Across Fantom, Moonriver and Dogechain

```text
Evidence ID    bir_src_000027
Queue          terminal
Canonical URL  https://www.coindesk.com/business/2023/07/06/multichain-bridges-experience-unannounced-outflows-of-over-130m-in-crypto
Archive URL    https://web.archive.org/web/20230706205706/https://www.coindesk.com/business/2023/07/06/multichain-bridges-experience-unannounced-outflows-of-over-130m-in-crypto/
Run 1 bytes    1209416
Run 2 bytes    1209416
```

### Multichain Protocol Experiences Mysterious Withdrawals, Suggesting Multi-Million Dollar Hack or Rug Pull

```text
Evidence ID    bir_src_000026
Queue          terminal
Canonical URL  https://www.chainalysis.com/blog/multichain-exploit-july-2023/
Archive URL    https://web.archive.org/web/20230929212553/https://www.chainalysis.com/blog/multichain-exploit-july-2023/
Run 1 bytes    358666
Run 2 bytes    358666
```

### How Was Rubic Protocol Hacked?

```text
Evidence ID    bir_src_000168
Queue          risky
Canonical URL  https://medium.com/neptune-mutual/how-was-rubic-protocol-hacked-a39f4e9d8e00
Archive URL    https://web.archive.org/web/20230102084959/https://medium.com/neptune-mutual/how-was-rubic-protocol-hacked-a39f4e9d8e00
Run 1 bytes    128959
Run 2 bytes    128959
```

### PeckShield Unizen approval-issue alert

```text
Evidence ID    bir_src_000173
Queue          risky
Canonical URL  https://x.com/peckshield/status/1766210445415727608
Archive URL    https://web.archive.org/web/20240318174013/https://twitter.com/peckshield/status/1766210445415727608
Run 1 bytes    199222
Run 2 bytes    199222
```

The accepted archive uses the established `twitter.com` alias for the exact same PeckShield account and status ID as the canonical `x.com` URL.

### SlowMist Monthly Security Report — March 2024

```text
Evidence ID    bir_src_000176
Queue          risky
Canonical URL  https://slowmist.medium.com/slowmist-monthly-security-report-web3-security-loss-at-approximately-139-million-665dd2c75dcc
Archive URL    https://web.archive.org/web/20240406014107/https://slowmist.medium.com/slowmist-monthly-security-report-web3-security-loss-at-approximately-139-million-665dd2c75dcc
Run 1 bytes    174002
Run 2 bytes    174002
```

## Deferred

The following selected URLs did not satisfy the reproducible exact-replay boundary and remain unmodified:

- `bir_src_000015` — Reuters Harmony report: no exact capture discovered in either pass.
- `bir_src_000144`, `bir_src_000145`, `bir_src_000146`, `bir_src_000147` — ShuttleFlow Conflux forum announcement: captures existed, but no replay passed the complete acceptance boundary in either pass.
- `bir_src_000081` — SOCKET incident-response X update: one temporally eligible capture existed, but no accepted replay in either pass.
- `bir_src_000174` — Unizen CTO Twitter update: one temporally eligible capture existed, but no accepted replay in either pass.

## Projected canonical effect

If and only if the six approved mappings are applied in a separate canonical PR, the expected source-quality state is:

```text
Evidence with archived_url          110 -> 116
Terminal unarchived unique URLs      28 -> 25
Terminal unarchived records          38 -> 35
Risky-host unarchived unique URLs    21 -> 18
Risky-host unarchived records        35 -> 32
X/Twitter records unarchived         30 -> 29
```

The permanent validator remains authoritative. Any mismatch between these projections and the validator must fail the canonical application rather than weakening a ceiling.

## Safety boundary

This review changes no canonical data. A separate fresh branch may apply only the six mappings reproduced identically in both passes. Source URLs, titles, claims, dates, source tier, reliability, bridge linkage, incident linkage, event linkage, and all other evidence fields must remain unchanged.
