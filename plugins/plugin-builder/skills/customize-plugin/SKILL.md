---
name: customize-plugin
description: Helps the user adapt an existing Cowork plugin locally — swapping connectors, refining a skill's description and workflow, and adjusting output formats — without committing private organization context. Use when the user says they want to customize, modify, or adapt a plugin, change its connectors, or "make it work the way our team does".
---

# Customize Cowork Plugin

## When To Apply

Apply this skill when the user wants to adapt an existing plugin to their specific organization, tools, terminology, or processes.

## Workflow

### Step 1: Identify What To Customize

Ask the user:

1. Which plugin are you customizing? Name or path.
2. What specifically needs to change?

Useful categories:

- Connectors: swap tools or add new ones.
- Skill activation: the `description` is too broad, too narrow, or uses the wrong language.
- Workflow steps: their process differs from the default.
- Output format: different structure or terminology.
- Local context: private terms or policies that should stay out of the shared plugin.

### Step 2: Keep Private Context Local

If adding organization-specific context, collect only what is needed and put it in a `[plugin-name].local.md` file. Tell the user this file must stay local and should not be committed (the repo's `.gitignore` already excludes `*.local.md`).

### Step 3: Connector Swaps

For connector changes, produce an updated `.mcp.json` with:

- Removed servers they do not use.
- Added servers they need (prefer `type: http` remote servers so they work in Cowork).
- Environment-variable placeholders for secrets.
- Notes for `CONNECTORS.md`.

### Step 4: Skill Edits

For skill modifications, produce the updated `SKILL.md` with:

- A revised `description` whose embedded activation phrases match the user's language (there is no separate `triggers:` field).
- Updated workflow steps that match their process.
- Adjusted output format.
- Missing-tool and missing-context behavior.

### Step 5: Deliver Local Config

Always produce a `[plugin-name].local.md` template for private context. Keep shared plugin changes generic enough for other users.

## Output Format

List each changed file with the full updated content. Add a brief note before each file explaining what changed and whether it belongs in the public plugin or a local ignored file.
