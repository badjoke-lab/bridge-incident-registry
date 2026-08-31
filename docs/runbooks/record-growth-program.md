# BIR record growth program

Status: active operating plan
Updated: 2026-08-23

## Problem

Current canonical production state is 42 bridges / 45 incidents / 210 events / 347 evidence. The per-incident depth is acceptable, but historical coverage is not. BIR must not treat the current corpus as a finished registry.

## Goal

Increase breadth aggressively without turning BIR into a thin list. New canonical records must keep the existing entity -> incident -> event -> evidence model, reviewed evidence boundaries, duplicate checks, source-count equality and source-quality no-regression gates.

## Milestones

These are operating targets, not claims about the final universe size.

- Growth A: >=100 bridges / >=120 incidents / >=500 events / >=900 evidence
- Growth B: >=175 bridges / >=250 incidents / >=1,000 events / >=2,000 evidence
- Growth C: >=250 bridges / >=400 incidents / >=1,600 events / >=3,500 evidence

Growth does not stop at Growth C if reviewed historical coverage remains incomplete.

## Candidate universe

Candidate discovery should scan multiple independent sources rather than wait for one-off reports:

- bridge / cross-chain rows from public exploit databases
- security research databases and annual/quarterly loss reports
- Rekt-style incident archives
- protocol / bridge official postmortems and security advisories
- chain explorers and reproducible transaction packages
- existing BIR monitoring signals
- historical bridge shutdown, exploit, reimbursement, restart and migration records

Discovery sources are candidate generators only. Secondary databases do not become canonical evidence merely because they list an incident.

## Batch workflow

Do not grow BIR one isolated record at a time unless the case is unusually complex.

1. Scan 25-50 candidates at once.
2. Classify each candidate as `add_now`, `needs_research`, `pending_thin`, or `out_of_scope_or_duplicate`.
3. Build batches of 5-10 reviewed bridge/incident additions where possible.
4. For each accepted incident, create meaningful lifecycle events, not only an exploit marker.
5. Prefer >=2 independent evidence records for a new incident, with at least one primary source where available; preserve explicit exceptions when historical primary evidence is unavailable.
6. Run duplicate/entity-boundary review before allocating IDs.
7. Apply through bounded PRs with existing schema, enum, source-count, source-quality, build, Series and production verification gates.
8. After merge, run read-only production equality and close the verification PR without merge.

## Priority order

1. Major historical bridge exploits missing from BIR.
2. Repeatedly exploited bridges where BIR currently collapses distinct incidents.
3. Incidents with strong first-party postmortems and clear recovery/reimbursement/restart histories.
4. Smaller historical incidents with reproducible on-chain evidence.
5. Non-loss but historically important pauses, emergency shutdowns, migrations and terminal bridge states.

## Quality boundary

Record growth must not be achieved by:

- importing database rows as canonical facts without review;
- assigning USD losses from price inference when the source does not state them;
- converting reachable UI into proof of restart;
- promoting architecture documentation into incident-specific root cause evidence;
- collapsing distinct incidents to reduce work;
- weakening source-quality ceilings or validators to make a batch pass;
- adding entity-only rows with no meaningful historical event unless there is a documented reason.

## Operating cadence

During backlog reduction, target 2-4 canonical growth batches per week. A normal batch should add roughly 5-10 incidents plus their events/evidence. Complex high-value incidents may remain single-case PRs.

Every 25 newly added incidents, re-run coverage inventory and reprioritize the next candidate pool. The objective is historical coverage, not merely reaching a numeric milestone.
