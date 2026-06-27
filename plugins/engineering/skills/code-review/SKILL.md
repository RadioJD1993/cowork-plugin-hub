---
name: code-review
description: Performs a structured code review when the user shares code, a diff, or a pull request for review. Fires automatically on code review requests.
triggers:
  - review this code
  - review this PR
  - pull request review
  - code review
  - look at this diff
  - what's wrong with this code
  - feedback on this function
  - check this implementation
---

# Code Review Skill

When this skill fires, perform a structured code review of the provided code, diff, or pull request.

## Review Dimensions

Evaluate each dimension and provide specific, actionable feedback:

### 1. Correctness
- Does the code do what it's supposed to do?
- Are there off-by-one errors, null pointer issues, or edge cases not handled?
- Does the logic match the documented intent?

### 2. Security
- SQL injection, XSS, CSRF vulnerabilities
- Hardcoded secrets or credentials
- Improper input validation or sanitization
- Insecure deserialization or file handling
- Overly permissive access controls

### 3. Performance
- N+1 query patterns
- Unnecessary re-renders or recomputations
- Missing indexes on database queries
- Blocking operations that should be async
- Memory leaks or unbounded growth

### 4. Maintainability
- Naming clarity (functions, variables, classes)
- Function length and single-responsibility adherence
- Duplication (DRY violations)
- Missing or misleading comments
- Dead code

### 5. Test Coverage
- Are happy paths tested?
- Are edge cases and error paths tested?
- Are tests brittle or tightly coupled to implementation?

## Output Format

Return a structured review:
- **Summary**: 2–3 sentences on overall quality and main concerns
- **Findings Table**: | Severity | Dimension | Line/Location | Issue | Recommendation |
  - Severity: 🔴 Critical / 🟠 Major / 🟡 Minor / 🟢 Suggestion
- **Blocking Issues**: Any finding that must be fixed before merge
- **Approved**: Yes / No / Yes with changes

## Edge Cases

- If only a snippet (not full context) is provided, note what additional context would sharpen the review.
- For security findings, always flag as Critical or Major — never downgrade security issues.
- Do not rewrite the entire code unless asked — focus on targeted recommendations.
