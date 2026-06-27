# Cowork vs. Claude Code CLI

This hub targets **Claude Cowork** plugins. Most plugin components behave the
same in Cowork and the Claude Code CLI, but a few do not. Build to the Cowork
subset and your plugin will also work in the CLI.

## Compatibility Matrix

| Component | Claude Code CLI | Cowork |
| --- | --- | --- |
| Skills (`skills/*/SKILL.md`) | ✅ Full | ✅ Full |
| Slash commands (`commands/*.md`) | ✅ Full | ✅ Full |
| Agents (`agents/*.md`) | ✅ Full | ✅ Dispatch-only (no foreground/background agent UI) |
| MCP servers (`.mcp.json`) | ✅ stdio + remote | ⚠️ Remote only (`http`/`sse`); no local `stdio` |
| Hooks (`hooks/hooks.json`) | ✅ Full | ⚠️ Limited; some lifecycle events (e.g. `SessionStart`) and file-watch events may no-op |
| LSP servers | ✅ | ❌ Not supported |
| Worktree isolation | ✅ | ❌ Not supported |
| Monitors / output styles | ✅ | ❌ Not supported |

## What this means for plugin authors

- **Connectors:** use remote MCP servers (`type: http` or `sse`). A local
  `stdio` server will simply not load in Cowork. If you must ship a stdio
  server for CLI users, document that it is CLI-only in `CONNECTORS.md`.
- **Agents:** design them to be *dispatched* by a skill or command and to
  return structured output. Do not rely on the CLI's interactive agent UI.
  Plugin agents cannot set `hooks`, `mcpServers`, or `permissionMode`.
- **Hooks:** treat them as a CLI enhancement, not a Cowork requirement. Do not
  make a plugin's core value depend on a hook firing in Cowork.
- **Graceful degradation:** every workflow should still help a user when a
  connector or optional component is unavailable. State the fallback explicitly
  in the skill/command body.

## Install surfaces

- **Cowork:** Customize → Plugins → Add marketplace → paste
  `https://github.com/RadioJD1993/cowork-plugin-hub`, then install a plugin.
- **Claude Code CLI:**
  ```bash
  claude plugin marketplace add RadioJD1993/cowork-plugin-hub
  claude plugin install plugin-builder@cowork-plugin-hub
  ```
