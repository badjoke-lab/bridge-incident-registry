# Bridge Incident Registry — Development Roadmap to v1

Status: active maintenance  
Updated: 2026-08-20

GitHub state and canonical JSON are authoritative. Ledger Series Phase 2 horizontal strengthening is complete; this document now describes BIR's continuing maintenance, Phase 3 quality, Phase 5 monitoring work, and the completed Ledger Series Phase 9 BIR adapter.

## Canonical and production baseline

```text
Bridges   70
Incidents   51
Events   244
Evidence   399
```

Latest production-verified canonical maintenance:

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

The completed Ledger Series Phase 2 baseline was later extended through reviewed maintenance: WanBridge (PR #308), ChainConnect (review #313, canonical #314, production verification #318), and the July 2026 Verus-Ethereum Bridge incident (review #325, preservation #326, canonical #330, production verification #332). These additions do not create or reopen a BIR/Ledger Series Stage 9. Separately, PR #327 implemented the cross-series Ledger Series Phase 9 BIR adapter.

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
Ledger   Series Phase 9 BIR adapter                complete — PR #327 + production proof #332
Maintain Reviewed canonical/candidate expansion    active
         Verus May 2026 incident                   Issue #331 — separate review target
         XRPL-TX source/on-chain enrichment        Issue #279 — active research target
         Oraichain 2026 signal                     Issue #270 — evidence-gated hold
         Boltz 2026 shutdown signal                Issue #171 — evidence-gated hold
```

## Current quality state

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

Further primary/archive remediation remains research-triggered rather than metric-driven. Source hierarchy and accepted gap ceilings must not be weakened to improve coverage numbers.

## Latest canonical maintenance result — Verus July 2026

PR #330 added the reviewed July 23 second Verus-Ethereum Bridge exploit as a separate incident from the May 2026 case. The accepted canonical evidence excludes the unarchived first-party Google Doc under the unchanged preservation boundary and retains only supported July claims. May recovery, restitution and reopen facts are not copied into the July record.

PR #330 exact-head CI passed at 39 / 41 / 194 / 316 with source-count mismatches 0, full-corpus blocking errors 0, warning categories `{}`, and all source-quality ceilings unchanged. The 88-page static build passed accessibility, Chromium/Firefox/WebKit and the unchanged performance budget; `incidents/index.html` was 15.5 KiB gzip under the 16 KiB ceiling.

Read-only verifier PR #332 then proved the exact merged main in production on attempt 1. Native content matched across all datasets and dossiers, and the Ledger Series adapter matched across all 82 JSON files / 80 records / 80 unique global keys.

## Active maintenance research boundaries

### Verus-Ethereum Bridge May 2026 — Issue #331

The May exploit is a distinct incident and must remain separate from the canonical July case. First-party Verus release history provides a May exploit/recovery/restoration/reopen/re-pause sequence, but the May-specific attack transaction, root cause, loss/backing-shortfall scope, recovery-versus-restitution semantics, and source-preservation boundary require their own bounded review before canonical application.

### AFX Trade — Issue #303

The July 22 custody-bridge incident shape is reviewed, including the supply-chain/infrastructure-to-validator compromise boundary and the 24,150,000 USDC transaction. Both located first-party AFX Medium sources fail the unchanged risky-host archive-admission boundary, so canonical application remains evidence-blocked.

### XRPL-TX Bridge — Issue #279

`bir_inc_000038` is canonical. Later tx statements materially improve the root-cause boundary toward `message_verification_failure` and announce Foundation-funded reserve replenishment / affected-user make-whole intent, but stable direct first-party locators/preservation and the 199,916.3 versus 198,715.88 XRP discrepancy still block canonical follow-up. Do not equate reserve backfill with attacker-fund recovery.

### Nerve Bridge — Issue #299

The November 2021 incident remains the sole incident-level primary/Tier 1 gap. Rechecks still locate BlockSec/Halborn technical analyses and generic Nerve documentation, but no incident-specific first-party postmortem/advisory. Do not weaken source semantics to close the metric.

### Boltz — Issue #171

Boltz's first-party shutdown statement is stronger evidence for a long-term security-driven service pause, but explicitly says the shutdown is not a response to a single incident and refers to several contained exploits. Keep review-only until a discrete incident or separately supportable terminal lifecycle boundary exists.

### Oraichain — Issue #270

Oraichain official X status `2086274046124335398` directly confirms abnormal mainnet activity and a transaction halt on August 9. Multiple contemporaneous reports consistently describe an EVM cross-chain path vulnerability and unauthorized ORAI minting, but the exact incident-specific first-party technical locator and affected bridge/component identity remain unresolved. OBridge documentation is architecture context only, not incident identity proof.

## Phase 5 steady state

BIR Monitoring and BIR Public Site Health remain active review-only workflows. Both assert canonical data unchanged and may write only bounded monitoring/watchlist state; any canonical investigation or record change requires a separate reviewed branch and PR.

Current canonical/public truth is `39 / 41 / 194 / 316`, production-verified through PR #332. Persisted monitoring state may be an older checkpoint and must never override canonical JSON or native/Series production-equality evidence.

## Ledger Series Phase 9 public adapter state

PR #327 publishes a deterministic Series descriptor, index, and per-record bridge/incident envelopes while preserving native BIR URLs and canonical JSON as source of truth. Post-Verus production proof is 80 Series records across 82 JSON files and 80 unique global keys. Series output is derived publication, not an alternative canonical store and not a path for auto-promoting monitoring candidates.

## Permanent release contract

The v1 technical contract established by PRs #251–#258 remains permanent after closure:

- blocking high-severity dependency audit;
- canonical/schema/cross-record validation;
- exact source-count and source-quality no-regression audits;
- monitoring tests;
- static build and native/Series dist consistency;
- accessibility contract;
- built-output performance budgets;
- Chromium / Firefox / WebKit compatibility;
- exhaustive production registry equality after main merge;
- production Series equality when Series output changes.

Current performance ceilings remain 16 KiB gzip max HTML, 5 KiB CSS total/max file, 4 KiB JS total, and 2 KiB max JS file.

Technical closure does not create or imply a semantic-version tag or GitHub Release.

## Ongoing BIR roadmap

1. **Evidence-gated incident maintenance** — continue #331, #303, #279, #299, #171 and #270 only when their missing first-party/preservation/entity boundaries materially advance.
2. **Refresh review-only monitoring after canonical changes** — inspect BIR Monitoring and Public Site Health output; accept only bounded healthy state changes and prove a silent repeat when a baseline changes.
3. **Phase 3 quality remains research-triggered** — improve primary/Tier 1/archive coverage when stronger sources appear; never widen accepted quality ceilings merely to improve counts.
4. **Continue reviewed incident/corpus expansion** — use one bounded review-first branch/PR per approved canonical task and retain exhaustive native + applicable Series production equality after merge.
5. **Do not invent Stage 9** — Ledger Series Phase 2 remains closed; Ledger Series Phase 9 refers to the separate adapter contract already implemented by PR #327. The cross-series authority names SOG as the next series, which must be audited in its own repository before work begins.

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
16. Accessibility, performance, browser compatibility, dependency security, source quality, native data and applicable Series output are permanent release gates.
17. Cloudflare Pages preview deployment remains `none`.
18. Technical v1 closure does not create or imply a GitHub Release or semantic-version tag.
