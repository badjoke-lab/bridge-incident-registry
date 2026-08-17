# Current position

Status: active maintenance — Ledger Series Phase 2 complete  
Updated: 2026-08-18

This file is the compact restart pointer. Current `main`, canonical JSON, GitHub Actions, `docs/runbooks/recovery-checkpoint.md`, `docs/runbooks/current-status.md`, `docs/runbooks/development-roadmap.md`, and the AI-era authority documents are authoritative.

## Canonical and production baseline

```text
Bridges     36
Incidents   38
Events      190
Evidence    299
```

Main V1 Release Readiness run `32041737878` at revision `6fe188ea4979d38c32a3a9a4558537c87b733610` passed production registry equality for 82 canonical HTML routes and verified all 36 bridge plus 38 incident canonical-derived dossiers. Production canonical content was available on verifier attempt 1.

## Current quality boundary

```text
Primary evidence                       215 / 299
Tier 1 evidence                        232 / 299
Archived evidence                      130 / 299
Incidents without primary                1 / 38
Incidents without Tier 1                 1 / 38
Events without primary                  11 / 190
Events without Tier 1                     6 / 190
Terminal unarchived unique URLs          15
Risky-host unarchived unique URLs        16
Unknown URL status                        0
Incident source-count mismatches          0
Event source-count mismatches              0
Full-corpus blocking errors                0
Full-corpus warning categories            {}
High-severity npm audit findings           0
```

The former Stage 8 warnings for `bir_inc_000015` and `bir_inc_000035` are no longer present. Their discrete lifecycle events were added in PR #294 using reviewed first-party support without widening source-quality limits.

## Existing BIR roadmap state

- Internal Phase 3 — full-corpus quality strengthening: active, research-triggered maintenance
- Internal Phase 4 — public contract stabilization: complete
- Internal Phase 5 — monitoring and candidate collection: steady-state live
- v1 hardening and technical release closure: complete
- ordinary reviewed registry/candidate expansion: active maintenance
- Ledger Series Phase 2 horizontal strengthening: **complete**

Monitoring remains review-only and must never auto-write canonical records.

## Ledger Series horizontal state

```text
Baseline audit / schedule sync         complete — PR #284
Lifecycle schema expansion             not required at audited boundary
Per-record bridge/incident JSON        complete — PRs #285–#286
Structured filter delta                complete — PR #288
Compare                                complete — PR #290
Stats                                  complete — PR #292
Bounded aftermath follow-up            complete — PR #294
Production publication recovery        complete — PRs #295–#296 + main run 32041737878
Phase 2 completion audit               complete — docs closeout
Natural-language layer                 deferred to Ledger Series Phase 10
```

Completion evidence is `docs/audits/ledger-series-phase2-completion-2026-08-18.md`.

## Permanent release gates

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

Current budgets remain 16 KiB gzip max HTML, 5 KiB CSS total/max file, and 4 KiB JS total / 2 KiB max JS file. Astro remains `^7.2.0`.

## Current bounded work

BIR is now steady-state maintenance only: reviewed incident/evidence additions, monitoring, evidence health, and high-severity corrections under the permanent gates above. Do not invent a Ledger Series Stage 9.

For the cross-series roadmap, `docs/ai-era-registry-spec.md` names **SOG** as the next series after the completed BIR pilot. Before any SOG implementation, read that repository's live main/open PR/Actions/current authority and establish its own bounded baseline rather than carrying BIR assumptions forward.
