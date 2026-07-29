# BIR Phase 3 source-count Batch 3 production verification — 2026-07-29

Status: passed  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `83d61fc1b4778a7a255db2de152c7b8d168a170f`  
Deployment retrigger merge: `5d23d7da414e65226f37caafbfce3884fd1aeb8c`

## Verified canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    241
HTML routes 72
Redirects   74
```

## Successful runs

```text
Production Verification   30424531817
Canonical PR normal CI    30424388432
Verification PR normal CI 30424531434
Retrigger PR normal CI    30424837798
```

The production-verification run initially failed after all 20 convergence attempts because Cloudflare continued to serve the Batch 2 build at 33 / 34 / 183 / 231. A docs-only main push retriggered the existing Git integration without changing canonical data or the verifier. The failed jobs were rerun unchanged.

The rerun detected the Batch 3 canonical state on publication attempt 1 and then passed every route and public-contract assertion.

## Verified surfaces

- all five static routes;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- version and manifest counts at 33 / 34 / 183 / 241;
- ordered evidence IDs through `bir_src_000241`;
- all ten Batch 3 event-scoped evidence records in public JSON;
- all four synchronized incident `source_count` values in public JSON;
- `bir_ev_000079.source_count = 1` in public JSON;
- `bir_ev_000096.source_count = 1` in public JSON;
- exact 72-route sitemap equality;
- all 74 generated legacy redirects;
- canonical links, JSON-LD, robots, content types, and observable cache headers.

## Verified audit state

```text
Total source-count mismatches   17
Incident mismatches              0
Event mismatches                17
```

## Publication observation

```text
Production generated_at   2026-07-29T05:19:45.302Z
Convergence attempt        1
```

The successful rerun used the unchanged 20-attempt convergence gate and all existing assertions.

## Result

Source-count remediation Batch 3 is merged, published, and production-verified. Evidence increased from 231 to 241, route totals remain 72, and unresolved event source-count mismatches decreased from 27 to 17.

## Next

Continue with source-count review Batch 4. Exact source-count equality remains a warning until all remaining event evidence-link migrations are complete.
