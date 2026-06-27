---
name: fetch-and-summarize
description: Fetches a file from a GitHub repository and summarizes it.
usage: /standard-example:fetch-and-summarize [owner/repo] [path-to-file]
---

# /standard-example:fetch-and-summarize

Fetches a file from GitHub and summarizes it using the `summarize` skill.

## How To Use

```text
/standard-example:fetch-and-summarize owner/repo README.md
```

## Steps

1. Use the GitHub MCP connector to fetch the file at the specified path.
2. Pass the file contents to the `summarize` skill.
3. Return the structured summary.

## Notes

- Requires the GitHub MCP connector to be configured.
- For private repositories, use the minimum token scopes needed for the task.
