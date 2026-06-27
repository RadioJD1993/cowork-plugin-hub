# Skill Writing Guide

Skills are the core of a CoWork plugin. A good skill is focused, easy to trigger, and specific about its output.

## Skill Anatomy

```text
skills/
`-- your-skill-name/
    `-- SKILL.md
```

Every `SKILL.md` has frontmatter and a Markdown body.

```yaml
---
name: your-skill-name
description: When Claude should apply this skill.
triggers:
  - phrase users actually say
  - another trigger phrase
---
```

## Triggers

- Use phrases users actually type.
- Include action forms such as "review this" and noun forms such as "document review".
- Prefer 3 to 8 triggers.
- Avoid broad single-word triggers unless the word is highly specific.

## Body Structure

Use these sections unless the skill is very small:

1. Overview: what the skill does.
2. Workflow: numbered steps Claude should follow.
3. Output Format: exact sections, tables, or fields to return.
4. Edge Cases: what to do when input is incomplete, out of scope, or risky.

## Workflow Tips

- Keep one workflow per skill.
- Use active verbs: identify, compare, calculate, draft, validate.
- Make assumptions explicit.
- Define when Claude should ask a follow-up question.
- Include connector fallback behavior when tools may be missing.

## Output Format

Be precise:

```markdown
Return:

1. Summary: 2 to 3 sentences.
2. Findings: table with columns Issue, Evidence, Recommendation.
3. Next Step: one concrete action.
```

## Common Mistakes

| Mistake | Fix |
| --- | --- |
| Vague triggers | Use realistic user phrases. |
| No output format | Specify sections or fields. |
| Too much scope | Split into multiple skills. |
| No edge cases | Add missing-input and out-of-scope behavior. |
| Private examples | Replace with generic examples. |

## Testing

1. Install the plugin locally.
2. Try natural language that should trigger the skill.
3. Try near-miss language that should not trigger the skill.
4. Run each edge case.
5. Run repository validation before opening a pull request.
