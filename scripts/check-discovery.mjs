import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { loadCanonicalData } from "./lib/canonical-data.mjs";

const root = process.cwd();
const canonical = loadCanonicalData(root, process.env);
const publicRoot = path.resolve(root, canonical.config.public_output_dir ?? "public");
const origin = canonical.config.canonical_origin;
const productionBranch = process.env.CF_PAGES_PRODUCTION_BRANCH ?? "main";
const preview = process.env.PUBLIC_NO_INDEX === "true" || Boolean(process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== productionBranch);
const errors = [];

function read(file) {
  try { return fs.readFileSync(path.join(publicRoot, file), "utf8"); }
  catch (error) { errors.push(`${file}: ${error.message}`); return ""; }
}
function absolute(value) { return new URL(value.replace(/^\//, ""), `${origin}/`).toString(); }

const sitemap = read("sitemap.xml");
const robots = read("robots.txt");
const headers = read("_headers");
const paths = [
  "/", "/bridges/", "/incidents/", "/compare/", "/methodology/", "/about/", "/support/",
  ...canonical.data.bridges.map((record) => `/bridge/${record.slug}/`),
  ...canonical.data.incidents.map((record) => `/incident/${record.slug}/`)
];

for (const value of paths) {
  if (!sitemap.includes(`<loc>${absolute(value)}</loc>`)) errors.push(`sitemap.xml: missing ${value}`);
}
if ((sitemap.match(/<loc>/g) ?? []).length !== paths.length) errors.push("sitemap.xml: URL count mismatch");
if (!robots.includes(`Sitemap: ${absolute("/sitemap.xml")}`)) errors.push("robots.txt: missing sitemap URL");
if (preview ? !robots.includes("Disallow: /") : !robots.includes("Allow: /")) errors.push("robots.txt: crawl policy mismatch");
if (preview && !headers.includes("X-Robots-Tag: noindex, nofollow")) errors.push("_headers: missing preview noindex header");
if (!headers.includes("/data/*") || !headers.includes("Content-Type: application/json")) errors.push("_headers: missing JSON headers");

for (const record of [...canonical.data.bridges, ...canonical.data.incidents]) {
  const base = canonical.data.bridges.includes(record) ? "/bridge/" : "/incident/";
  for (const slug of [...(record.previous_slugs ?? []), ...(record.redirect_from ?? [])]) {
    if (sitemap.includes(absolute(`${base}${slug}/`))) errors.push(`sitemap.xml: legacy slug present ${slug}`);
  }
}

if (errors.length) {
  console.error("Discovery output check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Discovery output check passed for ${paths.length} canonical HTML URLs.`);
