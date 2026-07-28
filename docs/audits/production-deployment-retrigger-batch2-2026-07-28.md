# Batch 2 production deployment retrigger — 2026-07-28

Status: deployment retrigger required  
Canonical merge: `70bd5de1526cca5ce3122a7bdc23ea80d50179e0`

## Reason

Source-count remediation Batch 2 merged successfully and passed normal repository CI at the canonical state:

```text
Bridges     33
Incidents   34
Events      183
Evidence    231
HTML routes 72
```

Two unchanged production-verification attempts failed because the live Cloudflare Pages deployment remained at the previous state:

```text
Bridges     33
Incidents   34
Events      183
Evidence    221
```

A GitHub-hosted diagnostic confirmed:

- production `version.json` still reported evidence count 221;
- public evidence JSON ended at `bir_src_000221`;
- `bir_ev_000044.source_count` remained 3;
- `bir_ev_000054.source_count` remained 2;
- the six affected incident counts remained at their Batch 1 values.

The failure is therefore a missing production deployment, not a verifier assertion error.

## Action

This docs-only commit is merged through normal review to create a new `main` push and retrigger the existing Cloudflare Pages Git integration.

No canonical data, build contract, verification condition, route, or runtime setting is changed.

## Completion condition

After this commit reaches `main`, the existing production verifier must pass without relaxed conditions at 33 / 34 / 183 / 231 across all 72 canonical HTML routes.
