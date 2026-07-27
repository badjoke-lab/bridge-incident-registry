# BIR Production Verification — 2026-07-28

Status: passed  
Production origin: `https://bridge-incident-registry.pages.dev`  
Related remediation PR: PR #59  
Related main checkpoint: `57e4fc948fc9a26f20833b657c8d31822c72f56a`  
Verification workflow run: `30290442852`  
Verification job: `90058648441`

## Canonical baseline

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

## Verification method

GitHub Actions executed `npm run production:verify` from the PR 7 branch against the public Cloudflare Pages origin.

The verifier loaded current canonical JSON from the repository and compared it with live production responses.

## Passed checks

### Human-facing HTML

- `/`
- `/bridges/`
- `/incidents/`
- `/methodology/`
- `/about/`
- all 26 canonical bridge detail routes
- all 27 canonical incident detail routes

For every checked HTML page, the verifier required:

- HTTP 200
- `text/html` content type
- the exact production canonical URL
- production `index, follow` robots metadata
- canonical data-discovery links
- valid JSON-LD with the expected page URL
- matching record identifiers on bridge and incident detail pages
- at least one observable cache-related response header

### Machine-readable public layer

- `/version.json`
- `/data/manifest.json`
- `/data/bridges.json`
- `/data/incidents.json`
- `/data/events.json`
- `/data/evidence.json`

The verifier confirmed:

- HTTP 200
- JSON content types
- canonical-only safety markers
- exact canonical record counts
- bridge, incident, event, and evidence IDs in canonical order
- the configured production origin

### Discovery and routing

- `/robots.txt`
- `/sitemap.xml`
- every generated legacy bridge and incident redirect

The verifier confirmed:

- production crawl permission
- the production sitemap URL
- exact sitemap equality with all canonical HTML routes
- redirect status responses
- redirect destinations matching current canonical slugs

### Repository validation

The ordinary `Check` workflow run `30290443807` also passed:

- Astro and type checks
- canonical data validation
- first-ten seed audit
- static build
- final `dist` consistency check
- controlled count, ID, metadata, route, sitemap, and publication-boundary failure fixtures

## Result

No production-verification errors were reported.

The seven-step public-consistency remediation is complete when PR #59 merges.

Canonical record expansion may resume only from the latest `main`, after the parked Batch 6 branch is compared with current history or recreated.

## Limitations

- The verification establishes public content, metadata, routing, and observable HTTP behavior; it does not identify a Cloudflare internal deployment build ID.
- Direct access from the assistant execution container was unavailable because external DNS resolution was restricted, so the network verification was executed from GitHub Actions.
- This audit does not change or re-review any canonical bridge, incident, event, or evidence record.
