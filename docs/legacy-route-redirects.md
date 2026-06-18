# Legacy Route Redirects

Status: implemented in public-consistency remediation PR 5

## Source

Redirects are derived from canonical record fields:

```text
previous_slugs
redirect_from
```

Bridge history maps to `/bridge/{slug}/`. Incident history maps to `/incident/{slug}/`.

## Output

The build generates:

```text
public/_redirects
```

The file is ignored by Git and recreated during each build.

Each accepted legacy slug generates both variants:

```text
/bridge/old-slug
/bridge/old-slug/
```

Both redirect permanently to the trailing-slash canonical route.

The same rule applies to incident routes.

## Validation

Generation fails when:

- a legacy slug is not a normalized lowercase slug
- a source equals its target
- a source collides with a canonical route
- one source maps to multiple targets
- a target is not a current canonical bridge or incident page
- a redirect loop exists

The post-generation check parses `public/_redirects`, compares it with the canonical-derived expected output, rechecks targets and loops, and confirms no legacy source appears in the sitemap.

## Build order

```text
canonical staging
machine-readable publication
discovery publication
redirect publication
machine-data checks
discovery checks
redirect checks
Astro build
```

## Boundary

This PR handles route generation and redirect integrity. Full inspection of the built `dist` tree and intentional mismatch tests remain remediation PR 6 work.
