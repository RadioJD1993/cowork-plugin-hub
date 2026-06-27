---
name: customize-plugin
description: >
  Helps the user customize an existing CoWork plugin for their organization —
  adding company context, swapping connectors, adjusting workflows, and tuning
  skill triggers to match how their team actually works.
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

## When to Apply

Apply this skill when the user wants to adapt an existing plugin to their specific organization, tools, terminology, or processes.

## Workflow

### Step 1: Identify What to Customize

Ask the user:
1. Which plugin are you customizing? (name or path)
2. What specifically needs to change?
   - Connectors (swap tools, add new ones)
   - Skill triggers (too broad, too narrow, wrong language)
   - Workflow steps (your process differs from the default)
   - Output format (different structure or terminology)
   - Company context (your firm name, practice areas, standard positions)

### Step 2: Company Context

If adding company context, collect:
- Organization name and type
- Key terminology specific to their practice or team
- Standard positions or policies (e.g., for legal: standard NDA terms, escalation thresholds)
- Tools they actually use (vs. defaults)

This context should go in a `[plugin-name].local.md` file, NOT in the shared plugin files.

### Step 3: Connector Swaps

For connector changes, produce an updated `.mcp.json` with:
- Removed servers they don't use
- Added servers they need
- Correct OAuth or API key configuration

### Step 4: Skill Edits

For skill modifications, produce the updated `SKILL.md` with:
- Revised triggers that match their language
- Updated workflow steps that match their process
- Adjusted output format

### Step 5: Deliver the local.md config

Always produce a `[plugin-name].local.md` template the user can fill in with their org-specific context. This file stays local and is never committed to the shared repo.

## Output Format

List each changed file with the full updated content. Highlight what changed with a brief comment above each section.
