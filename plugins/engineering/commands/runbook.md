---
name: runbook
description: Generates a structured operational runbook for a service, feature, or infrastructure component based on a description provided by the user.
usage: /engineering:runbook [service or component name]
---

# /engineering:runbook

Generates a production-ready operational runbook.

## How to Use

Type `/engineering:runbook` followed by the service or component name, or describe the system and Claude will ask clarifying questions.

## Output Structure

Claude will generate a runbook with these sections:

1. **Service Overview** — what it does, who owns it, criticality tier
2. **Architecture Diagram (text)** — ASCII or Mermaid diagram of key components and dependencies
3. **Normal Operating Parameters** — expected metrics, request rates, latency baselines
4. **Common Failure Modes** — table of failure mode → symptoms → resolution steps
5. **Escalation Path** — who to page and when
6. **Runbook Steps** — numbered, step-by-step procedures for common operational tasks
7. **Rollback Procedure** — step-by-step rollback for each deployment type
8. **Useful Queries** — log queries, metric queries, and dashboards to check

## Notes

- Runbooks are generated as Markdown — copy into Notion, Confluence, or your runbook system
- Ask Claude to push the runbook to your GitHub repo by saying "push this to GitHub"
