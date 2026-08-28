# Record-growth Batch 07 review

Issue: #393

This is a review-only boundary for one genuinely new cross-chain interoperability candidate plus an explicit duplicate-audit correction. It does not itself modify canonical JSON.

Canonical application: PR #395 applies only the reviewed Rango Exchange lifecycle record. LI.FI and Rubic remain existing canonical entities and are not duplicated.

## Duplicate-audit correction

The initial Batch 07 review incorrectly treated LI.FI and Rubic as new candidates because the name-level GitHub code search returned no hits. The subsequent exhaustive Batch 06 production verification exposed the actual canonical routes and incident dossiers, which supersede that weak search result.

### LI.FI / Li.Finance — already canonical, do not add

Production/canonical verification proves an existing `/bridge/li-fi/` dossier, legacy redirects from `/bridge/li-finance` and `/bridge/lifi`, and existing incident dossiers including the 2022 approval-drain exploit and 2024 facet-approval exploit.

The newly gathered LI.FI history remains useful future enrichment evidence, but Batch 07 must not allocate another bridge entity.

### Rubic — already canonical, do not add

Production/canonical verification proves an existing `/bridge/rubic/` dossier, legacy redirects from `/bridge/rubic-exchange`, and existing 2022 Rubic incident dossiers.

The newly gathered 2021 launch material may support a separate lifecycle-enrichment review if the existing record needs it, but Batch 07 must not allocate another bridge entity.

## Rango Exchange — add_now

Canonical boundary: universal cross-chain DEX and bridge aggregator, launch **2021-08** month precision.

Reviewed primary evidence:

- GitHub's verified Rango Exchange organization, with verified control of `rango.exchange`, describes the project as a cross-chain DEX/bridge aggregator launched in August 2021: https://github.com/rango-exchange
- Current official site describes Rango as a cross-chain DEX and bridges aggregator with smart routing: https://rango.exchange/
- Official roadmap places the v0.9 origin and bridge integrations in 2021 Q3: https://docs.rango.exchange/roadmap
- Dated first-party retrospective on the official Rango updates domain independently states launch in August 2021 and is used by the canonical application because canonical evidence requires a publication date: https://updates.rango.exchange/en/rango-monthly-report-august-2025-edition-KK2suteO

Review decision: month precision only. Lifecycle-only; no incident or safety judgment.

## retained research-only

- Owlto Finance — present bridge identity is strong; historical launch precision still needs a clean first-party locator.
- Layerswap — current identity is strong; a partner-primary January 2022 integration establishes operation by that date, but the initial Layerswap launch boundary remains insufficiently pinned for this batch.
- HECO Bridge / HECO Chain gateway 2023 — keep research-only; HTX hot-wallet loss is not bridge-specific loss evidence.

## guardrails

- Scope remains cross-chain bridge and interoperability infrastructure. This review does not authorize ordinary same-chain DEX records.
- Production/canonical evidence wins over incomplete name-level code search results for duplicate detection.
- Repeat duplicate/alias/domain checks on current main before canonical ID allocation.
- Primary/Tier-1 support is required for each promoted lifecycle event.
- Do not invent incidents, losses, launch dates, or safety conclusions.
- Do not weaken any source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality gate or raise its ceiling.
