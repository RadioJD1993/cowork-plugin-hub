# Subagent Patterns

How to design effective subagents in CoWork plugins.

## When to Use a Subagent

Use a subagent when a skill or command needs to delegate a focused, self-contained task that:
- Has a clear input/output contract
- Benefits from a fresh context window
- Can run in parallel with other subagents
- Needs strict tool permissions (limited toolsAllowed)

Do NOT use a subagent just to break up long instructions — that's what skill sections are for.

## Patterns

### Pattern 1: Research Subagent
Delegate document lookup, search, or data gathering to a subagent, then pass structured results back to the parent.

```markdown
---
name: document-lookup
scope: Find and summarize a specific document from connected storage
toolsAllowed:
  - box_search
  - egnyte_search
  - read_file
---
```

### Pattern 2: Draft Subagent
Delegate initial drafting to a subagent, then have the parent skill refine and finalize.

```markdown
---
name: contract-drafter
scope: Draft initial redline language for a specific contract clause
toolsAllowed: []
---
```

### Pattern 3: Classifier Subagent
Delegate classification or triage decisions (e.g., GREEN/YELLOW/RED) to a subagent with a strict output schema.

```markdown
---
name: risk-classifier
scope: Classify a contract clause as LOW, MEDIUM, or HIGH risk
toolsAllowed: []
outputSchema:
  classification: "LOW | MEDIUM | HIGH"
  rationale: string
  escalate: boolean
---
```

## Return Format Best Practices

Always define a structured return format in the subagent spec. JSON is preferred for programmatic consumption:

```json
{
  "result": "...",
  "confidence": "high | medium | low",
  "missing": ["field1", "field2"]
}
```
