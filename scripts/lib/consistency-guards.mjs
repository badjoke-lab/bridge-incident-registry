export function assertRecordCounts(expected, actual, label = "record counts") {
  const keys = ["bridges", "incidents", "events", "evidence"];
  for (const key of keys) {
    if (actual?.[key] !== expected?.[key]) {
      throw new Error(`${label}: ${key} expected ${expected?.[key]}, found ${actual?.[key]}`);
    }
  }
}

export function assertIdOrder(expectedRecords, actualRecords, label) {
  if (!Array.isArray(actualRecords)) throw new Error(`${label}: expected an array`);
  const expected = expectedRecords.map((record) => record.id);
  const actual = actualRecords.map((record) => record.id);
  if (JSON.stringify(expected) !== JSON.stringify(actual)) {
    throw new Error(`${label}: canonical and public ID order differ`);
  }
}

export function extractAttribute(tag, attribute) {
  const match = tag.match(new RegExp(`\\b${attribute}=["']([^"']+)["']`, "i"));
  return match?.[1] ?? null;
}

export function findTag(html, tagName, attribute, value) {
  const pattern = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  for (const match of html.matchAll(pattern)) {
    if (extractAttribute(match[0], attribute) === value) return match[0];
  }
  return null;
}

export function assertCanonicalMetadata(html, expectedUrl, label) {
  const canonicalTag = findTag(html, "link", "rel", "canonical");
  if (!canonicalTag) throw new Error(`${label}: missing canonical link`);
  const canonicalHref = extractAttribute(canonicalTag, "href");
  if (canonicalHref !== expectedUrl) {
    throw new Error(`${label}: canonical URL expected ${expectedUrl}, found ${canonicalHref}`);
  }

  const ogTag = findTag(html, "meta", "property", "og:url");
  if (!ogTag) throw new Error(`${label}: missing og:url`);
  const ogUrl = extractAttribute(ogTag, "content");
  if (ogUrl !== expectedUrl) throw new Error(`${label}: og:url does not match canonical URL`);
}

export function parseJsonLd(html, label) {
  const values = [];
  const pattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(pattern)) {
    try {
      values.push(JSON.parse(match[1]));
    } catch (error) {
      throw new Error(`${label}: invalid JSON-LD: ${error.message}`);
    }
  }
  if (values.length === 0) throw new Error(`${label}: missing JSON-LD`);
  return values;
}

export function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function assertSitemapCoverage(sitemap, expectedUrls) {
  const actual = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (actual.length !== expectedUrls.length) {
    throw new Error(`sitemap URL count expected ${expectedUrls.length}, found ${actual.length}`);
  }
  const actualSet = new Set(actual);
  for (const url of expectedUrls) {
    if (!actualSet.has(url)) throw new Error(`sitemap missing ${url}`);
  }
}

export function assertSafePublicValue(value, blockedKeys, currentPath = "root") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertSafePublicValue(item, blockedKeys, `${currentPath}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (blockedKeys.has(key)) throw new Error(`${currentPath}: blocked public key ${key}`);
    assertSafePublicValue(child, blockedKeys, `${currentPath}.${key}`);
  }
}

export function assertRedirectGraph(entries, canonicalTargets) {
  const redirects = new Map();
  for (const { source, target, status } of entries) {
    if (status !== 301) throw new Error(`redirect ${source}: status must be 301`);
    if (source === target) throw new Error(`redirect ${source}: source equals target`);
    if (!canonicalTargets.has(target)) throw new Error(`redirect ${source}: missing target ${target}`);
    const existing = redirects.get(source);
    if (existing && existing !== target) throw new Error(`redirect ${source}: conflicting targets`);
    redirects.set(source, target);
  }
  for (const start of redirects.keys()) {
    const seen = new Set();
    let current = start;
    while (redirects.has(current)) {
      if (seen.has(current)) throw new Error(`redirect loop from ${start}`);
      seen.add(current);
      current = redirects.get(current);
    }
  }
}
