import fs from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const root = process.cwd();
const distRoot = path.resolve(root, process.env.BIR_DIST_DIR || "dist");
const configPath = path.resolve(root, process.env.BIR_PERFORMANCE_BUDGET_CONFIG || "config/performance-budget.json");

async function readLimits() {
  try {
    const parsed = JSON.parse(await fs.readFile(configPath, "utf8"));
    const limits = parsed?.gzip_bytes;
    if (!limits || typeof limits !== "object") throw new Error("missing gzip_bytes object");
    return {
      maxHtmlGzipBytes: Number(limits.max_html_file),
      totalCssGzipBytes: Number(limits.total_css),
      totalJsGzipBytes: Number(limits.total_js),
      maxCssGzipBytes: Number(limits.max_css_file),
      maxJsGzipBytes: Number(limits.max_js_file),
    };
  } catch (error) {
    console.error(`Performance budget could not read ${path.relative(root, configPath)}: ${error.message}`);
    process.exit(1);
  }
}

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

function summarize(files, extension, buffers) {
  const selected = files.filter((file) => file.endsWith(extension));
  const records = selected.map((file) => {
    const bytes = buffers.get(file);
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

const LIMITS = await readLimits();
if (Object.values(LIMITS).some((value) => !Number.isFinite(value) || value <= 0)) {
  console.error("Performance budget requires five positive numeric gzip-byte limits.");
  process.exit(1);
}

let files;
try {
  files = await walk(distRoot);
} catch (error) {
  console.error(`Performance budget could not read ${path.relative(root, distRoot)}: ${error.message}`);
  process.exit(1);
}

if (!files.length) {
  console.error("Performance budget found no built files.");
  process.exit(1);
}

const buffers = new Map();
for (const file of files) buffers.set(file, await fs.readFile(file));

const html = summarize(files, ".html", buffers);
const css = summarize(files, ".css", buffers);
const js = summarize(files, ".js", buffers);

console.log("BIR built-output performance report");
console.log(`HTML: ${html.count} files, ${kb(html.gzipTotal)} gzip total, ${kb(html.gzipMax)} max (${html.largest?.file ?? "n/a"})`);
console.log(`CSS:  ${css.count} files, ${kb(css.gzipTotal)} gzip total, ${kb(css.gzipMax)} max (${css.largest?.file ?? "n/a"})`);
console.log(`JS:   ${js.count} files, ${kb(js.gzipTotal)} gzip total, ${kb(js.gzipMax)} max (${js.largest?.file ?? "n/a"})`);
console.log(`Budget: HTML max ${kb(LIMITS.maxHtmlGzipBytes)}, CSS total/max ${kb(LIMITS.totalCssGzipBytes)}/${kb(LIMITS.maxCssGzipBytes)}, JS total/max ${kb(LIMITS.totalJsGzipBytes)}/${kb(LIMITS.maxJsGzipBytes)}`);

const failures = [];
const check = (label, observed, limit) => {
  if (observed > limit) failures.push(`${label}: ${observed} > ${limit} bytes`);
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

console.log("Performance budget passed with 5 active limits.");
