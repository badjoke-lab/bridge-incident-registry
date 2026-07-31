# Phase 3 archive capture Batch 1 production verification — 2026-07-31

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `5a152f647e05018170e57721dfdef69d1cadf12b`

## Verified production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      10
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Verified quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        54
Risky-host unarchived unique URLs      83
Unknown URL status                      0
```

## Publication behavior

Attempt 1 observed the previous 284-evidence dataset without the new archive fields. The verifier rejected it at `bir_src_000035` despite identical record counts.

Attempt 2 observed the complete canonical-derived archive fields and passed full public-content equality.

```text
Production verification run  30614617534
Canonical normal CI           30614478890
Generated at                  2026-07-31T07:57:38.614Z
Publication attempt           2
```

## Verified archive publication

The public evidence dataset contains the exact reviewed `archived_url` values for:

```text
bir_src_000035
bir_src_000039
bir_src_000086
bir_src_000088
bir_src_000090
bir_src_000230
bir_src_000231
bir_src_000232
bir_src_000233
bir_src_000234
```

## Verification scope passed

- every transformed field in all 33 bridge records;
- every transformed field in all 34 incident records;
- every transformed field in all 183 event records;
- every transformed field in all 284 evidence records;
- all five static routes;
- all bridge and incident detail routes;
- exact 72-route sitemap equality;
- all 74 redirects;
- canonical metadata, JSON-LD, robots, content types, and cache signals.

## Conclusion

Archive capture Batch 1 is canonical and production-verified. Ten evidence records now expose five verified Wayback snapshots. The actionable archive queues are 54 terminal unique URLs and 83 risky-host unique URLs.

## Next

Continue bounded archive capture work without using wildcard, guessed, or unrelated snapshots, while preserving exact full-content production verification after every canonical archive migration.
