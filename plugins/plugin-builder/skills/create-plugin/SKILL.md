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

## When To Apply

Apply this skill when the user wants to build a new CoWork plugin, add a skill to an existing plugin, create a slash command, or scaffold a subagent.

## Workflow

### Step 1: Gather Requirements

Ask the user:

1. **Name**: What should the plugin be called? Use kebab-case, such as `research-brief`.
2. **Purpose**: What workflow does it serve?
3. **Target users**: Which role or audience will use it?
4. **Skills needed**: What should Claude do automatically? List 3 to 5 trigger scenarios.
5. **Commands needed**: What explicit slash commands are needed?
6. **Connectors**: What external tools should it connect to?
7. **Subagents**: Are there focused subtasks that should be delegated?
8. **Public author name**: What author name is safe to publish?

Remind the user not to include private client, customer, employee, local path, or credential details.

### Step 2: Generate The Manifest

Produce a `plugin.json`:

```json
{
  "name": "[plugin-name]",
  "version": "0.1.0",
  "description": "[one-sentence description]",
  "author": {
    "name": "[public author name]"
  }
}
```

### Step 3: Generate Each Skill

For each skill the user described, produce a `SKILL.md` with:

- Complete YAML frontmatter: `name`, `description`, and `triggers`
- Clear "When To Apply" section
- Numbered workflow steps
- Defined output format
- Edge-case handling
- Missing-connector behavior when relevant

### Step 4: Generate Each Command

For each slash command, produce a `command-name.md` with:

- Frontmatter: `name`, `description`, and `usage`
- Step-by-step instructions
- Argument documentation
- Example invocations using generic sample data

### Step 5: Generate Subagents If Needed

For each subagent, produce an `agent-name.md` with:

- Narrow scope definition
- Minimal `toolsAllowed` list
- Structured return format
- Reference to the parent skill or command

### Step 6: Generate `.mcp.json`

Based on the connectors list, produce a `.mcp.json` with MCP server entries. Use environment variable placeholders for every credential.

### Step 7: Generate README And CONNECTORS.md

Produce a complete README with installation instructions, command table, skill table, and configuration guide. Produce a `CONNECTORS.md` listing all configured servers and required environment variables.

### Step 8: Privacy Review

Before delivery, check that the generated files do not contain:

- Private names, emails, phone numbers, local paths, or domains
- Client, customer, employee, vendor, or matter details
- API keys, tokens, passwords, cookies, or private keys
- Private strategy that should stay in a local ignored file

### Step 9: Deliver

Present the complete plugin as a file tree with all files ready to copy into the repo. Tell the user:

1. Where to place the files: `plugins/[plugin-name]/`
2. How to validate the repository: `npm run validate`
3. How to validate the plugin when the CLI is available: `claude plugin validate plugins/[plugin-name]`
4. How to install locally for testing

## Output Format

```markdown
## Plugin: [name]

**Files generated:**
- `.claude-plugin/plugin.json`
- `README.md`
- `skills/[skill-name]/SKILL.md` (x N)
- `commands/[command-name].md` (x N, if applicable)
- `subagents/[agent-name].md` (x N, if applicable)
- `.mcp.json`
- `CONNECTORS.md`

[Full file contents follow]
```
