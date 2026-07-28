# BIR Phase 3 final restart production verification — 2026-07-28

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `5cc54661b3a3f349ba5aa898930e35279f70df3b`  
Production verification run: `30361214486`  
Normal CI run: `30361214318`

## Verified canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    211
HTML routes 72
```

## Verified surfaces

The dedicated production verifier confirmed:

- all five static routes;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- version and manifest counts at 33 / 34 / 183 / 211;
- ordered event IDs through `bir_ev_000183`;
- ordered evidence IDs through `bir_src_000211`;
- canonical links and JSON-LD identifiers;
- exact 72-route sitemap equality;
- robots policy;
- generated legacy redirects and destinations;
- expected content types;
- observable cache-related headers.

The ordinary Check workflow independently passed type checking, canonical validation, enum validation, first-ten audit, full-corpus audit, eight full-corpus failure fixtures, build, final-dist consistency, and controlled public-output failures.

## Phase 3 restart result

Production now publishes:

- LI.FI 2022 existing patch/redeployment event normalized to `bridge_reopened`;
- LI.FI 2024 restart timing corrected to `unknown` while preserving current active outcome;
- ChainSwap July 2 incident linked to the official August 20 relaunch event and evidence.

## Audit state

```text
Blocking errors                  0
completed_reimbursement_event    0
reopened_event                   0
```

The remaining full-corpus review area is the `source_count` field contract. It is not a publication failure and remains separate from the completed aftermath migration.

## Publication convergence

The verifier retained the bounded convergence gate:

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

Production reached the expected state within the window and then passed every route and content assertion.

## Result

The Phase 3 restart-warning migration is merged, published, and production-verified at 33 / 34 / 183 / 211 with 72 canonical HTML routes and zero reimbursement or reopening warnings.
