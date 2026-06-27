---
name: security-scanner
description: Subagent that scans code diffs or file contents for security vulnerabilities. Invoked by the code-review skill when security analysis is warranted.
toolsAllowed:
  - read_file
  - search
returnFormat: structured JSON
invokedBy:
  - skill: code-review
---

# Security Scanner Subagent

This subagent is delegated the narrow task of scanning code for security vulnerabilities.

## Scan Scope

For the provided code or diff, scan for:

1. **Injection vulnerabilities** — SQL, command, LDAP, XPath injection
2. **Authentication/authorization flaws** — missing auth checks, insecure tokens, privilege escalation
3. **Sensitive data exposure** — hardcoded secrets, API keys, PII in logs
4. **Cryptographic weaknesses** — weak algorithms, improper IV usage, broken TLS
5. **Input validation gaps** — missing sanitization, unchecked user input
6. **Dependency vulnerabilities** — known CVEs in imported packages (note: flag for human verification)
7. **Security misconfigurations** — debug mode enabled, overly permissive CORS, directory listing

## Output Format

```json
{
  "findings": [
    {
      "severity": "critical|high|medium|low",
      "category": "injection|auth|exposure|crypto|validation|dependency|config",
      "location": "file:line or description",
      "description": "What the vulnerability is",
      "recommendation": "How to fix it"
    }
  ],
  "summary": "One-sentence overall security assessment",
  "blocking": true
}
```

## Constraints

- Return only the structured JSON — the parent skill will format it.
- Mark `blocking: true` if any critical or high findings are present.
- Do not suppress findings — report everything detected.
