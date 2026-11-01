// Regras inegociáveis do BRIEF (seção 2) como funções puras, para poder testar.
// É uma trava contra engano, não um cofre: um comando bem disfarçado ainda pode passar.

// Em "bash -c '...'" o que está entre aspas é o próprio comando.
const SHELL_WRAPPER =
  /\b(bash|sh|zsh|pwsh|powershell)(\.exe)?\s+-(c|command)\b/i;

// Tira o conteúdo entre aspas: "git commit -m 'explica push --force'" não é um push.
const normalize = (command) =>
  SHELL_WRAPPER.test(command)
    ? command.replace(/["']/g, " ")
    : command.replace(/"(?:\\.|[^"\\])*"|'[^']*'/g, '""');

// Todas as ocorrências de "git <sub>", "git -C pasta <sub>", "git --no-pager <sub>".
const gitCommand = (code, subcommand) => {
  const pattern = new RegExp(
    `\\bgit(?:\\s+-\\S+(?:\\s+[^-\\s]\\S*)?)*\\s+${subcommand}\\b[^;&|\\n]*`,
    "g",
  );
  return (code.match(pattern) ?? []).join(" ");
};

const isForcedPush = (push) =>
  /\s(--force|--force-with-lease|--force-if-includes|-[a-zA-Z]*f)\b/.test(
    push,
  ) || /\s\+\S/.test(push);

const skipsGitHooks = (command, code, commit, push) =>
  /\s--no-verify\b/.test(`${commit} ${push}`) ||
  /\s-[a-zA-Z]*n[a-zA-Z]*\b/.test(commit) ||
  /\bHUSKY["']?\s*=\s*["']?0/.test(command) ||
  /\s-c\s+core\.hooksPath/i.test(code) ||
  /\bgit\s+config\s+(\S+\s+)*core\.hooksPath\s+[^;&|\s]/i.test(code);

const deletesInBulk = (code) => {
  const isUnixBulk = (code.match(/\brm\s[^;&|\n]*/g) ?? []).some(
    (part) =>
      /\s(-[a-zA-Z]*r[a-zA-Z]*|--recursive)\b/i.test(part) &&
      /\s(-[a-zA-Z]*f[a-zA-Z]*|--force)\b/i.test(part),
  );
  return (
    isUnixBulk ||
    /\b(Remove-Item|ri|rm|del|rd|rmdir)\b[^;&|\n]*\s-Recurse\b/i.test(code)
  );
};

const REAL_ENV_FILE =
  /(^|[\s"'/\\])\.env(?!\.example\b)(\.[\w.]+)?(?=$|[\s"'])/m;
const READS_FILE =
  /\b(cat|type|more|less|head|tail|grep|rg|sed|awk|gc|Get-Content|Select-String|cp|copy|mv|git\s+add)\b[^;&|\n]*/g;

const touchesEnvFile = (command) =>
  (command.match(READS_FILE) ?? []).some((part) => REAL_ENV_FILE.test(part));

export const findViolation = (command, branch) => {
  const code = normalize(command);
  const push = gitCommand(code, "push");
  const commit = gitCommand(code, "commit");

  if (isForcedPush(push)) {
    return "push forçado é proibido (BRIEF, seção 2, item 6).";
  }
  if (/\s(\S*:)?(refs\/heads\/)?main(\s|$)/.test(push)) {
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
  if (skipsGitHooks(command, code, commit, push)) {
    return "pular os hooks do Git é proibido: corrija o que eles apontam.";
  }
  if (gitCommand(code, "reset").includes("--hard")) {
    return "git reset --hard é proibido: pode apagar trabalho sem volta.";
  }
  if (deletesInBulk(code)) {
    return "apagar pastas em massa é proibido.";
  }
  if (touchesEnvFile(command)) {
    return "o .env real tem segredos e a IA não pode ler (.env.example pode).";
  }
  return null;
};
