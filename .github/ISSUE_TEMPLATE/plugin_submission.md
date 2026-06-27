---
name: Plugin submission / proposal
about: Propose a new plugin for the catalog
title: "[plugin] "
labels: plugin
---

## Plugin name

<!-- kebab-case, e.g. legal-intake -->

## What it does

<!-- One or two sentences. What workflow does it serve, and for whom? -->

## Components

- Skills:
- Commands:
- Agents:
- Connectors (MCP): <!-- remote http/sse servers for Cowork -->

## Privacy confirmation

- [ ] The plugin contains no private client, employee, or organization details.
- [ ] No secrets, tokens, or local machine paths.
- [ ] It is useful to someone outside my organization.

## Status

- [ ] Drafted on a `feat/<domain>` branch
- [ ] `npm run validate` passes
- [ ] `claude plugin validate` passes
