# Production verification — Phase 3 Archive Capture Batch 14 — 2026-08-05

Status: verification in progress  
Review PR: `#177`  
Canonical PR: `#178`  
Canonical merge: `ca225d1df10b4a81d72a0fe60fd2713b6e8b543a`

## Expected production state

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url          101
Terminal unarchived unique URLs      33
Terminal unarchived records          45
Risky-host unarchived unique URLs    24
Risky-host unarchived records        38
X/Twitter records unarchived         30
Canonical public content match       true
HTML routes                          72
Redirects                            74
```

## Required verification

The custom-domain verifier must confirm on `https://bir.badjoke-lab.com`:

- all transformed fields in all four public datasets exactly equal canonical-derived output;
- all seven Batch 14 `archived_url` fields are published;
- version and manifest counts and canonical-only markers match;
- five static routes, 33 bridge routes, and 34 incident routes pass;
- canonical metadata and JSON-LD are exact;
- sitemap contains the exact 72 canonical routes;
- robots points to the custom-domain sitemap;
- all 74 legacy redirects resolve as specified;
- content types and observable cache signals are present.

The publication gate uses twenty attempts with a fifteen-second delay. If production remains on prior same-count content, the verifier must fail rather than accepting count equality.
