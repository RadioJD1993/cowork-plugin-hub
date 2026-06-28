# Troubleshooting

Common errors when building or validating a plugin, with the fix. Run
`npm run validate` for the structural and privacy checks, and
`claude plugin validate <plugin>` for the canonical check.

## Validation errors

| Message contains | Cause | Fix |
| --- | --- | --- |
| `frontmatter key "triggers"` | A skill has a `triggers:` key | Remove it; put the activating situations and phrases in `description`. See [skill-writing-guide.md](./skill-writing-guide.md). |
| `frontmatter key "usage"` | A command has a `usage:` key | Remove it; use `argument-hint` (quote it if it contains brackets). |
| `rename "subagents/" to "agents/"` | Agents are in `subagents/` | Move them to `agents/`; only `agents/` is auto-discovered. |
| `local/stdio connector` | `.mcp.json` declares a `stdio`/command server | Use a remote `http`/`sse` server with a `url`. Cowork cannot run local servers. See [mcp-connector-guide.md](./mcp-connector-guide.md). |
| `not listed in .claude-plugin/marketplace.json` | The plugin folder is not in the marketplace | Add a `source` entry, or add its path to `metadata.wip` while it is unfinished. |
| `local source must start with "./"` | A `source` is `plugins/x` | Use `"./plugins/x"`. |
| `possible <secret / PII>` | A key, token, email, or local path is in a tracked file | Remove it; use a `${ENV_VAR}` placeholder. If it was a real secret, follow [SECURITY.md](../SECURITY.md). |
| `is out of date. Run npm run catalog` | The generated catalog is stale | Run `npm run catalog` and commit the result. |

## Behavior problems

| Symptom | Cause | Fix |
| --- | --- | --- |
| A skill never activates | `description` is too narrow or vague | Rewrite it to name concrete situations and phrases. See [skill-writing-guide.md](./skill-writing-guide.md). |
| A skill fires too often | `description` is too broad | Scope it to the specific task. |
| A connector does nothing in Cowork | It is a local `stdio` server | Cowork supports remote connectors only. See [cowork-vs-cli.md](./cowork-vs-cli.md). |
| `bash scripts/new-plugin.sh` fails on Windows | No bash on `PATH` | Run it in Git Bash, use `npm run new` (the cross-platform scaffolder), or copy `base/skeleton`. |

## See also

- [FAQ](./faq.md)
- [Glossary](./glossary.md)
- [Plugin Authoring Guide](./plugin-authoring-guide.md)
