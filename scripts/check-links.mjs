import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Checks that every relative Markdown link in the repo points at a file that
// exists. External (http), mailto, in-page anchors, and templated links are
// skipped. Zero dependencies.

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ignoredDirs = new Set([".git", "node_modules", "dist", "build", "coverage", ".venv", "test"]);
const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
const skipPattern = /^(?:https?:|mailto:|tel:|#|\$\{|<)/;
const broken = [];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        walk(path.join(dir, entry.name), out);
      }
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

for (const file of walk(repoRoot)) {
  // Strip fenced code blocks so example links inside them are not checked.
  const text = fs.readFileSync(file, "utf8").replace(/```[\s\S]*?```/g, "");
  let match;
  while ((match = linkPattern.exec(text)) !== null) {
    const raw = match[1].trim();
    if (skipPattern.test(raw)) {
      continue;
    }
    const target = raw.split("#")[0].split("?")[0];
    if (!target) {
      continue;
    }
    const resolved = path.resolve(path.dirname(file), target);
    if (!fs.existsSync(resolved)) {
      broken.push(`${path.relative(repoRoot, file).replace(/\\/g, "/")}: ${raw}`);
    }
  }
}

if (broken.length > 0) {
  console.error("Broken relative Markdown links:");
  for (const entry of broken) {
    console.error(`  ${entry}`);
  }
  process.exit(1);
}

console.log("All relative Markdown links resolve.");
