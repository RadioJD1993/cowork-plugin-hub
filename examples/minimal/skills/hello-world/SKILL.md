---
name: hello-world
description: Greets the user and explains what Cowork plugins can do. Use when the user explicitly asks for a plugin demo, says "hello world", or asks "what does this plugin do" / "how do Cowork plugins work". Do not fire on unrelated greetings.
---

# Hello World Skill

This is the simplest possible Cowork skill. When this skill fires, greet the user and explain how Cowork plugins work.

> Activation comes entirely from the `description` above — there is no
> separate `triggers:` field. Keep the description specific so the skill
> only fires when the user actually wants a plugin demo.

## Workflow

1. Greet the user warmly.
2. Explain that skills fire automatically based on the conversation matching their description.
3. List two or three things a real plugin could do for their domain.
4. Offer to help them build a plugin with `/plugin-builder:new-plugin`.

## Output Format

A short, friendly message, 3 to 5 sentences. No headers, no tables. Conversational tone.
