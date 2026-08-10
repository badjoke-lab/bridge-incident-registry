import fs from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const root = process.cwd();
const distRoot = path.join(root, "dist");

const LIMITS = {
  maxHtmlGzipBytes: Number(process.env.BIR_MAX_HTML_GZIP_BYTES || 0),
  totalCssGzipBytes: Number(process.env.BIR_TOTAL_CSS_GZIP_BYTES || 0),
  totalJsGzipBytes: Number(process.env.BIR_TOTAL_JS_GZIP_BYTES || 0),
  maxCssGzipBytes: Number(process.env.BIR_MAX_CSS_GZIP_BYTES || 0),
  maxJsGzipBytes: Number(process.env.BIR_MAX_JS_GZIP_BYTES || 0),
};

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else if (entry.isFile()) files.push(target);
  }
  return files;
}

function summarize(files, extension) {
  const selected = files.filter((file) => file.endsWith(extension));
  const records = selected.map((file) => {
    const bytes = globalThis.__buffers.get(file);
    return {
      file: path.relative(distRoot, file),
      raw: bytes.length,
      gzip: gzipSync(bytes, { level: 9 }).length,
    };
  }).sort((a, b) => b.gzip - a.gzip);

  return {
    count: records.length,
    rawTotal: records.reduce((sum, record) => sum + record.raw, 0),
    gzipTotal: records.reduce((sum, record) => sum + record.gzip, 0),
    rawMax: records[0]?.raw ?? 0,
    gzipMax: records[0]?.gzip ?? 0,
    largest: records[0] ?? null,
  };
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KiB`;
}

let files;
try {
  files = await walk(distRoot);
} catch (error) {
  console.error(`Performance budget could not read dist/: ${error.message}`);
  process.exit(1);
}

if (!files.length) {
  console.error("Performance budget found no built files in dist/.");
  process.exit(1);
}

globalThis.__buffers = new Map();
for (const file of files) globalThis.__buffers.set(file, await fs.readFile(file));

const html = summarize(files, ".html");
const css = summarize(files, ".css");
const js = summarize(files, ".js");

console.log("BIR built-output performance report");
console.log(`HTML: ${html.count} files, ${kb(html.gzipTotal)} gzip total, ${kb(html.gzipMax)} max (${html.largest?.file ?? "n/a"})`);
console.log(`CSS:  ${css.count} files, ${kb(css.gzipTotal)} gzip total, ${kb(css.gzipMax)} max (${css.largest?.file ?? "n/a"})`);
console.log(`JS:   ${js.count} files, ${kb(js.gzipTotal)} gzip total, ${kb(js.gzipMax)} max (${js.largest?.file ?? "n/a"})`);

const failures = [];
const check = (label, observed, limit) => {
  if (limit > 0 && observed > limit) failures.push(`${label}: ${observed} > ${limit} bytes`);
};

check("max HTML gzip", html.gzipMax, LIMITS.maxHtmlGzipBytes);
check("total CSS gzip", css.gzipTotal, LIMITS.totalCssGzipBytes);
check("total JS gzip", js.gzipTotal, LIMITS.totalJsGzipBytes);
check("max CSS gzip", css.gzipMax, LIMITS.maxCssGzipBytes);
check("max JS gzip", js.gzipMax, LIMITS.maxJsGzipBytes);

if (failures.length) {
  console.error("\nPerformance budget failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const activeLimits = Object.values(LIMITS).filter((value) => value > 0).length;
console.log(activeLimits ? `Performance budget passed with ${activeLimits} active limits.` : "Performance report only: no hard limits configured yet.");
