# BIR Phase 3 URL-status Batch 1 production verification — 2026-07-29

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `d0e9674745996fc1d85a32710890fa880d8946ad`  
Production verification run: `30457429225`  
Normal CI run: `30457429426`

## Verified production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       265
HTML routes                     72
Redirects                       74
Unknown URL status               0
Canonical public content match  true
```

## Verified Holograph records

- `bir_src_000112` and `bir_src_000239` use `https://x.com/holographxyz/status/1801332482262110301`;
- both publish `url_status: live`;
- both publish `accessed_at: 2026-07-29`;
- no public evidence record retains `url_status: unknown`;
- source tiers, reliability, linkages, claims, and source counts remain unchanged.

## Production-gate defect found

The original verifier accepted the first run because record counts and ordered IDs were unchanged at 33 / 34 / 183 / 265. Its observed production generation timestamp was older than the URL-status merge, so that success did not prove that the two changed evidence fields had published.

The gate was strengthened before completion:

- build the expected public datasets through the same `buildPublicRecords` transformation used by publication;
- compare every field of all bridge, incident, event, and evidence records;
- ignore object key order while preserving array and record order;
- block publication convergence when counts and IDs match but any field differs;
- report the first mismatched record;
- test same-count field drift, record-order drift, length drift, and key-order normalization in normal CI.

An intermediate raw-canonical comparison correctly failed but also exposed that public records intentionally contain generated URL fields. The final implementation compares live output with the generated public contract rather than raw canonical records.

## Final verification result

```text
Canonical production content available on attempt 1
Generated at  2026-07-29T13:30:13.794Z
Public content match  true
```

The final verifier passed:

- complete transformed JSON equality for all four public datasets;
- all five static routes;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- version and manifest contracts;
- exact 72-route sitemap equality;
- all 74 redirects;
- canonical links, JSON-LD, robots, content types, and observable cache headers.

Future same-count field changes cannot be accepted solely because counts and IDs remain unchanged.
