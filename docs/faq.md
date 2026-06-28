# FAQ

**Why does Cowork support only remote MCP connectors?**
Cowork runs in a hosted environment without your local shell, so it cannot launch
local `stdio` servers. Use a remote `http`/`sse` endpoint. The Claude Code CLI can
run both. See [cowork-vs-cli.md](./cowork-vs-cli.md).

**Why is there no `triggers:` field on skills?**
A skill's activation contract is its `description` — put the situations and phrases
that should activate it there. See [skill-writing-guide.md](./skill-writing-guide.md).

**Do agents go in `agents/` or `subagents/`?**
`agents/`. Only that directory is auto-discovered; `subagents/` is silently ignored.

**How do I keep a private version of a plugin?**
Keep private adaptations in local, git-ignored files, and never commit private
client, employee, or credential data. Sanitize before publishing. See
[privacy-and-sanitization.md](./privacy-and-sanitization.md). This public hub is not
the place for organization-specific plugins.

**What does the `tier` on a catalog entry mean?**
`verified` is maintainer-reviewed, `example` is teaching-only, and `community` is
listed-but-not-vetted (also the default for an entry with no tier). See
[VETTING.md](../VETTING.md) and [plugin-security.md](./plugin-security.md).

**How do I add my plugin to the catalog?**
Build it (see the [tutorial](./tutorial-first-plugin.md)), add a `source` entry to
`marketplace.json`, run `npm run validate` and `npm run catalog`, and open a pull
request. See [CONTRIBUTING.md](../CONTRIBUTING.md).

**What is the difference between `templates/`, `base/skeleton/`, and `examples/`?**
`templates/` are single-file starters to drop into an existing plugin;
`base/skeleton/` is a full copyable plugin skeleton; `examples/` are complete,
working plugins to read and learn from.

**When should I bump a version?**
When you make a user-facing change to a plugin, bump its `version` and add a
CHANGELOG entry. An unchanged version means installed users get no update.
