#!/usr/bin/env node
// Cross-platform plugin scaffolder (no bash required).
//
//   npm run new                         # interactive
//   npm run new -- my-plugin "desc" "Me"  # non-interactive
//   npm run new -- my-plugin --full     # include optional components
//
// Defaults to a MINIMAL plugin (manifest + README + one skill), matching the
// hub's "keep it small" guidance. Pass --full for the kitchen-sink skeleton.

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const full = args.includes("--full");
const positional = args.filter((a) => !a.startsWith("--"));
const KEBAB = /^[a-z0-9][a-z0-9-]*$/;

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (answer) => {
    rl.close();
    resolve(answer.trim());
  }));
}

function write(dest, relativePath, content) {
  const full = path.join(dest, relativePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

async function main() {
  let [name, description, author] = positional;
  if (!name) name = await ask("Plugin name (kebab-case, e.g. release-notes): ");
  if (!KEBAB.test(name)) {
    console.error(`Error: plugin name must be kebab-case (lowercase letters, digits, hyphens). Got: ${name}`);
    process.exit(1);
  }
  if (!description) description = await ask("Short description (one sentence): ");
  if (!author) author = await ask("Public author name (avoid private org/client info): ");

  const dest = path.join(repoRoot, "plugins", name);
  if (fs.existsSync(dest)) {
    console.error(`Error: plugins/${name} already exists. Choose a different name.`);
    process.exit(1);
  }

  const manifest = { name, version: "0.1.0", description, author: { name: author } };
  write(dest, ".claude-plugin/plugin.json", `${JSON.stringify(manifest, null, 2)}\n`);

  write(dest, "README.md", `# ${name}

${description}

## Installation

\`\`\`bash
claude plugin install ${name}@cowork-plugin-hub
\`\`\`

## Skills

| Skill | Description |
| --- | --- |
| \`example-skill\` | Description |
`);

  write(dest, "skills/example-skill/SKILL.md", `---
name: example-skill
description: Describe what this skill does and the situations and phrases that should activate it, e.g. "Use when the user asks to ...". Activation comes from this description; there is no triggers field.
---

# Example Skill

## When To Apply

Apply this skill when ... Replace this with the real trigger conditions.

## Workflow

1. ...

## Output Format

Describe the structure of what the skill produces.
`);

  if (full) {
    const skeleton = path.join(repoRoot, "base", "skeleton");
    const copy = (relativePath) => {
      const target = path.join(dest, relativePath);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(path.join(skeleton, relativePath), target);
    };
    copy(".mcp.json");
    copy("CONNECTORS.md");
    copy("state_config.json");
    copy("commands/example-command.md");
    copy("agents/example-agent.md");
    copy("hooks/hooks.json");
    copy("schemas/example-output.schema.json");
    copy("scripts/README.md");
  }

  console.log(`\nScaffolded plugins/${name} (${full ? "full" : "minimal"}).\n`);
  console.log("Next steps:");
  console.log(`  1. Edit plugins/${name}/skills/example-skill/SKILL.md (rename the folder for a real skill).`);
  console.log(`  2. List it: add "source": "./plugins/${name}" to .claude-plugin/marketplace.json.`);
  console.log("  3. Run: npm run validate   (then: npm run catalog)");
  console.log(`  4. Canonical check: claude plugin validate plugins/${name}`);
  if (!full) {
    console.log("\nNeed commands, agents, connectors, hooks, or schemas? Re-run with --full, or copy from base/skeleton.");
  }
}

main();
