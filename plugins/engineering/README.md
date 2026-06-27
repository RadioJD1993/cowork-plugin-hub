# Engineering Plugin

AI-powered engineering assistant for code review, architecture analysis, incident response, and deployment safety. Built for software teams who want Claude to be an always-on senior engineer in the room.

## Skills (fire automatically)

| Skill | Triggers |
|-------|----------|
| `code-review` | User shares code, a diff, or asks for PR feedback |
| `architecture-review` | User describes or shares a system design |
| `incident-response` | User reports an outage or production incident |
| `deploy-checklist` | User describes an upcoming deployment |

## Commands (explicit)

| Command | Usage |
|---------|-------|
| `/engineering:pr-review` | Fetch and review a GitHub PR by number |
| `/engineering:runbook` | Generate an operational runbook for a service |

## Agents

| Subagent | Invoked By |
|----------|------------|
| `security-scanner` | `code-review` skill |

## Installation

```bash
claude plugin install engineering@cowork-plugin-hub
```

## Branch

Active development happens on `feat/engineering`. Open PRs to `main` when stable.
