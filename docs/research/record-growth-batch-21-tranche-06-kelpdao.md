# Batch 21 tranche 06 — KelpDAO rsETH Bridge 2026

Status: ADD NOW
Baseline main: `ca24a637717755476b5ceeb9586720bb8e6064f1`
Baseline counts: 79 bridges / 59 incidents / 263 events / 423 evidence

## Duplicate audit

Direct canonical review found no existing KelpDAO / Kelp / rsETH bridge entity or April 18, 2026 incident.

## Canonical allocation

- bridge: `bir_bridge_000080` — KelpDAO rsETH Bridge
- incident: `bir_inc_000060` — KelpDAO 2026 rsETH bridge RPC/DVN compromise
- events: `bir_ev_000264`–`bir_ev_000265`
- evidence: `bir_src_000425`–`bir_src_000427`

## Incident boundary

- incident date: 2026-04-18
- route: Unichain → Ethereum rsETH bridge path built on LayerZero cross-chain messaging
- loss: 116,500 rsETH; LayerZero's final incident report values this at approximately USD 292 million at the time of attack
- root cause: compromise of LayerZero Labs internal RPC infrastructure plus a denial-of-service attack against an external RPC path; poisoned RPC responses caused the sole LayerZero Labs DVN used by the KelpDAO OApp to attest to a forged cross-chain message
- configuration boundary: KelpDAO's OApp used a 1-of-1 DVN configuration, so the destination accepted a single compromised attestation
- this was not a KelpDAO smart-contract bug and not a compromise of LayerZero's on-chain protocol
- KelpDAO paused rsETH contracts across mainnet and several L2s during containment; no unrestricted bridge reopening is admitted here

## Evidence

1. LayerZero — `KelpDAO Incident Statement`, 2026-04-19
   - https://layerzero.network/blog/kelpdao-incident-statement
   - first-party statement from the compromised DVN infrastructure operator; supports incident boundary, 1-of-1 configuration, RPC poisoning and response actions
2. LayerZero — `LayerZero Labs KelpDAO Incident Report`, 2026-05-20
   - https://layerzero.network/blog/layerzero-labs-kelpdao-incident-report
   - first-party final report; supports 116,500 rsETH / approximately USD 292M, social-engineering/RPC compromise timeline, DDoS failover and forged attestation
3. Chainalysis — `Inside the KelpDAO Bridge Exploit`, 2026-04-23
   - https://www.chainalysis.com/blog/kelpdao-bridge-exploit-april-2026/
   - independent security/forensic analysis; supports Unichain → Ethereum route, phantom burn, 116,500 rsETH release and off-chain infrastructure compromise

## Modeling guardrails

- use `unknown` for Unichain and rsETH reference keys until the shared BIR vocabulary explicitly includes them; retain exact names in prose
- do not infer recovery, reimbursement or unrestricted reopening
- do not describe LayerZero protocol contracts as exploited
- do not generalize attribution beyond the admitted LayerZero report
- keep downstream lending-market effects outside the bridge-loss amount
- resulting expected counts: 80 bridges / 60 incidents / 265 events / 426 evidence
