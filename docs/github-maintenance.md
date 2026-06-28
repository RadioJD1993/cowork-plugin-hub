# GitHub Maintenance

This repo uses GitHub for branch protection, validation, labels, and releases. Keep the settings simple enough for solo maintenance while still protecting the public catalog.

## Repository Settings

Recommended settings:

| Setting | Recommended value | Why |
| --- | --- | --- |
| Protect `main` | Enabled | Keeps public releases reviewed and validated. |
| Require pull requests | Enabled | Prevents accidental direct pushes to the public catalog. |
| Required status check | `validate` | Runs schema, structure, privacy, and catalog checks. |
| Allow auto-merge | Enabled | Lets passing PRs merge without babysitting. |
| Allow update branch | Enabled | Lets contributors refresh stale PRs from the UI. |
| Allow force pushes | Disabled | Protects release history. |
| Allow deletions | Disabled | Protects the default branch. |

The `validate` workflow job name is intentionally stable because branch protection keys off the status context.

## Repository Discoverability

These live in GitHub repo settings, not in tracked files, so set them once in the UI:

- **Description:** a one-line, keyword-rich summary, e.g. "A privacy-first hub and builder for Claude Cowork plugins — skills, slash commands, agents, and remote MCP connectors."
- **Topics:** `claude-code`, `claude-cowork`, `mcp`, `plugins`, `plugin-marketplace`, `skills`, `anthropic`, `ai-agents`. Topics power GitHub topic pages and search.
- **Social preview image:** add one under Settings -> General so shared links render a card.
- **Discussions:** enable under Settings -> General -> Features. The issue chooser ([../.github/ISSUE_TEMPLATE/config.yml](../.github/ISSUE_TEMPLATE/config.yml)) already links to it; the link is inert until Discussions is on.

## Labels

Labels are defined in [../.github/labels.json](../.github/labels.json) and synced by the `Sync labels` workflow on `main` or manually through GitHub Actions.

Local dry run:

```bash
npm run labels:check
```

Authenticated local sync:

```bash
GITHUB_TOKEN=<token> npm run labels:sync
```

## Catalog

The public catalog is generated from `.claude-plugin/marketplace.json` and local plugin metadata.

```bash
npm run catalog
npm run catalog:check
```

Generated outputs:

- [catalog.md](./catalog.md)
- [catalog.json](./catalog.json)
- [../spaces/cowork-plugin-catalog/catalog.json](../spaces/cowork-plugin-catalog/catalog.json)

## Releases

Create a version tag to publish a release package:

```bash
git tag v0.2.0
git push origin v0.2.0
```

The release workflow validates the hub, checks generated catalog files, stages the public marketplace artifacts, creates a tarball, and attaches it to the GitHub release.
