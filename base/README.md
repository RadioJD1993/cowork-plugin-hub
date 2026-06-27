# Base Plugin Foundation

Shared utilities, patterns, and skeleton files that every plugin in this hub builds on. Start here before writing any domain-specific plugin.

## What's in the Base

| File/Dir | Purpose |
|----------|---------|
| `skeleton/` | Minimal working plugin you can copy and rename |
| `shared-skills/` | Skills that are useful across all domains (e.g., meeting-briefing, daily-brief) |
| `shared-commands/` | Commands that apply everywhere (e.g., `/help`, `/status`) |

## How to Use

1. Copy `skeleton/` to `plugins/your-plugin-name/`
2. Edit `.claude-plugin/plugin.json` with your plugin's name, version, and description
3. Replace placeholder skills with your domain-specific skills
4. Configure `.mcp.json` with your connectors
5. Run `claude plugin validate .` from your plugin directory
