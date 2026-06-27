# Privacy And Sanitization

This repository is public. Treat every committed file as something a stranger can read, fork, search, quote, and install.

## What Not To Commit

- Private plugin bundles, exports, transcripts, or generated work products
- Client, customer, employee, vendor, or matter details
- Personal names, emails, phone numbers, addresses, calendar links, or local usernames
- Internal organization names, domains, account IDs, or machine paths
- API keys, OAuth secrets, personal access tokens, private keys, cookies, or session data
- Internal strategy, proprietary playbooks, or prompts that only make sense inside one organization

## Safe Public Alternatives

| Private material | Public replacement |
| --- | --- |
| Client-specific workflow | Generic workflow with placeholder roles |
| Internal tool URL | Connector setup instructions using environment variables |
| Firm or company author | Public project or contributor identity |
| Local file path | Relative repo path |
| API key | `${ENV_VAR_NAME}` placeholder |
| Complete private plugin | Sanitized template, checklist, or example |

## Local Deny List

Create a local file named `privacy.denylist` with one sensitive term per line:

```text
private-company-name
private-domain.example
private-project-codename
```

`privacy.denylist` is ignored by Git. The validator reads it locally and fails if a term appears in tracked text.

## Review Workflow

1. Put sensitive local terms in `privacy.denylist`.
2. Run `npm run validate`.
3. Search changed files manually for private names and paths.
4. Confirm `.claude-plugin/marketplace.json` lists only vetted public plugins.
5. Confirm `.mcp.json` values use environment variable placeholders.
6. Commit only source docs, templates, and intentionally public plugin files.

## Sanitizing A Private Plugin

When turning a private plugin into a public plugin:

1. Start from `base/skeleton` rather than copying the private bundle wholesale.
2. Recreate the public structure: README, manifest, skills, commands, connectors, optional hooks and schemas.
3. Rewrite private workflows as reusable patterns.
4. Replace examples with fictional or generic examples.
5. Delete scripts that depend on local paths, private systems, or private data.
6. Run validation before adding the plugin to the marketplace.

Publishing the pattern is usually safer and more useful than publishing the original private implementation.
