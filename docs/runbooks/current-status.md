# Current Status — Bridge Incident Registry

## Project state

Bridge Incident Registry is in the static application foundation phase.

## Current milestone

PR-002: Astro static site foundation.

## Completed

- Repository initialized.
- PR-001 merged: project foundation documents.
- Project purpose fixed.
- v0.3 pre-implementation specification added.
- Visual direction added.
- Licensing and attribution note added.
- Changelog started.
- Astro project configuration added.
- Base layout and global CSS foundation added.
- Placeholder routes added for home, bridges, incidents, methodology, and about.

## Not started

- Canonical JSON data files
- Reference dictionaries
- Validation script
- Data loader
- Real registry tables
- Detail pages
- Methodology page full implementation
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

PR-003: shared layout and base UI components.

Expected scope:

- reusable header / footer refinement if needed
- route-level placeholder polish
- base chips and utility components
- no canonical data implementation yet

## Reporting rule

After every merge, report:

1. overall schedule
2. current project position
3. what changed in the merge
4. what is next
