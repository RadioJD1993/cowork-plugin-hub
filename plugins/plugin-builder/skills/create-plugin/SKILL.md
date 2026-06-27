---
name: create-plugin
description: Guides the user through building a new Cowork plugin from scratch — manifest, skills, commands, agents, and MCP connectors — and produces installable, spec-compliant files. Use when the user asks to build, create, or scaffold a plugin, add a skill or slash command, set up an agent, or asks how to structure a Cowork plugin.
---

# Create Cowork Plugin

## When To Apply

Apply this skill when the user wants to build a new Cowork plugin, add a skill to an existing plugin, create a slash command, or set up an agent. Activation comes from the `description` above — there is no `triggers:` field.

## Workflow

### Step 1: Gather Requirements

Ask the user:

1. **Name**: What should the plugin be called? Use kebab-case, such as `research-brief`.
2. **Purpose**: What workflow does it serve?
3. **Target users**: Which role or audience will use it?
4. **Skills needed**: What should Claude do automatically? List 3 to 5 situations/phrases that should activate each skill.
5. **Commands needed**: What explicit slash commands are needed?
6. **Connectors**: What external tools should it connect to? (Remember: Cowork supports remote MCP only.)
7. **Agents**: Are there focused subtasks that should be delegated to a dispatched agent?
8. **Public author name**: What author name is safe to publish?

Remind the user not to include private client, customer, employee, local path, or credential details.

### Step 2: Generate The Manifest

Produce `.claude-plugin/plugin.json`. Only `name` is strictly required by the spec, but include `version`, `description`, and `author` for a quality plugin:

```json
{
  "name": "[plugin-name]",
  "version": "0.1.0",
  "description": "[one-sentence description]",
  "author": { "name": "[public author name]" }
}
```

### Step 3: Generate Each Skill

For each skill, produce `skills/[skill-name]/SKILL.md` with:

- YAML frontmatter with **`name`** and **`description`** only. There is **no `triggers:` field** — embed the activating situations and phrases directly in the `description` (e.g. "Use when the user asks to review a contract or says 'summarize this'"). Keep `description` under ~1,024 characters.
- Clear "When To Apply" section.
- Numbered workflow steps.
- Defined output format.
- Edge-case handling, including missing-connector behavior when relevant.

### Step 4: Generate Each Command

For each slash command, produce `commands/[command-name].md` with:

- Frontmatter with **`name`** and **`description`** (and optional **`argument-hint`**). There is **no `usage:` field**.
- Step-by-step instructions.
- Argument documentation.
- Example invocations using generic sample data.

### Step 5: Generate Agents If Needed

For each delegated agent, produce `agents/[agent-name].md` (the directory is **`agents/`**, not `subagents/` — that is what Cowork/Claude Code auto-discovers) with:

- Frontmatter with **`name`** and **`description`**; optional `tools` (e.g. `Read, Grep, Glob`) and `model`.
- Narrow scope definition and a structured return format.
- Note: plugin-provided agents cannot set `hooks`, `mcpServers`, or `permissionMode` — those are ignored.

### Step 6: Generate `.mcp.json`

Based on the connectors list, produce `.mcp.json` with MCP server entries. For Cowork compatibility prefer **remote** servers (`"type": "http"` or `"sse"` with a `url`); local `stdio` servers run only in the Claude Code CLI. Use environment-variable placeholders for every credential (e.g. `"Authorization": "Bearer ${TOOL_TOKEN}"`).

### Step 7: Generate README And CONNECTORS.md

Produce a complete `README.md` (installation, command table, skill table, configuration) and, when connectors are used, a `CONNECTORS.md` listing each server, its required environment variables, and missing-connector behavior.

### Step 8: Privacy And Spec Review

Before delivery, review the generated files. Dispatch the bundled agents when available:

- **`/plugin-builder:privacy-reviewer`** — scans for secrets, tokens, emails, phone numbers, local paths, and private organization/client details.
- **`/plugin-builder:spec-compliance-reviewer`** — confirms the manifest, frontmatter, and directory layout match the Cowork plugin spec.

If the agents are unavailable, perform both checks inline.

### Step 9: Deliver And Validate

Present the complete plugin as a file tree with all files ready to copy into `plugins/[plugin-name]/`. Tell the user how to validate:

1. Hub validator (catches schema + privacy issues): `npm run validate`
2. Canonical validator (the source of truth): `claude plugin validate plugins/[plugin-name]`
3. To list it in the catalog, add an entry to `.claude-plugin/marketplace.json` using a **`source`** path (e.g. `"source": "./plugins/[plugin-name]"`) — not `path`.
4. Install for testing: `claude plugin install [plugin-name]@cowork-plugin-hub`.

## Output Format

```markdown
## Plugin: [name]

**Files generated:**
- `.claude-plugin/plugin.json`
- `README.md`
- `skills/[skill-name]/SKILL.md` (x N)
- `commands/[command-name].md` (x N, if applicable)
- `agents/[agent-name].md` (x N, if applicable)
- `.mcp.json` and `CONNECTORS.md` (if connectors are needed)

**Marketplace entry** (add to `.claude-plugin/marketplace.json` plugins array):
{ "name": "[name]", "source": "./plugins/[name]", "description": "...", "version": "0.1.0", "author": { "name": "..." } }

[Full file contents follow]
```
