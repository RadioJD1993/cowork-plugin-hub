# Plugin Authoring Guide

Use this guide to build a production-quality CoWork plugin that is useful to strangers and safe to publish.

## Start From The Skeleton

```bash
bash scripts/new-plugin.sh
```

The scaffolder creates a plugin under `plugins/<name>`. You can also copy `base/skeleton` manually.

## Required Files

The spec requires only `.claude-plugin/plugin.json` with a `name`. For a
publishable, useful plugin, include:

- `.claude-plugin/plugin.json`
- `README.md`
- At least one `skills/<skill-name>/SKILL.md`

Plugins that expose slash commands should add `commands/*.md`. Plugins that connect to tools should add `.mcp.json` and `CONNECTORS.md`.

## Optional Production Files

Use optional folders only when they carry real weight:

| Path | Use it when |
| --- | --- |
| `agents/` | A workflow needs delegated focused work with a narrow input and output contract. (Auto-discovered as `/plugin-name:agent-name`. Do not call this folder `subagents/` — it will be ignored.) |
| `hooks/` | The plugin needs lifecycle checks or automation. (Hooks are CLI-oriented and limited in Cowork — see [cowork-vs-cli.md](./cowork-vs-cli.md).) |
| `schemas/` | Commands, agents, or scripts return structured JSON that should be validated. |
| `scripts/` | Local processing is clearer as code than as Markdown instructions. |
| `state_config.json` | The plugin needs documented non-secret state shape or defaults. |

Do not add optional code or config just to look complete. Small plugins are easier to install, review, and trust.

## Manifest

`.claude-plugin/plugin.json` identifies the plugin.

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

`name` must be kebab-case. Only `name` is strictly required; `version`,
`description`, and `author` are strongly recommended (the hub validator
requires them). Descriptions should say what the plugin helps with.

## Skills

Skills are Markdown instruction files that Claude reads when the conversation
matches their `description`. Frontmatter is `name` + `description` only — the
activating phrases go inside the description (there is no `triggers:` field).

```yaml
---
name: skill-name
description: When Claude should apply this skill, e.g. "Use when the user asks to review a report or says 'summarize this document'".
---
```

Write one workflow per skill. Give Claude a clear sequence, output format, and edge-case behavior. See [skill-writing-guide.md](./skill-writing-guide.md).

## Commands

Commands are explicit slash-command workflows. Frontmatter is `name` +
`description`, with an optional `argument-hint` (there is no `usage:` field).

```yaml
---
name: command-name
description: What this command does.
argument-hint: "[args]"
---
```

Commands should be predictable. If a command needs missing input, tell Claude exactly what to ask for.

## Agents

Agents are delegated helpers in `agents/`. Frontmatter is `name` +
`description`, with optional `tools` and `model`. See
[subagent-patterns.md](./subagent-patterns.md). Plugin-provided agents cannot
set `hooks`, `mcpServers`, or `permissionMode`.

## Connectors

`.mcp.json` wires a plugin to MCP servers. Keep it valid JSON and use
environment variables for secrets. **For Cowork, use remote servers**
(`type: http` or `sse`); local `stdio` servers run only in the Claude Code CLI.

```json
{
  "mcpServers": {
    "example": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "headers": {
        "Authorization": "Bearer ${EXAMPLE_TOKEN}"
      }
    }
  }
}
```

Document setup in `CONNECTORS.md`. Include missing-connector behavior in skills and commands. See [mcp-connector-guide.md](./mcp-connector-guide.md).

## Privacy Review

Before publishing, remove:

- Personal names, private organization names, emails, phone numbers, and local paths
- Client, customer, employee, vendor, or matter details
- Internal prompts, strategy, and playbooks that should not be public
- Hardcoded secrets and tokens
- Generated plugin bundles or exports

Run `npm run validate`. For project-specific terms, add an untracked `privacy.denylist` file before running validation.

## Publish Checklist

- `npm run validate` passes (schema + privacy).
- `claude plugin validate plugins/<name>` passes (the canonical check).
- README explains installation and usage.
- The marketplace entry uses a `source` path (e.g. `"source": "./plugins/<name>"`), and the marketplace root has `name` + `owner`.
- The plugin remains useful without private context.
