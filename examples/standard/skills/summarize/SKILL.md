---
name: summarize
description: Summarizes any document, article, or file shared in the conversation. Fires when the user shares content and asks for a summary.
triggers:
  - summarize this
  - summary of this
  - tldr
  - give me the key points
  - what does this say
---

# Summarize Skill

When this skill fires, produce a structured summary of the shared content.

## Workflow

1. Identify the content type (article, code, legal document, technical doc, email, etc.).
2. Extract the key points — what the document says, not how it says it.
3. Identify any action items, deadlines, or decisions buried in the content.
4. Flag anything that looks important but ambiguous.

## Output Format

- **What This Is**: One sentence identifying the document type and topic.
- **Key Points**: 3–5 bullet points of the most important content.
- **Action Items**: Any tasks, deadlines, or decisions required (or "None identified").
- **Flags**: Anything ambiguous, concerning, or that warrants follow-up (or "None").
