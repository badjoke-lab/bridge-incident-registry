# Phase 3 Event Primary Remediation 02 — Canonical Application

Date: 2026-08-09
Review PR: #211
Review audit: `docs/audits/phase3-event-primary-review-02-2026-08-09.md`

## Canonical changes

- added `bir_src_000285`, an event-scoped primary/Tier 1 copy of already-canonical Poly Network source `bir_src_000270`, linked to `bir_ev_000013`;
- added `bir_src_000286`, an event-scoped primary/Tier 1 copy of already-canonical Transit Finance source `bir_src_000279`, linked to `bir_ev_000124`;
- added `bir_src_000287`, a separate event-scoped copy of the same Transit Finance source linked to `bir_ev_000125`;
- synchronized source counts for `bir_inc_000005`, `bir_inc_000028`, `bir_ev_000013`, `bir_ev_000124`, and `bir_ev_000125`;
- tightened `events_without_primary` from 14 to 11;
- synchronized the five permanent document-count contract files to canonical Evidence 287.

The three new records reuse exact source URLs and archived snapshots that were already canonical and reviewed. No unique risky-host or terminal unarchived URL is introduced. PR #212 already strengthened the event Tier 1 controlled-failure fixture on main before this fresh application.

## Expected state

```text
Bridges                            33
Incidents                          34
Events                            183
Evidence                          287
Primary evidence                  206
Tier 1 evidence                   223
Evidence with archived_url        130
Events without primary             11
Events without Tier 1               6
Terminal unarchived unique URLs     15
Risky-host unarchived unique URLs   16
Unknown URL status                   0
```

## Safety boundary

No event wording, dates, amounts, lifecycle status, recovery state, reimbursement state, or existing evidence classification is changed. No secondary/security-firm source is upgraded to primary. The document changes are required by the existing post-build consistency contract and distinguish the new canonical state from the prior completed production checkpoint. The one-shot applicator removes itself before commit.
