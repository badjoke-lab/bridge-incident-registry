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

Archive Capture Batches 1 through 18 are complete and production-verified, and the previously-unreviewed archive queue is exhausted. Deferred Archive Retry 01 is also complete and production-verified. Evidence with `archived_url` is now 126 / 284. The remaining unresolved archive queues are 17 risky-host unique URLs and 15 terminal unique URLs. Source-count mismatches and unknown URL statuses remain at zero, and complete canonical-derived public-content equality is enforced.

Deferred Retry 01 recovered two previously-reviewed unresolved sources:

```text
Review PR             #199
Canonical data PR     #200
Canonical merge       934c85c49f7db71773721c5f4d64cc769f1361b0
Production audit PR   #201
Production run        31267226936 / 93127231682
Read-only live probe  31267391787 / 93127650808
Generated at          2026-08-08T16:33:32.318Z
Content match         true
HTML routes           72
Redirects             74
```

The read-only probe independently confirmed the live `version.json` and exact archive fields for `bir_src_000037` and `bir_src_000068`. No build-input refresh was required.

The public UI/support follow-up is current through PR #187: incident discovery, filters, pagination, detail TOCs, project navigation, Support, and the shared BadJoke-Lab support-wallet presentation are merged.

The Boltz 2026 swap shutdown remains a monitoring signal in Issue #171. It is not canonical because the available first-party material does not identify one reviewable bridge incident boundary.

## Next bounded work

1. run Deferred Archive Retry 02 against a different high-value subset of the remaining reviewed-unresolved sources; do not immediately recycle the eight sources that failed Retry 01;
2. reduce the remaining 16 events without primary evidence where justified;
3. strengthen validators;
4. begin review-gated monitoring and candidate collection without automatic canonical publication;
5. continue v1 hardening.
