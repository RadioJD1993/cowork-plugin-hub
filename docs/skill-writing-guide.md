# Skill Writing Guide

Skills are the core of a CoWork plugin. A good skill is focused, easy to trigger, and specific about its output.

## Skill Anatomy

```text
skills/
`-- your-skill-name/
    `-- SKILL.md
```

Every `SKILL.md` has YAML frontmatter and a Markdown body. The spec requires
only two fields: `name` and `description`.

```yaml
---
name: your-skill-name
description: What the skill does and when Claude should apply it, with the activating phrases embedded directly here.
---
```

> There is **no `triggers:` field**. Older drafts of this hub used one; it is
> not part of the spec and the validator now rejects it. Put the trigger
> phrases inside the `description`.

## Activation Comes From The Description

Claude decides when to apply a skill by matching the conversation against the
`description`. Write it so it names the situations and the phrases users
actually type:

- Use phrases users actually say, in action form ("review this contract") and
  noun form ("document review").
- Name 3 to 8 representative situations or phrases.
- Be specific. A vague description fires at the wrong times; an over-broad one
  fires constantly.
- Keep `description` under ~1,024 characters — the platform truncates long
  descriptions in the skill listing, which wastes context and hurts activation.

Example:

```yaml
description: Summarizes a document, article, or file the user shares. Use when the user shares content and asks for a summary, says "tldr", "give me the key points", or "what does this say".
```

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
| A separate `triggers:` field | Delete it; embed the phrases in `description`. |
| Vague description | Name the real situations and user phrases. |
| Description over ~1,024 chars | Tighten it; the listing truncates long text. |
| No output format | Specify sections or fields. |
| Too much scope | Split into multiple skills. |
| No edge cases | Add missing-input and out-of-scope behavior. |
| Private examples | Replace with generic examples. |

## Testing

1. Install the plugin locally.
2. Try natural language that should trigger the skill.
3. Try near-miss language that should **not** trigger it. If it fires anyway,
   the description is too broad.
4. If it never fires, the description does not name the user's actual phrasing.
5. Run each edge case.
6. Run `npm run validate` and `claude plugin validate <plugin-path>` before
   opening a pull request.
