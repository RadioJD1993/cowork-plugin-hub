# Skill Writing Guide

Skills are the most powerful component of a CoWork plugin. This guide covers everything you need to write skills that fire reliably, behave predictably, and produce high-quality output.

## What Is a Skill?

A skill is a markdown file Claude reads automatically when relevant context is detected in the conversation. Unlike commands (which require explicit invocation), skills fire based on semantic matching between the conversation and the skill's `triggers` list.

Think of a skill as a standing instruction set: "When the user does X, do Y."

## Skill Anatomy

```
skills/
└── your-skill-name/
    └── SKILL.md
```

Every `SKILL.md` has two parts: **frontmatter** (YAML) and **body** (Markdown).

### Frontmatter (required)

```yaml
---
name: skill-name          # Kebab-case, matches the directory name
description: "When Claude should apply this skill. One sentence, specific."
triggers:
  - trigger phrase one   # Exact phrases or topic keywords
  - trigger phrase two
  - keyword
---
```

**Rules for triggers:**
- Use phrases your users will actually say, not internal jargon
- Include both verb forms ("review this contract" AND "contract review")
- 3–8 triggers is ideal — too few misses cases, too many causes false fires
- Avoid single-word triggers unless the word is highly domain-specific

### Body (required)

The body is the instruction set Claude follows when the skill fires. Structure it with:
1. **Overview** — what the skill does (1 short paragraph)
2. **Workflow** — numbered steps Claude should follow
3. **Output Format** — exact specification of what the response should look like
4. **Edge Cases** — what to do when input is incomplete or out of scope

## Writing Effective Workflows

- **Number the steps** — Claude follows numbered steps more reliably than bullets
- **One action per step** — don't pack two decisions into one step
- **Use active verbs** — "Identify X", "Calculate Y", "Return Z"
- **Be explicit about what to look for** — don't say "check for problems"; say "check for X, Y, and Z"

## Defining Output Format

Always specify the output format explicitly. Claude will match it. Examples:

```markdown
## Output Format

Return a table with columns: | Risk | Clause | Recommendation |
Follow the table with a one-paragraph summary.
End with an Overall Rating: Low / Medium / High.
```

Be as specific as the use case demands. Legal and engineering plugins should have very specific formats. Creative or conversational skills can be looser.

## Handling Edge Cases

Always include an Edge Cases section. At minimum, address:
- **Incomplete input**: What should Claude ask for or assume?
- **Out-of-scope request**: How should Claude redirect?
- **Jurisdiction/context gaps**: Should Claude ask before proceeding?

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Vague triggers | Use phrases users actually say |
| No output format | Always specify headers, tables, or structure |
| Too many steps in one skill | Split into two skills |
| No edge case handling | Add a dedicated Edge Cases section |
| Missing frontmatter | Always include name, description, triggers |

## Testing Your Skill

1. Install the plugin in CoWork
2. Have a natural conversation that should trigger the skill
3. Verify the skill fires (Claude follows the workflow)
4. Test each trigger phrase
5. Test the edge cases you defined

Validate the file structure before testing:
```bash
claude plugin validate plugins/your-plugin
```
