# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative.

## Canonical baseline

```text
Bridges     28
Incidents   29
Events      134
Evidence    160
```

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          active
         Batch 1                                   complete
         First-ten quality hardening               complete
         Batch 2                                   complete
         Batch 3                                   complete
         Batch 4                                   complete
         Batch 5                                   complete
         Batch 6 scope                             complete
         Batch 6 source resolution                 complete
         Batch 6A Transit + Magpie                  implemented on review branch
         Batch 6B Rubic + Unizen                    source-gated
         Batch 7                                   planned
Emergency public consistency                       complete — PR #59
Phase 3  Full-corpus quality strengthening         planned
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Completed emergency sequence

```text
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete — PR #52
PR 4  Canonical metadata and discovery       complete — PR #53
PR 5  Legacy redirects                       complete — PR #54
PR 6  Post-build consistency CI              complete — PR #58
PR 7  Production verification                complete — PR #59
```

Production verification passed on GitHub Actions run `30290442852`. See `docs/audits/production-verification-2026-07-28.md`.

## Phase 2 Batch 6A

Implemented records:

- Transit Swap
- Magpie Protocol / Fly

Implemented additions:

```text
Bridge entities   2
Incident cases    2
Timeline events   11
Evidence records  12
```

Required completion steps:

1. open the cleaned canonical-data PR
2. run canonical validation, enum migration checks, first-ten audit, build, post-build consistency, and controlled-failure tests
3. review all amount, return, reimbursement, dependency, and brand-history boundaries
4. merge after required checks pass
5. verify production HTML, JSON, routes, sitemap, metadata, and redirects against the new canonical totals

Implementation record: `docs/batches/phase2-batch-06a-implementation.md`.

## Phase 2 Batch 6B

Remaining candidates:

- Rubic
- Unizen

Before canonical promotion:

1. obtain stable primary or archived Rubic incident notices for both distinct cases
2. reconcile Rubic operator-wallet, user-loss, recovery, and reimbursement scopes
3. obtain stronger first-party Unizen incident and reimbursement records
4. keep Unizen's trade aggregator incident distinct from UIP providers
5. prepare a dedicated reviewed data PR rather than extending Batch 6A

Source-resolution record: `docs/batches/phase2-batch-06-source-resolution-2026-07-28.md`.

## Candidate queue after Batch 6

Non-canonical candidate research currently includes:

- Taiko bridge exploit and recovery
- Everclear / Connext lifecycle and shutdown
- Syndicate Commons Bridge exploit, reimbursement, and operator-lifecycle context

These candidates require dedicated scope review and current-source verification before canonical promotion.

## Remaining roadmap

1. Phase 2 Batch 6B
2. Phase 2 Batch 7
3. full-corpus audit
4. primary-source strengthening
5. aftermath normalization
6. URL and archive hardening
7. validator strengthening
8. public-contract compatibility review
9. monitoring with no automatic publication
10. v1 documentation, accessibility, performance, and release checks

## Permanent rules

1. Never write canonical changes directly to main.
2. Use one branch and bounded PR per task.
3. Read canonical JSON before assigning IDs or counts.
4. Keep canonical and working data separate.
5. Do not merge temporary diagnostics or write-enabled workflows.
6. Preserve distinctions among loss, return, recovery, reimbursement, freezing, minting, and burning.
7. A disclosure is not automatically an exploit.
8. A relaunch announcement is not proof of reimbursement completion.
9. Historical SHAs are not live branch pointers.
10. Every PR must pass checks appropriate to its stage.
