// Unit tests for scripts/validate-hub.mjs.
//
// Each test runs the real validator as a subprocess against a fixture "hub"
// under test/fixtures/, using the HUB_VALIDATE_ROOT env hook to point repoRoot
// at the fixture. We assert on the process exit code and the emitted message,
// so the tests exercise exactly what CI runs.

import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const validator = path.resolve(here, "..", "scripts", "validate-hub.mjs");

function runValidator(fixture) {
  const result = spawnSync(process.execPath, [validator], {
    env: { ...process.env, HUB_VALIDATE_ROOT: path.join(here, "fixtures", fixture) },
    encoding: "utf8"
  });
  return { code: result.status, out: result.stdout ?? "", err: result.stderr ?? "" };
}

test("a clean hub passes", () => {
  const r = runValidator("good");
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /Validation passed/);
});

test("a stdio MCP connector is rejected", () => {
  const r = runValidator("stdio");
  assert.equal(r.code, 1);
  assert.match(r.err, /local\/stdio connector/);
});

test("an unlisted plugin is a hard error", () => {
  const r = runValidator("unlisted");
  assert.equal(r.code, 1);
  assert.match(r.err, /not listed/);
});

test("a metadata.wip plugin warns instead of failing", () => {
  const r = runValidator("wip");
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /Validation passed/);
});

test("a triggers: frontmatter key is rejected", () => {
  const r = runValidator("triggers");
  assert.equal(r.code, 1);
  assert.match(r.err, /triggers/);
});

test("a committed secret is caught by the privacy scan", () => {
  const r = runValidator("secret");
  assert.equal(r.code, 1);
  assert.match(r.err, /literal secret/);
});
