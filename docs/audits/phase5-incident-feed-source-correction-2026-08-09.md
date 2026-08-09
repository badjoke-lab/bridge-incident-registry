# Phase 5 incident-feed source correction — 2026-08-09

Status: implementation boundary  
Scope: review-only incident discovery

## Live result that changed the source decision

The GDELT adapter merged in PR #232 remained fail-closed, but its first GitHub Actions live run (`31303989428`) received HTTP 429 on the initial query and both retries. No GDELT baseline was created and no candidate was emitted.

GDELT code remains available as an optional adapter, but it is removed from the scheduled/default monitoring workflow until Actions-hosted access is reliable enough to justify retrying it.

## Primary structured incident source

Use DefiLlama's public Hacks page as the scheduled incident-discovery source:

```text
https://defillama.com/hacks
```

The public page is current and exposes a hacks/exploits table including bridge incidents, while DefiLlama's current official SDK documents `ecosystem.getHacks()` as a Pro endpoint. BIR therefore does not call the paid SDK endpoint or assume an undocumented raw API is a supported free contract.

The monitor fetches the public HTML and extracts only the serialized page data already delivered to a normal browser. If the page no longer contains a parseable `__NEXT_DATA__` hacks dataset, the adapter fails closed for that run.

## Baseline and relevance rule

The first successful public-page parse is a zero-candidate baseline.

Only bridge-relevant rows are fingerprinted:

1. rows carrying DefiLlama's bridge flag; or
2. rows whose hack name exactly matches a canonical BIR bridge name/alias.

Non-bridge hacks are ignored rather than filling monitoring state.

After baseline:

- unchanged bridge-relevant rows are silent;
- exact canonical bridge-name match => class `B` / hold;
- bridge-flag row without exact canonical identity => class `C` / hold;
- canonical evidence URL duplicates are suppressed;
- candidate ceiling is 8 per run and overflow is deferred;
- no DefiLlama-only row can become class A or canonical evidence automatically.

## Stored discovery fields

Review output may retain only the fields needed to investigate the signal:

```text
name
date
amount
chains
classification
technique
target
bridge flag
source link
```

The HTML snapshot itself is temporary workflow input and is not committed.

## Safety

The public Hacks database is a secondary incident-discovery source. Every emitted row still requires a separate claim-relative primary-source investigation before BIR canonical work.

Canonical JSON, source hierarchy, archive rules, source-count equality, URL-status ceiling, and production equality gates are unchanged.

## Controlled tests

The dedicated test must prove:

1. missing/invalid page data fails closed;
2. a plausible hacks array is discovered without relying on one fixed wrapper path;
3. the initial bridge-relevant set becomes baseline with zero candidates;
4. unchanged baseline rows are silent;
5. a new exact canonical bridge hack becomes B/hold;
6. a new unresolved bridge-flag row becomes C/hold;
7. a canonical evidence URL duplicate is suppressed;
8. overflow is deferred;
9. canonical data remains read-only through the normal monitoring runner guard.
