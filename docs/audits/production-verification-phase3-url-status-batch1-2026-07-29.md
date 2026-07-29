# BIR Phase 3 URL-status Batch 1 production verification — 2026-07-29

Status: in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `d0e9674745996fc1d85a32710890fa880d8946ad`

## Expected production state

```text
Bridges     33
Incidents   34
Events      183
Evidence    265
HTML routes 72
```

## Expected URL-quality state

```text
Unknown URL status  0
```

## Verification scope

- wait for production to converge without weakening the existing publication gate;
- verify all five static routes;
- verify all 33 bridge detail routes;
- verify all 34 incident detail routes;
- verify version, manifest, and public JSON counts;
- verify ordered evidence IDs through `bir_src_000265`;
- verify `bir_src_000112` and `bir_src_000239` use the canonical Holograph `x.com` route;
- verify both records publish `url_status: live` and `accessed_at: 2026-07-29`;
- verify no public evidence record retains `url_status: unknown`;
- verify exact source-count equality;
- verify exact 72-route sitemap equality;
- verify canonical links, JSON-LD, robots, redirects, content types, and observable cache headers.

## Result

Pending the unchanged production-verification workflow and explicit public-evidence inspection.
