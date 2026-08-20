# Current Status — Bridge Incident Registry

Status: active maintenance — Ledger Series Phase 2 complete  
Updated: 2026-08-20

## Canonical and production state

```text
Bridges     39
Incidents   42
Events      199
Evidence    325
```

Ledger Series Phase 2 remains closed. Later reviewed maintenance added WanBridge, ChainConnect and separate May and July 2026 Verus-Ethereum Bridge incidents without reopening Phase 2.

```text
Canonical data PR                   #330
Canonical merge                     4ca9065af8072db00408efb5663c797f80972945
Read-only production verifier PR    #332 — closed without merge
Verification run                    32334410535
Verification job                    96321019010
Publication attempt                 1
Generated at                        2026-08-20T05:06:43.792Z
Production equality                 success
Canonical HTML routes               88
Legacy redirects                    80
Bridge dossiers verified            39 / 39
Incident dossiers verified          41 / 41
Series records verified             80 / 80
Series JSON files verified          82 / 82
Unique Series global keys           80 / 80
```

The successful verifier observed exact canonical-derived native content on attempt 1 and passed every bridge/incident dossier. The same exact-main run independently proved the Ledger Series adapter in production with semantic equality across all 82 Series JSON files, excluding only environment-specific `generated_at`.

## Current quality boundary

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Primary evidence                     229 / 325
Tier 1 evidence                      246 / 325
Evidence with archived_url           130 / 325
Incidents without primary              1 / 42
Incidents without Tier 1               1 / 42
Events without primary                11 / 199
Events without Tier 1                  6 / 199
Terminal unarchived unique URLs       15
Risky-host unarchived unique URLs     16
Unknown URL status                     0
Full-corpus blocking errors            0
Full-corpus warning categories        {}
High-severity npm audit findings       0
```

## Ledger Series status

```text
Phase 2 baseline audit / schedule sync   complete — PR #284
Phase 2 per-record JSON                  complete — PRs #285–#286
Phase 2 filter delta                     complete — PR #288
Phase 2 Compare                          complete — PR #290
Phase 2 Stats                            complete — PR #292
Phase 2 bounded Stage 8 follow-up        complete — PR #294
Phase 2 completion audit                 docs/audits/ledger-series-phase2-completion-2026-08-18.md
Phase 9 BIR adapter                      complete — PR #327
Phase 9 production proof                 complete — PR #332 / run 32334410535
```

Do not invent a BIR/Ledger Series Stage 9. The implemented Phase 9 adapter is a separate cross-series machine-readable contract. The next named cross-series target in `docs/ai-era-registry-spec.md` is SOG; BIR itself remains in steady-state maintenance.

## Phase 5 monitoring and candidate collection

The established monitoring stack remains live and review-only. Persisted monitor-state baselines may be historical checkpoints and must never override current canonical JSON or current native/Series production verification.

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
Ledger Series adapter consistency
accessibility contract
built-output performance budget
Chromium / Firefox / WebKit compatibility
production registry equality after main merge
```

Current performance ceilings remain 16 KiB gzip max HTML, 5 KiB CSS total/max file, 4 KiB JS total, and 2 KiB max JS file. Astro remains `^7.2.0`. No technical closeout creates or implies a GitHub Release or semantic-version tag.

## Ongoing work

1. continue reviewed first-party-backed incident and evidence maintenance;
2. current evidence-gated targets are #303 AFX, #279 XRPL-TX, #299 Nerve, #171 Boltz, and #270 Oraichain under their latest review audits/comments;
3. keep the May and July Verus incidents separate; May recovery/restitution/reopen evidence must not be copied into the July case;
4. keep monitoring/candidate work review-only and fail-closed;
5. preserve canonical unknowns and recovery/reimbursement/restart/outcome distinctions;
6. preserve all source-quality, accessibility, performance, browser, native/Series machine-readable and production-equality guards;
7. use `docs/operations/current-position.md` and `docs/runbooks/recovery-checkpoint.md` as restart pointers; do not resume from historical ChainConnect, Stage 8 or earlier counts/run IDs.
