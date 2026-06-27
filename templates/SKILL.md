---
name: skill-name
description: What this skill does and when Claude should apply it. Embed the real trigger phrases directly in this sentence, e.g. "Use when the user asks to review a contract, says 'summarize this report', or shares a document and wants the key points." Be specific; vague descriptions cause the skill to fire at the wrong times. Keep this under ~1,024 characters (the platform truncates long descriptions).
---

# Skill Name

One-paragraph description of what this skill does and the problem it solves.

> Skills auto-activate from the `description` above — there is no separate
> `triggers:` field. Write the description so it names the situations and
> phrases that should activate the skill.

## Workflow

1. **Step one** - describe what Claude should do first.
2. **Step two** - describe the next action.
3. **Step three** - and so on.

## Output Format

Describe exactly what the output should look like:

- Use headers? Bullets? Tables? Specify them.
- Define any specific sections that must always appear.
- State the expected length or level of detail.

## Edge Cases

- What should Claude do if input is incomplete?
- What should Claude do if the request is out of scope for this skill?
- What caveats or disclaimers should always be included?
