# Minimal Plugin Example

The smallest possible valid CoWork plugin — a single skill, no commands, no subagents, no MCP connectors.

Use this as a starting point when you want to test a single skill idea before building a full plugin.

## Structure

```
minimal/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    └── hello-world/
        └── SKILL.md
```

## What It Demonstrates

- Minimum required files for a valid plugin (`plugin.json` + one `SKILL.md`)
- Correct frontmatter format for a skill
- Simple, single-step workflow
