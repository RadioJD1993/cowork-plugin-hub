# CoWork Plugin Hub

[![Validate](https://github.com/RadioJD1993/cowork-plugin-hub/actions/workflows/validate.yml/badge.svg)](https://github.com/RadioJD1993/cowork-plugin-hub/actions/workflows/validate.yml)
[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](#requirements)

A privacy-first hub for building **Claude Cowork** plugins — a general-purpose plugin builder plus a catalog of vetted, installable plugins. Build skills, slash commands, agents, and MCP connectors from a shared base, and ship plugins that are spec-compliant and safe to publish.

Everything here is intentionally generic: it teaches the patterns behind production plugins without publishing private client, firm, employee, tool, or local-machine details.

**What you get:** a guided plugin builder, a copyable skeleton, copy-paste component templates, three worked examples, an end-to-end tutorial, and a privacy + spec validator (with a test suite) — all **Cowork-correct by construction**.

**Why a Cowork-specific hub?** Cowork is not the Claude Code CLI: it runs remote MCP connectors only (no local `stdio`), discovers agents from `agents/`, and activates skills from their `description` (no `triggers:` field). Plugins here follow those rules by default, so they install and run in Cowork without surprises — see [docs/cowork-vs-cli.md](./docs/cowork-vs-cli.md).

Browse the generated catalog in [docs/catalog.md](./docs/catalog.md), or use [docs/catalog.json](./docs/catalog.json) from tools and demos.

## Contents

[Catalog](#plugin-catalog) · [Install](#install) · [What Is Here](#what-is-here) · [Quick Start](#quick-start-for-contributors) · [Plugin Anatomy](#plugin-anatomy) · [Documentation](#documentation) · [Safety](#safety-rules) · [Branch Strategy](#branch-strategy) · [Contributing](#contributing)

## Plugin Catalog

| Plugin | Tier | What it does | Connectors |
| --- | --- | --- | --- |
| **[plugin-builder](./plugins/plugin-builder)** | `verified` | Guided, validated workflow to create, customize, and validate Cowork plugins. | None |

Every catalog entry carries a **trust tier** — `verified` (maintainer-reviewed),
`example` (teaching only), or `community` (listed but not vetted). What each tier
means and what `verified` requires is in [VETTING.md](./VETTING.md); what
installing a plugin actually grants is in [docs/plugin-security.md](./docs/plugin-security.md).

> Domain plugins (legal, engineering, etc.) are developed on `feat/<domain>` branches and merged into this catalog once they pass the privacy checklist and the validator.

## Install

**In Cowork:** Customize → Plugins → Add marketplace → paste
`https://github.com/RadioJD1993/cowork-plugin-hub`, then install a plugin from the list.

**In the Claude Code CLI:**

```bash
claude plugin marketplace add RadioJD1993/cowork-plugin-hub
claude plugin install plugin-builder@cowork-plugin-hub
```

## What Is Here

| Path | Purpose |
| --- | --- |
| `plugins/plugin-builder` | Installable meta-plugin for planning, scaffolding, and validating new plugins. |
| `base/skeleton` | Copyable starter plugin with the expected folder structure. |
| `examples/minimal` | Smallest useful plugin example. |
| `examples/standard` | Example with a skill, command, and a remote MCP connector. |
| `examples/hugging-face-space` | Example for calling public Hugging Face Spaces safely. |
| `docs` | Authoring, skill, agent, connector, privacy, and Cowork-vs-CLI guidance. |
| `docs/catalog.md` | Generated public plugin catalog. |
| `templates` | Copy-paste starters for manifests, skills, commands, agents, and MCP config. |
| `scripts` | Local tooling for scaffolding and repository validation. |
| `spaces/cowork-plugin-catalog` | Ready-to-publish Hugging Face static Space for the catalog. |

## What This Is / Is Not

- **Is:** a public starter hub, a spec-compliant plugin builder, and a vetted marketplace you can install from.
- **Is not:** a package manager, a place for private/organization-specific plugins, or a dumping ground for generated bundles. Keep private adaptations in local, git-ignored files.

## Quick Start (for contributors)

```bash
git clone https://github.com/RadioJD1993/cowork-plugin-hub.git
cd cowork-plugin-hub
npm run validate
npm run catalog
```

Scaffold a new plugin (cross-platform; defaults to a minimal plugin, add `--full` for every component):

```bash
npm run new
# non-interactive: npm run new -- my-plugin "What it does" "Your Name"
```

On macOS/Linux (or Windows Git Bash) you can also run `bash scripts/new-plugin.sh`.

Then edit the new folder under `plugins/`, list it in `.claude-plugin/marketplace.json` with a `source` path, run validation, and open a pull request.

## Plugin Anatomy

Production plugins in this hub follow this shape:

```text
plugin-name/
|-- .claude-plugin/
|   `-- plugin.json
|-- .mcp.json
|-- README.md
|-- CONNECTORS.md
|-- commands/
|   `-- command-name.md
|-- skills/
|   `-- skill-name/
|       `-- SKILL.md
|-- agents/
|   `-- agent-name.md
|-- hooks/
|   `-- hooks.json
|-- schemas/
|   `-- output.schema.json
|-- scripts/
|   `-- helper-script.py
`-- state_config.json
```

Only the manifest, README, and at least one skill are required for a useful plugin. Commands, agents, connectors, hooks, schemas, scripts, and state config are optional. Agents must live in `agents/` (not `subagents/`) to be discovered, and Cowork uses remote MCP connectors only — see [docs/cowork-vs-cli.md](./docs/cowork-vs-cli.md).

## Documentation

Start at the **[documentation index](./docs/README.md)**, which groups everything by what you are doing. Highlights:

- **New here:** [Build Your First Plugin](./docs/tutorial-first-plugin.md) · [Cowork vs. CLI](./docs/cowork-vs-cli.md) · [Glossary](./docs/glossary.md)
- **Authoring:** [Authoring Guide](./docs/plugin-authoring-guide.md) · [Choosing a Component](./docs/choosing-components.md) · [Skills](./docs/skill-writing-guide.md) · [Agents](./docs/subagent-patterns.md) · [MCP Connectors](./docs/mcp-connector-guide.md) · [Troubleshooting](./docs/troubleshooting.md) · [FAQ](./docs/faq.md)
- **Publishing & trust:** [Privacy and Sanitization](./docs/privacy-and-sanitization.md) · [Vetting and Trust Tiers](./VETTING.md) · [Plugin Security](./docs/plugin-security.md) · [Hugging Face Spaces](./docs/hugging-face-spaces.md)
- **Maintaining:** [GitHub Maintenance](./docs/github-maintenance.md) · [Generated Catalog](./docs/catalog.md)

## Safety Rules

- Do not commit private plugin bundles (`*.plugin`), local settings, credentials, transcripts, client files, or organization-specific playbooks.
- Keep secrets in environment variables, never in `.mcp.json`.
- Keep custom privacy terms in an untracked `privacy.denylist` file.
- Run `npm run validate` before committing.
- Review `.claude-plugin/marketplace.json` whenever plugin sources change.

See [Privacy and Sanitization](./docs/privacy-and-sanitization.md) for the full checklist, and [SECURITY.md](./SECURITY.md) if you find a leaked secret or vulnerability. For what installing a third-party plugin grants and how plugins are vetted or delisted, see [docs/plugin-security.md](./docs/plugin-security.md) and [VETTING.md](./VETTING.md).

## Branch Strategy

| Branch | Purpose |
| --- | --- |
| `main` | Stable public hub: docs, templates, validation, and the vetted catalog. |
| `feat/<domain>` | Work-in-progress domain plugins. Keep unlisted until privacy-reviewed, then merge the folder into `plugins/` and add it to the catalog. |
| `codex/*` | Review branches created by automation or assisted editing. |

## Requirements

Node.js >= 18 for the local validator and scaffolder. The Claude Code CLI is required for `claude plugin validate` and CLI installs.

## Contributing

Start with [CONTRIBUTING.md](./CONTRIBUTING.md), then read the [Plugin Authoring Guide](./docs/plugin-authoring-guide.md). Please follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

Apache-2.0. See [LICENSE](./LICENSE).
