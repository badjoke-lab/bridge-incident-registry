# Phase 3 full-corpus quality baseline — 2026-07-28

Status: audit implementation in progress  
Canonical impact: none

## Baseline

```text
Bridges     33
Incidents   34
Events      173
Evidence    199
```

## Purpose

Establish a permanent whole-corpus audit before any Phase 3 normalization or claim-changing data migration.

## Blocking checks

The audit fails CI for:

- bridges without evidence
- incident-bearing bridges without timeline events
- incidents without timeline events
- incidents without evidence
- negative or non-finite loss values
- inverted loss ranges
- canonical loss values outside their declared ranges
- unresolved incidents without unresolved reasons

## Warning inventory

The audit reports, but does not silently rewrite:

- bridge major-incident counts that differ from linked incidents
- bridge unresolved flags that differ from linked incidents
- bridge reimbursement-history flags that differ from linked incidents
- terminal entities missing terminal metadata
- active entities carrying end dates
- incident source-count differences
- event source-count differences
- reimbursement, recovery, and restart event/outcome mismatches
- resolved incidents retaining unresolved-reason text
- primary sources outside tier 1
- dead or archived evidence without an archive URL
- event-linked evidence without an incident link

## Migration rule

Phase 3 must split work into two classes:

1. mechanical normalization that does not change historical meaning;
2. claim-changing review that requires source re-reading and a dedicated canonical-data PR.

Warnings are not automatically fixed. Each category must be reviewed for field semantics before enforcement is strengthened.

## Result

Pending the first `npm run audit:full-corpus` CI run against the 33 / 34 / 173 / 199 corpus.
