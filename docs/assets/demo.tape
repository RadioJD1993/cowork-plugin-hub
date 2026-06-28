# demo.tape - a VHS script for the README hero GIF.
# Render with: vhs docs/assets/demo.tape   (https://github.com/charmbracelet/vhs)
# Run from the repo root. It scaffolds a throwaway plugin to show the developer
# experience, then deletes it so your working tree is left clean.

Output docs/assets/demo.gif

Set Shell bash
Set FontSize 16
Set Width 1200
Set Height 760
Set Padding 24
Set Theme "Dracula"

Type "bash scripts/new-plugin.sh" Enter
Sleep 1s
Type "release-notes" Enter
Sleep 700ms
Type "Draft release notes from a list of merged changes." Enter
Sleep 700ms
Type "Your Name" Enter
Sleep 1800ms

Type "ls plugins/release-notes" Enter
Sleep 2200ms

# Clean up the throwaway plugin so the working tree is left unchanged.
Hide
Type "rm -rf plugins/release-notes" Enter
Sleep 400ms
Show
