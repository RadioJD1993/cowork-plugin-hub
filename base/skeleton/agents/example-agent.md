---
name: example-agent
description: A focused agent that handles a specific scoped task within a larger workflow. Claude delegates to it when the parent skill needs narrow, self-contained work done with limited tools.
tools: Read, Grep, Glob
model: inherit
---

# Example Agent

## Purpose

This agent is dispatched when a parent skill needs to delegate a focused,
self-contained task. It operates with a narrow scope and limited tools.

> Agents live in `agents/` (auto-discovered as `/plugin-name:agent-name`).
> Only `name` and `description` are required. Plugin-provided agents cannot
> set `hooks`, `mcpServers`, or `permissionMode`.

## Instructions

1. Receive input: [what data is passed in]
2. Perform task: [the specific scoped work]
3. Return result: [what structured output to produce]

## Constraints

- Do not go outside the provided scope.
- If input is insufficient, return a structured error: `{"error": "missing: [field]"}`.
- Keep responses concise and structured; let the parent format the final answer.
