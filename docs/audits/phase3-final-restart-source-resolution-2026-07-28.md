# Phase 3 final restart source resolution — 2026-07-28

Status: reviewed implementation boundary  
Canonical impact: none

## Scope

After the first Phase 3 aftermath migration, the full-corpus audit retained three restart warnings:

```text
bir_inc_000015  LI.FI 2022 approval-drain exploit
bir_inc_000016  LI.FI 2024 facet approval exploit
bir_inc_000017  ChainSwap July 2, 2021 exploit
```

The three warnings require different treatments. They are not three identical missing-event defects.

## Decision 1 — LI.FI 2022

### Current state

`bir_ev_000044` already records that LI.FI patched and redeployed the affected logic, reimbursed 25 smaller wallets, and reopened the protocol after the patch.

Current event type:

```text
patch_and_reimbursement
```

### Resolution

Normalize `bir_ev_000044` to:

```text
bridge_reopened
```

Keep the existing title, description, date, reimbursement state, and notes. Add a note that the event type was normalized from the descriptive legacy value.

This is a vocabulary migration, not a new historical claim. Existing event-scoped sources already support redeployment and reopening.

## Decision 2 — LI.FI 2024

### Current state

The official July 18 incident report establishes:

- the vulnerable facet was disabled across all chains;
- the threat was contained;
- recovery and full-compensation options were being evaluated;
- deployment review procedures were being reassessed.

It does not establish the exact date when any paused integration or affected service path resumed.

The later 2026 current-operation record establishes that LI.FI was active, but it cannot supply a historical restart date for the July 2024 incident.

### Resolution

Do not fabricate a `bridge_reopened` event.

Change:

```text
bir_inc_000016.restart_status   reopened -> unknown
bir_ev_000046.restart_status    reopened -> unknown
```

Add an explicit known unknown that the exact incident-era service-restoration point is not established in the reviewed corpus.

Keep:

```text
current_outcome = active_after_incident
```

Current operation and exact historical restart timing are separate claims.

Primary source:

- https://li.fi/knowledge-hub/incident-report-16th-july/

## Decision 3 — ChainSwap July 2

### Current state

The first postmortem establishes that the bridge and nodes were frozen and a fix was deployed within 30 minutes. It does not establish a durable reopening before the second July exploit.

A later official announcement dated August 20 states that the rebuilt/integrated ChainSwap bridge was live again after the July incident period.

The existing August 20 canonical event and evidence are linked only to the second July incident:

```text
bir_ev_000056
bir_src_000074
```

### Resolution

Add an incident-linked `bridge_reopened` event for `bir_inc_000017`, dated `2021-08-20`, describing the shared post-July relaunch.

Add a separate event-scoped evidence record using the same official relaunch source. The duplicate URL is intentional because evidence linkage is event-specific.

Primary source:

- https://chain-swap.medium.com/chainswap-re-launch-we-are-live-5e85d2f9c80f

The event must not claim that the first exploit was followed by an immediate durable reopening before July 10. It records the later final relaunch after the combined July remediation period.

## Expected canonical changes

```text
Existing event normalization   1
Incident status correction     1
Existing event status fix      1
New event                      1
New evidence                   1
```

Expected resulting counts:

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

Source-count warnings remain outside this migration.

## Safety rules

- Do not infer historical reopening from current operation.
- Do not duplicate the LI.FI 2022 event when normalization is sufficient.
- Do not rewrite LI.FI 2024 containment as service restoration.
- Do not claim ChainSwap durably reopened between the first and second July exploits.
- Keep shared relaunch evidence separately linked to each incident-specific event.

## Implementation sequence

1. merge this source-resolution boundary with no canonical changes;
2. create a fresh canonical branch from latest `main`;
3. normalize `bir_ev_000044`;
4. correct LI.FI 2024 restart status to `unknown`;
5. add the ChainSwap incident-17 relaunch event and evidence;
6. update counts and Phase 3 audit records;
7. run the complete repository suite;
8. merge only after clean normal CI;
9. production-verify 33 / 34 / 183 / 211 and all 72 HTML routes.
