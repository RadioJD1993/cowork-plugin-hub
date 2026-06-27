# CoWork Plugin Hub

A full-stack plugin development hub for [Claude CoWork](https://claude.com/product/cowork). Build agents, subagents, skills, slash commands, and MCP connectors — from a shared base to domain-specific plugins for legal, engineering, and beyond.

## What's Here

| Path | Purpose |
|------|---------|
| [`/base`](./base) | Shared foundation: plugin skeleton, scaffold scripts, and core utilities every plugin can reuse |
| [`/plugins/legal`](./plugins/legal) | Legal-focused plugin (contract review, NDA triage, compliance, risk assessment) |
| [`/plugins/engineering`](./plugins/engineering) | Engineering-focused plugin (code review, architecture, incident response, deploy checklist) |
| [`/docs`](./docs) | Plugin authoring guide, skill-writing guide, subagent patterns, MCP connector guide |
| [`/templates`](./templates) | Copy-paste starters for plugin.json, SKILL.md, command.md, .mcp.json, and subagent specs |
| [`/examples`](./examples) | Minimal, standard, and advanced worked examples |
| [`/scripts`](./scripts) | Validators, scaffolders, and a new-plugin generator |

## Branch Strategy

| Branch | What it tracks |
|--------|----------------|
| `main` | Stable base, templates, docs, and general-purpose plugins |
| `feat/legal` | Active development of the legal plugin |
| `feat/engineering` | Active development of the engineering plugin |
| `feat/[your-domain]` | Your new domain branch — fork from `main`, follow the guide in `/docs` |

## Quick Start

### Install a plugin from this hub

```bash
# Add this marketplace to Cowork
claude plugin marketplace add RadioJD1993/cowork-plugin-hub

# Then install a specific plugin
claude plugin install legal@cowork-plugin-hub
claude plugin install engineering@cowork-plugin-hub
```

### Build a new plugin

```bash
# Run the interactive scaffolder
bash scripts/new-plugin.sh

# Or copy the template manually
cp -r templates/plugin-skeleton plugins/my-new-plugin
```

Then follow [`docs/plugin-authoring-guide.md`](./docs/plugin-authoring-guide.md).

## Plugin Anatomy

Every plugin in this repo follows the canonical CoWork structure:

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json        # Manifest: name, version, description, author
├── .mcp.json              # MCP server connections (tools/connectors)
├── commands/              # Slash commands (explicitly triggered)
│   └── command-name.md
├── skills/                # Domain knowledge (fires automatically)
│   └── skill-name/
│       └── SKILL.md
├── subagents/             # Sub-agent specs (optional, for multi-step delegation)
│   └── agent-name.md
├── CONNECTORS.md          # Human-readable connector setup guide
└── README.md              # Plugin docs
```

> All components are file-based — markdown and JSON only. No code, no build steps, no infrastructure.

## How Skills, Commands, and Subagents Differ

| Component | When it fires | How to trigger |
|-----------|---------------|----------------|
| **Skill** | Automatically — Claude pulls relevant skills from context | Just work normally |
| **Command** | Explicitly — you type the slash command | `/plugin-name:command-name` |
| **Subagent** | Delegated — Claude spins up a focused sub-agent for a scoped task | Invoked within a skill or command workflow |

## Adding a New Domain Branch

1. Branch from `main`: `git checkout -b feat/your-domain`
2. Scaffold: `bash scripts/new-plugin.sh` and name it `your-domain`
3. Write skills and commands for your domain (see `/docs`)
4. Test with `claude plugin validate plugins/your-domain`
5. Open a PR back to `main` when stable

## Reference Repos

- [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) — Official Anthropic plugin examples
- [TheDigitalGriot/cl-plugin-structure](https://github.com/TheDigitalGriot/cl-plugin-structure) — Community plugin structure documentation
- [anthropics/claude-plugins-community](https://github.com/anthropics/claude-plugins-community) — Community plugin marketplace

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Apache 2.0 — see [LICENSE](./LICENSE).
