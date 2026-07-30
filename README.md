# Bridge Incident Registry

A historical registry of cross-chain bridge incidents and their aftermath.

Bridge Incident Registry tracks what happened after bridge incidents: pauses, recoveries, reimbursements, reopenings, migrations, deprecations, and shutdowns.

## What this is

BIR is an evidence-based registry for cross-chain bridge and interoperability infrastructure incidents.

It focuses on:

- bridge entities
- incident cases
- aftermath timelines
- recovery and reimbursement status
- restart, migration, or shutdown outcomes
- evidence and uncertainty

## What this is not

BIR is not:

- a bridge safety ranking
- a real-time exploit alert system
- a trading or investment tool
- a bridge recommendation service
- an exploit reproduction guide

## Current status

The static registry application, four-record canonical model, validation pipeline, canonical public-data layer, metadata, redirects, post-build consistency CI, production-verification gate, and Phase 3 full-corpus audit are implemented.

Phase 2 record expansion is complete through Batch 7. Source-count remediation is complete with permanent exact-equality CI. A source-quality no-regression baseline is active. LI.FI reimbursement correction, Holograph URL-state correction, and event Tier 1 remediation Batches 1 and 2 are production-verified.

The final event Tier 1 migration adds five reviewed records for Rubic, Unizen, Taiko, and Everclear. Canonical evidence is now 284, event primary gaps are 16, and event Tier 1 gaps are six. Every remaining Tier 1 gap is reviewed and intentionally secondary.

Archive-risk metrics count normalized unique source URLs with exact-or-subdomain host matching. Duplicate event-scoped links do not create duplicate preservation obligations.

Production verification compares every transformed field in all four public datasets with the generated public contract. Counts and IDs alone cannot prove publication.

Current canonical counts:

```text
Bridges     33
Incidents   34
Events      183
Evidence    284
```

Current hard states:

```text
Incident source-count mismatches  0
Event source-count mismatches     0
Unknown URL status                0
Events without primary           16
Events without Tier 1             6
Unreviewed event Tier 1 gaps       0
```

The latest completed production verification remains the 279-evidence checkpoint until the 284-evidence state is explicitly verified.

The canonical datasets are the only source of truth:

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
```

## Machine-readable public layer

Each build generates:

```text
/version.json
/data/manifest.json
/data/bridges.json
/data/incidents.json
/data/events.json
/data/evidence.json
/data/reference/chains.json
/data/reference/assets.json
/llms.txt
/ai.txt
```

The generated files derive from canonical JSON, include current record counts and generation metadata, and are checked before the Astro build completes, in the final `dist` tree, and against the live production output.

The live production check requires complete generated-record equality and includes controlled same-count field-drift tests in normal CI.

See `docs/machine-readable-public-layer.md` for the current contract and limits.

## Project documentation

- `SPEC.md` — project specification
- `DESIGN.md` — visual and UI direction
- `LICENSE-NOTE.md` — licensing and attribution position
- `docs/machine-readable-public-layer.md` — public data contract
- `docs/runbooks/current-status.md` — current project state
- `docs/runbooks/recovery-checkpoint.md` — short restart point
- `docs/runbooks/development-roadmap.md` — roadmap to v1
- `docs/runbooks/public-consistency-remediation.md` — completed remediation sequence
- `docs/audits/phase3-source-quality-baseline-2026-07-29.md` — source-quality baseline and ceilings
- `docs/audits/phase3-source-quality-remediation-batch1-2026-07-29.md` — LI.FI first-party correction
- `docs/audits/production-verification-phase3-source-quality-batch1-2026-07-29.md` — LI.FI production audit
- `docs/audits/phase3-url-status-remediation-batch1-2026-07-29.md` — Holograph URL-status correction
- `docs/audits/production-verification-phase3-url-status-batch1-2026-07-29.md` — Holograph and full-content production audit
- `docs/audits/phase3-event-tier1-review-batch1-2026-07-29.md` — event Tier 1 Batch 1 review boundary
- `docs/audits/phase3-event-tier1-canonical-batch1-2026-07-30.md` — Batch 1 canonical migration
- `docs/audits/production-verification-phase3-event-tier1-batch1-2026-07-30.md` — 271-evidence production audit
- `docs/audits/phase3-event-tier1-review-batch2-2026-07-30.md` — event Tier 1 Batch 2 review boundary
- `docs/audits/phase3-event-tier1-canonical-batch2-2026-07-30.md` — Batch 2 canonical migration
- `docs/audits/production-verification-phase3-event-tier1-batch2-2026-07-30.md` — 279-evidence production audit
- `docs/audits/phase3-event-tier1-review-final-2026-07-30.md` — final event Tier 1 review boundary
- `docs/audits/phase3-event-tier1-canonical-final-2026-07-30.md` — final event Tier 1 canonical migration
- `docs/batches/` — reviewed batch scopes

## Architecture

```text
Astro
TypeScript
static JSON
Cloudflare Pages
GitHub pull-request workflow
client-side search and filters
```

Canonical data and generated machine-readable output are validated during the build. Production verification checks complete JSON content, live HTML, metadata, sitemap, robots, redirects, content types, and observable cache behavior. The current version requires no database, authentication, wallet connection, paid API, or server runtime.

## Development rule

Never write canonical data directly to `main`. Candidate research, monitoring output, private notes, and temporary files must remain separate from reviewed canonical records.
