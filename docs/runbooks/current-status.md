# Current Status — Bridge Incident Registry

Status: active maintenance — Ledger Series Phase 2 complete  
Updated: 2026-08-20

## Canonical and production state

```text
Bridges     40
Incidents   43
Events      203
Evidence    334
```

Ledger Series Phase 2 remains closed. Later reviewed maintenance added WanBridge, ChainConnect and separate May and July 2026 Verus-Ethereum Bridge incidents without reopening Phase 2.

```text
Canonical data PR                   #338
Canonical merge                     66b3b1b613e0e757d45313af59b02f1bebfa398c
Release-baseline sync PR            #339
Production-proven main              b72aa190f07a11f45baa2cfcf57ae9295343b374
Read-only production verifier PR    #340 — closed without merge
Verification run                    32337814734
Verification job                    96330647951
Publication attempt                 1
Generated at                        2026-08-20T06:00:17.226Z
Production equality                 success
Canonical HTML routes               89
Legacy redirects                    80
Bridge dossiers verified            39 / 39
Incident dossiers verified          42 / 42
Series records verified             81 / 81
Series JSON files verified          83 / 83
Unique Series global keys           81 / 81
```

The read-only verifier checked out exact merged main `b72aa190f07a11f45baa2cfcf57ae9295343b374` and observed canonical-derived native production content on attempt 1 with zero dataset mismatches. It also passed record-level JSON equality for every bridge and incident dossier. The same run independently proved the complete Ledger Series adapter in production with semantic equality across all 83 Series JSON files, excluding only environment-specific `generated_at`, and 81 unique global record keys.

The Verus bridge, the separate May and July incident routes, `/incidents/`, `/compare/` and `/stats/` all returned HTTP 200 in the same production-verification job. May recovery/restitution/reopen evidence remains scoped only to the May incident; the later July incident keeps its own unresolved recovery, reimbursement and post-incident restart boundary.

## Current quality boundary

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Primary evidence                     237 / 335
Tier 1 evidence                      254 / 335
Evidence with archived_url           130 / 335
Incidents without primary              1 / 43
Incidents without Tier 1               1 / 43
Events without primary                11 / 203
Events without Tier 1                  6 / 203
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
Phase 9 post-May production proof        complete — PR #340 / run 32337814734
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

Current performance ceilings remain 16 KiB gzip max HTML, 5 KiB CSS total/max file, 4 KiB JS total, and 2 KiB max JS file. The exact-tree May validation kept `incidents/index.html` at 15.8 KiB gzip under the unchanged ceiling. Astro remains `^7.2.0`. No technical closeout creates or implies a GitHub Release or semantic-version tag.

## Ongoing work

1. continue reviewed first-party-backed incident and evidence maintenance;
2. current evidence-gated targets are #303 AFX, #279 XRPL-TX, #299 Nerve, #171 Boltz, and #270 Oraichain under their latest review audits/comments;
3. keep the May and July Verus incidents separate; May recovery/restitution/reopen evidence must not be copied into the July case;
4. keep monitoring/candidate work review-only and fail-closed;
5. preserve canonical unknowns and recovery/reimbursement/restart/outcome distinctions;
6. preserve all source-quality, accessibility, performance, browser, native/Series machine-readable and production-equality guards;
7. use `docs/operations/current-position.md` and `docs/runbooks/recovery-checkpoint.md` as restart pointers; do not resume from historical ChainConnect, July-only Verus, Stage 8 or earlier counts/run IDs.
