# BIR AI-era Execution Schedule

Status: roadmap addendum

## Order
1. Continue current approved BIR record/research/operations work.
2. Audit representative incidents for missing containment, recovery, reimbursement, restart/migration/closure and last-verification evidence; create backlog.
3. Extend schema only for lifecycle facts that cannot be represented safely today.
4. Ship deterministic per-record JSON integrated with the existing machine-readable public layer.
5. Strengthen structured search/filtering.
6. Implement incident/bridge Compare focused on aftermath and outcomes.
7. Implement Stats for loss/recovery/reimbursement, attack vectors, chain distribution, response timelines and data quality.
8. Execute reviewed post-incident follow-up batches.
9. Evaluate natural-language-to-filter translation only after deterministic query surfaces are stable.

## Gate
Spec -> implementation PR -> validation/CI green -> merge -> production verification where applicable -> docs/status sync.

## Mandatory continuation rule
Future BIR work must read this schedule and `ai-era-registry-spec.md` together with the relevant existing canonical, operations and machine-readable specifications.