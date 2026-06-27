---
name: agent-name
description: What this agent does and when Claude should delegate to it. Keep it narrow: one focused task per agent.
tools: Read, Grep, Glob
model: inherit
---

# Agent Name

One-paragraph description of the narrow task this agent performs.

> Agents live in the plugin's `agents/` directory (auto-discovered as
> `/plugin-name:agent-name`). Only `name` and `description` are required;
> `tools` and `model` are optional. Plugin-provided agents cannot set
> `hooks`, `mcpServers`, or `permissionMode` — those are ignored.

## Task

Describe the specific task this agent is delegated:

1. **Step one** - what the agent does first.
2. **Step two** - what it does next.
3. **Step three** - final output.

## Output Format

```json
{
  "field_name": "description of value",
  "another_field": []
}
```

## Constraints

- List what the agent must not do.
- Keep scope narrow; if it needs to do more, split it into two agents.
- Return only the structured output; let the parent format the user-facing answer.
