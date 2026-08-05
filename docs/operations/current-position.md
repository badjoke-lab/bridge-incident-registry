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

Archive Capture Batches 1 through 15 are complete and production-verified. Evidence with `archived_url` is 110 / 284. The remaining archive queues are 21 risky-host unique URLs and 28 terminal unique URLs. Source-count mismatches and unknown URL statuses remain at zero, and complete canonical-derived public-content equality is enforced.

The latest production checkpoint completed after one behavior-neutral build-input refresh and Cloudflare preview-queue remediation:

```text
Canonical merge       39134a5d7b717c467a49d96b5fd7104047cd0a50
Build-input refresh   7e13955c725e07ca66e01f7f9e321db7f7c764ff
Production run        30986003440
Production job        92245512645
Generated at          2026-08-05T08:02:41.108Z
Publication attempt   1 after preview-queue remediation
Content match         true
HTML routes           72
Redirects             74
```

The Boltz 2026 swap shutdown remains a monitoring signal in Issue #171. It is not canonical because the available first-party material does not identify one reviewable bridge incident boundary.

## Next bounded work

1. continue archive preservation from the 21 risky-host and 28 terminal unique-URL queues;
2. retry deferred official-source candidates without weakening exact-replay, temporal-fit, size, or reproducibility requirements;
3. reduce the remaining 16 events without primary evidence where justified;
4. strengthen validators;
5. begin review-gated monitoring and candidate collection without automatic canonical publication;
6. continue v1 hardening.
