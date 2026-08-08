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
  - next: deferred archive retry, justified primary-evidence remediation, then validator strengthening
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
Evidence with archived_url           124
Terminal unarchived unique URLs       17
Risky-host unarchived unique URLs     18
Events without primary                16
Events without Tier 1                  6
Unknown URL status                     0
Canonical production content match  true
```

## Latest production checkpoint

```text
Review PR              #194
Canonical data PR      #195
Canonical merge        50ca3782c4940e095ff94de2cce220a3ee0c7da5
Build-input refresh PR #197
Build-input refresh    59b74d26a86373e6e97e6e630b54becd35f64910
Production audit PR    #198
Initial production     31266002708 / 93124105488
Successful production  31266360510 / 93125031659
Generated at           2026-08-08T16:07:52.937Z
Publication attempt    1 after refresh
```

## Immediate execution order

1. build a bounded deferred archive-retry inventory from already-reviewed unresolved candidates;
2. retry justified deferred sources under the unchanged exact replay, temporal-fit, minimum-size, and two-run reproducibility boundary;
3. remediate event primary-evidence gaps where source hierarchy can be improved safely;
4. strengthen validators;
5. implement review-gated monitoring and candidate collection;
6. complete v1 hardening and release closure.

## Permanent boundary

- never write canonical records directly to `main`;
- do not treat monitoring signals as canonical incidents;
- do not accept wildcard, guessed, short, failed, temporally incompatible, or non-reproducible archive captures;
- do not invent another untouched archive batch after Batch 18; the established reviewer has exhausted its previously-unreviewed terminal/risky-host candidate set;
- repository checks are the normal merge gate;
- production verification is required for explicit canonical publication and release gates;
- a build-input refresh may be used once when necessary, but it must not change canonical content or verification expectations;
- unchanged or stale content after the one refresh requires queue/deployment investigation, not stacked refresh commits;
- Cloudflare Pages preview deployment remains `none`; arbitrary temporary branches must not enqueue previews.
