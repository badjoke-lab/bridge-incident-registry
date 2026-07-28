# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative.

## Canonical baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    211
```

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          complete through Batch 7
Phase 3  Full-corpus quality strengthening         active
         Full-corpus audit                         complete — PR #71
         Reimbursement/restart normalization       complete — PRs #72–#77
         Source-count contract                     complete — PR #78
         Safe source-count normalization           complete — PR #79
         Source-count production verification      complete — run 30367770935
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest publication checkpoint

```text
Canonical data PR        #79
Merge commit             3c4bae8905ff052e987f84bc798545b467de807d
Production verify run    30367770935
Normal CI run            30367770892
Verified state           33 / 34 / 183 / 211
Verified HTML routes     72
```

## Phase 3 audit trajectory

Initial audit baseline:

```text
completed_reimbursement_event   5 incidents
reopened_event                  15 incidents
incident_source_count            7 incidents
event_source_count              53 events
```

Current aftermath state:

```text
completed_reimbursement_event   0
reopened_event                   0
blocking errors                  0
```

Source-count contract inventory before normalization:

```text
Total mismatches   60
Incident mismatch   7
Event mismatch     53
```

Current production-verified source-count state:

```text
Total mismatches   47
Incident mismatch   0
Event mismatch     47
```

## Source-count contract

`source_count` is the number of canonical evidence records directly linked to the incident or event. It is not a unique-URL count, inherited evidence union, prose citation count, or quality score.

The completed safe migration changed only stale derived values:

```text
Incident count updates   7
Event count increases    6
Total changes            13
```

The remaining 47 events have stored counts above their direct evidence-link counts. Each requires source review to decide whether to add or relink event-scoped evidence, reduce the count, or revise the event.

Records:

- `docs/audits/phase3-source-count-contract-2026-07-28.md`
- `docs/audits/phase3-source-count-mechanical-2026-07-28.md`
- `docs/audits/production-verification-phase3-source-count-mechanical-2026-07-28.md`

## Production publication gate

The verifier waits for canonical `version.json` counts to converge before route checks.

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion remains mandatory.

## Remaining roadmap

1. remediate the remaining 47 event evidence-link mismatches in bounded batches;
2. promote exact source-count equality to a hard CI gate;
3. strengthen primary-source and archive coverage;
4. harden URLs and archives;
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
