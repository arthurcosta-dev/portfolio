// PreToolUse em Bash e PowerShell: sair com código 2 bloqueia o comando.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { findViolation } from "./rules.mjs";

const input = JSON.parse(readFileSync(0, "utf8"));

// Sem branch (Git ausente, por exemplo) as outras regras continuam valendo.
const currentBranch = () => {
  try {
    return execFileSync("git", ["branch", "--show-current"], {
      cwd: process.env.CLAUDE_PROJECT_DIR ?? input.cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
};

const violation = findViolation(input.tool_input.command, currentBranch());

if (violation) {
  console.error(`Bloqueado pelo harness: ${violation}`);
  process.exit(2);
}
