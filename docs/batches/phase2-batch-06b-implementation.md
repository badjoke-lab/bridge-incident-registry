# Phase 2 Batch 6B implementation

Status: canonical data implemented; PR and production verification pending  
Updated: 2026-07-28

## Canonical additions

```text
Bridge entities   2
Incident cases    3
Timeline events   16
Evidence records  21
Asset references  2
```

New corpus totals:

```text
Bridges     30
Incidents   32
Events      150
Evidence    181
```

## Rubic

Added one active bridge-aggregator entity and two separate incidents.

### RBC/BRBC bridge wallet compromise

- private-key compromise of a wallet used for the former RBC/BRBC bridge and staking rewards
- former native bridge already disabled and replaced by external bridge infrastructure
- approximately 35 million RBC/BRBC released or sold
- approximately 138 ETH attacker proceeds reported
- token quantity, proceeds, collateral break, and market impact kept separate
- recovery remains unknown
- no user reimbursement is inferred because Rubic reported swap and staking funds safe
- historical bridge component outcome recorded as deprecated/replaced

### RubicProxy approval exploit

- 25 December 2022 arbitrary-call and routing-validation flaw
- approved user USDC transferred and converted to approximately 1,188 ETH
- USD 1.4–1.5 million loss range retained
- affected contracts paused
- no attacker return or completed reimbursement established
- rewritten audited contracts recorded at April 2023 month precision
- 2024 security-architecture publication and current active state recorded

The two incidents are not merged because they affected different infrastructure, assets, users, and aftermath paths.

## Unizen

Added one active bridge-aggregator entity and one March 2024 incident.

- unsafe external-call path in an Ethereum trade-aggregation contract
- USD 2.1–2.18 million reported range
- approved user assets affected; UIP providers not classified as compromised
- 20 percent bounty and law-enforcement response
- official reimbursement announcement and commencement for more than 99 percent of affected users
- wallets above USD 750,000 retained as case-by-case unresolved outcomes
- approximately USD 185,000 partial recovery reported
- reimbursement remains `in_progress`, not completed
- current documentation, audits, and contract updates support active operation
- later Tornado Cash movement prevents any inference of full attacker return

## Reference additions

```text
rbc
brbc
```

## Safety boundaries

- administrative-wallet assets are not treated as user swap reserves without evidence
- native bridge collateral effects remain distinct from aggregator user-approval losses
- token quantity, attacker proceeds, USD loss, collateral effect, and market-price effect remain separate
- reimbursement commencement is not completion
- partial recovery is not complete user restitution
- integrated bridge providers do not inherit aggregator contract incidents
- the active Rubic entity does not make its former native bridge component active

## Validation

The bounded generator passed before committing canonical data:

```text
npm run validate:data
npm run validate:enums
npm run audit:first-ten
npm run build
npm run dist:check
npm run dist:test
```

The temporary generator, write-enabled workflow, and trigger file were removed before review.

## Remaining work

1. run the normal pull-request CI against the cleaned branch
2. review all amount, recovery, reimbursement, component, and current-state boundaries
3. merge only after all checks pass
4. run explicit production verification against 30 bridge and 32 incident detail routes
5. begin Phase 2 Batch 7 only after publication is verified
