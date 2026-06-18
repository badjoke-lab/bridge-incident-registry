import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { loadCanonicalData } from "./lib/canonical-data.mjs";

const root = process.cwd();
const canonical = loadCanonicalData(root, process.env);
const publicRoot = path.resolve(root, canonical.config.public_output_dir ?? "public");
const origin = canonical.config.canonical_origin;
const productionBranch = process.env.CF_PAGES_PRODUCTION_BRANCH ?? "main";
const previewBuild = process.env.PUBLIC_NO_INDEX === "true" || Boolean(
  process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== productionBranch
);

function write(relativePath, value) {
  const target = path.join(publicRoot, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, value.endsWith("\n") ? value : `${value}\n`, "utf8");
}

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

function absolute(pathname) {
  return new URL(pathname.replace(/^\//, ""), `${origin}/`).toString();
}

const staticPaths = ["/", "/bridges/", "/incidents/", "/methodology/", "/about/"];
const urls = [
  ...staticPaths.map((pathname) => ({ pathname, lastmod: canonical.latestVerifiedAt })),
  ...canonical.data.bridges.map((record) => ({ pathname: `/bridge/${record.slug}/`, lastmod: record.last_verified_at })),
  ...canonical.data.incidents.map((record) => ({ pathname: `/incident/${record.slug}/`, lastmod: record.last_verified_at }))
];

const sitemapBody = urls.map(({ pathname, lastmod }) => {
  const modified = lastmod ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : "";
  return `  <url>\n    <loc>${escapeXml(absolute(pathname))}</loc>${modified}\n  </url>`;
}).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapBody}\n</urlset>\n`;
const robots = previewBuild
  ? `User-agent: *\nDisallow: /\nSitemap: ${absolute("/sitemap.xml")}\n`
  : `User-agent: *\nAllow: /\nSitemap: ${absolute("/sitemap.xml")}\n`;

const headerBlocks = [
  "/version.json\n  Content-Type: application/json; charset=utf-8\n  Cache-Control: public, max-age=300",
  "/data/*\n  Content-Type: application/json; charset=utf-8\n  Cache-Control: public, max-age=300",
  "/llms.txt\n  Content-Type: text/plain; charset=utf-8\n  Cache-Control: public, max-age=300",
  "/ai.txt\n  Content-Type: text/plain; charset=utf-8\n  Cache-Control: public, max-age=300"
];
if (previewBuild) headerBlocks.unshift("/*\n  X-Robots-Tag: noindex, nofollow");

write("sitemap.xml", sitemap);
write("robots.txt", robots);
write("_headers", `${headerBlocks.join("\n\n")}\n`);

console.log(`Published discovery files for ${urls.length} canonical HTML URLs.`);
console.log(`Preview indexing disabled: ${previewBuild}`);
