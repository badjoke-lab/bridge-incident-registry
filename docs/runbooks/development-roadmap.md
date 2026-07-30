# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-30

GitHub state and canonical JSON are authoritative.

## Canonical baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    271
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
         Event Tier 1 review Batch 1               complete — PR #108
         Event Tier 1 canonical Batch 1            pending merge — PR #109
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest completed production checkpoint

The completed production checkpoint remains the 265-evidence state until event Tier 1 Batch 1 is merged and explicitly verified.

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

## Canonical quality state after Batch 1

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Incidents without primary              1
Incidents without Tier 1               1
Events without primary                28
Events without Tier 1                 19
Terminal unarchived unique URLs       59
Risky-host unarchived unique URLs     63
Unknown URL status                     0
```

Event Tier 1 Batch 1 adds six first-party event links for Commons Bridge, Ronin, Nomad, Poly Network, and Celer. It preserves four intentional secondary-source events where first-party evidence would not establish the recorded research or community-proposal claim.

Archive-risk metrics operate on normalized unique source URLs and match configured hosts by exact host or subdomain. Event-scoped copies of an already counted URL do not inflate the preservation queue. Batch 1 adds three genuinely new risky-host URLs—Ronin Substack, Poly Network Medium, and Celer X—moving the unique risky-host queue from 60 to 63. The terminal unique-URL queue remains 59.

Records:

- `docs/audits/phase3-event-tier1-review-batch1-2026-07-29.md`
- `docs/audits/phase3-event-tier1-canonical-batch1-2026-07-30.md`

## Immediate source-quality targets

1. merge and production-verify event Tier 1 Batch 1;
2. review the remaining 19 events without Tier 1 evidence;
3. continue Nerve Bridge first-party research without weakening source hierarchy;
4. reduce the remaining 28 events without primary evidence;
5. begin verified archive captures for terminal bridges and risky hosts;
6. tighten archive-risk ceilings as verified captures are added.

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

Publication convergence requires:

- matching record counts;
- canonical-only markers;
- complete transformed JSON equality for bridges, incidents, events, and evidence;
- exact record and array order;
- all route, sitemap, metadata, redirect, content-type, and cache assertions.

## Remaining roadmap

1. complete event-level Tier 1 and primary remediation in bounded batches;
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
