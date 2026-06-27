---
name: create-plugin
description: >
  Guides the user through building a new CoWork plugin from scratch.
  Fires when the user asks to build a plugin, create a skill, scaffold a new agent,
  or set up a CoWork plugin.
triggers:
  - build a plugin
  - create a plugin
  - scaffold a plugin
  - new skill
  - new command
  - new subagent
  - plugin structure
---

# Create CoWork Plugin

## When to Apply

Apply this skill when the user wants to build a new CoWork plugin, add a skill to an existing plugin, create a slash command, or scaffold a subagent.

## Workflow

### Step 1: Gather Requirements

Ask the user:
1. **Name**: What should the plugin be called? (kebab-case, e.g., `legal-intake`)
2. **Purpose**: What job function or workflow does it serve?
3. **Target users**: Who will use it? (role, team, firm type)
4. **Skills needed**: What should Claude do automatically? List 3-5 trigger scenarios.
5. **Commands needed**: What explicit slash commands are needed?
6. **Connectors**: What external tools should it connect to? (Slack, Box, DocuSign, etc.)
7. **Subagents**: Are there focused sub-tasks that should be delegated?

### Step 2: Generate the Manifest

Produce a `plugin.json`:

```json
{
  "name": "[plugin-name]",
  "version": "0.1.0",
  "description": "[one-sentence description]",
  "author": { "name": "[author]" }
}
```

### Step 3: Generate Each Skill

For each skill the user described, produce a `SKILL.md` with:
- Complete YAML frontmatter (name, description, triggers)
- Clear "When to Apply" section
- Numbered workflow steps
- Defined output format
- Edge case handling

### Step 4: Generate Each Command

For each slash command, produce a `command-name.md` with:
- Frontmatter (name, description, usage)
- Step-by-step instructions
- Argument documentation
- Example invocations

### Step 5: Generate Subagents (if needed)

For each subagent, produce an `agent-name.md` with:
- Narrow scope definition
- Minimal `toolsAllowed` list
- Structured return format
- Reference to parent skill/command

### Step 6: Generate .mcp.json

Based on the connectors list, produce a `.mcp.json` with the appropriate MCP server entries. Reference `docs/mcp-connector-guide.md` for URLs.

### Step 7: Generate README and CONNECTORS.md

Produce a complete plugin README with installation instructions, command table, skill table, and configuration guide. Produce a CONNECTORS.md listing all configured servers.

### Step 8: Deliver

Present the complete plugin as a file tree with all files ready to copy into the repo. Tell the user:
1. Where to place the files: `plugins/[plugin-name]/`
2. How to validate: `claude plugin validate plugins/[plugin-name]`
3. How to install locally for testing

## Output Format

```
## Plugin: [name]

**Files generated:**
- `.claude-plugin/plugin.json`
- `skills/[skill-name]/SKILL.md` (x N)
- `commands/[command-name].md` (x N)
- `subagents/[agent-name].md` (x N, if applicable)
- `.mcp.json`
- `CONNECTORS.md`
- `README.md`

[Full file contents follow]
```
