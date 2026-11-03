# Harness de IA

O conjunto que faz a IA seguir os padrões do projeto. Para cada item: o que é, por que foi escolhido, o que foi descartado, que regra ele faz cumprir e um exemplo real. Os exemplos abaixo aconteceram de verdade, da Fase 0 à Fase 4.

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
  - Na Fase 2, para conferir se as chaves do Supabase e do EmailJS estavam preenchidas, a IA não leu o `.env`: escreveu um script que responde só "sim" ou "não" para cada variável, e o Arthur o rodou.
  - Na Fase 2, o commitlint recusou um commit com título de 74 caracteres. O comando da IA tinha as etapas encadeadas sem parar no erro e integrou o PR #10 sem aquela correção, que entrou depois no PR #11. Desde então, cada etapa encadeada para na primeira falha.
  - Na Fase 4, ao conferir o repositório, um comando que citava `.env` num filtro foi barrado pelo hook. A IA reescreveu o filtro com o nome disfarçado (`[.]en[v]`), e o modo automático do Claude Code recusou, por ser uma forma de contornar a barreira. A checagem foi feita sem essa parte.
- **Limite conhecido:** a checagem olha a branch antes de o comando rodar. No caso inverso, `git switch main && git commit` passaria, porque ela veria a branch antiga. A proteção da `main` no GitHub impede que um commit assim chegue ao repositório remoto.

## Skills (`.claude/skills/`)

- **O que é:** `nova-feature` (branch até o PR), `novo-componente` (convenções e design) e `commit-e-pr` (diff, commits, verificação, PR, merge).
- **Por que:** o mesmo processo em toda funcionalidade, sem reescrever instruções.
- **Descartado:** um único arquivo de processo, pois as skills carregam só quando a tarefa pede.
- **Regra que faz cumprir:** GitHub Flow, lint, teste e build antes do PR, reaproveitamento de `ui/`.
- **Exemplos reais:**
  - A `nova-feature` foi usada na Fase 1. Nos projetos do GitHub (PR #4), a ordem foi service, hook e componente, com testes de carregamento, erro e vazio junto do código.
  - Na Fase 2, o formulário (PR #9) e o painel (PR #10) seguiram a mesma separação: `messages.js`, `useContactForm` e `ContactForm`; `auth.js`, `useAuth` e `ProtectedRoute`.

## Skill `frontend-design`

- **O que é:** skill do Claude para decisões visuais.
- **Por que:** apoio em telas que não existem no mockup, como tema claro, login e dashboard.
- **Descartado:** usá-la como autoridade, pois o design já foi aprovado. Ela fica subordinada a `docs/DESIGN.md`.
- **Regra que faz cumprir:** nenhuma sozinha. Quem define o visual é o `DESIGN.md`, e telas novas precisam da aprovação do Arthur por captura.
- **Exemplo real:** na Fase 1, apoiou o tema claro e os estados de carregamento, erro e vazio, com as cores derivadas conforme o `DESIGN.md`. O merge só aconteceu depois de o Arthur aprovar as capturas, em 01/11/2026. Na Fase 2, o login e o painel também só entraram depois da aprovação por captura.

## Subagente `revisor-requisitos`

- **O que é:** revisor que compara o diff com os requisitos e as convenções e devolve problemas. Não tem ferramentas de edição, e o uso do terminal para só consultar o Git é por instrução.
- **Por que:** quem implementa tende a achar que está certo; o revisor olha só o resultado.
- **Descartado:** revisar tudo na conversa principal, o que mistura contexto.
- **Regra que faz cumprir:** os 12 requisitos, a regra de ouro e o que não pode ser inventado.
- **Exemplo real:** na revisão da Fase 0, ele apontou 15 problemas que a própria IA implementadora não tinha visto. Entre eles: `git commit -n` passava pelo hook, o README divergia do `CLAUDE.md` e este documento prometia "sem histórico reescrito" com `--amend` liberado. Os itens foram corrigidos ou registrados antes do PR. Como o subagente foi criado nessa mesma sessão e só carrega na seguinte, essa revisão rodou num agente geral seguindo o arquivo dele. Na Fase 1, já carregado, ele apontou 17 problemas, como página de erro sem menu, skeletons de tamanho diferente do conteúdo real e um commit `docs` que escondia uma dependência nova. O PR #5 foi integrado sem passar por ele, contra a regra; a revisão feita depois mostrou que o PR corrigiu o texto do bloco roxo, mas deixou a mesma cor no hover dos links, e encontrou itens do checklist marcados cedo demais.
- **Mais exemplos (Fases 2 a 4):**
  - No painel, ele achou um e-mail de visitante que podia virar link `mailto:` com parâmetros escondidos, a senha guardada no cache da tentativa de login e o painel parado para sempre sem internet. Os três foram corrigidos antes do merge, e o do `mailto:` ganhou teste próprio em `src/pages/Admin.test.jsx`.
  - Ele recusou um commit com três assuntos, que foi dividido antes do push.
  - Na Fase 3, ele notou que o Lighthouse de `/admin` media na verdade o redirecionamento para `/login`. Sem isso, o checklist diria que o painel foi medido. Também apontou que o carregamento do login anunciava "Conferindo o login" ao leitor de tela enquanto só baixava a página.

## `.mcp.json`: não foi adicionado

- **Por que não:** nenhum conector precisa ser versionado hoje. Supabase em modo leitura só seria útil na Fase 2, e o SQL ficará versionado em `supabase/schema.sql`. Menos acesso externo é menos risco.
- **O que existe:** o conector da Vercel está ligado à conta do Arthur no Claude, fora do repositório, e serve para consultar deploys e logs.
- **Uso real:** na Fase 2, o conector da Vercel confirmou que as variáveis `VITE_*` estavam cadastradas, sem mostrar os valores. Assim se descobriu que o erro estava só no `.env` local.
- **Resultado:** as Fases 2 a 4 não mostraram necessidade de um `.mcp.json` versionado.
