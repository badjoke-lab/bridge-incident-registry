# Canonical Metadata and Discovery

Status: implemented in public-consistency remediation PR 4

## Production origin

The production origin is configured through `PUBLIC_SITE_ORIGIN` with this fallback:

```text
https://bridge-incident-registry.pages.dev
```

Astro and the machine-readable generator use the same environment variable name.

## HTML metadata

Every page receives:

- a production canonical URL
- meta description
- robots and Googlebot policy
- manifest and version alternate links
- language-model and AI guidance links
- optional page-specific JSON alternate link
- Open Graph title, description, URL, site name, and locale
- Twitter summary metadata
- JSON-LD `WebPage`, `CollectionPage`, or `AboutPage` metadata

Bridge and incident detail pages also publish conservative `Dataset` JSON-LD with stable IDs, verification dates, canonical page URLs, and public JSON distributions.

The homepage publishes dataset distribution metadata for bridge, incident, event, and evidence JSON.

## Preview indexing policy

A build is treated as a preview when:

- `PUBLIC_NO_INDEX=true`, or
- `CF_PAGES_BRANCH` differs from `CF_PAGES_PRODUCTION_BRANCH` or `main`

Preview HTML receives:

```text
noindex, nofollow
```

The generated Cloudflare `_headers` file also applies:

```text
X-Robots-Tag: noindex, nofollow
```

Production builds remain indexable.

## Sitemap

`scripts/publish-discovery.mjs` generates `public/sitemap.xml` from canonical JSON.

It includes:

- homepage
- bridge and incident indexes
- methodology and about pages
- every canonical bridge detail page
- every canonical incident detail page

Legacy slugs are excluded.

Each canonical record page receives its own `lastmod` from `last_verified_at`.

## Robots

Production `robots.txt` allows crawling and points to the production sitemap.

Preview `robots.txt` disallows crawling and still identifies the production sitemap.

## Response headers

The generated Cloudflare `_headers` file sets JSON and text content types and short public cache periods for version, data, and guidance endpoints.

Preview builds additionally receive the noindex response header.

## Human discovery

The site footer links to:

```text
/version.json
/data/manifest.json
/llms.txt
/ai.txt
```

## Build checks

`check-discovery.mjs` verifies:

- all canonical HTML paths appear in the sitemap
- sitemap URL count is exact
- legacy slugs do not appear
- robots points to the production sitemap
- production and preview crawl policies match the build environment
- preview headers contain the noindex directive
- JSON endpoint headers are present

Full inspection of built HTML and `dist` remains remediation PR 6 work.
