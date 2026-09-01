# Record-growth Batch 20 — final evidence decisions

Issue: #445
Branch: `canonical/growth-batch-20-incident-heavy`

Batch 20 is intentionally incident-heavy. Direct canonical JSON inspection superseded the earlier code-search-only duplicate check.

## Selected canonical additions

### Alephium Bridge — add now

- incident date: 2026-05-30
- primary source: Alephium, `The Alephium Bridge Exploit: On-Chain Report`, 2026-06-02
- independent corroboration: Lemma Critical Brief No.023
- bounded claim: forged Wormhole-format events were observed and signed by the bridge guardian path; forged VAAs were redeemed against real collateral and used to mint unbacked wALPH.
- the June 2 authorized burn of 13,257,077.37295 unbacked wALPH is not treated as recovery of drained real collateral.
- approximately USD 815k is retained as a secondary technical valuation, not a first-party reconciled net-loss figure.

### Butter Bridge V3.1 — add now

- incident date: 2026-05-20
- first-party source: MAP Protocol May 2026 update
- independent corroboration: SlowMist Hacked bridge record
- bounded claim: the affected surface is Butter Bridge V3.1 / OmniServiceProxy cross-chain service for legacy ERC-20 MAPO and MAP mainnet MAPO.
- MAP mainnet consensus, native MAPO, light-client verification, Oracle multisig and project-team keys are explicitly excluded from the compromise boundary.
- roughly USD 180k is retained as an independent estimate of realized liquidity extraction; the enormous unauthorized MAPO mint quantity is not equated with realized USD loss.

### Garden Finance — two separate incidents

#### 2025-10-30 solver operating-environment compromise

- first-party source: Garden Incident Report — October 30, 2025
- corroboration: The Block report of Garden/EY forensic findings
- approximately USD 11.4m in solver-owned crypto assets was drained across multiple chains.
- Garden states protocol contracts and user funds were not compromised.
- this is a solver-layer incident, not a smart-contract exploit.

#### 2026-07-26 independent-solver database compromise

- source with direct Garden spokesperson clarification: Cointelegraph, updated 2026-07-27
- corroboration: SlowMist Hacked
- Garden states an independent solver's off-chain database was compromised and fraudulent swap records caused solver funds to be released for unfunded swaps.
- Garden states protocol/HTLC contracts were not compromised and no user funds were at risk.
- approximately USD 450k is an external estimate; Garden was still confirming exact amount/assets/networks in the reviewed update.

These two cases remain separate incidents because they occurred in different periods and have materially different compromise paths.

### Gravity Bridge — add now with attack vector unknown

- incident date: 2026-05-30
- contemporaneous reporting: The Block; Incrypted reproducing Gravity's incident/halt statement
- approximately USD 5.4m was reported drained.
- Gravity acknowledged an incident and instructed validators to halt validators and orchestrators while investigation continued.
- public technical analyses materially disagree between a signing-key-compromise interpretation and a denom/registry-message-validation interpretation.
- no authoritative first-party postmortem resolving that conflict was located; canonical `attack_vector_category` therefore remains `unknown`.

## Removed from Batch 20 after direct canonical audit

The following discovery signals were not new records:

- WanBridge / Wanchain Cardano–BNB route — existing `bir_bridge_000037` and existing incident lineage.
- Axelar–Secret IBC Bridge — existing `bir_bridge_000040` / `bir_inc_000043`.
- AFX Bridge — existing `bir_bridge_000041` / `bir_inc_000044`.
- Coreum-labelled XRPL/TX signal — existing XRPL-TX Bridge lineage.
- Across Protocol already exists as `bir_bridge_000049`; its 2026 discovery signal remains research-only until incident-specific evidence is sufficient.

## Resulting Batch 20 delta

- +4 bridge entities
- +5 incident cases
- +10 bridge events
- +10 evidence records

No launch-only filler records are added. All five incidents have at least two reviewed evidence records, with claim scopes kept separate where primary and secondary evidence establish different facts.
