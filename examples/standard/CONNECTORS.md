# Standard Example Connector Setup

## GitHub MCP (remote)

This example uses GitHub's **remote** MCP server (`type: http`), which works in
both Cowork and the Claude Code CLI. (A local `stdio` GitHub server would run in
the CLI only — Cowork supports remote servers, not local binaries.)

1. Create a GitHub personal access token at https://github.com/settings/tokens.
2. Grant only the scopes needed for your use case.
3. Set an environment variable outside this repository:

   ```bash
   export GITHUB_TOKEN=your_token_here
   ```

The example references the token via the `${GITHUB_TOKEN}` placeholder in
`.mcp.json` (`Authorization: Bearer ${GITHUB_TOKEN}`). Never commit a real token.

| Server | Purpose | Auth | Required env var |
| --- | --- | --- | --- |
| `github` | Fetch files from GitHub repositories | Bearer PAT | `GITHUB_TOKEN` |
