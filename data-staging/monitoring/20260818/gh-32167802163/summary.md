# BIR Public Site Health — 20260818

Run: `gh-32167802163`

- Origin: https://bir.badjoke-lab.com
- Targets probed twice: 6
- Healthy baselines seeded: 2
- Findings: 1
- Sampled bridge: bir_bridge_000029
- Sampled incident: bir_inc_000035

## Findings

- **/version.json failed repeated public contract checks** — high — public_machine_contract_regression
  - Two independent healthy HTTP responses produced the same validation failures: version_count_mismatch:bridges|version_count_mismatch:events|version_count_mismatch:evidence|version_count_mismatch:incidents. Review production output before changing canonical data.
  - https://bir.badjoke-lab.com/version.json

## Safety

This is review-only production health state. Canonical records were not changed.

