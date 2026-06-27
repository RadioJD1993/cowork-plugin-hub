# Contributing To CoWork Plugin Hub

Thanks for helping make reusable CoWork plugin patterns easier to share.

## Contribution Flow

1. Branch from `main`.
2. Scaffold a plugin with `bash scripts/new-plugin.sh` or copy `base/skeleton`.
3. Keep public content generic and reusable.
4. Run `npm run validate`.
5. Open a pull request that explains what changed and what you tested.

## Adding A New Plugin

New installable plugins belong under `plugins/<plugin-name>`.

Each plugin should include:

- `.claude-plugin/plugin.json`
- `README.md`
- At least one `skills/<skill-name>/SKILL.md`
- Commands, subagents, hooks, schemas, scripts, and connectors only when they are actually needed
- `CONNECTORS.md` if the plugin depends on MCP servers or external tools

Only add a plugin to `.claude-plugin/marketplace.json` after the plugin is useful, documented, and privacy-reviewed.

## Privacy Checklist

Before opening a pull request, confirm that the change does not include:

- Private client, customer, employee, vendor, or case details
- Internal organization names, domains, addresses, phone numbers, or emails
- Local machine paths or usernames
- API keys, OAuth secrets, personal access tokens, private keys, or session cookies
- Private plugin bundles, transcripts, exports, or generated working files
- Organization-specific prompts that would reveal confidential strategy or processes

For custom terms that only matter locally, create an untracked `privacy.denylist` file with one term per line. The validator reads it when present.

## Review Checklist

- [ ] `npm run validate` passes.
- [ ] Marketplace paths exist and point to installable plugins.
- [ ] Each skill has focused triggers and a clear output format.
- [ ] `.mcp.json` uses environment variables for secrets.
- [ ] README explains setup without exposing private accounts or tools.
- [ ] The plugin can still help a user who is not part of the original organization.

## Style

- Prefer plain Markdown and JSON.
- Keep templates generic.
- Use ASCII unless a file already requires another character set.
- Explain behavior directly; avoid marketing copy inside plugin instructions.
