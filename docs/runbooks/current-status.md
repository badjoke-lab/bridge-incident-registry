# Current Status — Bridge Incident Registry

## Project state

Bridge Incident Registry is in Phase 2 record expansion.

The static application foundation, canonical data model, validation pipeline, registry UI, methodology pages, and initial seed dataset are implemented.

Two reviewed record-expansion batches and an early first-ten quality-hardening pass are complete.

## Current milestone

Phase 2 Batch 2 completed and merged through PR #40.

Latest data merge:

```text
PR #40
c361d88a356bd924f9eb4433de010d4143bbf45a
```

## Current canonical counts

```text
Bridges     16
Incidents   20
Events      65
Evidence    84
```

## Completed

### Foundation and design

- Repository initialized.
- Project purpose fixed.
- v0.3 specification added.
- Deep Navy Archive visual direction implemented.
- Licensing and attribution position documented.
- Astro static site foundation implemented.
- Shared layout and reusable UI components implemented.
- Cloudflare Pages deployment configured.

### Canonical registry implementation

- Canonical bridge, incident, event, and evidence JSON files implemented.
- Chain and asset reference dictionaries implemented.
- TypeScript data loader implemented.
- Canonical validation script implemented.
- Duplicate and reference-integrity checks implemented.
- Astro/type checks and static build integrated into CI.
- Bridge and incident list pages implemented.
- Bridge and incident detail pages implemented.
- Methodology and About pages implemented.
- Search and filtering foundation implemented.

### Initial records and Phase 1 seed coverage

The initial reviewed dataset includes major bridge and interoperability cases such as:

- Ronin Bridge
- Wormhole
- Nomad Bridge
- Harmony Horizon Bridge
- Poly Network
- BSC Token Hub
- Multichain
- Orbit Bridge
- QBridge
- THORChain

### Phase 2 Batch 1

Merged records:

- Meter Passport
- Allbridge Core
- LI.FI

Added:

```text
Bridges     +3
Incidents   +4
Events      +13
Evidence    +15
```

Reference additions:

- BUSD
- Meter Network

### First-ten quality hardening

The four remaining non-blocking audit warnings were resolved.

- added official Wormhole incident and restoration evidence
- added Nomad root-cause, recovery, and restricted-relaunch evidence
- corrected Nomad from `dead` to `limited`
- added Harmony official incident and continuing-recovery evidence
- changed Harmony reimbursement status from `unknown` to `in_progress`
- increased events from 47 to 51
- increased evidence from 62 to 70

This was an early Phase 3-quality task brought forward during Phase 2.

### Phase 2 Batch 2

Merged records:

- ChainSwap
- Celer cBridge
- SOCKET Protocol / Bungee

Added:

```text
Bridges     +3
Incidents   +4
Events      +14
Evidence    +14
```

Incident patterns added:

- repeated bridge-contract exploitation
- DNS/frontend hijacking
- approval exploit with partial fund recovery

Key modeling decisions:

- ChainSwap's two July 2021 incidents remain separate.
- Celer's incident is classified as a frontend/DNS compromise rather than an underlying bridge-contract compromise.
- Bungee remains product and alias context under the SOCKET canonical entity.
- SOCKET's reported loss and recovered 1,032 ETH are stored separately.
- unresolved compensation and distribution claims remain explicitly unresolved.

All temporary generation tooling was removed before merge. The final canonical branch passed data validation, the first-ten audit, Astro/type checks, and the static build.

## Current architecture decision

BIR remains static-first:

```text
Astro
TypeScript
static JSON
Cloudflare Pages
GitHub pull-request workflow
client-side search and filters
```

The current version does not require:

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

## Current visual decision

The site uses a Deep Navy Archive palette:

```text
Deep navy background
Muted brass accent
Archival blue links
Subdued status colors
No pure-black default identity
No neon crypto styling
Notice blocks use navy/info styling, not warning styling
```

## Current phase

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          in progress
         Batch 1                                   complete
         Batch 2                                   complete
         Batch 3                                   next
Phase 3  Coverage and quality strengthening        first slice complete early
Phase 4  Machine-readable public layer             not started
Phase 5  Monitoring and candidate collection       not started
```

## Next planned work

Phase 2 Batch 3:

1. select a balanced candidate batch
2. verify entity boundaries and duplicates
3. collect primary and strong secondary evidence
4. model bridge, incident, event, and evidence records
5. validate through the standard CI path
6. review and merge

## Reporting rule

After every merge, report:

1. overall schedule
2. current project position
3. what changed in the merge
4. what is next
