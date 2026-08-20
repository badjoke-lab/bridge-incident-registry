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

Phase 2 record expansion is complete through Batch 7. Source-count remediation is complete with permanent exact-equality CI. A source-quality no-regression baseline is active. Event Tier 1 remediation, the Nerve source review boundary, Archive Capture Batches 1 through 18, and Deferred Archive Retries 01 and 02 are complete and production-verified. Deferred Retries 03–04 exhausted the fresh retry pool without new approvals. Event Primary Remediations 01 and 02 are production-verified. Remediation 02 added three reviewed event-scoped first-party evidence records without introducing new unique source URLs.

Canonical evidence is now 316. Event primary gaps remain 11 and event Tier 1 gaps remain six; the sole incident-level primary/Tier 1 gap remains evidence-blocked rather than being filled by weaker sources. Primary evidence is 224 / 316, Tier 1 evidence is 241 / 316, and 130 evidence records include verified archive URLs. Unique archive-risk queues remain capped at 15 terminal and 16 risky-host URLs.

Archive-risk metrics count normalized unique source URLs with exact-or-subdomain host matching. Duplicate evidence records sharing one source URL do not create duplicate preservation obligations. Current unresolved unarchived queues are 15 terminal unique URLs and 16 risky-host unique URLs.

Archive Batch 18 reviewed all nine remaining previously-unreviewed terminal/risky-host candidate URLs visible to the established reviewer. Four reproducible exact mappings were published for Avalanche Bridge AEB support material, Syndicate exploit reporting, Everclear wind-down reporting, and the renproject GitHub organization. The other five reviewed URLs remain deferred under the same exact replay, temporal fit, minimum-size, and two-run reproducibility requirements.

There is no untouched archive-review Batch 19. Deferred Retries 01–02 recovered three reviewed URLs; Retries 03–04 then exhausted all 12 not-recently-retried fresh URLs without another accepted mapping. The remaining reviewed-unarchived pool has already been explicitly retried under the current boundary and should not be immediately recycled.

Production verification compares every transformed field in all four public datasets with the generated public contract. Counts and IDs alone cannot prove publication. The latest post-Verus read-only verifier again passed complete native field-level equality on its first attempt and also proved the derived Ledger Series adapter across all 82 JSON files. Cloudflare Pages preview deployment remains restricted to `none`.

The public UI/support layer includes expanded incident and bridge discovery, filters, pagination, detail-page TOCs, Support, project navigation, representative desktop/mobile screenshot auditing, Compare, Stats, the shared BadJoke-Lab support-wallet presentation, and the machine-readable Ledger Series adapter.

Current canonical counts:

```text
Bridges     39
Incidents   41
Events      194
Evidence    316
```

Current hard states:

```text
Incident source-count mismatches  0
Event source-count mismatches     0
Unknown URL status                0
Events without primary           11
Events without Tier 1             6
Unreviewed event Tier 1 gaps       0
Evidence with archived_url      130
Terminal unarchived URLs         15
Risky-host unarchived URLs       16
Canonical public content match    true
```

Latest verified production checkpoint:

```text
Canonical data PR       #330
Canonical merge         4ca9065af8072db00408efb5663c797f80972945
Production verify PR    #332 — closed without merge
Production verify       32334410535 / 96321019010
Generated at            2026-08-20T05:06:43.792Z
Publication attempt     1
HTML routes             88
Redirects               80
Bridge dossiers         39 / 39
Incident dossiers       41 / 41
Series records          80 / 80
Series JSON files       82 / 82
Series unique keys      80 / 80
Build-input refresh     not required
```

The canonical datasets are the only source of truth:

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
```

## Machine-readable public layer

Each build generates the native public contract plus the derived Ledger Series adapter, including:

```text
/version.json
/data/manifest.json
/data/bridges.json
/data/incidents.json
/data/events.json
/data/evidence.json
/data/reference/chains.json
/data/reference/assets.json
/data/series/registry.json
/data/series/index.json
/data/series/bridges/*.json
/data/series/incidents/*.json
/llms.txt
/ai.txt
```

The generated files derive from canonical JSON, include current record counts and generation metadata, and are checked before the Astro build completes, in the final `dist` tree, and against the live production output. The Series adapter is derived output; it does not replace the canonical four datasets.

The live production check requires complete generated-record equality and includes controlled same-count field-drift tests in normal CI. When Series output changes, a bounded post-merge verification additionally compares the descriptor, index and every record envelope with exact-main expected output.

See `docs/machine-readable-public-layer.md` for the native contract and `docs/tasks/ledger-series-phase9-adapter.md` for the Series adapter boundary.

## Project documentation

- `SPEC.md` — project specification
- `DESIGN.md` — visual and UI direction
- `LICENSE-NOTE.md` — licensing and attribution position
- `docs/machine-readable-public-layer.md` — public data contract
- `docs/runbooks/current-status.md` — current project state
- `docs/runbooks/recovery-checkpoint.md` — short restart point
- `docs/runbooks/development-roadmap.md` — roadmap to v1
- `docs/runbooks/public-consistency-remediation.md` — completed remediation sequence
- `docs/audits/production-verification-verus-july-series-2026-08-20.md` — current native + Series production checkpoint
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
- `docs/audits/phase3-archive-capture-batch14-review-2026-08-05.md` — Archive Batch 14 reproducible review boundary
- `docs/audits/phase3-archive-capture-batch14-2026-08-05.md` — Archive Batch 14 canonical migration
- `docs/audits/phase3-archive-capture-batch14-deployment-refresh-2026-08-05.md` — Archive Batch 14 deployment refresh
- `docs/audits/production-verification-phase3-archive-capture-batch14-2026-08-05.md` — Archive Batch 14 production audit
- `docs/audits/phase3-archive-capture-batch15-review-2026-08-05.md` — Archive Batch 15 reproducible review boundary
- `docs/audits/phase3-archive-capture-batch15-2026-08-05.md` — Archive Batch 15 canonical migration
- `docs/audits/phase3-archive-capture-batch15-deployment-refresh-2026-08-05.md` — Archive Batch 15 deployment refresh
- `docs/audits/production-verification-phase3-archive-capture-batch15-2026-08-05.md` — Archive Batch 15 production and Pages queue audit
- `docs/audits/phase3-archive-capture-batch16-review-2026-08-09.md` — Archive Batch 16 reproducible review boundary
- `docs/audits/phase3-archive-capture-batch16-2026-08-09.md` — Archive Batch 16 canonical migration
- `docs/audits/production-verification-phase3-archive-capture-batch16-2026-08-09.md` — Archive Batch 16 production audit
- `docs/audits/phase3-archive-capture-batch17-review-2026-08-09.md` — Archive Batch 17 reproducible review boundary
- `docs/audits/phase3-archive-capture-batch17-2026-08-09.md` — Archive Batch 17 canonical migration
- `docs/audits/production-verification-phase3-archive-capture-batch17-2026-08-09.md` — Archive Batch 17 production audit
- `docs/audits/phase3-archive-capture-batch18-review-2026-08-09.md` — Archive Batch 18 final previously-unreviewed review boundary
- `docs/audits/phase3-archive-capture-batch18-2026-08-09.md` — Archive Batch 18 canonical migration
- `docs/audits/phase3-archive-capture-batch18-deployment-refresh-2026-08-09.md` — Archive Batch 18 single deployment refresh boundary
- `docs/audits/production-verification-phase3-archive-capture-batch18-2026-08-09.md` — Archive Batch 18 production audit
- `docs/audits/phase3-archive-deferred-retry-01-review-2026-08-09.md` — Deferred Archive Retry 01 reproducible review
- `docs/audits/phase3-archive-deferred-retry-01-2026-08-09.md` — Deferred Archive Retry 01 canonical migration
- `docs/audits/production-verification-phase3-archive-deferred-retry-01-2026-08-09.md` — Deferred Archive Retry 01 production audit
- `docs/audits/phase3-archive-deferred-retry-02-review-2026-08-09.md` — Deferred Archive Retry 02 reproducible review
- `docs/audits/phase3-archive-deferred-retry-02-canonical-2026-08-09.md` — Deferred Archive Retry 02 canonical migration
- `docs/audits/production-verification-deferred-archive-retry-02-2026-08-09.md` — Deferred Archive Retry 02 production audit
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

Canonical data and generated machine-readable output are validated during the build. Production verification checks complete JSON content, live HTML, metadata, sitemap, robots, redirects, content types, observable cache behavior, and applicable Series adapter equality. The current version requires no database, authentication, wallet connection, paid API, or server runtime.

## Development rule

Never write canonical data directly to `main`. Candidate research, monitoring output, private notes, and temporary files must remain separate from reviewed canonical records.