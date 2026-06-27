# Plugin Builder

A meta-plugin for planning, scaffolding, customizing, and validating CoWork plugins.

## Installation

```bash
claude plugin install plugin-builder@cowork-plugin-hub
```

## Commands

| Command | What it does |
| --- | --- |
| `/plugin-builder:new-plugin [name]` | Plans and scaffolds a new plugin. |
| `/plugin-builder:validate-plugin [path]` | Reviews an existing plugin for structural and privacy issues. |

## Skills

| Skill | Description |
| --- | --- |
| `create-plugin` | Applies when a user wants to build or scaffold a plugin. |
| `customize-plugin` | Applies when a user wants to adapt an existing plugin safely. |

## What It Produces

- `.claude-plugin/plugin.json`
- `README.md`
- `skills/*/SKILL.md`
- `commands/*.md` when needed
- `subagents/*.md` when needed
- `.mcp.json` and `CONNECTORS.md` when connectors are needed
- Optional hooks, schemas, scripts, and state config when they solve a real problem
