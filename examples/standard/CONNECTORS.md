# Standard Example — Connector Setup

## GitHub MCP

1. Create a GitHub Personal Access Token: https://github.com/settings/tokens
2. Grant `repo` scope.
3. Set environment variable:
   ```bash
   export GITHUB_TOKEN=your_token_here
   ```

The plugin will automatically connect to the GitHub MCP server on first use.
