# BRIEF: portfólio do Arthur Costa (CP3 WebDev, FIAP)

Leia este arquivo inteiro antes de qualquer ação. Complementos: `docs/requisitos-CP3.md` (enunciado oficial) e `docs/DESIGN.md` (visual: o que seguir e o que mudar).

## 1. Contexto

- **Quem:** Arthur Costa, 1º ano de Engenharia de Software na FIAP, quer estágio em desenvolvimento web (front-end). GitHub: `arthurcosta-dev`.
- **O que:** portfólio em React publicado na Vercel, repositório público e vídeo de até 8 min (entrevista simulada sobre a stack e o harness de IA).
- **Prazo:** terça, 03/11/2026. Hoje é domingo, 01/11. Há pouco tempo: priorize o que é requisito, não adicione nada fora da lista.
- **Nível:** o Arthur viu em aula HTML, CSS, JavaScript, Vite, Node, React, Tailwind, Bootstrap, SPA, React Router, `useState` e `useEffect`. **Não viu back-end.** Todo conceito novo (TanStack Query, Supabase, RLS, Husky, commitlint, etc.) deve ser explicado em linguagem simples antes de usar, e registrado em `docs/explicacoes.md`. Ele precisa saber explicar tudo no vídeo.
- **Idioma:** conversa e documentação em português. Texto da interface em pt-BR. Identificadores de código em inglês. Rotas em português (`/projetos`).

## 2. Limites inegociáveis

1. Os 12 requisitos de `docs/requisitos-CP3.md` são obrigatórios. Nenhum pode ser cortado nem trocado por "depois".
2. JavaScript (não TypeScript). Estilo de código como o que ele aprendeu: componentes em arrow function com `export default`, `src/pages`, `src/components`.
3. Nenhum projeto cadastrado à mão: tudo vem da API do GitHub.
4. Nenhum segredo no repositório. `.env` no `.gitignore`, `.env.example` versionado. Nunca use a `service_role` do Supabase no front-end. Nenhum token do GitHub no bundle.
5. Histórico de commits **real**, distribuído até o prazo. Nunca falsifique datas (`--date`, `GIT_AUTHOR_DATE`) nem faça commits artificiais.
6. Nunca faça commit direto na `main`. Nunca `push --force`.
7. Não invente conteúdo sobre o Arthur (cargos, métricas, depoimentos, datas, cidade, idade). Dados pessoais ficam em `src/config/site.js` com placeholder `TODO` até ele informar.
8. Não adicione dependências, páginas ou recursos fora deste brief sem perguntar.
9. Lighthouse mobile >= 80 em produção é critério de pronto, não "se der tempo".

## 3. Stack decidida (com as alternativas, para o vídeo)

| Área | Escolha | Alternativas comparadas | Critério | O que se aceita perder |
|---|---|---|---|---|
| Build/SPA | Vite + React 19 | Next.js, CRA | Foi o que a turma usou; build rápido; SPA simples | Sem SSR/SEO por servidor |
| Rotas | React Router 7 (`createBrowserRouter`) | TanStack Router, wouter | Já visto em aula; suporta `errorElement`, `path:"*"` e lazy por rota | Menos tipagem que TanStack Router |
| Refresh/deep link | `vercel.json` com rewrite para `/index.html` | `.htaccess`, `_redirects` | Deploy na Vercel | Config específica da Vercel |
| Estilo | Tailwind CSS (tokens no tema) | CSS Modules, MUI, shadcn | Exigência do Arthur; já viu; rápido para bento grid | HTML mais verboso |
| Dados do GitHub | `fetch` + TanStack Query | axios, SWR, `useEffect` manual | Cache, `isLoading/isError`, sem requisição repetida ao navegar | Uma dependência nova a aprender |
| Estado global | Context API (tema e sessão) | Zustand, Redux Toolkit | Pouco estado; nativo; ele conhece Context e hooks | Menos ferramentas de debug |
| Tema | Context + `localStorage` + classe `dark` no `<html>` | biblioteca de tema | Simples e explicável; script inline no `index.html` evita piscar | Código próprio para manter |
| Formulário | Validação manual com `useState` | React Hook Form, Zod | Decisão do Arthur; poucos campos; sem dependência | Mais código repetido |
| Back-end do dashboard | Supabase (Auth + Postgres + RLS) | Firebase, Appwrite, PocketBase, Node próprio | Plano grátis, SQL, RLS protege no banco, sem servidor para manter | Dependência de serviço externo; RLS exige cuidado |
| E-mail | EmailJS (envio pelo navegador) | Formspree, backend próprio | Sem servidor; plano grátis | Chaves públicas no bundle (limite por domínio e por cota) |
| Testes | Vitest + Testing Library | Playwright | Integra com Vite; rápido de rodar no commit/CI | Sem teste ponta a ponta no navegador real |
| Qualidade | ESLint + Prettier + Husky + lint-staged | Biome | Padrão de mercado; Husky roda antes do commit | Mais pacotes que Biome |
| Commits | Conventional Commits + commitlint (no hook `commit-msg`) | Gitmoji | Padrão de mercado; valida automático | Regra rígida para escrever |
| Branches | GitHub Flow: `feature/*` -> PR -> `main` | Git Flow, trunk-based | Simples para uma pessoa; cada feature isolada; histórico claro | Sem branch de release |
| Deploy | Vercel conectada ao GitHub (push em `main` publica; PR gera preview) | Netlify, GitHub Actions | Pedido no enunciado como exemplo; zero configuração | Preso à plataforma |
| Fontes | `@fontsource` hospedadas no projeto | Google Fonts | Menos requisições externas; melhor Lighthouse | Pacotes extras |
| Análise de bundle | `rollup-plugin-visualizer` | `source-map-explorer` | Gera evidência para o vídeo | Só em dev/build de análise |

Se mudar qualquer escolha, registre em `docs/decisoes.md` com a razão.

## 4. Arquitetura e convenções

```
src/
  main.jsx            entrada (providers + router)
  routes.jsx          definição das rotas (lazy onde indicado)
  config/site.js      dados pessoais (nome, e-mail, LinkedIn, GitHub user) e textos fixos
  components/
    ui/               Button, Card, Tag, Skeleton, Spinner, ErrorState, EmptyState
    layout/           Header, Footer, Layout
    home/             Hero, FeaturedProjects, AboutBento, ContactSection, StarField, OrbitObject...
    projects/         ProjectCard, ProjectRow, ProjectCardSkeleton...
    contact/          ContactForm
    admin/            MessageList, FeaturedSelector
  pages/              Home, Projects, ProjectDetail, Login, Admin, NotFound, RouteError
  hooks/              useRepos, useRepo, useFeatured, useTheme, useAuth, useContactForm
  services/           github.js, supabase.js, messages.js, featured.js, email.js
  context/            ThemeContext, AuthContext
  utils/              validators.js, formatDate.js, languageColors.js
  test/               setup e utilitários de teste
docs/                 requisitos, brief, design, arquitetura, decisões, harness, explicações, checklist, roteiro do vídeo
```

**Regra de ouro:** componente de apresentação não chama `fetch`/Supabase. Chamadas ficam em `services/`; o estado e o ciclo de vida ficam em `hooks/`; o componente só recebe dados e desenha. Componentes com até ~120 linhas; passou disso, divida. Validação em `utils/validators.js` (funções puras, testáveis).

**Nomenclatura:** componentes e arquivos de componente em PascalCase (`ProjectCard.jsx`); hooks `useAlgo.js`; services e utils em camelCase; pastas em minúsculas; constantes `UPPER_SNAKE_CASE`; testes ao lado do arquivo como `Algo.test.jsx`; variáveis de ambiente `VITE_*`; classes Tailwind com tokens do tema (nunca hex solto).

**Commits (Conventional Commits, tipo em inglês, descrição em português, imperativo, minúsculas, sem ponto final, até 72 caracteres):** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`. Ex.: `feat: adiciona validação do formulário de contato`. Escopo opcional: `feat(admin): lista mensagens recebidas`. Commits pequenos, um assunto por commit.

**Branches:** `main` sempre publicável. Trabalho em `feature/<nome>`, `fix/<nome>`, `docs/<nome>`, `chore/<nome>`. Abrir PR para `main` (`gh pr create`), com descrição do que mudou e como testar, e integrar com **merge commit** (preserva o histórico). Apagar a branch depois. Proteger a `main` (exigir PR) se o plano do GitHub permitir.

**Automático antes do commit:** Husky `pre-commit` roda `lint-staged` (ESLint `--fix` e Prettier nos arquivos alterados); `commit-msg` roda commitlint. Antes de abrir PR, rodar `npm run lint`, `npm run test` e `npm run build`. Se houver CI no GitHub Actions (opcional, simples), repete esses três.

## 5. Como cada requisito será atendido

| # | Requisito | Como |
|---|---|---|
| 1 | Rotas | `/`, `/projetos`, `/projetos/:nome`, `/login`, `/admin`, `*` (404) e `errorElement` para erro de rota. `/projetos/:nome` busca o repositório pelo nome (reaproveita o cache da lista). `vercel.json` com rewrite para recarregar qualquer rota. Falha da API = componente `ErrorState` com "Tentar de novo". |
| 2 | Carregamento | Todo dado de API passa por TanStack Query: `isPending` mostra skeleton, `isError` mostra `ErrorState`, lista vazia mostra `EmptyState`. Formulário: botão desabilitado + spinner enquanto envia (e proteção contra duplo envio por `useRef`/estado). Dashboard também tem os três estados. |
| 3 | GitHub | `GET https://api.github.com/users/arthurcosta-dev/repos?per_page=100&sort=updated`: **uma única requisição**. Usar apenas os campos dessa resposta (sem `/languages` por repositório: o limite sem token é 60/h). Filtrar forks, arquivados e o repositório de perfil `arthurcosta-dev`. Tratar 403/429 (limite) com mensagem amigável. Sem token no bundle. |
| 4 | Formulário | Campos nome, e-mail, mensagem. Validação manual por campo (ao sair do campo e ao enviar), mensagem específica por erro. Fluxo: valida -> `insert` no Supabase -> se salvou, tenta EmailJS -> sucesso. Se salvar falhar: erro. Se só o e-mail falhar: considerar enviado (a mensagem está no dashboard) e registrar o aviso. Campo oculto (honeypot) contra robôs. Sucesso/erro em região `aria-live`. |
| 5 | Dashboard | `/admin` protegido por `ProtectedRoute` (sem sessão -> `<Navigate to="/login">`). Login por e-mail/senha com Supabase Auth. Lista de mensagens (mais recentes primeiro) com botão "Marcar como respondida" (e desmarcar). Seleção de destaques: lista dos repositórios com chave liga/desliga e ordem; grava em `featured_projects`. Página carregada com `React.lazy`. Botão sair. |
| 6 | Tema | `ThemeContext` + `localStorage` (`theme`), padrão escuro. Script inline no `index.html` aplica a classe antes do React (sem piscar). Respeita a escolha salva, não o sistema, na primeira visita abre escuro. |
| 7 | Interface | Mobile-first, testar em 360, 390, 768, 1024, 1360 e 1920 px. Componentes de `ui/` reutilizados em todas as páginas. Identidade = céu/órbita do `DESIGN.md`. |
| 8 | Performance | Fontes locais (só latin e pesos usados, `preload` da fonte do título se ajudar); imagens em WebP/AVIF com `width`/`height` e `loading="lazy"` (a abertura não tem imagem pesada); `Admin`, `ProjectDetail` e `Login` com `React.lazy`; `OrbitObject`/`StarField` leves (SVG/CSS); altura reservada para skeletons (sem CLS); TanStack Query com `staleTime` de 10 min, `refetchOnWindowFocus: false`; análise com `rollup-plugin-visualizer`. **Medir Lighthouse mobile na URL da Vercel já na Fase 1 (não esperar a Fase 3) e de novo no fim.** |
| 9 | Testes | Vitest + Testing Library. Mínimo: validadores (nome vazio, e-mail inválido, mensagem curta, caso válido); `ContactForm` mostra a mensagem certa por campo e bloqueia o botão durante o envio; `ProtectedRoute`/`/admin` redireciona sem sessão e mostra o conteúdo com sessão. Mock de Supabase e EmailJS. `npm run test` deve passar no CI e antes do PR. |
| 10 | Deploy | Vercel conectada ao repositório: push em `main` publica sozinho. Variáveis `VITE_*` configuradas na Vercel. Registrar a URL no README. |
| 11 | Versionamento | Seção 4 acima, no README **e** em `CLAUDE.md`. Husky + commitlint. Histórico real em PRs. |
| 12 | Arquitetura | Seção 4 acima, no README **e** em `CLAUDE.md`. ESLint + Prettier + lint-staged no pre-commit. |
| Repo | Repositório | Público; `.env` ignorado; `.env.example` completo; README com projeto, tecnologias, como rodar, scripts, convenções, link do deploy e do vídeo. |

## 6. Supabase

Tabelas (SQL em `supabase/schema.sql`, versionado; o Arthur roda no SQL Editor):

```sql
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 5 and 254),
  message text not null check (char_length(message) between 20 and 2000),
  answered boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.featured_projects (
  repo_name text primary key check (char_length(repo_name) between 1 and 100),
  position int not null default 0
);

alter table public.messages enable row level security;
alter table public.featured_projects enable row level security;

-- visitantes (anon) só podem inserir mensagens, nunca ler
create policy "anon insere mensagens" on public.messages
  for insert to anon, authenticated with check (answered = false);

-- só o dono logado lê e atualiza mensagens
create policy "dono le mensagens" on public.messages
  for select to authenticated using (true);
create policy "dono atualiza mensagens" on public.messages
  for update to authenticated using (true) with check (true);

-- destaques: todos leem, só o dono escreve
create policy "todos leem destaques" on public.featured_projects
  for select to anon, authenticated using (true);
create policy "dono escreve destaques" on public.featured_projects
  for all to authenticated using (true) with check (true);
```

Pontos de segurança (explicar ao Arthur): a chave `anon` fica no front-end de propósito e é segura **porque** o RLS limita o que ela faz; a `service_role` nunca entra no projeto; o cadastro público (sign-ups) deve ser **desativado** em Authentication e o usuário dono criado manualmente; mesmo assim as policies acima liberam `select/update` a qualquer usuário autenticado, então o cadastro desativado é obrigatório. Alternativa mais restrita (opcional): comparar `auth.jwt() ->> 'email'` com o e-mail do dono nas policies.

## 7. Variáveis de ambiente (`.env.example`)

```
VITE_GITHUB_USER=arthurcosta-dev
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Template do EmailJS usa `{{name}}`, `{{email}}`, `{{message}}`. Restringir o domínio permitido no painel do EmailJS depois do deploy.

## 8. Harness de IA (versionado no repositório, é parte da nota)

Montar na **Fase 0**, antes do código, porque o vídeo pede para justificar cada item:

- `CLAUDE.md` (curto, direto): objetivo, stack, estrutura de pastas, nomenclatura, regra de ouro (lógica fora de componente), padrão de commit, estratégia de branches, comandos (`npm run dev/lint/test/build`), limites inegociáveis da seção 2 e onde ficam `docs/`. Referenciar `docs/DESIGN.md` para trabalho visual.
- `.claude/settings.json`: permissões (permitir `npm run *`, `git status/diff/log/add/commit/switch/branch`, `gh pr *`; **negar** leitura de `.env*`, `git push --force*`, `git reset --hard*`, `rm -rf*`); hooks: `PostToolUse` em `Edit|Write` rodando Prettier no arquivo; `PreToolUse` em `Bash` bloqueando `git commit`/`git push` quando a branch atual é `main`.
- `.claude/skills/` (cada uma com `SKILL.md` curto): `nova-feature` (criar branch `feature/*`, implementar, lint/test/build, commits convencionais, PR); `novo-componente` (criar componente seguindo as convenções e o design); `commit-e-pr` (revisar diff, mensagem convencional, abrir PR).
- `.claude/agents/revisor-requisitos.md`: subagente somente leitura que confere o diff contra `docs/requisitos-CP3.md` e as convenções, devolvendo lista de problemas. Usar antes de cada PR e no fim.
- Skill `frontend-design` do Claude para decisões visuais, sempre subordinada ao `docs/DESIGN.md`.
- `.mcp.json`: **só** se houver justificativa clara (ex.: Supabase em modo somente leitura e restrito ao projeto, para o Claude conferir tabelas e policies; Vercel para ver logs de deploy). Se adicionar, escopo mínimo, sem chaves no arquivo (usar variáveis), e explicar no `docs/harness.md`. Se não houver justificativa, não adicionar e dizer isso no vídeo.
- Ferramenta e modelo: Claude Code (no VS Code) com o modelo escolhido pelo Arthur. Registrar o nome do modelo em `docs/harness.md` e por que (qualidade em código front-end e leitura de repositório inteiro, execução de comandos, hooks e skills versionáveis).
- `docs/harness.md`: para cada item acima, **o que é, por que escolhi, o que descartei, que regra do projeto ele faz a IA seguir**, com um exemplo real que aconteceu no projeto (o Arthur completa com o que observar).

## 9. Documentos para o vídeo (manter atualizados ao longo do trabalho)

- `docs/arquitetura.md`: árvore de pastas comentada, diagrama simples do fluxo de dados (componente -> hook -> service -> API/Supabase; use Mermaid), critério de divisão de componentes, caminho de uma alteração (branch -> commits com hook -> PR -> merge -> deploy na Vercel).
- `docs/decisoes.md`: tabela da seção 3, com o que de fato foi decidido e por quê, e o que se aceitou perder.
- `docs/harness.md`: seção 8.
- `docs/explicacoes.md`: cada conceito novo em 3 a 5 linhas, linguagem simples, com exemplo do próprio projeto.
- `docs/CHECKLIST.md`: os 12 requisitos + repositório + vídeo, cada item marcado só com evidência (arquivo, teste, URL, print ou nota do Lighthouse).
- `docs/video-roteiro.md`: roteiro de 8 minutos (0:00-0:30 abertura e demo rápida; 0:30-3:00 stack e arquitetura com diagrama e pastas; 3:00-5:30 justificativas (opções, critério, perda); 5:30-7:30 harness mostrando os arquivos; 7:30-8:00 fechamento). Frases curtas para o Arthur adaptar, sem decorar.

## 10. Plano por fases (cada fase = uma ou mais branches e PRs)

**Fase 0 (domingo 01/11, manhã) `chore/harness-e-base`:** checar ferramentas (Node LTS, Git, `gh auth status`); `git init`, repositório público no GitHub (`gh repo create`); scaffold Vite + React; instalar dependências; Tailwind com tokens; ESLint, Prettier, Husky, lint-staged, commitlint; Vitest; `.gitignore`, `.env.example`, `vercel.json`; estrutura de pastas; `CLAUDE.md`, `.claude/*`; README inicial; primeiro PR. **Pedir ao Arthur** conectar o repositório na Vercel (deploy da `main`).
**Fase 1 (domingo, tarde) `feature/layout-e-tema`, `feature/rotas`, `feature/projetos-github`:** layout, tema claro/escuro persistido, rotas e 404, serviço do GitHub com TanStack Query, `ProjectCard`/`ProjectRow`/skeletons/erro/vazio, `/projetos` e `/projetos/:nome`, home (abertura, bento de destaque com fallback, Sobre). **Rodar Lighthouse mobile na URL da Vercel já aqui.**
**Fase 2 (domingo à noite e segunda de manhã) `feature/formulario-contato`, `feature/dashboard`:** schema do Supabase (Arthur executa), formulário com validação e envio (Supabase + EmailJS), login, rota protegida, dashboard (mensagens e destaques), `OrbitObject`/`StarField` no contato.
**Fase 3 (segunda à tarde) `test/*`, `perf/*`:** testes (validação, bloqueio do dashboard), lazy loading, imagens, CLS, correções do Lighthouse (>= 80), responsividade em todos os tamanhos, acessibilidade básica.
**Fase 4 (segunda à noite) `docs/*`:** README final, `docs/*` do vídeo, `CHECKLIST.md`, revisão com o subagente, limpeza.
**Terça (03/11, até o prazo):** teste final em produção (celular real), gravar o vídeo (YouTube não listado), entregar no Teams: link do GitHub, link da Vercel, link do vídeo.

Se o tempo apertar, **reduza escopo visual** (detalhes da página de projeto, extras opcionais, refinamentos do tema claro), nunca um requisito.

## 11. O que só o Arthur pode fazer (peça no momento certo, com passo a passo curto)

1. Garantir `gh auth login` feito e Git configurado (nome e e-mail).
2. Criar projeto no **Supabase**; copiar URL e `anon key` para o `.env`; rodar `supabase/schema.sql` no SQL Editor; em Authentication, **desativar sign-ups** e criar o usuário dono (e-mail e senha fortes).
3. Criar conta no **EmailJS**: serviço de e-mail, template (`{{name}}`, `{{email}}`, `{{message}}`), copiar as três chaves para o `.env`; depois do deploy, restringir o domínio.
4. Conectar o repositório na **Vercel** (Import Project), cadastrar as variáveis `VITE_*`.
5. No GitHub, preencher **descrição, tópicos (topics) e homepage** dos repositórios que quer destacar (os cards usam esses dados), em especial o Rewind; confirmar a descrição do Rewind.
6. Informar o **e-mail público** e o **LinkedIn** para `src/config/site.js`.
7. Rodar o site no celular real e aprovar o tema claro e as telas novas (dashboard, login, 404).
8. Conferir o repositório (público, sem `.env`), gravar e publicar o vídeo.

## 12. Definição de pronto

- Todos os itens de `docs/CHECKLIST.md` marcados com evidência.
- `npm run lint`, `npm run test` e `npm run build` passam; CI verde (se existir).
- Lighthouse mobile >= 80 em performance, medido na URL pública da Vercel (guardar o print em `docs/`).
- Deploy automático comprovado (um push na `main` publicou).
- `/admin` sem login redireciona; refresh em `/projetos/algum-repo` funciona; rota inexistente mostra 404; API fora do ar mostra erro amigável.
- Nenhum segredo no histórico (`git log -p` sem chaves); `.env.example` completo.
- README completo; `CLAUDE.md` e README descrevem as mesmas convenções.
- Histórico de commits em português, convencional, em PRs, distribuído de domingo até a entrega.
