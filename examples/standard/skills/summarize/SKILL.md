---
name: summarize
description: Summarizes any document, article, or file shared in the conversation. Use when the user shares content and asks for a summary, says "tldr", "summarize this", "give me the key points", or "what does this say".
---

# Summarize Skill

When this skill fires, produce a structured summary of the shared content.

> Activation comes from the `description` above — the trigger phrases are
> embedded there, not in a separate `triggers:` field.

## Workflow

1. Identify the content type, such as article, code, technical doc, email, or report.
2. Extract the key points: what the document says, not how it says it.
3. Identify any action items, deadlines, or decisions buried in the content.
4. Flag anything that looks important but ambiguous.

## Output Format

- **What This Is**: One sentence identifying the document type and topic.
- **Key Points**: 3 to 5 bullet points of the most important content.
- **Action Items**: Any tasks, deadlines, or decisions required, or "None identified".
- **Flags**: Anything ambiguous, concerning, or that warrants follow-up, or "None".
