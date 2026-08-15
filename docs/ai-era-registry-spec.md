# BIR AI-era Registry Specification

Status: planned / mandatory future-work reference

## Goal
BIR must distinguish itself from incident headlines by preserving the full bridge-incident aftermath with evidence.

## Required work
- Preserve existing canonical/evidence and machine-readable safety rules.
- Track incident lifecycle where evidence exists: exploit -> halt/containment -> root-cause finding -> recovery -> reimbursement -> restart/migration/closure -> current/final state.
- Make loss, recovered amount, reimbursed amount, current state, evidence scope, confidence and last verification explicit when supported; unknown remains unknown.
- Provide deterministic record-level JSON from canonical data and existing public machine-readable layer.
- Strengthen structured filters for chain, bridge/type, attack vector, dates, loss/recovery/reimbursement and current state where supported.
- Add Compare for incidents/bridges using evidence-backed lifecycle outcomes.
- Add Stats for attack vectors, chains, loss/recovery/reimbursement, response timelines, and registry coverage/quality.
- Monitoring may detect candidates but may not promote unreviewed signals into canonical facts.

## Non-goals
No sensational risk scoring, AI-generated canonical claims, investment advice, or chatbot-first interface.

## Mandatory reference
Future BIR research, batches, machine-readable, monitoring, UI, Compare and Stats work must consult this file. Existing stricter source/canonical rules prevail.