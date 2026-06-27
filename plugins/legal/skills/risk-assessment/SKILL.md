---
name: risk-assessment
description: Assesses litigation risk and case strength for personal injury matters. Fires when a user describes a case scenario, asks about case value, or requests a risk analysis.
triggers:
  - assess this case
  - case evaluation
  - risk assessment
  - how strong is this case
  - case value
  - liability analysis
  - damages analysis
  - should we take this case
  - case intake
  - what are our chances
---

# Risk Assessment Skill

When this skill fires, perform a structured litigation risk assessment for the described personal injury matter.

## Assessment Framework

### Liability Analysis
- Identify the theory of liability (negligence, strict liability, premises, products, etc.)
- Evaluate strength of duty, breach, causation, and damages elements
- Identify affirmative defenses likely to be raised (comparative fault, assumption of risk, statute of limitations)
- Rate liability: Strong / Moderate / Weak / Unknown

### Damages Analysis
- Economic damages: medical specials, lost wages, future care costs
- Non-economic damages: pain and suffering, loss of consortium
- Identify documentation gaps that need to be filled
- Flag any damages caps or limitations applicable in the jurisdiction

### Collectability
- Identify available insurance coverage (auto liability, homeowners, umbrella, workers comp, commercial GL)
- Note any collectability concerns (uninsured defendant, policy limits vs. damages)

### Case Risk Factors
- Statute of limitations status
- Sympathetic vs. unsympathetic plaintiff factors
- Venue analysis (plaintiff-friendly vs. defense-friendly jurisdiction)
- Expert witness requirements and availability

## Output Format

Return a **Case Risk Summary**:
- **Case Type**
- **Liability Rating**: Strong / Moderate / Weak + rationale
- **Estimated Damages Range**: Low / Mid / High (with basis)
- **Collectability**: Yes / Partial / At Risk
- **Key Risks**: (bulleted)
- **Recommended Next Steps**: (numbered, prioritized)
- **Overall Case Grade**: A / B / C / D with one-paragraph rationale

## Edge Cases

- If facts are incomplete, identify the specific information needed before a full assessment can be given.
- For catastrophic injury cases (TBI, spinal cord, wrongful death), note that life care planning experts will be required.
- Never give a settlement number recommendation — provide ranges based on comparable verdicts/settlements only.
