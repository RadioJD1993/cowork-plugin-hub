# Plugin Authoring Guide

Use this guide to build a production-quality CoWork plugin that is useful to strangers and safe to publish.

## Start From The Skeleton

```bash
bash scripts/new-plugin.sh
```

The scaffolder creates a plugin under `plugins/<name>`. You can also copy `base/skeleton` manually.

## Required Files

Every publishable plugin should include:

- `.claude-plugin/plugin.json`
- `README.md`
- At least one `skills/<skill-name>/SKILL.md`

Plugins that expose slash commands should add `commands/*.md`. Plugins that connect to tools should add `.mcp.json` and `CONNECTORS.md`.

## Optional Production Files

Use optional folders only when they carry real weight:

| Path | Use it when |
| --- | --- |
| `subagents/` | A workflow needs delegated focused work with a narrow input and output contract. |
| `hooks/` | The plugin needs lifecycle checks, validation, or packaging-time automation. |
| `schemas/` | Commands, hooks, or scripts return structured JSON that should be validated. |
| `scripts/` | Local processing is clearer as code than as Markdown instructions. |
| `state_config.json` | The plugin needs documented non-secret state shape or defaults. |

Do not add optional code or config just to look complete. Small plugins are easier to install, review, and trust.

## Manifest

`plugin.json` identifies the plugin.

```json
{
  "name": "your-plugin",
  "version": "0.1.0",
  "description": "What this plugin does in one sentence.",
  "author": {
    "name": "Your public author name or organization"
  }
}
```

Names should be kebab-case. Descriptions should say what the plugin helps with, not how impressive it is.

## Skills

Skills are Markdown instruction files that Claude reads when the conversation matches their trigger language.

```yaml
---
name: skill-name
description: When Claude should apply this skill.
triggers:
  - review this report
  - summarize this document
---
```

Write one workflow per skill. Give Claude a clear sequence, output format, and edge-case behavior.

## Commands

Commands are explicit slash-command workflows.

```yaml
---
name: command-name
description: What this command does.
usage: /plugin-name:command-name [args]
---
```

Commands should be predictable. If a command needs missing input, tell Claude exactly what to ask for.

## Connectors

`.mcp.json` wires a plugin to MCP servers. Keep it valid JSON and use environment variables for secrets:

```json
{
  "mcpServers": {
    "example": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-example"],
      "env": {
        "EXAMPLE_TOKEN": "${EXAMPLE_TOKEN}"
      }
    }
  }
}
```

Document setup in `CONNECTORS.md`. Include missing-connector behavior in skills and commands.

## Privacy Review

Before publishing, remove:

- Personal names, private organization names, emails, phone numbers, and local paths
- Client, customer, employee, vendor, or matter details
- Internal prompts, strategy, and playbooks that should not be public
- Hardcoded secrets and tokens
- Generated plugin bundles or exports

Run `npm run validate`. For project-specific terms, add an untracked `privacy.denylist` file before running validation.

## Publish Checklist

- `npm run validate` passes.
- `claude plugin validate plugins/<name>` passes when available.
- README explains installation and usage.
- Marketplace entry points to a real plugin path.
- The plugin remains useful without private context.
