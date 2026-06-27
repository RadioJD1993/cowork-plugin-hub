<!-- Thanks for contributing to CoWork Plugin Hub. Please complete this checklist. -->

## What changed

<!-- A short summary of the change and why. -->

## Type of change

- [ ] New plugin
- [ ] Change to an existing plugin
- [ ] Docs / templates / tooling
- [ ] Other

## Checklist

- [ ] `npm run validate` passes locally.
- [ ] `claude plugin validate` passes (if the CLI was available).
- [ ] If a plugin was added/changed, it is listed in `.claude-plugin/marketplace.json` with a `source` path.
- [ ] Skills use `name` + `description` frontmatter (no `triggers:`); commands use `name` + `description` (no `usage:`); agents live in `agents/`.
- [ ] MCP connectors use `${ENV_VAR}` placeholders and remote (`http`/`sse`) servers for Cowork.
- [ ] **Privacy reviewed:** no client/employee/org details, no local paths, no secrets, no private bundles.
- [ ] `CHANGELOG.md` updated and versions bumped if this is a user-facing change.

## How I tested

<!-- Commands run, install tested in Cowork/CLI, skills/commands exercised. -->
