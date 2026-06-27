# Engineering Plugin — Connector Setup

## GitHub MCP (Code & Repository Access)

Used to read code, open PRs, fetch issues, and write files to your repositories.

### Setup
1. Generate a GitHub Personal Access Token at https://github.com/settings/tokens
2. Grant `repo` scope (read/write access to private repositories) and `pull_requests:write`
3. Set the token as an environment variable:
   ```bash
   export GITHUB_TOKEN=your_token_here
   ```
4. The plugin will automatically connect to the GitHub MCP server.

### What It Enables
- Read and review pull requests and code files
- Post code review comments inline
- Fetch issues and project boards
- Push generated files (architecture docs, checklists, runbooks)

## Optional: Slack / PagerDuty Integration

For incident response workflows, configure your Slack webhook or PagerDuty API key following the MCP connector guide in `/docs/mcp-connector-guide.md`.
