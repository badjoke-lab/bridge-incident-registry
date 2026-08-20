# Verus July 2026 native and Ledger Series production verification

Status: complete — native and Series production equality verified  
Verified: 2026-08-20  
Canonical application PR: #330  
Canonical merge: `4ca9065af8072db00408efb5663c797f80972945`  
Read-only verification PR: #332 — closed without merge  
Verification run: `32334410535`  
Verification job: `96321019010`

## Verified production state

```text
Bridges                    39
Incidents                  41
Events                     194
Evidence                   316
Canonical HTML routes       88
Legacy redirects            80
Bridge dossiers             39 / 39
Incident dossiers           41 / 41
Series records              80
Series JSON files           82
Unique Series global keys   80
```

The unchanged native production verifier reached complete canonical-derived equality on **attempt 1**.

```text
Canonical public content match  true
Generated at                    2026-08-20T05:06:43.792Z
Publication attempt             1
```

All four public canonical datasets returned HTTP 200 and matched the exact merged-main expected output with zero content mismatches. Record-level JSON equality passed for every one of the 39 bridge dossiers and 41 incident dossiers.

## Verus publication proof

The reviewed July incident added in PR #330 is live at:

```text
/bridge/verus-ethereum-bridge/                                      HTTP 200
/incident/verus-ethereum-bridge-2026-july-import-verification-exploit/ HTTP 200
```

The July record remains separate from the May 2026 Verus-Ethereum Bridge incident now tracked in Issue #331. May recovery, restitution and reopen facts are not reused as July recovery/reimbursement/reopen evidence.

The unarchived first-party Google Doc remains review authority only and is not canonical evidence; the accepted preservation/source-quality boundary from PR #326 is unchanged.

## Ledger Series proof

The same exact-main verification built and checked the Phase 9 BIR Series adapter, then compared production against the local expected output.

```text
Descriptor primary records   39
Index bridge envelopes       39
Index incident envelopes     41
Index total records          80
Series JSON files            82
Unique global record keys    80
Semantic production match    true
Publication attempt          1
```

The 82 files are the descriptor, index and 80 per-record envelopes. Semantic comparison excludes only environment-specific `generated_at`; all other content must match. Representative registry, Compare and Stats human routes also returned HTTP 200.

## Exact-head quality state

PR #330 exact-head Check run `32333723746`, job `96319103212`, passed the permanent data, source-quality, build, accessibility, performance and dist gates at the merged canonical state.

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
```

The same build produced 88 canonical HTML files, 80 redirects and 82 Series JSON files. Accessibility passed for all 88 HTML files. The largest HTML output was `incidents/index.html` at 15.5 KiB gzip, below the unchanged 16 KiB ceiling.

## Result

Verus July 2026 canonical application PR #330 is fully published and production-verified in both the native BIR contract and the Ledger Series Phase 9 adapter contract.

No build-input refresh, production mutation, verifier relaxation, source-quality ceiling increase, performance-budget increase or canonical mutation was required by verification PR #332.
