# Current position

Status: active maintenance — Ledger Series Phase 2 complete  
Updated: 2026-08-20

This file is the compact restart pointer. Current `main`, canonical JSON, GitHub Actions, `docs/runbooks/recovery-checkpoint.md`, `docs/runbooks/current-status.md`, `docs/runbooks/development-roadmap.md`, and the AI-era authority documents are authoritative.

## Canonical and production baseline

```text
Bridges     39
Incidents   41
Events      194
Evidence    316
```

The latest production-proven canonical maintenance is the Verus-Ethereum Bridge July 2026 incident: canonical PR #330 / merge `4ca9065af8072db00408efb5663c797f80972945`, followed by read-only native + Ledger Series verification PR #332. Verification run `32334410535` / job `96321019010` passed on attempt 1 at `39 / 41 / 194 / 316`, with 88 canonical HTML routes, 80 redirects, and record-level equality for all 39 bridge and 41 incident dossiers. Generated production metadata was `2026-08-20T05:06:43.792Z`.

The same exact-main verification proved the Ledger Series Phase 9 BIR adapter at 80 records, 82 JSON files, and 80 unique global record keys with semantic production equality. PR #332 was verification-only and closed without merge.

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

## Existing BIR roadmap state

- Internal Phase 3 — full-corpus quality strengthening: active, research-triggered maintenance
- Internal Phase 4 — public contract stabilization: complete
- Internal Phase 5 — monitoring and candidate collection: steady-state live
- v1 hardening and technical release closure: complete
- ordinary reviewed registry/candidate expansion: active maintenance
- Ledger Series Phase 2 horizontal strengthening: **complete**
- Ledger Series Phase 9 BIR adapter: **implemented and production-verified**

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
Phase 9 Series adapter                 complete — PR #327
Phase 9 production proof               complete — PR #332 / run 32334410535
Natural-language layer                 deferred to Ledger Series Phase 10
```

Completion evidence for the earlier BIR horizontal strengthening is `docs/audits/ledger-series-phase2-completion-2026-08-18.md`. Current native + Series production proof is `docs/audits/production-verification-verus-july-series-2026-08-20.md`.

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

BIR is in steady-state maintenance only: reviewed incident/evidence additions, monitoring, evidence health, and high-severity corrections under the permanent gates above. Do not invent a BIR/Ledger Series “Stage 9”; the implemented **Ledger Series Phase 9 adapter** is a separate cross-series contract.

Current evidence-gated review targets:

- **#331 Verus May 2026** — separate first incident; keep May recovery/restitution/reopen facts separate from the canonical July case.
- **#303 AFX Trade** — incident shape reviewed; canonical application blocked because both first-party Medium sources fail the unchanged archive-admission boundary.
- **#279 XRPL-TX Bridge** — later tx statements materially improve root-cause and make-whole/replenishment understanding; canonical follow-up remains blocked on stable direct first-party locators/preservation and amount reconciliation.
- **#299 Nerve Bridge** — incident-specific first-party source still not located; do not relabel Tier 2 sources to close the metric.
- **#171 Boltz** — first-party shutdown is real but explicitly aggregates several contained exploits rather than one bounded incident.
- **#270 Oraichain** — direct first-party August 9 halt statement resolved; detailed unauthorized-mint mechanism and exact affected component remain blocked on incident-specific technical primary authority.

For the cross-series roadmap, `docs/ai-era-registry-spec.md` names **SOG** as the next series after the completed BIR pilot. Before any SOG implementation, read that repository's live main/open PR/Actions/current authority and establish its own bounded baseline rather than carrying BIR assumptions forward.
