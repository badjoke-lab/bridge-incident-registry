# Holograph postmortem source consolidation

Status: validated replacement staged for canonical evidence metadata  
Reviewed: 2026-08-21  
Parent review: PR #352  
AFX candidate: Issue #303

## Purpose

BIR's permanent source-quality boundary currently caps `risky_host_unarchived` at 16 unique source URLs. Issue #303 (AFX Trade) has a reviewed first-party Medium incident source, but admitting it while the existing count remains 16 would exceed the permanent ceiling.

This review does not relax the ceiling. It tests whether an existing Holograph risky-host announcement URL can be replaced by the first-party postmortem document that the announcement itself links to, preserving the same root-cause claim while reducing the existing risky-host count by one.

## Existing canonical evidence

The target record is `bir_src_000277`, scoped to:

- bridge: `bir_bridge_000021`
- incident: `bir_inc_000027`
- event: `bir_ev_000093`
- claim scope: `root_cause`

Existing URL:

`https://x.com/holographxyz/status/1807946057235718349`

The announcement points through `https://t.co/uRGZmgX01Z` to the Holograph incident postmortem.

## First-party postmortem target

Resolved target:

`https://garnet-tilapia-acb.notion.site/Holograph-Incident-Post-Mortem-b5f1e14da7b2456aa3c3a1bde796daa4`

The short link was independently followed twice in CI and resolved to the same HTTP 200 Notion target.

Direct HTML is a JavaScript shell, so BIR did not infer absent page text from the HTML response. Instead the public Notion page-data endpoint was queried using the page ID embedded in the first-party target URL.

## Reproducible page-data verification

GitHub Actions run: `32482550931`  
Job: `96771878871`

Public page-data endpoint:

`https://www.notion.so/api/v3/loadCachedPageChunk`

Both independent passes returned:

- HTTP 200
- `application/json`
- 123,126 bytes
- valid `recordMap`

Both passes independently matched all bounded root-cause markers:

- `holograph:1`
- `halborn:1`
- `former_contractor:1`
- `privileged_access:1`
- `mint:1`
- `hlg:1`

The probe then continued through BIR's normal Check workflow and all permanent gates passed on the unchanged 40 bridge / 43 incident / 203 event / 335 evidence corpus.

## Canonical replacement boundary

Only `bir_src_000277` is replaced:

- `source_type`: `official_social` -> `postmortem`
- title -> `Holograph Incident Post-Mortem`
- URL -> first-party-linked Notion postmortem target
- publisher remains Holograph
- primary/Tier 1 classification is retained
- `is_official_domain` remains false because `notion.site` is not a Holograph-owned domain
- `supports_reopen` is narrowed to false because this replacement review verified the root-cause document, not an independent reopening claim
- no archive URL is invented

The earlier Holograph incident/containment URL `https://x.com/holographxyz/status/1801332482262110301` remains untouched because it supports different event scopes (`bir_ev_000090` and `bir_ev_000091`).

## Expected source-quality effect

This replacement removes exactly one unarchived risky-host unique URL without reducing evidence count, primary evidence count, or Tier 1 evidence count.

Expected result:

- `risky_host_unarchived`: 16 -> 15
- evidence records: 335 -> 335
- primary evidence: unchanged
- Tier 1 evidence: unchanged
- incident/event primary-source deficits: unchanged

The exact post-application values must be taken from the permanent source-quality gate after the bounded applicator runs.

## AFX consequence

This review does not itself admit AFX into canonical data. If the replacement passes the permanent source-quality gate at 15 risky-host unique URLs and PR #352 is merged, Issue #303 may consume at most one reviewed AFX first-party Medium URL and remain at the unchanged ceiling of 16.

No schema, enum, source-quality ceiling, archive threshold, performance budget, route, production verifier, scheduler, or deployment behavior is changed.
