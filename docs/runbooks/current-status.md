# Current Status — Bridge Incident Registry

Status: active maintenance — Ledger Series Phase 2 complete  
Updated: 2026-08-20

## Canonical and production state

```text
Bridges     39
Incidents   41
Events      194
Evidence    316
```

Ledger Series Phase 2 remains closed. Later reviewed maintenance added WanBridge, ChainConnect, and the Verus-Ethereum Bridge without reopening Phase 2.

```text
Canonical data PR                   #330
Canonical merge                     4ca9065af8072db00408efb5663c797f80972945
Production verification audit PR    pending
Production Verification run         pending
Production Verification job         pending
Publication attempt                 pending
Generated at                        pending
Production equality                 pending
Canonical HTML routes               88 expected from canonical build
Legacy redirects                    80
Bridge dossiers verified            pending production verification
Incident dossiers verified          pending production verification
```

The previous successful production checkpoint remains ChainConnect at 38 bridges / 40 incidents / 193 events / 311 evidence. The Verus-Ethereum Bridge canonical application is merged, but production equality must not be claimed until the unchanged production verifier observes the 39 / 41 / 194 / 316 public baseline.

## Current quality boundary

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Primary evidence                     224 / 316
Tier 1 evidence                      241 / 316
Evidence with archived_url           130 / 316
Incidents without primary              1 / 41
Incidents without Tier 1               1 / 41
Events without primary                11 / 194
Events without Tier 1                  6 / 194
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

1. complete the Verus post-merge publication/equality checkpoint without relaxing the verifier or mutating canonical data;
2. continue reviewed first-party-backed incident and evidence maintenance;
3. current evidence-gated targets are #303 AFX, #279 XRPL-TX, #299 Nerve, #171 Boltz, and #270 Oraichain under their latest review audits/comments;
4. separately review the May 2026 Verus exploit if its evidence package meets BIR scope; do not collapse it into the July incident;
5. keep monitoring/candidate work review-only and fail-closed;
6. preserve canonical unknowns and recovery/reimbursement/restart/outcome distinctions;
7. preserve all source-quality, accessibility, performance, browser, machine-readable and production-equality guards;
8. use `docs/operations/current-position.md` and `docs/runbooks/recovery-checkpoint.md` as restart pointers; do not resume from historical Stage 8 or earlier counts/run IDs.
