// PostToolUse em Edit e Write: formata com Prettier o arquivo que a IA acabou de mexer.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8"));
const prettier = "node_modules/prettier/bin/prettier.cjs";

const result = spawnSync(
  process.execPath,
  [prettier, "--write", "--ignore-unknown", input.tool_input.file_path],
  { cwd: process.env.CLAUDE_PROJECT_DIR ?? input.cwd, encoding: "utf8" },
);

if (result.status !== 0) {
  console.error(result.stderr);
  process.exit(1);
}
