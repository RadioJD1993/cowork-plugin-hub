# MCP Connector Guide

MCP connectors let a plugin call external tools and data sources. Keep connector config minimal, documented, and safe to publish.

## Cowork supports remote servers

Cowork can use **remote** MCP servers only — `type: http` or `type: sse` with a
`url`. Local `stdio` servers (a `command` plus `args` that launch a local
binary) run in the Claude Code CLI but are **not** available in Cowork. Since
this hub is for Cowork plugins, prefer a hosted `http` endpoint so the plugin
works in both surfaces. See [cowork-vs-cli.md](./cowork-vs-cli.md).

## Basic Shape (remote, Cowork-compatible)

```json
{
  "mcpServers": {
    "server-name": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "headers": {
        "Authorization": "Bearer ${SERVER_TOKEN}"
      }
    }
  }
}
```

Local stdio form (Claude Code CLI only):

```json
{
  "mcpServers": {
    "server-name": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-name"],
      "env": { "SERVER_TOKEN": "${SERVER_TOKEN}" }
    }
  }
}
```

Use valid JSON. Do not put comments in `.mcp.json`; put explanations in `CONNECTORS.md`.

## CONNECTORS.md

Document:

- What each connector is used for
- Which environment variables are required
- How to create or locate the credential outside the repository
- What functionality degrades when the connector is missing
- Minimum permissions or scopes needed

## Security Rules

- Never hardcode API keys or tokens in `.mcp.json`.
- Prefer OAuth or least-privilege tokens.
- Use environment-variable placeholders such as `${SERVER_TOKEN}`.
- Do not commit personal access token screenshots or setup exports.
- Skills and commands must handle missing tools gracefully.

## Missing Connector Behavior

Every connector-dependent workflow should say what to do when a tool is unavailable:

```markdown
If the repository connector is unavailable, ask the user to paste the relevant file or provide a public URL.
Do not invent repository contents.
```

That small instruction prevents brittle workflows and makes plugins easier to use in different environments.
