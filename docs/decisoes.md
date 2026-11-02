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

| Decisão                                                                     | Razão                                                                                                                                   |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Tailwind 4: tokens em `@theme` no `src/index.css`, sem `tailwind.config.js` | É o formato da versão atual. `--color-*: initial` tira as cores padrão (`bg-red-500`); `bg-[#fff]` ainda compila e fica para o revisor. |
| React Router fica na 7, embora a 8 já exista                                | É o que o BRIEF decidiu e o que foi visto em aula. A 8 não traz nada de que o projeto precise, e o prazo é curto.                       |
| ESLint configurado à mão                                                    | O template atual do Vite traz oxlint, e o BRIEF decidiu ESLint.                                                                         |
| Hooks e `deny` cobrem Bash e PowerShell                                     | O BRIEF cita só Bash, mas o Claude Code usa os dois neste Windows.                                                                      |
| `deny` lista cada `.env` real em vez de `.env*`                             | `.env*` bloquearia também o `.env.example`.                                                                                             |
| `git push` no `allow`                                                       | Não está na lista do BRIEF, mas o fluxo de PR precisa. O force segue vetado.                                                            |
| Commits com e-mail noreply do GitHub                                        | Decisão do Arthur, para o e-mail pessoal não ficar público no histórico.                                                                |
| Branches `test/*` e `perf/*` aceitas                                        | Constam na seção 10 do BRIEF, embora não na seção 4.                                                                                    |

Dependências de cada funcionalidade entram na fase em que são usadas, para o histórico mostrar quando cada uma chegou: `react-router@7` e TanStack Query na Fase 1; Supabase e EmailJS na Fase 2. A versão 7 do Router é instalada explicitamente, para não vir a 8.

## Exceções às convenções

- **Estado visual em componente:** `useState` de abrir e fechar o menu (`Header`) e de imagem que falhou (`ProjectPreview`) ficam no componente. Não há regra de negócio nem chamada externa, e um hook só para isso esconderia três linhas simples.
- **Destaques com `fetch` puro na home:** o visitante lê `featured_projects` pela API REST do Supabase, sem a biblioteca, para não baixar cerca de 55 kB comprimidos a cada visita. Em troca, esse trecho tem endereço e cabeçalho escritos à mão. O dashboard continua com a biblioteca. Se a leitura falhar ou passar de 3 segundos, a home mostra os repositórios mais recentes.
- **Ilustração do Sobre:** o design não tem imagem, e o Arthur não tem foto. Para comprovar o requisito 8, a IA desenhou um céu noturno com as cores do site em um canvas e exportou em WebP pelo navegador (`toDataURL("image/webp")`), sem dependência nova. São dois tamanhos, 600 px (5 KB) e 1200 px (10 KB), em `src/assets/`, com `srcset`, `width`/`height` e `loading="lazy"`.
- **Seção que usa hook:** `FeaturedProjects` chama `useFeatured` e desenha o resultado, e nunca fala com o service. Assim a `Home` não precisa repassar props por várias camadas.
- **Pré-visualização do GitHub (`opengraph.githubassets.com`):** testada no serviço real em 01/11/2026 (resposta 200, PNG de cerca de 120 KB, carregamento visto no navegador). Só aparece em `/projetos/:nome`, com `loading="lazy"` e tamanho reservado, e some se falhar, com teste. O formato é decidido pelo GitHub.

| Exceção                                                     | Razão                                                           |
| ----------------------------------------------------------- | --------------------------------------------------------------- |
| Tokens de cor em português (`bg-fundo`)                     | São os nomes definidos no `DESIGN.md`.                          |
| Tokens extras: `linha-hover`, `sobre-acento`                | Valores que o mockup usa e a tabela do `DESIGN.md` não lista.   |
| Cores dos polígonos direto no SVG do `OrbitObject`          | O `DESIGN.md` pede para copiar os polígonos exatamente.         |
| Texto branco no bloco roxo, no lugar de `#F0E9FF` do mockup | `#F0E9FF` sobre `#7B4AE8` dá 4,46:1, abaixo do mínimo de 4,5:1. |
