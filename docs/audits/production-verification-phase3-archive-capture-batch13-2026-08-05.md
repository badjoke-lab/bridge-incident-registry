# Production verification — Phase 3 Archive Capture Batch 13 — 2026-08-05

Status: complete  
Canonical PR: `#174`  
Canonical merge: `ab0b45fb1f1cbe6cdddd1238c37fb99f201c934f`  
Build-input refresh PR: `#175`  
Build-input refresh: `15472395efdb4435380dbd0fdae8c7fe71e54b06`

## Verified production state

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url           94
Terminal unarchived unique URLs      36
Terminal unarchived evidence         49
Risky-host unarchived unique URLs    27
Risky-host unarchived evidence       42
X/Twitter evidence unarchived        30
Canonical public content match       true
HTML routes                          72
Redirects                            74
Generated at                         2026-08-05T03:00:56.755Z
```

## Verification sequence

### Initial verification

```text
Run                    30970204138
Job                    92192668199
Observed generated_at  2026-08-05T02:37:38.915Z
First mismatch         bir_src_000248
Rejected attempts      1–20
```

The initial verifier observed the expected unchanged counts but stale same-count evidence content. It failed correctly because `bir_src_000248` did not yet contain the reviewed Batch 13 archive field in production.

### Build-input refresh

PR #175 changed only the existing non-executable marker comment in `scripts/build-public-site.mjs` and added a permanent deployment audit. Canonical data, build order, public contracts, routes, metadata, redirects, validators, and verification expectations were unchanged.

### Successful rerun

```text
Run                    30970746866
Job                    92194294438
Publication attempt    20 / 20
Prior generated_at     2026-08-05T02:37:38.915Z
Verified generated_at  2026-08-05T03:00:56.755Z
```

Attempts 1 through 19 continued to observe the prior build and rejected `bir_src_000248`. Attempt 20 switched to the refreshed build and passed complete canonical-derived public-content equality. No second refresh commit was introduced.

## Verified public contract

The successful verifier confirmed on `https://bir.badjoke-lab.com`:

- exact equality for all transformed fields in bridges, incidents, events, and evidence datasets;
- publication of all three Batch 13 archive fields;
- exact version and manifest counts and canonical-only markers;
- five static routes, 33 bridge routes, and 34 incident routes;
- canonical metadata and JSON-LD;
- exact 72-route sitemap;
- custom-domain robots sitemap reference;
- all 74 legacy redirects;
- expected JSON, HTML, XML, and text content types;
- expected observable cache headers and signals.

Counts and IDs were not used as a substitute for content equality.

## Batch 13 publication result

```text
Reviewed unique URLs                 10
Approved unique URLs                  3
Evidence records updated              3
Evidence with archived_url       91 -> 94
Terminal unique queue             36 -> 36
Terminal record queue             49 -> 49
Risky-host unique queue           29 -> 27
Risky-host record queue           45 -> 42
X/Twitter record queue            32 -> 30
Source-count drift                       0
Unknown URL status                       0
```

Published archive mappings:

```text
bir_src_000248
bir_src_000275
bir_src_000278
```

Source URLs, claims, source hierarchy, reliability, dates, linkages, and record counts remain unchanged.
