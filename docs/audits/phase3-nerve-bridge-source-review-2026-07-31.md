# Phase 3 Nerve Bridge source review — 2026-07-31

Status: complete review boundary  
Scope: `bir_inc_000026`, `bir_ev_000087`, `bir_ev_000088`

## Purpose

Determine whether the remaining Nerve Bridge 2021 incident-level primary and Tier 1 evidence gap can be closed without weakening the existing source hierarchy or using unrelated current-operation material.

## Canonical state reviewed

```text
Incident              bir_inc_000026
Incident source count 4
Incident primary gap  yes
Incident Tier 1 gap   yes
Exploit event          bir_ev_000087
Analysis event         bir_ev_000088
Current-status event   bir_ev_000089
```

## Existing incident evidence

- `bir_src_000108` — BlockSec technical analysis, Tier 2, non-primary;
- `bir_src_000109` — Halborn comparative analysis, Tier 2, non-primary.

The current NerveNetwork website and documentation records (`bir_src_000110` and `bir_src_000111`) verify present operation and entity architecture only. They do not establish the November 2021 exploit, amount, remediation, reimbursement, pool restoration, or restart timeline.

## Research performed

The review searched:

- the official NerveNetwork website and documentation;
- the official NerveNetwork Medium publication index and November 2021 posts;
- indexed official NerveNetwork X/Twitter results;
- the official NerveNetwork GitHub organization and repository-indexed results;
- combinations of `Nerve Bridge`, `metapool`, `fUSDT`, `UST`, `900 BNB`, `exploit`, `incident`, and November 2021 date terms.

No stable first-party incident announcement, postmortem, reimbursement statement, pool-restoration notice, or exact restart notice was located.

BlockSec's 18 November 2021 analysis explicitly stated that no publicly available report existed to analyze the incident at that time. The reviewed official publication history does not provide a later first-party incident account that closes the canonical gap.

## Decision

```text
Add canonical evidence             no
Reclassify BlockSec to Tier 1      no
Reclassify Halborn to Tier 1       no
Treat current website as incident evidence  no
Incident primary gap remains       yes
Incident Tier 1 gap remains        yes
```

The source gap is now reviewed and intentional. It must not be reduced by:

- reclassifying security-firm analysis;
- attaching current-operation pages to the historical incident;
- inferring reimbursement or restoration from present protocol availability;
- treating a code repository or current documentation as an incident statement without a dated incident-specific claim.

## Canonical implications

No canonical record changes are justified.

The following remain valid:

- incident confidence stays `medium`;
- recovery, reimbursement, and restart outcomes stay `unknown`;
- `bir_ev_000087` and `bir_ev_000088` remain supported by Tier 2 evidence;
- `bir_ev_000089` remains a separate current-operation verification event;
- incident-level primary and Tier 1 gap ceilings remain at one.

## Reopen conditions

Reopen this boundary only if a stable first-party source is found that specifically addresses one or more of:

- the 15 November 2021 exploit;
- affected fUSDT or UST pools;
- the approximately 900 BNB amount;
- remediation or contract replacement;
- pool restoration or restart date;
- reimbursement or final user-loss allocation.

## Next

Proceed to verified archive capture work for the 88 risky-host and 59 terminal unique-URL queues while preserving this incident-level source boundary.
