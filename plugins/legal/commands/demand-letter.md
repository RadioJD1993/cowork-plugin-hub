---
name: demand-letter
description: Drafts a professional personal injury demand letter based on case facts, medical specials, and liability theory provided by the user.
usage: /legal:demand-letter [brief case description]
---

# /legal:demand-letter

Drafts a personal injury demand letter ready for attorney review and customization.

## How to Use

Type `/legal:demand-letter` followed by a brief description of the case, or just invoke the command and Claude will prompt you for the required information.

## Required Information

Claude will ask for (or accept inline):
1. **Plaintiff name and injury description**
2. **Defendant name and relationship to incident**
3. **Date, location, and brief facts of the incident**
4. **Medical treatment summary** (providers, treatment dates, total medical specials)
5. **Lost wages** (if applicable)
6. **Liability theory** (negligence, premises liability, etc.)
7. **Demand amount** (or leave blank to have Claude suggest a range)

## Output

Claude will produce a formatted demand letter including:
- Date and addressee block
- Re: line with client name and claim type
- Facts section
- Liability section
- Damages section (economic + non-economic)
- Demand paragraph with response deadline
- Closing and signature block placeholder

## Notes

- The draft is for attorney review — always verify jurisdiction-specific requirements before sending.
- Demand amounts suggested by Claude are based on general ranges and should be calibrated to local verdict data.
