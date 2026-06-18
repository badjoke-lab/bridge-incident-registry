# Current Status — Bridge Incident Registry

## Project state

Bridge Incident Registry is in Phase 2 record expansion.

The static application foundation, canonical data model, validation pipeline, registry UI, methodology pages, and initial seed dataset are implemented.

Five reviewed record-expansion batches and an early first-ten quality-hardening pass are complete.

## Current milestone

Phase 2 Batch 5 canonical implementation is complete on the current branch.

## Current canonical counts

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
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

Key modeling decisions:

- ChainSwap's two July 2021 incidents remain separate.
- Celer's incident is classified as a frontend/DNS compromise rather than an underlying bridge-contract compromise.
- Bungee remains product and alias context under the SOCKET canonical entity.
- SOCKET's reported loss and recovered 1,032 ETH are stored separately.

### Phase 2 Batch 3

Merged records:

- pNetwork / pTokens
- Rainbow Bridge
- Synapse Protocol

Added:

```text
Bridges     +3
Incidents   +5
Events      +21
Evidence    +23
```

Reference additions:

- NEAR
- Aurora
- GALA
- nUSD

Key modeling decisions:

- pNetwork is canonical and `pTokens` remains alias/product context.
- pNetwork v2 is `deprecated` based on its official end-of-life notice.
- the 277 BTC pBTC-on-BSC loss remains asset-denominated.
- pGALA bridge collateral loss remains separate from the 12,977 BNB whitehat recovery.
- Rainbow Bridge's May and August 2022 attempts remain separate incidents.
- Rainbow attacker bond losses are not user or bridge losses.
- privately reported Rainbow vulnerabilities are security events rather than exploited incidents.
- Synapse's approximately $8.2 million nUSD amount is protected exposure rather than realized loss.
- Synapse and the separately operated NerveNetwork entity remain distinct.

### Phase 2 Batch 4

Merged records:

- NerveNetwork / Nerve Bridge
- historical Holograph Protocol
- Inter-Blockchain Communication Protocol / ibc-go

Added:

```text
Bridges     +3
Incidents   +2
Events      +17
Evidence    +18
```

Reference additions:

- NerveNetwork
- Mantle
- Cosmos interchain
- fUSDT
- UST
- HLG

Incident and response patterns added:

- successful metapool liquidity extraction
- unauthorized omnichain token minting
- protocol lock and account-freeze response
- staged token-burn recovery plan
- ecosystem-wide critical vulnerability disclosure
- confidential validator and chain-team patch coordination
- multi-release-line security remediation

Key modeling decisions:

- `NerveNetwork` is canonical; `Nerve Bridge` remains application and alias context.
- NerveNetwork remains distinct from Synapse Protocol despite related metapool code lineage and historical naming overlap.
- the Nerve attacker amount remains approximately 900 BNB rather than an imposed fiat conversion.
- no stable official Nerve postmortem or reimbursement statement was located, so the incident remains medium confidence and unresolved.
- historical Holograph Protocol remains within scope because the compromised Operator contract was part of its omnichain token infrastructure.
- Holograph is classified as `inactive`; the current same-domain creator-coin trading terminal is not asserted as a canonical successor.
- one billion unauthorized HLG minted is not treated automatically as one billion HLG of realized loss.
- minted, sold, frozen, recovered, and burned HLG quantities remain separate.
- IBC is canonical; ibc-go remains implementation context under the protocol entity.
- Dragonberry and Huckleberry are security-response events, not exploited-fund incident records.
- official IBC sources report no known user-fund loss from those vulnerabilities.

All temporary generation and diagnostic tooling was removed before final review. The canonical branch passed data validation, the first-ten audit, Astro/type checks, and the static build.

### Phase 2 Batch 5

Added records:

- Ren Protocol / RenVM / RenBridge
- Avalanche-Ethereum Bridge / AEB
- Avalanche Bridge
- ShuttleFlow

Added:

```text
Bridges     +4
Incidents   +0
Events      +20
Evidence    +23
```

Reference additions:

- Conflux Core Space
- Conflux eSpace
- renBTC
- CFX

Key decisions:

- Ren Protocol is canonical; RenVM and RenBridge remain context.
- Ren 2.0 is not treated as a launched successor without public mainnet evidence.
- Ren 1.0 ending is an event-only timeline.
- AEB and Avalanche Bridge are separate predecessor and successor entities.
- legacy AEB token upgrades do not make AEB active.
- ShuttleFlow bridge operations ended before its residual claim interface closed.
- Zero Gravity remains successor context without a canonical relationship ID.

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

## Current phase

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          in progress
         Batch 1                                   complete
         Batch 2                                   complete
         Batch 3                                   complete
         Batch 4                                   complete
         Batch 5                                   complete
         Batch 6                                   next
         Batch 7                                   planned
Phase 3  Coverage and quality strengthening        first slice complete early
Phase 4  Machine-readable public layer             not started
Phase 5  Monitoring and candidate collection       not started
Release  v1 hardening                              not started
```

## Next planned work

Phase 2 Batch 6 scope:

1. select interface, router, approval, and aggregator candidates
2. distinguish underlying bridge events from interface-path events
3. fix entity and incident boundaries in a docs-only scope pull request
4. define evidence and completion gates before canonical implementation

## Reporting rule

After every merge, report:

1. overall schedule
2. current project position
3. what changed in the merge
4. what is next
