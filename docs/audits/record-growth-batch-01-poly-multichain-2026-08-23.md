# Record Growth Batch 01 — Poly Network 2023 + Multichain 2022

Date: 2026-08-23
Issue: #367
Program: #365

## Decision

Both candidates are separate, missing historical incidents on bridge entities that already exist in canonical BIR. They are suitable for bounded canonical application after source-preservation checks. No new bridge entity is authorized by this review.

## Candidate A — Poly Network, 2023-07-02

Current canonical gap: Poly Network has the 2021 exploit but no distinct 2023 incident.

Reviewed evidence:
- Poly Network official Medium publication index identifies `The Poly Network Exploit Analysis` and states that the July 2, 2023 exploit affected 58 assets across 11 blockchains.
- Poly Network official `Exploit Damage Control Measures` states that CrossChainManager contracts were shut down, attacker transactions were traced, Poly concluded that Poly Network Relay Chain validator private keys had been obtained, validators were replaced, and unaffected cross-chain services were gradually restored.
- Poly Network official `Poly Bridge Cross-Chain Security Reinforcement Solution` records the post-incident bridge security changes.
- Metis first-party ecosystem postmortem independently records the PolyNetwork exploit impact on Metis-connected assets and the shutdown of the bridge path.

Canonical direction:
- separate incident on existing `bir_bridge_000005` Poly Network;
- date 2023-07-02;
- incident type exploit;
- high-level attack category should reflect validator/private-key compromise only at the reviewed public boundary;
- bridge pause/shutdown and later partial restoration should be separate lifecycle events;
- do not assign the widely circulated notional minted value as realized USD loss;
- keep realized-loss normalization unresolved until asset/liquidity claims are reconciled;
- do not merge this incident with the 2021 Poly Network exploit.

Source-quality note: Poly Network's incident-specific operator material is on Medium, which is a risky host under the current BIR source-quality baseline. Canonical application must either admit a valid preserved/archive locator or use stable first-party/affected-ecosystem sources without increasing the risky-host-unarchived ceiling. The review does not authorize raising that ceiling.

## Candidate B — Multichain, 2022-01

Current canonical gap: Multichain has the July 2023 abnormal MPC-controlled outflow incident but no separate January 2022 router/liquidity-pool vulnerability incident.

Reviewed evidence:
- Multichain official Jan 17/18 alert identifies a critical vulnerability affecting cross-chain token contracts and instructs users to revoke router approvals.
- Multichain official Feb 19 postmortem states that two critical vulnerabilities were reported Jan 10, affected eight tokens, liquidity-pool contracts were upgraded, router-contract risk persisted for unrevoked approvals, and exploitation occurred after the public warning.
- The same postmortem records hacker returns/whitehat rescue activity, later V6 upgrades, and the affected-contract boundary.
- Multichain's Feb 21 company-issued reimbursement announcement states a 100% reimbursement commitment for users' losses.

Canonical direction:
- separate incident on existing `bir_bridge_000007` Multichain;
- incident date should use the first confirmed exploitation after the Jan 18 warning, with the vulnerability-disclosure timeline retained separately;
- preserve router-approval theft, whitehat rescue/returns, contract upgrade, and reimbursement as distinct claims/events;
- do not collapse total assets at risk, assets actually stolen, assets rescued/returned, and reimbursed liabilities into one number;
- do not merge this incident with the 2023 Multichain shutdown/outflow case.

Source-quality note: the technical operator postmortem is hosted on Medium and therefore cannot simply consume another risky-host-unarchived slot. The PRNewswire release is company-issued but must be classified accurately rather than treated as an operator-hosted technical postmortem. Canonical application must pass the unchanged source-quality gate.

## Batch 01 application boundary

The first canonical application should add exactly these two incidents to the existing Poly Network and Multichain bridge entities, with fresh IDs allocated from then-current main. It may add only lifecycle events and evidence directly needed to support displayed claims. It must pass canonical/schema/enum validation, exact source-count equality, source-quality no-regression, build/Series/dist/performance checks, and post-merge production equality.

This review does not close #367. Close only after canonical merge and production verification.