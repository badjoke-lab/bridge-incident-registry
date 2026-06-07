# Current Status — Bridge Incident Registry

## Project state

Bridge Incident Registry is in the pre-implementation documentation phase.

## Current milestone

PR-001: project foundation documents.

## Completed

- Repository initialized.
- Project purpose fixed.
- v0.3 pre-implementation specification drafted.
- Visual direction drafted.
- Licensing and attribution position drafted.
- Changelog started.

## Not started

- Astro application setup
- Canonical JSON data files
- Validation script
- Registry pages
- Detail pages
- Methodology page implementation
- Seed records
- Cloudflare Pages deployment

## Current architecture decision

v0 is static-first:

```text
Astro
TypeScript
static JSON
Cloudflare Pages
GitHub pull-request workflow
client-side search and filters
```

v0 does not require:

```text
D1
KV
R2
Pages Functions
Workers API
authentication
wallet connection
on-chain parser
paid APIs
```

## Next planned PR

PR-002: set up Astro static site foundation.

Expected scope:

- Astro project files
- TypeScript configuration
- static build setup
- base page
- global CSS foundation
- no canonical data implementation yet

## Reporting rule

After every merge, report:

1. overall schedule
2. current project position
3. what changed in the merge
4. what is next
