import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const checker = path.join(root, "scripts/check-performance-budget.mjs");
const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "bir-performance-test-"));
const dist = path.join(tempRoot, "dist");
const config = path.join(tempRoot, "budget.json");

await fs.mkdir(dist, { recursive: true });
await fs.writeFile(path.join(dist, "index.html"), "<!doctype html><title>BIR</title><main>fixture</main>");
await fs.writeFile(path.join(dist, "style.css"), "body{margin:0;color:#fff;background:#000}");
await fs.writeFile(path.join(dist, "app.js"), "document.documentElement.dataset.test='ok';");

function runBudget(limits) {
  return fs.writeFile(config, JSON.stringify({ gzip_bytes: limits })).then(() => spawnSync(
    process.execPath,
    [checker],
    {
      cwd: root,
      encoding: "utf8",
      env: {
        ...process.env,
        BIR_DIST_DIR: dist,
        BIR_PERFORMANCE_BUDGET_CONFIG: config,
      },
    },
  ));
}

const generous = {
  max_html_file: 1024,
  total_css: 1024,
  total_js: 1024,
  max_css_file: 1024,
  max_js_file: 1024,
};

const pass = await runBudget(generous);
if (pass.status !== 0 || !pass.stdout.includes("Performance budget passed with 5 active limits.")) {
  console.error(pass.stdout);
  console.error(pass.stderr);
  throw new Error("Expected generous performance budget to pass.");
}

const fail = await runBudget({ ...generous, max_html_file: 1 });
if (fail.status === 0 || !fail.stderr.includes("max HTML gzip")) {
  console.error(fail.stdout);
  console.error(fail.stderr);
  throw new Error("Expected max HTML gzip regression to fail.");
}

await fs.rm(tempRoot, { recursive: true, force: true });
console.log("Performance budget controlled pass/failure tests passed.");
