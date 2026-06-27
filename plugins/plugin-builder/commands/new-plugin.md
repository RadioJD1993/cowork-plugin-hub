---
name: new-plugin
description: Interactive guided workflow to build a new Cowork plugin from scratch and produce installable, spec-compliant files.
argument-hint: "[plugin-name]"
---

# New Plugin Command

## What It Does

Runs the full `create-plugin` skill workflow interactively, gathering requirements and producing a complete, spec-compliant plugin package.

## Steps

1. If a plugin name was provided as an argument, use it; otherwise ask for one.
2. Run the `create-plugin` skill workflow, steps 1 through 9 (including the privacy and spec review).
3. Output all generated files in a structured file tree.
4. Provide install and validation instructions (`npm run validate`, then `claude plugin validate`).

## Example

```text
/plugin-builder:new-plugin research-brief
```

Produces a complete plugin with manifest, skills, optional commands and agents, `.mcp.json` (if needed), and README.
