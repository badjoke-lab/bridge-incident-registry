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

Archive Capture Batches 1 through 18 are complete and production-verified, and the previously-unreviewed archive queue is exhausted. Deferred Archive Retries 01 and 02 are complete and production-verified. Deferred Archive Retries 03 and 04 are complete as review-only audits and recovered no additional canonical archive mappings. The not-recently-retried fresh deferred pool is now exhausted.

Event Primary Remediation 01 is complete and production-verified through PRs #207–#209. It corrected the Ronin OFAC source boundary, reclassified the FBI Horizon attribution source as claim-relative primary evidence, and reduced events without primary evidence from 16 to 14 without changing event wording or Tier 1 classifications.

Evidence with `archived_url` remains 127 / 284. The remaining unresolved archive queues are 16 risky-host unique URLs and 15 terminal unique URLs. Source-count mismatches and unknown URL statuses remain at zero, and complete canonical-derived public-content equality is enforced.

The latest completed canonical publication checkpoint is Event Primary Remediation 01:

```text
Review PR             #207
Canonical data PR     #208
Canonical merge       1638b47eb3c2e9066d0323d6d5a4abe8aa85cfb2
Production audit PR   #209
Production run        31299468964 / 93209808769
Generated at          2026-08-09T06:42:13.747Z
Content match         true
HTML routes           72
Redirects             74
Publication attempt   4 / 20
Build-input refresh   not required
```

Attempts 1–3 correctly rejected stale same-count production at `bir_src_000003`; attempt 4 reached complete field-level canonical equality.

The public UI/support follow-up is current through PR #187: incident discovery, filters, pagination, detail TOCs, project navigation, Support, and the shared BadJoke-Lab support-wallet presentation are merged.

The Boltz 2026 swap shutdown remains a monitoring signal in Issue #171. It is not canonical because the available first-party material does not identify one reviewable bridge incident boundary.

## Next bounded work

1. review the remaining 14 events without primary evidence and remediate only claim-relative primary gaps that can be strengthened safely;
2. keep intentional secondary-only gaps explicit rather than weakening source hierarchy;
3. strengthen validators;
4. begin review-gated monitoring and candidate collection without automatic canonical publication;
5. continue v1 hardening;
6. revisit deferred archive failures only after conditions change or new canonical source URLs enter the corpus.
