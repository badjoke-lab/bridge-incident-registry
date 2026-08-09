# Production Verification — Event Primary Remediation 01

Date: 2026-08-09
Canonical review PR: #207
Canonical data PR: #208
Canonical merge: `1638b47eb3c2e9066d0323d6d5a4abe8aa85cfb2`

## Expected production state

```text
Bridges      33
Incidents    34
Events      183
Evidence    284
```

The production verifier must confirm complete field-level equality for all four canonical public datasets, including:

- `bir_src_000003.url = https://ofac.treasury.gov/recent-actions/20220414`
- `bir_src_000003.title = North Korea Designation Update`
- `bir_src_000003.publisher = Office of Foreign Assets Control`
- `bir_src_000003.is_primary = true`
- `bir_src_000014.is_primary = true`

Matching record counts alone are insufficient. The existing publication window and equality requirements remain unchanged.

Production run result and live `generated_at` will be recorded after verification completes.
