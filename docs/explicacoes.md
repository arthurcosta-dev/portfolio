# Explicações dos conceitos novos

Cada conceito em linguagem simples, com o exemplo deste projeto.

## Qualidade de código

**ESLint:** lê o código sem executar e aponta erros e regras quebradas. Aqui ele também faz cumprir regras nossas: recusa `fetch` dentro de `components/` e `pages/`, e recusa `<Routes>`. Roda com `npm run lint`.

**Prettier:** formata o código sempre do mesmo jeito (aspas, espaços, quebras de linha). Assim o diff mostra só o que mudou de verdade. O ESLint cuida de erros; o Prettier, da aparência.

**Husky:** o Git consegue rodar scripts em certos momentos, como logo antes de um commit. O Husky guarda esses scripts na pasta `.husky/`, versionada, então eles valem em qualquer máquina que rode `npm install`. Sem ele, os hooks do Git ficariam só no computador de cada um.

**lint-staged:** roda ESLint e Prettier só nos arquivos que entram no commit, em vez do projeto inteiro. É o `.husky/pre-commit` que o chama, e assim o commit continua rápido.

**commitlint:** lê a mensagem do commit e confere o padrão Conventional Commits. É chamado pelo `.husky/commit-msg`. Exemplo real neste projeto: `adicionei a base` foi recusada com `type may not be empty`.

**Conventional Commits:** padrão de mensagem `tipo: descrição`, como `feat: adiciona validação do formulário`. O tipo diz a natureza da mudança (`feat` é funcionalidade, `fix` é correção, `docs` é documentação). O histórico fica legível.

## Testes

**Vitest:** executa os testes e usa a mesma configuração do Vite. Roda com `npm run test`.

**Testing Library:** testa o componente como o usuário o vê: procura um botão pelo nome e clica nele, em vez de olhar detalhes internos. `src/pages/Home.test.jsx` procura o título "Arthur Costa".

**jsdom:** simula o navegador dentro do Node, para os testes terem um `document` sem abrir um navegador de verdade.

## Entrega

**CI (GitHub Actions):** a cada PR, um computador do GitHub baixa o projeto e roda lint, testes e build (`.github/workflows/ci.yml`). Se algo falhar, o PR fica vermelho. Isso pega o que funciona só na minha máquina.

**Proteção de branch:** regra configurada no próprio GitHub, que impede push direto na `main`, mesmo meu. Só entra código por PR, e com o CI verde.

**Pull request (PR):** pedido para juntar uma branch à `main`. Mostra as mudanças, roda o CI e, na Vercel, gera um site de pré-visualização antes de publicar de verdade.

## Harness de IA

**`CLAUDE.md`:** instruções que o Claude Code lê em toda sessão: objetivo, stack, pastas, nomes, commits e limites. É como o guia que um novo colega leria no primeiro dia.

**Permissões do Claude Code:** lista em `.claude/settings.json` do que a IA pode fazer sem perguntar (`allow`) e do que ela nunca pode fazer (`deny`). O resto pede a minha confirmação.

**Hooks do Claude Code:** scripts que o próprio Claude Code executa antes ou depois de uma ferramenta da IA. Diferente de uma instrução escrita, não dependem de a IA lembrar. Exemplo real: ela tentou um `git push --force --dry-run` para testar, e o hook barrou antes de executar. Não confundir com hooks do React (`useState`) nem com hooks do Git (Husky).

**Skill:** um passo a passo guardado em `.claude/skills/<nome>/SKILL.md`, que a IA carrega quando a tarefa combina com a descrição. Evita repetir as mesmas instruções em cada conversa.

**Subagente:** uma IA auxiliar com papel e ferramentas limitados. O `revisor-requisitos` só lê: ele não tem as ferramentas de editar arquivo, e por instrução usa o terminal só para consultar o Git. Assim, revisa o trabalho de outro ponto de vista, sem misturar com a implementação.

**MCP:** forma padrão de ligar a IA a serviços externos, como a Vercel. Este projeto não versiona nenhum (`.mcp.json`); a razão está em `docs/harness.md`.
