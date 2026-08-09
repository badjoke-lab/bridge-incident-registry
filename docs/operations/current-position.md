# Current position

Status: active  
Updated: 2026-08-09

This file is a compact compatibility pointer. The authoritative live state is maintained in:

- `docs/runbooks/recovery-checkpoint.md`
- `docs/runbooks/current-status.md`
- `docs/runbooks/development-roadmap.md`
- current `main`, canonical JSON, open pull requests, and GitHub Actions

## Canonical and production baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    287
```

## Current phase

- Phase 3 — full-corpus quality strengthening: active
- Phase 4 — public contract stabilization: complete
- Phase 5 — monitoring and candidate collection: next
- v1 hardening: planned

Archive Capture Batches 1 through 18 are complete and production-verified. Deferred Archive Retries 01–02 are production-verified; Retries 03–04 are complete review-only audits with no additional canonical archive mappings. The not-recently-retried fresh deferred pool is exhausted.

Event Primary Remediation 01 and 02 are both complete and production-verified. Remediation 02 added three event-scoped copies of already-canonical first-party Poly Network and Transit Finance evidence, raising evidence to 287 and reducing events without primary evidence from 14 to 11 without increasing the unique archive-risk queues.

Current quality boundary:

```text
Primary evidence                       206 / 287
Tier 1 evidence                        223 / 287
Evidence with archived_url             130 / 287
Events without primary                  11 / 183
Events without Tier 1                     6 / 183
Terminal unarchived unique URLs          15
Risky-host unarchived unique URLs        16
Unknown URL status                        0
Source-count mismatches                   0
Canonical production content match      true
```

## Latest completed production checkpoint

```text
Review PR             #211
Canonical data PR     #213
Canonical merge       f2874a2d0ffe6877eadf6619cd6100a9b9b3991b
Production audit PR   #214
Production run        31300484236 / 93212360938
Generated at          2026-08-09T07:08:45.362Z
Content match         true
HTML routes           72
Redirects             74
Publication attempt   3 / 20
Build-input refresh   not required
```

Attempts 1–2 correctly rejected the prior 284-evidence production build. Attempt 3 observed Evidence 287 and passed complete field-level canonical equality.

Four non-intentional reviewed event-primary gaps remain deferred pending stronger first-party evidence: `bir_ev_000014`, `bir_ev_000143`, `bir_ev_000144`, and `bir_ev_000148`. Six Tier 1 gaps remain intentional secondary-only records, and `bir_ev_000150` remains intentionally non-primary because its PeckShield evidence is a direct security-monitoring observation rather than an operator statement. Do not weaken source hierarchy to reduce the metric further.

The Boltz 2026 swap shutdown remains a monitoring signal in Issue #171. It is not canonical because the available first-party material does not identify one reviewable bridge incident boundary.

## Next bounded work

1. strengthen remaining validators where corpus-shape assumptions or coverage guards can still be made more explicit;
2. begin Phase 5 review-gated monitoring and candidate collection with no automatic canonical publication;
3. keep the four deferred primary gaps on a research backlog and revisit only when stronger first-party material appears;
4. continue v1 documentation, accessibility, performance, compatibility, and release hardening;
5. revisit deferred archive failures only after conditions change or new canonical source URLs enter the corpus.
