from batch5_common import bridge

BRIDGES = [
    bridge(
        id="bir_bridge_000023", slug="ren-protocol", canonical_name="Ren Protocol",
        type="interoperability_protocol", status="deprecated",
        summary="Ren Protocol operated RenVM and RenBridge as cross-chain infrastructure for native assets including Bitcoin. The reviewed Ren 1.0 lineage ended after Alameda-related funding stopped in late 2022, while Ren 2.0 remained announced but not verified as a public mainnet successor.",
        aliases=["Ren", "RenVM", "RenBridge", "Ren 1.0"], launch_date="2020-05-27",
        launch_date_precision="day", end_date="2022-12", end_date_precision="month",
        terminal_reason="Ren 1.0 entered a planned sunset after Alameda-related funding ended; the reviewed current site still describes Ren 2.0 as coming soon.",
        official_url="https://renprotocol.org/", official_domain="renprotocol.org",
        official_url_status="live", archived_url="https://web.archive.org/web/*/https://renproject.io/",
        primary_chains=["bitcoin", "ethereum", "bnb-chain", "polygon", "avalanche", "solana", "unknown"],
        primary_assets=["renbtc", "btc", "unknown"], operator_name="Ren Foundation and Ren community",
        ecosystem_name="Ren", related_protocols=["RenVM", "RenBridge", "Ren 1.0", "Ren 2.0"],
        brand_history_notes="RenVM was the MPC network and RenBridge was an application using it. They remain context under the Ren Protocol entity rather than separate canonical bridge entities.",
        notes="No incident record is created for the 2022 sunset. Ren 2.0 is not linked as a successor because reviewed evidence does not establish a public mainnet launch."
    ),
    bridge(
        id="bir_bridge_000024", slug="avalanche-ethereum-bridge", canonical_name="Avalanche-Ethereum Bridge",
        type="canonical_bridge", status="migrated",
        summary="The Avalanche-Ethereum Bridge was Avalanche's first official Ethereum bridge. It launched in February 2021 and was replaced in July 2021 by the SGX-based Avalanche Bridge, followed by relayer shutdown and migration of bridged assets.",
        aliases=["AEB", "Avalanche Ethereum Bridge"], launch_date="2021-02-08", launch_date_precision="day",
        end_date="2021-07-29", end_date_precision="day",
        terminal_reason="Officially replaced by Avalanche Bridge on July 29, 2021; AEB transfers were subsequently disabled and legacy assets moved to an upgrade path.",
        official_url="https://aeb.xyz/", official_domain="aeb.xyz", official_url_status="dead",
        archived_url="https://web.archive.org/web/*/https://aeb.xyz/",
        primary_chains=["ethereum", "avalanche"], primary_assets=["weth", "usdc", "usdt", "dai", "wbtc"],
        operator_name="Ava Labs and AEB relayers", ecosystem_name="Avalanche",
        related_protocols=["ChainBridge", "Avalanche Bridge"],
        brand_history_notes="AEB used the earlier ChainBridge-style relayer architecture. The successor Avalanche Bridge is a separate canonical entity.",
        successor_id="bir_bridge_000025", replacement_bridge_id="bir_bridge_000025",
        notes="Residual support for upgrading deprecated AEB assets is legacy support and does not make AEB active."
    ),
    bridge(
        id="bir_bridge_000025", slug="avalanche-bridge", canonical_name="Avalanche Bridge",
        type="canonical_bridge", status="active",
        summary="Avalanche Bridge is the SGX and Bridge Node based official bridge connecting Ethereum and Avalanche C-Chain. It launched on July 29, 2021 as the explicit replacement for the Avalanche-Ethereum Bridge and remains supported through Core.",
        aliases=["AB", "Avalanche EVM Bridge", "Avalanche Core Bridge"], launch_date="2021-07-29",
        launch_date_precision="day", official_url="https://core.app/bridge/", official_domain="core.app",
        official_url_status="live", primary_chains=["ethereum", "avalanche"],
        primary_assets=["weth", "usdc", "usdt", "dai", "wbtc"], operator_name="Ava Labs and Bridge Node operators",
        ecosystem_name="Avalanche", related_protocols=["Core", "Avalanche Bridge Nodes"],
        brand_history_notes="Launched as the next-generation replacement for AEB with a distinct SGX and Bridge Node architecture.",
        predecessor_id="bir_bridge_000024",
        notes="Batch 5 establishes the predecessor relationship and current active status; it does not claim to provide a complete incident history for the current bridge."
    ),
    bridge(
        id="bir_bridge_000026", slug="shuttleflow", canonical_name="ShuttleFlow",
        type="interoperability_protocol", status="migrated",
        summary="ShuttleFlow was Conflux's cross-chain asset protocol and multi-chain bridge. Bridge operations ended in November 2023 with technology and service migration to Zero Gravity, while a limited claim path remained until the website and dApp closed in January 2024.",
        aliases=["Conflux ShuttleFlow"], launch_date="2020", launch_date_precision="year",
        end_date="2024-01-06", end_date_precision="day",
        terminal_reason="Bridge operations migrated to Zero Gravity in November 2023, followed by a claim-only period and final ShuttleFlow website and dApp shutdown in January 2024.",
        official_url="https://shuttleflow.io/", official_domain="shuttleflow.io", official_url_status="dead",
        archived_url="https://web.archive.org/web/*/https://shuttleflow.io/",
        primary_chains=["conflux-core-space", "conflux-espace", "ethereum", "bnb-chain", "unknown"],
        primary_assets=["cfx", "eth", "usdt", "unknown"], operator_name="Conflux Foundation and ecosystem partners",
        ecosystem_name="Conflux", related_protocols=["Zero Gravity Portal", "KinetFlow"],
        brand_history_notes="Official closure material described a technology and operational handoff to Zero Gravity. KinetFlow later replaced Zero Gravity Portal using technology from both services.",
        notes="No successor_id is set because Zero Gravity is not a reviewed canonical entity in this batch."
    ),
]
