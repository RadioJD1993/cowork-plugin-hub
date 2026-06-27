# Plugin Authoring Guide

Everything you need to build a production-quality CoWork plugin from scratch.

## 1. Understand the Components

### plugin.json (Manifest)
The manifest tells Cowork what your plugin is. Located at `.claude-plugin/plugin.json`.

```json
{
  "name": "your-plugin",
  "version": "0.1.0",
  "description": "What this plugin does in one sentence.",
  "author": { "name": "Your Name" }
}
```

### Skills
Skills are markdown files Claude reads automatically when relevant context is detected. Each skill = one SKILL.md file in `skills/skill-name/`.

**SKILL.md frontmatter (required):**
```yaml
---
name: skill-name
description: When Claude should apply this skill.
triggers:
  - trigger phrase 1
  - trigger phrase 2
---
```

### Commands
Commands are slash commands the user triggers explicitly. Each command = one markdown file in `commands/`.

**Command frontmatter (required):**
```yaml
---
name: command-name
description: What this command does.
usage: /plugin-name:command-name [args]
---
```

### Subagents
Subagents are scoped Claude instances delegated a narrow task within a larger skill or command workflow. Define them in `subagents/agent-name.md`.

### .mcp.json (Connectors)
Wires your plugin to external tools. Each entry is an MCP server connection.

## 2. Write Effective Skills

- **One workflow per skill** — don't pack everything into one SKILL.md
- **Be specific about triggers** — vague triggers cause skills to fire at wrong times
- **Define output format** — tell Claude exactly what the output should look like
- **Handle edge cases** — what should Claude do when input is incomplete?

## 3. Write Effective Commands

- Commands should have predictable, consistent output
- Always define the `usage` pattern with argument documentation
- For multi-step commands, number the steps clearly
- Commands can call skills internally — reference them by name

## 4. Design Subagents

- Keep scope narrow: one subagent = one focused task
- Restrict `toolsAllowed` to only what the subagent needs
- Always define a structured return format
- Document what parent skill/command invokes this subagent

## 5. Validate

```bash
claude plugin validate plugins/your-plugin
```

Fix all errors before merging. Schema validation is authoritative.

## 6. Test in Cowork

1. Install your plugin locally
2. Trigger skills by using relevant language
3. Run each slash command
4. Verify MCP connector responses

## Reference

- [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) — canonical examples
- [TheDigitalGriot/cl-plugin-structure](https://github.com/TheDigitalGriot/cl-plugin-structure) — structure deep-dive and cowork-compatibility matrix
