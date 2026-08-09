# BIR implementation schedule

Status: active  
Updated: 2026-08-09

This file no longer carries an independent historical schedule. The authoritative roadmap is `docs/runbooks/development-roadmap.md`; the restart point is `docs/runbooks/recovery-checkpoint.md`.

## Reporting rule

After every merged pull request, report:

1. the full schedule,
2. the current position,
3. what the merge changed,
4. the next action before continuing.

## Current schedule

- Phase 0 — specification and foundation: complete
- Phase 1 — canonical model, UI, validation, and seeds: complete
- Phase 2 — record expansion: complete through Batch 7
- Phase 3 — full-corpus quality strengthening: active
  - source-count remediation: complete
  - source-quality baseline and remediation: complete
  - event Tier 1 remediation: complete and production-verified
  - Archive Capture Batches 1–18: complete and production-verified
  - untouched archive-review queue: exhausted
  - Deferred Archive Retry 01: complete and production-verified
  - Deferred Archive Retry 02: complete and production-verified
  - Deferred Archive Retry 03: review complete, approved 0
  - Deferred Archive Retry 04: review complete, approved 0
  - fresh deferred retry pool: exhausted
  - Event Primary Remediation 01: complete and production-verified
  - Event Primary Remediation 02: complete and production-verified
  - next: validator strengthening and Phase 5 handoff
- Phase 4 — public contract stabilization: complete
- Phase 5 — monitoring and candidate collection: next
- Release — v1 documentation, accessibility, performance, compatibility, and release checks: planned

## Current baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    287
```

## Current quality boundary

```text
Primary evidence                       206 / 287
Tier 1 evidence                        223 / 287
Evidence with archived_url             130 / 287
Terminal unarchived unique URLs          15
Risky-host unarchived unique URLs        16
Events without primary                  11
Events without Tier 1                     6
Unknown URL status                        0
Canonical production content match      true
```

## Latest production checkpoint

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

## Immediate execution order

1. strengthen validators and controlled-failure fixtures where remaining assumptions can be made explicit;
2. implement Phase 5 review-gated monitoring and candidate collection without automatic canonical publication;
3. preserve the four deferred primary gaps as research backlog items until stronger first-party evidence appears;
4. maintain public-contract/UI compatibility checks;
5. complete v1 hardening and release closure;
6. revisit deferred archive failures only after conditions change or new canonical source URLs appear.

## Permanent boundary

- never write canonical records directly to `main`;
- do not treat monitoring signals as canonical incidents;
- do not accept wildcard, guessed, short, failed, temporally incompatible, or non-reproducible archive captures;
- do not invent another untouched archive batch after Batch 18;
- do not immediately recycle deferred archive failures after Retry 04;
- primary-evidence upgrades must be claim-relative and source-content justified;
- intentional secondary-only evidence gaps remain valid reviewed outcomes;
- monitoring may write review artifacts/candidates only, never canonical data automatically;
- repository checks are the normal merge gate;
- production verification is required for explicit canonical publication and release gates;
- Cloudflare Pages preview deployment remains `none`; arbitrary temporary branches must not enqueue previews.
