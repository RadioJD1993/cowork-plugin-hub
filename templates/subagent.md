---
name: subagent-name
description: What this subagent does. Keep it narrow: one focused task per subagent.
toolsAllowed:
  - read_file
  - search
returnFormat: structured JSON
invokedBy:
  - skill: parent-skill-name
  - command: parent-command-name
---

# Subagent Name

One-paragraph description of the narrow task this subagent performs.

## Task

Describe the specific task this subagent is delegated:

1. **Step one** - what the subagent does first.
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

- List what the subagent must not do.
- Keep scope narrow; if it needs to do more, split it into two subagents.
- Always return only the structured output; let the parent format it.
