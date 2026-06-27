#!/usr/bin/env bash
# new-plugin.sh
# Interactive scaffolder for a new CoWork plugin.
# Usage: bash scripts/new-plugin.sh

set -e

echo "CoWork Plugin Hub - New Plugin Scaffolder"
echo "==========================================="
echo ""

read -p "Plugin name (kebab-case, e.g. legal-intake): " PLUGIN_NAME
read -p "Short description (one sentence): " PLUGIN_DESC
read -p "Public author name (avoid private org/client info): " AUTHOR_NAME

DEST="plugins/$PLUGIN_NAME"

if [ -d "$DEST" ]; then
  echo "Error: $DEST already exists. Choose a different name."
  exit 1
fi

echo ""
echo "Scaffolding $DEST ..."

mkdir -p "$DEST/.claude-plugin"
mkdir -p "$DEST/skills/example-skill"
mkdir -p "$DEST/commands"
mkdir -p "$DEST/subagents"
mkdir -p "$DEST/hooks"
mkdir -p "$DEST/schemas"
mkdir -p "$DEST/scripts"

# plugin.json
cat > "$DEST/.claude-plugin/plugin.json" <<EOF
{
  "name": "$PLUGIN_NAME",
  "version": "0.1.0",
  "description": "$PLUGIN_DESC",
  "author": {
    "name": "$AUTHOR_NAME"
  }
}
EOF

# Copy skeleton files
cp base/skeleton/.mcp.json "$DEST/.mcp.json"
cp base/skeleton/skills/example-skill/SKILL.md "$DEST/skills/example-skill/SKILL.md"
cp base/skeleton/commands/example-command.md "$DEST/commands/example-command.md"
cp base/skeleton/subagents/example-subagent.md "$DEST/subagents/example-subagent.md"
cp base/skeleton/hooks/hooks.json "$DEST/hooks/hooks.json"
cp base/skeleton/schemas/example-output.schema.json "$DEST/schemas/example-output.schema.json"
cp base/skeleton/scripts/README.md "$DEST/scripts/README.md"
cp base/skeleton/state_config.json "$DEST/state_config.json"
cp base/skeleton/CONNECTORS.md "$DEST/CONNECTORS.md"

# README
cat > "$DEST/README.md" <<EOF
# $PLUGIN_NAME

$PLUGIN_DESC

## Installation

\`\`\`bash
claude plugins add cowork-plugin-hub/$PLUGIN_NAME
\`\`\`

## Commands

| Command | What it does |
|---------|--------------|
| \`/$PLUGIN_NAME:example-command\` | Description |

## Skills

| Skill | Description |
|-------|-------------|
| \`example-skill\` | Description |
EOF

echo ""
echo "Done! Plugin scaffolded at: $DEST"
echo ""
echo "Next steps:"
echo "  1. Edit $DEST/.claude-plugin/plugin.json"
echo "  2. Replace example-skill with your domain skills"
echo "  3. Configure $DEST/.mcp.json with your connectors"
echo "  4. Run: npm run validate"
echo "  5. Run: claude plugin validate $DEST"
