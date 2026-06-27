# Plugin Name

One-paragraph description of what this plugin does, who it helps, and what problem it solves.

## Target Users

- Role A: primary use case.
- Role B: secondary use case.

## Installation

```bash
claude plugin install plugin-name@cowork-plugin-hub
```

## Quick Start

1. Install the plugin.
2. Configure connectors if the plugin uses MCP.
3. Try one natural-language request that should trigger the skill.
4. Run any slash commands documented below.

## Commands

| Command | What it does |
| --- | --- |
| `/plugin-name:example-command` | Description |

## Skills

| Skill | Description |
| --- | --- |
| `example-skill` | Description |

## Configuration

Keep private configuration outside the repository. If you need local notes, create an ignored file such as `plugin-name.local.md`.

## File Structure

```text
plugin-name/
|-- .claude-plugin/plugin.json
|-- .mcp.json
|-- README.md
|-- CONNECTORS.md
|-- commands/
|   `-- example-command.md
|-- skills/
|   `-- example-skill/SKILL.md
|-- subagents/
|   `-- example-subagent.md
|-- hooks/
|   `-- hooks.json
|-- schemas/
|   `-- example-output.schema.json
|-- scripts/
|   `-- README.md
`-- state_config.json
```
