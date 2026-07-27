# Changelog

All notable project changes should be recorded here after merge.

## Unreleased

### Added

- Phase 2 Batch 7 records for Taiko Bridge, Everclear / Connext, and Commons Bridge
- Two incident cases covering message-proof exploitation and a route-specific bridge proxy compromise
- SYND, CLEAR, and NEXT asset reference definitions

- Phase 2 Batch 6B records for Rubic and Unizen
- Three incident cases covering a deprecated native-bridge wallet compromise and two aggregator approval exploits
- RBC and BRBC asset reference definitions

- Phase 2 Batch 6A records for Transit Swap and Magpie Protocol / Fly
- Two aggregator routing and approval incident cases with attacker-return, reimbursement, pause, relaunch, and current-state evidence

- Astro static registry application foundation
- Deep Navy Archive visual system
- Canonical bridge, incident, event, and evidence JSON datasets
- Chain and asset reference dictionaries
- Canonical validation and CI checks
- Bridge and incident list/detail pages
- Methodology and About pages
- Initial reviewed bridge incident seed dataset
- Phase 2 Batch 1 records for Meter Passport, Allbridge Core, and LI.FI
- BUSD and Meter Network reference definitions
- Official Wormhole incident and restoration evidence
- Nomad root-cause, recovery, and restricted-relaunch evidence
- Harmony official incident and continuing-recovery evidence
- Phase 2 Batch 2 records for ChainSwap, Celer cBridge, and SOCKET Protocol / Bungee
- Four Batch 2 incident records covering repeated exploits, DNS/frontend hijacking, and approval-related exploitation
- Phase 2 Batch 3 records for pNetwork, Rainbow Bridge, and Synapse Protocol
- Five Batch 3 incident records covering wrapped-asset collateral theft, contract-control misconfiguration, fabricated light-client blocks, and metapool manipulation
- NEAR, Aurora, GALA, and nUSD reference definitions
- Phase 2 Batch 4 records for NerveNetwork, historical Holograph Protocol, and the Inter-Blockchain Communication Protocol
- Two Batch 4 incident records covering metapool liquidity extraction and unauthorized omnichain token minting
- IBC Dragonberry and Huckleberry security-response timelines as non-exploited event records
- NerveNetwork, Mantle, Cosmos interchain, fUSDT, UST, and HLG reference definitions
- Phase 2 Batch 5 records for Ren Protocol, Avalanche-Ethereum Bridge, Avalanche Bridge, and ShuttleFlow
- Twenty Batch 5 lifecycle and migration events
- Conflux Core Space, Conflux eSpace, renBTC, and CFX reference definitions
- Public-consistency remediation runbook covering canonical-derived output, machine-readable endpoints, metadata, redirects, CI, and production verification
- Canonical-derived staging generation with record counts, verification metadata, and human-page links
- Machine-readable version, manifest, canonical record, reference, and guidance endpoints
- Machine-readable count, ID, origin, schema, reference, and canonical-only checks
- Production canonical links, alternate discovery links, Open Graph metadata, JSON-LD, sitemap, robots policy, and preview noindex controls
- Canonical-derived Cloudflare redirects for legacy bridge and incident slugs
- Redirect checks for collisions, conflicts, missing targets, loops, output drift, and sitemap exclusion
- Post-build `dist` consistency checks across canonical and public JSON, HTML routes, metadata, JSON-LD, sitemap, robots, redirects, documentation counts, and publication boundaries
- Controlled failure fixtures for count, ID, metadata, route, sitemap, and non-canonical publication mismatches

### Changed

- Project status advanced from pre-implementation to Phase 2 record expansion
- CI now validates canonical data, runs Astro/type checks, audits the first ten seeds, builds the static site, and checks the final `dist` output
- Nomad Bridge reclassified from `dead` to `limited` recovery-oriented operation
- Harmony reimbursement status changed from `unknown` to `in_progress`
- First-ten canonical audit warnings reduced from four to zero
- Celer cBridge's 2022 incident classified as a frontend/DNS compromise rather than a bridge-contract compromise
- Bungee modeled as product and alias context under the SOCKET canonical entity
- Reported loss and recovered-fund amounts kept separate for SOCKET
- pNetwork v2 classified as `deprecated` from its official end-of-life notice
- pGALA whitehat-recovered BNB separated from bridge collateral loss
- Rainbow Bridge attacker bond losses separated from bridge and user losses
- Synapse's approximately $8.2 million nUSD protected exposure separated from realized loss
- NerveNetwork made canonical with Nerve Bridge retained as application and alias context
- Historical Holograph Protocol classified as `inactive` after its same-domain documentation changed to an unrelated product direction
- Holograph unauthorized minted supply, sold supply, frozen supply, and burned supply kept as separate quantities
- IBC made canonical with ibc-go retained as implementation context
- Dragonberry and Huckleberry modeled as security-response events rather than exploited-fund incidents
- Phase 2 Batch 6 canonical implementation paused until public HTML, machine-readable data, metadata, redirects, and CI share one canonical source
- Project status and recovery documents reset so older 22 / 27 / 103 / 125 counts are no longer presented as current
- Embedded commit SHAs reclassified as historical checkpoints rather than live branch pointers
- Static builds now generate and validate machine-readable public output, search discovery, indexing policy, and legacy redirects before Astro runs

### Data counts

```text
Bridges     33
Incidents   34
Events      173
Evidence    199
```
