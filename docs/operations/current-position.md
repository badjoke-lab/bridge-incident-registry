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

Archive Capture Batches 1 through 18 are complete and production-verified. Evidence with `archived_url` is 124 / 284. The remaining unresolved archive queues are 18 risky-host unique URLs and 17 terminal unique URLs, but all previously-unreviewed terminal/risky-host candidates visible to the established reviewer have now been reviewed. Source-count mismatches and unknown URL statuses remain at zero, and complete canonical-derived public-content equality is enforced.

The latest canonical publication required the one permitted behavior-neutral build-input refresh and then passed the unchanged full-content verifier immediately:

```text
Review PR             #194
Canonical data PR     #195
Canonical merge       50ca3782c4940e095ff94de2cce220a3ee0c7da5
Build-input refresh   #197 / 59b74d26a86373e6e97e6e630b54becd35f64910
Production audit PR   #198
Initial production    31266002708 / 93124105488
Successful production 31266360510 / 93125031659
Generated at          2026-08-08T16:07:52.937Z
Publication attempt   1 after refresh
Content match         true
HTML routes           72
Redirects             74
```

The initial twenty-attempt verifier correctly rejected same-count stale evidence at `bir_src_000132`. The single refresh did not change canonical content or verification requirements; the unchanged verifier then passed on its first post-refresh attempt. No second refresh was used.

The public UI/support follow-up is current through PR #187: incident discovery, filters, pagination, detail TOCs, project navigation, Support, and the shared BadJoke-Lab support-wallet presentation are merged.

The Boltz 2026 swap shutdown remains a monitoring signal in Issue #171. It is not canonical because the available first-party material does not identify one reviewable bridge incident boundary.

## Next bounded work

1. build a deferred archive-retry inventory from reviewed-but-unresolved candidates and retry only justified targets under the unchanged exact-replay, temporal-fit, size, and reproducibility requirements;
2. reduce the remaining 16 events without primary evidence where justified;
3. strengthen validators;
4. begin review-gated monitoring and candidate collection without automatic canonical publication;
5. continue v1 hardening.
