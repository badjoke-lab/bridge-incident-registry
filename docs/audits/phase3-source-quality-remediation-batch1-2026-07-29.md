# Phase 3 source-quality remediation Batch 1 — 2026-07-29

Status: canonical migration complete; production verification pending

## Scope

This batch resolves the LI.FI 2022 incident primary-source gap using LI.FI's first-party smart-contract vulnerability postmortem.

## Reviewed source

```text
Title       LI.FI Smart Contract Vulnerability Post Mortem
Publisher   LI.FI
Published   2022-03-21
URL         https://blog.li.finance/20th-march-the-exploit-e9e1c5c03eb9
Tier        tier_1
Primary     true
```

The postmortem establishes:

- the March 20, 2022 unchecked external-call exploit;
- approximately USD 600,000 stolen from 29 wallets;
- disabling of vulnerable swap methods;
- deployment of a whitelist-based fix and reenabled swaps;
- infinite approvals disabled by default;
- reimbursement of all 29 affected wallets;
- USD 570,000 total operator-funded compensation.

## Canonical changes

```text
New evidence             bir_src_000264, bir_src_000265
Incident updated         bir_inc_000015
Events updated           bir_ev_000043, bir_ev_000044
Evidence total           263 -> 265
Incident source_count      5 -> 7
Exploit event count        3 -> 4
Resolution event count     2 -> 3
Reimbursement            partial -> completed
Unresolved               true -> false
```

Attacker-fund recovery remains `none`. Completed reimbursement records user compensation and does not imply recovery of attacker-held funds.

## Source-quality result

```text
Primary evidence                    181 -> 183
Tier 1 evidence                     199 -> 201
Official-domain evidence            121 -> 123
Incidents without primary evidence    2 -> 1
Events without primary evidence      36 -> 34
Incidents without tier 1 evidence     1 -> 1
Events without tier 1 evidence       25 -> 25
```

The remaining incident primary and tier-1 gap is `bir_inc_000026`, Nerve Bridge 2021 metapool exploit. No first-party incident source was invented or inferred from current Nerve operation pages.

## Validation

The bounded migration passed canonical validation, enum validation, first-ten and full-corpus audits, exact source-count equality, source-quality baseline checks, all controlled failure fixtures, and the static build before the canonical commit was created.

Final normal CI must also pass document-count and final-`dist` consistency after permanent documentation is synchronized.
