# XRPL-TX Bridge August 2026 production verification

Status: pending live equality check  
Verification date: 2026-08-12  
Canonical merge: `c0988c3f8faf4340ef211e3c03bce04c238db145`  
Canonical PR: #275

## Expected production contract

```text
Bridges     36
Incidents   38
Events      188
Evidence    297
```

Required public records:

- bridge: `bir_bridge_000036` / `/bridge/xrpl-tx-bridge/`
- incident: `bir_inc_000038` / `/incident/xrpl-tx-bridge-2026-xrp-loss/`
- event: `bir_ev_000188`
- evidence: `bir_src_000296`–`bir_src_000297`
- reference keys: chains `xrpl`, `tx`; asset `xrp`

The production-verification workflow must prove complete live registry equality against `https://bir.badjoke-lab.com`, not just route existence or count equality. This document must be updated with the successful verification run before merge.
