# Phase 3 Event Primary Review 01 — 2026-08-09

Status: review complete  
Canonical data changed: no

## Baseline

```text
Events without primary evidence  16
Events without Tier 1 evidence     6
Evidence records                 284
```

The six intentional event Tier 1 gaps documented in `phase3-event-tier1-review-final-2026-07-30.md` remain out of scope. `bir_ev_000150` also remains intentionally non-primary because its event-scoped PeckShield evidence is a direct security-monitoring observation rather than an operator statement.

This review therefore evaluated the remaining nine primary-evidence gaps for claim-relative first-party or authoritative evidence.

## Approved remediation

### `bir_ev_000011` — FBI attribution to Lazarus Group reported

Existing event-scoped evidence `bir_src_000014` is the FBI's own January 23, 2023 press release titled `FBI Confirms Lazarus Group Cyber Actors Responsible for Harmony's Horizon Bridge Currency Theft`.

The event claim is specifically that the **FBI publicly attributed** the Horizon Bridge theft to Lazarus Group / APT38. The FBI press release is therefore the issuing authority's direct statement of the attribution and is claim-relative primary evidence for this event.

Approved canonical change:

```text
bir_src_000014.is_primary  false -> true
```

No URL, title, date, source tier, claim scope, or event text changes are required.

### `bir_ev_000002` — Attribution to Lazarus-linked activity reported

Existing event-scoped evidence `bir_src_000003` has a canonical metadata defect: its stored URL `https://home.treasury.gov/news/press-releases/jy0716` currently resolves to an unrelated April 15, 2022 Treasury International Capital release.

The correct April 14, 2022 authoritative action is OFAC's `North Korea Designation Update`:

```text
https://ofac.treasury.gov/recent-actions/20220414
```

That action added the Ronin getaway Ethereum address `0x098B716B8Aaf21512996dC57EB0615e2383E2f96` to the Lazarus Group SDN entry. Treasury's May 6, 2022 Blender.io sanctions release explicitly describes the April 14 action as OFAC's attribution of DPRK's Lazarus Group as the perpetrators of the Axie Infinity / Ronin heist.

The event claim is that government attribution associated the Ronin incident with Lazarus-linked activity. The April 14 OFAC action is therefore claim-relative primary evidence.

Approved canonical changes:

```text
bir_src_000003.url
  https://home.treasury.gov/news/press-releases/jy0716
  -> https://ofac.treasury.gov/recent-actions/20220414

bir_src_000003.title
  Treasury sanctions Lazarus-linked crypto activity context
  -> North Korea Designation Update

bir_src_000003.publisher
  U.S. Department of the Treasury
  -> Office of Foreign Assets Control

bir_src_000003.is_primary
  false -> true
```

Retain `source_type=regulatory_notice`, `source_tier=tier_1`, `published_at=2022-04-14`, `claim_scope=incident_case`, `is_official_domain=true`, and the existing event linkage. Update the notes to identify the OFAC designation action and Ronin getaway-wallet attribution boundary.

## Deferred primary gaps

The other seven non-intentional primary gaps are not approved in this pass:

```text
bir_ev_000013  Poly Network exploit disclosed
bir_ev_000014  Stolen funds returned in stages
bir_ev_000124  Transit Swap routing exploit occurred
bir_ev_000125  Transit Swap incident disclosed and traced
bir_ev_000143  Unizen external-call approval exploit occurred
bir_ev_000144  Unizen incident and approval risk disclosed
bir_ev_000148  Unizen reported partial recovery from four hackers
```

Nearby first-party evidence exists for several of these events, but the current repository metadata does not by itself prove direct support for each precise event claim. They require separate source-content review rather than proximity-based reuse.

## Projected effect

If only the two approved changes are applied in a fresh canonical PR:

```text
Evidence records                   284 -> 284
Events without primary evidence     16 -> 14
Events without Tier 1 evidence       6 -> 6
Source-count mismatches              0 -> 0
Unknown URL status                   0 -> 0
```

The source-quality no-regression ceiling for `events_without_primary` should tighten from 16 to 14 only after the exact canonical patch passes the permanent validator.

## Safety boundary

- no canonical data changes in this review PR;
- no intentional secondary source is reclassified;
- no security-firm or research source is upgraded to primary;
- no event wording, date, amount, recovery status, or lifecycle status is changed;
- canonical application must occur on a fresh branch and must fail rather than weaken any unrelated quality ceiling.
