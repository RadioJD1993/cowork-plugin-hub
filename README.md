# CoWork Plugin Hub

A public starter hub for Claude CoWork plugins. It provides a reusable plugin structure, safe authoring guidance, validation checks, and installable examples that other builders can fork without inheriting private workflow details.

This repository is intentionally privacy-first. It teaches the patterns behind production plugin bundles without publishing private client, firm, employee, tool, or local machine information.

## What Is Here

| Path | Purpose |
| --- | --- |
| `plugins/plugin-builder` | Installable helper plugin for planning, scaffolding, and validating new plugins. |
| `base/skeleton` | Copyable starter plugin with the expected folder structure. |
| `examples/minimal` | Smallest useful plugin example. |
| `examples/standard` | Example with a skill, command, and MCP connector placeholder. |
| `docs` | Authoring, connector, privacy, and packaging guidance. |
| `templates` | Copy-paste starters for manifests, skills, commands, MCP config, and subagents. |
| `scripts` | Local tooling for scaffolding and repository validation. |

## Quick Start

```bash
git clone https://github.com/RadioJD1993/cowork-plugin-hub.git
cd cowork-plugin-hub
npm run validate
```

To scaffold a new plugin:

```bash
bash scripts/new-plugin.sh
```

Then edit the new folder under `plugins/`, run validation, and open a pull request.

## Installable Plugin

The main branch currently publishes one general-purpose plugin:

```bash
claude plugin marketplace add RadioJD1993/cowork-plugin-hub
claude plugin install plugin-builder@cowork-plugin-hub
```

Domain plugins should only be listed in `.claude-plugin/marketplace.json` after they pass the privacy checklist and repository validator.

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
|-- subagents/
|   `-- agent-name.md
|-- hooks/
|   |-- hooks.json
|   `-- hook_name.py
|-- schemas/
|   `-- output.schema.json
|-- scripts/
|   `-- helper-script.py
`-- state_config.json
```

Only the manifest, README, and at least one skill are required for a useful plugin. Hooks, schemas, scripts, subagents, and state config are optional production patterns.

## Safety Rules

- Do not commit private plugin bundles (`*.plugin`), local settings, credentials, transcripts, client files, or organization-specific playbooks.
- Keep secrets in environment variables, never in `.mcp.json`.
- Keep custom privacy terms in an untracked `privacy.denylist` file.
- Run `npm run validate` before committing.
- Review `.claude-plugin/marketplace.json` whenever plugin paths change.

See [Privacy And Sanitization](./docs/privacy-and-sanitization.md) for the full checklist.

## Branch Strategy

| Branch | Purpose |
| --- | --- |
| `main` | Stable public hub, docs, templates, validation, and vetted installable plugins. |
| `feat/<domain>` | Work-in-progress domain plugin branches. Keep them private or unlisted until scrubbed. |
| `codex/*` | Review branches created by automation or assisted editing. |

## Contributing

Start with [CONTRIBUTING.md](./CONTRIBUTING.md), then read [Plugin Authoring Guide](./docs/plugin-authoring-guide.md).

## License

Apache-2.0. See [LICENSE](./LICENSE).
