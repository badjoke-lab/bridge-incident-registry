# Current position

Status: active  
Updated: 2026-08-05

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

Archive Capture Batches 1 through 14 are complete and production-verified. Evidence with `archived_url` is 101 / 284. The remaining archive queues are 24 risky-host unique URLs and 33 terminal unique URLs. Source-count mismatches and unknown URL statuses remain at zero, and complete canonical-derived public-content equality is enforced.

The latest production checkpoint completed after one behavior-neutral build-input refresh and two additional delayed verifier windows:

```text
Canonical merge       ca225d1df10b4a81d72a0fe60fd2713b6e8b543a
Build-input refresh   3f0514b568e84b17daf9e0a2d14649b3a329c787
Production run        30977144358
Production job        92213419237
Generated at          2026-08-05T05:06:09.501Z
Publication attempt   1 on second delayed rerun
Content match         true
HTML routes           72
Redirects             74
```

The Boltz 2026 swap shutdown remains a monitoring signal in Issue #171. It is not canonical because the available first-party material does not identify one reviewable bridge incident boundary.

## Next bounded work

1. continue archive preservation from the 24 risky-host and 33 terminal unique-URL queues;
2. retry deferred official-source candidates without weakening exact-replay, temporal-fit, size, or reproducibility requirements;
3. reduce the remaining 16 events without primary evidence where justified;
4. strengthen validators;
5. begin review-gated monitoring and candidate collection without automatic canonical publication;
6. continue v1 hardening.
