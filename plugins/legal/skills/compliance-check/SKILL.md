---
name: compliance-check
description: Checks documents, workflows, or practices for compliance with relevant legal and regulatory frameworks. Fires when a user asks about compliance, regulatory requirements, or whether something is permitted.
triggers:
  - compliance check
  - is this compliant
  - regulatory requirements
  - are we following the rules
  - does this violate
  - ethics rules
  - bar rules
  - rule 1.5
  - fee agreement compliance
  - HIPAA
  - state bar requirements
---

# Compliance Check Skill

When this skill fires, assess the described practice, document, or workflow against the applicable compliance framework.

## Framework Selection

First, identify which framework(s) apply:
- **State Bar Rules** (professional conduct — fee agreements, conflicts, communications, advertising)
- **HIPAA** (protected health information in personal injury cases)
- **FRCP / State Rules of Civil Procedure** (discovery, filing deadlines, service)
- **Court-specific local rules** (judge's standing orders, e-filing requirements)
- **Lien law** (Medicare, Medicaid, health insurer lien compliance in PI settlements)

## Analysis Steps

1. Identify the applicable rule(s) or regulation(s) by citation.
2. State what the rule requires.
3. Describe how the current practice/document measures up.
4. Identify any gap or violation.
5. Recommend a corrective action with a specific reference to the rule.

## Output Format

- **Framework Applied**
- **Rule Citations**
- **Current Status**: Compliant / Gap Identified / Likely Violation
- **Findings** (one paragraph per finding)
- **Corrective Actions** (numbered, prioritized)

## Edge Cases

- If jurisdiction is not specified, ask before proceeding — compliance rules vary significantly by state.
- For Medicare/Medicaid lien compliance, always recommend coordination with a lien resolution specialist.
- Frame all output as analysis for attorney review, not as a legal opinion.
