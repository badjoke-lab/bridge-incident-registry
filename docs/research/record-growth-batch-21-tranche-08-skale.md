# Batch 21 tranche 08 — SKALE IMA Bridge 2026

Status: ADD NOW
Baseline main: `a10a7d8bf40faa9c2df6926ee23ffd5c6355392f`
Baseline counts: 81 bridges / 61 incidents / 269 events / 431 evidence

## Duplicate audit

`bir_bridge_000060` already represents SKALE IMA Bridge. Direct incident review found no August 27, 2026 exploit record, so this tranche updates the existing entity and adds a new incident rather than creating a duplicate bridge.

## Canonical allocation

- existing bridge: `bir_bridge_000060` — SKALE IMA Bridge
- incident: `bir_inc_000062` — SKALE IMA Bridge 2026 validator-infrastructure compromise
- events: `bir_ev_000270`–`bir_ev_000271`
- evidence: `bir_src_000433`–`bir_src_000434`

## First-party incident boundary

SKALE's August 28 security update states that at approximately 21:00 UTC on August 27, 2026, infrastructure providers running validator nodes were compromised and the SKALE IMA Bridge was exploited. ERC-20 assets held in affected bridge infrastructure were drained and the bridge was immediately paused.

The incident was contained to the IMA Bridge infrastructure associated with SKALE on Ethereum. SKALE on Base was not affected. The operator also distinguished the incident from the SKL token on Ethereum and staked SKL, which it said remained secured.

## Unknowns preserved

At the admitted evidence horizon:
- total value lost remains under assessment
- affected-wallet inventory is not yet published
- precise attack vector is still under investigation
- recovery amount is unknown
- reimbursement state is unknown
- no dated restoration/reopening of affected IMA functionality is established

Therefore canonical must not infer validator-key theft, a smart-contract bug, loss amount, reimbursement, or reopening.

## Evidence

1. SKALE Network — `Security Incident Update: SKALE IMA Bridge`, 2026-08-28
   - https://www.skale.space/blog/security-incident-update-skale-ima-bridge
   - first-party Tier 1 source for exploit, validator-infrastructure compromise, ERC-20 drain, immediate pause, Ethereum-connected scope and Base non-impact

The same first-party article is attached separately to the exploit and pause events so every new canonical event retains direct primary evidence under the source-quality no-regression gate.

## Modeling guardrails

- keep existing SKALE entity; do not create a second bridge
- update entity status from active to paused because no dated affected-bridge reopening is established
- use `ethereum` + `unknown` in keyed chain fields because the current reference vocabulary has no SKALE/Europa key; preserve `SKALE Europa` in prose
- loss amount remains unknown
- attack-vector category remains unknown
- recovery and reimbursement remain unknown
- SKALE on Base is explicitly outside the affected incident scope

Expected counts after mutation: 81 bridges / 62 incidents / 271 events / 433 evidence.
