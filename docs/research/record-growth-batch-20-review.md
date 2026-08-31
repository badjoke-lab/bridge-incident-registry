# Record-growth Batch 20 review

Issue: #445

Review-only boundary for an incident-heavy historical growth batch. No canonical IDs are allocated in this document.

## objective

Current `main` baseline after Batch 19 is **72 bridges / 51 incidents / 246 events / 401 evidence**. Growth A therefore remains short by **28 bridges / 69 incidents / 254 events / 499 evidence**.

Batch 20 deliberately prioritizes missing incident depth and evidence depth. It must not become another single launch-only bridge batch.

## candidate scan — first 28 signals

The first pass combines the latest retained Batch 19 research queue with the automated bridge-incident watchlists. Discovery feeds are candidate generators only; they are not canonical evidence.

### already canonical / duplicate incident signals

1. Harmony Horizon Bridge — existing historical incident plus a newer 2026 signal; requires distinct-boundary review before any addition.
2. ChainConnect — 2026 Alien Proxy callback exploit already canonical (`bir_inc_000040`).
3. Taiko Bridge — June 2026 forged proof/state exploit already canonical (`bir_inc_000033`).
4. Syscoin UTXO–NEVM Bridge — June 2026 exploit already canonical (`bir_inc_000036`).
5. Allbridge Core — 2023 BNB Chain exploit and 2026 Solana pool exploit already canonical (`bir_inc_000014`, `bir_inc_000035`).
6. Verus-Ethereum Bridge — May and July 2026 import-verification incidents already canonical (`bir_inc_000042`, `bir_inc_000041`).
7. THORChain — existing canonical incident lineage; any 2026 discovery row must be checked against existing incidents before treatment as a new boundary.

### unresolved 2026 incident/entity signals — research required

8. Coreum Bridge — 2026-08-09 signal; Coreum/XRPL bridge identity and primary evidence unresolved.
9. Garden — 2026-07-26 signal; bridge-specific incident boundary and primary evidence unresolved.
10. AFX Bridge / AFX Trade — 2026-07-22 signal; custody/bridge entity boundary and primary evidence unresolved.
11. Wanchain Cardano–BNB bridge — 2026-07-21 signal; exact affected bridge route and first-party evidence unresolved.
12. Across — 2026-07-17 discovery signal; exact canonical bridge identity and incident boundary unresolved.
13. Namada Shielded Pools — 2026-06-19 discovery signal; determine whether this is a BIR bridge incident or a protocol-level event outside scope.
14. Secret Network — 2026-06-19 discovery signal; bridge-specific affected component unresolved.
15. Aztec Bridge — 2026-06-17 discovery signal; entity lineage and bridge-specific incident boundary unresolved.
16. Aztec Connect — 2026-06-14 discovery signal; distinguish historical Aztec Connect lineage from any bridge-only component.
17. Axelar Secret IBC Bridge — 2026-06-10 discovery signal; exact bridge/entity boundary and primary evidence unresolved.
18. Alephium Bridge — 2026-05-30 discovery signal; primary evidence and exact exploit boundary unresolved.
19. Gravity Bridge — 2026-05-30 discovery signal; primary evidence and validator/key-compromise boundary unresolved.
20. Stake DAO — 2026-05-27 discovery signal; bridge relevance is not yet established.
21. MAP Protocol — 2026-05-20 discovery signal; cross-chain component and primary evidence unresolved.
22. Echo Bridge — 2026-05-18 discovery signal; exact bridge identity and first-party evidence unresolved.
23. Adshares — 2026-05-16 discovery signal; bridge relevance/entity boundary unresolved.

### retained bridge-lifecycle candidates from Batch 19 — not incident additions yet

24. ShuttleFlow — launch/shutdown boundary is substantially pinned, but terminal archival evidence remains unsatisfied.
25. Scroll native bridge — exact bridge-first-public boundary remains insufficiently pinned.
26. Orion Bridge — Orion→Lumia migration/legacy boundary requires terminal-lifecycle treatment.
27. Layerswap / Polygon PoS-Portal research lane — historical first-public bridge boundary remains insufficiently pinned; treat these as separate entities during review rather than one candidate.
28. ZKsync Era official/default bridge — current identity is strong, historical first-public bridge boundary remains insufficiently pinned.

## early classification

### out_of_scope_or_duplicate

- ChainConnect 2026-07-26 — duplicate of `bir_inc_000040`.
- Taiko Bridge 2026-06-21 — duplicate of `bir_inc_000033`.
- Syscoin UTXO–NEVM Bridge 2026-06-07 — duplicate of `bir_inc_000036`.
- Allbridge Core 2026-07-19 — duplicate of `bir_inc_000035`; older 2023 incident also already canonical.
- Verus-Ethereum Bridge May/July 2026 — both incident boundaries already canonical as `bir_inc_000042` and `bir_inc_000041`.

### needs_research

Coreum Bridge, Garden, AFX Bridge/AFX Trade, Wanchain Cardano–BNB bridge, Across, Namada Shielded Pools, Secret Network, Aztec Bridge, Aztec Connect, Axelar Secret IBC Bridge, Alephium Bridge, Gravity Bridge, Stake DAO, MAP Protocol, Echo Bridge, Adshares, and the Harmony 2026 signal.

### pending_thin / lifecycle-only

ShuttleFlow, Scroll native bridge, Orion Bridge, Layerswap, Polygon PoS/Portal, and ZKsync Era official/default bridge remain lifecycle research lanes and do not satisfy Batch 20's incident-heavy objective by themselves.

### add_now

None are promoted to `add_now` from discovery material alone. `add_now` requires claim-relative primary/first-party review, duplicate/entity-boundary checks, and preferably at least two independent incident evidence records where available.

## next review tranche

Research the unresolved incident signals in evidence-readiness order, prioritizing candidates that can add an incident to an already established bridge entity without inventing a new entity boundary. The first tranche is:

1. Harmony Horizon 2026 signal — determine whether it is a genuinely distinct bridge incident from the canonical 2022 exploit.
2. Wanchain Cardano–BNB 2026 signal — determine exact affected route/component and first-party acknowledgement.
3. Gravity Bridge 2026 signal — locate first-party/security-team evidence and determine whether the bridge itself was compromised.
4. Alephium Bridge 2026 signal — establish bridge identity, exploit boundary, loss/recovery claims and first-party evidence.
5. Coreum Bridge 2026 signal — establish whether the event is a bridge incident and whether an existing bridge entity can be reused.
6. Axelar Secret IBC Bridge / Secret Network signals — determine whether these are duplicate descriptions of one cross-chain event or distinct incidents.
7. Across 2026 signal — resolve exact bridge identity before any incident work.
8. MAP Protocol 2026 signal — establish BIR-specific bridge impact.
9. Echo Bridge 2026 signal — establish entity and incident boundary.
10. AFX Bridge / AFX Trade 2026 signal — resolve custody-vs-bridge scope before canonicalization.

## guardrails

- No secondary-database row import into canonical data.
- No incident inferred from a bridge/protocol appearing in a discovery feed.
- Do not invent loss, recovery, reimbursement, restart, affected-route, or attack-vector facts.
- Distinguish upstream chain/protocol compromise from bridge-specific impact.
- Repeat canonical incident and bridge duplicate checks before ID allocation.
- Prefer primary/first-party sources; retain secondary technical sources only for claim-relative corroboration.
- Do not weaken source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality gates.
- Do not raise ceilings to fit growth.
