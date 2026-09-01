# Record-growth Batch 20 — tranche 01 evidence review

Issue: #445
Branch: `review/growth-batch-20-incident-heavy`

This tranche converts discovery-only signals into evidence-reviewed classifications. No canonical IDs are allocated here.

## Alephium Bridge — add_now

Primary / first-party evidence:

- Alephium, `The Alephium Bridge Exploit: On-Chain Report`, 2026-06-02: https://alephium.org/news/post/the-alephium-bridge-exploit-on-chain-report/
- Alephium bridge documentation: https://docs.alephium.org/infrastructure/the-bridge/

Supported boundary:

- incident date: **2026-05-30** (day precision);
- affected component: Alephium TokenBridge / Alephium Bridge linking Alephium with Ethereum and BNB Chain;
- attack path: attacker deployed a fake-event contract on Alephium, emitted forged Wormhole-format messages, and obtained guardian-signed VAAs that were redeemed on Ethereum/BSC;
- consequence: real collateral was drained and unbacked wALPH was minted;
- Alephium's first-party report documents a later authorized burn of 13,257,077.37295 unbacked wALPH, 96.4% of the forged-mint total, while 500,000 wALPH had escaped before the pause;
- do not infer a final recovered-USD amount or completed reimbursement from this source alone.

Duplicate guard:

- repository code search for `Alephium Bridge` returned no indexed canonical match at review time;
- canonical application must repeat direct bridge/incident JSON duplicate checks before IDs.

Decision: **add_now**, subject to final JSON duplicate check and second-source corroboration for any USD loss figure.

## Wanchain Cardano–BNB bridge — add_now with bounded claims

First-party ecosystem evidence:

- Midnight Foundation, `Update on the Wanchain Cardano–BNB Bridge Incident`, 2026-07-21: https://midnight.foundation/news/update-on-the-wanchain-cardano-bnb-bridge-incident

Supported boundary:

- incident explicitly involved **Wanchain's Cardano–BNB bridge**;
- NIGHT was stolen through Wanchain's third-party bridge infrastructure;
- Midnight states the incident was isolated to the Wanchain bridge and did not affect the Midnight network/protocol or NIGHT total supply;
- exchanges and ecosystem partners restricted deposits/withdrawals and attacker-linked accounts/addresses as part of response;
- the source does **not** establish a canonical loss amount, technical root cause, recovery completion, reimbursement completion, or bridge restart status.

Duplicate guard:

- repository code search for `Wanchain Cardano` returned no indexed canonical match at review time;
- canonical application must repeat direct bridge/incident JSON duplicate checks and identify whether an existing Wanchain entity can be reused.

Decision: **add_now**, but canonical incident fields for loss, attack vector, recovery, reimbursement and restart must remain unknown unless stronger evidence is added.

## Gravity Bridge — needs_research, incident existence strongly corroborated

Corroborating evidence currently located:

- The Block, 2026-05-30, reports approximately $5.4M drained from Gravity Bridge and cites security researchers;
- DefiLlama identifies a 2026-05-30 bridge incident;
- competing technical reports disagree on the exact mechanism (key/validator compromise vs denom-mapping/registry poisoning).

Because the mechanism is materially disputed and a suitable first-party Gravity Bridge postmortem/statement has not yet been pinned in this tranche, do not canonicalize the attack vector from secondary sources alone.

Decision: **needs_research**. Incident existence and bridge-specific impact are strong, but claim-relative primary evidence is still required before `add_now`.

## Coreum Bridge 2026-08-09 signal — probable duplicate / do-not-add pending exact identity check

The discovery description matches the already-reviewed XRPL-TX Bridge 2026 incident pattern: XRPL/Coreum cross-chain path, fake/self-transfer deposit verification, relayer-authorized XRP withdrawals, approximately 200k XRP, and 94 payments over roughly 97 minutes. Issue #279 already tracks the canonical XRPL-TX Bridge incident for evidence enrichment.

Decision: **probable duplicate**. Do not allocate a new incident unless direct canonical identity comparison proves the Coreum-labelled row is a distinct bridge/event.

## Across 2026-07-17 signal — needs_research

Across' current first-party site confirms Across is an active cross-chain bridge/protocol, but the reviewed first-party material located in this tranche does not establish the July 17 discovery-feed incident.

Decision: **needs_research**; discovery row alone is insufficient.

## MAP Protocol — needs_research

MAP Protocol's first-party site confirms it is omnichain infrastructure with bridging/cross-chain functionality, but no first-party incident statement supporting the May 20 discovery-feed event was pinned in this tranche.

Decision: **needs_research**.

## tranche result

- `add_now`: Alephium Bridge 2026-05-30; Wanchain Cardano–BNB bridge 2026-07-21.
- `probable_duplicate`: Coreum Bridge 2026-08-09, pending exact comparison against the canonical XRPL-TX Bridge incident.
- `needs_research`: Gravity Bridge, Across, MAP Protocol.

Batch 20 still requires additional evidence-ready incidents before canonical application so the batch remains genuinely multi-record and incident-heavy rather than collapsing back to a one- or two-record change.
