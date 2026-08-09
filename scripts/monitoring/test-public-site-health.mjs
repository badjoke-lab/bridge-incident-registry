import assert from "node:assert/strict";
import { applySignal } from "./core/state.mjs";
import { watchPublicSiteHealth } from "./monitors/public-site-health-watch.mjs";

const origin = "https://bir.example.test";
const bridges = [{ id: "bir_bridge_test_001", slug: "test-bridge", canonical_name: "Test Bridge" }];
const incidents = [{ id: "bir_inc_test_001", slug: "test-incident", canonical_name: "Test Incident" }];
const counts = { bridges: 1, incidents: 1, events: 2, evidence: 3 };

function html(route) {
  const url = `${origin}${route}`;
  return `<!doctype html><html><head><title>Fixture</title><meta name="description" content="Fixture description"><meta name="robots" content="index, follow"><link rel="canonical" href="${url}"><link rel="alternate" href="${origin}/data/manifest.json"><link rel="alternate" href="${origin}/version.json"></head><body>ok</body></html>`;
}

const sitemapUrls = [
  `${origin}/`, `${origin}/bridges/`, `${origin}/incidents/`, `${origin}/methodology/`, `${origin}/about/`,
  `${origin}/bridge/test-bridge/`, `${origin}/incident/test-incident/`
];
const bodies = new Map([
  [`${origin}/`, html("/")],
  [`${origin}/bridge/test-bridge/`, html("/bridge/test-bridge/")],
  [`${origin}/incident/test-incident/`, html("/incident/test-incident/")],
  [`${origin}/robots.txt`, `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`],
  [`${origin}/sitemap.xml`, `<?xml version="1.0"?><urlset>${sitemapUrls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`],
  [`${origin}/version.json`, JSON.stringify({ canonical_only: true, canonical_origin: origin, record_counts: counts })]
]);

function healthyProbe(url) {
  return Promise.resolve({ ok: true, status: 200, final_url: url, text: bodies.get(url) ?? "", error: null });
}

const state = { version: 1, signals: {} };
const baseline = await watchPublicSiteHealth({ origin, bridges, incidents, counts, state, applySignal, observedAt: "2026-08-09T12:50:00Z", probe: healthyProbe });
assert.equal(baseline.target_count, 6);
assert.equal(baseline.baseline_seeded_count, 6);
assert.equal(baseline.findings.length, 0);
assert.equal(baseline.state_changed, true);
assert.equal(baseline.sampled_bridge_id, bridges[0].id);
assert.equal(baseline.sampled_incident_id, incidents[0].id);

const unchanged = await watchPublicSiteHealth({ origin, bridges, incidents, counts, state, applySignal, observedAt: "2026-08-09T12:51:00Z", probe: healthyProbe });
assert.equal(unchanged.baseline_seeded_count, 0);
assert.equal(unchanged.findings.length, 0);
assert.equal(unchanged.state_changed, false);

const hard404Probe = async (url, { target }) => target.id === "home"
  ? { ok: false, status: 404, final_url: url, text: "not found", error: null }
  : healthyProbe(url);
const failed = await watchPublicSiteHealth({ origin, bridges, incidents, counts, state, applySignal, observedAt: "2026-08-09T12:52:00Z", probe: hard404Probe });
assert.equal(failed.findings.length, 1);
assert.equal(failed.findings[0].category, "public_site_hard_failure");
assert.equal(failed.findings[0].severity, "medium");

const repeatedFailure = await watchPublicSiteHealth({ origin, bridges, incidents, counts, state, applySignal, observedAt: "2026-08-09T12:53:00Z", probe: hard404Probe });
assert.equal(repeatedFailure.findings.length, 0);
assert.equal(repeatedFailure.state_changed, false);

const recovered = await watchPublicSiteHealth({ origin, bridges, incidents, counts, state, applySignal, observedAt: "2026-08-09T12:54:00Z", probe: healthyProbe });
assert.equal(recovered.findings.length, 1);
assert.equal(recovered.findings[0].category, "public_site_recovered");
assert.equal(recovered.findings[0].severity, "low");

const contentState = { version: 1, signals: {} };
const brokenVersionProbe = async (url, { target }) => {
  if (target.id !== "version") return healthyProbe(url);
  return { ok: true, status: 200, final_url: url, text: JSON.stringify({ canonical_only: false, canonical_origin: origin, record_counts: counts }), error: null };
};
const brokenVersion = await watchPublicSiteHealth({ origin, bridges, incidents, counts, state: contentState, applySignal, observedAt: "2026-08-09T12:55:00Z", probe: brokenVersionProbe });
assert.equal(brokenVersion.findings.length, 1);
assert.equal(brokenVersion.findings[0].category, "public_machine_contract_regression");
assert.equal(brokenVersion.findings[0].severity, "high");

const metadataState = { version: 1, signals: {} };
const brokenHomeProbe = async (url, { target }) => {
  if (target.id !== "home") return healthyProbe(url);
  return { ok: true, status: 200, final_url: url, text: html("/").replace(/<meta name="description"[^>]*>/, ""), error: null };
};
const brokenHome = await watchPublicSiteHealth({ origin, bridges, incidents, counts, state: metadataState, applySignal, observedAt: "2026-08-09T12:56:00Z", probe: brokenHomeProbe });
assert.equal(brokenHome.findings.length, 1);
assert.equal(brokenHome.findings[0].category, "public_site_metadata_regression");
assert.match(brokenHome.findings[0].summary, /missing_description/);

const blockedState = { version: 1, signals: {} };
const blockedProbe = async (url, { target }) => target.id === "home"
  ? { ok: false, status: 403, final_url: url, text: "blocked", error: null }
  : healthyProbe(url);
const blocked = await watchPublicSiteHealth({ origin, bridges, incidents, counts, state: blockedState, applySignal, observedAt: "2026-08-09T12:57:00Z", probe: blockedProbe });
assert.equal(blocked.findings.length, 0);
assert.equal(blockedState.signals["public-site-health:home"], undefined);

let homePass = 0;
const mixedProbe = async (url, { target }) => {
  if (target.id !== "home") return healthyProbe(url);
  homePass += 1;
  return homePass === 1
    ? { ok: true, status: 200, final_url: url, text: html("/"), error: null }
    : { ok: false, status: 404, final_url: url, text: "not found", error: null };
};
const mixedState = { version: 1, signals: {} };
const mixed = await watchPublicSiteHealth({ origin, bridges, incidents, counts, state: mixedState, applySignal, observedAt: "2026-08-09T12:58:00Z", probe: mixedProbe });
assert.equal(mixed.findings.length, 0);
assert.equal(mixedState.signals["public-site-health:home"], undefined);

console.log("Public site health monitoring tests passed (baseline, dedupe, two-pass HTTP/content failure, recovery, block/mixed suppression).");
