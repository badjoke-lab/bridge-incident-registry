# BIR Phase 3 aftermath production verification — 2026-07-28

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `a6794d5460eb263045c23ee1a850674b1a7beb98`  
Production verification run: `30358827192`  
Normal CI run: `30358827222`

## Verified canonical state

```text
Bridges     33
Incidents   34
Events      182
Evidence    210
HTML routes 72
```

The HTML route total remains five static pages, 33 bridge detail pages, and 34 incident detail pages.

## Verified surfaces

The dedicated production verifier confirmed:

- all five static pages;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- public event JSON with ordered IDs through `bir_ev_000182`;
- public evidence JSON with ordered IDs through `bir_src_000210`;
- version and manifest counts at 33 / 34 / 182 / 210;
- canonical links and JSON-LD identifiers;
- exact 72-route sitemap equality;
- robots policy;
- generated legacy redirects and destinations;
- expected content types;
- observable cache-related headers.

The ordinary Check workflow independently passed type checking, canonical validation, enum migration validation, first-ten audit, full-corpus audit, eight full-corpus failure fixtures, build, final-dist consistency, and controlled public-output failures.

## Phase 3 publication result

The production site now publishes the reviewed aftermath changes for:

- Ronin;
- Wormhole;
- Poly Network;
- BSC Token Hub;
- THORChain 2021 incidents 1 and 2;
- Allbridge.

The public methodology now distinguishes recovery, reimbursement, deficit backfill, bridge reopening, chain resumption, and qualified reimbursement scope.

## Audit state

```text
Blocking errors                  0
completed_reimbursement_event    0
reopened_event                   3
```

Remaining restart reviews:

```text
bir_inc_000015  LI.FI 2022
bir_inc_000016  LI.FI 2024
bir_inc_000017  ChainSwap July 2, 2021
```

These are not publication failures. They remain explicit Phase 3 review items because the current corpus does not yet contain a sufficiently direct historical reopening source for each claim.

## Publication convergence

The verifier retained the bounded convergence gate:

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

Production reached the expected state within the window and then passed every route and content assertion.

## Result

Phase 3 aftermath canonical migration is merged, published, and production-verified at 33 / 34 / 182 / 210 with 72 canonical HTML routes.
