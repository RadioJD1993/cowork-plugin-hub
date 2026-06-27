---
name: case-intake
description: Runs a structured case intake interview, captures all key facts, and outputs a completed intake summary with risk grade and recommended next steps.
usage: /legal:case-intake
---

# /legal:case-intake

Runs an interactive case intake for a new personal injury matter.

## How to Use

Type `/legal:case-intake` to begin. Claude will ask a series of intake questions and compile the answers into a structured summary.

## Interview Flow

1. **Client identification** — name, contact, date of birth, referral source
2. **Incident details** — date, time, location, description
3. **Liability facts** — who was at fault and why, any witnesses
4. **Injury description** — body parts affected, immediate symptoms, emergency care
5. **Medical treatment** — treating providers, diagnoses, current status
6. **Insurance information** — client's coverage, defendant's coverage if known
7. **Prior injuries** — any relevant pre-existing conditions
8. **Statute of limitations** — Claude will calculate and flag the deadline

## Output

Upon completion, Claude outputs:
- **Case Intake Summary** (structured, printable)
- **Statute of Limitations Deadline** (calculated from incident date)
- **Risk Assessment** (using the `risk-assessment` skill)
- **Recommended Next Steps** (numbered, prioritized)
- **Missing Information Checklist** (items still needed)

## Notes

- You can skip questions and return to them later by typing "skip".
- For mass tort or class action inquiries, flag at the start so Claude applies the appropriate evaluation framework.
