import crypto from "node:crypto";

const SOURCE_ID = "defillama-hacks-discovery";
const DEFAULT_SOURCE_URL = "https://defillama.com/hacks";
const BASELINE_KEY = `incident-feed:${SOURCE_ID}:baseline-v1`;

function value(input) {
  return String(input ?? "").trim();
}

function normalizeIdentity(input) {
  return value(input).normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function safeHttpUrl(input) {
  const raw = value(input);
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

function decodeScriptJson(text) {
  return text.replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function nextDataJson(html) {
  const match = html.match(/<script[^>]*\bid=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error("DefiLlama hacks input is missing __NEXT_DATA__");
  try {
    return JSON.parse(decodeScriptJson(match[1]));
  } catch (error) {
    throw new Error(`DefiLlama __NEXT_DATA__ is invalid JSON: ${error.message}`);
  }
}

function hackLike(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) return false;
  if (!value(row.name)) return false;
  if (row.date == null) return false;
  return row.amount != null || row.technique != null || row.classification != null || row.bridge != null || row.link != null;
}

function findHackArray(root) {
  const seen = new Set();
  const queue = [root];
  let best = null;
  let bestScore = 0;
  let visited = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || typeof current !== "object" || seen.has(current)) continue;
    seen.add(current);
    visited += 1;
    if (visited > 20000) throw new Error("DefiLlama page data traversal exceeded safety ceiling");

    if (Array.isArray(current)) {
      const score = current.reduce((count, row) => count + (hackLike(row) ? 1 : 0), 0);
      if (score > bestScore) {
        best = current;
        bestScore = score;
      }
      for (const item of current) if (item && typeof item === "object") queue.push(item);
    } else {
      for (const child of Object.values(current)) if (child && typeof child === "object") queue.push(child);
    }
  }

  if (!best || bestScore < 20) throw new Error(`DefiLlama page data did not contain a plausible hacks array (best=${bestScore})`);
  return best.filter(hackLike);
}

function normalizeDate(input) {
  if (typeof input === "number" && Number.isFinite(input)) {
    const ms = input < 100000000000 ? input * 1000 : input;
    const date = new Date(ms);
    if (!Number.isNaN(date.getTime())) return date.toISOString().slice(0, 10);
  }
  const raw = value(input);
  if (!raw) return null;
  const numeric = Number(raw);
  if (Number.isFinite(numeric) && raw.length >= 9) return normalizeDate(numeric);
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? raw : parsed.toISOString().slice(0, 10);
}

function normalizeChains(input) {
  if (Array.isArray(input)) return input.map(value).filter(Boolean).sort();
  const raw = value(input);
  return raw ? [raw] : [];
}

function normalizeBridgeFlag(input) {
  if (input === true || input === 1) return true;
  const raw = value(input).toLowerCase();
  return raw === "true" || raw === "yes" || raw === "1" || raw === "bridge";
}

export function parseDefillamaHacksPage(html) {
  if (!value(html)) throw new Error("DefiLlama hacks input is empty");
  const rows = findHackArray(nextDataJson(html));
  return rows.map((row) => ({
    name: value(row.name),
    date: normalizeDate(row.date),
    amount: Number.isFinite(Number(row.amount)) ? Number(row.amount) : null,
    chains: normalizeChains(row.chains ?? row.chain),
    classification: value(row.classification) || null,
    technique: value(row.technique) || null,
    target: value(row.target) || null,
    language: value(row.language) || null,
    bridge: normalizeBridgeFlag(row.bridge),
    link: safeHttpUrl(row.link ?? row.url)
  })).sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || a.name.localeCompare(b.name));
}

function canonicalIdentityIndex(bridges) {
  const index = new Map();
  for (const bridge of bridges) {
    for (const item of [bridge.canonical_name, ...(bridge.aliases ?? [])]) {
      const key = normalizeIdentity(item);
      if (key && !index.has(key)) index.set(key, { bridge_id: bridge.id, canonical_name: bridge.canonical_name });
    }
  }
  return index;
}

function canonicalEvidenceUrls(evidence) {
  const urls = new Set();
  for (const source of evidence) {
    const url = safeHttpUrl(source.url);
    if (url) urls.add(url);
  }
  return urls;
}

function rowKey(row) {
  const identity = row.link || `${normalizeIdentity(row.name)}|${row.date ?? ""}|${row.amount ?? ""}|${value(row.technique).toLowerCase()}`;
  return `incident-feed:${SOURCE_ID}:row:${crypto.createHash("sha256").update(identity).digest("hex")}`;
}

function rowFingerprint(row) {
  return crypto.createHash("sha256").update(JSON.stringify(row)).digest("hex");
}

function exactCanonicalMatch(row, identityIndex) {
  return identityIndex.get(normalizeIdentity(row.name)) ?? null;
}

function relevantRows(rows, identityIndex) {
  return rows.map((row) => ({ row, match: exactCanonicalMatch(row, identityIndex) })).filter(({ row, match }) => row.bridge || match);
}

function candidateFor(row, match, sourceUrl) {
  const sourceUrls = [...new Set([row.link, safeHttpUrl(sourceUrl)].filter(Boolean))];
  const details = {
    provider: "DefiLlama",
    source_id: SOURCE_ID,
    date: row.date,
    amount_usd: row.amount,
    chains: row.chains,
    classification: row.classification,
    technique: row.technique,
    target: row.target,
    bridge_flag: row.bridge
  };

  if (match) {
    return {
      candidate_id: `defillama_hack_${crypto.createHash("sha256").update(rowKey(row)).digest("hex").slice(0, 16)}`,
      canonical_name: match.canonical_name,
      aliases: [],
      candidate_class: "B",
      likely_type: "bridge_security_incident_signal",
      likely_status: "unknown",
      likely_incident_type: "exploit",
      record_shape: "hold",
      headline: `${row.name} appears as a new or materially changed DefiLlama hack record`,
      bir_relevance: "The DefiLlama hacks discovery input contains a new or changed row that exactly matches a canonical BIR bridge identity. This is discovery material only and requires claim-relative primary-source review.",
      duplicate_check: { matched_existing_record: true, bridge_id: match.bridge_id, method: "exact hack-name identity" },
      incident_feed: details,
      source_urls: sourceUrls,
      source_quality: "secondary_incident_database",
      next_action: "locate_primary_source_and_define_incident_boundary"
    };
  }

  return {
    candidate_id: `defillama_hack_${crypto.createHash("sha256").update(rowKey(row)).digest("hex").slice(0, 16)}`,
    canonical_name: row.name,
    aliases: [],
    candidate_class: "C",
    likely_type: "unresolved_bridge_security_incident_signal",
    likely_status: "unknown",
    likely_incident_type: "exploit",
    record_shape: "hold",
    headline: `${row.name} appears as a new or materially changed bridge hack record`,
    bir_relevance: "The DefiLlama hacks discovery input marks this row as bridge-related, but no exact canonical BIR bridge identity was resolved. The incident and bridge identity must be reviewed before canonical work.",
    duplicate_check: { matched_existing_record: false, method: "bridge flag without exact canonical hack-name identity" },
    incident_feed: details,
    source_urls: sourceUrls,
    source_quality: "secondary_incident_database",
    next_action: "resolve_bridge_identity_and_locate_primary_source"
  };
}

function sourceMetadata({ html, sourceUrl, sourceKind, sourceSha256 }) {
  const normalizedUrl = safeHttpUrl(sourceUrl) ?? DEFAULT_SOURCE_URL;
  const digest = /^[a-f0-9]{64}$/i.test(value(sourceSha256))
    ? value(sourceSha256).toLowerCase()
    : crypto.createHash("sha256").update(html).digest("hex");
  return {
    provider: "DefiLlama",
    source_id: SOURCE_ID,
    url: normalizedUrl,
    source_kind: value(sourceKind) || "public_page",
    sha256: digest
  };
}

export function watchDefillamaHacksPage({
  html,
  canonicalBridges,
  canonicalEvidence,
  state,
  applySignal,
  observedAt,
  limit = 8,
  sourceUrl = DEFAULT_SOURCE_URL,
  sourceKind = "public_page",
  sourceSha256 = null
}) {
  if (!Number.isInteger(limit) || limit < 0 || limit > 50) throw new Error(`invalid DefiLlama hacks candidate limit: ${limit}`);
  const allRows = parseDefillamaHacksPage(html);
  const identityIndex = canonicalIdentityIndex(canonicalBridges);
  const relevant = relevantRows(allRows, identityIndex);
  const evidenceUrls = canonicalEvidenceUrls(canonicalEvidence);
  const baselineInitialized = Boolean(state.signals[BASELINE_KEY]);
  const source = sourceMetadata({ html, sourceUrl, sourceKind, sourceSha256 });

  if (!baselineInitialized) {
    for (const { row } of relevant) applySignal(state, { key: rowKey(row), fingerprint: rowFingerprint(row), observedAt });
    applySignal(state, { key: BASELINE_KEY, fingerprint: "initialized-v1", observedAt });
    return {
      source,
      baseline_initialized: true,
      state_changed: true,
      parsed_count: allRows.length,
      relevant_count: relevant.length,
      baseline_seeded_count: relevant.length,
      exact_canonical_matches: relevant.filter(({ match }) => match).length,
      bridge_flag_rows: relevant.filter(({ row }) => row.bridge).length,
      unchanged_count: 0,
      canonical_evidence_duplicates: 0,
      deferred_changed_count: 0,
      emitted_count: 0,
      candidates: []
    };
  }

  const candidates = [];
  let unchanged = 0;
  let canonicalDuplicates = 0;
  let deferred = 0;

  for (const { row, match } of relevant) {
    const key = rowKey(row);
    const fingerprint = rowFingerprint(row);
    if (state.signals[key]?.fingerprint === fingerprint) {
      unchanged += 1;
      continue;
    }
    if (row.link && evidenceUrls.has(row.link)) {
      canonicalDuplicates += 1;
      continue;
    }
    if (candidates.length >= limit) {
      deferred += 1;
      continue;
    }
    applySignal(state, { key, fingerprint, observedAt });
    candidates.push(candidateFor(row, match, source.url));
  }

  return {
    source,
    baseline_initialized: false,
    state_changed: candidates.length > 0,
    parsed_count: allRows.length,
    relevant_count: relevant.length,
    baseline_seeded_count: 0,
    exact_canonical_matches: relevant.filter(({ match }) => match).length,
    bridge_flag_rows: relevant.filter(({ row }) => row.bridge).length,
    unchanged_count: unchanged,
    canonical_evidence_duplicates: canonicalDuplicates,
    deferred_changed_count: deferred,
    emitted_count: candidates.length,
    candidates
  };
}
