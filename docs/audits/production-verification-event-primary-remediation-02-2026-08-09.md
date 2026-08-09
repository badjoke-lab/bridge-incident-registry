# Production Verification — Event Primary Remediation 02

Date: 2026-08-09
Canonical review PR: #211
Canonical data PR: #213
Canonical merge: `f2874a2d0ffe6877eadf6619cd6100a9b9b3991b`
Production audit PR: #214
Production run: `31300484236`
Production job: `93212360938`

Status: complete and production-verified

## Verified production state

```text
Bridges      33
Incidents    34
Events      183
Evidence    287
HTML routes  72
Redirects    74
```

Live `version.json` after convergence:

```text
generated_at  2026-08-09T07:08:45.362Z
```

Verified quality state:

```text
Primary evidence                       206 / 287
Tier 1 evidence                        223 / 287
Evidence with archived_url             130 / 287
Events without primary                  11 / 183
Events without Tier 1                     6 / 183
Terminal unarchived unique URLs          15
Risky-host unarchived unique URLs        16
Unknown URL status                        0
```

## Publication convergence

The unchanged verifier correctly rejected the first two responses because production still exposed the prior 284-evidence build:

```text
attempt 1  generated_at 2026-08-09T07:02:12.609Z  evidence 284  not converged
attempt 2  generated_at 2026-08-09T07:02:12.609Z  evidence 284  not converged
attempt 3  generated_at 2026-08-09T07:08:45.362Z  evidence 287  complete equality
```

Attempt 3 returned HTTP 200 for all four canonical datasets and passed complete canonical-derived field-level equality. That includes the exact new event-scoped evidence records `bir_src_000285`, `bir_src_000286`, and `bir_src_000287`, plus the synchronized direct source counts for the affected Poly Network and Transit Finance incident/event records.

Matching record counts were not used as a substitute for content equality. The same run also passed canonical HTML routes, redirects, metadata, JSON-LD, sitemap, robots, content types, cache observations, version metadata, manifest metadata, and canonical-only markers.

## Refresh boundary

No build-input refresh, deployment retrigger, or verification relaxation was required. Production converged naturally on attempt 3 inside the unchanged 20-attempt / 15-second window.

## Conclusion

Event Primary Remediation 02 is published and production-verified. Evidence is now 287, primary evidence 206, Tier 1 evidence 223, archived evidence records 130, and events without primary evidence 11. Four non-intentional reviewed primary gaps remain deferred: `bir_ev_000014`, `bir_ev_000143`, `bir_ev_000144`, and `bir_ev_000148`; intentional secondary-only boundaries remain unchanged.
