# Current Status — Bridge Incident Registry

Status: active maintenance — Ledger Series Phase 2 complete  
Updated: 2026-08-18

## Canonical and production state

```text
Bridges     37
Incidents   39
Events      191
Evidence    303
```

Latest completed horizontal milestone is Ledger Series Phase 2 Stage 8 and its production closeout.

```text
Stage 8 canonical PR                 #294
Publication checkpoint               #295
Production retrigger PR              #296
Verified main revision               6fe188ea4979d38c32a3a9a4558537c87b733610
V1 Release Readiness main run        32041737878
Release-readiness job                95422149652
Production registry equality         success
Canonical HTML routes                82
Bridge dossiers verified             36
Incident dossiers verified           38
```

The successful production verifier observed canonical production content on attempt 1 at `36 / 38 / 190 / 299`, then passed aggregate registry and record-level dossier equality.

## Current quality boundary

```text
Primary evidence                         215 / 299
Tier 1 evidence                          232 / 299
Evidence with archived_url               130 / 299
Incidents without primary                  1 / 38
Incidents without Tier 1                   1 / 38
Events without primary                    11 / 190
Events without Tier 1                       6 / 190
Terminal unarchived unique URLs           15
Risky-host unarchived unique URLs         16
Unknown URL status                         0
Incident source-count mismatches           0
Event source-count mismatches              0
Full-corpus blocking errors                0
Full-corpus warning categories            {}
High-severity npm audit findings           0
```

The two Stage 8 lifecycle warnings are resolved. `bir_inc_000015` now has the reviewed discrete reimbursement-completed event; `bir_inc_000035` now has the reviewed discrete bridge-reopened event. No unrelated canonical expansion or schema change was included in that batch.

Known quality gaps that are not Stage 8 warnings remain governed by the source-quality no-regression baseline. They must not be filled by inference or by weakening evidence requirements.

## Ledger Series Phase 2 status

```text
Baseline audit / schedule sync        complete — PR #284
Per-record JSON                       complete — PRs #285–#286
Filter delta                          complete — PR #288
Compare                               complete — PR #290
Stats                                 complete — PR #292
Bounded Stage 8 follow-up             complete — PR #294
Production publication recovery       complete — PRs #295–#296
Production equality                   complete — main run 32041737878
Completion audit                      docs/audits/ledger-series-phase2-completion-2026-08-18.md
```

BIR Ledger Series Phase 2 is closed. Do not invent a Stage 9. The next named cross-series target in `docs/ai-era-registry-spec.md` is SOG; BIR itself remains in steady-state maintenance.

## Phase 5 monitoring and candidate collection

The established monitoring stack remains live and review-only. Persisted monitor-state baselines may be historical checkpoints and must never override current canonical JSON or the current production verifier.

Monitoring may create review candidates, evidence-health findings and bounded state updates. It must never auto-write canonical records or convert secondary discovery into canonical truth.

## Permanent release status

The permanent release gates remain:

```text
npm audit --audit-level=high
canonical + enum validation
full-corpus / exact source-count / source-quality audits
monitoring tests
build + machine-readable consistency
dist consistency
accessibility contract
built-output performance budget
Chromium / Firefox / WebKit compatibility
production registry equality after main merge
```

Current performance ceilings remain 16 KiB gzip max HTML, 5 KiB CSS total/max file, 4 KiB JS total, and 2 KiB max JS file. Astro remains `^7.2.0`. No technical closeout creates or implies a GitHub Release or semantic-version tag.

## Ongoing work

1. continue reviewed first-party-backed incident and evidence maintenance;
2. keep monitoring/candidate work review-only and fail-closed;
3. preserve canonical unknowns and recovery/reimbursement/restart/outcome distinctions;
4. preserve all source-quality, accessibility, performance, browser, machine-readable and production-equality guards;
5. use `docs/operations/current-position.md` and `docs/runbooks/recovery-checkpoint.md` as restart pointers; do not resume from historical Syscoin-era counts or run IDs.
