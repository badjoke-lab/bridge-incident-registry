import fs from "node:fs";

const read = (name) => JSON.parse(fs.readFileSync(`data/${name}.json`, "utf8"));
const writeArray = (name, records) => fs.writeFileSync(`data/${name}.json`, `[\n${records.map((r) => `  ${JSON.stringify(r)}`).join(",\n")}\n]\n`);
const writeObject = (path, value) => fs.writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);

const bridges = read("bridges");
const incidents = read("incidents");
const events = read("events");
const evidence = read("evidence");
const chains = JSON.parse(fs.readFileSync("data/reference/chains.json", "utf8"));
const assets = JSON.parse(fs.readFileSync("data/reference/assets.json", "utf8"));

if (bridges.some((record) => record.id === "bir_bridge_000020")) {
  console.log("Phase 2 Batch 4 already applied.");
  process.exit(0);
}

chains["nerve-network"] = { display_name: "NerveNetwork", aliases: ["Nerve", "NERVE"] };
chains.mantle = { display_name: "Mantle", aliases: ["Mantle Network"] };
chains["cosmos-interchain"] = { display_name: "Cosmos interchain", aliases: ["IBC-connected Cosmos chains", "Interchain"] };
assets.fusdt = { display_name: "fUSDT", aliases: ["Nerve fUSDT"] };
assets.ust = { display_name: "UST", aliases: ["TerraUSD", "USTC"] };
assets.hlg = { display_name: "HLG", aliases: ["Holograph Token"] };

bridges.push(
  {
    id: "bir_bridge_000020", slug: "nerve-network", previous_slugs: [], redirect_from: ["nerve-bridge", "nervenetwork"], canonical_name: "NerveNetwork", type: "interoperability_protocol", status: "active",
    summary: "NerveNetwork is a heterogeneous-chain interoperability network whose Nerve Bridge and swap-pool infrastructure connects assets across multiple chains. It is included because a November 2021 metapool exploit drained the fUSDT and UST pool liquidity on BNB Chain and yielded approximately 900 BNB to the attacker.",
    confidence: "medium", record_maturity: "reviewed", update_status: "current", last_reviewed_at: "2026-06-16", last_verified_at: "2026-06-16",
    aliases: ["Nerve Bridge", "NERVE", "NerveNetwork Bridge"], launch_date: null, launch_date_precision: "unknown", end_date: null, end_date_precision: "unknown", terminal_reason: null,
    official_url: "https://nerve.network/", official_domain: "nerve.network", official_url_status: "live", archived_url: null,
    primary_chains: ["nerve-network", "bnb-chain", "ethereum", "unknown"], primary_assets: ["fusdt", "ust", "bnb", "unknown"],
    operator_name: "NerveNetwork", operator_type: "protocol ecosystem", ecosystem_name: "NerveNetwork", related_protocols: ["Nerve Bridge", "NerveSwap", "NULS"],
    brand_history_notes: "The canonical entity is NerveNetwork; Nerve Bridge is treated as its bridge application. It remains separate from Synapse Protocol despite historical naming overlap and shared vulnerable metapool code lineage.",
    major_incident_count: 1, has_unresolved_incident: true, has_reimbursement_history: false, successor_id: null, predecessor_id: null, replacement_bridge_id: null, duplicate_of: null, merged_into: null,
    notes: "No stable official postmortem or final reimbursement statement was located for the November 2021 event. Root-cause and amount claims therefore rely primarily on independent security analysis."
  },
  {
    id: "bir_bridge_000021", slug: "holograph-protocol", previous_slugs: [], redirect_from: ["holograph", "holograph-omnichain"], canonical_name: "Holograph Protocol", type: "interoperability_protocol", status: "inactive",
    summary: "Holograph Protocol operated as an omnichain tokenization protocol intended to preserve token identity across EVM chains. It is included because an attacker abused the Holograph Operator contract in June 2024 to mint one billion unauthorized HLG tokens, prompting a protocol lock, exchange-account freezes, a burn plan, and an investigation involving Halborn and law enforcement.",
    confidence: "medium", record_maturity: "reviewed", update_status: "current", last_reviewed_at: "2026-06-16", last_verified_at: "2026-06-16",
    aliases: ["Holograph", "Holograph Omnichain Protocol"], launch_date: null, launch_date_precision: "unknown", end_date: null, end_date_precision: "unknown", terminal_reason: null,
    official_url: "https://www.holograph.xyz/", official_domain: "holograph.xyz", official_url_status: "live", archived_url: "https://web.archive.org/web/*/https://www.holograph.xyz/",
    primary_chains: ["ethereum", "mantle", "unknown"], primary_assets: ["hlg", "unknown"], operator_name: "Holograph", operator_type: "protocol ecosystem", ecosystem_name: "Holograph",
    related_protocols: ["Holograph Operator", "Holograph Protocol v1"],
    brand_history_notes: "In 2024 the domain described an omnichain tokenization protocol. At the 2026 review, the same domain described an onchain creator-coin trading terminal and no longer documented the historical cross-chain protocol. This record therefore treats the historical interoperability product as inactive without asserting a legally or technically continuous successor relationship.",
    major_incident_count: 1, has_unresolved_incident: true, has_reimbursement_history: false, successor_id: null, predecessor_id: null, replacement_bridge_id: null, duplicate_of: null, merged_into: null,
    notes: "The one-billion-HLG unauthorized mint is not automatically treated as a one-billion-token realized loss. Minted, sold, frozen, and burned quantities remain distinct, and completion of the announced burn plan is unresolved."
  },
  {
    id: "bir_bridge_000022", slug: "ibc-protocol", previous_slugs: [], redirect_from: ["inter-blockchain-communication", "ibc-go", "cosmos-ibc"], canonical_name: "Inter-Blockchain Communication Protocol", type: "cross_chain_messaging", status: "active",
    summary: "The Inter-Blockchain Communication Protocol (IBC) is an open-source, permissionless interoperability protocol for transferring tokens, messages, and arbitrary application data between sovereign blockchains. It is included because the Dragonberry and Huckleberry disclosures required coordinated security responses across IBC-connected infrastructure, while official accounts report no exploitation or user-fund loss from those vulnerabilities.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", last_reviewed_at: "2026-06-16", last_verified_at: "2026-06-16",
    aliases: ["IBC", "IBC Protocol", "ibc-go", "Cosmos IBC"], launch_date: "2021-03-29", launch_date_precision: "day", end_date: null, end_date_precision: "unknown", terminal_reason: null,
    official_url: "https://ibcprotocol.dev/", official_domain: "ibcprotocol.dev", official_url_status: "live", archived_url: null,
    primary_chains: ["cosmos-interchain", "unknown"], primary_assets: ["unknown"], operator_name: "IBC open-source community", operator_type: "open-source protocol community", ecosystem_name: "Interchain",
    related_protocols: ["ibc-go", "ICS-20", "ICS-23", "IBC Classic", "IBC v2"],
    brand_history_notes: "IBC Classic was first deployed in March 2021. ibc-go is the principal Go implementation and is modeled as implementation context under the protocol entity rather than as a separate bridge entity.",
    major_incident_count: 0, has_unresolved_incident: false, has_reimbursement_history: false, successor_id: null, predecessor_id: null, replacement_bridge_id: null, duplicate_of: null, merged_into: null,
    notes: "Dragonberry and Huckleberry are modeled as security-response events rather than exploit incidents because official sources describe vulnerability discovery, coordinated patching, and no known loss."
  }
);

incidents.push(
  {
    id: "bir_inc_000026", bridge_id: "bir_bridge_000020", slug: "nerve-bridge-2021-metapool-exploit", previous_slugs: [], redirect_from: [], title: "Nerve Bridge 2021 metapool exploit",
    incident_date: "2021-11-15", incident_date_precision: "day", incident_type: "metapool_exploit",
    summary: "An attacker exploited an inconsistent exchange-amount calculation in Saddle-derived metapool code used by Nerve Bridge. BlockSec reported that the fUSDT and UST pools were drained and that the attacker gained approximately 900 BNB.",
    confidence: "medium", record_maturity: "reviewed", update_status: "current", source_count: 2, last_reviewed_at: "2026-06-16", last_verified_at: "2026-06-16", is_major_incident: true,
    reported_loss_usd_display: "Approximately 900 BNB attacker profit", reported_loss_usd: null, reported_loss_usd_min: null, reported_loss_usd_max: null,
    reported_loss_text: "BlockSec reported that the attacker exhausted the affected fUSDT and UST pool liquidity and gained approximately 900 BNB.", reported_loss_assets: ["bnb", "fusdt", "ust"], usd_valuation_date: null,
    loss_amount_basis: "independent BlockSec technical analysis", amount_confidence: "medium", amount_note: "The canonical amount remains denominated in BNB because no reviewed official incident statement supplied a fixed fiat loss value.",
    amount_claims: [{ amount_text: "approximately 900 BNB attacker profit", amount_usd_text: null, source_id: "bir_src_000108", basis: "BlockSec technical analysis", usd_valuation_date: null, notes: "Attacker profit and exhausted pool liquidity are not assumed to be identical accounting measures." }],
    recovery_status: "unknown", reimbursement_status: "unknown", restart_status: "unknown", current_outcome: "protocol_active_after_incident", is_unresolved: true,
    unresolved_reason: ["A stable official postmortem, reimbursement statement, and final pool-restoration outcome were not located in the reviewed sources."],
    affected_chains: ["bnb-chain", "nerve-network"], affected_assets: ["fusdt", "ust", "bnb"], attack_vector_category: "metapool_exchange_amount_calculation_bug", postmortem_available: "none",
    known_unknowns: ["The exact user-loss allocation and final reimbursement outcome remain unverified.", "The exact restart date for the affected pools was not established."], conflicting_claims: [], duplicate_of: null, merged_into: null, split_from: null, split_reason: null
  },
  {
    id: "bir_inc_000027", bridge_id: "bir_bridge_000021", slug: "holograph-2024-unauthorized-hlg-mint", previous_slugs: [], redirect_from: [], title: "Holograph 2024 unauthorized HLG mint",
    incident_date: "2024-06-13", incident_date_precision: "day", incident_type: "unauthorized_token_mint",
    summary: "A malicious actor exploited the Holograph Operator contract and minted one billion additional HLG tokens on Mantle. The team patched the initial exploit, temporarily locked the protocol, coordinated account freezes, and announced a staged burn plan and external investigation.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", source_count: 5, last_reviewed_at: "2026-06-16", last_verified_at: "2026-06-16", is_major_incident: true,
    reported_loss_usd_display: "1 billion HLG unauthorized mint; realized loss not fixed", reported_loss_usd: null, reported_loss_usd_min: null, reported_loss_usd_max: null,
    reported_loss_text: "The incident created one billion unauthorized HLG. Contemporary fiat valuations varied with the rapidly falling token price and do not establish a single realized protocol or user loss.", reported_loss_assets: ["hlg"], usd_valuation_date: null,
    loss_amount_basis: "official incident statement quoted by contemporaneous reporting", amount_confidence: "high", amount_note: "Unauthorized supply, tokens sold, tokens frozen, and tokens burned are separate quantities.",
    amount_claims: [{ amount_text: "1 billion unauthorized HLG minted", amount_usd_text: "approximately $14.4 million at the pre-collapse quoted price in some reporting", source_id: "bir_src_000113", basis: "contemporaneous reporting quoting Holograph and market data", usd_valuation_date: "2024-06-13", notes: "The fiat figure is not used as canonical realized loss." }],
    recovery_status: "partial_freeze_and_burn_plan", reimbursement_status: "not_announced", restart_status: "protocol_locked_then_partial_reopen", current_outcome: "historical_protocol_inactive", is_unresolved: true,
    unresolved_reason: ["Completion of the announced one-billion-HLG burn plan was not established.", "The final quantity sold, frozen, recovered, or permanently removed remains unresolved in the reviewed evidence."],
    affected_chains: ["mantle", "ethereum", "unknown"], affected_assets: ["hlg"], attack_vector_category: "privileged_operator_contract_access", postmortem_available: "partial",
    known_unknowns: ["The final Halborn report URL was not located in stable official documentation.", "The relationship between the historical omnichain protocol and the current same-domain trading terminal is not established as a canonical successor."], conflicting_claims: [], duplicate_of: null, merged_into: null, split_from: null, split_reason: null
  }
);

const event = (id, bridge_id, incident_id, event_type, event_date, precision, title, description, impact_level, status_effect, source_count, sort_order, amount_text, recovered_amount_text, reimbursement_status, restart_status, affected_chains, affected_assets, notes = null) => ({ id, bridge_id, incident_id, event_type, event_date, event_date_precision: precision, title, description, confidence: "high", record_maturity: "reviewed", update_status: "current", impact_level, status_effect, source_count, sort_order, amount_text, recovered_amount_text, reimbursement_status, restart_status, affected_chains, affected_assets, notes, duplicate_of: null, merged_into: null });

events.push(
  event("bir_ev_000087", "bir_bridge_000020", "bir_inc_000026", "metapool_exploit", "2021-11-15", "day", "Nerve Bridge metapools exploited", "An attacker exploited the fUSDT and UST metapools on BNB Chain, exhausted their liquidity, and gained approximately 900 BNB according to BlockSec.", "major", "affected pools drained", 2, 10, "approximately 900 BNB attacker profit", null, "unknown", "unknown", ["bnb-chain", "nerve-network"], ["fusdt", "ust", "bnb"]),
  event("bir_ev_000088", "bir_bridge_000020", "bir_inc_000026", "root_cause_analysis_published", "2021-11-18", "day", "BlockSec published Nerve Bridge root-cause analysis", "BlockSec attributed the incident to an inconsistent exchange-amount calculation in a Saddle-derived metapool implementation and compared it with the earlier Synapse vulnerability.", "major", "root cause documented", 2, 20, null, null, "unknown", "unknown", ["bnb-chain"], ["fusdt", "ust", "bnb"]),
  event("bir_ev_000089", "bir_bridge_000020", null, "current_operation_verified", "2026-06-16", "day", "NerveNetwork remained operational", "The official NerveNetwork website and documentation continued to describe active cross-chain bridge and interoperability services.", "context", "active operation verified", 2, 30, null, null, "not_applicable", "not_applicable", ["nerve-network", "bnb-chain", "ethereum", "unknown"], ["unknown"]),

  event("bir_ev_000090", "bir_bridge_000021", "bir_inc_000027", "unauthorized_token_mint", "2024-06-13", "day", "Holograph Operator contract exploited", "A malicious actor used the Holograph Operator contract to mint one billion additional HLG. Holograph said it patched the initial exploit and began coordinating with exchanges and law enforcement.", "major", "protocol security incident", 2, 10, "1 billion HLG minted", null, "not_announced", "paused", ["mantle", "ethereum"], ["hlg"]),
  event("bir_ev_000091", "bir_bridge_000021", "bir_inc_000027", "protocol_lock_and_account_freezes", "2024-06-15", "day", "Protocol locked and part of unauthorized supply frozen", "Incident updates reported that the protocol was temporarily locked and that at least part of the unauthorized HLG supply was frozen through exchange coordination.", "major", "protocol temporarily locked", 2, 20, "at least 200 million HLG reported frozen in later recovery materials", "part of unauthorized supply frozen", "not_announced", "paused", ["mantle", "ethereum", "unknown"], ["hlg"], "The exact frozen quantity and custody status require later verification."),
  event("bir_ev_000092", "bir_bridge_000021", "bir_inc_000027", "burn_plan_started", "2024-06-19", "day", "Holograph announced staged HLG burn plan", "Holograph announced a plan to remove one billion HLG through frozen exchange balances, treasury tokens, and open-market purchases; the first tranche burned approximately 53 million HLG.", "major", "supply-restoration plan started", 1, 30, "1 billion HLG planned for burn", "approximately 53 million HLG burned in first phase", "not_announced", "partial_reopen", ["ethereum", "mantle", "unknown"], ["hlg"]),
  event("bir_ev_000093", "bir_bridge_000021", "bir_inc_000027", "investigation_update", "2024-07-02", "day", "Investigation attributed incident to former contractor", "Reporting on Holograph's investigation with Halborn said a former contractor had retained or created privileged access used to mint the unauthorized supply.", "major", "suspected insider path documented", 1, 40, null, null, "not_announced", "partial_reopen", ["mantle", "ethereum"], ["hlg"], "The reviewed source is secondary reporting on the investigation."),
  event("bir_ev_000094", "bir_bridge_000021", null, "historical_domain_repurposed", "2026-06-16", "day", "Holograph domain no longer documented the omnichain protocol", "At review, holograph.xyz described an onchain creator-coin trading terminal rather than the 2024 omnichain tokenization protocol. The historical interoperability product is therefore treated as inactive pending stronger successor evidence.", "major", "historical protocol inactive", 1, 50, null, null, "not_applicable", "not_applicable", ["ethereum", "mantle", "unknown"], ["hlg", "unknown"]),

  event("bir_ev_000095", "bir_bridge_000022", null, "protocol_launched", "2021-03-29", "day", "Inaugural IBC connection created", "The inaugural IBC connection was created between Cosmos Hub and IRISnet, beginning production use of the protocol.", "context", "protocol launched", 2, 10, null, null, "not_applicable", "not_applicable", ["cosmos-interchain"], ["unknown"]),
  event("bir_ev_000096", "bir_bridge_000022", null, "first_token_transfer", "2021-04-02", "day", "First IBC token transfer completed", "The first IBC token transfer was sent between IRISnet and Cosmos Hub.", "context", "production transfer verified", 2, 20, null, null, "not_applicable", "not_applicable", ["cosmos-interchain"], ["unknown"]),
  event("bir_ev_000097", "bir_bridge_000022", null, "critical_vulnerability_discovered", "2022-10-09", "day", "Dragonberry vulnerability discovered", "Engineers discovered that forged absence proofs could enable forged IBC timeouts and potentially escalate to ICS-20 double-spends against escrow accounts.", "major", "critical vulnerability under coordinated response", 2, 30, "No known user-fund loss", null, "not_applicable", "not_interrupted", ["cosmos-interchain"], ["unknown"], "Official retrospective states that vulnerability discovery was not itself an exploitation incident."),
  event("bir_ev_000098", "bir_bridge_000022", null, "emergency_private_patch_coordination", "2022-10-10", "day", "Dragonberry private patch coordination began", "Core teams coordinated confidentially with validators and chain teams. A network became resistant to undetected exploitation once more than one-third of voting power had patched.", "major", "ecosystem-wide mitigation underway", 2, 40, null, null, "not_applicable", "not_interrupted", ["cosmos-interchain"], ["unknown"]),
  event("bir_ev_000099", "bir_bridge_000022", null, "public_security_patch_released", "2022-10-14", "day", "Public Dragonberry and Elderflower patches released", "Cosmos SDK and ibc-go patch releases were published for supported release lines, and chains were urged to upgrade immediately.", "major", "public remediation available", 3, 50, "No known user-fund loss", null, "not_applicable", "not_interrupted", ["cosmos-interchain"], ["unknown"]),
  event("bir_ev_000100", "bir_bridge_000022", null, "security_retrospective_published", "2022-12-16", "day", "Dragonberry retrospective confirmed no funds lost", "The official retrospective explained the forged-timeout risk, patch thresholds, and coordination process, and stated that no funds were lost from Dragonberry or the accompanying Elderflower issue.", "major", "response documented and resolved", 1, 60, "No funds lost", null, "not_applicable", "not_interrupted", ["cosmos-interchain"], ["unknown"]),
  event("bir_ev_000101", "bir_bridge_000022", null, "security_advisory_published", "2023-05-24", "day", "Huckleberry full-node vulnerability disclosed", "The ibc-go team disclosed a vulnerability affecting all versions of ibc-go. It was generally low severity but could become high or critical depending on full-node architecture.", "major", "patching requested", 1, 70, "No known exploitation or loss reported", null, "not_applicable", "not_interrupted", ["cosmos-interchain"], ["unknown"]),
  event("bir_ev_000102", "bir_bridge_000022", null, "security_patch_released", "2023-05-25", "day", "Huckleberry patches released across supported ibc-go lines", "Patch releases were issued for supported v4, v5, v6, and v7 ibc-go lines, with corrected v4 builds published after an initial release mistake.", "major", "vulnerability remediated through supported releases", 2, 80, null, null, "not_applicable", "not_interrupted", ["cosmos-interchain"], ["unknown"]),
  event("bir_ev_000103", "bir_bridge_000022", null, "current_operation_verified", "2026-06-16", "day", "IBC remained active with supported v10 and v11 release lines", "The official IBC site remained active, and the ibc-go repository listed supported v10 and v11 release lines with a May 2026 v11.1.0 release.", "context", "active development verified", 2, 90, null, null, "not_applicable", "not_applicable", ["cosmos-interchain", "unknown"], ["unknown"])
);

const src = (id, bridge_id, incident_id, event_id, source_type, title, url, publisher, published_at, precision, reliability, tier, claim_scope, is_primary, supports = {}, notes = null, url_status = "live", archived_url = null) => ({
  id, bridge_id, incident_id, event_id, source_type, title, url, publisher, published_at, published_at_precision: precision, reliability, source_tier: tier, url_status, archived_url, accessed_at: "2026-06-16", claim_scope, language: "en", author: null, quote_excerpt: null, is_primary, is_paywalled: false, is_official_domain: is_primary && !url.includes("x.com") && !url.includes("twitter.com"),
  supports_amount: Boolean(supports.amount), supports_recovery: Boolean(supports.recovery), supports_reimbursement: Boolean(supports.reimbursement), supports_reopen: Boolean(supports.reopen), supports_shutdown: Boolean(supports.shutdown), supports_migration: Boolean(supports.migration), notes
});

evidence.push(
  src("bir_src_000108", "bir_bridge_000020", "bir_inc_000026", "bir_ev_000087", "security_analysis", "The Analysis of Nerve Bridge Security Incident", "https://blocksec.com/blog/the-analysis-of-nerve-bridge-security-incident", "BlockSec", "2021-11-18", "day", "high", "tier_2", "incident_case", false, { amount: true }, "Primary reviewed technical source for the 900 BNB amount and root cause."),
  src("bir_src_000109", "bir_bridge_000020", "bir_inc_000026", "bir_ev_000088", "security_analysis", "Explained: The Synapse and Nerve Bridge Hacks", "https://www.halborn.com/blog/post/explained-the-synapse-and-nerve-bridge-hacks-november-2021", "Halborn", "2021-11-24", "day", "high", "tier_2", "root_cause", false, { amount: true }, "Independent comparison of the Synapse and Nerve metapool attacks."),
  src("bir_src_000110", "bir_bridge_000020", null, "bir_ev_000089", "official_website", "NerveNetwork", "https://nerve.network/", "NerveNetwork", "2026-06-16", "day", "high", "tier_1", "current_status", true, { reopen: true }, "Current official website used to verify active bridge and interoperability services."),
  src("bir_src_000111", "bir_bridge_000020", null, "bir_ev_000089", "official_documentation", "What is Nerve", "https://docs.nerve.network/Guide/", "NerveNetwork", "2026-06-16", "day", "high", "tier_1", "entity_architecture", true, {}, "Official description of the heterogeneous-chain interaction protocol."),

  src("bir_src_000112", "bir_bridge_000021", "bir_inc_000027", "bir_ev_000090", "official_social", "Holograph statement on the Holograph Operator exploit", "https://twitter.com/holographxyz/status/1801332482262110301", "Holograph", "2024-06-13", "day", "high", "tier_1", "incident_case", true, { amount: true, recovery: true, shutdown: true }, "Official incident statement quoted by contemporaneous reporting; platform availability may vary.", "unknown"),
  src("bir_src_000113", "bir_bridge_000021", "bir_inc_000027", "bir_ev_000090", "news_article", "HLG Down Over 60% as Exploiter Mints 1 Billion New Tokens", "https://www.coindesk.com/tech/2024/06/13/hlg-down-over-60-as-exploiter-mints-1-billion-new-tokens", "CoinDesk", "2024-06-13", "day", "high", "tier_2", "incident_case", false, { amount: true, recovery: true }, "Contemporaneous report quoting Holograph's official statement."),
  src("bir_src_000114", "bir_bridge_000021", "bir_inc_000027", "bir_ev_000092", "official_press_release", "Holograph Announces HLG Burn Plan and Halborn Partnership", "https://chainwire.org/2024/06/19/holograph-announces-hlg-burn-plan-followed-by-technical-partnership-with-cybersecurity-specialist-halborn/", "Holograph via Chainwire", "2024-06-19", "day", "high", "tier_1", "recovery", true, { amount: true, recovery: true, reopen: true }, "Issuer-supplied press release describing the burn plan, first burn tranche, and security engagement."),
  src("bir_src_000115", "bir_bridge_000021", "bir_inc_000027", "bir_ev_000093", "news_article", "Holograph protocol sabotaged by disgruntled contractor", "https://cointelegraph.com/news/holograph-token-exploit-former-contractor", "Cointelegraph", "2024-07-03", "day", "medium", "tier_2", "incident_followup", false, { amount: true, recovery: true }, "Secondary reporting on Holograph's investigation and former-contractor attribution."),
  src("bir_src_000116", "bir_bridge_000021", null, "bir_ev_000094", "official_documentation", "Holograph trading terminal documentation", "https://docs.holograph.xyz/", "Holograph", "2026-06-16", "day", "high", "tier_1", "current_status", true, { shutdown: true, migration: true }, "At review, the same domain described a creator-coin trading terminal rather than the historical omnichain protocol."),

  src("bir_src_000117", "bir_bridge_000022", null, "bir_ev_000095", "official_website", "About the Inter-Blockchain Communication Protocol", "https://ibcprotocol.dev/about", "IBC Protocol", "2026-06-16", "day", "high", "tier_1", "entity_history", true, { migration: true }, "Official protocol history and current overview."),
  src("bir_src_000118", "bir_bridge_000022", null, "bir_ev_000096", "official_blog", "IBC turns 3!", "https://ibcprotocol.dev/blog/ibc-turns-3", "IBC Protocol", "2024-04-02", "day", "high", "tier_1", "launch_date", true, {}, "Supports the March 29 connection and April 2 first token transfer dates."),
  src("bir_src_000119", "bir_bridge_000022", null, "bir_ev_000097", "security_advisory", "IBC Security Advisory Dragonberry", "https://forum.cosmos.network/t/ibc-security-advisory-dragonberry/7702", "Cosmos / Interchain security teams", "2022-10-13", "day", "high", "tier_1", "security_context", true, {}, "Official public advisory following confidential mitigation."),
  src("bir_src_000120", "bir_bridge_000022", null, "bir_ev_000100", "security_retrospective", "Cosmos-SDK & IBC Vulnerability Retrospective: Dragonberry and Elderflower", "https://forum.cosmos.network/t/cosmos-sdk-ibc-vulnerability-retrospective-security-advisories-dragonberry-and-elderflower-october-2022/8735", "Cosmos / Interchain security teams", "2022-12-16", "day", "high", "tier_1", "security_context", true, { recovery: true }, "Official retrospective states that no funds were lost and distinguishes vulnerability discovery from exploitation."),
  src("bir_src_000121", "bir_bridge_000022", null, "bir_ev_000099", "official_release", "Cosmos SDK v0.45.9 release", "https://github.com/cosmos/cosmos-sdk/releases/tag/v0.45.9", "Cosmos SDK", "2022-10-14", "day", "high", "tier_1", "security_patch", true, { recovery: true }, "Public patch release associated with Dragonberry and Elderflower remediation."),
  src("bir_src_000122", "bir_bridge_000022", null, "bir_ev_000101", "security_advisory", "IBC Security Advisory Huckleberry", "https://forum.cosmos.network/t/ibc-security-advisory-huckleberry/10731", "ibc-go team", "2023-05-24", "day", "high", "tier_1", "security_context", true, {}, "Official advisory describing affected versions and risk conditions."),
  src("bir_src_000123", "bir_bridge_000022", null, "bir_ev_000102", "official_release", "ibc-go v7.0.1 release", "https://github.com/cosmos/ibc-go/releases/tag/v7.0.1", "cosmos/ibc-go", "2023-05-25", "day", "high", "tier_1", "security_patch", true, { recovery: true }, "One of the supported release-line patches published for Huckleberry."),
  src("bir_src_000124", "bir_bridge_000022", null, "bir_ev_000103", "official_repository", "cosmos/ibc-go", "https://github.com/cosmos/ibc-go", "cosmos/ibc-go", "2026-06-16", "day", "high", "tier_1", "current_status", true, { reopen: true, migration: true }, "Current repository lists supported v10 and v11 release lines and a May 2026 v11.1.0 release."),
  src("bir_src_000125", "bir_bridge_000022", null, "bir_ev_000103", "official_website", "IBC Protocol", "https://ibcprotocol.dev/", "IBC Protocol", "2026-06-16", "day", "high", "tier_1", "current_status", true, { reopen: true, migration: true }, "Current official protocol site used to verify active development and adoption."
);

writeArray("bridges", bridges);
writeArray("incidents", incidents);
writeArray("events", events);
writeArray("evidence", evidence);
writeObject("data/reference/chains.json", chains);
writeObject("data/reference/assets.json", assets);
console.log("Applied Phase 2 Batch 4: +3 bridges, +2 incidents, +17 events, +18 evidence.");
