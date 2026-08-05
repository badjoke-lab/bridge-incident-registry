# Production verification — Phase 3 Archive Capture Batch 14 — 2026-08-05

Status: verification rerun in progress  
Review PR: `#177`  
Canonical PR: `#178`  
Canonical merge: `ca225d1df10b4a81d72a0fe60fd2713b6e8b543a`  
Build-input refresh PR: `#179`  
Build-input refresh: `3f0514b568e84b17daf9e0a2d14649b3a329c787`

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

## Initial verification result

```text
Run                    30976024931
Job                    92210067226
Observed generated_at  2026-08-05T04:41:17.057Z
First mismatch         bir_src_000013
Rejected attempts      1–20
```

The initial verifier observed matching record counts but stale same-count evidence content and failed correctly. PR #179 changed one behavior-neutral build-input marker and preserved all canonical and verification requirements.

## Rerun boundary

The unchanged verifier must confirm:

- all four public datasets exactly equal canonical-derived output;
- all seven Batch 14 archive fields are published;
- version and manifest counts and canonical-only markers match;
- five static routes, 33 bridge routes, and 34 incident routes pass;
- canonical metadata and JSON-LD are exact;
- sitemap contains the exact 72 canonical routes;
- robots points to the custom-domain sitemap;
- all 74 legacy redirects resolve as specified;
- content types and observable cache signals are present.

If the immediate rerun still reports `generated_at 2026-08-05T04:41:17.057Z`, no additional refresh commit is permitted. Preserve the same verifier expectations and allow deployment latency.
