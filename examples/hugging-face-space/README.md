# Hugging Face Space Example

This example shows how a public Cowork plugin can use a Hugging Face Space without committing secrets or private content.

It supports two patterns:

1. **Gradio Space agent instructions:** fetch `https://huggingface.co/spaces/${HF_SPACE_ID}/agents.md`, inspect the documented API schema and call/poll endpoints, then run the public task.
2. **MCP-enabled Space:** if a Space exposes a remote MCP server, point `.mcp.json` at `${HF_SPACE_MCP_URL}`.

Use this only for public demo inputs. Do not send client data, local files, private plugin bundles, or organization-specific playbooks to a Space.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `HF_SPACE_ID` | For Gradio Spaces | Public Space id, such as `owner/space-name`. |
| `HF_TOKEN` | Optional | Token for Spaces that require authentication. Keep it outside the repo. |
| `HF_SPACE_MCP_URL` | For MCP-enabled Spaces | Remote `https` or `sse` endpoint exposed by the Space. |

## Try It

Ask Cowork:

```text
Use the Hugging Face Space example to inspect HF_SPACE_ID and summarize the public tool contract.
```

The plugin should fetch public tool instructions, describe the inputs and outputs, and ask before sending any user-provided content.
