# Hugging Face Spaces

Hugging Face Spaces are useful for public demos, searchable catalogs, and agent-callable tools that should live outside a private workspace. Use them only with sanitized examples and public inputs.

## Good Uses

- Host a static public catalog that reads `catalog.json`.
- Point a plugin skill at a public Gradio Space's `agents.md` instructions.
- Demonstrate how a remote tool works without committing credentials, local paths, or private bundles.
- Publish lightweight examples that help contributors understand connector patterns.

## Avoid

- Uploading private `.plugin` bundles.
- Sending client, employee, firm, local-machine, or private project data to public Spaces.
- Hardcoding `HF_TOKEN`, Space URLs, or private endpoint URLs in plugin files.
- Treating a Space as a Cowork MCP connector unless the Space actually exposes a remote MCP server.

## Static Catalog Space

This repo includes a ready-to-publish static Space in [`../spaces/cowork-plugin-catalog`](../spaces/cowork-plugin-catalog). It serves the generated catalog JSON and a small searchable UI.

Regenerate the catalog before publishing:

```bash
npm run catalog
```

Publish the folder into a Hugging Face static Space:

```bash
git clone https://huggingface.co/spaces/<your-hf-user>/cowork-plugin-catalog
cp -R spaces/cowork-plugin-catalog/* cowork-plugin-catalog/
cd cowork-plugin-catalog
git add .
git commit -m "Publish CoWork plugin catalog"
git push
```

The Space README uses the static Space settings from Hugging Face: `sdk: static` and `app_file: index.html`.

## Gradio Space Agent Pattern

For Gradio Spaces, Hugging Face exposes an agent-facing `agents.md` endpoint:

```text
https://huggingface.co/spaces/<owner>/<space>/agents.md
```

An agent can fetch that document, inspect the Space schema endpoint, upload files if needed, call the Gradio API, and poll for results. Keep the plugin instructions generic so users provide their own public Space id and token at runtime.

Use the example plugin in [`../examples/hugging-face-space`](../examples/hugging-face-space) as the reference pattern.

## Environment Variables

Use placeholders in docs and config:

| Variable | Purpose |
| --- | --- |
| `HF_SPACE_ID` | Public Space id, such as `owner/space-name`. |
| `HF_TOKEN` | Optional token for Spaces that require authentication. |
| `HF_SPACE_MCP_URL` | Optional remote MCP URL for Spaces that explicitly expose an MCP server. |

Keep these values out of the repository. Add only placeholder names to `.mcp.json`, README files, and examples.
