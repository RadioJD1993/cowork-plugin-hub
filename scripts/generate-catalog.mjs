import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function readTextIfExists(relativePath) {
  const fullPath = path.join(repoRoot, relativePath);
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, "utf8") : "";
}

function localSourceDir(source) {
  return typeof source === "string" ? source.replace(/^\.\//, "").replace(/\/+$/, "") : null;
}

function firstParagraph(markdown) {
  return markdown
    .split(/\r?\n\r?\n/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith("#") && !block.startsWith("|")) ?? "";
}

function listFiles(relativeDir, predicate) {
  const fullDir = path.join(repoRoot, relativeDir);
  if (!fs.existsSync(fullDir)) {
    return [];
  }

  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && predicate(fullPath)) {
        out.push(path.relative(repoRoot, fullPath).replace(/\\/g, "/"));
      }
    }
  };
  walk(fullDir);
  return out.sort();
}

function pluginComponents(sourceDir) {
  return {
    skills: listFiles(path.posix.join(sourceDir, "skills"), (file) => path.basename(file) === "SKILL.md").length,
    commands: listFiles(path.posix.join(sourceDir, "commands"), (file) => path.extname(file) === ".md").length,
    agents: listFiles(path.posix.join(sourceDir, "agents"), (file) => path.extname(file) === ".md").length,
    hooks: fs.existsSync(path.join(repoRoot, sourceDir, "hooks", "hooks.json")),
    schemas: listFiles(path.posix.join(sourceDir, "schemas"), (file) => path.extname(file) === ".json").length,
    scripts: listFiles(path.posix.join(sourceDir, "scripts"), () => true).length
  };
}

function componentSummary(components) {
  const parts = [];
  if (components.skills) parts.push(`${components.skills} skill${components.skills === 1 ? "" : "s"}`);
  if (components.commands) parts.push(`${components.commands} command${components.commands === 1 ? "" : "s"}`);
  if (components.agents) parts.push(`${components.agents} agent${components.agents === 1 ? "" : "s"}`);
  if (components.hooks) parts.push("hooks");
  if (components.schemas) parts.push(`${components.schemas} schema${components.schemas === 1 ? "" : "s"}`);
  if (components.scripts) parts.push(`${components.scripts} script${components.scripts === 1 ? "" : "s"}`);
  return parts.length ? parts.join(", ") : "Manifest only";
}

function markdownEscape(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function buildCatalog() {
  const marketplace = readJson(".claude-plugin/marketplace.json");
  const plugins = marketplace.plugins.map((plugin) => {
    const sourceDir = localSourceDir(plugin.source);
    const manifestPath = sourceDir ? path.posix.join(sourceDir, ".claude-plugin/plugin.json") : null;
    const manifest = manifestPath && fs.existsSync(path.join(repoRoot, manifestPath))
      ? readJson(manifestPath)
      : {};
    const readme = sourceDir ? readTextIfExists(path.posix.join(sourceDir, "README.md")) : "";
    const components = sourceDir ? pluginComponents(sourceDir) : {};

    return {
      name: plugin.name,
      version: plugin.version ?? manifest.version ?? marketplace.metadata?.version ?? "",
      tier: plugin.tier ?? "community",
      category: plugin.category ?? manifest.category ?? "uncategorized",
      description: plugin.description ?? manifest.description ?? firstParagraph(readme),
      source: sourceDir ? `./${sourceDir}` : plugin.source,
      homepage: sourceDir ? `https://github.com/RadioJD1993/cowork-plugin-hub/tree/main/${sourceDir}` : "",
      install: `claude plugin install ${plugin.name}@cowork-plugin-hub`,
      keywords: plugin.keywords ?? manifest.keywords ?? [],
      components,
      componentSummary: componentSummary(components)
    };
  });

  return {
    name: marketplace.name,
    description: marketplace.metadata?.description ?? "",
    version: marketplace.metadata?.version ?? "",
    source: "https://github.com/RadioJD1993/cowork-plugin-hub",
    generatedFrom: ".claude-plugin/marketplace.json",
    plugins
  };
}

function renderMarkdown(catalog) {
  const rows = catalog.plugins
    .map((plugin) => {
      const sourceHref = typeof plugin.source === "string" && plugin.source.startsWith("./")
        ? `../${plugin.source.replace(/^\.\//, "")}`
        : plugin.homepage;
      const nameCell = sourceHref
        ? `**[${markdownEscape(plugin.name)}](${sourceHref})**`
        : `**${markdownEscape(plugin.name)}**`;

      return `| ${[
        nameCell,
        markdownEscape(plugin.version),
        markdownEscape(plugin.tier),
        markdownEscape(plugin.category),
        markdownEscape(plugin.description),
        markdownEscape(plugin.componentSummary),
        `\`${markdownEscape(plugin.install)}\``
      ].join(" | ")} |`;
    })
    .join("\n");

  return `# Plugin Catalog

Generated from [../.claude-plugin/marketplace.json](../.claude-plugin/marketplace.json). Run \`npm run catalog\` after changing marketplace entries, plugin manifests, or plugin components. The **Tier** column is the trust level defined in [../VETTING.md](../VETTING.md).

| Plugin | Version | Tier | Category | Description | Components | Install |
| --- | --- | --- | --- | --- | --- | --- |
${rows}

## Machine-Readable Catalog

- [catalog.json](./catalog.json) is the compact JSON form for tools, demos, and the Hugging Face static Space.
- [../spaces/cowork-plugin-catalog](../spaces/cowork-plugin-catalog) contains the ready-to-publish static Space package.
`;
}

function writeIfChanged(relativePath, content) {
  const fullPath = path.join(repoRoot, relativePath);
  const existing = fs.existsSync(fullPath) ? fs.readFileSync(fullPath, "utf8") : null;
  if (existing === content) {
    return false;
  }

  if (checkOnly) {
    throw new Error(`${relativePath} is out of date. Run npm run catalog.`);
  }

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  return true;
}

const catalog = buildCatalog();
const json = `${JSON.stringify(catalog, null, 2)}\n`;
const markdown = renderMarkdown(catalog);

const changed = [
  writeIfChanged("docs/catalog.md", markdown),
  writeIfChanged("docs/catalog.json", json),
  writeIfChanged("spaces/cowork-plugin-catalog/catalog.json", json)
].some(Boolean);

console.log(changed ? "Catalog updated." : "Catalog already up to date.");
