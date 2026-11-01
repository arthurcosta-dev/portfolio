// Regras inegociáveis do BRIEF (seção 2) como funções puras, para poder testar.

// Tira o conteúdo entre aspas: "git commit -m 'explica push --force'" não é um push.
const stripQuoted = (command) =>
  command.replace(/"(?:\\.|[^"\\])*"|'[^']*'/g, '""');

// Casa "git <sub>", "git -C pasta <sub>" e "git --no-pager <sub>", e o resto do comando.
const gitCommand = (subcommand) =>
  new RegExp(
    `\\bgit(?:\\s+-\\S+(?:\\s+[^-\\s]\\S*)?)*\\s+${subcommand}\\b[^;&|\\n]*`,
  );

const REAL_ENV_FILE =
  /(^|[\s"'/\\])\.env(?!\.example\b)(\.[\w.]+)?(?=$|[\s"'])/m;
const READS_FILE =
  /\b(cat|type|more|less|head|tail|grep|rg|sed|awk|gc|Get-Content|Select-String|cp|copy|mv|git\s+add)\b[^;&|\n]*/gi;

const touchesEnvFile = (command) =>
  (command.match(READS_FILE) ?? []).some((part) => REAL_ENV_FILE.test(part));

export const findViolation = (command, branch) => {
  const code = stripQuoted(command);
  const push = code.match(gitCommand("push"))?.[0] ?? "";
  const commit = code.match(gitCommand("commit"))?.[0] ?? "";

  if (
    /\s(--force|--force-with-lease|--force-if-includes|-[a-zA-Z]*f)\b/.test(
      push,
    ) ||
    /\s\+\S/.test(push)
  ) {
    return "push forçado é proibido (BRIEF, seção 2, item 6).";
  }
  if (/\s(\S*:)?main(\s|$)/.test(push)) {
    return "push direto na main é proibido: abra um PR (BRIEF, seção 2, item 6).";
  }
  if (branch === "main" && (push || commit)) {
    return "você está na main: crie uma branch feature/* antes de commitar ou enviar.";
  }
  if (
    /\s--date\b/.test(commit) ||
    /\bGIT_(AUTHOR|COMMITTER)_DATE\b/.test(code)
  ) {
    return "falsificar data de commit é proibido (BRIEF, seção 2, item 5).";
  }
  if (/\s--no-verify\b/.test(commit) || /\s--no-verify\b/.test(push)) {
    return "pular os hooks do Git com --no-verify é proibido.";
  }
  if (gitCommand("reset").exec(code)?.[0].includes("--hard")) {
    return "git reset --hard é proibido: pode apagar trabalho sem volta.";
  }
  if (/\brm\s+(-[a-zA-Z]*\s+)*-[a-zA-Z]*(r[a-zA-Z]*f|f[a-zA-Z]*r)/.test(code)) {
    return "rm -rf é proibido.";
  }
  if (/\bRemove-Item\b(?=.*\s-Recurse\b)(?=.*\s-Force\b)/i.test(code)) {
    return "Remove-Item -Recurse -Force é proibido.";
  }
  if (touchesEnvFile(command)) {
    return "o .env real tem segredos e a IA não pode ler (.env.example pode).";
  }
  return null;
};
