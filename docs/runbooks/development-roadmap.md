# Bridge Incident Registry — Development Roadmap to v1

Status: active maintenance  
Updated: 2026-08-18

GitHub state and canonical JSON are authoritative. Ledger Series Phase 2 horizontal strengthening is complete; this document now describes BIR's continuing maintenance, Phase 3 quality, and Phase 5 monitoring work.

## Canonical and production baseline

```text
Bridges     38
Incidents   40
Events      193
Evidence    311
```

Latest production-verified canonical maintenance:

```text
Stage 8 canonical PR                 #294
Phase 2 closeout PR                  #297 (docs only)
V1 Release Readiness main run        32041737878
Production equality                  success
Canonical HTML routes                82
Bridge dossiers verified             36 / 36
Incident dossiers verified           38 / 38
```

The Stage 8 canonical batch added only the two reviewed discrete lifecycle events and their minimum event-scoped first-party evidence. No schema expansion, ranking, generated safety conclusion, or unrelated incident growth was included.

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          complete through established batches
Phase 3  Full-corpus quality strengthening         active research-triggered maintenance
         Source-count/source-quality work          complete to reviewed boundary
         Event Tier 1 / Primary Remediation        production-verified to reviewed boundary
         Archive Capture Batches 1–18              production-verified
         Deferred Archive Retries 01–04            complete to reviewed boundary
         Cross-record bridge integrity             permanent blocking gate
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          permanent gate
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       steady-state live
         Review-gated foundation                   complete — PR #217
         Evidence/external/hack/domain/RSS watches live — PRs #226–#246
         Monitoring state resolution health        live — PR #248
         Public site / SEO health watch            live — PRs #249–#250
Release  v1 technical hardening / closure          complete — PRs #251–#258
Ledger   Series Phase 2 horizontal strengthening   complete — PRs #284–#297
Maintain Reviewed canonical/candidate expansion    active
         XRPL-TX source/on-chain enrichment        Issue #279 — active research target
         Oraichain 2026 signal                     Issue #270 — evidence-gated hold
         Boltz 2026 shutdown signal                Issue #171 — evidence-gated hold
```

## Current quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Primary evidence                     215 / 299
Tier 1 evidence                      232 / 299
Evidence with archived_url           130 / 299
Incidents without primary              1 / 38
Incidents without Tier 1               1 / 38
Events without primary                11 / 190
Events without Tier 1                  6 / 190
Terminal unarchived unique URLs       15
Risky-host unarchived unique URLs     16
Unknown URL status                     0
Full-corpus blocking errors            0
Full-corpus warning categories        {}
High-severity npm audit findings       0
```

Further primary/archive remediation remains research-triggered rather than metric-driven. Source hierarchy and accepted gap ceilings must not be weakened to improve coverage numbers.

## Latest maintenance result — bounded Stage 8 lifecycle repair

PR #294 repaired the two explicit lifecycle warnings already identified by the full-corpus audit:

```text
bir_inc_000015   added discrete reimbursement_completed event
bir_inc_000035   added discrete bridge_reopened event
```

Both additions use already-reviewed first-party evidence and the minimum event-scoped evidence required by exact source-count semantics. After external publication caught up, main V1 Release Readiness run `32041737878` verified the resulting `36 / 38 / 190 / 299` public/canonical state and all record-level dossiers. The full-corpus warning set is now empty.

## Active maintenance research boundaries

### XRPL-TX Bridge — Issue #279

`bir_inc_000038` is canonical and valid but intentionally incomplete. The active research target is first-party or reproducible on-chain evidence for the 2026-08-09 incident's transfer sequence, incident-specific root cause, recovery, reimbursement, remediation, and restart/current outcome.

A 2026-08-18 recheck confirmed current first-party TX bridge architecture documentation but did not locate incident-specific first-party aftermath material or a stable investigation package sufficient to change canonical state. Generic bridge documentation or a reachable interface is not proof that the affected route reopened. Keep `attack_vector_category` and unresolved aftermath fields at their reviewed unknown boundary unless stronger evidence appears.

### Oraichain — Issue #270

The 2026-08-08 signal remains monitoring/review material only. The DefiLlama discovery row is secondary evidence, the exact affected bridge/component remains unresolved, and no canonical incident may be created until a primary source or equivalent reproducible evidence establishes the event boundary and lifecycle facts.

### Boltz — Issue #171

Boltz remains review-only. Current first-party material establishes a security-driven swap shutdown but not one discrete bridge exploit with a sufficiently bounded incident record. Do not collapse multiple contained exploits or a broader operational decision into one canonical incident without new evidence.

## Phase 5 steady state

BIR Monitoring and BIR Public Site Health remain active review-only workflows. Their most recent scheduled runs before this roadmap sync completed successfully. Both workflows assert canonical data unchanged and may write only bounded monitoring/watchlist state; any canonical investigation or record change requires a separate reviewed branch and PR.

The current production truth is `36 / 38 / 190 / 299`, independently verified by the Phase 2 Stage 8 production gate. Persisted monitoring state may be an older checkpoint and must never override canonical JSON or production-equality evidence.

## Permanent release contract

The v1 technical contract established by PRs #251–#258 remains permanent after closure:

- blocking high-severity dependency audit;
- canonical/schema/cross-record validation;
- exact source-count and source-quality no-regression audits;
- monitoring tests;
- static build and dist consistency;
- accessibility contract;
- built-output performance budgets;
- Chromium / Firefox / WebKit compatibility;
- exhaustive production registry equality after main merge.

Current performance ceilings remain 16 KiB gzip max HTML, 5 KiB CSS total/max file, 4 KiB JS total, and 2 KiB max JS file.

Technical closure does not create or imply a semantic-version tag or GitHub Release.

## Ongoing BIR roadmap

1. **Issue #279 first** — continue first-party and reproducible on-chain enrichment for `bir_inc_000038`; change canonical data only if evidence materially changes a displayed incident claim or aftermath state.
2. **Refresh review-only monitoring after canonical changes** — inspect BIR Monitoring and Public Site Health output; accept only bounded healthy state changes and prove a silent repeat when a baseline changes.
3. **Issue #270 on evidence arrival** — resolve the Oraichain component/event boundary and canonicalize only after primary or equivalent reproducible evidence exists.
4. **Issue #171 on evidence arrival** — keep Boltz review-only until a discrete incident, restart, migration, permanent shutdown, or final-outcome boundary becomes supportable.
5. **Phase 3 quality work remains research-triggered** — improve primary/Tier 1/archive coverage when stronger sources appear; never widen accepted quality ceilings merely to improve counts.
6. **Continue reviewed incident/corpus expansion** — use one bounded review-first branch/PR per approved canonical task and retain exhaustive production equality after merge.

## Permanent rules

1. Never write canonical changes directly to main.
2. Use one fresh branch and bounded PR per canonical task after review approval.
3. Keep canonical and monitoring/working data separate.
4. Do not merge temporary diagnostics, generators, or write-enabled workflows.
5. Preserve distinctions among loss, return, recovery, reimbursement, freezing, minting, and burning.
6. Secondary database/news rows are not canonical incidents or primary evidence.
7. Historical SHAs and run IDs are checkpoints, not live branch pointers.
8. Source-quality gap ceilings may decrease but must not increase without review.
9. Source hierarchy must not be weakened to improve coverage metrics.
10. Unknown URL statuses are not permitted in canonical data.
11. Production publication is proven by field-level generated-content equality.
12. Monitoring output is review material only and never auto-publishes canonical records.
13. Parent/subdomain official hosts are not migrations by themselves.
14. Review issue lifecycle affects monitoring state only, never canonical truth.
15. Public-site health complements but does not replace exhaustive production equality.
16. Accessibility, performance, browser compatibility, dependency security, and source quality are permanent release gates.
17. Cloudflare Pages preview deployment remains `none`.
18. Technical v1 closure does not create or imply a GitHub Release or semantic-version tag.
