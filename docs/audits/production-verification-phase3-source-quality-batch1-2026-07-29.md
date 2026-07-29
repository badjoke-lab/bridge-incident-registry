# BIR Phase 3 source-quality Batch 1 production verification — 2026-07-29

Status: in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `cbff8411ee7f0bde4d4cd13624166502bded7fdc`

## Expected canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    265
HTML routes 72
```

## Expected source-quality state

```text
Primary evidence                    183
Tier 1 evidence                     201
Official-domain evidence            123
Incidents without primary evidence    1
Incidents without tier 1 evidence     1
Events without primary evidence      34
Events without tier 1 evidence       25
```

## Verification scope

- wait for production to converge without weakening the existing publication gate;
- verify all five static routes;
- verify all 33 bridge detail routes;
- verify all 34 incident detail routes;
- verify version, manifest, and public JSON counts;
- verify ordered evidence IDs through `bir_src_000265`;
- verify the two LI.FI first-party event-scoped evidence records;
- verify `bir_inc_000015` completed reimbursement and resolved state;
- verify `bir_ev_000044` completed reimbursement text and status;
- verify exact source-count equality;
- verify exact 72-route sitemap equality;
- verify canonical links, JSON-LD, robots, redirects, content types, and observable cache headers.

## Result

Pending the unchanged production-verification workflow.
