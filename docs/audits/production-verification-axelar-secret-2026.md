# Production verification — Axelar–Secret June 2026 incident

Status: pending read-only production verification  
Verification date: 2026-08-21  
Canonical merge: `7a2b051445b1248c4a6a46c8e337ef52d3cd78bd`  
Canonical PR: #348  
Issue: #346

## Purpose

Verify the exact post-merge `main` against `https://bir.badjoke-lab.com` after adding the Axelar–Secret IBC Bridge / Secret Tunnel June 2026 incident. This audit is read-only.

No production mutation, deployment trigger, scheduler change, public-reader change, canonical JSON change, route change, or verifier relaxation is authorized by this audit PR.

## Expected canonical state

```text
Bridges         40
Incidents       43
Events          203
Evidence        335
HTML routes      91
Redirects        84
Series records   83
Series JSON      85
Series keys      83
```

The verifier must establish canonical-derived field-level equality rather than count-only equality.

## Axelar–Secret equality targets

- bridge `bir_bridge_000040` / `axelar-secret-ibc-bridge` is present with `status = paused`;
- incident `bir_inc_000043` / `axelar-secret-ibc-bridge-2026-source-channel-validation-exploit` is present;
- the incident reports approximately USD 4.67 million, `attack_vector_category = message_verification_failure`, `recovery_status = none`, `reimbursement_status = announced`, `restart_status = not_reopened`, and remains unresolved;
- events `bir_ev_000200`–`bir_ev_000203` and evidence `bir_src_000328`–`bir_src_000335` are present and linked;
- Axelar governance Proposal #490 remains represented only as non-binding reimbursement/recustody intent, not completed recovery;
- no duplicate bridge or June 2026 incident exists;
- the Phase 9 Stage 5 relationship-authority config merged immediately before #348 remains present in exact main and must not be lost.

## Completion rule

This audit remains pending until the unchanged native Production Verification workflow succeeds and the complete Series adapter passes semantic equality against exact-main build output, normalizing only environment-specific `generated_at`. After success, record the run/job IDs, attempt, observed `generated_at`, exact native/Series counts, Axelar–Secret route/content checks, close the verification-only PR without merge, then close Issue #346.
