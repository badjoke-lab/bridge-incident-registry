# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative.

## Canonical baseline

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          ready to resume after PR #59
         Batch 1                                   complete
         First-ten quality hardening               complete
         Batch 2                                   complete
         Batch 3                                   complete
         Batch 4                                   complete
         Batch 5                                   complete
         Batch 6 scope                             complete
         Batch 6 implementation                    next
         Batch 7                                   planned
Emergency public consistency                       complete when PR #59 merges
Phase 3  Full-corpus quality strengthening         planned
Phase 4  Public contract stabilization             complete when PR #59 merges
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
PR 7  Production verification                complete when PR #59 merges
```

Production verification passed on GitHub Actions run `30290442852`. See `docs/audits/production-verification-2026-07-28.md`.

## Phase 2 resume — next

After PR #59 merges:

1. verify latest `main` and open PRs
2. compare the parked `phase2-batch6-records` branch with current `main`; recreate it if its history is stale or unclear
3. re-read `docs/batches/phase-2-batch-6-scope.md`
4. inspect canonical files before assigning IDs or counts
5. implement the bounded Batch 6 scope for Transit Swap, Rubic, Unizen, and Magpie Protocol
6. keep routing/aggregation incidents distinct from underlying bridge-reserve incidents
7. run canonical validation, first-ten audit, build, post-build consistency, and controlled failure checks
8. verify production after merge when public records or routes change

## Candidate queue after Batch 6

Non-canonical candidate research currently includes:

- Taiko bridge exploit and recovery
- Everclear / Connext lifecycle and shutdown
- Syndicate Commons Bridge exploit, reimbursement, and operator-lifecycle context

These candidates require dedicated scope review and current-source verification before canonical promotion.

## Remaining roadmap

1. Phase 2 Batch 7
2. full-corpus audit
3. primary-source strengthening
4. aftermath normalization
5. URL and archive hardening
6. validator strengthening
7. public-contract compatibility review
8. monitoring with no automatic publication
9. v1 documentation, accessibility, performance, and release checks

## Permanent rules

1. Never write canonical changes directly to main.
2. Use one branch and bounded PR per task.
3. Read canonical JSON before assigning IDs or counts.
4. Keep canonical and working data separate.
5. Do not merge temporary diagnostics.
6. Preserve distinctions among loss, return, recovery, reimbursement, freezing, minting, and burning.
7. A disclosure is not automatically an exploit.
8. A relaunch announcement is not proof of operation.
9. Historical SHAs are not live branch pointers.
10. Every PR must pass checks appropriate to its stage.
