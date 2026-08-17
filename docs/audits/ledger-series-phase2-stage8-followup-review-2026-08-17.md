# Ledger Series Phase 2 Stage 8 bounded aftermath follow-up — 2026-08-17

Status: reviewed; canonical application required  
Scope: exactly two existing full-corpus lifecycle warnings  
Canonical baseline: 36 bridges / 38 incidents / 188 events / 297 evidence

## Purpose

Stage 8 is one bounded reviewed post-incident follow-up pass near Ledger Series Phase 2 closeout. It is not an open-ended corpus expansion phase. This audit therefore examines only the two lifecycle inconsistencies already emitted by the current full-corpus audit.

## Finding 1 — LI.FI 2022 approval-drain exploit

Incident: `bir_inc_000015`  
Current state: `reimbursement_status = completed`, `restart_status = reopened`  
Current warning: completed reimbursement state without a discrete `reimbursement_completed` event.

Existing canonical support is sufficient.

- `bir_ev_000044` already records the March 21 patch/reopen and states that all 29 affected wallets were reimbursed.
- `bir_src_000265` is a Tier 1 first-party LI.FI postmortem scoped to reimbursement and explicitly supports the whitelist fix, swaps reenabled, 29/29 wallets reimbursed and USD 570,000 total compensation.
- The current combined reopen/reimbursement event is semantically overloaded. The incident-level completed reimbursement state is supportable without new external research.

Decision: add one discrete `reimbursement_completed` event for `bir_inc_000015`, using the already-canonical first-party postmortem as authority. Keep the existing `bridge_reopened` event for restart semantics. Add only the minimum event-scoped evidence record needed for exact source-count semantics.

## Finding 2 — Allbridge Core 2026 Solana pool exploit

Incident: `bir_inc_000035`  
Current state: `restart_status = reopened`, `current_outcome = active_after_incident`  
Current warning: reopened state without a discrete `bridge_reopened` event.

Existing canonical support is sufficient.

- `bir_ev_000184` records the exploit disclosure and pause and intentionally leaves the later relaunch at incident level.
- `bir_src_000290` is a Tier 1 first-party Allbridge relaunch notice with `claim_scope = restart` and `supports_reopen = true`; it states that Allbridge Core was back up on CCTP and LayerZero without liquidity pools.
- The source uses approximate day precision in the existing canonical evidence. Stage 8 must preserve that precision rather than invent an exact timestamp.

Decision: add one discrete `bridge_reopened` event for `bir_inc_000035` using the already-canonical Allbridge relaunch source. Add only the minimum event-scoped evidence record required by exact source-count semantics.

## Explicit non-goals

This bounded batch must not:

- change loss amounts;
- resolve Allbridge attacker-fund recovery or LP reimbursement;
- infer a more specific LI.FI recovery state;
- broaden attack-vector categories;
- add unrelated incidents or evidence-enrichment work;
- widen archive-risk or source-quality ceilings;
- treat monitoring output as canonical authority.

## Expected canonical delta

The intended delta is limited to:

```text
Events      +2
Evidence    +2 event-scoped first-party copies
Incidents   no new records; source_count adjusted only for exact equality
Bridges     no change
```

Expected post-application counts, if the validator confirms the minimum two-evidence design:

```text
Bridges     36
Incidents   38
Events      190
Evidence    299
```

These counts are an implementation expectation, not authority until canonical validation passes.

## Gate

Canonical application must pass:

- canonical/schema validation;
- exact source-count equality;
- full-corpus audit with both lifecycle warnings removed;
- source-quality no-regression checks;
- monitoring tests;
- build and machine-readable consistency;
- accessibility;
- performance budget;
- Chromium / Firefox / WebKit compatibility;
- post-merge production registry equality.

If either event cannot be represented without weakening an existing quality boundary, the canonical application must fail closed and Stage 8 must be reopened for review rather than forcing the record.
