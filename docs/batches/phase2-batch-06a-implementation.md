# Phase 2 Batch 6A implementation

Status: canonical data implemented; PR and production verification pending  
Updated: 2026-07-28

## Canonical additions

```text
Bridge entities   2
Incident cases    2
Timeline events   11
Evidence records  12
```

New corpus totals:

```text
Bridges     28
Incidents   29
Events      134
Evidence    160
```

## Transit Swap

Added:

- canonical bridge-aggregator entity
- October 2022 routing and approval exploit
- disputed USD 21 million to USD 28.9 million reported scope
- initial disclosure and tracing
- approximately 70 percent attacker return
- later additional BNB returns and unresolved final reconciliation
- formal service suspension
- 21 October 2022 relaunch and contract-hardening event
- current active-state evidence

The record keeps attacker returns separate from protocol-funded reimbursement. It does not mark reimbursement completed.

## Magpie Protocol / Fly

Added:

- canonical bridge-aggregator entity with Fly brand-history context
- 23 April 2024 MagpieRouterV2 exploit
- USD 129,000 stolen from 221 wallets
- dApp pause
- selector-position validation fix and postmortem
- full protocol-funded reimbursement
- month-precision reopening outcome
- current Fly product and deployment evidence
- Wormhole retained as a dependency rather than an affected bridge

## Safety boundaries

- no integrated bridge or DEX is classified as compromised solely because its route was available through an aggregator
- user approvals are not bridge reserves
- attacker return is not reimbursement
- relaunch does not establish complete restitution
- Magpie-to-Fly identity context is recorded without creating an unsupported successor entity
- Transit amount differences remain an explicit range with separate sources

## Validation

The bounded generator ran before the canonical commit and passed:

```text
npm run validate:data
npm run validate:enums
npm run audit:first-ten
npm run build
npm run dist:check
npm run dist:test
```

The temporary write-enabled workflow, generator, and trigger file were removed before PR creation.

## Remaining Batch 6 work

Batch 6B remains limited to:

- Rubic
- Unizen

Neither is promoted until the source gates recorded in `phase2-batch-06-source-resolution-2026-07-28.md` are satisfied.
