# XRPL-TX Bridge August 2026 production verification

Status: passed  
Verification date: 2026-08-12  
Canonical merge: `c0988c3f8faf4340ef211e3c03bce04c238db145`  
Canonical PR: #275  
Production verification run: `31512470678`  
Production verification job: `93849426702`

## Production contract verified

```text
Bridges     36
Incidents   38
Events      188
Evidence    297
```

The production-verification workflow passed against `https://bir.badjoke-lab.com` after the live deployment converged on retry 3. The converged build reported `generated_at: 2026-08-11T16:26:44.335Z` and `canonical_public_content_match: true`.

The four canonical public datasets all returned HTTP 200 and matched repository canonical content exactly:

- `/data/bridges.json`
- `/data/incidents.json`
- `/data/events.json`
- `/data/evidence.json`

The newly published records were also present on the public site:

- bridge `bir_bridge_000036`: `/bridge/xrpl-tx-bridge/` — HTTP 200
- incident `bir_inc_000038`: `/incident/xrpl-tx-bridge-2026-xrp-loss/` — HTTP 200
- event `bir_ev_000188`
- evidence `bir_src_000296`–`bir_src_000297`
- reference keys: chains `xrpl`, `tx`; asset `xrp`

Historical aliases were verified as redirects to the canonical bridge route:

- `/bridge/xrpl-coreum-bridge` and `/bridge/xrpl-coreum-bridge/` — HTTP 301 to `/bridge/xrpl-tx-bridge/`
- `/bridge/coreum-xrpl-bridge` and `/bridge/coreum-xrpl-bridge/` — HTTP 301 to `/bridge/xrpl-tx-bridge/`

## Result

PR #275 is deployed and the live BIR registry is equal to the merged canonical data for all four public datasets. The XRPL-TX Bridge entity and August 9, 2026 incident are publicly available at the canonical routes above.
