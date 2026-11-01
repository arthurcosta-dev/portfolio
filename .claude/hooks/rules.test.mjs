import { describe, expect, it } from "vitest";
import { findViolation } from "./rules.mjs";

const FEATURE = "feature/dashboard";

describe("findViolation", () => {
  it.each([
    ["git commit -m 'feat: algo'", "main"],
    ["git push -u origin main", "main"],
    ["git -C . commit -m x", "main"],
    ["git push origin main", FEATURE],
    ["git push origin HEAD:main", FEATURE],
    ["git push --force origin feature/x", FEATURE],
    ["git push origin feature/x -f", FEATURE],
    ["git push --force-with-lease", FEATURE],
    ["git push origin +feature/x", FEATURE],
    ["git commit --date=2026-10-01 -m x", FEATURE],
    ["GIT_AUTHOR_DATE=2026-10-01 git commit -m x", FEATURE],
    ["git commit --no-verify -m x", FEATURE],
    ["git reset --hard HEAD~1", FEATURE],
    ["rm -rf dist", FEATURE],
    ["rm -fr dist", FEATURE],
    ["Remove-Item dist -Recurse -Force", FEATURE],
    ["cat .env", FEATURE],
    ['Get-Content ".env.local"', FEATURE],
    ["git add .env", FEATURE],
  ])("bloqueia %s (branch %s)", (command, branch) => {
    expect(findViolation(command, branch)).toEqual(expect.any(String));
  });

  it.each([
    ["git status", "main"],
    ["git log --oneline", "main"],
    ["git pull --ff-only origin main", "main"],
    ["git switch -c feature/x", "main"],
    ["git commit -m 'docs: explica por que push --force é proibido'", FEATURE],
    ["git push -u origin feature/main-x", FEATURE],
    ["git push -u origin feature/x", FEATURE],
    ["git reset --soft HEAD~1", FEATURE],
    ["cat .env.example", FEATURE],
    ["npm run build", FEATURE],
  ])("libera %s (branch %s)", (command, branch) => {
    expect(findViolation(command, branch)).toBeNull();
  });
});
