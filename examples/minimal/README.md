# Minimal Plugin Example

The smallest useful CoWork plugin: a single skill, no commands, no agents, and no MCP connectors.

Use this as a starting point when you want to test one skill idea before building a full plugin.

## Structure

```text
minimal/
|-- .claude-plugin/
|   `-- plugin.json
`-- skills/
    `-- hello-world/
        `-- SKILL.md
```

## What It Demonstrates

- Minimum required files for a useful plugin: `plugin.json` and one `SKILL.md`
- Correct skill frontmatter (`name` + `description`, with triggers embedded in the description)
- Simple, single-step workflow
