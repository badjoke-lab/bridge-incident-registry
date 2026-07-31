# Phase 3 final event Tier 1 production verification — 2026-07-31

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `b07a33b6a61be8338466b5257e121a543884e2f3`

## Verified production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Verified quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Events without primary                 16
Events without Tier 1                   6
Unreviewed event Tier 1 gaps             0
Unknown URL status                      0
Terminal unarchived unique URLs        59
Risky-host unarchived unique URLs      88
```

## Verified evidence publication

The public evidence dataset includes ordered IDs through `bir_src_000284` and the complete canonical-derived fields for `bir_src_000280` through `bir_src_000284`.

## Verification result

```text
Production verification run  30612188969
Production-PR normal CI       30612188935
Canonical-PR normal CI        30544058869
Generated at                  2026-07-31T07:14:14.901Z
Publication attempt           1
```

Attempt 1 observed 33 / 34 / 183 / 284 and complete canonical-derived JSON equality.

The verifier also passed:

- all five static routes;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- version and manifest counts and canonical-only markers;
- exact 72-route sitemap equality;
- all 74 legacy redirects;
- canonical links, JSON-LD, robots, content types, and cache signals.

## Conclusion

The final event Tier 1 migration is canonical and production-verified. The public registry now exposes 284 evidence records, all event Tier 1 gaps have been reviewed, and the six remaining gaps are intentionally secondary under the existing source hierarchy.

## Next

1. continue Nerve Bridge first-party/Tier 1 research without weakening source hierarchy;
2. begin verified archive captures for the 88 risky-host and 59 terminal unique-URL queues;
3. continue validator, monitoring, candidate collection, and v1 hardening.
