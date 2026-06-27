---
name: pr-review
description: Fetches a GitHub pull request by number and performs a full code review using the code-review skill.
argument-hint: "[repo] [pr-number]"
---

# /engineering:pr-review

Fetches a pull request from GitHub and performs a structured code review.

## How to Use

```
/engineering:pr-review owner/repo 42
```

Or just invoke `/engineering:pr-review` and Claude will prompt you for the repo and PR number.

## What Claude Does

1. Fetches the PR diff and description via the GitHub MCP connector
2. Reviews the diff using the `code-review` skill
3. Returns a full review with findings table and approval recommendation
4. Optionally posts the review as a comment on the PR (ask Claude to post it)

## Notes

- Requires the GitHub MCP connector to be configured (see `CONNECTORS.md`)
- Claude will not auto-post review comments — it will show you the review and ask for confirmation first
- For very large PRs (>500 lines changed), Claude will summarize by file and flag the highest-risk files for focused review
