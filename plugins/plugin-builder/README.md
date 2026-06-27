# Plugin Builder

A meta-plugin for building other CoWork plugins. Install this first — it gives Claude a guided workflow for creating, customizing, and validating any plugin in this hub.

## Installation

```bash
claude plugins add cowork-plugin-hub/plugin-builder
```

## Commands

| Command | What it does |
|---------|--------------|
| `/plugin-builder:new-plugin [name]` | Builds a complete new plugin from scratch |
| `/plugin-builder:validate-plugin [path]` | Validates an existing plugin for structural issues |

## Skills

| Skill | Description |
|-------|-------------|
| `create-plugin` | Fires when you ask to build or scaffold a plugin; runs the full guided workflow |
| `customize-plugin` | Fires when you want to adapt an existing plugin to your org's tools and processes |

## What It Produces

For a new plugin, you get:
- `.claude-plugin/plugin.json` — manifest
- `skills/*/SKILL.md` — one per skill you described
- `commands/*.md` — one per slash command
- `subagents/*.md` — one per subagent (if needed)
- `.mcp.json` — connector config
- `CONNECTORS.md` — human-readable connector guide
- `README.md` — full plugin documentation
