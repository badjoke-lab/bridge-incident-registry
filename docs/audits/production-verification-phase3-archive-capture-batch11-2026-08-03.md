# Phase 3 archive capture Batch 11 production verification — 2026-08-03

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `f8c0772acbabbf7f468f818e3d8f00b83ca9e38a`  
Docs-only retrigger merge: `d143b3b12b11c79cd0d78e30b965a25ed4d5e480`  
Build-input refresh merge: `2276d4e37096e29f090c0238f9f0cd6f64a725eb`

## Verified production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      85
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Verified quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        36
Terminal unarchived evidence records   47
Risky-host unarchived unique URLs      33
Risky-host unarchived evidence records 51
X/Twitter evidence records unarchived  38
Unknown URL status                      0
```

## Initial verification

The unchanged verifier rejected the prior public evidence content at `bir_src_000029` for all twenty attempts.

```text
Production verification run  30783692287
First failed job             91593095620
Initial verification CI      30783692322
Final observed generated_at  2026-08-03T04:13:42.118Z
First mismatch               bir_src_000029
Rejected attempts            1–20
```

## Docs-only retrigger

PR #155 added a docs-only `main` commit, but the second twenty-attempt verification window observed the same `generated_at`. The docs-only commit therefore did not start a new Cloudflare Pages production build.

```text
Docs-only retrigger PR     #155
Docs-only retrigger merge  d143b3b12b11c79cd0d78e30b965a25ed4d5e480
Docs-only normal CI        30783987769
Second failed job          91594233914
Observed generated_at      2026-08-03T04:13:42.118Z
Rejected attempts          1–20
```

Canonical data, archive mappings, source-quality ceilings, and verification logic were unchanged.

## Build-input refresh

PR #156 changed only one non-executable comment in `scripts/build-public-site.mjs`. Build steps, order, output contract, and runtime behavior remained unchanged. This build-input change passed the Pages path filter and forced a new production build.

```text
Build-input refresh PR     #156
Build-input refresh merge  2276d4e37096e29f090c0238f9f0cd6f64a725eb
Build-input normal CI      30784453676
Successful production job  91595453784
Generated at               2026-08-03T04:26:39.509Z
Publication attempt        1 after build-input refresh
```

The same workflow run and unchanged verifier passed on the first attempt after the build-input refresh.

## Canonical verification

```text
Review workflow run  30782953188
Review workflow job  91591043806
Canonical normal CI  30783449108
Final canonical CI   30783546644
```

## Verified content

The verifier confirmed:

- the exact Batch 11 `archived_url` field on `bir_src_000029`;
- all eighty-five exact archive fields;
- every transformed field in all 33 bridge, 34 incident, 183 event, and 284 evidence records;
- exact public record ordering;
- five static pages, all 33 bridge routes, and all 34 incident routes;
- exact sitemap equality for 72 canonical HTML routes;
- all 74 legacy redirects;
- canonical links, metadata, JSON-LD, robots, content types, and cache assertions.

## Closure

Archive Capture Batch 11 is production-verified. One verified Multichain cessation snapshot was added without changing its source URL, claim, source hierarchy, date, or linkage. Nine selected Everclear, Syndicate, Holograph, Wormhole, and Taiko candidates remain unarchived because they did not pass the exact replay boundary. The actionable archive queues are now 36 terminal unique URLs and 33 risky-host unique URLs.
