---
name: use-hugging-face-space
description: Inspect and call a public Hugging Face Space from Cowork using agents.md instructions or a configured remote MCP endpoint.
---

# Use Hugging Face Space

Use this skill when the user wants to work with a public Hugging Face Space.

## Safety Gate

Before sending any content to the Space:

1. Confirm the Space id or remote MCP endpoint being used.
2. Explain that public Spaces are for public or synthetic inputs only.
3. Ask for confirmation before uploading files or sending text that may contain private data.

Do not send private plugin bundles, secrets, local paths, transcripts, client data, employee data, or organization-specific playbooks to the Space.

## Gradio Space Flow

When `HF_SPACE_ID` is available or the user provides a public Space id:

1. Fetch `https://huggingface.co/spaces/${HF_SPACE_ID}/agents.md`.
2. Read the schema URL, call endpoint, poll endpoint, upload instructions, and auth hint.
3. Summarize the Space inputs, outputs, and any file-upload requirements.
4. If the user approves a public input, call the documented endpoint and poll for the result.
5. Return the result with the Space id and endpoint used.

Use `HF_TOKEN` only from the environment when the Space requires authentication.

## MCP Space Flow

When `HF_SPACE_MCP_URL` is configured, use the `hugging-face-space` MCP server from `.mcp.json`.

Prefer MCP only when the Space explicitly exposes a remote MCP server. Otherwise, use the Gradio `agents.md` flow.
