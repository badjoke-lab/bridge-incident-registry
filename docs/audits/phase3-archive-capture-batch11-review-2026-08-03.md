# Phase 3 archive capture Batch 11 review — 2026-08-03

Status: verification in progress  
Canonical data changed: no

## Review boundary

This bounded review retries the eight official X/Twitter URLs deferred by Batch 10 and adds two Taiko official posts.

```text
Selected unique URLs  10
Current archived evidence  84 / 284
Current terminal unique-URL queue  37
Current risky-host unique-URL queue 34
```

Terminal bridge histories remain the priority. Multiple evidence records sharing one normalized source URL create one preservation obligation.

## Acceptance boundary

A mapping is approved only when:

- CDX returns a concrete timestamped capture;
- the standard Wayback replay URL returns HTTP 200;
- the replay content type includes `text/html`;
- at least 65,536 replay bytes are readable;
- the capture is tied to the exact source URL or its X/Twitter host alias.

Wildcard captures, host-only pages, exclusion pages, short replays, and guessed timestamps are not accepted.

## Selected candidates

```text
Multichain cessation of operations
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

## Next

Record the exact runner result, remove all temporary verification files, and merge only the review boundary. Canonical archive fields must be applied in a separate PR after review approval.
