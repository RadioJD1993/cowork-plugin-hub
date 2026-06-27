# Standard Example Connector Setup

## GitHub MCP

1. Create a GitHub token at https://github.com/settings/tokens.
2. Grant only the scopes needed for your use case.
3. Set an environment variable outside this repository:

   ```bash
   export GITHUB_TOKEN=your_token_here
   ```

The example uses the `GITHUB_TOKEN` environment variable placeholder in `.mcp.json`. Do not commit real token values.
