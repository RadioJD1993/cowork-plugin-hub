# Glossary

Short definitions of terms used across this hub.

- **Plugin** — an installable bundle: a manifest plus any skills, commands, agents, connectors, and supporting files.
- **Manifest** — `.claude-plugin/plugin.json`: the plugin's `name`, `version`, `description`, and `author`.
- **Marketplace** — `.claude-plugin/marketplace.json`: the catalog of installable plugins, each pointing at a `source`.
- **Skill** — instructions Claude applies automatically when a situation matches the skill's `description`.
- **Command** — an explicit `/namespace:name` action the user invokes.
- **Agent** — a focused subtask run in its own context and dispatched on demand; lives in `agents/`.
- **MCP connector** — a remote (`http`/`sse`) tool or data source declared in `.mcp.json`. Cowork supports remote connectors only.
- **Frontmatter** — the `---`-delimited YAML block at the top of a skill, command, or agent file.
- **Source** — a marketplace entry's pointer to a plugin: a local path (`./plugins/x`) or an external object (`github`/`npm`/`url`/`git-subdir`).
- **Trust tier** — a catalog entry's review level: `verified`, `example`, or `community`. See [VETTING.md](../VETTING.md).
- **Remote MCP** — an `http`/`sse` MCP server reachable over the network; the only kind Cowork runs.
- **stdio MCP** — a local MCP server launched as a subprocess; CLI-only, not supported in Cowork.
- **Dispatch-only** — an agent that runs only when invoked by another component, not autonomously.
- **Static Space** — a Hugging Face Space that serves static files; here, the live catalog site.
- **Privacy denylist** — an untracked `privacy.denylist` file of local terms the validator also scans for.
