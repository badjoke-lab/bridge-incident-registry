from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def replace_once(path, old, new):
    text = path.read_text()
    if new in text:
        return
    if old not in text:
        raise RuntimeError(f"Expected text not found in {path}")
    path.write_text(text.replace(old, new, 1))


counts_old = "Bridges     22\nIncidents   27\nEvents      103\nEvidence    125"
counts_new = "Bridges     26\nIncidents   27\nEvents      123\nEvidence    148"

readme = ROOT / "README.md"
replace_once(readme, "Four reviewed expansion batches", "Five reviewed expansion batches")
replace_once(readme, counts_old, counts_new)
replace_once(
    readme,
    "Batch 4 added NerveNetwork, historical Holograph Protocol, and the Inter-Blockchain Communication Protocol.",
    "Batch 4 added NerveNetwork, historical Holograph Protocol, and the Inter-Blockchain Communication Protocol. Batch 5 added Ren Protocol, Avalanche-Ethereum Bridge, Avalanche Bridge, and ShuttleFlow.",
)

changelog = ROOT / "CHANGELOG.md"
replace_once(
    changelog,
    "- NerveNetwork, Mantle, Cosmos interchain, fUSDT, UST, and HLG reference definitions\n",
    "- NerveNetwork, Mantle, Cosmos interchain, fUSDT, UST, and HLG reference definitions\n- Phase 2 Batch 5 records for Ren Protocol, Avalanche-Ethereum Bridge, Avalanche Bridge, and ShuttleFlow\n- Twenty Batch 5 lifecycle and migration events\n- Conflux Core Space, Conflux eSpace, renBTC, and CFX reference definitions\n",
)
replace_once(
    changelog,
    "- Dragonberry and Huckleberry modeled as security-response events rather than exploited-fund incident records\n",
    "- Dragonberry and Huckleberry modeled as security-response events rather than exploited-fund incident records\n- RenVM and RenBridge retained as context under the Ren Protocol canonical entity\n- Ren 2.0 not asserted as a launched successor without operational mainnet evidence\n- Avalanche-Ethereum Bridge and Avalanche Bridge separated as predecessor and successor entities\n- Legacy AEB asset-upgrade support separated from active bridge operation\n- ShuttleFlow bridge shutdown separated from the later claim-interface shutdown\n- Zero Gravity retained as successor context without a canonical successor ID\n",
)
replace_once(changelog, counts_old, counts_new)

status = ROOT / "docs/runbooks/current-status.md"
replace_once(status, "Four reviewed record-expansion batches", "Five reviewed record-expansion batches")
replace_once(status, "Phase 2 Batch 4 is complete in PR #45.", "Phase 2 Batch 5 canonical implementation is complete on the current branch.")
replace_once(status, counts_old, counts_new)

section = """### Phase 2 Batch 5

Added records:

- Ren Protocol / RenVM / RenBridge
- Avalanche-Ethereum Bridge / AEB
- Avalanche Bridge
- ShuttleFlow

Added:

```text
Bridges     +4
Incidents   +0
Events      +20
Evidence    +23
```

Reference additions:

- Conflux Core Space
- Conflux eSpace
- renBTC
- CFX

Key decisions:

- Ren Protocol is canonical; RenVM and RenBridge remain context.
- Ren 2.0 is not treated as a launched successor without public mainnet evidence.
- Ren 1.0 ending is an event-only timeline.
- AEB and Avalanche Bridge are separate predecessor and successor entities.
- legacy AEB token upgrades do not make AEB active.
- ShuttleFlow bridge operations ended before its residual claim interface closed.
- Zero Gravity remains successor context without a canonical relationship ID.

"""
marker = "## Current architecture decision\n"
text = status.read_text()
if "### Phase 2 Batch 5\n" not in text:
    status.write_text(text.replace(marker, section + marker, 1))
replace_once(
    status,
    "         Batch 5                                   next\n         Batch 6                                   planned",
    "         Batch 5                                   complete\n         Batch 6                                   next",
)
replace_once(
    status,
    "Phase 2 Batch 5:\n\n1. select dead, deprecated, migrated, or functionally replaced bridge infrastructure\n2. verify terminal-state and successor boundaries\n3. collect primary and strong secondary evidence\n4. model bridge, incident, event, and evidence records\n5. validate through the standard CI path\n6. review and merge",
    "Phase 2 Batch 6 scope:\n\n1. select interface, router, approval, and aggregator candidates\n2. distinguish underlying bridge events from interface-path events\n3. fix entity and incident boundaries in a docs-only scope pull request\n4. define evidence and completion gates before canonical implementation",
)

note = ROOT / "docs/batches/phase2-batch-05-implementation-note.md"
note.write_text("""# Phase 2 Batch 5 Implementation Note

## Result

```text
Bridges     22 -> 26
Incidents   27 -> 27
Events      103 -> 123
Evidence    125 -> 148
```

## Added entities

- Ren Protocol
- Avalanche-Ethereum Bridge
- Avalanche Bridge
- ShuttleFlow

## Record shape

Batch 5 adds twenty lifecycle events and twenty-three evidence records without creating an incident case. It covers launch, product development, planned successors, shutdown, replacement, migration, legacy support, claim-only operation, and current-state verification.

## Boundary results

- Ren Protocol is canonical; RenVM and RenBridge remain context.
- Ren 2.0 remains a planned successor, not a verified public mainnet entity.
- AEB is `migrated` and points to the active Avalanche Bridge successor.
- residual AEB asset upgrades remain legacy support.
- ShuttleFlow is `migrated`; its bridge end and later interface end remain separate.
- Zero Gravity is retained as lineage context without a canonical successor ID.

## Validation

The branch must pass the standard project checks. Batch helper files are removed before final review and merge.
""")
