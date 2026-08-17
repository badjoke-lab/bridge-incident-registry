# Current position

Status: active maintenance + Ledger Series Phase 2 horizontal strengthening  
Updated: 2026-08-17

This file is the compact restart pointer. Current `main`, canonical JSON, GitHub Actions, `docs/runbooks/recovery-checkpoint.md`, `docs/runbooks/current-status.md`, `docs/runbooks/development-roadmap.md`, and the AI-era authority documents are authoritative.

## Canonical and production baseline

The current canonical baseline is:

```text
Bridges     36
Incidents   38
Events      188
Evidence    297
```

The last canonical additions before Ledger Series Phase 2 were TAC Inner Bridge and XRPL-TX Bridge. XRPL-TX was applied in PR #275 and production-verified in PR #276. The older `34 / 36 / 185 / 293` Syscoin checkpoint is historical and must not be treated as current truth.

## Current quality boundary

The exact repository checks on the current Stage 5 lineage report:

```text
Primary evidence                       213 / 297
Tier 1 evidence                        230 / 297
Archived evidence                      130 / 297
Incidents without primary                1 / 38
Incidents without Tier 1                 1 / 38
Events without primary                  11 / 188
Events without Tier 1                     6 / 188
Terminal unarchived unique URLs          15
Risky-host unarchived unique URLs        16
Unknown URL status                        0
Source-count mismatches                   0
High-severity npm audit findings          0
```

Current full-corpus warnings remain non-blocking and explicit:

```text
bir_inc_000015  completed reimbursement state without reimbursement_completed event
bir_inc_000035  reopened state without bridge_reopened event
```

They are review signals, not permission to fabricate missing events.

## Existing BIR roadmap state

- Internal Phase 3 — full-corpus quality strengthening: active, research-triggered maintenance
- Internal Phase 4 — public contract stabilization: complete
- Internal Phase 5 — monitoring and candidate collection: steady-state live
- v1 hardening and technical release closure: complete
- ordinary reviewed registry/candidate expansion: active maintenance

Monitoring remains review-only and must never auto-write canonical records.

## Ledger Series horizontal state

Ledger Series Phase 2 is separate from BIR's older internal phase numbering.

```text
Baseline audit / schedule sync         complete — PR #284
Lifecycle schema expansion             not required at audited boundary
Per-record bridge/incident JSON        complete — PR #285
Stage 4 verifier + production          complete — PR #286 + main green
Structured filter delta                complete — PR #288 + main production green
Compare                                NEXT — Stage 6
Stats                                  pending — Stage 7
Bounded aftermath follow-up            pending — Stage 8
Natural-language layer                 deferred to Ledger Series Phase 10
```

Stage 5 retained all pre-existing explicit controls and added only the two audited incident gaps: Affected chain and Bridge type. The new facets use canonical normalized values, preserve URL query state, passed exact-head Chromium/Firefox/WebKit interaction tests, and passed the post-merge main production equality gate.

The horizontal phase takes priority over routine one-by-one record growth. Maintenance continues in parallel only for monitoring, evidence health, high-severity corrections and properly reviewed new incidents.

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

## Next bounded work

1. implement deterministic incident/bridge Compare focused on aftermath and outcomes;
2. make Compare state shareable/reproducible in the URL and preserve unknown values rather than inferring answers;
3. validate Compare interactions across Chromium/Firefox/WebKit and production-verify after merge;
4. implement Stats;
5. run one bounded reviewed post-incident follow-up pass near Ledger Series Phase 2 closeout;
6. synchronize the AI-era schedule and completion audit before moving the Series roadmap to SOG.
