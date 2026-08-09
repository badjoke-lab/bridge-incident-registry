import crypto from "node:crypto";

const SOURCE_ID = "defillama-bridges-server";

function normalize(value) {
  return String(value ?? "").trim();
}

function normalizeIdentity(value) {
  return normalize(value)
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function safeHttpUrl(value) {
  const raw = normalize(value);
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function hostname(value) {
  const url = safeHttpUrl(value);
  if (!url) return null;
  return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
}

function stripComments(input) {
  let output = "";
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const next = input[i + 1];

    if (lineComment) {
      if (char === "\n") {
        lineComment = false;
        output += char;
      }
      continue;
    }

    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        i += 1;
      } else if (char === "\n") {
        output += char;
      }
      continue;
    }

    if (quote) {
      output += char;
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      output += char;
      continue;
    }

    if (char === "/" && next === "/") {
      lineComment = true;
      i += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      blockComment = true;
      i += 1;
      continue;
    }

    output += char;
  }

  return output;
}

function topLevelObjects(input) {
  const source = stripComments(input);
  const marker = source.indexOf("export default");
  if (marker < 0) throw new Error("external bridge registry is missing export default");
  const arrayStart = source.indexOf("[", marker);
  if (arrayStart < 0) throw new Error("external bridge registry is missing top-level array");

  const objects = [];
  let quote = null;
  let escaped = false;
  let depth = 0;
  let objectStart = -1;

  for (let i = arrayStart + 1; i < source.length; i += 1) {
    const char = source[i];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "{") {
      if (depth === 0) objectStart = i;
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth < 0) throw new Error("external bridge registry object depth became negative");
      if (depth === 0 && objectStart >= 0) {
        objects.push(source.slice(objectStart, i + 1));
        objectStart = -1;
      }
      continue;
    }

    if (char === "]" && depth === 0) break;
  }

  if (depth !== 0) throw new Error("external bridge registry contains an unbalanced object");
  return objects;
}

function stringField(objectText, field) {
  const expression = new RegExp(`\\b${field}\\s*:\\s*(["'])(.*?)\\1`, "s");
  const match = objectText.match(expression);
  return match ? match[2].replace(/\\([\\"'])/g, "$1") : null;
}

function numberField(objectText, field) {
  const expression = new RegExp(`\\b${field}\\s*:\\s*(-?\\d+)`);
  const match = objectText.match(expression);
  return match ? Number.parseInt(match[1], 10) : null;
}

function stringArrayField(objectText, field) {
  const fieldExpression = new RegExp(`\\b${field}\\s*:`);
  const fieldMatch = fieldExpression.exec(objectText);
  if (!fieldMatch) return [];
  const start = objectText.indexOf("[", fieldMatch.index + fieldMatch[0].length);
  if (start < 0) return [];

  let quote = null;
  let escaped = false;
  let depth = 0;
  let end = -1;
  for (let i = start; i < objectText.length; i += 1) {
    const char = objectText[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end < 0) return [];

  const values = [];
  const body = objectText.slice(start + 1, end);
  const valueExpression = /["']([^"']+)["']/g;
  for (const match of body.matchAll(valueExpression)) values.push(match[1]);
  return values;
}

export function parseExternalBridgeRegistry(sourceText) {
  const rows = [];
  for (const objectText of topLevelObjects(sourceText)) {
    const displayName = stringField(objectText, "displayName");
    const id = numberField(objectText, "id");
    if (!displayName || !Number.isInteger(id)) continue;
    rows.push({
      id,
      display_name: displayName,
      bridge_db_name: stringField(objectText, "bridgeDbName"),
      slug: stringField(objectText, "slug"),
      url: stringField(objectText, "url"),
      chains: stringArrayField(objectText, "chains")
    });
  }

  return rows.sort((a, b) => a.id - b.id || a.display_name.localeCompare(b.display_name));
}

function canonicalIndexes(bridges) {
  const identities = new Map();
  const domains = new Map();

  for (const bridge of bridges) {
    const identityValues = [
      bridge.canonical_name,
      bridge.slug,
      ...(bridge.aliases ?? []),
      ...(bridge.previous_slugs ?? []),
      ...(bridge.redirect_from ?? [])
    ];
    for (const value of identityValues) {
      const key = normalizeIdentity(value);
      if (key && !identities.has(key)) identities.set(key, bridge.id);
    }

    const domainValues = [bridge.official_domain, hostname(bridge.official_url)];
    for (const value of domainValues) {
      const key = normalize(value).toLowerCase().replace(/^www\./, "");
      if (key && !domains.has(key)) domains.set(key, bridge.id);
    }
  }

  return { identities, domains };
}

function matchCanonical(row, indexes) {
  for (const value of [row.display_name, row.slug]) {
    const key = normalizeIdentity(value);
    if (key && indexes.identities.has(key)) {
      return { bridge_id: indexes.identities.get(key), method: "exact_identity" };
    }
  }

  const domain = hostname(row.url);
  if (domain && indexes.domains.has(domain)) {
    return { bridge_id: indexes.domains.get(domain), method: "official_domain" };
  }
  return null;
}

function fingerprint(row) {
  const payload = JSON.stringify({
    id: row.id,
    display_name: normalize(row.display_name),
    bridge_db_name: normalize(row.bridge_db_name),
    slug: normalize(row.slug),
    url: normalize(row.url),
    chains: [...row.chains].map(normalize).filter(Boolean).sort()
  });
  return crypto.createHash("sha256").update(payload).digest("hex");
}

export function watchExternalBridgeCandidates({
  sourceText,
  sourceUrl,
  canonicalBridges,
  state,
  applySignal,
  observedAt,
  limit = 8
}) {
  if (!Number.isInteger(limit) || limit < 0 || limit > 50) throw new Error(`invalid external candidate limit: ${limit}`);
  const rows = parseExternalBridgeRegistry(sourceText);
  if (rows.length === 0) throw new Error("external bridge registry parsed zero active entries");

  const indexes = canonicalIndexes(canonicalBridges);
  const candidates = [];
  let matchedExisting = 0;
  let unchanged = 0;
  let deferred = 0;

  for (const row of rows) {
    if (matchCanonical(row, indexes)) {
      matchedExisting += 1;
      continue;
    }

    const key = `external-bridge:${SOURCE_ID}:${row.id}`;
    const fp = fingerprint(row);
    if (state.signals[key]?.fingerprint === fp) {
      unchanged += 1;
      continue;
    }

    if (candidates.length >= limit) {
      deferred += 1;
      continue;
    }

    applySignal(state, { key, fingerprint: fp, observedAt });
    const projectUrl = safeHttpUrl(row.url);
    const sourceUrls = [...new Set([sourceUrl, projectUrl].filter(Boolean))];
    candidates.push({
      candidate_id: `defillama_bridge_${row.id}`,
      canonical_name: row.display_name,
      aliases: [],
      candidate_class: "C",
      likely_type: "bridge_or_interoperability_protocol",
      likely_status: "unknown",
      likely_incident_type: "unknown",
      record_shape: "hold",
      headline: `${row.display_name} appears in the external DefiLlama bridge registry`,
      bir_relevance: "External bridge-registry presence is a discovery signal only. It does not establish a BIR incident, loss, shutdown, recovery, or canonical inclusion boundary.",
      duplicate_check: {
        matched_existing_record: false,
        method: "exact canonical name/alias/slug and official-domain check"
      },
      external_source: {
        provider: "DefiLlama",
        source_id: SOURCE_ID,
        external_bridge_id: row.id,
        bridge_db_name: row.bridge_db_name,
        slug: row.slug,
        chains: row.chains
      },
      source_urls: sourceUrls,
      source_quality: "secondary_registry",
      next_action: "research_incident_boundary_and_primary_sources"
    });
  }

  return {
    source: {
      provider: "DefiLlama",
      source_id: SOURCE_ID,
      url: sourceUrl,
      sha256: crypto.createHash("sha256").update(sourceText).digest("hex")
    },
    parsed_count: rows.length,
    matched_existing_count: matchedExisting,
    unchanged_count: unchanged,
    deferred_changed_count: deferred,
    emitted_count: candidates.length,
    candidates
  };
}
