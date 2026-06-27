---
name: example-subagent
description: >
  A focused sub-agent that handles a specific scoped task within a larger workflow.
scope: [narrow task description]
toolsAllowed:
  - read_file
  - search
calledBy:
  - skill: example-skill
---

# Example Subagent

## Purpose

This subagent is spun up when the parent skill needs to delegate a focused, self-contained task. It operates with a narrow scope and limited tools.

## Instructions

1. Receive input: [what data is passed in]
2. Perform task: [the specific scoped work]
3. Return result: [what structured output to produce]

## Constraints

- Do not go outside the provided scope
- If input is insufficient, return a structured error: `{"error": "missing: [field]"}`
- Keep responses concise and structured
