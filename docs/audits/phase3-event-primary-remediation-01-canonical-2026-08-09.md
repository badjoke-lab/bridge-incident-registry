# Phase 3 Event Primary Remediation 01 — Canonical Application

Date: 2026-08-09
Applicator run: 31299344868
Review PR: #207
Review audit: `docs/audits/phase3-event-primary-review-01-2026-08-09.md`

## Canonical changes

- corrected `bir_src_000003` from the unrelated Treasury `jy0716` URL to the April 14, 2022 OFAC North Korea Designation Update;
- synchronized `bir_src_000003` title and publisher to the corrected OFAC source;
- reclassified `bir_src_000003` as claim-relative primary evidence for `bir_ev_000002`;
- reclassified `bir_src_000014` as claim-relative primary evidence for `bir_ev_000011`;
- tightened `events_without_primary` from 16 to 14.

No event wording, dates, amounts, statuses, source counts, evidence count, Tier 1 classification, or intentional secondary boundaries changed.

## Expected state

```text
Evidence records                   284
Events without primary evidence     14
Events without Tier 1 evidence       6
```

## Safety boundary

The one-shot applicator removes itself before commit. Permanent scope is exactly canonical evidence, the tightened source-quality ceiling, and this audit.
