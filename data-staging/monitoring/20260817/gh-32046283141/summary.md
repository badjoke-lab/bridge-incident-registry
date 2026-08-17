# BIR Auto Monitoring Report — 20260817

Run: `gh-32046283141`

## Canonical guard

- Bridges: 36
- Incidents: 38
- Events: 190
- Evidence: 299
- Unknown URL status: 0
- Reference errors: 0

## New or changed findings

- **Review ChainConnect July 2026 bridge incident** — medium — review_signal
  - Candidate review promoted from the 2026-08-17 BIR monitoring watchlist after incident-specific ecosystem/first-party material was located.

## Incident boundary

Venom Foundation's official channel states that on July 26, 2026 an unauthorized caller exploited an access-control flaw in a ChainConnect bridge contract on Venom 2.0. The affected application-level callback is identified as `ProxyMultiVaultAlien_V10.onCheckAccumulatedFee`, which lacked proper sender verification and enabled minting of unbacked Alien TIP-3 tokens that were then bridged to Ethereum through the standard flow.

Venom explicitly states that the issue was in ChainConnect application code and was not a compromise of Venom, TVM, TIP-3, network infrastructure, relays, keys, or privileged access. The same official update 
  - https://github.com/badjoke-lab/bridge-incident-registry/issues/305
- **Review Wanchain Cardano–BNB bridge July 2026 incident** — medium — review_signal
  - Candidate review promoted from the 2026-08-17 BIR monitoring watchlist after a detailed first-party Wanchain postmortem was located.

## First-party incident boundary

Wanchain's July 28, 2026 postmortem states that on July 20 a malicious actor attacked a Wanchain Bridge smart contract on Cardano and withdrew approximately 515 million NIGHT tokens. Wanchain states that the bridge became unavailable shortly afterward.

The postmortem attributes the incident to a Cardano smart-contract serialization / field-boundary flaw: two adjacent numeric values were converted to bytes without a fixed boundary, allowing a valid MPC signature for a small approved withdrawal to be reinterpreted for a much larger withdrawal. Wanchain explicitly states that the MPC relayer was not compromised, private keys w
  - https://github.com/badjoke-lab/bridge-incident-registry/issues/304
- **Review AFX Trade July 2026 custody-bridge incident** — medium — review_signal
  - Candidate review promoted from the 2026-08-17 BIR monitoring watchlist after first-party evidence was located.

## First-party incident boundary

AFX Trade's July 31, 2026 postmortem describes a targeted July 22, 2026 attack that compromised AFX-operated infrastructure and the custody bridge path. The postmortem describes a supply-chain / trust-boundary compromise progressing through developer and infrastructure access into validator-node compromise, followed by a bridge transfer. AFX states that the incident was confined to AFX-operated infrastructure rather than an Arbitrum/native Arbitrum bridge defect.

The first-party response section states that bridge operations were suspended, validator infrastructure was isolated, and the bridge contract was frozen while infrastructure was rebuilt
  - https://github.com/badjoke-lab/bridge-incident-registry/issues/303

## Candidate watchlist

- **ChainConnect July** — B — Review ChainConnect July 2026 bridge incident
  - https://github.com/badjoke-lab/bridge-incident-registry/issues/305
  - Next: review_for_canonical_boundary
- **Wanchain Cardano–BNB bridge July** — B — Review Wanchain Cardano–BNB bridge July 2026 incident
  - https://github.com/badjoke-lab/bridge-incident-registry/issues/304
  - Next: review_for_canonical_boundary
- **AFX Trade July** — B — Review AFX Trade July 2026 custody-bridge incident
  - https://github.com/badjoke-lab/bridge-incident-registry/issues/303
  - Next: review_for_canonical_boundary
- **Across** — C — Across appears as a new or materially changed bridge hack record
  - https://api.llama.fi/hacks
  - Next: resolve_bridge_identity_and_locate_primary_source
- **Taiko Bridge** — B — Taiko Bridge appears as a new or materially changed DefiLlama bridge-hack record
  - https://api.llama.fi/hacks
  - Next: locate_primary_source_and_define_incident_boundary
- **Namada Shielded Pools** — C — Namada Shielded Pools appears as a new or materially changed bridge hack record
  - https://api.llama.fi/hacks
  - Next: resolve_bridge_identity_and_locate_primary_source
- **Secret Network** — C — Secret Network appears as a new or materially changed bridge hack record
  - https://api.llama.fi/hacks
  - Next: resolve_bridge_identity_and_locate_primary_source
- **Aztec Bridge** — C — Aztec Bridge appears as a new or materially changed bridge hack record
  - https://api.llama.fi/hacks
  - Next: resolve_bridge_identity_and_locate_primary_source
- **Aztec Connect** — C — Aztec Connect appears as a new or materially changed bridge hack record
  - https://api.llama.fi/hacks
  - Next: resolve_bridge_identity_and_locate_primary_source
- **Axelar Secret IBC Bridge** — C — Axelar Secret IBC Bridge appears as a new or materially changed bridge hack record
  - https://api.llama.fi/hacks
  - Next: resolve_bridge_identity_and_locate_primary_source
- **Syscoin UTXO–NEVM Bridge** — B — Syscoin Bridge appears as a new or materially changed DefiLlama bridge-hack record
  - https://api.llama.fi/hacks
  - Next: locate_primary_source_and_define_incident_boundary

## Safety

Monitoring output is review material only. No canonical record was changed or published automatically.

