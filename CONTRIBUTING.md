# Contributing to CoWork Plugin Hub

## How to Contribute

### Adding a New Plugin

1. Branch from `main`: `git checkout -b feat/your-plugin-name`
2. Scaffold your plugin: `bash scripts/new-plugin.sh`
3. Follow the [Plugin Authoring Guide](./docs/plugin-authoring-guide.md)
4. Validate: `claude plugin validate plugins/your-plugin-name`
5. Open a PR targeting `main` with:
   - A filled-out plugin README
   - At least 2 skills with proper SKILL.md frontmatter
   - A working plugin.json manifest
   - CONNECTORS.md if using MCP servers

### Improving an Existing Plugin

- Work on the corresponding `feat/` branch (e.g., `feat/legal` for the legal plugin)
- Keep skill files focused — one workflow per SKILL.md
- Do not change `plugin.json` version without updating the changelog in the plugin's README

### Adding to Docs or Templates

- Docs PRs can go directly to `main`
- Keep template files generic and heavily commented

## PR Review Checklist

- [ ] `plugin.json` is valid JSON with name, version, description, author
- [ ] All SKILL.md files have required frontmatter (`name`, `description`, `triggers`)
- [ ] No hardcoded credentials or secrets in `.mcp.json`
- [ ] README explains what the plugin does and how to configure it
- [ ] Ran `claude plugin validate .` with no errors

## Code of Conduct

Be direct, be helpful, don't be a jerk.
