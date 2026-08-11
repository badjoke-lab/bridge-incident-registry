import fs from "node:fs";
import path from "node:path";

const origin = "https://bir.badjoke-lab.com";
const socialImage = `${origin}/og/bir-og.svg`;

function assert(value, message) {
  if (!value) throw new Error(message);
}

const htmlFiles = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    else if (entry.name.endsWith(".html")) htmlFiles.push(target);
  }
}

walk("dist");
assert(htmlFiles.length > 0, "no generated HTML pages found");

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  assert(html.includes(origin), `production origin missing: ${file}`);
  assert(!html.includes("bridge-incident-registry.pages.dev"), `stale pages.dev origin: ${file}`);
  assert(/rel=(?:"canonical"|canonical)/.test(html), `canonical missing: ${file}`);
  assert(/hreflang=(?:"en"|en)/.test(html), `English hreflang missing: ${file}`);
  assert(/hreflang=(?:"x-default"|x-default)/.test(html), `x-default hreflang missing: ${file}`);
  assert(/application\/ld\+json/.test(html), `JSON-LD missing: ${file}`);
  assert(html.includes(`${origin}/data/manifest.json`), `data manifest discovery missing: ${file}`);
  assert(html.includes(`property="og:image" content="${socialImage}"`), `Open Graph image missing: ${file}`);
  assert(html.includes(`name="twitter:image" content="${socialImage}"`), `Twitter image missing: ${file}`);
  assert(html.includes('name="robots" content="index, follow"'), `production robots meta missing: ${file}`);
}

const sitemap = fs.readFileSync("dist/sitemap.xml", "utf8");
const robots = fs.readFileSync("dist/robots.txt", "utf8");
assert(!sitemap.includes("pages.dev"), "pages.dev origin in sitemap");
assert(sitemap.includes(`${origin}/`), "production origin missing from sitemap");
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), "robots sitemap URL mismatch");
assert(fs.existsSync("dist/og/bir-og.svg"), "social image missing from dist");

console.log(JSON.stringify({ html_pages: htmlFiles.length, ok: true }));
