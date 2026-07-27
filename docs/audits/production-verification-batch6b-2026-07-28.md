# BIR Batch 6B production verification — 2026-07-28

Status: passed  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `1d2ccf24edab7b764160da130fc2e36146e6f1b1`  
Successful verification run: `30307748017`

## Verified canonical state

```text
Bridges     30
Incidents   32
Events      150
Evidence    181
HTML routes 67
```

The HTML route total consists of five static pages, 30 bridge detail pages, and 32 incident detail pages.

## Batch 6B routes

The following new routes were included in the full successful verification:

```text
/bridge/rubic/
/bridge/unizen/
/incident/rubic-2022-rbc-brbc-bridge-wallet-compromise/
/incident/rubic-2022-rubicproxy-approval-exploit/
/incident/unizen-2024-external-call-approval-exploit/
```

## Verification scope

The successful production run checked:

- production home and collection counts
- all five static pages
- all 30 bridge detail routes
- all 32 incident detail routes
- canonical links and JSON-LD identifiers
- version and manifest counts and canonical-only markers
- ordered bridge, incident, event, and evidence public JSON IDs
- RBC and BRBC public reference output
- sitemap URL set
- robots policy
- generated legacy redirects and destinations
- content types
- observable cache headers

## Publication convergence

Initial runs `30307468595` and `30307568938` observed the previous 28 / 29 / 134 / 160 production state. Diagnostic run `30307610257` confirmed:

- old record counts in `version.json` and `data/manifest.json`
- no RBC or BRBC reference output
- 62 sitemap URLs
- Batch 6B paths falling through to the home page canonical URL

The repository state was correct; Cloudflare Pages publication had not yet converged to the Batch 6B merge.

The production verifier now performs a bounded publication-convergence wait against canonical `version.json` counts before beginning route checks. Defaults:

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

The wait does not weaken any verification assertion. If expected counts do not appear within the bounded window, the workflow fails before route checks and records the latest observed counts and generation timestamp.

Full verification run `30307748017` detected the expected canonical state and then passed all content, route, metadata, ID, reference, redirect, and cache checks.

## Result

Phase 2 Batch 6B publication is complete and verified against the reviewed canonical repository state.

The temporary diagnostic workflow was removed before this audit PR was merged.
