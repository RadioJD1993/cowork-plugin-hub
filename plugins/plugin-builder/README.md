# Plugin Builder

A meta-plugin for planning, scaffolding, customizing, and validating Cowork plugins. It guides you from an idea to an installable, **spec-compliant**, privacy-safe plugin.

## Installation

```bash
claude plugin install plugin-builder@cowork-plugin-hub
```

## Commands

| Command | What it does |
| --- | --- |
| `/plugin-builder:new-plugin [name]` | Plans and scaffolds a new, spec-compliant plugin. |
| `/plugin-builder:validate-plugin [path]` | Reviews an existing plugin for spec, structural, and privacy issues. |

## Skills

| Skill | Applies when |
| --- | --- |
| `create-plugin` | The user wants to build or scaffold a plugin, skill, command, or agent. |
| `customize-plugin` | The user wants to adapt an existing plugin safely, keeping private context local. |

## Agents

| Agent | Role |
| --- | --- |
| `privacy-reviewer` | Scans generated files for secrets, PII, and private organization details. |
| `spec-compliance-reviewer` | Confirms the manifest, frontmatter, and layout match the Cowork plugin spec. |

## What It Produces

- `.claude-plugin/plugin.json` (kebab-case `name`, plus `version`, `description`, and `author`)
- `README.md`
- `skills/*/SKILL.md` (frontmatter: `name` + `description`)
- `commands/*.md` when needed (frontmatter: `name` + `description`, optional `argument-hint`)
- `agents/*.md` when needed (auto-discovered from `agents/`)
- `.mcp.json` and `CONNECTORS.md` when connectors are needed (remote `http` servers for Cowork)
- Optional hooks, schemas, scripts, and state config when they solve a real problem

Every generated plugin is checked against the Cowork plugin spec and the hub's privacy rules, and is designed to pass `claude plugin validate` unmodified.
