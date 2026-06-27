# Subagent Patterns

Use a subagent when a parent skill or command needs a focused helper with a narrow task, fresh context, or limited tool permissions.

Do not use subagents just to split long instructions. If the work is one workflow, keep it in one skill.

## Good Uses

| Pattern | Use it for |
| --- | --- |
| Research helper | Searching or collecting documents before the parent synthesizes. |
| Classifier | Returning a narrow label with rationale and confidence. |
| Draft helper | Producing an initial structured draft for parent review. |
| Validator | Checking output against a schema or checklist. |

## Basic Spec

```markdown
---
name: risk-classifier
description: Classify one item into a small set of risk levels.
toolsAllowed: []
returnFormat: structured JSON
invokedBy:
  - skill: parent-skill
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

- Give the subagent one job.
- Restrict tools to only what it needs.
- Tell it what not to do.
- Define how it reports missing input.
- Let the parent skill format the final user-facing answer.
