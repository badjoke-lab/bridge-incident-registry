# Phase 3 event Tier 1 Batch 2 production verification — 2026-07-30

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `7c52a3804043bc9d16da5ddcf6faeef608da804d`

## Verified production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       279
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Verified quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Events without primary                 20
Events without Tier 1                  11
Unknown URL status                      0
Terminal unarchived unique URLs        59
Risky-host unarchived unique URLs      87
```

## Verified evidence publication

The public evidence dataset includes ordered IDs through `bir_src_000279` and the complete canonical-derived fields for `bir_src_000272` through `bir_src_000279`.

## Verification result

```text
Production verification run  30542396678
Production-PR normal CI       30542393855
Canonical-PR normal CI        30542215442
Generated at                  2026-07-30T12:24:11.345Z
Publication attempt           2
```

Attempt 1 observed the previous 271-evidence deployment. Attempt 2 observed 33 / 34 / 183 / 279 and complete canonical-derived JSON equality.

The verifier also passed:

- all five static routes;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- version and manifest counts and canonical-only markers;
- exact 72-route sitemap equality;
- all 74 legacy redirects;
- canonical links, JSON-LD, robots, content types, and cache signals.

## Conclusion

Event Tier 1 remediation Batch 2 is canonical and production-verified. The public registry now exposes 279 evidence records, including all eight reviewed event-scoped first-party additions. The full-content gate rejected the old 271-record deployment until the new generated public contract was available.

## Next

1. review the final five unreviewed event Tier 1 gaps;
2. continue Nerve Bridge first-party/Tier 1 research without weakening source hierarchy;
3. begin verified archive captures for the 87 risky-host and 59 terminal unique-URL queues.
