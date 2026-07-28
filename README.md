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

The static registry application, four-record canonical model, validation pipeline, list/detail pages, methodology pages, canonical public-data layer, metadata, redirects, post-build consistency CI, production-verification gate, and Phase 3 full-corpus audit are implemented.

Phase 2 record expansion is complete through Batch 7. Phase 3 reimbursement and restart normalization is production-verified with zero reimbursement or reopening warnings. The `source_count` contract is fixed, and the 13 safe derived-count corrections are merged and production-verified. Forty-seven event evidence-link mismatches remain for bounded source review.

Current canonical counts:

```text
Bridges     33
Incidents   34
Events      183
Evidence    211
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

The generated files derive from canonical JSON, include current record counts and generation metadata, and are checked before the Astro build completes and again in the final `dist` tree.

They are build products rather than independently maintained source files.

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
- `docs/audits/production-verification-2026-07-28.md` — initial production verification result
- `docs/audits/full-corpus-quality-baseline-2026-07-28.md` — Phase 3 audit baseline
- `docs/audits/phase3-aftermath-source-resolution-2026-07-28.md` — first aftermath boundary
- `docs/audits/phase3-aftermath-canonical-2026-07-28.md` — first canonical migration record
- `docs/audits/production-verification-phase3-aftermath-2026-07-28.md` — first aftermath production audit
- `docs/audits/phase3-final-restart-source-resolution-2026-07-28.md` — final restart-warning boundary
- `docs/audits/phase3-final-restart-canonical-2026-07-28.md` — final restart canonical record
- `docs/audits/production-verification-phase3-final-restart-2026-07-28.md` — final restart production audit
- `docs/audits/phase3-source-count-contract-2026-07-28.md` — source-count field contract
- `docs/audits/phase3-source-count-mechanical-2026-07-28.md` — safe count migration record
- `docs/audits/production-verification-phase3-source-count-mechanical-2026-07-28.md` — source-count production audit
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

Canonical data and generated machine-readable output are validated during the build. Production verification checks live HTML, JSON, metadata, sitemap, robots, redirects, content types, and observable cache behavior. The current version requires no database, authentication, wallet connection, paid API, or server runtime.

## Development rule

Never write canonical data directly to `main`. Candidate research, monitoring output, private notes, and temporary files must remain separate from reviewed canonical records.
