---
name: inspect-hugging-face-space
description: Fetch and summarize the public agents.md contract for a Hugging Face Space.
---

# Inspect Hugging Face Space

Given a public Space id, fetch:

```text
https://huggingface.co/spaces/<owner>/<space>/agents.md
```

Summarize:

- What the Space does.
- The schema URL.
- The call and poll endpoints.
- Required inputs and outputs.
- Whether authentication or file upload is required.

Do not send user content to the Space during inspection. Ask before calling any endpoint that processes text or files.
