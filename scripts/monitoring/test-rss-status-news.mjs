import assert from "node:assert/strict";
import { applySignal } from "./core/state.mjs";
import { parseRssStatusFeed, watchRssStatusNews } from "./monitors/rss-status-news-watch.mjs";

const bridges = [
  {
    id: "bir_bridge_test_ronin",
    canonical_name: "Ronin Bridge",
    aliases: ["Ronin Network Bridge"],
    status: "active",
    official_url: "https://bridge.roninchain.com/",
    official_domain: "bridge.roninchain.com"
  },
  {
    id: "bir_bridge_test_nomad",
    canonical_name: "Nomad Bridge",
    aliases: ["Nomad"],
    status: "limited",
    official_url: "https://www.nomad.xyz/",
    official_domain: "nomad.xyz"
  }
];

const rss = (items) => `<?xml version="1.0"?><rss><channel>${items.join("")}</channel></rss>`;
const item = ({ title, link, description = "", pubDate = "Sun, 09 Aug 2026 10:00:00 GMT" }) =>
  `<item><title><![CDATA[${title}]]></title><link>${link}</link><description><![CDATA[${description}]]></description><pubDate>${pubDate}</pubDate></item>`;

const baselineXml = rss([
  item({
    title: "Ronin Bridge pauses deposits during maintenance",
    link: "https://news.example/ronin-maintenance?utm_source=rss",
    description: "The cross-chain bridge is temporarily paused."
  }),
  item({
    title: "Bitcoin market update",
    link: "https://news.example/bitcoin",
    description: "No bridge incident is discussed."
  }),
  item({
    title: "Nomad travel company receives new license",
    link: "https://news.example/nomad-travel",
    description: "The travel business expanded its operations."
  })
]);

const parsed = parseRssStatusFeed(baselineXml);
assert.equal(parsed.length, 3);
assert.equal(parsed[0].url, "https://news.example/ronin-maintenance");

const state = { version: 1, signals: {} };
const baseline = watchRssStatusNews({
  feeds: [{ source_id: "testfeed", source_url: "https://news.example/rss", xml: baselineXml }],
  canonicalBridges: bridges,
  canonicalEvidence: [],
  state,
  applySignal,
  observedAt: "2026-08-09T10:05:00Z",
  limit: 8
});
assert.equal(baseline.state_changed, true);
assert.equal(baseline.parsed_count, 3);
assert.equal(baseline.relevant_count, 1);
assert.equal(baseline.baseline_seeded_count, 1);
assert.equal(baseline.emitted_count, 0);

const unchanged = watchRssStatusNews({
  feeds: [{ source_id: "testfeed", source_url: "https://news.example/rss", xml: baselineXml }],
  canonicalBridges: bridges,
  canonicalEvidence: [],
  state,
  applySignal,
  observedAt: "2026-08-09T10:10:00Z",
  limit: 8
});
assert.equal(unchanged.state_changed, false);
assert.equal(unchanged.unchanged_count, 1);
assert.equal(unchanged.emitted_count, 0);

const newSignalXml = rss([
  item({
    title: "Ronin Bridge halted after security exploit",
    link: "https://news.example/ronin-security",
    description: "The network bridge was halted while investigators review the exploit.",
    pubDate: "Sun, 09 Aug 2026 11:00:00 GMT"
  }),
  item({
    title: "Nomad Bridge faces regulatory restriction",
    link: "https://news.example/nomad-regulatory",
    description: "The cross-chain protocol is restricted pending a regulator review.",
    pubDate: "Sun, 09 Aug 2026 11:05:00 GMT"
  })
]);
const changed = watchRssStatusNews({
  feeds: [{ source_id: "testfeed", source_url: "https://news.example/rss", xml: newSignalXml }],
  canonicalBridges: bridges,
  canonicalEvidence: [],
  state,
  applySignal,
  observedAt: "2026-08-09T11:10:00Z",
  limit: 8
});
assert.equal(changed.emitted_count, 2);
assert.equal(changed.candidates[0].candidate_class, "B");
assert.equal(changed.candidates[0].duplicate_check.matched_existing_record, true);
assert.deepEqual(changed.candidates[0].news_signal.trigger_kinds.sort(), ["operations", "security"]);
assert.deepEqual(changed.candidates[1].news_signal.trigger_kinds.sort(), ["regulatory"]);

const duplicateState = { version: 1, signals: { "rss-news:dupfeed:baseline-v1": { fingerprint: "initialized-v1", first_seen_at: "2026-08-09T00:00:00Z", last_changed_at: "2026-08-09T00:00:00Z" } } };
const duplicateXml = rss([
  item({
    title: "Ronin Bridge suspended after attack",
    link: "https://evidence.example/already-canonical",
    description: "The bridge was suspended."
  })
]);
const duplicate = watchRssStatusNews({
  feeds: [{ source_id: "dupfeed", source_url: "https://news.example/dup-rss", xml: duplicateXml }],
  canonicalBridges: bridges,
  canonicalEvidence: [{ url: "https://evidence.example/already-canonical" }],
  state: duplicateState,
  applySignal,
  observedAt: "2026-08-09T12:00:00Z",
  limit: 8
});
assert.equal(duplicate.canonical_evidence_duplicates, 1);
assert.equal(duplicate.emitted_count, 0);
assert.equal(duplicate.state_changed, true);

const limitState = { version: 1, signals: { "rss-news:limitfeed:baseline-v1": { fingerprint: "initialized-v1", first_seen_at: "2026-08-09T00:00:00Z", last_changed_at: "2026-08-09T00:00:00Z" } } };
const limited = watchRssStatusNews({
  feeds: [{ source_id: "limitfeed", source_url: "https://news.example/limit-rss", xml: newSignalXml }],
  canonicalBridges: bridges,
  canonicalEvidence: [],
  state: limitState,
  applySignal,
  observedAt: "2026-08-09T12:10:00Z",
  limit: 1
});
assert.equal(limited.emitted_count, 1);
assert.equal(limited.deferred_changed_count, 1);

const atom = `<?xml version="1.0"?><feed><entry><title>Ronin Bridge shutdown review</title><link href="https://news.example/atom-ronin"/><summary>The cross-chain protocol shutdown is under review.</summary><updated>2026-08-09T13:00:00Z</updated></entry></feed>`;
const atomParsed = parseRssStatusFeed(atom);
assert.equal(atomParsed.length, 1);
assert.equal(atomParsed[0].url, "https://news.example/atom-ronin");

console.log("RSS status news monitoring tests passed");
