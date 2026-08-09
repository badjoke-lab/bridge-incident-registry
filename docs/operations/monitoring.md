# BIR review-gated monitoring

Status: Phase 5 foundation  
Updated: 2026-08-09

## Purpose

BIR monitoring detects review signals and creates review artifacts. It does not classify or publish canonical incidents automatically.

The foundation currently covers:

- canonical-data fingerprinting and mutation guard;
- canonical reference/unknown-URL health checks;
- open GitHub issue monitoring for explicit review/monitoring signals;
- fingerprint-based suppression of unchanged signals;
- review-only JSON, watchlist, and Markdown outputs;
- weekly or manual GitHub Actions execution;
- automatic PR creation only when a signal is new or materially changed.

External news, regulatory, incident-feed, domain-health, and evidence-link adapters are later Phase 5 modules. They must use the same review-only boundary.

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

A monitoring PR is not a canonical-data PR. Any candidate that merits BIR inclusion must be investigated and applied on a separate reviewed branch.

## Dedupe behavior

State is stored at:

```text
data-staging/monitoring/state.json
```

Each signal receives a stable key and content fingerprint. An unchanged signal is suppressed on later runs. A materially changed title/body/label set is emitted again for review.

For GitHub issues the key is:

```text
github-issue:<number>
```

This prevents a standing monitoring issue such as Issue #171 from generating the same PR every week while still allowing a changed evidence boundary to re-enter review.

## Current GitHub issue adapter

Open issues are collected by GitHub Actions with `gh issue list`. An issue is monitored when its title/body explicitly indicates review or monitoring intent, including phrases such as:

```text
monitoring signal
needs evidence
review for canonical
Review ...
```

New/changed issue signals enter the candidate watchlist as class `B` / `hold`. They are not treated as proof of a bridge incident.

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
Auto monitoring report PR
```

If there are no new or changed signals, no repository diff and no PR are created.

If another auto-monitoring PR is already open, scheduled runs do not create a duplicate. Manual dispatch can explicitly override that guard.

## Tests

`npm run monitoring:test` verifies:

1. a new monitoring issue emits one finding/candidate;
2. an unchanged repeat is suppressed;
3. a materially changed issue is emitted again;
4. all four canonical files remain byte-identical.

The normal repository `Check` workflow runs this controlled test.

## Next modules

After this foundation is stable, add adapters one at a time:

1. external bridge/protocol candidate lists;
2. closure/pause/hack/regulatory news signals;
3. existing active bridge status and official-domain checks;
4. evidence-link degradation and archive-health checks;
5. public site/SEO checks;
6. monitoring-state and watchlist-resolution health.

Each module must first emit review artifacts only. Automatic canonical publication remains prohibited.
