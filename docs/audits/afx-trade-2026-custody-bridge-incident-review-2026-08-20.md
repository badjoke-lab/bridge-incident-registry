# AFX Trade 2026 custody-bridge incident review

Status: review complete — bounded canonical shape approved, canonical application blocked pending admissible first-party preservation  
Reviewed: 2026-08-20  
Canonical data changed by this review: no

## Baseline

```text
Bridges     38
Incidents   40
Events      193
Evidence    311
```

No AFX Bridge / AFX Trade bridge entity or July 2026 incident currently exists in canonical BIR data.

This review evaluates the July 22, 2026 compromise of the AFX-operated custody bridge. It does not apply canonical JSON changes.

## Disposition

**Approve the incident boundary and a projected AFX Bridge entity for bounded canonical application, but do not apply canonical data until at least one incident-specific AFX first-party source satisfies the existing preservation/source-quality gate.**

The reviewed record supports the following boundaries:

- AFX's detailed first-party post-mortem identifies **2026-07-22** as the incident date and states that the AFX-operated custody bridge was compromised and assets under AFX custody were stolen.
- The first-party report explicitly says the attack was **not a smart-contract vulnerability**. It describes a software-supply-chain and infrastructure trust compromise that progressed from a developer workstation through internal delivery/operations infrastructure into a subset of AFX validator nodes.
- AFX states that affected validators co-signed the bridge-contract call and assets were transferred out of the AFX-operated custody bridge.
- AFX explicitly states that the Arbitrum network and native Arbitrum bridge were not compromised and that the incident was confined to infrastructure operated by AFX.
- AFX states that all bridge-related operations were suspended platform-wide, the affected validator cluster was isolated, validator quorum collapsed, and the bridge contract was frozen.
- AFX states that stolen funds were moving on-chain and recovery activity was ongoing. The reviewed first-party post-mortem does not establish a final recovered amount, completed reimbursement, or a dated bridge reopening.
- AFX's preliminary first-party incident article says a recovery plan for affected users was being finalized. That is evidence of an announced/planned user-recovery response, not evidence of completed reimbursement.
- Contemporaneous reporting and a reproducible Arbitrum transaction establish an approximately **24.15 million USDC** bridge withdrawal. The on-chain transaction quantity is the stable invariant; current explorer USD rendering must not be used as an incident-time valuation.

## Source review

| Ref | Source | Tier / role | Reviewed support | Admission plan |
|---|---|---|---|---|
| A | https://medium.com/@AFXTrade/a-detailed-post-mortem-on-the-afx-security-incident-57d564ef812f | Tier 1 / AFX first-party post-mortem | July 22 date; supply-chain/infrastructure attack path; validator compromise; AFX custody-bridge transfer; pause/freeze; Arbitrum/native-bridge exclusion; ongoing recovery | **blocked pending admissible archive capture or equivalent preserved first-party source** |
| B | https://medium.com/@AFXTrade/afx-bridge-incident-what-happened-what-we-learned-and-what-comes-next-d97387746012 | Tier 1 / AFX first-party preliminary report | custody-bridge compromise; no smart-contract exploit; supply-chain framing; affected-user recovery plan being finalized | **blocked pending admissible archive capture or equivalent preserved first-party source** |
| C | https://www.coindesk.com/tech/2026/07/23/arbitrum-based-afx-trade-drained-of-usd24-million-after-bridge-keys-compromised | Tier 2 / contemporaneous news | approximately 24.15M USDC; five hot-validator signatures meeting bridge quorum; native Arbitrum bridge not affected | admit as secondary amount/quorum corroboration if live at application time |
| D | https://arbiscan.io/tx/0x50d0b3ec6c3f5fce0f10abf81540bbb508f421494aa2b3480c4a264b0436547b | Tier 2 / reproducible on-chain transaction | successful July 22 transfer; 24,150,000 USDC movement from the bridge-contract path | admit as on-chain amount/transaction evidence |
| E | https://www.halborn.com/blog/post/explained-the-afxbridge-hack-july-2026 | Tier 2 / security-firm analysis | validator-signing/quorum mechanics and approximately 24.15M USDC technical corroboration | admit only as secondary technical corroboration if live at application time |

### Source URL correction

Issue #303 originally points to `https://afx.trade/blog/incident-postmortem-july-22-2026`. The reviewed first-party post-mortem actually located for this incident is the AFXTrade Medium publication above. The canonical application must not preserve the issue's unverified `afx.trade/blog/...` locator as if it were the first-party source.

## Preservation boundary

`medium.com` is an existing BIR risky host. The current permanent source-quality ceiling is:

```text
risky_host_unarchived unique URLs <= 16
```

That ceiling must not be raised merely to admit AFX's first-party report.

This is the same preservation principle used for the Wanchain July 2026 review: an incident-specific first-party Medium article may remain review authority without becoming canonical evidence until an exact, reproducible archive capture satisfies BIR's existing archive acceptance rules.

Therefore canonical application is blocked until one of the following is true:

1. the exact AFX first-party Medium URL has a reproducible archive capture accepted under the existing preservation gate; or
2. a stable, non-risky first-party AFX incident statement/post-mortem with equivalent claim support is located and admitted.

Secondary reporting and the Arbitrum transaction are sufficient to corroborate the loss/transaction boundary, but they must not be used to bypass the bridge-level primary-evidence requirement or consume a new avoidable incident-level primary gap.

## Approved canonical direction after preservation clears

IDs below are projections from the reviewed baseline and are not reserved. A canonical application must allocate IDs from fresh `main`.

### Projected bridge — `bir_bridge_000039`

Approved direction:

```text
slug                    afx-bridge
canonical_name          AFX Bridge
type                    asset_bridge
status                  paused
confidence              high
record_maturity         reviewed
update_status           current
major_incident_count    1
has_unresolved_incident true
```

Safe entity boundary:

AFX operated a USDC custody bridge associated with its Arbitrum-based trading infrastructure. The July 22 incident affected AFX-operated bridge/validator infrastructure; it must not be described as a compromise of Arbitrum or Arbitrum's native bridge.

Do not mark the bridge active solely because an AFX website, application, or documentation is reachable. The latest explicit incident-era first-party operational state in the reviewed set is suspended/frozen, followed by infrastructure remediation without a dated bridge-reopen statement.

### Chain / asset normalization

No new normalization keys are required for the bounded incident:

```text
chains   arbitrum, ethereum
asset    usdc
```

All three keys already exist in BIR reference data.

### Projected incident — `bir_inc_000041`

Approved direction after the preservation blocker clears:

```text
slug                       afx-bridge-2026-validator-infrastructure-compromise
title                      AFX Bridge 2026 validator infrastructure compromise
incident_date              2026-07-22
incident_date_precision    day
incident_type              exploit
is_major_incident          true
reported_loss_usd          24150000
reported_loss_usd_display  about $24.15 million
reported_loss_assets       [usdc]
loss_amount_basis          mixed_sources
amount_confidence          high
recovery_status            unknown
reimbursement_status       announced
restart_status             paused
current_outcome            unknown
is_unresolved              true
attack_vector_category     validator_key_compromise
postmortem_available       available
confidence                 high
record_maturity            reviewed
update_status              current
```

### Amount boundary

The exact token-denominated amount is the strongest stable quantity:

```text
24,150,000 USDC
```

The canonical USD display may use approximately USD 24.15 million because contemporaneous reporting describes the same stablecoin quantity at that scale. The application must not use a later explorer-rendered USD value as the incident-time valuation.

Approved amount-claim shape:

```text
amount_text        24,150,000 USDC
amount_usd_text    about $24.15 million
basis              mixed on-chain transaction and contemporaneous reporting
usd_valuation_date 2026-07-22
```

### Attack-vector boundary

Use the existing BIR category:

```text
validator_key_compromise
```

This is a registry-level category for the bridge authorization layer. It must not erase the deeper first-party root cause. Canonical summary/notes should preserve that AFX attributes the path to software-supply-chain and internal infrastructure compromise before validator compromise.

Do **not** classify this as:

- `smart_contract_bug`;
- an Arbitrum network exploit;
- an Arbitrum native-bridge exploit.

### Recovery and reimbursement

Keep:

```text
recovery_status       unknown
reimbursement_status  announced
```

Rationale:

- AFX says stolen funds were being tracked and response/recovery was ongoing, but the reviewed first-party post-mortem does not establish a completed recovered amount or percentage.
- AFX's preliminary first-party report states that a recovery plan for affected users was being finalized. That supports an announced response, not completed or in-progress reimbursement transfers.

If the application-time source review cannot preserve the affected-user recovery-plan statement under the first-party preservation gate, downgrade `reimbursement_status` to `unknown` rather than relying on secondary paraphrase.

### Restart and current outcome

Keep:

```text
restart_status    paused
current_outcome   unknown
is_unresolved     true
```

The first-party report documents suspension/freeze and extensive infrastructure rebuilding/hardening. Those measures are not a dated bridge-reopen statement.

A reachable product or website must not be treated as restart proof.

Approved unresolved reasons / known unknowns:

- final recovered attacker funds are not established in the admitted reviewed set;
- completion and mechanics of affected-user reimbursement are not established;
- a dated post-incident bridge reopening is not established;
- the five-validator / quorum detail is secondary unless independently admitted from first-party or reproducible contract evidence;
- the incident must remain scoped to AFX-operated bridge/validator infrastructure, not Arbitrum or Arbitrum's native bridge.

## Approved bounded timeline after preservation clears

Use only evidenced milestones:

1. **2026-07-22 exploit / asset-transfer event** — compromised AFX validator/infrastructure path co-signs the custody-bridge transfer;
2. **2026-07-22 bridge-pause event** — all bridge-related operations suspended and bridge contract frozen;
3. **2026-07-31 post-mortem event** — detailed first-party technical post-mortem published, only if the preserved primary source is admitted.

Do not create `funds_recovered`, `reimbursement_completed`, or `bridge_reopened` events without new evidence.

## Projected post-application counts

A bounded three-event / source package would approximately produce:

```text
Bridges     39
Incidents   41
Events      196
Evidence    316+
```

Counts are projections only. Exact event/evidence counts must be recomputed from the admitted application package and source-count equality must remain exact.

## Permanent no-regression requirements

Any future AFX canonical application must keep all permanent gates green, including:

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

No source-quality ceiling, performance budget, schema guard, production verifier, or preservation threshold may be relaxed for this candidate.

## Application boundary

This review is review-only. After it is merged:

1. run a bounded exact-URL archive-preservation review for the two AFX first-party Medium sources under the existing acceptance boundary;
2. if preservation succeeds, create a **fresh canonical application branch from then-current `main`**;
3. re-check duplicate/entity identity and every live URL immediately before application;
4. allocate fresh IDs from current main;
5. add only the bounded bridge, incident, events, and evidence that the admitted sources support;
6. preserve the supply-chain → infrastructure → validator-compromise distinction;
7. preserve the 24,150,000 USDC on-chain invariant and avoid a floating current explorer valuation;
8. keep recovery/reimbursement/restart unknown or announced only at the evidence-supported level;
9. pass schema, enum, full-corpus, exact source-count, source-quality, build, accessibility, performance, dist-consistency, browser, screenshot, and production-equality gates before closure.

If archive preservation fails and no equivalent non-risky first-party incident source is located, leave Issue #303 open as evidence-blocked. Do not canonicalize the candidate from secondary reporting alone.