# Current Status — Bridge Incident Registry

## Project state

Bridge Incident Registry is in Phase 2 record expansion.

The static application foundation, canonical data model, validation pipeline, registry UI, methodology pages, and initial seed dataset are implemented.

A first-ten quality-hardening pass was completed before Phase 2 Batch 2 to resolve the remaining audit warnings and correct aftermath states.

## Current milestone

Phase 2 Batch 1 and the first-ten aftermath/source enrichment are complete.

Latest merge:

```text
PR #36
a0266abab5c57edd7109d1b65302c024a0b1e3ea
```

## Current canonical counts

```text
Bridges     13
Incidents   16
Events      51
Evidence    70
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
- BNB Bridge
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

The temporary deterministic batch generator and temporary workflow modifications were removed after the validated canonical files were committed.

### First-ten quality hardening

The four remaining non-blocking audit warnings were resolved.

- added official Wormhole incident and restoration evidence
- added Nomad root-cause, recovery, and restricted-relaunch evidence
- corrected Nomad from `dead` to `limited`
- added Harmony official incident and continuing-recovery evidence
- changed Harmony reimbursement status from `unknown` to `in_progress`
- increased events from 47 to 51
- increased evidence from 62 to 70

This was an early Phase 3-quality task brought forward before Phase 2 Batch 2. It does not replace the ongoing Phase 2 record-expansion track.

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
         Batch 2                                   next
Phase 3  Coverage and quality strengthening        first slice complete early
Phase 4  Machine-readable public layer             not started
Phase 5  Monitoring and candidate collection       not started
```

## Next planned work

Phase 2 Batch 2:

1. select a balanced candidate batch
2. verify scope and duplicates against canonical data
3. collect primary and strong secondary evidence
4. model bridge, incident, event, and evidence records
5. open a draft PR
6. validate, review, and merge

## Reporting rule

After every merge, report:

1. overall schedule
2. current project position
3. what changed in the merge
4. what is next
