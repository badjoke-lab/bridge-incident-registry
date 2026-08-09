# Production Verification — Event Primary Remediation 01

Date: 2026-08-09
Canonical review PR: #207
Canonical data PR: #208
Canonical merge: `1638b47eb3c2e9066d0323d6d5a4abe8aa85cfb2`

## Verified production state

```text
Bridges      33
Incidents    34
Events      183
Evidence    284
HTML routes  72
Redirects    74
Generated at 2026-08-09T06:42:13.747Z
```

Production Verification run `31299468964`, job `93209808769`, reached complete canonical-derived field-level equality on attempt 4 of 20.

Attempts 1 through 3 correctly rejected stale same-count production because `bir_src_000003` still differed from canonical content while `generated_at` remained `2026-08-09T06:38:36.602Z`. Attempt 4 observed `generated_at 2026-08-09T06:42:13.747Z` and complete content equality.

The live evidence dataset matched the canonical remediation exactly, including:

- `bir_src_000003.url = https://ofac.treasury.gov/recent-actions/20220414`
- `bir_src_000003.title = North Korea Designation Update`
- `bir_src_000003.publisher = Office of Foreign Assets Control`
- `bir_src_000003.is_primary = true`
- `bir_src_000014.is_primary = true`

The verifier also passed all canonical HTML routes, redirects, version and manifest metadata, sitemap, robots, content types, cache observations, and canonical-only markers.

No build-input refresh or deployment retrigger was required.

## Quality effect

```text
Evidence records                   284
Events without primary evidence     14
Events without Tier 1 evidence       6
Source-count mismatches              0
Unknown URL status                   0
Canonical public content match    true
```

This closes Event Primary Remediation 01 publication verification. The next quality work is a separately bounded review of the remaining primary-evidence gaps; no secondary source is upgraded merely to improve the metric.
