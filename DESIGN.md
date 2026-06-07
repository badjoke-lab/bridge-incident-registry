# DESIGN.md — Bridge Incident Registry

## Purpose

This document is the visual source of truth for Bridge Incident Registry (BIR).

BIR should feel like a quiet incident registry: structured, archival, evidence-based, calm, and data-dense.

## Core direction

### Working phrase

**Quiet incident registry**

### Desired mood

- archival
- sober
- precise
- evidence-based
- technical but readable
- dense without becoming a trading terminal

### Avoid

- crypto neon
- cyberpunk styling
- sensational exploit imagery
- trading-dashboard layouts
- alarm-feed aesthetics
- oversized SaaS marketing sections
- giant mobile cards with little information

## Layout principles

- desktop-first for dense registry browsing
- responsive from the beginning
- wide content frame for tables and timelines
- compact headers
- restrained spacing
- borders used to communicate structure
- minimal decorative elevation

## Registry pages

Pages:

- `/`
- `/bridges/`
- `/incidents/`

Structure:

1. compact page header
2. summary strip
3. filters and controls
4. dense table or compact records
5. methodology and correction links

## Detail pages

Pages:

- `/bridge/[slug]/`
- `/incident/[slug]/`

Bridge detail structure:

1. identity and status
2. facts
3. URL safety block
4. summary
5. incident cards
6. lifecycle timeline
7. evidence and uncertainty

Incident detail structure:

1. incident identity
2. outcome card
3. amount discrepancy
4. safe technical summary
5. aftermath timeline
6. recovery and reimbursement
7. known unknowns and conflicting claims
8. evidence list

## Information density

- tables are core components
- cards are used only for summaries and outcomes
- mobile records should collapse into compact multi-line rows
- exact values and definitions should remain accessible
- evidence and uncertainty should not be visually hidden

## Color roles

Use a restrained archival palette.

- base: near-black / deep charcoal or soft off-white
- primary accent: muted bronze or aged gold
- archive link: subdued archival blue
- active: subdued green
- paused / limited: dusty amber
- inactive: blue-gray
- deprecated / dead: muted red-brown
- migrated: muted violet-gray
- unknown: neutral gray
- unsafe: strong warning red

Accent colors must be sparse and stable across pages.

## Typography

- modern sans-serif
- no decorative display fonts
- compact headings
- readable body text
- small but legible metadata
- slightly smaller table text is acceptable

## Core components

- Header
- Footer
- SummaryStrip
- RegistryTable
- FilterBar
- StatusChip
- MaturityChip
- UpdateStatusChip
- IncidentOutcomeCard
- AmountDiscrepancyBlock
- Timeline
- EvidenceList
- KnownUnknowns
- ConflictingClaims
- UrlBlock
- SourceHierarchyNote

## URL safety presentation

- unsafe, repurposed, and dead domains must not look like normal actions
- archived URLs are the primary action for dead-side records
- original URLs may remain visible as historical text
- evidence links should show live, archived, dead, redirected, paywalled, or unknown state

## Accessibility

- status must not rely on color alone
- keyboard focus must remain visible
- tables and filters must be usable by keyboard
- contrast must remain readable in both light and dark modes if both are implemented
- reduced-motion preferences must be respected

## Responsive rule

Mobile must preserve information density without forcing horizontal scrolling for every interaction. Dense desktop tables may become compact two- or three-line records, but not oversized cards.
