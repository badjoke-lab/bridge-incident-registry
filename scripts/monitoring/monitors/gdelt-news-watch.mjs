import crypto from "node:crypto";

const SOURCE_ID = "gdelt-doc-2";
const BASELINE_KEY = `news:${SOURCE_ID}:baseline-v1`;
const GENERIC_BRIDGE_PHRASES = ["cross-chain bridge", "cross chain bridge", "blockchain bridge", "crypto bridge"];
const INCIDENT_TERMS = [
  "hack", "hacked", "hacking", "exploit", "exploited", "attack", "attacked", "drain", "drained",
  "pause", "paused", "suspend", "suspended", "shutdown", "shut down", "halt", "halted"
];

function text(value) {
  return String(value ?? "").trim();
}

function normalizeText(value) {
  return text(value).normalize("NFKC").toLowerCase().replace(/\s+/g, " ");
}

function safeHttpUrl(value) {
  const raw = text(value);
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    url.hash = "";
    for (const key of [...url.searchParams.keys()]) {
      if (/^(utm_|fbclid$|gclid$|mc_cid$|mc_eid$)/i.test(key)) url.searchParams.delete(key);
    }
    if (url.pathname !== "/" && url.pathname.endsWith("/")) url.pathname = url.pathname.replace(/\/+$/, "");
    return url.toString();
  } catch {
    return null;
  }
}

function normalizeDomain(value, url) {
  const explicit = text(value).toLowerCase().replace(/^www\./, "");
  if (explicit) return explicit;
  const normalizedUrl = safeHttpUrl(url);
  if (!normalizedUrl) return null;
  return new URL(normalizedUrl).hostname.toLowerCase().replace(/^www\./, "");
}

function parseJson(textValue, label) {
  let parsed;
  try {
    parsed = JSON.parse(textValue);
  } catch (error) {
    throw new Error(`${label} is not valid JSON: ${error.message}`);
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${label} must be a JSON object`);
  }
  return parsed;
}

function rawRows(parsed) {
  if (Array.isArray(parsed.articles)) return parsed.articles;
  if (Array.isArray(parsed.items)) return parsed.items;
  throw new Error("GDELT ArticleList payload must contain articles[] or JSONFeed items[]");
}

function rowFrom(raw, family) {
  if (!raw || typeof raw !== "object") return null;
  const url = safeHttpUrl(raw.url ?? raw.external_url ?? raw.id);
  const title = text(raw.title);
  if (!url || !title) return null;
  return {
    family,
    url,
    title,
    domain: normalizeDomain(raw.domain ?? raw._gdelt?.domain, url),
    seen_at: text(raw.seendate ?? raw.date_published ?? raw.date_modified) || null,
    language: text(raw.language ?? raw._gdelt?.language) || null,
    source_country: text(raw.sourcecountry ?? raw.source_country ?? raw._gdelt?.sourcecountry) || null
  };
}

export function parseGdeltArticleList(payloadText, family) {
  const parsed = parseJson(payloadText, `GDELT ${family} payload`);
  const rows = [];
  for (const raw of rawRows(parsed)) {
    const row = rowFrom(raw, family);
    if (row) rows.push(row);
  }
  return rows;
}

function articleFingerprint(row) {
  return crypto.createHash("sha256").update(JSON.stringify({
    url: row.url,
    title: normalizeText(row.title),
    domain: row.domain,
    seen_at: row.seen_at,
    language: row.language,
    source_country: row.source_country
  })).digest("hex");
}

function articleKey(url) {
  return `news:${SOURCE_ID}:article:${crypto.createHash("sha256").update(url).digest("hex")}`;
}

function canonicalEvidenceUrls(evidence) {
  const urls = new Set();
  for (const source of evidence) {
    const normalized = safeHttpUrl(source.url);
    if (normalized) urls.add(normalized);
  }
  return urls;
}

function boundaryPattern(value) {
  const normalized = normalizeText(value);
  if (normalized.length < 4) return null;
  const escaped = normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[\s_-]+/g, "[\\s_-]+");
  return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i");
}

function bridgeIdentityIndex(bridges) {
  const rows = [];
  const seen = new Set();
  for (const bridge of bridges) {
    for (const value of [bridge.canonical_name, ...(bridge.aliases ?? [])]) {
      const normalized = normalizeText(value);
      const pattern = boundaryPattern(value);
      if (!pattern || seen.has(normalized)) continue;
      seen.add(normalized);
      rows.push({ bridge_id: bridge.id, canonical_name: bridge.canonical_name, identity: value, pattern });
    }
  }
  return rows.sort((a, b) => b.identity.length - a.identity.length || a.identity.localeCompare(b.identity));
}

function hasIncidentTerm(title) {
  const normalized = normalizeText(title);
  return INCIDENT_TERMS.some((term) => boundaryPattern(term)?.test(normalized));
}

function hasGenericBridgePhrase(title) {
  const normalized = normalizeText(title);
  return GENERIC_BRIDGE_PHRASES.some((phrase) => normalized.includes(phrase));
}

function matchBridge(title, index) {
  const normalized = normalizeText(title);
  for (const entry of index) {
    if (entry.pattern.test(normalized)) return entry;
  }
  return null;
}

function candidateFor(row, matchedBridge) {
  if (matchedBridge) {
    return {
      candidate_id: `gdelt_${crypto.createHash("sha256").update(row.url).digest("hex").slice(0, 16)}`,
      canonical_name: matchedBridge.canonical_name,
      aliases: [],
      candidate_class: "B",
      likely_type: "bridge_incident_or_interruption_signal",
      likely_status: "unknown",
      likely_incident_type: "unknown",
      record_shape: "hold",
      headline: row.title,
      bir_relevance: "A recent news title contains an exact canonical bridge identity and bounded incident/interruption vocabulary. This is discovery material only and requires primary-source review.",
      duplicate_check: { matched_existing_record: true, bridge_id: matchedBridge.bridge_id, method: "exact title identity" },
      news_source: { provider: "GDELT", source_id: SOURCE_ID, query_families: [row.family], domain: row.domain, seen_at: row.seen_at, language: row.language, source_country: row.source_country },
      source_urls: [row.url],
      source_quality: "news_discovery",
      next_action: "locate_primary_source_and_define_incident_boundary"
    };
  }
  return {
    candidate_id: `gdelt_${crypto.createHash("sha256").update(row.url).digest("hex").slice(0, 16)}`,
    canonical_name: "Unresolved crypto bridge signal",
    aliases: [],
    candidate_class: "C",
    likely_type: "unresolved_bridge_incident_signal",
    likely_status: "unknown",
    likely_incident_type: "unknown",
    record_shape: "hold",
    headline: row.title,
    bir_relevance: "A recent news title contains explicit crypto/cross-chain bridge wording plus bounded incident/interruption vocabulary, but no exact canonical bridge identity was resolved.",
    duplicate_check: { matched_existing_record: false, method: "no exact canonical title identity" },
    news_source: { provider: "GDELT", source_id: SOURCE_ID, query_families: [row.family], domain: row.domain, seen_at: row.seen_at, language: row.language, source_country: row.source_country },
    source_urls: [row.url],
    source_quality: "news_discovery",
    next_action: "resolve_bridge_identity_before_incident_research"
  };
}

function mergeFamilies(rows) {
  const byUrl = new Map();
  for (const row of rows) {
    const existing = byUrl.get(row.url);
    if (!existing) {
      byUrl.set(row.url, { ...row, families: [row.family] });
      continue;
    }
    if (!existing.families.includes(row.family)) existing.families.push(row.family);
    if ((!existing.seen_at || row.seen_at > existing.seen_at) && row.seen_at) existing.seen_at = row.seen_at;
  }
  return [...byUrl.values()].sort((a, b) => (b.seen_at ?? "").localeCompare(a.seen_at ?? "") || a.url.localeCompare(b.url));
}

export function watchGdeltNews({
  securityPayload,
  operationsPayload,
  canonicalBridges,
  canonicalEvidence,
  state,
  applySignal,
  observedAt,
  sourceWindow = null,
  limit = 8
}) {
  if (!Number.isInteger(limit) || limit < 0 || limit > 50) throw new Error(`invalid GDELT candidate limit: ${limit}`);
  const securityRows = parseGdeltArticleList(securityPayload, "security");
  const operationsRows = parseGdeltArticleList(operationsPayload, "operations");
  const rows = mergeFamilies([...securityRows, ...operationsRows]);
  const evidenceUrls = canonicalEvidenceUrls(canonicalEvidence);
  const bridgeIndex = bridgeIdentityIndex(canonicalBridges);
  const baselineInitialized = Boolean(state.signals[BASELINE_KEY]);

  if (!baselineInitialized) {
    for (const row of rows) {
      applySignal(state, { key: articleKey(row.url), fingerprint: articleFingerprint(row), observedAt });
    }
    applySignal(state, { key: BASELINE_KEY, fingerprint: "initialized-v1", observedAt });
    return {
      source: { provider: "GDELT", source_id: SOURCE_ID, window: sourceWindow },
      baseline_initialized: true,
      state_changed: true,
      security_rows: securityRows.length,
      operations_rows: operationsRows.length,
      unique_rows: rows.length,
      baseline_seeded_count: rows.length,
      canonical_evidence_duplicates: 0,
      irrelevant_count: 0,
      unchanged_count: 0,
      deferred_changed_count: 0,
      emitted_count: 0,
      candidates: []
    };
  }

  const candidates = [];
  let canonicalEvidenceDuplicates = 0;
  let irrelevant = 0;
  let unchanged = 0;
  let deferred = 0;

  for (const row of rows) {
    const key = articleKey(row.url);
    const fp = articleFingerprint(row);
    if (state.signals[key]?.fingerprint === fp) {
      unchanged += 1;
      continue;
    }
    if (evidenceUrls.has(row.url)) {
      canonicalEvidenceDuplicates += 1;
      continue;
    }

    const incident = hasIncidentTerm(row.title);
    const matchedBridge = matchBridge(row.title, bridgeIndex);
    const genericBridge = hasGenericBridgePhrase(row.title);
    if (!incident || (!matchedBridge && !genericBridge)) {
      irrelevant += 1;
      continue;
    }

    if (candidates.length >= limit) {
      deferred += 1;
      continue;
    }

    applySignal(state, { key, fingerprint: fp, observedAt });
    const candidate = candidateFor(row, matchedBridge);
    candidate.news_source.query_families = row.families;
    candidates.push(candidate);
  }

  return {
    source: { provider: "GDELT", source_id: SOURCE_ID, window: sourceWindow },
    baseline_initialized: false,
    state_changed: candidates.length > 0,
    security_rows: securityRows.length,
    operations_rows: operationsRows.length,
    unique_rows: rows.length,
    baseline_seeded_count: 0,
    canonical_evidence_duplicates: canonicalEvidenceDuplicates,
    irrelevant_count: irrelevant,
    unchanged_count: unchanged,
    deferred_changed_count: deferred,
    emitted_count: candidates.length,
    candidates
  };
}
