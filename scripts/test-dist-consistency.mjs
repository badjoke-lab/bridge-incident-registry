import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { loadCanonicalData } from "./lib/canonical-data.mjs";
import { checkDistConsistency } from "./lib/dist-consistency.mjs";

const root = process.cwd();
const sourceDist = path.join(root, "dist");
const canonical = loadCanonicalData(root, process.env);

function readJson(target) {
  return JSON.parse(fs.readFileSync(target, "utf8"));
}

function writeJson(target, value) {
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
}

function runFixture(name, mutate, expectedMessage) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), `bir-dist-${name}-`));
  const fixtureDist = path.join(tempRoot, "dist");
  fs.cpSync(sourceDist, fixtureDist, { recursive: true });
  try {
    mutate(fixtureDist);
    const result = checkDistConsistency({ root, distRoot: fixtureDist, docsRoot: root });
    assert(
      result.errors.some((error) => error.includes(expectedMessage)),
      `${name}: expected an error containing ${JSON.stringify(expectedMessage)}; received:\n${result.errors.join("\n")}`
    );
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

const baseline = checkDistConsistency({ root, distRoot: sourceDist, docsRoot: root });
assert.deepEqual(baseline.errors, [], `baseline dist must pass before fixtures run:\n${baseline.errors.join("\n")}`);

runFixture("count", (distRoot) => {
  const target = path.join(distRoot, "version.json");
  const version = readJson(target);
  version.record_counts.bridges += 1;
  writeJson(target, version);
}, "dist/version.json record_counts");

runFixture("id", (distRoot) => {
  const target = path.join(distRoot, "data/bridges.json");
  const records = readJson(target);
  records.shift();
  writeJson(target, records);
}, "dist/data/bridges.json: IDs do not match");

runFixture("metadata", (distRoot) => {
  const bridge = canonical.data.bridges[0];
  const target = path.join(distRoot, "bridge", bridge.slug, "index.html");
  const expected = new URL(`/bridge/${bridge.slug}/`, `${canonical.config.canonical_origin}/`).toString();
  const html = fs.readFileSync(target, "utf8").replace(expected, `${canonical.config.canonical_origin}/broken/`);
  fs.writeFileSync(target, html);
}, "canonical link mismatch");

runFixture("route", (distRoot) => {
  const incident = canonical.data.incidents[0];
  fs.rmSync(path.join(distRoot, "incident", incident.slug, "index.html"));
}, "missing required file");

runFixture("sitemap", (distRoot) => {
  const target = path.join(distRoot, "sitemap.xml");
  const html = fs.readFileSync(target, "utf8").replace(/\s*<url>\s*<loc>[^<]+<\/loc>[\s\S]*?<\/url>/, "");
  fs.writeFileSync(target, html);
}, "dist/sitemap.xml: URL set mismatch");

runFixture("publication-boundary", (distRoot) => {
  const target = path.join(distRoot, "data-staging");
  fs.mkdirSync(target, { recursive: true });
  writeJson(path.join(target, "private.json"), { canonical: false });
}, "forbidden published path");

console.log("Controlled post-build failure fixtures passed: count, ID, metadata, route, sitemap, and publication boundary.");
