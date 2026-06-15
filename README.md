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

The static registry application, canonical data model, validation pipeline, list/detail pages, methodology pages, and initial seed dataset are implemented.

Phase 2 record expansion is in progress. Three reviewed expansion batches and a first-ten quality-hardening pass are complete.

Current canonical counts:

```text
Bridges     19
Incidents   25
Events      86
Evidence    107
```

Phase 2 Batch 1 added Meter Passport, Allbridge Core, and LI.FI. Batch 2 added ChainSwap, Celer cBridge, and SOCKET Protocol / Bungee. Batch 3 added pNetwork, Rainbow Bridge, and Synapse Protocol. The quality-hardening pass added official aftermath evidence for Wormhole, Nomad, and Harmony.

See:

- `SPEC.md` for the v0.3 project specification
- `DESIGN.md` for the visual and UI direction
- `LICENSE-NOTE.md` for the licensing and attribution position
- `docs/runbooks/current-status.md` for the current project state
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

The canonical data files are validated in CI before merge. No database, authentication, wallet connection, paid API, or server runtime is required for the current version.
