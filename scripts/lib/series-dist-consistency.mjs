import fs from "node:fs";
import path from "node:path";
import process from "node:process";

function normalize(value) {
  return value.split(path.sep).join("/");
}

function listFiles(root) {
  if (!fs.existsSync(root)) return [];
  const files = [];
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(target);
      else if (entry.isFile()) files.push(normalize(path.relative(root, target)));
    }
  }
  return files.sort();
}

export function checkSeriesDistConsistency(options = {}) {
  const root = path.resolve(options.root ?? process.cwd());
  const publicSeriesRoot = path.resolve(options.publicSeriesRoot ?? path.join(root, "public/data/series"));
  const distSeriesRoot = path.resolve(options.distSeriesRoot ?? path.join(root, "dist/data/series"));
  const errors = [];

  if (!fs.existsSync(publicSeriesRoot)) {
    errors.push(`public Series root missing: ${publicSeriesRoot}`);
    return { errors, files: 0 };
  }
  if (!fs.existsSync(distSeriesRoot)) {
    errors.push(`dist Series root missing: ${distSeriesRoot}`);
    return { errors, files: 0 };
  }

  const expectedFiles = listFiles(publicSeriesRoot);
  const actualFiles = listFiles(distSeriesRoot);
  if (JSON.stringify(actualFiles) !== JSON.stringify(expectedFiles)) {
    errors.push(`dist Series file set mismatch: expected ${expectedFiles.length}, received ${actualFiles.length}`);
  }

  for (const relativePath of expectedFiles) {
    const publicPath = path.join(publicSeriesRoot, relativePath);
    const distPath = path.join(distSeriesRoot, relativePath);
    if (!fs.existsSync(distPath)) {
      errors.push(`dist Series file missing: ${relativePath}`);
      continue;
    }
    const expected = fs.readFileSync(publicPath);
    const actual = fs.readFileSync(distPath);
    if (!expected.equals(actual)) errors.push(`dist Series content mismatch: ${relativePath}`);
  }

  return { errors, files: expectedFiles.length };
}
