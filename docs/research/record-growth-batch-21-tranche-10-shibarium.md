# Batch 21 — tranche 10 review: Shibarium PoS Bridge 2025

Status: ADD candidate after direct canonical duplicate audit.

## Entity boundary

- Canonical entity: **Shibarium PoS Bridge**.
- Scope is the native Proof-of-Stake bridge path between Ethereum and Shibarium, not Shibarium L2 generally and not the separate Plasma Bridge path.
- Official Shiba Inu documentation distinguishes the PoS and Plasma bridge mechanisms and describes PoS withdrawals as validator/checkpoint based.
- Current BIR chain vocabulary has no dedicated Shibarium key. Preserve Shibarium in prose and use `ethereum` + `unknown` in keyed chain fields; do not add a new chain key in this growth tranche.

## Incident boundary

- Date: 2025-09-12.
- Official Shib.io recovery material states the Shibarium bridge suffered a major security breach at 18:44 UTC and that unauthorized validator signing power was used to withdraw multiple assets.
- Contemporaneous reporting and later Shiba Inu ecosystem reporting describe compromised validator signing authority and a malicious checkpoint/exit path.
- Exact initial intrusion route into validator-signing infrastructure remained under investigation; do not claim a specific developer-machine, KMS, supply-chain, or insider route as canonical fact.
- `attack_vector_category`: `validator_key_compromise` is supported at the signer layer, while the initial key-compromise mechanism remains unknown.

## Financial boundary

Published estimates materially differ:

- contemporaneous reporting: approximately **$2.4M** drained;
- later Shiba Inu ecosystem reporting: approximately **$4.1M / over $4M** across a broader 17-token inventory.

Therefore BIR should not emit one falsely precise USD figure. Canonical display should preserve an approximately **$2.4M–$4.1M reported-loss range**, with medium amount confidence and source-specific amount claims.

Do not count frozen/immobilized BONE or KNINE recovery actions as additional stolen value.

## Aftermath boundary

- Shib.io currently operates an SOU recovery system for wallets affected by the September 12, 2025 bridge incident. It represents exact tokens owed and provides payouts/recovery tranches over time.
- The official Shibarium bridge interface is currently live, establishing that bridge operation later resumed.
- Reimbursement is therefore `in_progress`, not completed.
- Recovery is kept `unknown` because the current first-party recovery pages do not establish a final recovered-funds percentage.
- Restart may be `reopened` / current outcome `active_after_incident`, but no exact unrestricted-reopen timestamp should be inferred solely from the current live interface.

## Evidence plan

1. Shiba Inu documentation — Bridge Assets / PoS bridge architecture — first-party Tier 1 entity evidence.
2. Shib.io SOU recovery page — first-party Tier 1 incident/reimbursement evidence.
3. The Block, 2025-09-13 — contemporaneous independent reporting for approximately $2.4M and validator-signing attack details.
4. The Shib Daily / Shib Magazine — Shiba Inu ecosystem reporting carrying the later dev-report boundary and approximately $4.1M broader loss inventory.
5. Current official Shibarium bridge interface — first-party evidence that bridge operation is live now; it does not establish an exact reopen date.

## Duplicate audit

Direct search and direct canonical JSON inspection found no Shibarium/Shiba Inu bridge entity or September 2025 incident in current `main`.

## Planned IDs

- bridge: `bir_bridge_000083`
- incident: `bir_inc_000064`
- event: `bir_ev_000273`
- evidence: start at `bir_src_000439`

The event should cover the September 12 exploit/breach itself and must include first-party Shib.io evidence. Do not create a dated reopen event unless a first-party dated restoration source is established.
