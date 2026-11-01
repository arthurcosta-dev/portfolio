# Decisões técnicas

## Stack

| Área                  | Escolha                                              | Alternativas comparadas                      | Critério                                                             | O que se aceita perder                    |
| --------------------- | ---------------------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------- |
| Build/SPA             | Vite + React 19                                      | Next.js, CRA                                 | Foi o que a turma usou; build rápido; SPA simples                    | Sem SSR/SEO por servidor                  |
| Rotas                 | React Router 7 (`createBrowserRouter`)               | TanStack Router, wouter                      | Já visto em aula; suporta `errorElement`, `path:"*"` e lazy por rota | Menos tipagem que TanStack Router         |
| Refresh/deep link     | `vercel.json` com rewrite para `/index.html`         | `.htaccess`, `_redirects`                    | Deploy na Vercel                                                     | Config específica da Vercel               |
| Estilo                | Tailwind CSS (tokens no tema)                        | CSS Modules, MUI, shadcn                     | Rápido para bento grid; já visto em aula                             | HTML mais verboso                         |
| Dados do GitHub       | `fetch` + TanStack Query                             | axios, SWR, `useEffect` manual               | Cache, estados prontos, sem requisição repetida                      | Uma dependência nova a aprender           |
| Estado global         | Context API (tema e sessão)                          | Zustand, Redux Toolkit                       | Pouco estado; nativo                                                 | Menos ferramentas de debug                |
| Tema                  | Context + `localStorage` + classe `dark` no `<html>` | Biblioteca de tema                           | Simples e explicável; script inline evita piscar                     | Código próprio para manter                |
| Formulário            | Validação manual com `useState`                      | React Hook Form, Zod                         | Poucos campos; sem dependência                                       | Mais código repetido                      |
| Back-end do dashboard | Supabase (Auth + Postgres + RLS)                     | Firebase, Appwrite, PocketBase, Node próprio | Plano grátis, SQL, RLS protege no banco, sem servidor                | Serviço externo; RLS exige cuidado        |
| E-mail                | EmailJS                                              | Formspree, backend próprio                   | Sem servidor; plano grátis                                           | Chaves públicas no bundle                 |
| Testes                | Vitest + Testing Library                             | Playwright                                   | Integra com Vite; rápido                                             | Sem teste ponta a ponta em navegador real |
| Qualidade             | ESLint + Prettier + Husky + lint-staged              | Biome, oxlint                                | Padrão de mercado                                                    | Mais pacotes                              |
| Commits               | Conventional Commits + commitlint                    | Gitmoji                                      | Padrão de mercado; valida automático                                 | Regra rígida para escrever                |
| Branches              | GitHub Flow                                          | Git Flow, trunk-based                        | Simples para uma pessoa                                              | Sem branch de release                     |
| Deploy                | Vercel conectada ao GitHub                           | Netlify, GitHub Actions                      | Sugerida no enunciado; zero configuração                             | Preso à plataforma                        |
| Fontes                | `@fontsource` hospedadas no projeto                  | Google Fonts                                 | Menos requisições externas                                           | Pacotes extras                            |
| Análise de bundle     | `rollup-plugin-visualizer`                           | `source-map-explorer`                        | Gera evidência para o vídeo                                          | Só em build de análise                    |

## Mudanças em relação ao BRIEF

| Decisão                                                                     | Razão                                                                                                             |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Tailwind 4: tokens em `@theme` no `src/index.css`, sem `tailwind.config.js` | É o formato da versão atual. Com `--color-*: initial`, cores fora dos tokens nem existem.                         |
| React Router fica na 7, embora a 8 já exista                                | É o que o BRIEF decidiu e o que foi visto em aula. A 8 não traz nada de que o projeto precise, e o prazo é curto. |
| ESLint configurado à mão                                                    | O template atual do Vite traz oxlint, e o BRIEF decidiu ESLint.                                                   |
| Hooks e `deny` cobrem Bash e PowerShell                                     | O BRIEF cita só Bash, mas o Claude Code usa os dois neste Windows.                                                |
| `deny` lista cada `.env` real em vez de `.env*`                             | `.env*` bloquearia também o `.env.example`.                                                                       |
| `git push` no `allow`                                                       | Não está na lista do BRIEF, mas o fluxo de PR precisa. O force segue vetado.                                      |
| Commits com e-mail noreply do GitHub                                        | Decisão do Arthur, para o e-mail pessoal não ficar público no histórico.                                          |
| Branches `test/*` e `perf/*` aceitas                                        | Constam na seção 10 do BRIEF, embora não na seção 4.                                                              |

## Exceções às convenções

| Exceção                                                                             | Razão                                                         |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Tokens de cor em português (`bg-fundo`)                                             | São os nomes definidos no `DESIGN.md`.                        |
| Tokens extras: `linha-hover`, `sobre-acento`, `sobre-acento-2`, `botao-claro-texto` | Valores que o mockup usa e a tabela do `DESIGN.md` não lista. |
| Cores dos polígonos direto no SVG do `OrbitObject`                                  | O `DESIGN.md` pede para copiar os polígonos exatamente.       |
