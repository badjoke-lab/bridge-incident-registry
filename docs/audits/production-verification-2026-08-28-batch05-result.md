# Batch 05 production verification result

Batch 05 production publication was verified after deployment convergence.

Verified production state:

- bridges: 55
- incidents: 51
- events: 229
- evidence: 377
- canonical/public content match: true
- HTML routes: 114
- bridge dossiers: 55/55 matched canonical-derived output
- incident dossiers: 51/51 matched canonical-derived output
- Ledger Series relationships: 44 reviewed relationships / 77 referenced Stage 3 endpoints

The first production-verification attempt observed the previous Batch 04 publication (50 / 51 / 224 / 367) for all 20 convergence attempts and failed without weakening any gate. The failed job was rerun after production deployment converged; the rerun found Batch 05 on attempt 1 and passed route, record-level JSON, redirect, and Series verification.

Audit-only PR #388 was closed without merge as required. Canonical Batch 05 PR: #387.
