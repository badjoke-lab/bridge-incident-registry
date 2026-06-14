# First Ten Seed Records Audit

Status: automated audit in progress
Scope: `bir_bridge_000001` through `bir_bridge_000010`

## Purpose

This audit verifies the first ten canonical bridge records as one connected dataset rather than as isolated additions.

The automated checks cover:

- expected bridge presence
- bridge-to-incident count consistency
- unresolved-state consistency
- reimbursement-history consistency
- terminal status requirements
- bridge status versus latest incident outcome
- incident source counts
- minimum evidence depth
- amount-claim evidence ownership
- conflicting-claim evidence ownership
- event-to-incident ownership
- event source-count support
- evidence foreign-key ownership

## Current canonical scope

- 10 bridge records
- 12 incident records
- 34 event records
- 47 evidence records

## Result

The final pass/fail result is enforced by `npm run audit:first-ten` and the GitHub Actions `Check` workflow.

Any blocking mismatch causes CI to fail. Non-blocking evidence-quality gaps are emitted as warnings for later source enrichment.
