# Portfólio do Arthur Costa (CP3 WebDev, FIAP)

Portfólio em React publicado na Vercel. Prazo: 03/11/2026. Os 12 requisitos de `docs/requisitos-CP3.md` são obrigatórios; em caso de dúvida, vale esse arquivo.

Responda em português, de forma direta. O Arthur não viu back-end: antes de usar um conceito novo, explique em 3 a 5 linhas e registre em `docs/explicacoes.md`.

## Comandos

`npm run dev` | `npm run lint` | `npm run test` | `npm run build` | `npm run analyze` (gera `dist/stats.html`)

## Stack

JavaScript (sem TypeScript), Vite, React 19, React Router 7, Tailwind 4 (tokens em `src/index.css`), TanStack Query, Context API, Supabase, EmailJS, Vitest + Testing Library. Razões em `docs/decisoes.md`. Sem dependência, página ou recurso fora de `docs/BRIEF.md` sem perguntar.

## Arquitetura

```
src/
  main.jsx      entrada (providers + router)
  routes.jsx    todas as rotas, lazy onde indicado
  config/       site.js: dados pessoais e textos fixos
  components/   ui/ layout/ home/ projects/ contact/ admin/
  pages/        uma por rota
  hooks/        estado e ciclo de vida (useRepos, useAuth...)
  services/     chamadas externas (github, supabase, email...)
  context/      ThemeContext, AuthContext
  utils/        funções puras (validators, formatDate...)
  test/         setup de teste
```

**Regra de ouro:** componente só recebe dados e desenha. `fetch` e Supabase ficam em `services/`; estado e ciclo de vida, em `hooks/`. Componente de até ~120 linhas; passou disso, divida. O ESLint recusa `fetch` e import de `services/` em `components/` e `pages/`.

**Rotas:** só `createBrowserRouter` com objetos, em `src/routes.jsx`. Proibido `<BrowserRouter>`, `<Routes>`, `<Route>` e `createRoutesFromElements`. O ESLint recusa esses imports.

## Nomenclatura

Componentes e seus arquivos em PascalCase, em arrow function com `export default`. Hooks `useAlgo.js`. Services e utils em camelCase. Pastas em minúsculas. Constantes em `UPPER_SNAKE_CASE`. Testes ao lado do arquivo (`Algo.test.jsx`). Variáveis de ambiente `VITE_*`. Identificadores em inglês; rotas e interface em pt-BR. Classes Tailwind só com tokens do tema, nunca hex solto.

## Commits e branches

- Conventional Commits: tipo em inglês, descrição em português, imperativo, minúsculas, sem ponto final, até 72 caracteres. Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`. Ex.: `feat(admin): lista mensagens recebidas`.
- GitHub Flow: `main` sempre publicável. Trabalhe em `feature/*`, `fix/*`, `docs/*`, `chore/*`, `test/*` ou `perf/*`, um assunto por commit.
- Antes de cada PR: `npm run lint`, `npm run test`, `npm run build` e o subagente `revisor-requisitos`. Integre com merge commit (`gh pr merge --merge --delete-branch`).
- Telas que não existem no mockup precisam de aprovação do Arthur por captura de tela antes do merge.

## Limites inegociáveis

1. Nunca commit direto na `main`, `push --force` ou `--no-verify`.
2. Nunca falsifique datas de commit nem crie commits artificiais.
3. Nenhum segredo no repositório nem no bundle: sem `service_role` do Supabase, sem token do GitHub. A IA não lê o `.env` real.
4. Nenhum projeto cadastrado à mão: tudo vem da API do GitHub.
5. Não invente nada sobre o Arthur. Dado pessoal desconhecido fica como `TODO` em `src/config/site.js`, e pergunte.
6. Nenhum requisito pode ser cortado. Se o tempo apertar, reduza só detalhe visual e avise.
7. Lighthouse mobile >= 80 em produção é critério de pronto.

## Documentos

`docs/BRIEF.md` (plano e decisões), `docs/DESIGN.md` (obrigatório em trabalho visual; a skill `frontend-design` é só apoio e fica subordinada a ele), `docs/CHECKLIST.md` (marque só com evidência), `docs/harness.md`, `docs/arquitetura.md`, `docs/decisoes.md`, `docs/explicacoes.md`.
