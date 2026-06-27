# Changelog

All notable changes to this repository are documented here. The format is based
on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
aims to follow [Semantic Versioning](https://semver.org/).

## [0.2.0] - 2026-06-27

### Fixed
- **Spec compliance (breaking for the manifest):** `.claude-plugin/marketplace.json`
  now uses the official Claude Code marketplace schema — kebab-case `name`,
  required `owner`, and per-plugin `source` (replacing the non-standard `path`/`tags`).
  The previous manifest would not install via `/plugin marketplace add`.
- Skill frontmatter no longer uses an invented `triggers:` field; triggers are
  embedded in `description` per the spec. Command frontmatter no longer uses
  `usage:`; `argument-hint` is used where helpful.
- Agents moved from `subagents/` to the auto-discovered `agents/` directory.
- `new-plugin.sh` generates spec-correct files, enforces kebab-case names, and
  emits the correct install command (`claude plugin install <name>@cowork-plugin-hub`).

### Added
- Rewritten hub validator that checks the real contract (owner, `source`,
  description length, frontmatter, `agents/`) and rejects the old invented fields.
- CI now also runs the canonical `claude plugin validate`.
- `plugin-builder` upgraded (0.2.0) with a validation backbone and two review
  agents: `privacy-reviewer` and `spec-compliance-reviewer`.
- New docs: `cowork-vs-cli.md`; corrected skill/authoring/agent/connector guides.
- Community health: `CODE_OF_CONDUCT.md`, `SECURITY.md`, this `CHANGELOG.md`,
  a pull request template, and issue templates.
- `.gitignore` guards against stray runtime/state artifacts from other plugins.

## [0.1.0]

- Initial public release: starter hub with `plugin-builder`, `base/skeleton`,
  examples, docs, templates, a homegrown validator, and CI.
