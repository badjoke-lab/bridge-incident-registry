# Production verification — BIR canonical-origin migration — 2026-08-04

Status: final verification running  
Canonical-origin merge: `c447d4201d9c533ea952bd60ce7854a7ff5a510d`  
Discovery-cache fix: `3d8b083c8a71b7a991a6adce2d43ec82a6361d15`  
Production origin: `https://bir.badjoke-lab.com`

## First verification

Run `30826245362` reached complete canonical public-content equality on attempt 13 at:

```text
generated_at  2026-08-03T15:13:20.965Z
Bridges       33
Incidents     34
Events        183
Evidence      284
HTML routes   72
Redirects     74
```

Canonical HTML, JSON-LD, `version.json`, sitemap, datasets, routes, redirects, content types, and cache signals passed. The only failure was a stale cached `robots.txt` retaining the prior sitemap origin.

PR #163 added explicit zero-age revalidation headers for `robots.txt` and `sitemap.xml` without changing discovery content, canonical data, or routes.

## Final completion condition

The unchanged production verifier must pass all assertions against the custom domain, including the refreshed robots sitemap reference.
