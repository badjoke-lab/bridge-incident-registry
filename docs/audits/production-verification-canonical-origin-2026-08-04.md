# Production verification — BIR canonical-origin migration — 2026-08-04

Status: verification running  
Canonical origin merge: `c447d4201d9c533ea952bd60ce7854a7ff5a510d`  
Production origin: `https://bir.badjoke-lab.com`

## Verification boundary

The unchanged full-content production verifier must confirm the custom domain without weakening any existing checks.

Expected state:

```text
Bridges    33
Incidents  34
Events     183
Evidence   284
HTML routes 72
Redirects   74
```

Required assertions:

- complete canonical public-content equality;
- custom-domain canonical links and JSON-LD URLs;
- custom `canonical_origin` in `version.json`;
- custom-domain sitemap and robots references;
- all static, bridge, and incident routes;
- all legacy redirects;
- expected content types and cache signals.
