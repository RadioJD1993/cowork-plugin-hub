---
name: validate-plugin
description: Check an existing plugin for structural issues before installing or merging.
usage: /plugin-builder:validate-plugin [plugin-path]
---

# Validate Plugin Command

## What It Does

Runs a checklist review of a plugin directory, flagging missing required files, bad frontmatter, and common structural issues.

## Checklist

- [ ] `.claude-plugin/plugin.json` exists and is valid JSON
- [ ] `plugin.json` has `name`, `version`, `description`, `author`
- [ ] All SKILL.md files have `name`, `description`, and `triggers` frontmatter
- [ ] All command files have `name`, `description`, and `usage` frontmatter
- [ ] `.mcp.json` exists (warn if absent, not an error)
- [ ] No hardcoded secrets or tokens in `.mcp.json`
- [ ] README.md exists

## Steps

1. List all files in the plugin directory
2. Run each checklist item
3. Report PASS / WARN / FAIL for each item
4. Summarize: total issues, severity, recommended fixes
