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
         Full-corpus audit                         complete — PR #71
         Reimbursement/restart normalization       complete — PRs #72–#77
         Source-count remediation                  complete — PRs #78–#99
         Hard source-count equality gate           active
         Source-quality baseline                   complete — PR #100
         Source-quality no-regression gate         active
         Source-quality remediation Batch 1        complete — PRs #103–#105
         Batch 1 production publication            verified — run 30454087470
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest production checkpoint

```text
Canonical data PR        #103
Canonical merge          cbff8411ee7f0bde4d4cd13624166502bded7fdc
Deployment retrigger     8ed1cd13292eefe524609c5f2db8578d58a07bee
Production verify run    30454087470
Canonical normal CI run  30453868882
Verified state           33 / 34 / 183 / 265
Verified HTML routes     72
Verified redirects       74
Generated at             2026-07-29T13:06:10.965Z
```

## Source-count state

```text
Incident mismatches  0
Event mismatches     0
```

Exact equality remains enforced by permanent CI and controlled incident/event drift fixtures.

## Source-quality trajectory

```text
                                      Baseline   After Batch 1
Primary evidence                      181 / 263   183 / 265
Tier 1 evidence                       199 / 263   201 / 265
Official-domain evidence              121 / 263   123 / 265
Incidents without primary evidence      2           1
Incidents without tier 1 evidence       1           1
Events without primary evidence        36          34
Events without tier 1 evidence         25          25
Terminal evidence without archive      76          76
Risky-host evidence without archive    90          90
Unknown URL status                      2           2
```

Batch 1 uses LI.FI's first-party March 2022 postmortem to correct the incident from partial reimbursement and unresolved status to completed operator-funded reimbursement and resolved status. Attacker-fund recovery remains `none`. The improved primary-source ceilings are enforced in normal CI.

Records:

- `docs/audits/phase3-source-quality-baseline-2026-07-29.md`
- `docs/audits/phase3-source-quality-remediation-batch1-2026-07-29.md`
- `docs/audits/production-deployment-retrigger-source-quality-batch1-2026-07-29.md`
- `docs/audits/production-verification-phase3-source-quality-batch1-2026-07-29.md`

## Immediate source-quality targets

1. resolve the two evidence records with unknown URL status and tighten the ceiling from 2;
2. `bir_inc_000026` — Nerve Bridge 2021 metapool exploit: continue searching for stable first-party incident evidence; do not misclassify a security-firm report as Tier 1 merely to close the metric;
3. reduce the 25 events without Tier 1 evidence;
4. reduce the 34 events without primary evidence;
5. begin the 132-item archive-priority queue with terminal bridges and X/Twitter sources.

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion remains mandatory.

## Remaining roadmap

1. resolve unknown URL states and harden domain-state handling;
2. close or document the remaining incident-level primary and Tier 1 gap;
3. reduce event-level Tier 1 and primary gaps in bounded batches;
4. add archive captures for terminal and risky-host evidence and tighten archive-risk ceilings;
5. strengthen remaining validators;
6. complete public-contract compatibility review;
7. add monitoring with no automatic publication;
8. complete v1 documentation, accessibility, performance, and release checks.

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
