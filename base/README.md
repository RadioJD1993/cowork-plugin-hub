# Base Plugin Foundation

The base folder holds the reusable starting point for new public plugins.

## Contents

| Path | Purpose |
| --- | --- |
| `skeleton/` | Minimal working plugin you can copy and rename. |

## How To Use

1. Copy `skeleton/` to `plugins/your-plugin-name/`.
2. Edit `.claude-plugin/plugin.json`.
3. Replace the example skill with your real workflow.
4. Configure `.mcp.json` only if the plugin needs external tools.
5. Remove optional folders you do not use.
6. Run `npm run validate`.

Keep private organization guidance in local files, not in the public plugin.
