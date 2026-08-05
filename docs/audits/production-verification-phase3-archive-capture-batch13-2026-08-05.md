# Production verification — Phase 3 Archive Capture Batch 13 — 2026-08-05

Status: verification rerun in progress  
Canonical PR: `#174`  
Canonical merge: `ab0b45fb1f1cbe6cdddd1238c37fb99f201c934f`  
Build-input refresh PR: `#175`  
Build-input refresh: `15472395efdb4435380dbd0fdae8c7fe71e54b06`

## Expected production state

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url           94
Terminal unarchived unique URLs      36
Risky-host unarchived unique URLs    27
Canonical public content match       true
HTML routes                          72
Redirects                            74
```

## Initial verification result

```text
Run                    30970204138
Job                    92192668199
Observed generated_at  2026-08-05T02:37:38.915Z
First mismatch         bir_src_000248
Rejected attempts      1–20
```

The initial verifier observed unchanged record counts but stale same-count evidence content. It therefore failed correctly. PR #175 changed one non-executable build-input marker and preserved every canonical and verification requirement.

## Required rerun verification

The unchanged verifier must confirm on `https://bir.badjoke-lab.com`:

- all four public datasets exactly equal canonical-derived output;
- all three Batch 13 archive fields are published;
- version and manifest counts and canonical-only markers match;
- five static routes, 33 bridge routes, and 34 incident routes pass;
- canonical metadata and JSON-LD are exact;
- sitemap contains the exact 72 canonical routes;
- robots points to the custom-domain sitemap;
- all 74 legacy redirects resolve as specified;
- content types and observable cache signals are present.

If the immediate rerun still reports `generated_at 2026-08-05T02:37:38.915Z`, no additional refresh commit is permitted. Allow deployment latency and rerun with the same expectations.
