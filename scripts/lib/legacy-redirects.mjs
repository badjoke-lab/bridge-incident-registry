const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function uniqueLegacySlugs(record) {
  return [...new Set([...(record.previous_slugs ?? []), ...(record.redirect_from ?? [])])];
}

function addRedirect(redirects, source, target, context) {
  if (source === target) {
    throw new Error(`${context}: redirect source equals target: ${source}`);
  }
  const existing = redirects.get(source);
  if (existing && existing !== target) {
    throw new Error(`${context}: conflicting redirect for ${source}: ${existing} vs ${target}`);
  }
  redirects.set(source, target);
}

function addRecordRedirects(redirects, canonicalPaths, record, prefix, label) {
  const target = `${prefix}${record.slug}/`;
  for (const slug of uniqueLegacySlugs(record)) {
    if (typeof slug !== "string" || !SLUG_PATTERN.test(slug)) {
      throw new Error(`${label} ${record.id}: invalid legacy slug ${String(slug)}`);
    }
    for (const source of [`${prefix}${slug}`, `${prefix}${slug}/`]) {
      if (canonicalPaths.has(source) || canonicalPaths.has(source.endsWith("/") ? source : `${source}/`)) {
        throw new Error(`${label} ${record.id}: legacy source collides with canonical route ${source}`);
      }
      addRedirect(redirects, source, target, `${label} ${record.id}`);
    }
  }
}

function assertNoLoops(redirects) {
  for (const start of redirects.keys()) {
    const visited = new Set();
    let current = start;
    while (redirects.has(current)) {
      if (visited.has(current)) {
        throw new Error(`Redirect loop detected from ${start}`);
      }
      visited.add(current);
      current = redirects.get(current);
    }
  }
}

export function buildLegacyRedirects(data) {
  const canonicalPaths = new Set([
    ...data.bridges.map((record) => `/bridge/${record.slug}/`),
    ...data.incidents.map((record) => `/incident/${record.slug}/`)
  ]);
  const redirects = new Map();

  for (const record of data.bridges) {
    addRecordRedirects(redirects, canonicalPaths, record, "/bridge/", "bridge");
  }
  for (const record of data.incidents) {
    addRecordRedirects(redirects, canonicalPaths, record, "/incident/", "incident");
  }

  for (const [source, target] of redirects) {
    if (!canonicalPaths.has(target)) {
      throw new Error(`Redirect target does not exist: ${source} -> ${target}`);
    }
  }
  assertNoLoops(redirects);

  return [...redirects.entries()]
    .map(([source, target]) => ({ source, target, status: 301 }))
    .sort((a, b) => a.source.localeCompare(b.source));
}

export function formatCloudflareRedirects(redirects) {
  return redirects.map(({ source, target, status }) => `${source} ${target} ${status}`).join("\n") + (redirects.length ? "\n" : "");
}
