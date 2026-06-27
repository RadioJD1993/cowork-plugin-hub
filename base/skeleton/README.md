# Plugin Name

One-paragraph description of what this plugin does, who it's for, and what problems it solves.

## Target Users

- **Role A** — Primary use case
- **Role B** — Secondary use case

## Installation

```bash
claude plugins add cowork-plugin-hub/plugin-name
```

## Quick Start

1. Install the plugin
2. Configure your local settings file (see below)
3. Connect your tools via MCP (see CONNECTORS.md)

## Commands

| Command | What it does |
|---------|--------------|
| `/plugin-name:example-command` | Description |

## Skills

| Skill | Description |
|-------|-------------|
| `example-skill` | Description |

## Configuration

Create a `plugin-name.local.md` file to customize behavior for your organization:

```markdown
# Plugin Config

## Your Settings
- Setting 1: value
- Setting 2: value
```

## File Structure

```
plugin-name/
├── .claude-plugin/plugin.json
├── .mcp.json
├── commands/
│   └── example-command.md
├── skills/
│   └── example-skill/SKILL.md
├── subagents/
│   └── example-subagent.md
├── CONNECTORS.md
└── README.md
```
