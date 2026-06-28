# Changelog

All notable changes to this repository are documented here. The format is based
on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
aims to follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Generated public catalog outputs: `docs/catalog.md`, `docs/catalog.json`, and
  `spaces/cowork-plugin-catalog/catalog.json`.
- GitHub maintenance automation for label sync and release packaging.
- Hugging Face Space guidance, a Space-backed example plugin, and a ready-to-publish
  static catalog Space.
- **Trust tiers** for catalog plugins (`verified` / `example` / `community`),
  defined in `VETTING.md`, rendered in the catalog table, the catalog Space, and
  the README, and validated by `npm run validate`.
- `docs/plugin-security.md`: what installing a plugin grants, what the hub checks
  before listing one, and the delisting process for unsafe plugins.
- `docs/tutorial-first-plugin.md`: a 10-minute end-to-end "build your first plugin"
  walkthrough.
- `docs/assets/demo.tape`: a VHS recipe for generating the README demo GIF.
- Catalog Space: a per-card trust-tier pill, a copy-install button, and Open Graph
  / description meta tags.

### Changed
- The required validation job is explicitly named `validate` so branch protection
  can keep using a stable status check.
- The hub validator now structurally inspects each `.mcp.json` and **rejects
  local/`stdio` connectors** (Cowork runs remote `http`/`sse` only), and an
  installable plugin under `plugins/` that is **not listed** in the marketplace is
  now an error unless it is allowlisted via `metadata.wip`.
- The `plugin-builder` marketplace entry gained `displayName`, `homepage`,
  `license`, and `tier` for the in-app Discover pane.

### Fixed
- Moved the work-in-progress `legal` and `engineering` plugins off `main` onto
  `feat/legal` and `feat/engineering`; they shipped `stdio` connectors and were
  unlisted, contradicting the catalog and the branch strategy.
- Removed an inaccurate `$schema` claim from the `plugin-builder` README.

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
