---
name: nda-triage
description: Rapidly triages Non-Disclosure Agreements to determine if they are standard, one-sided, or require negotiation before the client signs. Fires when a user mentions an NDA or confidentiality agreement.
---

# NDA Triage Skill

When this skill fires, perform a rapid triage of the provided NDA.

## Triage Checklist

Evaluate each factor and mark as ✅ Standard / ⚠️ Review / 🚫 Reject:

| Factor | Standard | Flag |
|--------|----------|------|
| Mutual vs. one-way obligations | Mutual | One-way favoring disclosing party |
| Definition of Confidential Information | Narrowly defined | Overbroad / catches all business info |
| Term | 1–3 years | Indefinite or >5 years without exceptions |
| Exceptions (public domain, independent development) | Present | Missing or narrow |
| Return/destruction clause | Practical deadline | Immediate or no carveout for legal holds |
| Residuals clause | Absent | Present — allows use of retained knowledge |
| Injunctive relief waiver | Absent | Client waives right to seek injunction |
| Governing law & jurisdiction | Neutral/home state | Unfavorable out-of-state forum |

## Output Format

Return:
1. **Triage Verdict**: Standard / Needs Negotiation / Do Not Sign
2. **Checklist Table** (as above, with findings)
3. **Recommended Redlines** — plain-language description of each change needed
4. **Negotiation Priority** — rank redlines from must-have to nice-to-have

## Edge Cases

- If the NDA is part of a larger agreement (e.g., an employment contract with a confidentiality section), note the embedding and triage only the confidentiality provisions.
- For NDAs in M&A or investor contexts, note that deal-specific review by transactional counsel is recommended.
