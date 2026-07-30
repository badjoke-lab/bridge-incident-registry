# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-30

GitHub state and canonical JSON are authoritative.

## Canonical and production baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    279
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
         Event Tier 1 Batch 1                      production-verified — PRs #108–#110
         Event Tier 1 Batch 2                      production-verified — PRs #111–#113
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest production checkpoint

```text
Canonical data PR        #112
Canonical merge          7c52a3804043bc9d16da5ddcf6faeef608da804d
Production audit PR      #113
Production verify run    30542396678
Canonical normal CI      30542215442
Production-PR normal CI  30542393855
Verified state           33 / 34 / 183 / 279
Canonical content match  true
Verified HTML routes     72
Verified redirects       74
Generated at             2026-07-30T12:24:11.345Z
Publication attempt      2
```

Attempt 1 observed the earlier 271-evidence deployment. Attempt 2 observed the complete 279-evidence public contract and passed all route and content assertions.

## Quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Incidents without primary              1
Incidents without Tier 1               1
Events without primary                20
Events without Tier 1                 11
Terminal unarchived unique URLs       59
Risky-host unarchived unique URLs     87
Unknown URL status                     0
```

Batch 2 added eight first-party event links for Rubic, Taiko, Celer, SOCKET, Synapse, Holograph, and Transit Finance. The two Nerve events remain intentionally Tier 2 because no reviewed operator source exists and security-firm analyses are not reclassified.

Six of the 11 remaining event Tier 1 gaps are already documented as intentional secondary records. Five remain for final review.

## Immediate source-quality targets

1. review the final five unreviewed event Tier 1 gaps;
2. close or document the remaining incident-level Nerve source gap;
3. reduce the remaining 20 events without primary evidence where appropriate;
4. begin verified archive captures for terminal and risky-host evidence;
5. tighten archive-risk ceilings as verified captures are added.

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

Publication convergence requires matching record counts, canonical-only markers, complete transformed JSON equality, exact record order, and all route, sitemap, metadata, redirect, content-type, and cache assertions.

## Remaining roadmap

1. complete the final event-level Tier 1 review and any justified canonical migration;
2. close or document the remaining incident-level primary and Tier 1 gap;
3. add verified archive captures for terminal and risky-host evidence;
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
11. Source-quality gap ceilings may decrease but must not increase.
12. Archive-risk ceilings count unique source URLs; any increase requires an explicit reviewed canonical source addition and a newly fixed ceiling.
13. Source hierarchy must not be weakened to improve coverage metrics.
14. Unknown URL statuses require explicit review and are not permitted in canonical data.
15. Production publication is proven by full generated-content equality, not counts or IDs alone.
