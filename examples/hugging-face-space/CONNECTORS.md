# Connectors

This example intentionally keeps connector details generic.

## Gradio Spaces

Most Hugging Face Gradio Spaces are used through their public `agents.md` instructions rather than through MCP. Set `HF_SPACE_ID` at runtime and let the skill fetch:

```text
https://huggingface.co/spaces/${HF_SPACE_ID}/agents.md
```

If a Space requires auth, set `HF_TOKEN` in the local environment. Do not commit it.

## MCP-Enabled Spaces

If a Space explicitly exposes an MCP server, set:

```text
HF_SPACE_MCP_URL=https://your-space.example/sse
```

Then use the placeholder server in `.mcp.json`. The URL must be remote `http`, `https`, or `sse` for Cowork compatibility.

## Privacy

Use public demo content only. Never send private plugin bundles, client data, local paths, secrets, transcripts, or organization-specific playbooks to a Hugging Face Space.
