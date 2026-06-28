import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// HUB_VALIDATE_ROOT lets the test suite point the validator at a fixture hub.
// Defaults to the repository root (the parent of scripts/).
const repoRoot = process.env.HUB_VALIDATE_ROOT
  ? path.resolve(process.env.HUB_VALIDATE_ROOT)
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

const ignoredDirs = new Set([
  ".git",
  ".idea",
  ".vscode",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".venv",
  "test"
]);

const textExtensions = new Set([
  ".cjs",
  ".js",
  ".json",
  ".jsonc",
  ".md",
  ".mjs",
  ".py",
  ".sh",
  ".txt",
  ".yaml",
  ".yml"
]);

const textBasenames = new Set([
  ".gitignore",
  "CONTRIBUTING.md",
  "LICENSE",
  "NOTICE",
  "README.md"
]);

const KEBAB = /^[a-z0-9][a-z0-9-]*$/;
const SEMVER = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/;
const EXTERNAL_SOURCE_KINDS = new Set(["npm", "url", "github", "git-subdir"]);
const TRUST_TIERS = new Set(["verified", "example", "community"]);

const privacyPatterns = [
  {
    label: "email address",
    regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi
  },
  {
    label: "phone number",
    regex: /\b(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}\b/g
  },
  {
    label: "Windows user path",
    regex: /\b[A-Z]:\\Users\\[^\\\s'"]+/gi
  },
  {
    label: "Windows absolute path",
    regex: /\b[A-Z]:\\(?:[^\\\s'"]+\\)+[^\\\s'"]*/gi
  },
  {
    label: "macOS user path",
    regex: /\/Users\/[^/\s'"]+/g
  },
  {
    label: "Linux home path",
    regex: /\/home\/[^/\s'"]+/g
  },
  {
    label: "OpenAI API key",
    regex: /\bsk-[A-Za-z0-9_-]{20,}\b/g
  },
  {
    label: "GitHub token",
    regex: /\b(?:ghp|gho|ghu|ghs|ghr|github_pat)_[A-Za-z0-9_]{20,}\b/g
  },
  {
    label: "Slack token",
    regex: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g
  },
  {
    label: "AWS access key",
    regex: /\bAKIA[0-9A-Z]{16}\b/g
  },
  {
    label: "private key",
    regex: /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/g
  },
  {
    label: "literal secret assignment",
    regex: /(?:api[_-]?key|token|secret|password)\s*[:=]\s*["']?(?!\$\{|YOUR_|your_|<|REPLACE_|example|placeholder|changeme\b)[A-Za-z0-9_./+=-]{12,}/gi
  }
];

function rel(filePath) {
  return path.relative(repoRoot, filePath).replace(/\\/g, "/");
}

function exists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function isDirectory(relativePath) {
  try {
    return fs.statSync(path.join(repoRoot, relativePath)).isDirectory();
  } catch {
    return false;
  }
}

function walk(dir, output = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        walk(path.join(dir, entry.name), output);
      }
      continue;
    }

    if (entry.isFile()) {
      output.push(path.join(dir, entry.name));
    }
  }

  return output;
}

function isTextFile(filePath) {
  const basename = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  return textBasenames.has(basename) || textExtensions.has(ext);
}

function readJson(relativePath) {
  const fullPath = path.join(repoRoot, relativePath);
  try {
    return JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch (error) {
    errors.push(`${relativePath}: invalid JSON (${error.message})`);
    return null;
  }
}

function lineNumber(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function scanPrivacy() {
  const denyListPath = path.join(repoRoot, "privacy.denylist");
  const denyTerms = fs.existsSync(denyListPath)
    ? fs.readFileSync(denyListPath, "utf8")
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"))
    : [];

  for (const file of walk(repoRoot).filter(isTextFile)) {
    const relativePath = rel(file);
    const text = fs.readFileSync(file, "utf8");

    for (const pattern of privacyPatterns) {
      pattern.regex.lastIndex = 0;
      let match;
      while ((match = pattern.regex.exec(text)) !== null) {
        errors.push(`${relativePath}:${lineNumber(text, match.index)}: possible ${pattern.label}`);
      }
    }

    const lowerText = text.toLowerCase();
    for (const term of denyTerms) {
      const index = lowerText.indexOf(term.toLowerCase());
      if (index !== -1) {
        errors.push(`${relativePath}:${lineNumber(text, index)}: matches local privacy.denylist term`);
      }
    }
  }
}

// Returns the repo-relative directory for a local string source (e.g. "./plugins/x" -> "plugins/x"),
// or null when the source is an external object (npm/url/github/git-subdir).
function localSourceDir(source) {
  if (typeof source === "string") {
    return source.replace(/^\.\//, "").replace(/\/+$/, "");
  }
  return null;
}

function validateMarketplace() {
  const empty = { listedDirs: new Set(), wipDirs: new Set() };
  const marketplacePath = ".claude-plugin/marketplace.json";
  if (!exists(marketplacePath)) {
    errors.push(`${marketplacePath}: missing marketplace manifest`);
    return empty;
  }

  const marketplace = readJson(marketplacePath);
  if (!marketplace) {
    return empty;
  }

  // Plugins under plugins/ that are intentionally not listed yet (work-in-progress).
  // Listing a dir here downgrades the "unlisted plugin" error to a warning.
  const wipDirs = new Set(
    (Array.isArray(marketplace.metadata?.wip) ? marketplace.metadata.wip : [])
      .map((dir) => String(dir).replace(/^\.\//, "").replace(/\/+$/, ""))
  );

  // Root required fields per the Claude Code marketplace schema.
  if (!marketplace.name) {
    errors.push(`${marketplacePath}: missing root "name"`);
  } else if (!KEBAB.test(marketplace.name)) {
    errors.push(`${marketplacePath}: marketplace "name" must be kebab-case (got "${marketplace.name}")`);
  }

  if (!marketplace.owner || !marketplace.owner.name) {
    errors.push(`${marketplacePath}: missing required "owner.name"`);
  }

  if (!Array.isArray(marketplace.plugins)) {
    errors.push(`${marketplacePath}: "plugins" must be an array`);
    return { listedDirs: new Set(), wipDirs };
  }

  const listedDirs = new Set();
  const names = new Set();

  for (const plugin of marketplace.plugins) {
    if (!plugin.name || !plugin.source || !plugin.description) {
      errors.push(`${marketplacePath}: each plugin entry needs "name", "source", and "description"`);
      continue;
    }

    if (!KEBAB.test(plugin.name)) {
      errors.push(`${marketplacePath}: plugin "name" must be kebab-case (got "${plugin.name}")`);
    }

    if (names.has(plugin.name)) {
      errors.push(`${marketplacePath}: duplicate plugin name "${plugin.name}"`);
    }
    names.add(plugin.name);

    const desc = String(plugin.description);
    if (desc.length < 10 || desc.length > 2000) {
      errors.push(`${marketplacePath}: "${plugin.name}" description must be 10-2000 characters`);
    }

    if (plugin.tier !== undefined && !TRUST_TIERS.has(plugin.tier)) {
      errors.push(`${marketplacePath}: "${plugin.name}" tier must be one of: ${[...TRUST_TIERS].join(", ")} (got "${plugin.tier}")`);
    } else if (plugin.tier === undefined) {
      warnings.push(`${marketplacePath}: "${plugin.name}" has no "tier"; it will display as "community" (unvetted). See VETTING.md.`);
    }

    if (typeof plugin.source === "string") {
      if (!plugin.source.startsWith("./")) {
        errors.push(`${marketplacePath}: "${plugin.name}" local source must start with "./" (got "${plugin.source}")`);
        continue;
      }
      const dir = localSourceDir(plugin.source);
      listedDirs.add(dir);

      if (!isDirectory(dir)) {
        errors.push(`${marketplacePath}: "${plugin.name}" source directory does not exist: ${dir}`);
        continue;
      }
      // strict:false entries are skills-only and may omit plugin.json.
      if (plugin.strict !== false && !exists(path.posix.join(dir, ".claude-plugin/plugin.json"))) {
        errors.push(`${marketplacePath}: "${plugin.name}" source is missing .claude-plugin/plugin.json: ${dir}`);
      }
    } else if (plugin.source && typeof plugin.source === "object") {
      if (!EXTERNAL_SOURCE_KINDS.has(plugin.source.source)) {
        errors.push(`${marketplacePath}: "${plugin.name}" object source must set "source" to one of: ${[...EXTERNAL_SOURCE_KINDS].join(", ")}`);
      }
    } else {
      errors.push(`${marketplacePath}: "${plugin.name}" has an invalid "source"`);
    }
  }

  return { listedDirs, wipDirs };
}

function immediatePluginDirs(parentDir) {
  const fullParent = path.join(repoRoot, parentDir);
  if (!fs.existsSync(fullParent)) {
    return [];
  }

  return fs.readdirSync(fullParent, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.posix.join(parentDir, entry.name))
    .filter((dir) => exists(path.posix.join(dir, ".claude-plugin/plugin.json")));
}

function frontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : null;
}

function requireFrontmatterKeys(relativePath, keys, forbidden = []) {
  const text = fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
  const block = frontmatter(text);
  if (!block) {
    errors.push(`${relativePath}: missing frontmatter block`);
    return;
  }

  for (const key of keys) {
    const regex = new RegExp(`^${key}\\s*:`, "m");
    if (!regex.test(block)) {
      errors.push(`${relativePath}: missing frontmatter key "${key}"`);
    }
  }

  for (const key of forbidden) {
    const regex = new RegExp(`^${key}\\s*:`, "m");
    if (regex.test(block)) {
      errors.push(`${relativePath}: frontmatter key "${key}" is not part of the spec; remove it (see docs/skill-writing-guide.md)`);
    }
  }
}

function validateMcpServers(relativeDir) {
  const mcpPath = path.posix.join(relativeDir, ".mcp.json");
  if (!exists(mcpPath)) {
    return;
  }

  const config = readJson(mcpPath);
  if (!config) {
    return;
  }

  const servers = config.mcpServers;
  if (!servers || typeof servers !== "object") {
    return;
  }

  for (const [serverName, server] of Object.entries(servers)) {
    if (!server || typeof server !== "object") {
      continue;
    }

    // Cowork runs remote connectors only. A stdio/command-based server is CLI-only and will not load in Cowork.
    const isLocal = server.type === "stdio" || (!server.url && (server.command || Array.isArray(server.args)));
    if (isLocal) {
      errors.push(`${mcpPath}: MCP server "${serverName}" is a local/stdio connector; Cowork supports remote servers only — use "type": "http" or "sse" with a "url" (see docs/mcp-connector-guide.md)`);
    } else if (server.type && server.type !== "http" && server.type !== "sse") {
      errors.push(`${mcpPath}: MCP server "${serverName}" has unsupported "type": "${server.type}"; Cowork supports remote "http" or "sse" only`);
    }
  }
}

function validatePlugin(relativeDir, listedDirs, wipDirs) {
  const manifestPath = path.posix.join(relativeDir, ".claude-plugin/plugin.json");
  const manifest = readJson(manifestPath);
  if (!manifest) {
    return;
  }

  // Only "name" is required by the spec; the hub additionally requires these for a quality, publishable plugin.
  for (const field of ["name", "version", "description", "author"]) {
    if (!manifest[field]) {
      errors.push(`${manifestPath}: missing "${field}"`);
    }
  }

  if (manifest.name && !KEBAB.test(manifest.name)) {
    errors.push(`${manifestPath}: name must be kebab-case`);
  }

  if (manifest.version && !SEMVER.test(manifest.version)) {
    errors.push(`${manifestPath}: version should look like semantic versioning`);
  }

  if (manifest.author && !manifest.author.name) {
    errors.push(`${manifestPath}: missing author.name`);
  }

  const isSkeleton = relativeDir === "base/skeleton";
  if (!isSkeleton && /your public author/i.test(manifest.author?.name ?? "")) {
    errors.push(`${manifestPath}: replace placeholder author before publishing`);
  }

  if (!exists(path.posix.join(relativeDir, "README.md"))) {
    errors.push(`${relativeDir}: missing README.md`);
  }

  // Component directories must not be nested inside .claude-plugin/.
  for (const comp of ["skills", "commands", "agents", "hooks"]) {
    if (isDirectory(path.posix.join(relativeDir, ".claude-plugin", comp))) {
      errors.push(`${relativeDir}: "${comp}/" must live at the plugin root, not inside .claude-plugin/`);
    }
  }

  // A common mistake: agents placed in a "subagents/" directory are never discovered.
  if (isDirectory(path.posix.join(relativeDir, "subagents"))) {
    errors.push(`${relativeDir}: rename "subagents/" to "agents/" so agents are auto-discovered`);
  }

  const skillsDir = path.join(repoRoot, relativeDir, "skills");
  const skillFiles = fs.existsSync(skillsDir)
    ? walk(skillsDir).filter((file) => path.basename(file) === "SKILL.md").map(rel)
    : [];

  if (skillFiles.length === 0) {
    warnings.push(`${relativeDir}: no skills found`);
  }

  for (const skillFile of skillFiles) {
    requireFrontmatterKeys(skillFile, ["name", "description"], ["triggers"]);
  }

  const commandsDir = path.join(repoRoot, relativeDir, "commands");
  const commandFiles = fs.existsSync(commandsDir)
    ? walk(commandsDir).filter((file) => path.extname(file) === ".md").map(rel)
    : [];

  for (const commandFile of commandFiles) {
    requireFrontmatterKeys(commandFile, ["name", "description"], ["usage"]);
  }

  const agentsDir = path.join(repoRoot, relativeDir, "agents");
  const agentFiles = fs.existsSync(agentsDir)
    ? walk(agentsDir).filter((file) => path.extname(file) === ".md").map(rel)
    : [];

  for (const agentFile of agentFiles) {
    requireFrontmatterKeys(agentFile, ["name", "description"]);
  }

  validateMcpServers(relativeDir);

  if (relativeDir.startsWith("plugins/") && !listedDirs.has(relativeDir)) {
    if (wipDirs.has(relativeDir)) {
      warnings.push(`${relativeDir}: work-in-progress plugin (listed in marketplace metadata.wip); not yet in the public catalog`);
    } else {
      errors.push(`${relativeDir}: installable plugin under plugins/ is not listed in .claude-plugin/marketplace.json. Add a "source": "./${relativeDir}" entry to publish it, or add "${relativeDir}" to metadata.wip if it is not ready.`);
    }
  }
}

function main() {
  const { listedDirs, wipDirs } = validateMarketplace();
  const pluginDirs = [
    ...immediatePluginDirs("plugins"),
    ...immediatePluginDirs("examples"),
    ...(isDirectory("base/skeleton") ? ["base/skeleton"] : [])
  ];

  for (const pluginDir of pluginDirs) {
    validatePlugin(pluginDir, listedDirs, wipDirs);
  }

  scanPrivacy();

  for (const warning of warnings) {
    console.warn(`WARN ${warning}`);
  }

  if (errors.length > 0) {
    console.error("\nValidation failed:");
    for (const error of errors) {
      console.error(`ERROR ${error}`);
    }
    process.exit(1);
  }

  console.log(`Validation passed for ${pluginDirs.length} plugin directories.`);
}

main();
