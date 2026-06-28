# Tutorial: Build Your First Plugin in 10 Minutes

This is the linear, zero-to-working path: scaffold a plugin, write one real skill,
validate it, list it, install it, and watch it activate in Cowork. The reference
guides ([plugin-authoring-guide.md](./plugin-authoring-guide.md),
[skill-writing-guide.md](./skill-writing-guide.md)) go deeper on each piece — this
page just gets you to a working plugin once.

We will build `release-notes`: a plugin with one skill that drafts release notes
from a list of merged changes.

## Prerequisites

- Node.js >= 18 (`node --version`).
- The Claude Code CLI (for `claude plugin validate` and installs).
- On Windows, run the shell steps in **Git Bash** (the scaffolder is a bash script).
- A clone of this repo:

  ```bash
  git clone https://github.com/RadioJD1993/cowork-plugin-hub.git
  cd cowork-plugin-hub
  ```

## Step 1 - Scaffold (1 min)

```bash
bash scripts/new-plugin.sh
```

Answer the three prompts:

```
Plugin name (kebab-case, e.g. legal-intake): release-notes
Short description (one sentence): Draft release notes from a list of merged changes.
Public author name (avoid private org/client info): Your Name
```

You will see:

```
Scaffolding plugins/release-notes ...
Done! Plugin scaffolded at: plugins/release-notes
```

## Step 2 - Trim to what you need (1 min)

The scaffolder gives you a maximal plugin so every option is visible. Small
plugins are easier to install, review, and trust, so delete what this one does not
use. For a single-skill plugin you only need the manifest, the README, and one
skill:

```bash
cd plugins/release-notes
rm -rf commands agents hooks schemas scripts state_config.json .mcp.json CONNECTORS.md
cd ../..
```

(Keep `.mcp.json` and `CONNECTORS.md` only if your plugin calls an external tool.)

## Step 3 - Write the skill (4 min)

Replace the example skill with a real one. Rename the folder and open the file:

```bash
mv plugins/release-notes/skills/example-skill plugins/release-notes/skills/draft-release-notes
```

Put this in `plugins/release-notes/skills/draft-release-notes/SKILL.md`:

```markdown
---
name: draft-release-notes
description: Draft release notes from a list of merged changes or commit messages. Use when the user asks to write release notes, summarize a changelog, or turn a list of merged PRs into a release announcement.
---

# Draft Release Notes

## When To Apply

Apply this skill when the user provides a list of merged changes, commits, or PR
titles and wants them turned into readable release notes. Activation comes from
the `description` above - there is no `triggers:` field.

## Workflow

1. Group the changes into Features, Fixes, and Maintenance.
2. Rewrite each line as a user-facing benefit, not an internal commit message.
3. Drop noise (merge commits, version bumps, formatting-only changes).
4. Lead with the most important change.

## Output Format

```
## <version> - <date>

### Features
- ...

### Fixes
- ...

### Maintenance
- ...
```

If no version or date is given, leave them as placeholders for the user to fill.
```

The whole activation contract lives in `description`: the situations and phrases
that should trigger the skill go there, never in a separate `triggers:` key.

## Step 4 - List it in the catalog (1 min)

A plugin under `plugins/` is not "done" until it is listed, so do this before you
validate. Add an entry to the `plugins` array in `.claude-plugin/marketplace.json`:

```json
{
  "name": "release-notes",
  "displayName": "Release Notes",
  "source": "./plugins/release-notes",
  "description": "Draft release notes from a list of merged changes.",
  "version": "0.1.0",
  "author": { "name": "Your Name" },
  "tier": "community"
}
```

Use `source` (a path starting with `./`), not `path`. New submissions start at
the `community` tier; a maintainer confirms a higher tier during review (see
[VETTING.md](../VETTING.md)). Then refresh the generated catalog:

```bash
npm run catalog
```

## Step 5 - Validate (1 min)

```bash
npm run validate
```

Expect:

```
Validation passed for 6 plugin directories.
```

If it fails, the error names the file and the fix. The most common first-run hit
is forgetting Step 4: an installable plugin under `plugins/` that is not in
`marketplace.json` is a hard error (add the `source` entry, or add its path to
`metadata.wip` while it is still work-in-progress). Other frequent hits: a
`triggers:` or `usage:` key in frontmatter (remove it - put triggers in the
`description`), an agent in `subagents/` instead of `agents/`, or a `stdio` MCP
server (Cowork is remote-only). See
[the authoring guide](./plugin-authoring-guide.md).

## Step 6 - Install and watch it fire (1 min)

**In Cowork:** Customize -> Plugins -> Add marketplace -> paste your repo URL,
then install `release-notes`. Reload plugins.

**In the CLI:**

```bash
claude plugin install release-notes@cowork-plugin-hub
```

Now trigger it. Type a phrase from your skill's `description`, for example:

```
Turn these merged PRs into release notes: add dark mode, fix login crash, bump deps
```

The skill activates and drafts grouped, user-facing notes. That activation - the
agent reaching for your skill because the `description` matched - is the whole
point of a plugin.

## Next steps

- Add a slash command: see [plugin-authoring-guide.md](./plugin-authoring-guide.md).
- Add a connector: see [mcp-connector-guide.md](./mcp-connector-guide.md) (remote `http`/`sse` only).
- Sharpen the skill's `description` for reliable activation: see [skill-writing-guide.md](./skill-writing-guide.md).
- Before you open a pull request, run the [privacy checklist](./privacy-and-sanitization.md) and read [VETTING.md](../VETTING.md).
