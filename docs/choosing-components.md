# Choosing a Component: Skill vs Command vs Agent vs MCP

A Cowork plugin is built from four kinds of parts. Pick the smallest set that does
the job — a single skill is a complete, useful plugin.

| Component | What it is | Use it when | Triggered by |
| --- | --- | --- | --- |
| **Skill** | Instructions Claude applies automatically | You want Claude to *recognize a situation* and act (review a contract, summarize a file) | The skill's `description` matches the conversation |
| **Command** | An explicit `/namespace:name` action | The user wants to *deliberately invoke* a workflow, optionally with arguments | The user types the slash command |
| **Agent** | A focused subtask in its own context | A step needs *isolation* (heavy search, an independent review) and a structured hand-back | Dispatched by a skill, command, or the main agent |
| **MCP connector** | A remote tool or data source | The plugin must *reach an external system* (a SaaS API, a hosted dataset) | Called while a skill, command, or agent runs |

## Quick rules

- **Default to a skill.** Most plugins are one or more skills.
- Add a **command** only when the user benefits from invoking it by name (and maybe passing arguments).
- Add an **agent** only when a subtask genuinely needs its own context window or a clean structured result — not just to "organize" instructions.
- Add an **MCP connector** only when you truly need an external system. In Cowork it must be a remote `http`/`sse` server (no local `stdio`) — see [mcp-connector-guide.md](./mcp-connector-guide.md).

## Cowork caveats

- Skills, commands, and agents are plain markdown; connectors are JSON in `.mcp.json`.
- Agents live in `agents/` (not `subagents/`) and are dispatch-only in Cowork.
- A skill's activation contract is its `description` — there is no `triggers:` field.
- A command has no `usage:` field; document arguments with `argument-hint`.

See also: [skill-writing-guide.md](./skill-writing-guide.md), [subagent-patterns.md](./subagent-patterns.md), and [cowork-vs-cli.md](./cowork-vs-cli.md) for what runs where.
