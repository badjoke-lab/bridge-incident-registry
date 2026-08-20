# Verus May 2026 native + Ledger Series production verification

Status: complete — read-only production equality verified  
Verified: 2026-08-20  
Canonical application PR: #338  
Canonical merge: `66b3b1b613e0e757d45313af59b02f1bebfa398c`  
Release-baseline sync PR: #339  
Production-proven main: `b72aa190f07a11f45baa2cfcf57ae9295343b374`  
Read-only verification PR: #340 — closed without merge  
Verification run: `32337814734`  
Verification job: `96330647951`

## Verified native production state

```text
Bridges                  39
Incidents                42
Events                   199
Evidence                 325
Canonical HTML routes    89
Legacy redirects         80
Bridge dossiers          39 / 39
Incident dossiers        42 / 42
Publication attempt      1
Generated at             2026-08-20T06:00:17.226Z
Canonical content match  true
```

The verifier checked out exact merged main `b72aa190f07a11f45baa2cfcf57ae9295343b374` and compared expected native public output with `https://bir.badjoke-lab.com`. Complete canonical production content was available on attempt 1. All four public datasets returned HTTP 200 and matched the canonical-derived expected content with zero mismatches. Record-level JSON equality passed for all 39 bridge dossiers and all 42 incident dossiers.

## Verified Ledger Series production state

```text
Series records             81
Series JSON files          83
Unique global record keys  81
Verification attempt       1
Semantic equality          pass
```

The same exact-main job built the BIR Ledger Series adapter and compared every expected production JSON resource: registry descriptor, index and 81 record envelopes. All 83 files passed semantic equality after excluding only the environment-specific `generated_at` field. The 81 global record keys were unique.

## Verus May / July separation proof

The production verifier also required the following human-facing routes to be live in the same job:

```text
/bridge/verus-ethereum-bridge/                                      HTTP 200
/incident/verus-ethereum-bridge-2026-may-import-verification-exploit/  HTTP 200
/incident/verus-ethereum-bridge-2026-july-import-verification-exploit/ HTTP 200
/incidents/                                                         HTTP 200
/compare/                                                           HTTP 200
/stats/                                                             HTTP 200
```

The May and July incidents remain separate canonical incident cases on the same bridge entity. May partial recovery, restitution and May-aftermath reopen evidence is not promoted into the later July incident. The bridge entity remains paused because the current state follows the later July incident boundary.

## Verification boundary

PR #340 was deliberately verification-only and was closed without merge after the successful run. No production mutation, verifier relaxation, canonical mutation, performance-budget change or Series contract weakening was performed by the verification PR.

The permanent acceptance boundary remains native canonical equality plus Series equality whenever Series output changes, in addition to the normal dependency, schema, corpus, source-quality, accessibility, performance and browser gates.

## Result

The May-expanded Verus canonical state is fully published and production-proven at 39 bridges / 42 incidents / 199 events / 325 evidence, with 89 canonical HTML routes, 80 redirects and the Ledger Series adapter at 81 records / 83 JSON files / 81 unique global keys.
