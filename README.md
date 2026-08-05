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

Phase 2 record expansion is complete through Batch 7. Source-count remediation is complete with permanent exact-equality CI. A source-quality no-regression baseline is active. Event Tier 1 remediation, the Nerve source review boundary, and Archive Capture Batches 1 through 13 are complete and production-verified.

Evidence remains 284. Event primary gaps are 16, event Tier 1 gaps are six, and all remaining Tier 1 gaps are reviewed and intentionally secondary. Ninety-four evidence records now publish sixty-two verified Wayback snapshots.

Archive-risk metrics count normalized unique source URLs with exact-or-subdomain host matching. Duplicate evidence records sharing one source URL do not create duplicate preservation obligations. Current unarchived queues are 36 terminal unique URLs and 27 risky-host unique URLs.

Archive Batch 13 added three exact snapshots to the SlowMist Transit Swap analysis, SOCKET recovery update, and Transit Finance recovery update. Holograph and Unizen exact replays remained below the permanent size boundary; Taiko, Syndicate Commons, and Everclear returned no accepted exact capture. Replay validity and claim-time compatibility remain mandatory.

Production verification compares every transformed field in all four public datasets with the generated public contract. Counts and IDs alone cannot prove publication. Batch 13 remained on the prior same-count evidence content for an initial twenty-attempt job. After one behavior-neutral build-input refresh, the unchanged verifier continued to reject the old build through attempt 19 and converged at attempt 20, confirming all ninety-four `archived_url` fields.

Current canonical and production counts:

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
Evidence with archived_url       94
Terminal unarchived URLs         36
Risky-host unarchived URLs       27
Canonical public content match    true
```

Latest verified production checkpoint:

```text
Canonical merge      ab0b45fb1f1cbe6cdddd1238c37fb99f201c934f
Build-input refresh  15472395efdb4435380dbd0fdae8c7fe71e54b06
Production run       30970746866
Production job       92194294438
Generated at         2026-08-05T03:00:56.755Z
Publication attempt  20
HTML routes          72
Redirects            74
```

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
- `docs/audits/phase3-event-tier1-review-final-2026-07-30.md` — final event Tier 1 review boundary
- `docs/audits/phase3-event-tier1-canonical-final-2026-07-30.md` — final event Tier 1 canonical migration
- `docs/audits/production-verification-phase3-event-tier1-final-2026-07-31.md` — 284-evidence production audit
- `docs/audits/phase3-nerve-bridge-source-review-2026-07-31.md` — reviewed Nerve source boundary
- `docs/audits/phase3-archive-capture-batch1-2026-07-31.md` — Archive Batch 1 canonical migration
- `docs/audits/production-verification-phase3-archive-capture-batch1-2026-07-31.md` — Archive Batch 1 production audit
- `docs/audits/phase3-archive-capture-batch2-review-2026-08-01.md` — Archive Batch 2 reviewed mappings
- `docs/audits/phase3-archive-capture-batch2-2026-08-01.md` — Archive Batch 2 canonical migration
- `docs/audits/production-verification-phase3-archive-capture-batch2-2026-08-01.md` — Archive Batch 2 production audit
- `docs/audits/phase3-archive-capture-batch3-review-2026-08-01.md` — Archive Batch 3 reviewed mappings
- `docs/audits/phase3-archive-capture-batch3-2026-08-01.md` — Archive Batch 3 canonical migration
- `docs/audits/production-verification-phase3-archive-capture-batch3-2026-08-01.md` — Archive Batch 3 production audit
- `docs/audits/phase3-archive-capture-batch4-review-2026-08-01.md` — Archive Batch 4 reviewed mappings
- `docs/audits/phase3-archive-capture-batch4-2026-08-01.md` — Archive Batch 4 canonical migration
- `docs/audits/production-verification-phase3-archive-capture-batch4-2026-08-01.md` — Archive Batch 4 production audit
- `docs/audits/phase3-archive-capture-batch5-review-2026-08-01.md` — Archive Batch 5 reviewed mappings
- `docs/audits/phase3-archive-capture-batch5-2026-08-01.md` — Archive Batch 5 canonical migration
- `docs/audits/production-verification-phase3-archive-capture-batch5-2026-08-01.md` — Archive Batch 5 production audit
- `docs/audits/phase3-archive-capture-batch6-review-2026-08-02.md` — Archive Batch 6 reviewed mappings
- `docs/audits/phase3-archive-capture-batch6-2026-08-02.md` — Archive Batch 6 canonical migration
- `docs/audits/phase3-archive-capture-batch6-deployment-retrigger-2026-08-02.md` — Archive Batch 6 deployment retrigger
- `docs/audits/production-verification-phase3-archive-capture-batch6-2026-08-02.md` — Archive Batch 6 production audit
- `docs/audits/phase3-archive-capture-batch7-review-2026-08-02.md` — Archive Batch 7 reviewed mappings
- `docs/audits/phase3-archive-capture-batch7-2026-08-02.md` — Archive Batch 7 canonical migration
- `docs/audits/production-verification-phase3-archive-capture-batch7-2026-08-02.md` — Archive Batch 7 production audit
- `docs/audits/phase3-archive-capture-batch8-review-2026-08-02.md` — Archive Batch 8 reviewed mappings
- `docs/audits/phase3-archive-capture-batch8-2026-08-02.md` — Archive Batch 8 canonical migration
- `docs/audits/production-verification-phase3-archive-capture-batch8-2026-08-02.md` — Archive Batch 8 production audit
- `docs/audits/phase3-archive-capture-batch9-review-2026-08-02.md` — Archive Batch 9 reviewed mapping
- `docs/audits/phase3-archive-capture-batch9-2026-08-02.md` — Archive Batch 9 canonical migration
- `docs/audits/production-verification-phase3-archive-capture-batch9-2026-08-03.md` — Archive Batch 9 production audit
- `docs/audits/phase3-archive-capture-batch10-review-2026-08-03.md` — Archive Batch 10 reviewed mappings
- `docs/audits/phase3-archive-capture-batch10-2026-08-03.md` — Archive Batch 10 canonical migration
- `docs/audits/phase3-archive-capture-batch10-deployment-retrigger-2026-08-03.md` — Archive Batch 10 deployment retrigger
- `docs/audits/production-verification-phase3-archive-capture-batch10-2026-08-03.md` — Archive Batch 10 production audit
- `docs/audits/phase3-archive-capture-batch11-review-2026-08-03.md` — Archive Batch 11 reviewed mapping
- `docs/audits/phase3-archive-capture-batch11-2026-08-03.md` — Archive Batch 11 canonical migration
- `docs/audits/phase3-archive-capture-batch11-deployment-retrigger-2026-08-03.md` — Archive Batch 11 deployment audit
- `docs/audits/production-verification-phase3-archive-capture-batch11-2026-08-03.md` — Archive Batch 11 production audit
- `docs/audits/phase3-archive-capture-batch12-review-2026-08-03.md` — Archive Batch 12 reviewed mappings and temporal-fit boundary
- `docs/audits/phase3-archive-capture-batch12-2026-08-03.md` — Archive Batch 12 canonical migration
- `docs/audits/phase3-archive-capture-batch12-deployment-refresh-2026-08-03.md` — Archive Batch 12 deployment refresh and delayed convergence
- `docs/audits/production-verification-phase3-archive-capture-batch12-2026-08-03.md` — Archive Batch 12 production audit
- `docs/audits/phase3-archive-capture-batch13-review-2026-08-05.md` — Archive Batch 13 reviewed mappings and validator reconciliation
- `docs/audits/phase3-archive-capture-batch13-2026-08-05.md` — Archive Batch 13 canonical migration
- `docs/audits/phase3-archive-capture-batch13-deployment-refresh-2026-08-05.md` — Archive Batch 13 deployment refresh
- `docs/audits/production-verification-phase3-archive-capture-batch13-2026-08-05.md` — Archive Batch 13 production audit
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
