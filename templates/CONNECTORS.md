# Connectors

This plugin connects to external tools via MCP servers defined in `.mcp.json`.

## Configured Servers

| Server | Purpose | Auth | Required env var |
| --- | --- | --- | --- |
| `example-remote` | What this connector is used for | Bearer token | `EXAMPLE_API_TOKEN` |

## Cowork vs. Claude Code CLI

Cowork supports **remote** MCP servers only (`type: http` or `type: sse`).
Local `stdio` servers (`command`/`args`) run in the Claude Code CLI but are
**not** available in Cowork. Prefer a hosted `http` endpoint so the plugin
works in both. See `docs/cowork-vs-cli.md` in the hub for the full comparison.

## How to Add a Connector

1. Find the MCP server URL for your tool.
2. Add it to `.mcp.json` under `mcpServers` (use `type: http` for Cowork).
3. Configure auth (OAuth, bearer token) with an environment-variable
   placeholder such as `${EXAMPLE_API_TOKEN}` — never a literal secret.
4. Add a row to the table above.

## Missing-connector behavior

Every connector-dependent workflow should state what to do when the tool is
unavailable, e.g. "If the connector is unavailable, ask the user to paste the
content directly. Do not invent results."
