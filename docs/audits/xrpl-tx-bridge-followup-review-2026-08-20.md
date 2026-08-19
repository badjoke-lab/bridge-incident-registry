# XRPL-TX Bridge August 2026 follow-up review

Status: review complete — canonical update direction approved, primary-source locator/preservation still blocks application  
Reviewed: 2026-08-20  
Issue: #279  
Canonical incident: `bir_inc_000038`  
Canonical bridge: `bir_bridge_000036`  
Canonical event: `bir_ev_000188`

## Baseline

Current canonical record remains:

```text
Bridges     38
Incidents   40
Events      193
Evidence    311
```

The August 9 XRPL-TX Bridge incident is currently represented from a pinned first-party relayer-code artifact plus contemporaneous secondary reporting. At the prior 2026-08-12 review boundary, BIR intentionally left the production root cause, recovery, reimbursement, and final operational outcome unresolved.

This review evaluates later incident-specific tx statements and ecosystem restoration statements discovered after that boundary. It does not mutate canonical JSON.

## Material new evidence

### tx incident update

A later tx first-party post is reproducibly indexed and quoted by multiple contemporaneous sources with the following incident-specific content:

- on August 9 the tx XRPL bridge was exploited and XRP was drained from the bridge reserve wallet on XRPL;
- the bridge was halted;
- tx identifies the flaw as **deposit-detection logic** that registered transactions which did not actually deliver XRP to the bridge as valid deposits;
- bridged XRP was minted on tx against those false deposits and the attacker then withdrew real XRP from the reserve;
- the impact was isolated to bridged XRP on tx, while other bridged assets remained fully backed;
- tx states that the affected code path was identified and remedied;
- stolen-fund movements were traced, an FBI IC3 complaint was filed, and forensics/security partners were engaged;
- tx was evaluating remedies for affected users;
- the bridge remained halted while security review continued.

This materially supersedes the current canonical statement that no first-party incident-specific root-cause authority had been located.

### tx restoration / make-whole commitment

A later tx first-party bridge-restoration statement is also reproducibly indexed through independent mirrors/retweets. tx states that:

- all affected users will be made whole;
- the Foundation will replenish missing XRP reserves in full;
- the objective is restoration of 1:1 backing for bridged XRP;
- the vulnerability has been identified and patched;
- reserve restoration will be verifiable on-chain.

Osmosis separately states that its halts remain in place until the reserve restoration is verifiable on-chain, and that the halt will be lifted only after that verification.

This supports an **announced operator-funded make-whole / reserve-backfill commitment**. It does **not** by itself prove that the reserve replenishment completed on-chain, that attacker funds were recovered, or that the bridge reopened.

## Source-locator boundary

The actual tx first-party post bodies are recoverable from current search-index mirrors and are quoted by contemporaneous reporting, but this review has **not yet resolved stable direct first-party locators** of the form:

```text
https://x.com/txEcosystem/status/<id>
```

for either:

1. the incident/root-cause update; or
2. the reserve-restoration / make-whole commitment.

Search also surfaces a truncated tx `x.com/i/article/2087…` link, but the exact article URL is not yet resolved.

BIR must not substitute a third-party mirror profile URL for the missing first-party X locator. Because `x.com` is an existing risky host, even a resolved direct locator still requires the normal preservation/source-quality review before admission if adding it would regress the permanent risky-host ceiling.

Therefore canonical application is blocked until the direct first-party locator and preservation boundary are resolved.

## Amount review

The current canonical amount is:

```text
199,916.3 XRP
```

from contemporaneous secondary on-chain reporting, described as 94 payments over 97 minutes.

Later reporting attributes a different figure to tx technical leadership:

```text
198,715.88 XRP
```

The difference is approximately 1,200.42 XRP. The reason for the discrepancy is not established in the currently admitted source set.

Do **not** silently overwrite the current amount. A canonical follow-up should preserve the discrepancy explicitly until a first-party incident locator or independently reproducible transaction package resolves whether the figures represent:

- different counting boundaries;
- gross reserve outflow versus attacker net receipt;
- excluded/intermediate transactions; or
- a correction.

Approved direction is to retain `amount_confidence` at no stronger than `medium` and add a `conflicting_claims` entry if both figures remain unresolved at application time.

No unsourced USD conversion should be introduced.

## Root-cause classification

The later first-party incident statement materially upgrades the root-cause boundary.

The described defect is a failure to validate whether an observed XRPL transaction actually delivered XRP to the bridge before recognizing it as a deposit and minting the corresponding bridged balance.

Approved registry category after first-party admission:

```text
attack_vector_category: message_verification_failure
```

This is preferable to inventing a new enum and is more precise than leaving the category `unknown` once the tx incident statement is admitted.

The existing pinned CoreumFoundation relayer source remains useful implementation context. It previously exposed a destination-validation-gap hypothesis, but the code artifact alone must not be presented as proof of the production exploit path. The later incident-specific tx statement is what upgrades the canonical root-cause claim.

Do not classify the incident as validator-key compromise merely because secondary reporting described 17-of-28 relayer signatures. The reviewed first-party account describes incorrect bridge deposit state, not stolen relayer keys.

## Recovery / reimbursement / reserve-restoration semantics

Keep attacker-fund recovery distinct from operator-funded restoration.

Approved status direction after primary admission:

```text
recovery_status       unknown
reimbursement_status  announced
restart_status        paused
current_outcome       paused_long_term
is_unresolved         true
```

Rationale:

- tx says stolen funds were traced, but the reviewed material does not establish a completed attacker-fund recovery amount;
- the Foundation's commitment to replenish the missing XRP reserve and make affected users whole is an announced make-whole/backfill action, not attacker-fund recovery;
- Osmosis explicitly says the halt remains until reserve restoration is verifiable on-chain;
- no reviewed statement yet proves completed 1:1 reserve restoration or a dated bridge reopening.

Do not use `full_recovery` unless attacker-fund recovery itself is established or the registry deliberately changes its recovery semantics in a separately reviewed schema decision.

Do not use `reimbursement_status: completed` until the reserve/backing restoration and affected-user make-whole state are independently verified as completed.

## Event direction after primary admission

The existing exploit event `bir_ev_000188` may be updated to reflect the now-first-party-supported root cause and halt, with exact source-count reconciliation.

A new bounded event is appropriate once the restoration statement is admitted:

```text
event_type            reimbursement_announced
title                 tx Foundation commits to restore XRPL bridge reserves and make affected users whole
reimbursement_status  announced
restart_status        paused
```

The event description should explicitly state that the commitment is Foundation-funded reserve replenishment / backing restoration and is not evidence of attacker-fund return.

Do not create:

- `funds_recovered`;
- `funds_returned`;
- `reimbursement_completed`;
- `bridge_reopened`;

without new completion evidence.

## Postmortem field

The tx incident update is an incident-specific first-party technical statement, but the current review has not resolved whether tx itself presents it as a formal postmortem/article versus a long-form social update.

Therefore do not automatically change:

```text
postmortem_available: not_found
```

to `available` merely because an incident statement exists. Resolve the exact direct post/article locator and publication form first. If the truncated `x.com/i/article/2087…` item is confirmed to be the formal incident article, reassess this field in the application review.

## Approved canonical update direction

After direct first-party locator/preservation clears, a fresh application from then-current `main` should:

1. re-check the current `bir_inc_000038` / `bir_ev_000188` source counts and IDs;
2. add the admitted tx incident-specific first-party source;
3. update the incident summary to replace the obsolete “no first-party incident postmortem/source located” boundary;
4. change `attack_vector_category` from `unknown` to `message_verification_failure` if the incident statement is admitted;
5. preserve the 199,916.3 versus 198,715.88 XRP discrepancy rather than silently choosing one;
6. keep `recovery_status` separate from operator-funded reserve restoration;
7. set `reimbursement_status` no stronger than `announced` until completion is verified;
8. keep restart `paused` while Osmosis/tx explicitly maintain the halt pending on-chain reserve verification;
9. add a bounded `reimbursement_announced` event for the make-whole / reserve-backfill commitment if the direct first-party source is admitted;
10. add any Osmosis first-party halt/restoration condition as independent ecosystem corroboration, provided its direct source locator is stable and admitted;
11. reconcile all incident/event `source_count` values exactly;
12. preserve permanent source-quality ceilings and production-equality gates.

## Permanent no-regression requirements

A canonical follow-up must not regress:

```text
Bridges without primary          0
Bridges without Tier 1           0
Incidents without primary        <= 1
Incidents without Tier 1         <= 1
Events without primary           <= 11
Events without Tier 1            <= 6
Terminal unarchived URLs         <= 15
Risky-host unarchived URLs       <= 16
Unknown URL status               0
Source-count mismatches          0
```

No source-quality ceiling, archive threshold, performance budget, enum gate, browser gate, or production verifier may be weakened to publish this follow-up.

## Next bounded action

This review is review-only. After merge:

1. resolve the exact direct tx incident-update status/article URL;
2. resolve the exact direct tx restoration/make-whole status URL;
3. resolve the direct Osmosis halt/restoration status URL if used;
4. run the normal risky-host archive-preservation review for any X URLs that would otherwise regress the accepted quality boundary;
5. if admissible primary evidence is obtained, open a fresh canonical application branch and run the full permanent release/production gates;
6. if direct locator/preservation still fails, leave #279 open as a reviewed follow-up blocked on primary-source admission rather than manufacturing canonical evidence from mirrors.