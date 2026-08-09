# BIR review-gated monitoring

Status: Phase 5 active  
Updated: 2026-08-09

## Purpose

BIR monitoring detects review signals and creates review artifacts. It does not classify or publish canonical incidents automatically.

The active monitoring foundation covers:

- canonical-data fingerprinting and mutation guard;
- canonical reference/unknown-URL health checks;
- open GitHub issue monitoring for explicit review/monitoring signals;
- evidence-link degradation monitoring for bounded rotating batches;
- fingerprint-based suppression of unchanged signals;
- review-only JSON, watchlist, and Markdown outputs;
- weekly or manual GitHub Actions execution;
- review-branch creation only when a signal is new or materially changed.

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

A monitoring PR is not a canonical-data PR. Any candidate or degraded source that merits canonical change must be investigated and applied on a separate reviewed branch.

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

This prevents a standing signal such as Issue #171 or an already-reviewed dead evidence link from generating the same review output every week.

## GitHub issue adapter

Open issues are collected by GitHub Actions with `gh issue list`. An issue is monitored when its title/body explicitly indicates review or monitoring intent, including phrases such as:

```text
monitoring signal
needs evidence
review for canonical
Review ...
```

New/changed issue signals enter the candidate watchlist as class `B` / `hold`. They are not treated as proof of a bridge incident.

The first live foundation smoke detected Issue #171 exactly once. After its fingerprint state was merged in PR #223, an unchanged rerun emitted no finding/candidate and created no new review branch.

## Evidence health adapter

The weekly workflow probes a bounded rotating batch of canonical evidence whose `url_status` is `live`.

Initial batch size:

```text
12 evidence URLs per weekly run
```

The batch is selected deterministically by week so the live-evidence corpus is covered over successive runs without maintaining a cursor in canonical data.

Each selected URL is probed twice independently.

Classification rules:

```text
2xx / 3xx            healthy
404 / 410 twice      hard failure → review finding
401 / 403 / 405 /429 access/bot/rate-limit block → no dead-link finding
5xx / timeout        soft/transient failure → no canonical or dead-link finding
mixed results         no hard-failure finding
```

A hard failure is never applied to canonical evidence automatically. The monitor records a review signal directing the operator to check the source and existing archive fallback.

Primary or Tier 1 evidence receives `high` review severity; other evidence receives `medium`.

If a previously recorded hard failure later passes two healthy probes, the monitor emits one low-severity recovery finding. That healthy state rearms future degradation detection.

HTTP probing uses Node's built-in `fetch`, follows redirects, requests only a small byte range, and cancels the response body after headers. No package dependency is required by the monitoring workflow.

## Workflow behavior

`.github/workflows/bir-monitoring.yml` runs weekly at a non-hour boundary and can also be dispatched manually.

Execution order:

```text
open-monitoring-PR guard
↓
collect open GitHub review issues
↓
canonical fingerprint / health check
↓
GitHub issue watch
↓
bounded two-pass evidence health watch
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
Auto monitoring report PR when repository Actions policy permits it
```

If there are no new or changed signals, no repository diff and no PR are created.

The repository currently permits Actions to push review branches but its repository-level Actions policy rejects PR creation by `GITHUB_TOKEN`. The review branch remains safe and complete; PR creation can be performed through the connected GitHub app until that repository setting is enabled. This limitation does not weaken canonical guards or dedupe behavior.

## Tests

`npm run monitoring:test` verifies:

1. a new monitoring issue emits one finding/candidate;
2. an unchanged issue is suppressed;
3. a materially changed issue is emitted again;
4. a two-pass 404 on primary/Tier 1 evidence emits one high-severity finding;
5. the same hard failure is deduped;
6. a later two-pass healthy result emits one recovery finding;
7. 403/access blocking does not become a dead-link signal;
8. all four canonical files remain byte-identical.

The normal repository `Check` workflow runs these controlled tests without external network access.

## Next modules

Add adapters one at a time:

1. external bridge/protocol candidate lists;
2. closure/pause/hack/regulatory news signals;
3. existing active bridge and official-domain status checks;
4. archive-health refinement for already-dead sources;
5. public site/SEO checks;
6. monitoring-state and watchlist-resolution health.

Each module must first emit review artifacts only. Automatic canonical publication remains prohibited.
