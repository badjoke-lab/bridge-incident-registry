# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-29

GitHub state and canonical JSON are authoritative.

## Canonical baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    265
```

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          complete through Batch 7
Phase 3  Full-corpus quality strengthening         active
         Source-count remediation                  complete — PRs #78–#99
         Hard source-count equality gate           active
         Source-quality baseline                   complete — PR #100
         Source-quality remediation Batch 1        complete — PRs #103–#105
         URL-status remediation Batch 1            complete — PRs #106–#107
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest production checkpoint

```text
Canonical data PR        #106
Canonical merge          d0e9674745996fc1d85a32710890fa880d8946ad
Production audit PR      #107
Production verify run    30457429225
Normal CI run            30457429426
Verified state           33 / 34 / 183 / 265
Canonical content match  true
Verified HTML routes     72
Verified redirects       74
Generated at             2026-07-29T13:30:13.794Z
```

## Quality state

```text
Incident source-count mismatches  0
Event source-count mismatches     0
Incidents without primary         1
Incidents without Tier 1          1
Events without primary           34
Events without Tier 1            25
Terminal evidence unarchived     76
Risky-host evidence unarchived   90
Unknown URL status                0
```

URL-status Batch 1 resolves the final two unknown records by normalizing the Holograph official incident post to its canonical `x.com` route. Normal CI now blocks any future unknown status.

The production verifier was also strengthened after a same-count deployment exposed a false-success path. It now generates the expected public contract and compares all fields of every bridge, incident, event, and evidence record. A same-count field-drift fixture is mandatory in normal CI.

Records:

- `docs/audits/phase3-url-status-remediation-batch1-2026-07-29.md`
- `docs/audits/production-verification-phase3-url-status-batch1-2026-07-29.md`

## Immediate source-quality targets

1. inventory the 25 events without Tier 1 evidence and form the next bounded remediation batch;
2. continue Nerve Bridge first-party research without weakening source hierarchy;
3. reduce the 34 events without primary evidence;
4. begin archive coverage with terminal bridges and X/Twitter sources;
5. tighten archive-risk ceilings as verified captures are added.

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

Publication convergence now requires:

- matching record counts;
- canonical-only markers;
- complete transformed JSON equality for bridges, incidents, events, and evidence;
- exact record and array order;
- all route, sitemap, metadata, redirect, content-type, and cache assertions.

## Remaining roadmap

1. reduce event-level Tier 1 and primary gaps in bounded batches;
2. close or document the remaining incident-level primary and Tier 1 gap;
3. add archive captures for terminal and risky-host evidence;
4. strengthen remaining validators;
5. complete public-contract compatibility review;
6. add monitoring with no automatic publication;
7. complete v1 documentation, accessibility, performance, and release checks.

## Permanent rules

1. Never write canonical changes directly to main.
2. Use one branch and bounded PR per task.
3. Read canonical JSON before assigning IDs or counts.
4. Keep canonical and working data separate.
5. Do not merge temporary diagnostics or write-enabled workflows.
6. Preserve distinctions among loss, return, recovery, reimbursement, freezing, minting, and burning.
7. A disclosure is not automatically an exploit.
8. A relaunch announcement is not proof of reimbursement completion.
9. Historical SHAs are not live branch pointers.
10. Every PR must pass checks appropriate to its stage.
11. Source-quality gap and archive-risk ceilings may decrease but must not increase.
12. Source hierarchy must not be weakened to improve coverage metrics.
13. Unknown URL statuses require explicit review and are not permitted in canonical data.
14. Production publication is proven by full generated-content equality, not counts or IDs alone.
