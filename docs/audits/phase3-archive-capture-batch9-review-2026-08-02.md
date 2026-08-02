# Phase 3 archive capture Batch 9 review — 2026-08-02

Status: review complete  
Canonical changes: none in this PR

## Review result

```text
Selected unique URLs                    1
Verified Wayback URLs                   1
Affected evidence records               1
Current archived evidence              80
Expected archived evidence after PR    81
Terminal unique-URL queue              39
Risky-host unique-URL queue       37 -> 36
Terminal evidence-record queue         51
Risky-host evidence-record queue  56 -> 55
```

The review selected the only remaining unarchived first-party or official Medium, Mirror, or Substack URL after Archive Capture Batch 8. The known unavailable Qubit compensation-plan URL remained excluded.

The approved snapshot returned HTTP 200, `text/html`, and at least the first 65,536 replay bytes without an exclusion or missing-capture response.

## Approved mapping

### Poly Network mainnet-upgrade announcement

```text
bir_src_000203
https://web.archive.org/web/20230101195631/https://medium.com/poly-network/poly-network-mainnet-upgrade-goes-live-d708f4fa2cf1
```

## Review boundary

After applying this mapping, no unarchived first-party or official Medium, Mirror, or Substack candidate remains under the current selection policy, except the separately excluded Qubit compensation-plan URL whose snapshot has not been verified.

## Safety boundary

- only `archived_url` may be added in the canonical migration;
- the original source URL remains unchanged;
- title, publisher, date, claim, source tier, reliability, primary status, and linkages remain unchanged;
- source and record counts remain unchanged;
- the terminal queue does not change because this source belongs to an active bridge;
- the risky-host unique ceiling may only decrease from 37 to 36;
- the unavailable Qubit compensation-plan source remains unarchived;
- wildcard, guessed, and failed snapshots are prohibited.

## Next

Create a fresh canonical branch from latest `main`, apply this exact snapshot to `bir_src_000203`, tighten the risky-host archive ceiling, remove the bounded generator and write-enabled workflow, pass full normal CI, merge, and run explicit production-content verification.
