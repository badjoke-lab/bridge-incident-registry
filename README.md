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

The static registry application, canonical data model, validation pipeline, list/detail pages, methodology pages, and five reviewed expansion batches are implemented.

Phase 2 Batch 6 scope is complete, but canonical record expansion is temporarily paused while the project completes an emergency public-consistency remediation.

Current canonical counts:

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

The canonical datasets are the only source of truth:

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
```

The remediation will ensure that human-facing HTML, AI and search discovery, public JSON, metadata, sitemap output, redirects, and CI all derive from the same canonical input.

See:

- `SPEC.md` for the v0.3 project specification
- `DESIGN.md` for the visual and UI direction
- `LICENSE-NOTE.md` for the licensing and attribution position
- `docs/runbooks/current-status.md` for the current project state
- `docs/runbooks/recovery-checkpoint.md` for the short restart point
- `docs/runbooks/development-roadmap.md` for the roadmap to v1
- `docs/runbooks/public-consistency-remediation.md` for the blocking seven-PR consistency plan
- `docs/batches/` for reviewed batch scopes

## Architecture

```text
Astro
TypeScript
static JSON
Cloudflare Pages
GitHub pull-request workflow
client-side search and filters
```

Canonical data is validated in CI before merge. The current version requires no database, authentication, wallet connection, paid API, or server runtime.

## Development hold

Do not merge new canonical record batches until the public-consistency remediation and production verification are complete.

The parked `phase2-batch6-records` branch must not receive new canonical writes during this hold.
