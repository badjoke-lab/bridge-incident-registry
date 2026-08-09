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
- Phase 3 — full-corpus quality strengthening: active maintenance
  - source-count remediation: complete
  - source-quality baseline and remediation: complete
  - event Tier 1 remediation: complete and production-verified
  - Archive Capture Batches 1–18: complete and production-verified
  - Deferred Archive Retries 01–02: complete and production-verified
  - Deferred Archive Retries 03–04: review complete, approved 0
  - fresh deferred retry pool: exhausted
  - Event Primary Remediation 01: complete and production-verified
  - Event Primary Remediation 02: complete and production-verified
  - cross-record bridge integrity: blocking
- Phase 4 — public contract stabilization: complete
- Phase 5 — monitoring and candidate collection: active
  - review-gated monitoring foundation: complete
  - initial signal/dedupe live proof: complete
  - pending review-branch fallback and duplicate guard: complete
  - bounded evidence health watch: complete and live-smoked
  - external bridge/protocol candidate discovery: next
  - closure/pause/hack/regulatory news watch: planned
  - active bridge/domain watch: planned
  - site/SEO watch: planned
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

## Phase 5 live checkpoint

```text
Foundation PR                  #217
Initial monitoring state PR    #223
Fallback/dedupe PR             #225
Evidence health PR             #226
Evidence live run              31301765004 / 93215576787
Live evidence                  287
Selected                        12
Two-pass probes                 24
Hard 404/410 findings            0
Canonical diff                  none
Job result                      success
```

Issue #171 was emitted once and then successfully suppressed on an unchanged rerun. Evidence health is now active with two-pass hard-failure criteria and review-only output.

## Immediate execution order

1. implement external bridge/protocol candidate discovery as a review-only Phase 5 adapter;
2. add closure/pause/hack/regulatory news monitoring once candidate discovery is stable;
3. add active bridge/domain and public-site checks incrementally;
4. maintain validator/source-quality/public-contract gates;
5. complete v1 hardening and release closure;
6. revisit deferred evidence/archive gaps only on new source material or changed conditions.

## Permanent boundary

- never write canonical records directly to `main`;
- do not treat monitoring signals as canonical incidents;
- monitoring may write review artifacts/candidates only, never canonical data automatically;
- unchanged monitoring signals must be deduped;
- repeated hard evidence-link failure may create a review finding but never a canonical mutation;
- access blocking, rate limiting, timeout, transient server failure, or mixed probes are not dead-link proof;
- do not create duplicate scheduled monitoring work while an open monitoring PR or unmerged monitoring review branch exists;
- repository checks are the normal merge gate;
- production verification is required for explicit canonical publication and release gates;
- Cloudflare Pages preview deployment remains `none`; arbitrary temporary branches must not enqueue previews.
