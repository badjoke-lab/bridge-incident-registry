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

Archive Capture Batches 1 through 18 are complete and production-verified, and the previously-unreviewed archive queue is exhausted. Deferred Archive Retries 01 and 02 are also complete and production-verified. Evidence with `archived_url` is now 127 / 284. The remaining unresolved archive queues are 16 risky-host unique URLs and 15 terminal unique URLs. Source-count mismatches and unknown URL statuses remain at zero, and complete canonical-derived public-content equality is enforced.

Deferred Retry 02 recovered one additional previously-reviewed unresolved source:

```text
Review PR             #202
Canonical data PR     #203
Canonical merge       46b6e19700d8553c75c4555549b9ca308cbc7292
Production audit PR   #204
Production run        31298305603 / 93206834594
Generated at          2026-08-09T06:10:37.053Z
Content match         true
HTML routes           72
Redirects             74
```

The production verifier reached complete four-dataset field-level equality on attempt 1 and confirmed the exact archive mapping for `bir_src_000166`. No build-input refresh or deployment retrigger was required.

The public UI/support follow-up is current through PR #187: incident discovery, filters, pagination, detail TOCs, project navigation, Support, and the shared BadJoke-Lab support-wallet presentation are merged.

The Boltz 2026 swap shutdown remains a monitoring signal in Issue #171. It is not canonical because the available first-party material does not identify one reviewable bridge incident boundary.

## Next bounded work

1. reconstruct the remaining reviewed-unresolved archive pool after Retries 01–02 and run Deferred Archive Retry 03 against a fresh high-value subset; do not immediately recycle the recent Retry 01 or Retry 02 failures;
2. reduce the remaining 16 events without primary evidence where justified;
3. strengthen validators;
4. begin review-gated monitoring and candidate collection without automatic canonical publication;
5. continue v1 hardening.
