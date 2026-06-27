# MCP Connector Guide

How to wire your CoWork plugin to external tools.

## What is MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is the standard for connecting Claude to external tools and data sources. Each connection is defined in your plugin's `.mcp.json`.

## Basic .mcp.json Structure

```json
{
  "mcpServers": {
    "server-name": {
      "type": "http",
      "url": "https://mcp.server.com/mcp",
      "oauth": {
        "clientId": "YOUR_CLIENT_ID",
        "callbackPort": 3118
      }
    }
  }
}
```

## Common Servers by Category

### Communication
| Tool | URL | Auth |
|------|-----|------|
| Slack | `https://mcp.slack.com/mcp` | OAuth |
| Microsoft Teams | (via Microsoft 365 MCP) | OAuth |

### Document Storage
| Tool | URL | Auth |
|------|-----|------|
| Box | `https://mcp.box.com` | OAuth |
| Egnyte | `https://mcp-server.egnyte.com/mcp` | OAuth |
| Google Drive | TBD | OAuth |

### Project Management
| Tool | URL | Auth |
|------|-----|------|
| Atlassian (Jira/Confluence) | `https://mcp.atlassian.com/v1/mcp` | OAuth |
| Linear | (community MCP) | API Key |

### E-Signature & Legal
| Tool | URL | Auth |
|------|-----|------|
| DocuSign | `https://mcp.docusign.com/mcp` | OAuth |

### Microsoft 365
| Tool | URL | Auth |
|------|-----|------|
| Microsoft 365 | (official MS MCP endpoint) | OAuth |

## Security Rules

- **Never** hardcode API keys or tokens in `.mcp.json`
- Use OAuth flows wherever available
- For API-key-based servers, document where the key should be set (environment variable)
- The plugin degrades gracefully when a connector is unavailable — always handle the missing-tool case in your skills
