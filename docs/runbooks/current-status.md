# Current Status — Bridge Incident Registry

Status: active maintenance — Ledger Series Phase 2 complete  
Updated: 2026-08-20

## Canonical and production state

```text
Bridges     38
Incidents   40
Events      193
Evidence    311
```

Ledger Series Phase 2 remains closed. Later reviewed maintenance added WanBridge and ChainConnect without reopening Phase 2.

```text
Canonical data PR                   #314
Canonical merge                     aa11872fe237c295dae5d5a0a41d283fcde21aab
Production verification audit PR    #318
Production Verification run         32167991271
Production Verification job         95812037176
Publication attempt                 1
Generated at                        2026-08-18T17:51:37.950Z
Production equality                 success
Canonical HTML routes               86
Legacy redirects                    80
Bridge dossiers verified            38 / 38
Incident dossiers verified          40 / 40
```

The successful production verifier observed exact canonical-derived content on attempt 1 and passed aggregate registry, all 38 bridge dossiers, all 40 incident dossiers, 86 canonical HTML routes, and 80 redirects. Both legacy Wanchain URL forms correctly redirect to `/bridge/wanbridge/`.

## Current quality boundary

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Primary evidence                     222 / 311
Tier 1 evidence                      239 / 311
Evidence with archived_url           130 / 311
Incidents without primary              1 / 40
Incidents without Tier 1               1 / 40
Events without primary                11 / 193
Events without Tier 1                  6 / 193
Terminal unarchived unique URLs       15
Risky-host unarchived unique URLs     16
Unknown URL status                     0
Full-corpus blocking errors            0
Full-corpus warning categories        {}
High-severity npm audit findings       0
```

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
2. current evidence-gated targets are #303 AFX, #279 XRPL-TX, #299 Nerve, #171 Boltz, and #270 Oraichain under their latest review audits/comments;
3. keep monitoring/candidate work review-only and fail-closed;
4. preserve canonical unknowns and recovery/reimbursement/restart/outcome distinctions;
5. preserve all source-quality, accessibility, performance, browser, machine-readable and production-equality guards;
6. use `docs/operations/current-position.md` and `docs/runbooks/recovery-checkpoint.md` as restart pointers; do not resume from historical Stage 8 or earlier counts/run IDs.
