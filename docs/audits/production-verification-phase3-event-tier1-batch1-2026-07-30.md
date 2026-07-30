# Phase 3 event Tier 1 Batch 1 production verification — 2026-07-30

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `da066fb29b5b45f6c8602ef36becf6536bfe6a29`

## Verified production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       271
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Verified quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Events without primary                 28
Events without Tier 1                  19
Unknown URL status                      0
Terminal unarchived unique URLs        59
Risky-host unarchived unique URLs      83
```

## Verified evidence publication

The public evidence dataset includes ordered IDs through `bir_src_000271` and the complete canonical-derived fields for:

- `bir_src_000266` — Commons Bridge proxy compromise;
- `bir_src_000267` — Syndicate investigation and tracing;
- `bir_src_000268` — Ronin validator compromise disclosure;
- `bir_src_000269` — Nomad root-cause evidence;
- `bir_src_000270` — Poly Network asset recovery completion;
- `bir_src_000271` — Celer compensation commitment.

## Verification result

```text
Production verification run  30540271827
Production-PR normal CI       30540271837
Canonical-PR normal CI        30540042953
Generated at                  2026-07-30T11:53:51.220Z
Publication attempt           6
```

Attempts 1 through 5 observed the previous 265-evidence deployment. Attempt 6 observed 33 / 34 / 183 / 271 and complete canonical-derived JSON equality.

The verifier also passed:

- all five static routes;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- version and manifest counts and canonical-only markers;
- exact 72-route sitemap equality;
- all 74 legacy redirects;
- canonical links, JSON-LD, robots, content types, and cache signals.

## Conclusion

Event Tier 1 remediation Batch 1 is canonical and production-verified. The public registry now exposes 271 evidence records, including all six reviewed event-scoped first-party additions. The full-content gate rejected the old 265-record deployment until the new generated public contract was available.

## Next

1. review the remaining 19 event Tier 1 gaps in bounded Batch 2;
2. continue Nerve Bridge first-party/Tier 1 research without weakening source hierarchy;
3. begin verified archive captures for the 83 risky-host and 59 terminal unique-URL queues.
