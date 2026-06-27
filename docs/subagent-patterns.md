# Agent Patterns

Use an agent when a parent skill or command needs a focused helper with a narrow task, fresh context, or limited tool permissions.

Agents live in the plugin's `agents/` directory and are auto-discovered as
`/plugin-name:agent-name`. (Do not use a `subagents/` folder — it is not
discovered.) In Cowork, agents are dispatch-only: a skill or command delegates
to them; there is no foreground/background agent UI as in the CLI.

Do not use an agent just to split long instructions. If the work is one workflow, keep it in one skill.

## Good Uses

| Pattern | Use it for |
| --- | --- |
| Research helper | Searching or collecting documents before the parent synthesizes. |
| Classifier | Returning a narrow label with rationale and confidence. |
| Draft helper | Producing an initial structured draft for parent review. |
| Validator | Checking output against a schema or checklist. |

## Basic Spec

Frontmatter requires `name` + `description`. `tools` and `model` are optional.
Plugin-provided agents cannot set `hooks`, `mcpServers`, or `permissionMode`.

```markdown
---
name: risk-classifier
description: Classify one item into a small set of risk levels. Dispatched by the parent skill when a single item needs a labeled risk rating.
tools: Read, Grep
model: inherit
---
```

## Return Contract

Prefer structured output:

```json
{
  "result": "low | medium | high",
  "confidence": "high | medium | low",
  "rationale": "short explanation",
  "missing": []
}
```

## Design Rules

- Give the agent one job.
- Restrict `tools` to only what it needs.
- Tell it what not to do.
- Define how it reports missing input.
- Let the parent skill format the final user-facing answer.
