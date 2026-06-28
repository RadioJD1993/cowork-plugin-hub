# Plugin Vetting and Trust Tiers

This hub's core promise is that the plugins it lists are safe to install. "Vetted"
is not a vibe here — it is a checklist. Every plugin in the catalog carries a
**trust tier** so you know exactly how much review stands behind it before you
install.

## Trust tiers

| Tier | Meaning | Review it has had |
| --- | --- | --- |
| `verified` | Maintainer-reviewed and recommended for real use. | Passes `npm run validate` and `claude plugin validate`; privacy checklist cleared; every MCP endpoint disclosed in `CONNECTORS.md`; no undisclosed hooks; read and merged by a maintainer. |
| `example` | A teaching example, not a product. | Structurally valid and privacy-clean, but intentionally minimal — meant to be read and copied, not depended on. |
| `community` | Third-party submission, listed but not vetted by this hub. | Author-attested only. Install at your own discretion. This is also the default for any entry that does not declare a tier. |

A missing tier is treated as `community` on purpose: the absence of review must
never read as "trusted."

## The `verified` checklist

A plugin earns `verified` only when **all** of the following are true:

- [ ] `npm run validate` passes (schema, kebab-case, semver, frontmatter rules, the `.mcp.json` remote-only check, and the privacy/secret scan).
- [ ] `claude plugin validate <plugin>` passes (the canonical validator).
- [ ] No private client, customer, employee, organization, path, or credential data (the CONTRIBUTING privacy checklist).
- [ ] Every MCP connector is remote (`http`/`sse`), uses `${ENV_VAR}` placeholders for secrets, and is documented in `CONNECTORS.md` with its endpoint, required scopes, and missing-connector behavior.
- [ ] No install-time or always-on hooks that act without the user asking (see [docs/plugin-security.md](./docs/plugin-security.md)).
- [ ] The README describes what the plugin actually does, with no hidden network or data access.
- [ ] A maintainer has read the plugin and merged it.

## How a tier is assigned

Tiers live in `.claude-plugin/marketplace.json` as a `"tier"` field on each plugin
entry, and are rendered in [docs/catalog.md](./docs/catalog.md), the catalog Space,
and the README catalog table. `npm run validate` checks that any declared tier is
one of the three values above.

To propose a plugin — and the tier you believe it qualifies for — open a
plugin-submission issue. A maintainer confirms the tier during review; you do not
get to self-assign `verified`.

## Losing a tier (delisting)

A plugin that adds undisclosed network or data access, ships a secret, or has its
endpoint compromised is downgraded to `community` or removed from the catalog
entirely, and the change is recorded in `CHANGELOG.md`. The full process is in
[docs/plugin-security.md](./docs/plugin-security.md#delisting-process).
