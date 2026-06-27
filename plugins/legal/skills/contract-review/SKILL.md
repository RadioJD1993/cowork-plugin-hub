---
name: contract-review
description: Automatically reviews contracts for risky clauses, missing provisions, and one-sided terms. Fires when a user shares or describes a contract for review.
---

# Contract Review Skill

When this skill fires, perform a structured legal review of the provided contract or clause.

## Workflow

1. **Identify the contract type** — determine whether it is an employment agreement, settlement, retainer, NDA, vendor contract, fee agreement, or other instrument.
2. **Extract key terms** — parties, effective date, term/duration, payment/compensation, governing law, jurisdiction, and termination provisions.
3. **Flag high-risk clauses** — identify any of the following and explain the risk:
   - Broad indemnification or hold-harmless clauses
   - Unilateral modification rights
   - Unreasonable fee-shifting provisions
   - Ambiguous damages limitations or caps
   - Non-compete or non-solicitation clauses with overbroad scope
   - Mandatory arbitration clauses that disadvantage the client
   - Auto-renewal with insufficient notice period
4. **Flag missing provisions** — note any standard provisions that are absent (e.g., dispute resolution, limitation of liability, insurance requirements).
5. **Recommend edits** — for each flagged item, suggest specific revised language or a negotiating position.

## Output Format

Return a structured report with these sections:
- **Contract Type & Parties**
- **Key Terms Summary** (table)
- **High-Risk Clauses** (each item: clause text → risk → recommended fix)
- **Missing Provisions**
- **Overall Risk Rating**: Low / Medium / High with one-sentence rationale

## Edge Cases

- If only a clause (not the full contract) is provided, focus the review on that clause and note what surrounding context would be needed for a complete opinion.
- If the contract is in an unfamiliar jurisdiction, flag the governing law and note that local counsel review is advised.
- Never provide a final legal opinion — frame all output as analysis to inform attorney judgment.
