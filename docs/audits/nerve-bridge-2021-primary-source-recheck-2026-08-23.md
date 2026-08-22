# Nerve Bridge 2021 primary-source recheck

Status: review complete — incident-specific first-party gap remains unresolved  
Reviewed: 2026-08-23  
Issue: #299  
Canonical incident: `bir_inc_000026`  
Canonical bridge: `bir_bridge_000020`

## Purpose

Re-run the Phase 3 research target in Issue #299 without weakening BIR source semantics or manufacturing a primary source merely to improve the metric.

## Recheck performed

The review rechecked current public results for:

- NerveNetwork / Nerve official site and documentation;
- the official `NerveNetwork/nerve` GitHub repository;
- incident-specific searches for the November 15, 2021 Nerve Bridge / MetaPool attack;
- BlockSec and SlowMist incident references;
- combinations of `Nerve Bridge`, `900 BNB`, `fUSDT`, `UST`, `MetaPool`, `November 2021`, `security incident`, `postmortem`, and `official`.

## What remains supported

The existing independent technical boundary remains strong:

- BlockSec dates the attack to November 15, 2021;
- it identifies the affected Nerve Bridge fUSDT and UST MetaPools on BSC;
- it reports approximately 900 BNB attacker profit;
- it attributes the vulnerability to inconsistent exchange-amount calculation logic in forked Saddle-style pool code.

SlowMist independently lists a November 15, 2021 Nerve cross-chain bridge MetaPool incident and approximately 900 BNB loss/profit scale.

These are independent security sources, not Nerve first-party incident authority.

## First-party result

Current official NerveNetwork material confirms NerveNetwork as a cross-chain asset interaction network and continues to expose official project documentation and repositories, but this bounded recheck did **not** locate an incident-specific first-party Nerve announcement, postmortem, security advisory, governance notice, archived official social statement, or patch/release note that can be tied safely to the November 15, 2021 event.

The public `NerveNetwork/nerve` repository is an official implementation repository, but locating the repository itself is not incident-specific evidence. No commit identified in this recheck was promoted as a remediation commit because no reviewed first-party statement tied a specific code change to the November 2021 attack.

## Important historical clue

BlockSec's November 18, 2021 analysis explicitly stated that it could not find a public report analyzing the incident at the time. That historical observation is consistent with the present difficulty of locating a surviving Nerve first-party postmortem, but it is not proof that no first-party notice ever existed.

## Canonical consequence

No canonical mutation is authorized from this review alone.

Keep the current source-quality semantics:

- BlockSec remains Tier 2 / non-primary;
- Halborn remains Tier 2 / non-primary;
- generic NerveNetwork official architecture/current-status material must not be attached to the incident merely to satisfy a primary-source metric;
- do not mark an unverified historical repository commit as incident remediation without a safe incident-specific linkage.

## Remaining research targets

1. archived NerveNetwork Twitter/X, Telegram, Medium, forum, or website notices from November 15–30, 2021;
2. a first-party patch/release whose issue/commit/release text explicitly references the affected MetaPool vulnerability or November 2021 incident;
3. reproducible attack transactions and affected contract addresses as independent on-chain evidence;
4. first-party recovery, pause/restart, reimbursement, or migration statements tied to this incident.

## Disposition

Issue #299 remains open as a genuine primary-source research gap. The incident remains publishable on its existing reviewed Tier 2 technical evidence; the gap must not be closed by relabeling secondary evidence or generic official documentation.

Canonical JSON delta: 0.
