# BIR Public Site Health — 20260816

Run: `gh-31959667907`

- Origin: https://bir.badjoke-lab.com
- Targets probed twice: 6
- Healthy baselines seeded: 2
- Findings: 1
- Sampled bridge: bir_bridge_000003
- Sampled incident: bir_inc_000029

## Findings

- **/sitemap.xml failed repeated public contract checks** — medium — public_site_metadata_regression
  - Two independent healthy HTTP responses produced the same validation failures: sitemap_count_mismatch. Review production output before changing canonical data.
  - https://bir.badjoke-lab.com/sitemap.xml

## Safety

This is review-only production health state. Canonical records were not changed.

