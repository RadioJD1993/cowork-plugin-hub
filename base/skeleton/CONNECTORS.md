# Connectors

This plugin connects to external tools via MCP servers defined in `.mcp.json`.

## Configured Servers

| Server | Purpose | Auth |
|--------|---------|------|
| (none configured yet) | | |

## How to Add a Connector

1. Find the MCP server URL for your tool
2. Add it to `.mcp.json` under `mcpServers`
3. Configure auth (OAuth, API key, etc.) per the server's docs
4. Update this file with the new entry

## Common MCP Servers

| Tool | URL |
|------|-----|
| Slack | `https://mcp.slack.com/mcp` |
| Box | `https://mcp.box.com` |
| Atlassian | `https://mcp.atlassian.com/v1/mcp` |
| DocuSign | `https://mcp.docusign.com/mcp` |
| Egnyte | `https://mcp-server.egnyte.com/mcp` |
