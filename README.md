# Portfólio de Arthur Costa

Portfólio pessoal em React, com projetos carregados da API do GitHub, formulário de contato e dashboard do dono. Trabalho CP3 de WebDev na FIAP.

**Site:** [portfolio-ten-orcin-b9wg2d3oif.vercel.app](https://portfolio-ten-orcin-b9wg2d3oif.vercel.app/). **Vídeo:** a publicar.

## Tecnologias

JavaScript, Vite, React 19, React Router 7, Tailwind CSS 4, TanStack Query, Context API, Supabase, EmailJS, Vitest, Testing Library, ESLint, Prettier, Husky, lint-staged, commitlint e Vercel.

As razões de cada escolha estão em [docs/decisoes.md](docs/decisoes.md).

## Como rodar

Requer Node 24 (ou 22.22.2 em diante, na linha 22).

```bash
git clone https://github.com/arthurcosta-dev/portfolio.git
cd portfolio
npm install
cp .env.example .env
npm run dev
```

Preencha o `.env` com as chaves do Supabase e do EmailJS. Nunca versione esse arquivo.

## Scripts

| Comando           | O que faz                                            |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento                          |
| `npm run build`   | Build de produção                                    |
| `npm run preview` | Serve o build localmente                             |
| `npm run lint`    | Verifica o código com ESLint                         |
| `npm run format`  | Formata com Prettier                                 |
| `npm run test`    | Roda os testes                                       |
| `npm run analyze` | Build com o relatório de bundle em `dist/stats.html` |

## Convenções

As mesmas regras estão em [CLAUDE.md](CLAUDE.md), para a IA também segui-las.

### Arquitetura

```
src/
  main.jsx      entrada (providers + router)
  routes.jsx    todas as rotas, lazy onde indicado
  config/       site.js: dados pessoais e textos fixos
  components/   ui/ layout/ home/ projects/ contact/ admin/
  pages/        uma por rota
  hooks/        estado e ciclo de vida
  services/     chamadas externas
  context/      tema e sessão
  utils/        funções puras
  test/         setup de teste
```

**Regra de ouro:** componente só recebe dados e desenha. Chamadas externas ficam em `services/`; estado e ciclo de vida, em `hooks/`. Componente de até ~120 linhas. Rotas só com `createBrowserRouter`, em `src/routes.jsx`. O ESLint verifica parte dessas regras.

Mais detalhes em [docs/arquitetura.md](docs/arquitetura.md).

### Nomenclatura

Componentes e seus arquivos em PascalCase, em arrow function com `export default`. Hooks `useAlgo.js`. Services e utils em camelCase. Pastas em minúsculas. Constantes em `UPPER_SNAKE_CASE`. Testes ao lado do arquivo (`Algo.test.jsx`). Variáveis de ambiente `VITE_*`. Identificadores em inglês; rotas e interface em pt-BR. Classes Tailwind só com tokens do tema.

### Commits

[Conventional Commits](https://www.conventionalcommits.org/pt-br/): tipo em inglês, descrição em português, imperativo, minúsculas, sem ponto final, até 72 caracteres.

```
feat: adiciona validação do formulário de contato
feat(admin): lista mensagens recebidas
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.

### Branches

GitHub Flow. A `main` é protegida e sempre publicável. O trabalho acontece em `feature/*`, `fix/*`, `docs/*`, `chore/*`, `test/*` ou `perf/*`, um assunto por commit, e entra por pull request com merge commit. Antes de cada PR, rode `npm run lint`, `npm run test` e `npm run build`.

### Verificações automáticas

- **Antes do commit:** ESLint e Prettier nos arquivos alterados (lint-staged) e validação da mensagem (commitlint), via Husky.
- **Em cada PR:** lint, testes e build no GitHub Actions.
- **Na `main`:** publicação automática na Vercel.

## Harness de IA

Desenvolvido com Claude Code. A configuração está versionada em [CLAUDE.md](CLAUDE.md) e [.claude/](.claude/), e cada escolha é justificada em [docs/harness.md](docs/harness.md).

## Licença

[MIT](LICENSE)
