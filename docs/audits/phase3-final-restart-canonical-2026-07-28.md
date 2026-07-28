# Phase 3 final restart canonical migration — 2026-07-28

Status: implementation complete on review branch  
Baseline: 33 bridges / 34 incidents / 182 events / 210 evidence  
Result: 33 bridges / 34 incidents / 183 events / 211 evidence

## Purpose

Close the final three `reopened_event` warnings without inventing historical restart dates or duplicating existing events.

## Canonical changes

### LI.FI 2022 — existing event normalization

`bir_ev_000044` was normalized from:

```text
patch_and_reimbursement
```

to:

```text
bridge_reopened
```

The existing date, title, description, reimbursement state, and evidence remain unchanged. The event already stated that the affected logic was patched and redeployed and that the protocol reopened after the patch.

### LI.FI 2024 — restart status correction

The reviewed official report establishes containment and compensation review, but not the exact historical service-restoration point.

Canonical corrections:

```text
bir_inc_000016.restart_status   reopened -> unknown
bir_ev_000046.restart_status    reopened -> unknown
```

`current_outcome = active_after_incident` remains unchanged because later current-operation evidence and exact July 2024 restart timing are separate claims.

A known-unknown entry now explicitly records that the incident-era restoration point is not established in the reviewed corpus.

### ChainSwap July 2 — final relaunch linkage

Added:

```text
bir_ev_000183
bir_src_000211
```

The new incident-linked event records ChainSwap's official August 20 relaunch after the combined July remediation period. It does not claim that the first incident was followed by a durable reopening before the second July exploit.

The evidence URL intentionally duplicates the existing official relaunch source because evidence linkage is event-specific.

## Count result

```text
Bridges     33
Incidents   34
Events      183
Evidence    211
```

## Expected audit result

```text
Blocking errors                  0
completed_reimbursement_event    0
reopened_event                   0
```

Source-count warnings remain outside this migration and require a separate field-contract decision.

## Safety

- current operation was not used as a substitute for an incident-era restart date;
- LI.FI 2022 was normalized without adding a duplicate event;
- LI.FI 2024 containment was not rewritten as reopening;
- ChainSwap was not described as durably reopened before the second July exploit;
- the shared official relaunch source remains separately linked to both incident-specific restart events;
- temporary generator and write-enabled workflow were removed before final review.

## Validation requirement

The cleaned review branch must pass:

```text
npm run check
npm run validate:data
npm run validate:enums
npm run audit:first-ten
npm run audit:full-corpus
npm run audit:full-corpus:test
npm run build
npm run dist:check
npm run dist:test
```

## Publication requirement

After merge, production must converge to:

```text
Bridges     33
Incidents   34
Events      183
Evidence    211
HTML routes 72
```

The complete production-verification gate remains mandatory.
