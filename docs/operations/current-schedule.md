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
  - next: justified event primary-evidence remediation, then validator strengthening
- Phase 4 — public contract stabilization: complete
- Phase 5 — monitoring and candidate collection: planned
- Release — v1 documentation, accessibility, performance, compatibility, and release checks: planned

## Current baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    284
```

## Current quality boundary

```text
Evidence with archived_url           127
Terminal unarchived unique URLs       15
Risky-host unarchived unique URLs     16
Events without primary                16
Events without Tier 1                  6
Unknown URL status                     0
Canonical production content match  true
```

## Latest production checkpoint

```text
Review PR             #202
Canonical data PR     #203
Canonical merge       46b6e19700d8553c75c4555549b9ca308cbc7292
Production audit PR   #204
Production run        31298305603 / 93206834594
Generated at          2026-08-09T06:10:37.053Z
Content match         true
HTML routes           72
Redirects             74
Build-input refresh   not required
```

## Immediate execution order

1. inventory the remaining 16 events without primary evidence;
2. remediate only gaps where a stronger first-party or primary source can be added without weakening source hierarchy;
3. record intentional secondary-only boundaries for gaps that remain justified;
4. strengthen validators;
5. implement review-gated monitoring and candidate collection;
6. complete v1 hardening and release closure;
7. revisit deferred archive failures only after conditions change or new canonical source URLs appear.

## Permanent boundary

- never write canonical records directly to `main`;
- do not treat monitoring signals as canonical incidents;
- do not accept wildcard, guessed, short, failed, temporally incompatible, or non-reproducible archive captures;
- do not invent another untouched archive batch after Batch 18; the established reviewer has exhausted its previously-unreviewed terminal/risky-host candidate set;
- the fresh Deferred Retry pool is exhausted through Retry 04; do not immediately recycle the same failures;
- deferred retries must use explicit reviewed-unresolved targets and the same acceptance rules;
- repository checks are the normal merge gate;
- production verification is required for explicit canonical publication and release gates;
- a build-input refresh may be used once when necessary, but it must not change canonical content or verification expectations;
- unchanged or stale content after the one refresh requires queue/deployment investigation, not stacked refresh commits;
- Cloudflare Pages preview deployment remains `none`; arbitrary temporary branches must not enqueue previews.
