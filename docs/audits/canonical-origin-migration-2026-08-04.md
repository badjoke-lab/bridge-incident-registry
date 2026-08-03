# BIR canonical-origin migration — 2026-08-04

Status: implementation complete; production verification required  
Previous origin: `https://bridge-incident-registry.pages.dev`  
Canonical origin: `https://bir.badjoke-lab.com`

## Scope

This change promotes the verified Cloudflare custom domain to the formal BIR origin.

Updated permanent configuration:

- Astro `site` fallback used for canonical links, sitemap URLs, and generated absolute URLs;
- machine-readable public-layer `canonical_origin`;
- production-verification workflow target.

Canonical bridge, incident, event, evidence, and reference data are unchanged. Record counts, routes, redirects, source-quality ceilings, and the public schema are unchanged.

## Completion condition

After merge and Cloudflare Pages publication, the unchanged production verifier must confirm:

- all canonical HTML links use `https://bir.badjoke-lab.com`;
- JSON-LD URLs use the custom domain;
- `version.json` reports the custom canonical origin;
- sitemap and robots URLs use the custom domain;
- all canonical public datasets remain exactly equal;
- all existing routes and redirects continue to pass.
