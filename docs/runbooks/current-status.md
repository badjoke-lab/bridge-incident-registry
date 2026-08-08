# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-08-09

## Canonical and production state

```text
Bridges     33
Incidents   34
Events      183
Evidence    284
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      284
```

## Phase 3 quality strengthening

```text
Full-corpus audit                    complete — PR #71
Aftermath and restart normalization  complete — PRs #72–#77
Source-count remediation             complete — PRs #78–#99
Hard source-count equality gate      active
Source-quality baseline              complete — PR #100
Source-quality no-regression gate    active
Source-quality remediation           complete — PRs #103–#107
Event Tier 1 remediation             production-verified — PRs #108–#116
Nerve source boundary                reviewed — PR #117
Archive capture Batches 1–18         production-verified — PRs #118–#198
Previously-unreviewed archive queue  exhausted
Deferred Archive Retry 01            production-verified — PRs #199–#201
Unknown URL-status hard ceiling      active at 0
Full production-content equality     active
```

## Public UI/support follow-up

```text
PR #183  Representative desktop/mobile screenshot audit
PR #186  Incident discovery, filters, pagination, detail TOCs, support, and project navigation
PR #187  Shared BadJoke-Lab support-wallet presentation
```

Cloudflare Pages preview deployment remains `none`.

## Exact source-count and URL state

```text
Incident mismatches  0
Event mismatches     0
Unknown URL status   0
```

## Source-quality state

```text
Primary evidence                         201 / 284
Tier 1 evidence                          220 / 284
Official-domain evidence                 131 / 284
Evidence with archived_url               126 / 284
Bridges without primary evidence           0 / 33
Bridges without tier 1 evidence            0 / 33
Incidents without primary evidence         1 / 34
Incidents without tier 1 evidence          1 / 34
Events without primary evidence           16 / 183
Events without tier 1 evidence              6 / 183
Unreviewed event Tier 1 gaps                0
Terminal unarchived unique URLs           15
Terminal unarchived evidence records      25
Risky-host unarchived unique URLs         17
Risky-host unarchived evidence records    31
X/Twitter evidence records unarchived     29
Unknown URL status                         0
```

Archive Capture Batch 18 exhausted the previously-unreviewed archive candidate set. A repository-derived inventory then found 45 reviewed-but-unarchived evidence records across 32 unique URLs.

Deferred Archive Retry 01 selected ten higher-value reviewed unresolved URLs, prioritising terminal and first-party/official material while excluding X/Twitter from the first retry pass. Two sources newly satisfied the unchanged two-pass exact-replay boundary:

```text
bir_src_000037  Qubit — Our Compensation Plan 1
bir_src_000068  Harmony — Summary of the Horizon Bridge Incident
```

The other eight selected URLs remain deferred. No acceptance rule was weakened.

The canonical migration in PR #200 raised archived evidence from 124 to 126, reduced terminal unique URLs from 17 to 15, and reduced risky-host unique URLs from 18 to 17.

All event Tier 1 gaps are reviewed. The six remaining gaps are intentional secondary records:

```text
bir_ev_000006
bir_ev_000009
bir_ev_000012
bir_ev_000051
bir_ev_000087
bir_ev_000088
```

Remaining incident-level gap:

- `bir_inc_000026` — Nerve Bridge 2021 metapool exploit. PR #117 records the completed first-party research boundary; no stable incident-specific primary source was located and the gap remains intentional.

## Latest completed production checkpoint

```text
Review PR                     #199
Review merge                  53bcdc47f4269a00dc1c671f7428f75a8fe35c1e
Canonical data PR             #200
Canonical merge               934c85c49f7db71773721c5f4d64cc769f1361b0
Production audit PR           #201
Production verify run         31267226936
Production verify job         93127231682
Read-only production probe    31267391787
Read-only probe job           93127650808
Verified state                33 / 34 / 183 / 284
Archived evidence             126 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-08T16:33:32.318Z
Build-input refresh           not required
```

The read-only probe independently confirmed live canonical-only version metadata and the exact archive URLs for both Deferred Retry 01 records.

## Next

1. run Deferred Archive Retry 02 against a different high-value subset of the remaining reviewed-unresolved URLs; do not immediately recycle the eight Retry 01 failures;
2. reduce the remaining 16 events without primary evidence where justified;
3. strengthen remaining validators;
4. begin review-gated monitoring and candidate collection without automatic canonical publication;
5. continue v1 documentation, accessibility, performance, compatibility, and release hardening.
