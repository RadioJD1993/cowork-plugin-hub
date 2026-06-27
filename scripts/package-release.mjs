import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(repoRoot, "dist", "release");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function localSourceDir(source) {
  return typeof source === "string" ? source.replace(/^\.\//, "").replace(/\/+$/, "") : null;
}

function copyIfExists(from, to) {
  const sourcePath = path.join(repoRoot, from);
  if (!fs.existsSync(sourcePath)) {
    return;
  }
  fs.cpSync(sourcePath, path.join(distDir, to), { recursive: true });
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

copyIfExists(".claude-plugin/marketplace.json", ".claude-plugin/marketplace.json");
copyIfExists("README.md", "README.md");
copyIfExists("LICENSE", "LICENSE");
copyIfExists("docs/catalog.md", "docs/catalog.md");
copyIfExists("docs/catalog.json", "docs/catalog.json");

const marketplace = readJson(".claude-plugin/marketplace.json");
for (const plugin of marketplace.plugins) {
  const sourceDir = localSourceDir(plugin.source);
  if (sourceDir) {
    copyIfExists(sourceDir, sourceDir);
  }
}

const releaseManifest = {
  name: marketplace.name,
  version: marketplace.metadata?.version ?? "",
  repository: "https://github.com/RadioJD1993/cowork-plugin-hub",
  marketplace: ".claude-plugin/marketplace.json",
  catalog: "docs/catalog.json",
  plugins: marketplace.plugins.map((plugin) => ({
    name: plugin.name,
    version: plugin.version ?? "",
    source: plugin.source
  }))
};

fs.writeFileSync(path.join(distDir, "release-manifest.json"), `${JSON.stringify(releaseManifest, null, 2)}\n`);
console.log(`Release package staged at ${path.relative(repoRoot, distDir).replace(/\\/g, "/")}`);
