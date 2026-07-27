# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Commit SHAs below are completed merge checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     30
Incidents   32
Events      150
Evidence    181
```

## Completed merge checkpoints

```text
PR #50  ed7d4871c82dcd6b089bb3ac6da5df538a83116c
PR #51  f7e0ff462c07fc02f6fe620d7a125546a27a45e3
PR #52  6f3b8aad06edc7027fb362120aabe19fa46d52ee
PR #53  5558a50e0a0f34ceca7c4b34816db29b0e7ae17b
PR #54  40632e3e5cf600490097d58a15210dabce704ede
PR #58  57e4fc948fc9a26f20833b657c8d31822c72f56a
PR #59  e511911d97216366386ff808d9dfb80bdfd19334
PR #61  bcf59e4c811f2d68a3cfeb89cceaa76c24fba9f0
PR #62  90304ecbb9dfef4670d91093873a05aa87e770d2
PR #63  c074d411b9c1d99b0f5cd56c5ade3125952de13c
PR #64  8d5bb2b994cfd501e49827a2896291507a499620
PR #65  d634db5436bc0590b35e19e88435eb4b9214e7b0
PR #66  1d2ccf24edab7b764160da130fc2e36146e6f1b1
```

## Phase 2 Batch 6 completion

### Batch 6A

```text
Entities             Transit Swap, Magpie Protocol / Fly
Production verify    30306303489
Verified state       28 / 29 / 134 / 160
HTML routes          62
```

### Batch 6B

```text
Entities             Rubic, Unizen
Incidents            3
Timeline events      16
Evidence records     21
Asset references     RBC, BRBC
Production verify    30307748017
Verified state       30 / 32 / 150 / 181
HTML routes          67
```

Batch 6B verified surfaces:

- all five static registry pages
- all 30 bridge detail routes
- all 32 incident detail routes
- canonical JSON endpoints and ordered IDs
- RBC and BRBC public reference output
- canonical metadata and JSON-LD identifiers
- robots and 67-route sitemap
- generated legacy redirects
- content types and observable cache headers

Audit: `docs/audits/production-verification-batch6b-2026-07-28.md`.

## Production verifier behavior

The verifier uses browser-compatible request headers and waits for `version.json` counts to match the repository's canonical counts before route checks.

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

If production does not converge within the bounded window, verification fails before route checks and reports the last observed counts and generation timestamp. All existing route and content assertions remain mandatory after convergence.

## Next

1. merge the Batch 6B production-audit PR after final CI and production verification pass
2. verify latest `main` and open PRs
3. create a fresh Phase 2 Batch 7 scope branch
4. review Taiko, Everclear / Connext, Syndicate Commons Bridge, and other candidates
5. define candidate boundaries before assigning IDs
6. derive IDs only from the 30 / 32 / 150 / 181 baseline
7. use separate reviewed scope and canonical-data PRs
