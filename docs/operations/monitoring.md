# BIR review-gated monitoring

Status: Phase 5 active  
Updated: 2026-08-09

## Purpose

BIR monitoring detects review signals and creates review artifacts. It does not classify or publish canonical incidents automatically.

The active monitoring foundation covers:

- canonical-data fingerprinting and mutation guard;
- canonical reference/unknown-URL health checks;
- open GitHub issue monitoring for explicit review/monitoring signals;
- bounded evidence-link degradation monitoring;
- external bridge/protocol candidate discovery from a public registry snapshot;
- fingerprint-based suppression of unchanged signals;
- review-only JSON, watchlist, and Markdown outputs;
- weekly or manual GitHub Actions execution;
- automatic review-PR creation when repository Actions settings permit it;
- a pending review-branch fallback when GitHub Actions is not permitted to create pull requests.

External news, regulatory, incident-feed, bridge-domain, and public-site/SEO adapters remain later Phase 5 modules. They must use the same review-only boundary.

## Canonical safety boundary

The monitoring workflow must never modify:

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
```

The runner fingerprints all four files before and after execution. GitHub Actions independently rejects any canonical diff.

Monitoring may write only:

```text
data-staging/monitoring/**
data-staging/watchlists/auto/**
```

A monitoring PR or pending monitoring review branch is not a canonical-data change. Any candidate or degraded source that merits canonical change must be investigated and applied on a separate reviewed branch.

## Dedupe behavior

State is stored at:

```text
data-staging/monitoring/state.json
```

Each signal receives a stable key and content fingerprint. An unchanged signal is suppressed on later runs. A materially changed signal is emitted again for review.

GitHub issue key:

```text
github-issue:<number>
```

Evidence-health key:

```text
evidence-health:<evidence_id>
```

External bridge candidate key:

```text
external-bridge:defillama-bridges-server:<external_id>
```

Scheduled runs refuse to create duplicate work when either an open `Auto monitoring report:` pull request or an unmerged `auto/monitoring/*` review branch already exists. Manual dispatch with `force=true` can explicitly override that guard.

## GitHub issue adapter

Open issues are collected by GitHub Actions with `gh issue list`. An issue is monitored when its title/body explicitly indicates review or monitoring intent, including phrases such as:

```text
monitoring signal
needs evidence
review for canonical
Review ...
```

New/changed issue signals enter the candidate watchlist as class `B` / `hold`. They are not treated as proof of a bridge incident.

The first live foundation smoke detected Issue #171 exactly once. PR #223 persisted only monitoring/watchlist state. An unchanged rerun then emitted no finding/candidate and created no new review branch, proving end-to-end dedupe.

## External bridge/protocol candidate adapter

The external candidate adapter uses the public bridge metadata maintained in DefiLlama's `bridges-server` repository:

```text
https://raw.githubusercontent.com/DefiLlama/bridges-server/master/src/data/bridgeNetworkData.ts
```

The paid Bridges API is not required. The weekly workflow downloads the public source snapshot with bounded curl timeouts/retries. If the source is temporarily unavailable, external candidate discovery is skipped for that run without weakening the canonical guard or other monitors.

The parser reads active top-level bridge objects and ignores commented-out entries. It extracts only discovery metadata such as:

```text
external id
display name
bridge database name
slug
project URL
chains
```

Before a candidate can be emitted, the adapter compares it against canonical bridges using:

1. exact normalized canonical name;
2. exact normalized alias;
3. exact normalized slug / previous slug / redirect slug;
4. exact official-domain match.

Matched records are suppressed. The adapter does not use fuzzy matching to silently merge identities.

An unmatched external registry entry is only a class `C` / `hold` candidate. Registry presence establishes neither an incident nor a BIR inclusion boundary. The required next action is:

```text
research_incident_boundary_and_primary_sources
```

The initial changed-candidate ceiling is:

```text
8 candidates per monitoring run
```

The monitor scans in stable external-ID order. Previously emitted unchanged candidates are skipped through fingerprint state, allowing later runs to advance through the remaining unmatched registry without flooding one review PR. A materially changed external entry may re-enter review.

The external source SHA-256 is written into the monitor report for provenance. Candidate records include the external source metadata and project URL when it is a valid HTTP(S) URL.

## Evidence health adapter

The weekly workflow probes a bounded rotating batch of canonical evidence whose `url_status` is `live`.

Initial batch size:

```text
12 evidence URLs per weekly run
```

The batch is selected deterministically by week so the live-evidence corpus is covered over successive runs without storing a cursor in canonical data.

Each selected URL is probed twice independently.

```text
2xx / 3xx            healthy
404 / 410 twice      hard failure → review finding
401 / 403 / 405 /429 access/bot/rate-limit block → no dead-link finding
5xx / timeout        soft/transient failure → no hard finding
mixed results         no hard finding
```

A hard failure never changes canonical evidence automatically. It creates a review finding directing the operator to inspect the source URL and archived fallback.

Primary or Tier 1 evidence receives `high` review severity; other evidence receives `medium`.

If a previously recorded hard failure later passes two healthy probes, the monitor emits one low-severity recovery finding and stores the healthy fingerprint so future degradation can be detected again.

HTTP probing uses Node's built-in `fetch`, follows redirects, requests only a small byte range, and cancels the response body after headers. No package dependency is required by the monitoring workflow.

## Workflow behavior

`.github/workflows/bir-monitoring.yml` runs weekly at a non-hour boundary and can also be dispatched manually. A workflow-file change on `main` triggers a bounded smoke run.

Execution order:

```text
open-PR / pending-review-branch guard
↓
collect open GitHub review issues
↓
collect public external bridge registry snapshot
↓
canonical fingerprint / health check
↓
GitHub issue watch
↓
bounded two-pass evidence health watch
↓
external bridge/protocol candidate watch
↓
signal fingerprint + dedupe
↓
review-only output generation
↓
canonical diff guard
↓
allowed-path scope guard
↓
auto/monitoring/<date>-<run> branch
↓
try Auto monitoring report PR
↓
if Actions PR creation is disabled: retain validated review branch and finish successfully
```

If there are no new or changed signals, no repository diff, review branch, or PR is created.

If GitHub Actions is allowed to create pull requests, the workflow opens the review PR automatically. If repository settings disallow Actions-created PRs, only that known permission error is treated as non-fatal: the already-validated `auto/monitoring/*` branch is retained and reported in the Actions summary. Other PR-creation failures remain fatal.

## First live foundation proof

Run `31301301277` demonstrated the review-only path for Issue #171:

```text
Signal candidates        1
Candidate                Boltz — B / hold
Canonical counts         33 / 34 / 183 / 287
Unknown URL status       0
Reference errors         0
Canonical diff           none
Allowed-path guard       passed
Review branch            auto/monitoring/20260809-gh-31301301277
Review PR                #223
Canonical publication    none
```

After PR #223 merged the signal fingerprint state, rerunning the same monitor produced `has_changes=false` and no new review branch.

The evidence-health live smoke in run `31301765004` selected 12 of 287 live evidence URLs, performed 24 independent probes, emitted zero hard 404/410 findings, and left canonical data byte-identical.

## Tests

`npm run monitoring:test` verifies:

1. a new monitoring issue emits one finding/candidate;
2. an unchanged issue is suppressed;
3. a materially changed issue is emitted again;
4. a two-pass 404 on primary/Tier 1 evidence emits one high-severity finding;
5. the same hard failure is deduped;
6. a later two-pass healthy result emits one recovery finding;
7. 403/access blocking does not become a dead-link signal;
8. external-registry parsing ignores commented entries;
9. an exact canonical bridge match is suppressed;
10. one unmatched external bridge becomes a class `C` hold candidate;
11. an unchanged external candidate is deduped;
12. materially changed external metadata re-enters review;
13. all four canonical files remain byte-identical.

The normal repository `Check` workflow runs these controlled tests without external network access.

## Next modules

Add adapters one at a time:

1. closure/pause/hack/regulatory news signals;
2. existing active bridge and official-domain status checks;
3. archive-health refinement for already-dead sources;
4. public site/SEO checks;
5. monitoring-state and watchlist-resolution health.

Each module must first emit review artifacts only. Automatic canonical publication remains prohibited.
