# Changelog

All notable project changes should be recorded here after merge.

## Unreleased

### Added

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

### Changed

- Project status advanced from pre-implementation to Phase 2 record expansion
- CI now validates canonical data, runs Astro/type checks, audits the first ten seeds, and builds the static site
- Nomad Bridge reclassified from `dead` to `limited` recovery-oriented operation
- Harmony reimbursement status changed from `unknown` to `in_progress`
- First-ten canonical audit warnings reduced from four to zero
- Celer cBridge's 2022 incident classified as a frontend/DNS compromise rather than a bridge-contract compromise
- Bungee modeled as product and alias context under the SOCKET canonical entity
- Reported loss and recovered-fund amounts kept separate for SOCKET

### Data counts

```text
Bridges     16
Incidents   20
Events      65
Evidence    84
```
