# Bridge Incident Registry v0.3 Specification

Status: final pre-implementation specification  
Project name: Bridge Incident Registry  
Short name: BIR

## 1. Purpose

Bridge Incident Registry is a historical registry of cross-chain bridge and interoperability incidents and their aftermath.

The registry tracks not only the initial exploit or failure, but also:

- pauses and suspensions
- postmortems
- fund recovery
- reimbursement
- reopening
- replacement
- migration
- deprecation
- shutdown

BIR is not a bridge safety ranking, a live alert service, an investment recommendation, or an exploit reproduction resource.

## 2. Product position

BIR should own this position:

> The registry for what happened after cross-chain bridge incidents.

The primary differentiation is structured aftermath data rather than loss rankings alone.

## 3. Scope

### Included

- asset bridges
- wrapped-asset bridges
- canonical bridges
- third-party bridges
- cross-chain routers
- cross-chain messaging protocols
- interoperability protocols
- bridge aggregators with meaningful incident history

### Excluded by default

- ordinary DEXs without bridge functionality
- ordinary CEX deposit and withdrawal support
- wallets without a bridge-infrastructure role
- chain outages unrelated to a bridge
- ordinary protocol upgrades without incident relevance
- token price collapses without bridge relevance

Borderline records may be included when the system is commonly described as bridge or interoperability infrastructure and the event materially affected cross-chain transfers.

## 4. Canonical record model

BIR uses four canonical record types:

```text
bridge_entity
incident_case
bridge_event
bridge_evidence
```

### Relationship

```text
bridge_entity
  -> incident_case
    -> bridge_event
      -> bridge_evidence
```

Evidence may also support entity-level and incident-level claims directly.

## 5. Shared metadata

### record_maturity

```text
stub
reviewed
full
```

- `stub`: minimal public record that still requires substantial enrichment
- `reviewed`: principal fields and supporting evidence are present
- `full`: major incident has a meaningful timeline, aftermath, and evidence set

### update_status

```text
current
stale
needs_review
under_revision
```

Record completeness and record freshness are separate axes.

### confidence

```text
high
medium
low
```

### date_precision

```text
day
month
year
approximate
unknown
```

### Null semantics

- `null`: optional field not currently populated
- `unknown`: researched but not established
- `not_applicable`: the field does not apply structurally

## 6. Stable identifiers and URLs

### ID formats

```text
bridge_entity:   bir_bridge_000001
incident_case:   bir_inc_000001
bridge_event:    bir_ev_000001
bridge_evidence: bir_src_000001
```

Published IDs are immutable.

Each bridge and incident supports:

```text
slug
previous_slugs[]
redirect_from[]
```

Slug changes must preserve old routes through generated redirects or redirect rules.

Duplicate and restructuring metadata may use:

```text
duplicate_of
merged_into
split_from
split_reason
```

## 7. bridge_entity

### Required fields

```text
id
slug
previous_slugs[]
redirect_from[]
canonical_name
type
status
summary
confidence
record_maturity
update_status
last_reviewed_at
last_verified_at
```

### Recommended fields

```text
aliases
launch_date
launch_date_precision
end_date
end_date_precision
terminal_reason
official_url
official_domain
official_url_status
archived_url
primary_chains
primary_assets
operator_name
operator_type
ecosystem_name
related_protocols
brand_history_notes
major_incident_count
has_unresolved_incident
has_reimbursement_history
successor_id
predecessor_id
replacement_bridge_id
duplicate_of
merged_into
notes
```

### type

```text
asset_bridge
wrapped_asset_bridge
canonical_bridge
third_party_bridge
cross_chain_router
cross_chain_messaging
interoperability_protocol
bridge_aggregator
hybrid
unknown
```

### status

```text
active
limited
paused
inactive
deprecated
migrated
dead
unknown
```

### terminal_reason

```text
exploit
security_shutdown
governance_shutdown
migration
replacement
operator_shutdown
regulatory
ecosystem_collapse
unknown
not_applicable
```

### official_url_status

```text
live_verified
live_unverified
dead_domain
redirected
repurposed
unsafe
unknown
```

### operator_type

```text
company
foundation
dao
protocol_team
ecosystem
unknown
not_applicable
```

## 8. incident_case

### Required fields

```text
id
bridge_id
slug
previous_slugs[]
redirect_from[]
title
incident_date
incident_date_precision
incident_type
summary
confidence
record_maturity
update_status
source_count
last_reviewed_at
last_verified_at
```

### Recommended fields

```text
is_major_incident
reported_loss_usd_display
reported_loss_usd
reported_loss_usd_min
reported_loss_usd_max
reported_loss_text
reported_loss_assets
usd_valuation_date
loss_amount_basis
amount_confidence
amount_note
amount_claims
recovery_status
reimbursement_status
restart_status
current_outcome
is_unresolved
unresolved_reason
affected_chains
affected_assets
attack_vector_category
postmortem_available
known_unknowns
conflicting_claims
duplicate_of
merged_into
split_from
split_reason
```

### incident_type

```text
exploit
hack
vulnerability_disclosure
funds_loss
abnormal_transfers
bridge_pause
shutdown
migration
reimbursement
legal_or_regulatory
other
```

### recovery_status

```text
none
partial_recovery
full_recovery
unknown
not_applicable
```

### reimbursement_status

```text
not_announced
announced
in_progress
completed
partial
denied
unknown
not_applicable
```

### restart_status

```text
never_paused
paused
reopened
partially_reopened
replaced
not_reopened
unknown
not_applicable
```

### current_outcome

```text
active_after_incident
limited_after_incident
paused_long_term
migrated_after_incident
deprecated_after_incident
dead_after_incident
unknown
not_applicable
```

### attack_vector_category

Only high-level, non-operational categories are allowed:

```text
validator_key_compromise
message_verification_failure
smart_contract_bug
relayer_or_oracle_issue
configuration_error
frontend_or_dns_compromise
liquidity_or_accounting_failure
operator_or_governance_issue
unknown
not_applicable
```

### postmortem_available

```text
available
not_found
unclear
not_applicable
```

### loss_amount_basis

```text
reported_by_project
estimated_by_analytics
reported_by_news
reported_by_security_firm
mixed_sources
unknown
not_applicable
```

### amount_confidence

```text
high
medium
low
disputed
unknown
not_applicable
```

### amount claim shape

```json
{
  "amount_text": "173,600 ETH and 25.5M USDC",
  "amount_usd_text": "approximately $625M",
  "source_id": "bir_src_000001",
  "basis": "reported_by_project",
  "usd_valuation_date": "2022-03-29",
  "notes": "USD estimate varies by valuation date."
}
```

## 9. Major and unresolved classification

An incident may be marked major when one or more of the following apply:

- reported loss is at least USD 10 million
- the bridge paused, shut down, migrated, or was replaced
- the event received broad coverage
- an official postmortem exists
- recovery or reimbursement occurred
- multiple chains or a large user population were affected
- the incident is historically representative for BIR

Major does not mean unsafe. It means historically significant within the registry.

`is_unresolved` means BIR has not verified a complete recovery, reimbursement, restart, or final outcome. It does not necessarily mean the project is unsafe or inactive.

## 10. Incident grouping

One incident case may group exploit, disclosure, pause, recovery, reimbursement, reopening, migration, and shutdown events when they belong to the same crisis.

Separate incident cases should be used for:

- independent incidents in different periods
- materially different root causes
- incidents involving a successor or replacement system
- a new loss that is not merely a later update to the original event

## 11. bridge_event

### Required fields

```text
id
bridge_id
incident_id
event_type
event_date
event_date_precision
title
description
confidence
record_maturity
update_status
```

`incident_id` may be null only for non-incident lifecycle events.

### event_type

```text
launched
exploit_occurred
hack_disclosed
vulnerability_disclosed
bridge_paused
deposits_suspended
withdrawals_suspended
transfers_suspended
funds_lost
funds_recovered
funds_returned
reimbursement_announced
reimbursement_started
reimbursement_completed
bridge_reopened
bridge_partially_reopened
audit_published
postmortem_published
migration_announced
migration_completed
deprecated
shutdown_announced
shutdown_effective
legal_action
successor_announced
other
```

### impact_level

```text
low
medium
high
critical
```

### status_effect

```text
none
active
limited
paused
inactive
deprecated
migrated
dead
unknown
```

## 12. bridge_evidence

### Required fields

```text
id
bridge_id
source_type
title
url
publisher
published_at
published_at_precision
reliability
source_tier
url_status
```

### Recommended fields

```text
incident_id
event_id
archived_url
accessed_at
claim_scope
notes
```

### source_type

```text
official_statement
official_blog
official_social
postmortem
audit_report
security_firm_report
blockchain_analytics_report
news_article
court_document
regulatory_notice
archive_capture
database_reference
community_reference
other
```

### source_tier

```text
tier_1
tier_2
tier_3
unknown
```

### url_status

```text
live
archived
dead
redirected
paywalled
unknown
```

### claim_scope

```text
bridge_entity
incident_case
event
amount
recovery
reimbursement
restart
shutdown
migration
status
url_history
ownership
```

## 13. Source hierarchy

### Tier 1

- official postmortem
- official statement
- court or regulatory document
- on-chain analytics report with clear methodology

### Tier 2

- security firm report
- blockchain analytics company report
- major crypto media
- archived official page

### Tier 3

- database reference
- community reference
- forum post
- social-media post
- secondary summary

Tier 3 alone must not establish a major claim.

## 14. Conflicting claims

Conflicting material claims must not be silently collapsed into one value.

Example:

```json
{
  "claim": "reimbursement_status",
  "values": ["completed", "partial"],
  "source_ids": ["bir_src_000010", "bir_src_000011"],
  "resolution": "treated_as_partial_until_official_completion_source_found"
}
```

## 15. Chain and asset normalization

Reference dictionaries:

```text
data/reference/chains.json
data/reference/assets.json
```

Canonical records store normalized keys. UI displays `display_name`. Aliases are searchable.

## 16. URL safety

Original URLs are historical records, but not always safe navigation targets.

- `dead_domain`, `repurposed`, and `unsafe` URLs are not normal clickable links
- archived URLs become the primary action for dead-side records
- unsafe URLs are displayed as text only
- redirects must distinguish the original address from the current destination
- evidence URL status is tracked separately

## 17. Public pages

Required for v0:

```text
/
/bridges/
/incidents/
/bridge/[slug]/
/incident/[slug]/
/methodology/
/about/
```

Planned after v0:

```text
/stats/
/updates/
/reports/
```

## 18. Incident detail requirements

A major incident page should include:

- incident outcome card
- reported amount and amount discrepancy block
- safe technical summary
- aftermath timeline
- recovery and reimbursement status
- restart, migration, or shutdown outcome
- known unknowns
- conflicting claims when relevant
- evidence list
- source hierarchy note
- record maturity and freshness

## 19. Search and filters

Client-side search targets:

- canonical bridge name
- aliases
- incident title
- affected chains
- affected assets
- official domain
- operator
- ecosystem

Incident filters should include:

- incident type
- major incident
- record maturity
- update status
- loss band
- amount confidence
- recovery status
- reimbursement status
- restart status
- current outcome
- unresolved state
- chain
- asset
- attack-vector category
- postmortem availability
- confidence

The default incident sort is date descending. Largest-loss ranking is an optional view, not the default.

## 20. Methodology requirements

The methodology page is the definition source of truth and must document:

- scope
- entity, incident, and event boundaries
- grouping rules
- maturity and freshness
- date precision
- null semantics
- stable IDs and redirects
- duplicate, merge, and split handling
- conflicting claims
- amount handling
- recovery, reimbursement, restart, and outcome definitions
- unresolved classification
- source hierarchy
- chain and asset normalization
- URL safety
- evidence reliability
- citation and attribution
- safe technical-summary limits

Mandatory statement:

> BIR does not rank bridge safety. BIR does not recommend using any bridge. BIR records historical incidents and their aftermath. BIR does not provide exploit reproduction steps.

## 21. Technical architecture

v0 is fully static:

```text
Astro
TypeScript
static JSON
Cloudflare Pages
GitHub pull-request workflow
client-side search and filters
```

v0 does not require:

```text
database
server API
authentication
wallet connection
real-time monitoring
on-chain parser
```

Canonical data is never automatically published. All canonical changes require pull-request review.

## 22. Data files

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
data/reference/chains.json
data/reference/assets.json
```

## 23. Validation

Validation must detect at minimum:

- malformed JSON
- duplicate IDs and slugs
- invalid enums
- missing required fields
- broken cross-record references
- invalid dates and date precision
- invalid URLs
- unknown chain or asset keys
- source-count mismatches
- amount claims referencing missing evidence
- completed reimbursement without supporting evidence
- reopened status without supporting evidence
- unresolved incident without a reason
- unsafe URL rule violations
- invalid duplicate, merge, or split references
- invalid conflicting-claim source IDs
- dead evidence URL without archive fallback

## 24. Initial public seed

Minimum public target:

```text
30 incident cases
20 bridge entities
10 full or near-full Tier A incidents
4 or more evidence records for each Tier A incident
an aftermath timeline for each Tier A incident
```

Representative Tier A candidates:

- Ronin Bridge
- Wormhole
- Nomad Bridge
- Harmony Horizon Bridge
- Poly Network
- BNB Bridge / BSC Token Hub
- Multichain
- Orbit Bridge
- Qubit Bridge
- THORChain

## 25. Licensing and attribution

Initial repository note:

```text
All rights reserved until a public data license is finalized.
```

BIR does not own linked articles, reports, posts, or archives. External databases may be used as references, but BIR must not bulk-copy proprietary datasets.

Quoted excerpts must be short. Prefer paraphrase and link to the source.

## 26. Safety and legal posture

Do not publish:

- exploit reproduction steps
- copyable exploit code
- attack payloads
- bypass instructions
- operational details that enable abuse

Use qualified language for disputed or incomplete claims. Records may be revised as evidence changes.

## 27. Acceptance criteria

v0 is acceptable when:

1. the site builds as a fully static project;
2. all required routes exist;
3. all four canonical record types are implemented;
4. core validation passes;
5. major incident pages show aftermath, evidence, and uncertainty;
6. the methodology page defines all enums and classification rules;
7. URL safety rules are enforced;
8. the public seed minimum is met;
9. correction and issue-reporting paths exist;
10. changelog and license notes exist.
