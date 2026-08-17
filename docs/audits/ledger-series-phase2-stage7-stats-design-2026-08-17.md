# BIR Ledger Series Phase 2 — Stage 7 Stats design audit

Date: 2026-08-17

## Authority reviewed

- `docs/ai-era-registry-spec.md`
- `docs/ai-era-execution-schedule.md`
- `docs/operations/current-schedule.md`
- canonical `bridges / incidents / events / evidence`
- Stage 4 record dossiers
- Stage 6 Compare implementation and release gates

## Decision

Stage 7 is a deterministic static `/stats/` surface derived only from canonical BIR records at build time. It does not create a second dataset, does not call an AI model, does not rank bridge safety, and does not infer missing amounts or outcomes.

## Published statistic boundaries

### Registry snapshot

- bridge, incident, event and evidence counts
- unresolved incident count
- major incident count
- numeric loss coverage count

### Loss / recovery / reimbursement

- sum only canonical `reported_loss_usd` numeric fields, explicitly labeled as the sum of recorded canonical numeric incident values rather than a market-wide loss estimate
- recovery status distribution
- reimbursement status distribution
- incidents with explicit reimbursement history

No amount is derived from prose, ranges, conflicting claims or event text.

### Attack vectors and chains

- incident count by canonical `attack_vector_category`
- incident appearances by `affected_chains`
- unknown/unrecorded values remain visible as coverage gaps

### Response timeline

The deterministic timeline metric is **days to the first later recorded lifecycle event** for an incident: the earliest linked canonical event with `event_date > incident_date`. Same-day incident events are excluded. This is a record-timeline measure, not a claim that the event was the operator's first real-world response.

Published buckets:

- 1 day
- 2–7 days
- 8–30 days
- 31–90 days
- 91+ days
- no later recorded event

### Data quality

- primary evidence count/share
- Tier 1 evidence count/share
- archived evidence count/share
- incidents without primary evidence
- incidents with known unknowns
- incidents with conflicting claims
- latest canonical verification date

## Publication integration

`/stats/` is a canonical indexable HTML route and must be included in:

- desktop/mobile/footer navigation
- sitemap/discovery publication and validation
- dist consistency
- SEO validation
- production verification
- release/browser route coverage where route sets are explicit

## Non-goals

- no safety score
- no bridge ranking
- no inferred recovered or reimbursed amount
- no normalization of ambiguous loss claims into a synthetic total
- no client-side live dashboard or external market feed
- no canonical schema change
