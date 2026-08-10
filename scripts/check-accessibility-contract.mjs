import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distRoot = path.join(root, "dist");
const globalCssPath = path.join(root, "src/styles/global.css");
const registryCssPath = path.join(root, "src/styles/registry.css");
const errors = [];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function attrValue(tag, name) {
  const match = tag.match(new RegExp(`\\b${escapeRegExp(name)}\\s*=\\s*["']([^"']*)["']`, "i"));
  return match?.[1] ?? null;
}

function hasClass(tag, className) {
  return (attrValue(tag, "class") ?? "").split(/\s+/).includes(className);
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function collectHtmlFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtmlFiles(target));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(target);
  }
  return files;
}

function record(file, message) {
  errors.push(`${path.relative(root, file)}: ${message}`);
}

function checkPage(file, html) {
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0];
  if (!htmlTag || attrValue(htmlTag, "lang") !== "en") record(file, "document must declare <html lang=\"en\">.");

  const mainTags = html.match(/<main\b[^>]*>/gi) ?? [];
  if (mainTags.length !== 1 || attrValue(mainTags[0], "id") !== "main-content") {
    record(file, "document must contain exactly one <main id=\"main-content\">.");
  }

  const skipLinks = (html.match(/<a\b[^>]*>/gi) ?? []).filter((tag) => hasClass(tag, "skip-link"));
  if (!skipLinks.some((tag) => attrValue(tag, "href") === "#main-content")) {
    record(file, "document must expose a skip link targeting #main-content.");
  }

  const ids = new Map();
  for (const match of html.matchAll(/<[a-z][\w:-]*\b[^>]*\bid\s*=\s*["']([^"']+)["'][^>]*>/gi)) {
    ids.set(match[1], (ids.get(match[1]) ?? 0) + 1);
  }
  for (const [id, count] of ids) {
    if (count > 1) record(file, `duplicate id \"${id}\" appears ${count} times.`);
  }

  for (const match of html.matchAll(/<table\b[^>]*>[\s\S]*?<\/table>/gi)) {
    const table = match[0];
    const opening = table.match(/^<table\b[^>]*>/i)?.[0] ?? "";
    if (!hasClass(opening, "registry-table")) continue;
    if (!/<caption\b[^>]*>[\s\S]*?<\/caption>/i.test(table)) record(file, "registry table must have a caption.");
    if (!/<th\b[^>]*\bscope\s*=\s*["']col["'][^>]*>/i.test(table)) record(file, "registry table must retain scoped column headers.");
    const describedBy = attrValue(opening, "aria-describedby");
    if (!describedBy || !ids.has(describedBy)) record(file, "registry table must reference an existing result-count description.");
  }

  for (const match of html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/gi)) {
    const form = match[0];
    const opening = form.match(/^<form\b[^>]*>/i)?.[0] ?? "";
    if (!hasClass(opening, "registry-toolbar")) continue;
    if (!(attrValue(opening, "aria-label") ?? "").trim()) record(file, "registry filter form must have an accessible name.");

    for (const controlMatch of form.matchAll(/<(?:input|select)\b[^>]*>/gi)) {
      const control = controlMatch[0];
      const id = attrValue(control, "id");
      if (!id) {
        record(file, "registry form control is missing an id for its label.");
        continue;
      }
      const labelPattern = new RegExp(`<label\\b[^>]*\\bfor\\s*=\\s*["']${escapeRegExp(id)}["'][^>]*>`, "i");
      if (!labelPattern.test(form)) record(file, `registry control #${id} is missing a matching <label for>.");
    }
  }

  for (const match of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const opening = `<button${match[1]}>`;
    const label = (attrValue(opening, "aria-label") ?? "").trim();
    const text = stripTags(match[2]);
    if (!label && !text) record(file, "button is missing an accessible name.");
  }
}

let htmlFiles;
try {
  htmlFiles = await collectHtmlFiles(distRoot);
} catch (error) {
  console.error(`Accessibility contract could not read dist/: ${error.message}`);
  process.exit(1);
}

if (htmlFiles.length === 0) {
  console.error("Accessibility contract found no built HTML files in dist/.");
  process.exit(1);
}

for (const file of htmlFiles) {
  checkPage(file, await fs.readFile(file, "utf8"));
}

const globalCss = await fs.readFile(globalCssPath, "utf8");
const registryCss = await fs.readFile(registryCssPath, "utf8");

if (!/:focus-visible\b/.test(globalCss)) errors.push("src/styles/global.css: missing global :focus-visible treatment.");
if (!/\.sr-only\s*\{/.test(globalCss)) errors.push("src/styles/global.css: missing .sr-only utility.");
if (!/@media\s*\(prefers-reduced-motion:\s*reduce\)/.test(globalCss)) errors.push("src/styles/global.css: missing reduced-motion guard.");
if (/\.registry-table\s+thead\s*\{[^}]*display\s*:\s*none/si.test(registryCss)) {
  errors.push("src/styles/registry.css: mobile table headers must not be removed from the accessibility tree with display:none.");
}
if (!/\.registry-table\s+thead\s*\{[^}]*clip-path\s*:\s*inset\(50%\)/si.test(registryCss)) {
  errors.push("src/styles/registry.css: expected visually-hidden mobile table-header treatment.");
}

if (errors.length) {
  console.error("Accessibility contract failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Accessibility contract passed for ${htmlFiles.length} built HTML files.`);
