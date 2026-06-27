---
name: customize-plugin
description: >
  Helps the user customize an existing CoWork plugin locally by adjusting
  connectors, triggers, workflows, and output formats without committing
  private organization context.
triggers:
  - customize plugin
  - modify plugin
  - adapt plugin
  - update skill
  - change connectors
  - organization-specific
  - our team does it differently
---

# Customize CoWork Plugin

## When To Apply

Apply this skill when the user wants to adapt an existing plugin to their specific organization, tools, terminology, or processes.

## Workflow

### Step 1: Identify What To Customize

Ask the user:

1. Which plugin are you customizing? Name or path.
2. What specifically needs to change?

Useful categories:

- Connectors: swap tools or add new ones.
- Skill triggers: too broad, too narrow, or wrong language.
- Workflow steps: their process differs from the default.
- Output format: different structure or terminology.
- Local context: private terms or policies that should stay out of the shared plugin.

### Step 2: Keep Private Context Local

If adding organization-specific context, collect only what is needed and put it in a `[plugin-name].local.md` template. Tell the user this file must stay local and should not be committed.

### Step 3: Connector Swaps

For connector changes, produce an updated `.mcp.json` with:

- Removed servers they do not use.
- Added servers they need.
- Environment variable placeholders for secrets.
- Notes for `CONNECTORS.md`.

### Step 4: Skill Edits

For skill modifications, produce the updated `SKILL.md` with:

- Revised triggers that match the user's language.
- Updated workflow steps that match the process.
- Adjusted output format.
- Missing-tool and missing-context behavior.

### Step 5: Deliver Local Config

Always produce a `[plugin-name].local.md` template for private context. Keep shared plugin changes generic enough for other users.

## Output Format

List each changed file with the full updated content. Add a brief note before each file explaining what changed and whether it belongs in the public plugin or a local ignored file.
