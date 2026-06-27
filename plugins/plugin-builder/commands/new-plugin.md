---
name: new-plugin
description: Interactive guided workflow to build a new CoWork plugin from scratch and produce files ready to install.
usage: /plugin-builder:new-plugin [optional: plugin-name]
---

# New Plugin Command

## What It Does

Runs the full `create-plugin` skill workflow interactively, gathering requirements and producing a complete plugin package.

## Steps

1. If a plugin name was provided as an argument, use it; otherwise ask for one.
2. Run the `create-plugin` skill workflow, steps 1 through 8.
3. Output all generated files in a structured file tree.
4. Provide install and validation instructions.

## Example

```text
/plugin-builder:new-plugin research-brief
```

Produces a complete plugin with manifest, skills, commands, `.mcp.json`, and README.
