# Record growth Batch 21 — tranche 03 HECO Bridge review

Review date: 2026-09-04
Baseline main: `75ed4291f056360974d5215f1c30df0494e9e572`
Baseline counts: 77 bridges / 56 incidents / 257 events / 415 evidence.

## Candidate — HECO Bridge / HECO cross-chain gateway (2023-11-22)

Status: **PROVISIONAL ADD — fresh canonical lineage, primary incident statement and independent technical analysis available.**

### Duplicate audit

Direct inspection of `data/bridges.json` and `data/incidents.json` found HECO only as a chain/context reference inside other bridge records. No canonical HECO Bridge entity or November 2023 HECO Bridge incident exists.

### Primary evidence

HTX official notice `HTX and HECO Chain Suffer Cyberattack` states that HTX and HECO Chain were attacked, that an investigation was opened, emergency measures were taken, and HTX deposits/withdrawals plus the HECO Chain gateway were temporarily suspended. The same notice quantifies approximately USD 30 million for HTX hot-wallet impact only.

Boundary: **do not use the HTX USD 30 million hot-wallet figure as the HECO Bridge loss.** The official notice combines HTX and HECO operational response but only quantifies the exchange hot-wallet portion.

### Independent technical evidence

CertiK's `Heco Bridge Exploit` analysis, published 2023-11-23, attributes the HECO Bridge component to compromise of the bridge operator wallet/private key and reports approximately USD 86.6 million for the HECO Bridge portion. Contemporary reporting from The Block independently reports approximately USD 86.6 million drained from the bridge.

### Canonical boundaries

- Entity: HECO Bridge / HECO cross-chain gateway, not HTX exchange hot wallets.
- Incident date: 2023-11-22.
- Attack vector: bridge operator/private-key compromise, based on independent security analysis; the official HTX statement itself did not publish a technical root cause.
- Loss: approximately USD 86.6 million for the bridge portion, from independent technical/contemporaneous reporting; keep HTX hot-wallet loss outside this incident amount.
- Recovery: unknown unless stronger HECO-bridge-specific evidence establishes recovered funds.
- Reimbursement: unknown. HTX's promise to compensate HTX hot-wallet losses must not be generalized to HECO Bridge losses.
- Restart/current bridge outcome: unresolved. HTX later resumed various exchange deposit/withdrawal services, but the reviewed first-party material does not establish a dated unrestricted HECO Bridge restoration.
- HECO has no dedicated BIR chain-reference key at this checkpoint; use the existing conservative `unknown` chain reference alongside Ethereum rather than adding an unreviewed chain dictionary entry.

### Source package

1. HTX official attack notice — primary/Tier 1 for incident confirmation and service suspension.
2. CertiK `Heco Bridge Exploit` — independent Tier 1 technical analysis for operator-key compromise and bridge-loss scope.
3. The Block contemporaneous report — independent corroboration of the bridge-specific approximately USD 86.6 million estimate.

### Provisional allocation

- bridge: `bir_bridge_000078`
- incident: `bir_inc_000057`
- event: `bir_ev_000258` — HECO Bridge exploit detected and affected gateway/services suspended, 2023-11-22
- evidence begins at `bir_src_000416`

Do not allocate a reopening/recovery/compensation event without HECO-bridge-specific primary evidence.
