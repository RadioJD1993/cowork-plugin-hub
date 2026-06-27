# Legal Plugin — Connector Setup

## GitHub MCP (Case Document Storage)

Used to read and write case documents, briefs, and discovery materials from your GitHub repositories.

### Setup
1. Generate a GitHub Personal Access Token at https://github.com/settings/tokens
2. Grant `repo` scope (read/write access to private repositories)
3. Set the token as an environment variable:
   ```bash
   export GITHUB_TOKEN=your_token_here
   ```
4. The plugin will automatically connect to the GitHub MCP server.

### What It Enables
- Pull case documents directly from your repositories
- Push drafted briefs, demand letters, and settlement agreements
- Track document versions via Git history

## Optional: Clio or MyCase Integration

For practice management system integration, configure your firm's API credentials in `.mcp.json` following the MCP connector guide in `/docs/mcp-connector-guide.md`.
