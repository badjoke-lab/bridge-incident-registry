# Production verification — Taiko June 2026 enrichment

Status: pending read-only production verification  
Verification date: 2026-08-21  
Canonical merge: `bd3f3636e10afa30f97a664af27971eee36a9b78`  
Canonical PR: #344  
Issue: #342

## Purpose

Run the unchanged read-only Production Verification workflow against the exact post-merge `main` after the existing Taiko Bridge / June 2026 incident was enriched from the detailed Taiko Labs first-party postmortem.

No production mutation, deployment trigger, scheduler change, public-reader change, canonical JSON change, route change, or verifier relaxation is authorized by this audit PR.

## Expected canonical state

```text
Bridges      39
Incidents    42
Events       199
Evidence     327
HTML routes  89
Redirects    80
Series records 81
Series JSON    83
Series keys    81
```

The verifier must establish complete canonical-derived field-level equality rather than count-only equality.

## Taiko-specific equality targets

Production must reflect the merged canonical Taiko records:

- bridge `bir_bridge_000031` remains active and now records the May 27, 2024 launch boundary, official bridge URL, itemized affected assets, and unresolved attacker-fund recovery boundary;
- incident `bir_inc_000033` reports about USD 1.75 million from the first-party postmortem, `recovery_status = partial_recovery`, `reimbursement_status = completed`, `restart_status = reopened`, `postmortem_available = available`, and `attack_vector_category = message_verification_failure`;
- existing Taiko events `bir_ev_000151`–`bir_ev_000158` remain the lifecycle timeline, with the exploit event enriched by the new postmortem evidence;
- evidence `bir_src_000326` and `bir_src_000327` are publicly present and correctly linked;
- no duplicate Taiko bridge or duplicate June 2026 incident exists.

## Completion rule

This audit remains pending until the unchanged Production Verification workflow succeeds against `https://bir.badjoke-lab.com`. After success, record the workflow run/job, attempt, observed `generated_at`, exact native/Series counts, and Taiko route/content equality. The verification-only PR is then closed without merge; the permanent checkpoint can be recorded separately if needed.
