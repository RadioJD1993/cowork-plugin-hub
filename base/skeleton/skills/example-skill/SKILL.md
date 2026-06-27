---
name: example-skill
description: A short, specific description of when Claude should apply this skill and what outcome it produces. Embed the situations and phrases that should activate it, e.g. "Use when the user shares meeting notes and asks for action items, says 'what are my follow-ups', or wants decisions extracted from a discussion."
---

# Example Skill

## When to Apply

The `description` above is what activates this skill — there is no separate
`triggers:` field. Make the description name the exact situations and phrases
that should fire it, and be specific so it does not trigger at the wrong times.

## What to Do

Step-by-step instructions for Claude. Use numbered lists for sequential steps, bullets for parallel options.

1. First, gather context: [what information to collect]
2. Then, analyze: [how to process that information]
3. Finally, deliver: [what format and content the output should have]

## Output Format

Describe the expected output structure. Example:

```
**Summary**: [1-2 sentence overview]
**Key Findings**: [bulleted list]
**Recommended Action**: [clear next step]
```

## Edge Cases

- If [condition], then [how to handle it]
- If information is missing, ask for: [specific fields needed]
