# Security Policy

## Reporting a vulnerability

Please **do not** open a public issue for security problems. Instead, open a
private report via GitHub Security Advisories:

> https://github.com/RadioJD1993/cowork-plugin-hub/security/advisories/new

Include what you found, how to reproduce it, and the potential impact. You can
expect an initial acknowledgement within a few days.

## What counts as a security issue here

This repo ships configuration and instructions, not a running service. The most
relevant risks are:

- A committed secret (API key, token, private key) in any tracked file.
- A plugin whose description does not match its behavior (e.g. undisclosed data
  access or network calls).
- An MCP connector pointed at an untrusted or unexpected endpoint.

## If a secret is committed

The repository validator (`npm run validate`) scans tracked text for common
secret and credential patterns and fails if it finds one. If a real secret is
ever committed:

1. **Rotate it immediately.** Treat anything pushed to a public repo as
   compromised, even after deletion — it may already be cached or indexed.
2. Remove the secret from the working tree and replace it with a `${ENV_VAR}`
   placeholder.
3. Purge it from git history (e.g. `git filter-repo` or BFG) and force-push.
4. Add the term to a local `privacy.denylist` if it could reappear, and re-run
   `npm run validate`.

## Supported versions

This is an actively developed hub; fixes land on `main`. There is no long-term
support branch.
