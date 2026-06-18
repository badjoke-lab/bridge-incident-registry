import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { loadCanonicalData } from "./lib/canonical-data.mjs";
import { buildLegacyRedirects, formatCloudflareRedirects } from "./lib/legacy-redirects.mjs";

const root = process.cwd();
const canonical = loadCanonicalData(root, process.env);
const publicRoot = path.resolve(root, canonical.config.public_output_dir ?? "public");
const redirects = buildLegacyRedirects(canonical.data);
const target = path.join(publicRoot, "_redirects");

fs.mkdirSync(publicRoot, { recursive: true });
fs.writeFileSync(target, formatCloudflareRedirects(redirects), "utf8");

console.log(`Published ${redirects.length} legacy redirect routes.`);
