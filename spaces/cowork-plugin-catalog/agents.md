To use this static catalog Space:

Catalog JSON:
GET /catalog.json

Recommended agent workflow:
1. Fetch catalog.json.
2. Show the available plugin names, descriptions, install commands, and component summaries.
3. Direct users to the source repository for full docs before installing.
4. Do not request or process private plugin bundles, secrets, local paths, client data, or organization-specific playbooks.

This static Space is for public discovery only. It is not a private plugin validator and it should not receive sensitive content.
