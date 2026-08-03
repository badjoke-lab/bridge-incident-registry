# Phase 3 archive capture Batch 11 review — 2026-08-03

Status: complete  
Canonical data changed: no

## Review boundary

This bounded review retried the eight official X/Twitter URLs deferred by Batch 10 and added two Taiko official posts.

```text
Selected unique URLs                   10
Verified Wayback URLs                   1
Affected evidence records               1
Expected archived evidence        84 -> 85
Terminal unique-URL queue         37 -> 36
Risky-host unique-URL queue       34 -> 33
Terminal evidence-record queue    48 -> 47
Risky-host evidence-record queue  52 -> 51
X/Twitter evidence records        39 -> 38
```

Archive-risk metrics count normalized unique source URLs. Multiple evidence records sharing one source URL create one preservation obligation.

## Acceptance boundary

A mapping was approved only when:

- CDX returned a concrete timestamped capture;
- the standard Wayback replay URL returned HTTP 200;
- the replay content type included `text/html`;
- at least 65,536 replay bytes were readable;
- the capture was tied to the exact source URL or its X/Twitter host alias.

Wildcard captures, host-only pages, exclusion pages, short replays, and guessed timestamps were rejected.

## Approved mapping

### Multichain cessation of operations

Source:

```text
https://twitter.com/MultichainOrg/status/1679768407628185600
```

Verified archive:

```text
https://web.archive.org/web/20250725204239/https://x.com/MultichainOrg/status/1679768407628185600
```

Replay result:

```text
HTTP status   200
Content-Type  text/html; charset=utf-8
Replay bytes  68,624
```

Affected evidence:

```text
bir_src_000029
```

The selected capture belongs to the same status ID under the X/Twitter host alias. The newer discovered Twitter replay at timestamp `20250917233517` returned only 6,966 bytes and was rejected.

## Deferred candidates

The following selected URLs did not pass the exact replay boundary and remain unarchived:

```text
Everclear wind-down announcement
Syndicate Commons Bridge compromise statement
Syndicate Labs wind-down and reimbursement thread
Holograph Operator exploit statement
Holograph incident postmortem announcement
Wormhole exploit acknowledgement
Wormhole restoration of funds and service
Taiko incident and containment statement
Taiko bridge reopening and make-whole statement
```

```text
Everclear CDX captures                 0
Syndicate compromise CDX captures     0
Syndicate wind-down CDX captures      0
Holograph exploit CDX captures        6
Holograph postmortem CDX captures     2
Wormhole exploit CDX captures         1
Wormhole restoration CDX captures     0
Taiko incident CDX captures           0
Taiko reopening CDX captures          0
```

The Holograph and Wormhole captures did not yield a complete replay under this bounded retry. The 2026 Everclear, Syndicate, and Taiko posts had no concrete CDX capture. None receives a wildcard, exclusion page, host-only capture, short replay, or guessed snapshot.

## Verification evidence

```text
Review workflow run  30782953188
Review workflow job  91591043806
Normal CI run        30782953165
Runner generated_at  2026-08-03T03:59:00.907Z
```

## Safety

- canonical JSON is unchanged in this review;
- only one concrete timestamped Wayback capture was accepted;
- source URLs, claims, dates, tiers, reliability, primary status, and linkages remain unchanged;
- the approved URL belongs to the terminal Multichain entity, so terminal and risky-host ceilings each decrease by one unique URL when applied;
- one evidence record is affected;
- temporary verification scripts and workflow are removed before merge.

## Next

Apply the one exact archive mapping to `bir_src_000029` on a fresh branch, tighten the terminal unique-URL ceiling from 37 to 36 and the risky-host unique-URL ceiling from 34 to 33, pass full normal CI, merge, and explicitly verify complete production-content equality.
