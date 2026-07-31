import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));

const bridges = read("data/bridges.json");
const evidence = read("data/evidence.json");
const bridgesById = new Map(bridges.map((bridge) => [bridge.id, bridge]));

const terminalStatuses = new Set(["dead", "deprecated", "migrated"]);
const riskyHosts = [
  "x.com",
  "twitter.com",
  "medium.com",
  "mirror.xyz",
  "substack.com",
  "docs.google.com",
  "notion.site"
];

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "invalid-url";
  }
}

function normalizedUrl(url) {
  try {
    return new URL(url).toString();
  } catch {
    return null;
  }
}

function isRiskyHost(host) {
  return riskyHosts.some((base) => host === base || host.endsWith(`.${base}`));
}

function hasArchive(source) {
  return typeof source.archived_url === "string" && source.archived_url.trim().length > 0;
}

const grouped = new Map();

for (const source of evidence) {
  if (hasArchive(source)) continue;

  const bridge = bridgesById.get(source.bridge_id);
  const terminal = Boolean(bridge && terminalStatuses.has(bridge.status));
  const host = hostOf(source.url);
  const risky = isRiskyHost(host);
  if (!terminal && !risky) continue;

  const url = normalizedUrl(source.url) ?? source.url;
  const current = grouped.get(url) ?? {
    url,
    host,
    terminal,
    risky,
    priority: terminal && risky ? "terminal_and_risky" : terminal ? "terminal" : "risky",
    evidence_ids: [],
    bridge_ids: [],
    bridge_slugs: [],
    bridge_statuses: [],
    incident_ids: [],
    event_ids: [],
    source_types: [],
    publishers: [],
    titles: [],
    url_statuses: [],
    accessed_at: []
  };

  current.terminal ||= terminal;
  current.risky ||= risky;
  current.priority = current.terminal && current.risky
    ? "terminal_and_risky"
    : current.terminal
      ? "terminal"
      : "risky";

  current.evidence_ids.push(source.id);
  current.bridge_ids.push(source.bridge_id);
  current.bridge_slugs.push(bridge?.slug ?? null);
  current.bridge_statuses.push(bridge?.status ?? null);
  if (source.incident_id) current.incident_ids.push(source.incident_id);
  if (source.event_id) current.event_ids.push(source.event_id);
  current.source_types.push(source.source_type);
  current.publishers.push(source.publisher);
  current.titles.push(source.title);
  current.url_statuses.push(source.url_status);
  if (source.accessed_at) current.accessed_at.push(source.accessed_at);
  grouped.set(url, current);
}

function uniqueSorted(values) {
  return [...new Set(values.filter((value) => value !== null && value !== undefined))].sort();
}

const priorityOrder = {
  terminal_and_risky: 0,
  terminal: 1,
  risky: 2
};

const entries = [...grouped.values()]
  .map((entry) => ({
    ...entry,
    evidence_ids: uniqueSorted(entry.evidence_ids),
    bridge_ids: uniqueSorted(entry.bridge_ids),
    bridge_slugs: uniqueSorted(entry.bridge_slugs),
    bridge_statuses: uniqueSorted(entry.bridge_statuses),
    incident_ids: uniqueSorted(entry.incident_ids),
    event_ids: uniqueSorted(entry.event_ids),
    source_types: uniqueSorted(entry.source_types),
    publishers: uniqueSorted(entry.publishers),
    titles: uniqueSorted(entry.titles),
    url_statuses: uniqueSorted(entry.url_statuses),
    accessed_at: uniqueSorted(entry.accessed_at)
  }))
  .sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return a.url.localeCompare(b.url);
  });

const output = {
  generated_at: new Date().toISOString(),
  canonical_counts: {
    bridges: bridges.length,
    evidence: evidence.length
  },
  unique_url_counts: {
    terminal: entries.filter((entry) => entry.terminal).length,
    risky: entries.filter((entry) => entry.risky).length,
    terminal_and_risky: entries.filter((entry) => entry.terminal && entry.risky).length,
    union: entries.length
  },
  entries
};

fs.writeFileSync("archive-risk-inventory.json", `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(output.unique_url_counts, null, 2));
