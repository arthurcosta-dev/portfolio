# Harness de IA

O conjunto que faz a IA seguir os padrões do projeto. Para cada item: o que é, por que foi escolhido, o que foi descartado, que regra ele faz cumprir e um exemplo real. Os exemplos abaixo aconteceram nas Fases 0 e 1; o Arthur completa com o que observar depois.

**A ideia central:** instrução escrita a IA pode esquecer. Por isso as regras importantes têm uma segunda barreira automática, que não depende de ela lembrar. Essas barreiras evitam enganos; não são um cofre, e um comando disfarçado de propósito ainda pode passar.

| Regra                             | Instrução           | Barreira automática                                |
| --------------------------------- | ------------------- | -------------------------------------------------- |
| Nunca commitar na `main`          | `CLAUDE.md`         | Hook do Claude Code e proteção da `main` no GitHub |
| Sem `push --force`                | `CLAUDE.md`         | `deny`, hook e proteção da `main`                  |
| Padrão de commit                  | `CLAUDE.md`         | commitlint (Husky)                                 |
| Formatação                        | `CLAUDE.md`         | Hook com Prettier e lint-staged                    |
| Lógica fora do componente         | `CLAUDE.md`, skills | ESLint e `revisor-requisitos`                      |
| Rotas com `createBrowserRouter`   | `CLAUDE.md`         | ESLint e `revisor-requisitos`                      |
| Código funcionando antes do merge | Skill `commit-e-pr` | CI no GitHub Actions                               |

## Ferramenta e modelo

- **O que é:** Claude Code na extensão do VS Code, com o modelo Claude Opus 5.5 (`claude-opus-5-5`).
- **Por que:** lê o repositório inteiro, executa comandos e testes, e tem hooks, skills e subagentes versionáveis. Sem isso, o harness não ficaria no repositório. O modelo foi escolhido pela qualidade em código front-end.
- **Descartado:** chat no navegador, que não executa nem verifica nada no projeto.
- **Regra que faz cumprir:** é a base das demais.

## `CLAUDE.md`

- **O que é:** instruções carregadas em toda sessão.
- **Por que:** curto de propósito; os detalhes ficam em `docs/`, para não gastar contexto.
- **Descartado:** repetir as regras em cada mensagem, ou colocar o BRIEF inteiro nele.
- **Regra que faz cumprir:** arquitetura, nomes, commits, branches e limites inegociáveis. O README descreve as mesmas convenções.
- **Exemplo real:** a regra de rotas veio de um comentário sobre outro trabalho do Arthur, em que a IA usou `<Routes>`/`<Route>`. O problema virou regra aqui e no ESLint.

## `.claude/settings.json`: permissões

- **O que é:** `allow` para o fluxo do dia a dia (`npm run`, `git status/diff/log/add/commit/switch/branch/push`, `gh pr`) e `deny` para o perigoso.
- **Por que:** menos confirmações repetidas no que é seguro, e veto no que é irreversível. Vale para Bash **e** PowerShell, porque o Claude Code usa os dois neste Windows.
- **Descartado:** liberar tudo (perigoso) ou confirmar tudo (lento, e confirmar vira hábito).
- **Regra que faz cumprir:** o `.env` real não é lido pela ferramenta `Read`, o histórico do remoto não é reescrito por push forçado e não há `reset --hard` nem apagar em massa. `git commit --amend` continua liberado, porque só altera commits locais.
- **Exemplos reais:**
  - A regra `.env*` do BRIEF bloquearia também o `.env.example`, por isso o `deny` lista só os arquivos reais.
  - O `git push` sem force foi acrescentado ao `allow`, porque o fluxo de PR precisa dele a todo momento.

## `.claude/settings.json`: hooks

- **O que é:**
  - `PreToolUse` em `Bash|PowerShell` roda `.claude/hooks/guard-commands.mjs`, que bloqueia o comando.
  - `PostToolUse` em `Edit|Write` roda `.claude/hooks/format-file.mjs`, que aplica o Prettier.
- **Por que:** os limites viram código, testado em `rules.test.mjs`. Escritos em Node para funcionar em qualquer sistema, sem depender de `jq`.
- **Descartado:** só o `deny`, que compara o começo do comando e não enxerga a branch atual; e só Bash, como previa o BRIEF, pois o PowerShell ficaria sem proteção.
- **Regra que faz cumprir:** sem commit ou push na `main`, sem force, sem pular os hooks do Git (`--no-verify`, `-n`, `HUSKY=0`, `core.hooksPath`), sem data falsa, sem `reset --hard`, sem apagar em massa e sem ler o `.env` real com os comandos comuns de terminal (`cat`, `grep`, `Get-Content` e parecidos).
- **Exemplos reais:**
  - `git push --force --dry-run` foi barrado no Bash e no PowerShell antes de executar.
  - `git commit --dry-run` na `main` foi barrado com "você está na main".
  - Um arquivo com `const   a   =  1` foi salvo pela IA e o hook o deixou como `const a = 1;`.
  - O primeiro teste do guard mostrou que, fora do repositório, ele falharia e bloquearia todo comando. Foi corrigido para consultar sempre a pasta do projeto e, sem branch, manter as outras regras.
  - Na Fase 0, a IA estava na `main` e tentou `git switch chore/harness-e-base && git commit` num comando só. O hook bloqueou, e ela rodou os dois separados.
- **Limite conhecido:** a checagem olha a branch antes de o comando rodar. No caso inverso, `git switch main && git commit` passaria, porque ela veria a branch antiga. A proteção da `main` no GitHub impede que um commit assim chegue ao repositório remoto.

## Skills (`.claude/skills/`)

- **O que é:** `nova-feature` (branch até o PR), `novo-componente` (convenções e design) e `commit-e-pr` (diff, commits, verificação, PR, merge).
- **Por que:** o mesmo processo em toda funcionalidade, sem reescrever instruções.
- **Descartado:** um único arquivo de processo, pois as skills carregam só quando a tarefa pede.
- **Regra que faz cumprir:** GitHub Flow, lint, teste e build antes do PR, reaproveitamento de `ui/`.
- **Exemplo real:** a `nova-feature` conduziu a Fase 1 na ordem service, hook e componente, com testes de carregamento, erro e vazio junto do código.

## Skill `frontend-design`

- **O que é:** skill do Claude para decisões visuais.
- **Por que:** apoio em telas que não existem no mockup, como tema claro, login e dashboard.
- **Descartado:** usá-la como autoridade, pois o design já foi aprovado. Ela fica subordinada a `docs/DESIGN.md`.
- **Regra que faz cumprir:** nenhuma sozinha. Quem define o visual é o `DESIGN.md`, e telas novas precisam da aprovação do Arthur por captura.
- **Exemplo real:** na Fase 1, apoiou o tema claro e os estados de carregamento, erro e vazio, dentro das cores do `DESIGN.md`. O merge só aconteceu depois de o Arthur aprovar as capturas, em 01/11/2026.

## Subagente `revisor-requisitos`

- **O que é:** revisor que compara o diff com os requisitos e as convenções e devolve problemas. Não tem ferramentas de edição, e o uso do terminal para só consultar o Git é por instrução.
- **Por que:** quem implementa tende a achar que está certo; o revisor olha só o resultado.
- **Descartado:** revisar tudo na conversa principal, o que mistura contexto.
- **Regra que faz cumprir:** os 12 requisitos, a regra de ouro e o que não pode ser inventado.
- **Exemplo real:** na revisão da Fase 0, ele apontou 15 problemas que a própria IA implementadora não tinha visto. Entre eles: `git commit -n` passava pelo hook, o README divergia do `CLAUDE.md` e este documento prometia "sem histórico reescrito" com `--amend` liberado. Os itens foram corrigidos ou registrados antes do PR. Como o subagente foi criado nessa mesma sessão e só carrega na seguinte, essa revisão rodou num agente geral seguindo o arquivo dele. Na Fase 1, já carregado, ele apontou 17 problemas, como página de erro sem menu, skeletons de tamanho diferente do conteúdo real e um commit `docs` que escondia uma dependência nova.

## `.mcp.json`: não foi adicionado

- **Por que não:** nenhum conector precisa ser versionado hoje. Supabase em modo leitura só seria útil na Fase 2, e o SQL ficará versionado em `supabase/schema.sql`. Menos acesso externo é menos risco.
- **O que existe:** o conector da Vercel está ligado à conta do Arthur no Claude, fora do repositório, e serve para consultar deploys e logs.
- **Quando mudar:** se a Fase 2 mostrar uma necessidade clara, adiciono com escopo mínimo e sem chave no arquivo, e registro aqui.
