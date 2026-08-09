import crypto from "node:crypto";

const TRIGGERS = Object.freeze({
  security: /\b(hack(?:ed|ing)?|exploit(?:ed|s)?|breach(?:ed)?|attack(?:ed)?|compromis(?:e|ed)|vulnerab(?:ility|le)|drain(?:ed|ing)?|stol(?:en|e)|theft)\b/i,
  operations: /\b(paus(?:e|ed|ing)|halt(?:ed|ing)?|shut(?:down| down)|shutdown|suspend(?:ed|ing)?|disable(?:d|ment)?|offline|outage|ceas(?:e|ed|ing)|sunset|deprecat(?:e|ed|ion)|retir(?:e|ed|ement)|discontinu(?:e|ed|ation))\b/i,
  regulatory: /\b(regulat(?:or|ory|ion)|sanction(?:ed|s)?|ofac|mica|licen[cs](?:e|ed|ing)|restrict(?:ed|ion|ions)|block(?:ed|ing)|ban(?:ned)?|compliance|enforcement)\b/i
});

const BRIDGE_CONTEXT = /\b(bridge|cross[- ]chain|interoperab(?:ility|le)|router|protocol|network|validator|vault)\b/i;

function value(input) {
  return String(input ?? "").trim();
}

function decodeXml(input) {
  return value(input)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(Number.parseInt(dec, 10)));
}

function stripMarkup(input) {
  return decodeXml(input).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function tagValue(block, tags) {
  for (const tag of tags) {
    const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
    if (match) return stripMarkup(match[1]);
  }
  return null;
}

function safeHttpUrl(input) {
  const raw = decodeXml(input);
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    url.hash = "";
    for (const key of [...url.searchParams.keys()]) {
      if (/^(utm_|fbclid$|gclid$|mc_cid$|mc_eid$)/i.test(key)) url.searchParams.delete(key);
    }
    return url.toString();
  } catch {
    return null;
  }
}

function itemUrl(block) {
  const rssLink = block.match(/<link(?:\s[^>]*)?>([\s\S]*?)<\/link>/i);
  if (rssLink) {
    const url = safeHttpUrl(stripMarkup(rssLink[1]));
    if (url) return url;
  }
  const atomLink = block.match(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*\/?\s*>/i);
  if (atomLink) {
    const url = safeHttpUrl(atomLink[1]);
    if (url) return url;
  }
  const guid = tagValue(block, ["guid", "id"]);
  return safeHttpUrl(guid);
}

function normalizeDate(input) {
  const raw = value(input);
  if (!raw) return null;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? raw : parsed.toISOString();
}

export function parseRssStatusFeed(xml) {
  const text = value(xml);
  if (!text) throw new Error("RSS/Atom input is empty");
  const rssBlocks = [...text.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].map((match) => match[1]);
  const atomBlocks = [...text.matchAll(/<entry\b[^>]*>([\s\S]*?)<\/entry>/gi)].map((match) => match[1]);
  const blocks = rssBlocks.length > 0 ? rssBlocks : atomBlocks;
  if (blocks.length === 0) throw new Error("RSS/Atom input contains no item or entry records");

  return blocks.map((block) => ({
    title: tagValue(block, ["title"]) ?? "",
    summary: tagValue(block, ["description", "summary", "content", "content:encoded"]) ?? "",
    published_at: normalizeDate(tagValue(block, ["pubDate", "published", "updated", "dc:date"])),
    url: itemUrl(block)
  })).filter((item) => item.title && item.url);
}

function normalizeText(input) {
  return value(input).normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").replace(/\s+/g, " ").trim();
}

function identityRows(bridges) {
  const rows = [];
  for (const bridge of bridges) {
    for (const raw of [bridge.canonical_name, ...(bridge.aliases ?? [])]) {
      const normalized = normalizeText(raw);
      if (normalized.length < 4) continue;
      rows.push({ bridge, raw: value(raw), normalized });
    }
  }
  return rows.sort((a, b) => b.normalized.length - a.normalized.length || a.bridge.id.localeCompare(b.bridge.id));
}

function articleMatches(item, identities) {
  const combined = `${item.title} ${item.summary}`.trim();
  const normalized = ` ${normalizeText(combined)} `;
  const matches = [];
  const seen = new Set();
  for (const identity of identities) {
    if (!normalized.includes(` ${identity.normalized} `)) continue;
    if (seen.has(identity.bridge.id)) continue;
    const identityHasContext = BRIDGE_CONTEXT.test(identity.raw);
    if (!identityHasContext && !BRIDGE_CONTEXT.test(combined)) continue;
    seen.add(identity.bridge.id);
    matches.push(identity.bridge);
  }
  return matches;
}

function triggerKinds(item) {
  const combined = `${item.title} ${item.summary}`;
  return Object.entries(TRIGGERS).filter(([, pattern]) => pattern.test(combined)).map(([kind]) => kind);
}

function evidenceUrls(evidence) {
  const urls = new Set();
  for (const source of evidence) {
    const url = safeHttpUrl(source.url);
    if (url) urls.add(url);
  }
  return urls;
}

function itemKey(sourceId, url) {
  return `rss-news:${sourceId}:item:${crypto.createHash("sha256").update(url).digest("hex")}`;
}

function fingerprint(item, kinds, matchedBridges) {
  return crypto.createHash("sha256").update(JSON.stringify({
    title: item.title,
    summary: item.summary,
    published_at: item.published_at,
    url: item.url,
    trigger_kinds: kinds,
    bridge_ids: matchedBridges.map((bridge) => bridge.id).sort()
  })).digest("hex");
}

function candidateFor({ sourceId, sourceUrl, item, kinds, matchedBridges }) {
  const primary = matchedBridges[0];
  return {
    candidate_id: `rss_status_${crypto.createHash("sha256").update(`${sourceId}|${item.url}`).digest("hex").slice(0, 16)}`,
    canonical_name: primary.canonical_name,
    aliases: [],
    candidate_class: "B",
    likely_type: "bridge_status_or_security_news_signal",
    likely_status: "unknown",
    likely_incident_type: kinds.includes("security") ? "security_signal" : "operations_or_regulatory_signal",
    record_shape: "hold",
    headline: item.title,
    bir_relevance: "A current secondary-news feed contains a new or materially changed article that names a canonical BIR bridge and contains a bounded security, operations, or regulatory trigger. It is discovery material only and requires first-party review before any canonical change.",
    duplicate_check: {
      matched_existing_record: true,
      bridge_id: primary.id,
      related_bridge_ids: matchedBridges.map((bridge) => bridge.id),
      method: "canonical name-or-alias phrase plus bounded trigger"
    },
    news_signal: {
      provider: sourceId,
      feed_url: sourceUrl,
      article_url: item.url,
      published_at: item.published_at,
      trigger_kinds: kinds
    },
    source_urls: [item.url],
    source_quality: "secondary_news_discovery",
    next_action: "locate_first_party_source_and_review_status_or_incident_boundary"
  };
}

export function watchRssStatusNews({
  feeds,
  canonicalBridges,
  canonicalEvidence,
  state,
  applySignal,
  observedAt,
  limit = 8
}) {
  if (!Array.isArray(feeds)) throw new Error("RSS status news feeds must be an array");
  if (!Number.isInteger(limit) || limit < 0 || limit > 50) throw new Error(`invalid RSS status news candidate limit: ${limit}`);
  const identities = identityRows(canonicalBridges);
  const canonicalEvidenceUrls = evidenceUrls(canonicalEvidence);
  const candidates = [];
  const sourceReports = [];
  let stateChanged = false;
  let deferred = 0;
  let canonicalDuplicates = 0;

  for (const feed of feeds) {
    const sourceId = value(feed.source_id);
    const sourceUrl = safeHttpUrl(feed.source_url);
    if (!/^[a-z0-9][a-z0-9_-]{1,63}$/i.test(sourceId)) throw new Error(`invalid RSS source_id: ${sourceId}`);
    if (!sourceUrl) throw new Error(`invalid RSS source_url for ${sourceId}`);
    const rows = parseRssStatusFeed(feed.xml);
    const relevant = rows.map((item) => {
      const kinds = triggerKinds(item);
      const matchedBridges = kinds.length > 0 ? articleMatches(item, identities) : [];
      return { item, kinds, matchedBridges };
    }).filter((row) => row.kinds.length > 0 && row.matchedBridges.length > 0);

    const baselineKey = `rss-news:${sourceId}:baseline-v1`;
    const baselineInitialized = Boolean(state.signals[baselineKey]);
    let baselineSeeded = 0;
    let unchanged = 0;
    let emitted = 0;

    if (!baselineInitialized) {
      for (const row of relevant) {
        const signal = applySignal(state, {
          key: itemKey(sourceId, row.item.url),
          fingerprint: fingerprint(row.item, row.kinds, row.matchedBridges),
          observedAt
        });
        if (signal.changed) baselineSeeded += 1;
      }
      applySignal(state, { key: baselineKey, fingerprint: "initialized-v1", observedAt });
      stateChanged = true;
      sourceReports.push({
        source_id: sourceId,
        source_url: sourceUrl,
        baseline_initialized: true,
        parsed_count: rows.length,
        relevant_count: relevant.length,
        baseline_seeded_count: baselineSeeded,
        unchanged_count: 0,
        emitted_count: 0
      });
      continue;
    }

    for (const row of relevant) {
      const key = itemKey(sourceId, row.item.url);
      const nextFingerprint = fingerprint(row.item, row.kinds, row.matchedBridges);
      if (state.signals[key]?.fingerprint === nextFingerprint) {
        unchanged += 1;
        continue;
      }
      if (canonicalEvidenceUrls.has(row.item.url)) {
        const signal = applySignal(state, { key, fingerprint: nextFingerprint, observedAt });
        stateChanged ||= signal.changed;
        canonicalDuplicates += 1;
        continue;
      }
      if (candidates.length >= limit) {
        deferred += 1;
        continue;
      }
      const signal = applySignal(state, { key, fingerprint: nextFingerprint, observedAt });
      stateChanged ||= signal.changed;
      if (!signal.changed) continue;
      candidates.push(candidateFor({ sourceId, sourceUrl, ...row }));
      emitted += 1;
    }

    sourceReports.push({
      source_id: sourceId,
      source_url: sourceUrl,
      baseline_initialized: false,
      parsed_count: rows.length,
      relevant_count: relevant.length,
      baseline_seeded_count: 0,
      unchanged_count: unchanged,
      emitted_count: emitted
    });
  }

  return {
    enabled: feeds.length > 0,
    state_changed: stateChanged,
    source_count: feeds.length,
    parsed_count: sourceReports.reduce((sum, report) => sum + report.parsed_count, 0),
    relevant_count: sourceReports.reduce((sum, report) => sum + report.relevant_count, 0),
    baseline_seeded_count: sourceReports.reduce((sum, report) => sum + report.baseline_seeded_count, 0),
    unchanged_count: sourceReports.reduce((sum, report) => sum + report.unchanged_count, 0),
    canonical_evidence_duplicates: canonicalDuplicates,
    deferred_changed_count: deferred,
    emitted_count: candidates.length,
    sources: sourceReports,
    candidates
  };
}
