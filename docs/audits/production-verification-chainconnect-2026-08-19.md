# ChainConnect 2026 incident production verification

Status: complete — live production equality verified  
Verified: 2026-08-19  
Canonical merge: `aa11872fe237c295dae5d5a0a41d283fcde21aab`  
Canonical application PR: #314  
Review authority PR: #313  
Production verification PR: #318  
Production Verification run: `32167991271`  
Production Verification job: `95812037176`

## Verified production state

```text
Bridges      38
Incidents    40
Events       193
Evidence     311
HTML routes   86
Redirects     80
```

The unchanged production verifier reached complete canonical-derived production equality on **attempt 1**.

```text
Canonical public content match  true
Generated at                    2026-08-18T17:51:37.950Z
Publication attempt             1
```

All four public datasets returned HTTP 200 and matched canonical-derived expected content with zero mismatches.

## ChainConnect proof

Production served the reviewed canonical records at:

```text
/bridge/chainconnect/                                      HTTP 200
/incident/chainconnect-2026-alien-proxy-callback-exploit/ HTTP 200
```

The verifier also passed record-level JSON equality for **38 bridge dossiers and 40 incident dossiers**.

The canonical evidence boundaries from PRs #313 and #314 remain unchanged in production:

- no exact canonical numeric gross USD loss was invented;
- the secondary approximately USD 650k gross estimate remains distinct from Venom's first-party approximately USD 615k / 82.9% returned-value statement;
- the 17.1% retained bounty is not treated as user reimbursement;
- reimbursement remains unknown;
- the post-incident bridge reopening remains unverified rather than inferred from the pre-incident July 16 maintenance statement.

## Redirect and publication proof

The unchanged production verifier passed all **80** legacy redirects. In particular, both Wanchain forms that previously exposed a publication inconsistency now satisfy the canonical contract:

```text
/bridge/wanchain-bridge   HTTP 301 -> /bridge/wanbridge/
/bridge/wanchain-bridge/  HTTP 301 -> /bridge/wanbridge/
```

The same run passed the aggregate routes, canonical metadata, JSON-LD, sitemap, robots, content types, cache observations, version metadata, manifest metadata, and canonical-only publication checks.

## Result

ChainConnect canonical application PR #314 is fully published and production-verified at 38 bridges / 40 incidents / 193 events / 311 evidence.

No build-input refresh, verifier relaxation, canonical mutation, or production mutation was required by this verification PR.
