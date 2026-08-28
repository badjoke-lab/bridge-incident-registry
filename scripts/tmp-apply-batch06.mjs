import fs from "node:fs";

const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const write = (p, v) => fs.writeFileSync(p, `${JSON.stringify(v, null, 2)}\n`);

const bridges = read("data/bridges.json");
const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const expected = { bridges: 55, incidents: 51, events: 229, evidence: 377 };
const actual = { bridges: bridges.length, incidents: incidents.length, events: events.length, evidence: evidence.length };
if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Batch 06 baseline mismatch: ${JSON.stringify(actual)}`);

const forbidden = ["mayan", "mayan.finance", "rhino-fi", "rhino.fi", "deversifi", "squid", "squidrouter.com"];
const haystack = JSON.stringify(bridges).toLowerCase();
for (const term of forbidden) if (haystack.includes(term)) throw new Error(`Duplicate guard matched existing canonical bridge content: ${term}`);

const reviewed = "2026-08-29";
const bridgeBase = (x) => ({
  id: x.id,
  slug: x.slug,
  previous_slugs: [],
  redirect_from: [],
  canonical_name: x.canonical_name,
  type: x.type,
  status: "active",
  summary: x.summary,
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  last_reviewed_at: reviewed,
  last_verified_at: reviewed,
  end_date: null,
  end_date_precision: "unknown",
  terminal_reason: null,
  archived_url: null,
  major_incident_count: 0,
  has_unresolved_incident: false,
  has_reimbursement_history: false,
  successor_id: null,
  predecessor_id: null,
  replacement_bridge_id: null,
  duplicate_of: null,
  merged_into: null,
  aliases: x.aliases,
  launch_date: x.launch_date,
  launch_date_precision: x.launch_date_precision,
  official_url: x.official_url,
  official_domain: x.official_domain,
  official_url_status: "live_verified",
  primary_chains: x.primary_chains,
  primary_assets: ["unknown"],
  operator_name: x.operator_name,
  operator_type: "protocol_team",
  ecosystem_name: x.ecosystem_name,
  related_protocols: x.related_protocols,
  brand_history_notes: x.brand_history_notes,
  notes: x.notes
});

bridges.push(
  bridgeBase({
    id: "bir_bridge_000056", slug: "mayan", canonical_name: "Mayan", type: "interoperability_protocol",
    summary: "Mayan is cross-chain swap and execution infrastructure built around Wormhole-connected routing and later intent-based transfer methods. First-party material shows Mayan operating as cross-chain swap infrastructure in 2022; the exact initial launch day is not established here.",
    aliases: ["Mayan Finance"], launch_date: "2022", launch_date_precision: "year",
    official_url: "https://mayan.finance/", official_domain: "mayan.finance", primary_chains: ["unknown"],
    operator_name: "Mayan", ecosystem_name: "Mayan", related_protocols: ["Wormhole Swap", "Mayan Swift", "MCTP", "Mayan 2.0"],
    brand_history_notes: "Wormhole Swap, Swift/MCTP, and Mayan 2.0 are retained as architecture/lifecycle evolution within one Mayan canonical entity.",
    notes: "An official October 26, 2022 post already describes Mayan as cross-chain swap infrastructure connected to five networks. The record therefore uses conservative 2022 year precision rather than the looser later phrase 'since our launch one year ago'. No incident is inferred."
  }),
  bridgeBase({
    id: "bir_bridge_000057", slug: "rhino-fi", canonical_name: "rhino.fi", type: "asset_bridge",
    summary: "rhino.fi is a multichain DeFi platform with cross-chain swaps and a collateralized bridge model. First-party material marks July 13, 2022 as the rhino.fi rebrand and launch of cross-chain swaps with Polygon.",
    aliases: ["DeversiFi", "Rhino Finance", "Rhino.fi"], launch_date: "2022-07-13", launch_date_precision: "day",
    official_url: "https://rhino.fi/", official_domain: "rhino.fi", primary_chains: ["polygon", "unknown"],
    operator_name: "rhino.fi", ecosystem_name: "rhino.fi", related_protocols: ["DeversiFi", "rhino.fi Bridge"],
    brand_history_notes: "The bridge lifecycle preserves the DeversiFi to rhino.fi lineage. It is not backdated to the earlier DeversiFi L2 exchange launch; July 13, 2022 is the directly supported cross-chain feature boundary.",
    notes: "Later first-party material describes rhino.fi's collateralized bridge/liquidity-outpost model. No incident or safety rating is inferred from the architecture."
  }),
  bridgeBase({
    id: "bir_bridge_000058", slug: "squid", canonical_name: "Squid", type: "interoperability_protocol",
    summary: "Squid is cross-chain routing and swap infrastructure. First-party retrospectives state that Squid launched in January 2023, initially using Axelar-based connectivity before later routing and settlement architecture evolved.",
    aliases: ["Squid Router"], launch_date: "2023-01", launch_date_precision: "month",
    official_url: "https://www.squidrouter.com/", official_domain: "squidrouter.com", primary_chains: ["ethereum", "unknown"],
    operator_name: "Squid", ecosystem_name: "Squid", related_protocols: ["Axelar", "CORAL", "Squid Intents"],
    brand_history_notes: "Squid V1, CORAL, and Squid Intents are retained as architecture/lifecycle evolution within one canonical Squid entity.",
    notes: "The reviewed first-party sources establish January 2023, not an exact launch day. No incident is inferred from later architecture changes."
  })
);

const eventBase = (x) => ({
  id: x.id, bridge_id: x.bridge_id, incident_id: null, confidence: "high", record_maturity: "reviewed", update_status: "current",
  impact_level: "lifecycle", status_effect: "active", sort_order: 10, amount_text: null, recovered_amount_text: null,
  reimbursement_status: "not_applicable", restart_status: "not_applicable", affected_assets: ["unknown"], notes: x.notes ?? null,
  duplicate_of: null, merged_into: null, event_type: "launched", event_date: x.event_date, event_date_precision: x.event_date_precision,
  title: x.title, description: x.description, source_count: 2, affected_chains: x.affected_chains
});

events.push(
  eventBase({ id: "bir_ev_000230", bridge_id: "bir_bridge_000056", event_date: "2022", event_date_precision: "year", title: "Mayan begins cross-chain swap operations", description: "First-party material from October 2022 documents Mayan already operating as cross-chain swap infrastructure across five networks; the record uses year precision because an exact initial launch day is not established.", affected_chains: ["unknown"], notes: "Live by 2022-10-26; exact initial launch day not inferred." }),
  eventBase({ id: "bir_ev_000231", bridge_id: "bir_bridge_000057", event_date: "2022-07-13", event_date_precision: "day", title: "rhino.fi launches cross-chain swaps with Polygon", description: "DeversiFi announced its rhino.fi rebrand and the launch of cross-chain swaps with Polygon, establishing the bridge/cross-chain lifecycle boundary used by BIR.", affected_chains: ["polygon", "unknown"] }),
  eventBase({ id: "bir_ev_000232", bridge_id: "bir_bridge_000058", event_date: "2023-01", event_date_precision: "month", title: "Squid launches", description: "Squid first-party retrospectives state that the cross-chain routing protocol launched in January 2023 to address multichain fragmentation.", affected_chains: ["ethereum", "unknown"] })
);

const sourceBase = (x) => ({
  id: x.id, bridge_id: x.bridge_id, event_id: x.event_id, incident_id: null, reliability: "high", source_tier: "tier_1", url_status: "live",
  accessed_at: reviewed, claim_scope: "event", language: "en", author: null, quote_excerpt: null, is_primary: true, is_paywalled: false,
  is_official_domain: true, supports_amount: false, supports_recovery: false, supports_reimbursement: false, supports_reopen: false,
  supports_shutdown: false, supports_migration: x.supports_migration ?? false, source_type: x.source_type ?? "official_blog", title: x.title,
  url: x.url, publisher: x.publisher, published_at: x.published_at, published_at_precision: "day", archived_url: null, notes: x.notes
});

evidence.push(
  sourceBase({ id: "bir_src_000379", bridge_id: "bir_bridge_000056", event_id: "bir_ev_000230", title: "Mayan Partners with OtterSec to Perform Audit of Smart Contracts", url: "https://mayan.finance/blog/mayan-partners-with-ottersec-to-perform-audit-of-smart-contracts", publisher: "Mayan", published_at: "2022-10-26", notes: "First-party evidence that Mayan was already operating as cross-chain swap infrastructure connected to five networks in 2022; it supports a conservative 2022 lifecycle boundary but not an exact launch day." }),
  sourceBase({ id: "bir_src_000380", bridge_id: "bir_bridge_000056", event_id: "bir_ev_000230", title: "Mayan Secures $3 Million Funding to Fuel the Future of Cross-Chain Trading", url: "https://mayan.finance/blog/mayan-secures-usd3-million-funding-to-fuel-the-future-of-cross-chain-trading", publisher: "Mayan", published_at: "2024-04-11", notes: "Later first-party lifecycle evidence describes Mayan as a connector across Solana, Ethereum and EVM-compatible chains. Its approximate 'since our launch one year ago' wording is not used to override the direct 2022 evidence of operation." }),
  sourceBase({ id: "bir_src_000381", bridge_id: "bir_bridge_000057", event_id: "bir_ev_000231", title: "Introducing rhino.fi: The First Frictionless Gateway to Multi-chain DeFi", url: "https://rhino.fi/blog/introducing-rhino-fi-the-first-frictionless-gateway-to-multi-chain-defi/", publisher: "rhino.fi", published_at: "2022-07-13", notes: "First-party announcement states that DeversiFi becomes rhino.fi and that cross-chain swaps with Polygon launched." }),
  sourceBase({ id: "bir_src_000382", bridge_id: "bir_bridge_000057", event_id: "bir_ev_000231", title: "Building a DeFi Aggregator: How Our Multi-Chain Smart Contracts Work", url: "https://rhino.fi/blog/building-a-defi-aggregator-how-our-multi-chain-smart-contracts-work/", publisher: "rhino.fi", published_at: "2023-01-22", notes: "First-party architecture history says the model was built when cross-chain swaps to Polygon launched, while still under the DeversiFi lineage, and describes bridge execution using rhino.fi collateral." }),
  sourceBase({ id: "bir_src_000383", bridge_id: "bir_bridge_000058", event_id: "bir_ev_000232", title: "The Story of Squid", url: "https://www.squidrouter.com/blog/technical-history-of-squid", publisher: "Squid", published_at: "2026-03-31", notes: "First-party retrospective explicitly states Squid launched in January 2023 and describes its original Axelar-based routing architecture and later evolution." }),
  sourceBase({ id: "bir_src_000384", bridge_id: "bir_bridge_000058", event_id: "bir_ev_000232", title: "State of Squid", url: "https://www.squidrouter.com/blog/state-of-squid", publisher: "Squid", published_at: "2026-05-27", notes: "First-party current-state retrospective independently states that Squid launched in January 2023 and describes the current cross-chain stack." })
);

write("data/bridges.json", bridges);
write("data/events.json", events);
write("data/evidence.json", evidence);

const reviewPath = "docs/research/record-growth-batch-06-review.md";
let review = fs.readFileSync(reviewPath, "utf8");
review = review.replace(
  "Canonical boundary: bridge/cross-chain protocol, launch year **2023** only unless stronger exact-date evidence is found during canonicalization.",
  "Canonical boundary: bridge/cross-chain protocol, conservative launch year **2022**. Canonicalization found first-party evidence that Mayan was already operating as cross-chain swap infrastructure on 2022-10-26; do not invent an exact launch day."
);
review = review.replace(
  "- First-party 2024 funding/lifecycle post says Mayan launched one year earlier and connects Solana, Ethereum and EVM-compatible chains: https://mayan.finance/blog/mayan-secures-usd3-million-funding-to-fuel-the-future-of-cross-chain-trading\n- First-party January 2023 blog index establishes active Wormhole/bridge-related Mayan work in early 2023: https://mayan.finance/blog",
  "- Stronger first-party evidence found during canonicalization: an official 2022-10-26 post already describes Mayan as cross-chain swap infrastructure connected to five networks: https://mayan.finance/blog/mayan-partners-with-ottersec-to-perform-audit-of-smart-contracts\n- First-party 2024 funding/lifecycle post describes Mayan as a connector across Solana, Ethereum and EVM-compatible chains. Its approximate 'since our launch one year ago' wording is treated as later lifecycle context and does not override direct 2022 evidence: https://mayan.finance/blog/mayan-secures-usd3-million-funding-to-fuel-the-future-of-cross-chain-trading"
);
review = review.replace("Do not invent an exact launch day. Wormhole Swap, Swift/MCTP and Mayan 2.0", "Do not invent an exact launch day. The original 2023-year review boundary is superseded by direct 2022 first-party evidence. Wormhole Swap, Swift/MCTP and Mayan 2.0");
fs.writeFileSync(reviewPath, review);

console.log(JSON.stringify({ before: actual, after: { bridges: bridges.length, incidents: incidents.length, events: events.length, evidence: evidence.length } }, null, 2));
