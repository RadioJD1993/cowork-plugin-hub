# Legal Plugin

AI-powered legal assistant for personal injury litigators. Covers contract review, NDA triage, compliance checks, risk assessment, demand letter drafting, and structured case intake.

## Skills (fire automatically)

| Skill | Triggers |
|-------|----------|
| `contract-review` | User shares a contract or asks about clauses |
| `nda-triage` | User mentions an NDA or confidentiality agreement |
| `compliance-check` | User asks about compliance, bar rules, HIPAA, etc. |
| `risk-assessment` | User describes a case and asks about strength or value |

## Commands (explicit)

| Command | Usage |
|---------|-------|
| `/legal:demand-letter` | Draft a PI demand letter |
| `/legal:case-intake` | Run a structured new-case intake interview |

## Agents

| Subagent | Invoked By |
|----------|------------|
| `lien-resolver` | `risk-assessment` skill, `demand-letter` command |

## Installation

```bash
claude plugin install legal@cowork-plugin-hub
```

## Branch

Active development happens on `feat/legal`. Open PRs to `main` when stable.
