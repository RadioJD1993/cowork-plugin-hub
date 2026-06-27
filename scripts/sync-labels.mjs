import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dryRun = process.argv.includes("--dry-run");
const githubAuth = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const repository = process.env.GITHUB_REPOSITORY || "RadioJD1993/cowork-plugin-hub";
const [owner, repo] = repository.split("/");
const labels = JSON.parse(fs.readFileSync(path.join(repoRoot, ".github", "labels.json"), "utf8"));

if (!owner || !repo) {
  throw new Error(`Invalid repository name: ${repository}`);
}

if (!dryRun && !githubAuth) {
  throw new Error("Set GITHUB_TOKEN or GH_TOKEN, or run with --dry-run.");
}

async function github(method, endpoint, body) {
  const response = await fetch(`https://api.github.com${endpoint}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${githubAuth}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${method} ${endpoint} failed: ${response.status} ${text}`);
  }

  return response.status === 204 ? null : response.json();
}

for (const label of labels) {
  const payload = {
    name: label.name,
    color: label.color.replace(/^#/, ""),
    description: label.description
  };

  if (dryRun) {
    console.log(`[dry-run] would sync label "${label.name}"`);
    continue;
  }

  const encodedName = encodeURIComponent(label.name);
  const existing = await github("GET", `/repos/${owner}/${repo}/labels/${encodedName}`);
  if (existing) {
    await github("PATCH", `/repos/${owner}/${repo}/labels/${encodedName}`, payload);
    console.log(`Updated label "${label.name}"`);
  } else {
    await github("POST", `/repos/${owner}/${repo}/labels`, payload);
    console.log(`Created label "${label.name}"`);
  }
}
