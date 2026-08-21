# Risky-host headroom review for AFX

Status: final cleanup staged; permanent gates still required  
Reviewed: 2026-08-21  
PR: #352  
AFX candidate: Issue #303

## Purpose

Issue #303 has a reviewed AFX first-party Medium incident source, but BIR's permanent `risky_host_unarchived` ceiling is already 16 unique source URLs. This review seeks one legitimate unit of headroom without changing the ceiling, archive acceptance rules, source tiers, or any canonical claim merely to make AFX fit.

## Permanent boundary

The existing archive acceptance boundary remains unchanged:

- exact source URL;
- capture date on or after source publication;
- HTTP 200 replay;
- HTML replay content;
- replay body at least 65,536 bytes;
- two independent passes;
- transport/query failures fail closed.

The permanent risky-host limit remains `<= 16` unique unarchived source URLs.

## Failed archive and source-replacement paths

### AFX Medium archive

PR #320 previously established that the July 31 AFX postmortem had no exact accepted capture and the July 25 preliminary report replayed at only 56,015 bytes, below the 65,536-byte floor.

### Holograph postmortem target

Holograph's July 2, 2024 postmortem announcement resolves through `https://t.co/uRGZmgX01Z` to:

`https://garnet-tilapia-acb.notion.site/Holograph-Incident-Post-Mortem-b5f1e14da7b2456aa3c3a1bde796daa4`

Run `32482550931`, job `96771878871`, reproduced the public Notion page-data response twice. Both passes returned HTTP 200 JSON of 123,126 bytes and contained the bounded Holograph/Halborn/former-contractor/privileged-access/one-billion/HLG root-cause markers.

A bounded canonical substitution was then exercised in run `32483025005`, job `96773342691`. All permanent gates passed, but `risky_host_unarchived` remained 16 because `notion.site` is itself an existing BIR risky host. Therefore the substitution did not create headroom and is not retained as the final solution.

### Holograph Notion Wayback replay

Run `32483429980`, job `96774575246`, found two exact captures and reproduced them in both passes with zero transport/query failures:

- `20240704174702`: HTTP 200 HTML, 16,245 bytes — rejected;
- `20241007050135`: HTTP 200 HTML, 8,097 bytes — rejected.

Both are below the unchanged 65,536-byte floor.

### Holograph incident X Wayback replay

Run `32483727265`, job `96775493954`, found five exact captures of:

`https://x.com/holographxyz/status/1801332482262110301`

Both independent passes reproduced all five with zero transport/query failures. Replay sizes ranged from 1,878 to 4,119 bytes. Every capture was rejected under the unchanged 65,536-byte floor.

## Final headroom resolution

The existing Rubic RBC/BRBC bridge-wallet event `bir_ev_000136` has two evidence records:

1. `bir_src_000280` — Rubic first-party weekly report, Tier 1, primary, archived, event-scoped;
2. `bir_src_000164` — QuillAudits Medium summary, Tier 2, non-primary, unarchived risky-host, event-scoped.

`bir_src_000280` independently supports the canonical event's administrative-wallet private-key compromise, former RBC/BRBC bridge scope, approximately 35 million RBC/BRBC quantity, and associated incident boundary. The canonical incident amount claims already cite Rubic's first-party evidence rather than `bir_src_000164`.

Therefore `bir_src_000164` is redundant corroboration for the canonical claim and may be removed without weakening primary or Tier 1 coverage. The bounded cleanup is:

- remove evidence `bir_src_000164` only;
- `bir_ev_000136.source_count`: 2 -> 1;
- `bir_inc_000030.source_count`: 5 -> 4;
- preserve `bir_src_000280` unchanged;
- restore Holograph `bir_src_000277` to its pre-review official-X record because the Notion substitution did not create headroom.

Expected post-cleanup corpus:

- 40 bridges;
- 43 incidents;
- 203 events;
- 334 evidence records;
- primary evidence unchanged at 237;
- Tier 1 evidence unchanged at 254;
- `risky_host_unarchived`: 16 -> 15;
- incident/event primary and Tier 1 deficit counts unchanged.

The exact values must be established by the permanent source-quality and source-count gates after the bounded cleanup is applied.

## AFX consequence

This review does not add AFX canonical data. If the permanent gates confirm `risky_host_unarchived = 15` and PR #352 is merged, the reviewed AFX canonical application may admit at most one unarchived first-party Medium URL and remain at the unchanged ceiling of 16.

No schema, enum, source-quality ceiling, archive threshold, performance budget, route, production verifier, scheduler, or deployment behavior is changed.
