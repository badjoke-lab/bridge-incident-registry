# Phase 5 news-signal source selection — 2026-08-09

Status: reviewed implementation input  
Scope: review-only discovery; no canonical publication

## Decision

Use the GDELT DOC 2.0 ArticleList API as the first broad news-discovery input for BIR.

This is a discovery source only. A GDELT hit is not evidence that a bridge incident occurred and is never sufficient for canonical publication.

## Why this source

GDELT's official DOC 2.0 documentation supports the properties needed for a bounded no-secret monitoring adapter:

- full-text query expressions with exact phrases and Boolean OR blocks;
- `TIMESPAN` or precise `STARTDATETIME` / `ENDDATETIME` windows;
- ArticleList result limits through `MAXRECORDS`;
- date sorting;
- JSON, RSS, and JSONFeed output;
- no repository secret or API key in the documented request model.

Official references:

- https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/
- https://blog.gdeltproject.org/doc-geo-2-0-api-updates-full-year-searching-and-more/
- https://blog.gdeltproject.org/gdelt-doc-2-0-api-supports-jsonfeed/

## Why not use DefiLlama hacks as this adapter

DefiLlama's official SDK documents `ecosystem.getHacks()` as a Pro endpoint. BIR monitoring must not depend on a paid API or a secret merely to keep candidate collection running.

The existing public DefiLlama `bridges-server` metadata remains useful as the bridge-universe change detector, but it is not an incident feed.

Official reference:

- https://github.com/DefiLlama/api-sdk

## Query boundary

Do not query the generic word `bridge` by itself. That would mix physical bridges and unrelated uses of the word into the review queue.

Start with two narrow query families and combine their results after normalization.

### Security incident family

Conceptual query:

```text
("cross-chain bridge" OR "blockchain bridge" OR "crypto bridge")
(hack OR hacked OR exploit OR exploited OR attack OR drained)
```

### Operational interruption family

Conceptual query:

```text
("cross-chain bridge" OR "blockchain bridge" OR "crypto bridge")
(paused OR pause OR suspended OR suspend OR shutdown OR "shut down")
```

The workflow should use an overlapping time window so a delayed weekly job does not create a blind gap. An eight-day window is appropriate for a nominal weekly schedule; dedupe state prevents repeated review output.

Initial per-query result ceiling:

```text
75 ArticleList rows
```

Sort newest first. Treat any source-side truncation as a monitoring-health condition to review before increasing the ceiling.

## Stored fields

Store only discovery metadata needed for review and dedupe. Do not mirror article bodies.

Preferred normalized fields:

```text
source_provider
gdelt_query_family
article_url
article_title
article_domain
seen_or_publication_time
language (when supplied)
source_country (when supplied)
```

The canonical review artifact may also store a SHA-256 of the normalized input row for provenance/dedupe.

## Identity and dedupe

Article key priority:

1. normalized final article URL;
2. if a usable URL is unavailable, SHA-256 of normalized domain + title + observed time.

Before emitting a news signal:

1. suppress an unchanged previously observed article key;
2. suppress a URL already present in canonical evidence;
3. attempt an exact bridge identity match using canonical names, aliases, slugs, official domains, and the external bridge-universe names already tracked in monitoring state;
4. do not silently fuzzy-merge identities.

## Candidate classes

No GDELT-only result may become class `A`.

### Class B / hold

Use only when the article title contains both:

- an exact known bridge/protocol identity; and
- an explicit incident or interruption term from the bounded query vocabulary.

Next action:

```text
locate_primary_source_and_define_incident_boundary
```

### Class C / hold

Use when a result clearly refers to a crypto/cross-chain bridge incident concept but cannot be safely tied to one known bridge identity from title/domain metadata alone.

Next action:

```text
resolve_bridge_identity_before_incident_research
```

## First-run rule

Do not alert on the entire historical eight-day result set during adapter initialization.

The first successful query result set must be fingerprinted as a reviewed baseline with zero candidates, following the same principle adopted for the external bridge universe after live smoke testing exposed candidate noise.

Only newly observed or materially changed article rows after that baseline may enter the review watchlist.

## Failure handling

GDELT availability is not a canonical-data dependency.

If a query request times out, returns malformed data, or is temporarily unavailable:

- record the adapter as unavailable in monitoring diagnostics;
- do not mutate its successful baseline/dedupe state;
- do not emit incident candidates from partial/malformed input;
- continue GitHub issue, evidence-health, and external-universe monitors;
- do not fail open into canonical publication.

Repeated adapter failures can later become a separate monitoring-health finding.

## Safety boundary

A news article or aggregator hit is discovery material only.

Canonical incident work still requires a separate reviewed branch and claim-relative evidence review. Existing source hierarchy, event/incident semantics, archive rules, source-count equality, URL-status ceiling, and production equality gates remain unchanged.

## Controlled tests required before integration

1. malformed payload fails closed;
2. generic physical-bridge title is rejected;
3. baseline initialization emits zero candidates;
4. unchanged repeat is suppressed;
5. duplicate canonical evidence URL is suppressed;
6. known bridge + explicit exploit title emits B/hold;
7. unknown crypto-bridge + exploit title emits C/hold;
8. known bridge without incident vocabulary does not emit;
9. same article returned by both query families dedupes to one signal;
10. candidate ceiling defers rather than acknowledges overflow rows;
11. canonical files remain byte-identical.

## Implementation order

1. add a pure parser/classifier with injected fixtures and no network in CI;
2. integrate two bounded GDELT query inputs into `BIR Monitoring`;
3. merge a reviewed first-run baseline state with zero candidates;
4. rerun the same inputs and prove silence;
5. only then enable new/changed news signals as B/C review candidates.
