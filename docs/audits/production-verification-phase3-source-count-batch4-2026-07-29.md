# BIR Phase 3 source-count Batch 4 production verification — 2026-07-29

Status: passed  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `fd210052b40ff038156b22d116848751990b5633`  
Publication-triggering main push: `44e785c0e286ff16a5bcd1fddc1e9ce2b9fbc37c`

## Verified canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    256
HTML routes 72
Redirects   74
```

## Successful runs

```text
Production Verification   30426111329
Canonical PR normal CI    30425990662
Verification PR normal CI 30426111337
```

The first production-verification attempt did not observe the Batch 4 publication before exhausting the convergence gate. A later docs-only `main` push from the already-reviewed final source-count boundary caused the existing Cloudflare Pages Git integration to publish. The failed production job was rerun unchanged.

The rerun detected the Batch 4 canonical state on publication attempt 1 and then passed every route and public-contract assertion.

## Verified surfaces

- all five static routes;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- version and manifest counts at 33 / 34 / 183 / 256;
- ordered evidence IDs through `bir_src_000256`;
- all fifteen Batch 4 event-scoped evidence records in public JSON;
- all three synchronized incident `source_count` values in public JSON;
- exact 72-route sitemap equality;
- all 74 generated legacy redirects;
- canonical links, JSON-LD, robots, content types, and observable cache headers.

## Verified audit state

```text
Total source-count mismatches    7
Incident mismatches              0
Event mismatches                 7
```

## Publication observation

```text
Production generated_at   2026-07-29T05:55:16.440Z
Convergence attempt        1
```

The successful rerun used the unchanged 20-attempt convergence gate and all existing assertions.

## Result

Source-count remediation Batch 4 is merged, published, and production-verified. Evidence increased from 241 to 256, route totals remain 72, and unresolved event source-count mismatches decreased from 17 to 7.

## Next

Apply the reviewed final seven evidence links, reach exact source-count equality, and enable the permanent hard CI gate.
