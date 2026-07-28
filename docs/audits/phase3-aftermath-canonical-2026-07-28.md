# Phase 3 aftermath canonical migration — 2026-07-28

Status: implementation complete on review branch  
Baseline: 33 bridges / 34 incidents / 173 events / 199 evidence  
Result: 33 bridges / 34 incidents / 182 events / 210 evidence

## Purpose

Resolve the reviewed reimbursement-completion and reopening warnings without duplicating existing historical events or collapsing different aftermath mechanisms.

## Canonical changes

### Existing event normalization

Seven descriptive legacy reopening event types were normalized to `bridge_reopened`:

```text
bir_ev_000032
bir_ev_000038
bir_ev_000042
bir_ev_000056
bir_ev_000060
bir_ev_000063
bir_ev_000085
```

Two generic aftermath event types were normalized to reimbursement completion:

```text
bir_ev_000003  Ronin users made whole
bir_ev_000005  Wormhole sponsor-funded deficit backfill
```

Titles, descriptions, dates, and mechanism-specific notes preserve the historical meaning.

### New events

```text
bir_ev_000174  Ronin bridge reopened
bir_ev_000175  Wormhole service restored
bir_ev_000176  Poly Network partially reopened
bir_ev_000177  Poly Network operations-resumption roadmap completed
bir_ev_000178  BSC Token Hub cross-chain transfers re-enabled
bir_ev_000179  THORChain incident 1 linked to staged restart
bir_ev_000180  THORChain incident 1 reimbursement completed
bir_ev_000181  THORChain incident 2 reimbursement completed
bir_ev_000182  Allbridge submitted claims reimbursed
```

### New evidence

Eleven event-scoped evidence records were added:

```text
bir_src_000200 through bir_src_000210
```

The evidence set adds or re-links first-party sources for Ronin, Wormhole, Poly Network, BNB Chain, THORChain, and Allbridge.

## Semantic rules added

`SPEC.md` and the public methodology now state that:

- recovery means lost or attacker-controlled funds were returned, frozen, seized, or recovered;
- reimbursement means affected claims or bridge liabilities were made whole;
- reimbursement may use direct payments, treasury/sponsor funding, investor funding, or a complete deficit backfill;
- reimbursement does not imply attacker-fund recovery;
- chain resumption alone does not prove bridge reopening;
- qualified reimbursement scopes remain qualified.

## Warning result

The full-corpus audit produced:

```text
Blocking errors                  0
completed_reimbursement_event    0
reopened_event                   3
```

Remaining restart warnings:

```text
bir_inc_000015  LI.FI 2022
bir_inc_000016  LI.FI 2024
bir_inc_000017  ChainSwap July 2, 2021
```

These remain open deliberately. The current corpus does not yet contain a sufficiently direct historical reopening source for each claim.

## Validation

The generated 33 / 34 / 182 / 210 state passed:

```text
npm run check
npm run validate:data
npm run validate:enums
npm run audit:first-ten
npm run audit:full-corpus
npm run audit:full-corpus:test
npm run build
npm run dist:check
npm run dist:test
```

The first bounded run exposed only stale count references in README and runbooks. After those references were synchronized, the same canonical state passed all repository gates.

## Safety

- no new bridge or incident identity was created;
- no attacker recovery was inferred from reimbursement;
- no incident-specific THORChain allocation was fabricated from the combined reimbursement total;
- Allbridge completion remains limited to affected users who submitted the application form;
- unsupported LI.FI and ChainSwap restart claims were not converted into events;
- temporary generator, diagnostic output, and write-enabled workflow were removed before final review.

## Publication requirement

After merge, production must converge to:

```text
Bridges     33
Incidents   34
Events      182
Evidence    210
HTML routes 72
```

The complete production-verification gate remains mandatory.
