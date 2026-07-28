# Phase 3 full-corpus quality baseline — 2026-07-28

Status: complete  
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

- bridge aggregate fields that disagree with linked incidents
- bridges without evidence
- incident-bearing bridges without timeline events
- terminal bridges without terminal metadata
- active bridges carrying an end date
- incidents without timeline events or evidence
- negative, non-finite, inverted, or out-of-range loss values
- unresolved incidents without unresolved reasons
- resolved incidents retaining unresolved reasons
- full-recovery outcomes without a recovery or return event
- event/outcome conflicts for reimbursement, restart, and recovery
- primary sources outside tier 1
- dead or archived sources without an archive URL
- event-linked evidence whose incident link disagrees with the linked event

Controlled failure coverage contains eight fixtures:

1. negative loss
2. inverted loss range
3. unresolved incident without a reason
4. bridge without evidence
5. bridge aggregate drift
6. active bridge with an end date
7. primary source outside tier 1
8. event/evidence incident mismatch

## Current warning baseline

The first full-corpus run passed with zero blocking errors and produced four review categories:

```text
completed_reimbursement_event   5 incidents
reopened_event                  15 incidents
incident_source_count            7 incidents
event_source_count              54 events
```

### Missing reimbursement-completed events

```text
bir_inc_000001
bir_inc_000002
bir_inc_000010
bir_inc_000011
bir_inc_000014
```

### Missing bridge-reopened events

```text
bir_inc_000001
bir_inc_000002
bir_inc_000005
bir_inc_000006
bir_inc_000010
bir_inc_000011
bir_inc_000013
bir_inc_000014
bir_inc_000015
bir_inc_000016
bir_inc_000017
bir_inc_000018
bir_inc_000019
bir_inc_000020
bir_inc_000025
```

### Source-count differences

Seven incidents and 54 events have stored `source_count` values that differ from the number of evidence records directly linked through `incident_id` or `event_id`.

This is not automatically a data error. The current corpus may use `source_count` as a reviewed-source total rather than a strict direct-link count. Phase 3 must define the field contract before normalizing or enforcing these values.

## Migration order

1. re-read sources for the five reimbursement-completion gaps
2. re-read sources for the 15 reopening gaps
3. add timeline events only where the historical claim is directly supported
4. define the `source_count` contract
5. mechanically normalize counts only after the contract is fixed
6. rerun repository and production verification after canonical changes

## Migration rule

Phase 3 splits work into two classes:

1. mechanical normalization that does not change historical meaning;
2. claim-changing review that requires source re-reading and a dedicated canonical-data PR.

Warnings are not automatically fixed. The audit records the baseline and prevents new structural regressions while reviewed migrations proceed.
