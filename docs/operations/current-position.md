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
Evidence    284
```

## Current phase

- Phase 3 — full-corpus quality strengthening: active
- Phase 4 — public contract stabilization: complete
- Phase 5 — monitoring and candidate collection: planned
- v1 hardening: planned

Archive Capture Batches 1 through 16 are complete and production-verified. Evidence with `archived_url` is 116 / 284. The remaining archive queues are 18 risky-host unique URLs and 25 terminal unique URLs. Source-count mismatches and unknown URL statuses remain at zero, and complete canonical-derived public-content equality is enforced.

The latest canonical publication converged without a build-input refresh:

```text
Review PR             #188
Canonical data PR     #189
Canonical merge       f9c6395d400358543bb3a761aa209be97ca1c266
Production audit PR   #190
Production run        31264440303
Production job        93120202656
Generated at          2026-08-08T15:23:20.361Z
Publication attempt   1
Content match         true
HTML routes           72
Redirects             74
```

The public UI/support follow-up is also current through PR #187: incident discovery, filters, pagination, detail TOCs, project navigation, Support, and the shared BadJoke-Lab support-wallet presentation are merged.

The Boltz 2026 swap shutdown remains a monitoring signal in Issue #171. It is not canonical because the available first-party material does not identify one reviewable bridge incident boundary.

## Next bounded work

1. choose Archive Capture Batch 17 from the remaining 18 risky-host and 25 terminal unique-URL queues;
2. retry deferred official-source candidates without weakening exact-replay, temporal-fit, size, or reproducibility requirements;
3. reduce the remaining 16 events without primary evidence where justified;
4. strengthen validators;
5. begin review-gated monitoring and candidate collection without automatic canonical publication;
6. continue v1 hardening.
