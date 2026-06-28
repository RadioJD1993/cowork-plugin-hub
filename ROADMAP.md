# Roadmap

Near-term direction for the hub. This is intentionally light and forward-looking
— open an issue to propose, reprioritize, or volunteer.

## Now

- Keep `main` spec-clean and the validator strict: privacy/secret scan, structure
  checks, and remote-only MCP (no `stdio` connectors).
- Grow the `verified` catalog. Domain plugins mature on `feat/<domain>` branches and
  merge once they pass the privacy checklist and `claude plugin validate`.

## Next

- A live, browsable catalog (Hugging Face Space) linked from the README.
- A documented trust tier on every catalog entry, with a clear vetting bar.
- Deeper authoring docs: an end-to-end tutorial, a "skill vs command vs agent vs MCP"
  decision guide, troubleshooting, and an FAQ.
- Broader validator test coverage and CI hardening (pinned tooling, dependency updates,
  link checking).

## Later

- A cross-platform scaffolder so authoring does not depend on bash.
- More worked examples and community-submitted plugins.

## How To Help

Look for issues labeled [`good first issue`](https://github.com/RadioJD1993/cowork-plugin-hub/labels/good%20first%20issue)
or [`good-first-plugin`](https://github.com/RadioJD1993/cowork-plugin-hub/labels/good-first-plugin),
read [CONTRIBUTING.md](./CONTRIBUTING.md), and open a pull request. To propose a new
plugin, use the plugin-submission issue template.
