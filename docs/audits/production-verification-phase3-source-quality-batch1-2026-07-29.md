# BIR Phase 3 source-quality Batch 1 production verification — 2026-07-29

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `cbff8411ee7f0bde4d4cd13624166502bded7fdc`  
Deployment retrigger: `8ed1cd13292eefe524609c5f2db8578d58a07bee`  
Production verification run: `30454087470`

## Verified production state

```text
Bridges     33
Incidents   34
Events      183
Evidence    265
HTML routes 72
Redirects   74
```

## Verified source-quality state

```text
Primary evidence                    183
Tier 1 evidence                     201
Official-domain evidence            123
Incidents without primary evidence    1
Incidents without tier 1 evidence     1
Events without primary evidence      34
Events without tier 1 evidence       25
```

## Verified LI.FI correction

- `bir_src_000264` and `bir_src_000265` are published in canonical order;
- `bir_inc_000015` reports completed operator-funded reimbursement and `is_unresolved = false`;
- `bir_ev_000043` links the first-party exploit postmortem;
- `bir_ev_000044` reports the whitelist fix, reopened swaps, and reimbursement of all 29 affected wallets;
- attacker-fund recovery remains separate from user reimbursement;
- incident and event `source_count` values remain exactly equal to direct evidence links.

## Verification scope

The unchanged verifier passed:

- all five static routes;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- version, manifest, and public JSON counts;
- ordered evidence IDs through `bir_src_000265`;
- the two LI.FI first-party event-scoped evidence records;
- the corrected LI.FI incident and resolution event;
- exact 72-route sitemap equality;
- all 74 redirects;
- canonical links, JSON-LD, robots, content types, and observable cache headers.

## Deployment result

The first verification attempt exhausted all 20 publication checks because production remained at Evidence 263. PR #105 created a docs-only `main` push without changing canonical data, validation, verifier assertions, routes, runtime settings, or timeout values. The unchanged rerun detected the 265-evidence production state on attempt 1 and passed.

```text
Generated at  2026-07-29T13:06:10.965Z
Attempt       1
```
