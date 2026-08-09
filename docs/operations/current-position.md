# Current position

Status: active  
Updated: 2026-08-09

This file is a compact compatibility pointer. The authoritative live state is maintained in:

- `docs/runbooks/recovery-checkpoint.md`
- `docs/runbooks/current-status.md`
- `docs/runbooks/development-roadmap.md`
- current `main`, canonical JSON, open pull requests, and GitHub Actions

## Canonical and production baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    287
```

## Current phase

- Phase 3 — full-corpus quality strengthening: active maintenance
- Phase 4 — public contract stabilization: complete
- Phase 5 — monitoring and candidate collection: active
- v1 hardening: planned

Archive Capture Batches 1 through 18 are complete and production-verified. Deferred Archive Retries 01–02 are production-verified; Retries 03–04 are complete review-only audits with no additional canonical archive mappings. The not-recently-retried fresh deferred pool is exhausted.

Event Primary Remediation 01 and 02 are complete and production-verified. Remediation 02 raised evidence to 287 and reduced events without primary evidence from 14 to 11 without increasing unique archive-risk queues.

Current quality boundary:

```text
Primary evidence                       206 / 287
Tier 1 evidence                        223 / 287
Evidence with archived_url             130 / 287
Events without primary                  11 / 183
Events without Tier 1                     6 / 183
Terminal unarchived unique URLs          15
Risky-host unarchived unique URLs        16
Unknown URL status                        0
Source-count mismatches                   0
Canonical production content match      true
```

## Latest completed production checkpoint

```text
Review PR             #211
Canonical data PR     #213
Canonical merge       f2874a2d0ffe6877eadf6619cd6100a9b9b3991b
Production audit PR   #214
Production run        31300484236 / 93212360938
Generated at          2026-08-09T07:08:45.362Z
Content match         true
HTML routes           72
Redirects             74
Publication attempt   3 / 20
Build-input refresh   not required
```

## Phase 5 monitoring checkpoint

Phase 5 is now active rather than planned.

Completed:

```text
PR #217  Review-gated monitoring foundation
PR #223  First live review-only monitoring state for Issue #171
PR #225  Pending review-branch fallback and duplicate-work guard
PR #218  Cross-record bridge-integrity validator strengthening
PR #226  Bounded evidence-health monitoring
```

The foundation has been proven live. Issue #171 was emitted once as `B / hold`, merged as review-only state in PR #223, and an unchanged rerun then produced `has_changes=false` with no new review branch.

Evidence health was live-smoked after PR #226 in run `31301765004`, job `93215576787`:

```text
Live evidence URLs        287
Selected this run          12
Independent probes         24
Hard 404/410 findings       0
New issue candidates        0
Canonical diff              none
Unknown URL status          0
Reference errors            0
Job result                  success
```

No review branch or PR was created because there was no new or changed signal.

The repository Actions setting still does not permit `GITHUB_TOKEN` to create pull requests. The workflow therefore keeps a validated `auto/monitoring/*` review branch and succeeds when that specific permission error occurs; the connected GitHub app/operator can open the PR. Canonical publication remains impossible from monitoring.

Four non-intentional reviewed event-primary gaps remain deferred pending stronger first-party evidence: `bir_ev_000014`, `bir_ev_000143`, `bir_ev_000144`, and `bir_ev_000148`. Six Tier 1 gaps remain intentional secondary-only records, and `bir_ev_000150` remains intentionally non-primary direct security monitoring.

The Boltz 2026 swap shutdown remains a monitoring signal in Issue #171, not a canonical incident.

## Next bounded work

1. add the next Phase 5 candidate-discovery adapter using external bridge/protocol lists, review-only;
2. add closure/pause/hack/regulatory news signals after candidate discovery is stable;
3. continue validator/public-contract hardening where justified;
4. keep deferred primary/archive gaps on research-triggered backlogs rather than weakening evidence rules;
5. continue v1 documentation, accessibility, performance, compatibility, and release hardening.
