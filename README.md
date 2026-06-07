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

The project is in the pre-implementation documentation phase.

See:

- `SPEC.md` for the v0.3 project specification
- `DESIGN.md` for the visual and UI direction
- `LICENSE-NOTE.md` for the current licensing and attribution position
- `docs/runbooks/current-status.md` for the current project state

## Initial architecture target

```text
Astro
TypeScript
static JSON
Cloudflare Pages
GitHub pull-request workflow
client-side search and filters
```

No database, authentication, wallet connection, paid API, or server runtime is required for v0.
