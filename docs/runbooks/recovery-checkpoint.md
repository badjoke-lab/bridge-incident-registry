# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Commit SHAs below are completed merge checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     33
Incidents   34
Events      173
Evidence    199
```

## Latest completed merge checkpoints

```text
PR #63  c074d411b9c1d99b0f5cd56c5ade3125952de13c  Batch 6A data
PR #64  8d5bb2b994cfd501e49827a2896291507a499620  Batch 6A audit
PR #66  1d2ccf24edab7b764160da130fc2e36146e6f1b1  Batch 6B data
PR #67  75ceaee267b537d4e8dadb21f64179d72f637c02  Batch 6B audit
PR #68  a74fadd47878015f940831a1339880ae81d937ca  Batch 7 scope
PR #69  eb6bc7366ea25be4441c72cdfa50b753477eef34  Batch 7 data
```

## Phase 2 completion

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
Production verify    30307942555
Verified state       30 / 32 / 150 / 181
HTML routes          67
```

### Batch 7

```text
Entities             Taiko Bridge, Everclear / Connext, Commons Bridge
Production verify    30309573252
Verified state       33 / 34 / 173 / 199
HTML routes          72
```

Batch 7 verified surfaces:

- all five static registry pages
- all 33 bridge detail routes
- all 34 incident detail routes
- canonical JSON endpoints and ordered IDs
- SYND, CLEAR, and NEXT public asset references
- Taiko, Base, and Commons Chain public references
- canonical metadata and JSON-LD identifiers
- robots and 72-route sitemap
- generated legacy redirects
- content types and observable cache headers

Audit: `docs/audits/production-verification-batch7-2026-07-28.md`.

## Production verifier behavior

The verifier uses browser-compatible request headers and waits for `version.json` counts to match repository canonical counts before route checks.

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

If production does not converge within the bounded window, verification fails before route checks. All route and content assertions remain mandatory after convergence.

## Next

1. merge the Batch 7 production-audit PR after final CI and production verification pass
2. verify latest `main` and open PRs
3. create a fresh Phase 3 full-corpus audit branch
4. inventory schema and descriptive-value drift across all 33 / 34 / 173 / 199 records
5. audit amount, recovery, reimbursement, restart, and outcome consistency
6. separate mechanical normalization from claim-changing review
7. strengthen validators with controlled failure fixtures before canonical migrations
