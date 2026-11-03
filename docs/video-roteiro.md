# Roteiro do vídeo

Entrevista simulada para uma vaga de front-end: até 8 minutos, rosto e tela visíveis o tempo todo, YouTube **não listado**. São tópicos para falar com as próprias palavras, não um texto para ler.

## Antes de gravar

- Abas abertas: o site em produção, o repositório no GitHub (com a aba de PRs), `docs/arquitetura.md`, `docs/decisoes.md`, `docs/harness.md` e o VS Code com o Claude Code.
- Feche notificações e deixe o tema do site no escuro.
- Faça um ensaio cronometrado. Se passar de 8 minutos, corte primeiro a demonstração ao vivo do hook (parte 3).
- Painel e login: use a sua conta real, mas não mostre a senha nem e-mails de visitantes que não sejam de teste.

## 0:00 a 0:30: abertura

- Quem você é: estudante de Engenharia de Software na FIAP, focado em front-end.
- O que é o projeto: um portfólio em React, publicado na Vercel. Os projetos vêm da API do GitHub, há formulário de contato e um painel só do dono.

## 0:30 a 3:00: stack e arquitetura

**Na tela:** o site, depois `docs/arquitetura.md`, depois um PR no GitHub.

1. **Demonstração rápida (40 s):**
   - Home e projetos lidos do GitHub.
   - Abrir `/projetos/portfolio` direto pela barra e atualizar a página.
   - Digitar uma rota que não existe e mostrar o 404.
   - Trocar o tema e recarregar: o tema escolhido continua.
   - Erro de validação no formulário.
   - Login e painel: marcar uma mensagem como respondida e escolher um destaque.
2. **Como as peças se conectam:**
   - Vite e React desenham a interface.
   - O React Router cuida das rotas.
   - O TanStack Query cuida dos dados do GitHub, com cache.
   - O Supabase guarda as mensagens e os destaques e faz o login.
   - O EmailJS avisa por e-mail.
   - A Vercel publica o site.
3. **Pastas e fluxo de dados** (diagrama do `arquitetura.md`): o componente só desenha; o hook cuida do estado; o service fala com a API. Exemplo do contato: `ContactForm` → `useContactForm` → `messages.js` → Supabase e EmailJS.
4. **Critério para dividir componentes:**
   - Até ~120 linhas e um assunto por componente.
   - O que aparece em mais de uma página vai para `ui/`.
   - Lógica vai para um hook.
   - O ESLint recusa `fetch` dentro de componente.
5. **Caminho de uma alteração** (segundo diagrama, e um PR real, como o #17):
   1. Branch `perf/*`.
   2. Commit validado pelo Husky (lint, Prettier e commitlint).
   3. Pull request, com o CI rodando lint, testes e build.
   4. Preview da Vercel.
   5. Merge na `main`, que publica sozinho.

## 3:00 a 5:00: justificativas da stack

**Na tela:** a tabela de `docs/decisoes.md`. Para cada item: o que foi comparado, o critério e o que você aceitou perder.

| Escolha                  | Comparei com               | Critério                                                                               | O que perdi                                                                       |
| ------------------------ | -------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| React Router 7           | TanStack Router, wouter    | Visto em aula; tem rota 404, erro de rota e lazy                                       | Menos tipagem                                                                     |
| TanStack Query           | axios, SWR, `useEffect`    | Cache e estados prontos, sem pedir de novo ao GitHub                                   | Uma biblioteca a mais para aprender                                               |
| Tailwind com tokens      | CSS Modules, MUI           | Rápido para o bento; as cores padrão foram removidas, e hex solto é barrado na revisão | HTML mais longo                                                                   |
| Supabase                 | Firebase, back-end em Node | SQL e permissões no próprio banco (RLS), sem servidor                                  | Depende de serviço externo; o plano grátis pausa, e um workflow diário evita isso |
| EmailJS                  | Formspree, back-end        | Sem servidor, plano grátis                                                             | A chave fica pública, e restringir o domínio é pago                               |
| Vercel                   | Netlify, GitHub Actions    | Publica sozinho a cada merge                                                           | Preso à plataforma                                                                |
| Vitest + Testing Library | Playwright                 | Integra com o Vite e é rápido                                                          | Sem teste ponta a ponta em navegador real                                         |

Fale também de uma decisão de performance. A home lê os destaques do Supabase com `fetch` puro, sem a biblioteca, para o visitante não baixar 55 kB a mais. O Lighthouse mobile ficou entre 92 e 99.

## 5:00 a 7:30: harness de IA

**Na tela:** `CLAUDE.md`, `.claude/settings.json`, `.claude/hooks/`, `.claude/skills/`, `.claude/agents/` e `docs/harness.md`.

1. **Ferramenta e modelo:**
   - Claude Code na extensão do VS Code, com o Claude Opus 5.5.
   - Escolhi porque ele lê o projeto, roda comandos e testes, e porque hooks, skills e subagente ficam versionados no repositório.
   - O chat no navegador foi descartado, porque não verifica nada no projeto.
2. **`CLAUDE.md`:**
   - É curto e tem os limites inegociáveis.
   - A regra de rotas nasceu de um erro da IA em outro trabalho.
3. **Permissões e hooks:**
   - **A ideia central:** instrução escrita a IA pode esquecer, então as regras importantes têm uma barreira automática.
   - **Exemplos reais:** o push forçado foi barrado. O commit na `main` foi barrado. Ao conferir o repositório, um comando que citava o `.env` foi barrado. Quando a IA tentou disfarçar o nome, o modo automático recusou.
   - **Opcional, ao vivo:** peça à IA um `git push --force --dry-run` e mostre o bloqueio.
4. **Skills:**
   - `nova-feature`, `novo-componente` e `commit-e-pr` repetem o mesmo processo em cada funcionalidade.
   - A ordem é sempre service, hook e componente.
5. **Subagente `revisor-requisitos`:**
   - Só lê o código e compara o diff com os requisitos.
   - **Exemplo:** ele percebeu que o Lighthouse do `/admin` media na verdade o login. Sem isso, o checklist teria uma evidência falsa.
6. **Conectores (MCP):**
   - O da Vercel ficou na conta, fora do repositório, e confirmou as variáveis sem mostrar os valores.
   - Não versionei `.mcp.json`, porque menos acesso é menos risco.
7. **Como isso faz a IA seguir os padrões:** mostre a tabela do topo de `docs/harness.md`, com a regra, a instrução e a barreira automática.

## 7:30 a 8:00: fechamento

- Resultado: 12 requisitos cumpridos, 162 testes, Lighthouse mobile acima de 90 e deploy automático.
- O que você aprendeu ou faria diferente. Fale com as suas palavras; não está escrito aqui de propósito.
