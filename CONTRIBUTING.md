# Contributing To CoWork Plugin Hub

Thanks for helping make reusable CoWork plugin patterns easier to share. Please also read our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Contribution Flow

1. Branch from `main` (use `feat/<domain>` for a new domain plugin).
2. Scaffold a plugin with `npm run new` (cross-platform), `bash scripts/new-plugin.sh`, or copy `base/skeleton`.
3. Keep public content generic and reusable.
4. List the plugin in `.claude-plugin/marketplace.json` (see below).
5. Run `npm run validate` and, when the CLI is available, `claude plugin validate`.
6. Open a pull request using the template; explain what changed and what you tested.

## Adding A New Plugin (monorepo catalog)

This repo is a single marketplace: every installable plugin is a folder under
`plugins/` and is listed once in `.claude-plugin/marketplace.json`. One
`/plugin marketplace add` exposes the whole catalog.

New installable plugins belong under `plugins/<plugin-name>` and should include:

- `.claude-plugin/plugin.json` (kebab-case `name`; `version`, `description`, `author` recommended)
- `README.md`
- At least one `skills/<skill-name>/SKILL.md` (frontmatter: `name` + `description`)
- Commands, agents, hooks, schemas, scripts, and connectors only when actually needed
- `CONNECTORS.md` if the plugin depends on MCP servers (use remote `http`/`sse` servers for Cowork)

Then add an entry to the `plugins` array in `.claude-plugin/marketplace.json`:

```json
{
  "name": "your-plugin",
  "displayName": "Your Plugin",
  "source": "./plugins/your-plugin",
  "description": "What it does (10-2000 characters).",
  "version": "0.1.0",
  "author": { "name": "Your public name" }
}
```

Use `source` (a path starting with `./`), **not** `path`. Only add a plugin to the marketplace after it is useful, documented, and privacy-reviewed.

## Branch & Commit Conventions

- Branches: `feat/<domain>` for new plugins, `fix/<short-desc>` for fixes, `docs/<short-desc>` for docs.
- Commits: short imperative subject ("Add legal-intake skill"); reference issues where relevant.
- Bump the plugin's `version` (and the `version` in its marketplace entry / `metadata.version`) when you make a user-facing change, and add a `CHANGELOG.md` entry.

## Privacy Checklist

Before opening a pull request, confirm the change does not include:

- Private client, customer, employee, vendor, or case details
- Internal organization names, domains, addresses, phone numbers, or emails
- Local machine paths or usernames
- API keys, OAuth secrets, personal access tokens, private keys, or session cookies
- Private plugin bundles, transcripts, exports, or generated working files
- Organization-specific prompts that would reveal confidential strategy or processes

For custom terms that only matter locally, create an untracked `privacy.denylist` file with one term per line. The validator reads it when present. If you ever commit a secret, see [SECURITY.md](./SECURITY.md).

## Review Checklist

- [ ] `npm run validate` passes.
- [ ] `claude plugin validate` passes (when the CLI is available).
- [ ] The marketplace entry uses `source` and points to a real plugin folder.
- [ ] Each skill has a focused `description` (with triggers embedded) and a clear output format.
- [ ] `.mcp.json` uses environment variables for secrets and remote servers for Cowork.
- [ ] README explains setup without exposing private accounts or tools.
- [ ] The plugin can still help a user who is not part of the original organization.

## Style

- Prefer plain Markdown and JSON.
- Keep templates generic.
- Use ASCII unless a file already requires another character set.
- Explain behavior directly; avoid marketing copy inside plugin instructions.
