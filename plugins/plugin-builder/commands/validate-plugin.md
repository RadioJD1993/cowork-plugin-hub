---
name: validate-plugin
description: Check an existing plugin for spec, structural, and privacy issues before installing or merging.
argument-hint: "[plugin-path]"
---

# Validate Plugin Command

## What It Does

Reviews a plugin directory against the Cowork plugin spec and the hub's privacy rules, then runs the canonical validator. Flags missing required files, bad frontmatter, non-compliant manifests, and common structural issues.

## Checklist

- [ ] `.claude-plugin/plugin.json` exists and is valid JSON
- [ ] `plugin.json` has a kebab-case `name` (and, recommended, `version`, `description`, `author`)
- [ ] Each `skills/*/SKILL.md` has `name` + `description` frontmatter (no invented `triggers:` key; triggers live in the description)
- [ ] Each `commands/*.md` has `name` + `description` frontmatter (optional `argument-hint`; no `usage:` key)
- [ ] Agents, if any, live in `agents/` (not `subagents/`) with `name` + `description`
- [ ] `.mcp.json`, if present, uses `${ENV_VAR}` placeholders — no hardcoded secrets — and prefers `type: http` for Cowork
- [ ] `README.md` exists
- [ ] If listed in `.claude-plugin/marketplace.json`, the entry uses `source` (not `path`)

## Steps

1. List all files in the plugin directory.
2. Run each checklist item; dispatch `/plugin-builder:privacy-reviewer` and `/plugin-builder:spec-compliance-reviewer` when available.
3. Report PASS / WARN / FAIL for each item.
4. Run the hub validator (`npm run validate`) and, when the CLI is available, the canonical validator (`claude plugin validate [plugin-path]`).
5. Summarize: total issues, severity, and recommended fixes.
