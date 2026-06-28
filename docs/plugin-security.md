# Plugin Security: What Installing a Plugin Means

[`SECURITY.md`](../SECURITY.md) covers how to report a vulnerability in *this
repository*. This page is the other half: what a Cowork plugin can do to *you*
when you install it, what this hub checks before listing one, and how a plugin
that turns out to be unsafe is taken down.

## What a plugin can do

A Cowork plugin is instructions plus optional connectors, not a sandboxed binary.
When you install one, you are granting:

- **Skills and commands** that steer the agent's behavior with your data and tools.
- **MCP connectors** (remote `http`/`sse` servers) the plugin can call — these can read and send data to whatever endpoint they point at.
- **Agents** that run focused subtasks with the tools they declare.

A plugin installed from this hub's catalog cannot silently launch software on your
machine: Cowork runs **remote connectors only**, never local `stdio` processes,
and `npm run validate` rejects any `stdio` connector before a plugin can be
listed. But a connector pointed at a hostile endpoint can still exfiltrate
whatever you feed the plugin. Treat installing a plugin like adding a browser
extension — it is capability, not magic.

## What this hub checks before listing

Every `verified` plugin has cleared the checklist in [VETTING.md](../VETTING.md).
The load-bearing checks:

- **Remote-only connectors.** `stdio`/local connectors are rejected by the validator. Cowork cannot run them, and they are the easiest path to arbitrary local code.
- **Disclosed endpoints.** Every MCP server must be documented in the plugin's `CONNECTORS.md`: what it is, what URL it talks to, what credential and scopes it needs, and what degrades when it is missing.
- **No undisclosed hooks.** A plugin must not ship hooks that act on their own — on install, on every prompt, on file events — without the user asking. If a plugin needs a hook, its README must say so plainly.
- **Secret hygiene.** The validator scans tracked text for committed keys, tokens, and private paths and fails on a hit. Credentials belong in `${ENV_VAR}` placeholders, never in `.mcp.json`.
- **Truth in advertising.** The README must match the behavior — no hidden network calls or data access.

## How to evaluate a plugin before you install

1. Check its **tier** in the catalog. `verified` has been reviewed; `community` has not.
2. Read its **`CONNECTORS.md`**. Know every endpoint it will contact and every credential it asks for.
3. Skim its **skills and commands** — they are plain markdown, so you can read exactly what they instruct the agent to do.
4. Prefer **least-privilege credentials** for any connector: a scoped, revocable token over a broad one.

## Reporting an unsafe plugin

If a listed plugin does something its README does not disclose, or points a
connector at an unexpected endpoint, report it privately via GitHub Security
Advisories (see [SECURITY.md](../SECURITY.md)). Do not open a public issue with
exploit detail.

## Delisting process

When a maintainer confirms a listed plugin is unsafe:

1. The plugin is **downgraded to `community`** (for undisclosed-but-benign behavior) or **removed from `.claude-plugin/marketplace.json`** entirely (for hostile behavior or a shipped secret).
2. The change and the reason are recorded in `CHANGELOG.md`.
3. If a secret was involved, the rotate / purge / re-scan steps in [SECURITY.md](../SECURITY.md#if-a-secret-is-committed) apply.
4. Installed copies are not auto-updated, so the changelog entry is the notice — remove the plugin if you have it installed.

This is what "vetted" buys you: not a guarantee, but a documented bar and a way to
take a plugin down when it falls below it.
