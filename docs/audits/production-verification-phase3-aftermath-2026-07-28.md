# BIR Phase 3 aftermath production verification — 2026-07-28

Status: running  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `a6794d5460eb263045c23ee1a850674b1a7beb98`

## Expected canonical state

```text
Bridges     33
Incidents   34
Events      182
Evidence    210
HTML routes 72
```

The HTML route total remains five static pages, 33 bridge detail pages, and 34 incident detail pages.

## Phase 3 data surfaces

The production verifier must confirm:

- all existing bridge and incident routes remain available;
- public event JSON contains ordered IDs through `bir_ev_000182`;
- public evidence JSON contains ordered IDs through `bir_src_000210`;
- Ronin, Wormhole, Poly Network, BSC Token Hub, THORChain, and Allbridge detail timelines expose the reviewed aftermath changes;
- SPEC-derived public methodology includes distinct recovery, reimbursement, and restart semantics;
- version and manifest counts are 33 / 34 / 182 / 210;
- sitemap remains exactly 72 canonical HTML routes;
- robots, metadata, redirects, content types, and observable cache headers remain valid.

## Publication convergence

The dedicated production verifier retains the bounded convergence gate:

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

Failure to reach the expected `version.json` state within the window remains a hard failure before route assertions.

## Result

Pending the dedicated `Production Verification` workflow run triggered by this audit PR.
