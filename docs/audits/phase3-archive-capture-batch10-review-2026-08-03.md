# Phase 3 archive capture Batch 10 review — 2026-08-03

Status: complete  
Canonical data changed: no

## Review boundary

This bounded review selected ten unique unarchived official X/Twitter source URLs. Terminal bridge histories were prioritized, followed by inactive and active bridge incident sources.

```text
Selected unique URLs                   10
Verified Wayback URLs                   2
Affected evidence records               3
Expected archived evidence        81 -> 84
Terminal unique-URL queue         39 -> 37
Risky-host unique-URL queue       36 -> 34
Terminal evidence-record queue    51 -> 48
Risky-host evidence-record queue  55 -> 52
```

Archive-risk metrics count normalized unique source URLs. Multiple evidence records sharing one source URL create one preservation obligation.

## Approved mappings

### Multichain abnormal MPC asset movement

Source:

```text
https://twitter.com/MultichainOrg/status/1677096839731097600
```

Verified archive:

```text
https://web.archive.org/web/20230706234540/https://twitter.com/MultichainOrg/status/1677096839731097600
```

Replay result:

```text
HTTP status   200
Content-Type  text/html; charset=utf-8
Replay bytes  65,536
```

Affected evidence:

```text
bir_src_000025
```

### Multichain service stopped indefinitely

Source:

```text
https://twitter.com/MultichainOrg/status/1677180114227056641
```

Verified archive:

```text
https://web.archive.org/web/20230707164230/https://twitter.com/MultichainOrg/status/1677180114227056641
```

Replay result:

```text
HTTP status   200
Content-Type  text/html; charset=utf-8
Replay bytes  65,536
```

Affected evidence:

```text
bir_src_000028
bir_src_000216
```

## Deferred candidates

The following selected URLs did not pass the exact replay boundary and remain unarchived:

```text
Multichain cessation of operations
Everclear wind-down announcement
Syndicate Commons Bridge compromise statement
Syndicate Labs wind-down and reimbursement thread
Holograph exploit statement
Holograph postmortem announcement
Wormhole exploit acknowledgement
Wormhole restoration of funds and service
```

The Holograph exploit captures returned HTTP 200 HTML but only 5,145–6,618 replay bytes. The discovered Wormhole exploit capture returned HTTP 200 HTML but only 5,126 replay bytes. Other deferred candidates did not produce a replayable concrete capture within the bounded review. None receives a wildcard, exclusion page, host-only capture, short replay, or guessed snapshot.

## Safety

- canonical JSON is unchanged in this review;
- only concrete timestamped Wayback captures were accepted;
- every accepted replay returned HTTP 200 HTML and at least 65,536 bytes;
- source URLs, claims, dates, tiers, reliability, primary status, and linkages remain unchanged;
- both approved URLs belong to the terminal Multichain entity, so terminal and risky-host ceilings each decrease by two unique URLs;
- three evidence records share the two approved preservation obligations;
- temporary verification scripts and workflow are removed before merge.

## Next

Apply the two exact archive mappings to three canonical evidence records on a fresh branch, tighten the terminal unique-URL ceiling from 39 to 37 and the risky-host unique-URL ceiling from 36 to 34, pass full normal CI, merge, and explicitly verify complete production-content equality.
