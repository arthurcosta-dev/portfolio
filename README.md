# Portfólio de Arthur Costa

Portfólio pessoal em React, com projetos carregados da API do GitHub, formulário de contato e dashboard do dono. Trabalho CP3 de WebDev na FIAP.

**Site:** [portfolio-ten-orcin-b9wg2d3oif.vercel.app](https://portfolio-ten-orcin-b9wg2d3oif.vercel.app/). **Vídeo:** a publicar.

## O que o site faz

- **Projetos do GitHub:** lidos pela API pública, sem cadastro manual, com página própria em `/projetos/:nome`.
- **Rotas:** link direto e atualização funcionam em qualquer página (`vercel.json`), com página 404 e tela amigável quando a API falha.
- **Contato:** validação por campo, mensagem salva no Supabase, aviso por e-mail via EmailJS e botão bloqueado durante o envio.
- **Painel do dono (`/admin`):** login pelo Supabase, lista de mensagens com a opção de marcar como respondida e escolha dos projetos em destaque na home.
- **Tema claro e escuro:** a escolha é lembrada entre visitas.
- **Performance:** Lighthouse mobile entre 92 e 99 em produção. Login, painel, Supabase e EmailJS só carregam quando são usados. Evidências em [docs/evidencias/](docs/evidencias/).

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

| Variável                   | Para que serve                                        |
| -------------------------- | ----------------------------------------------------- |
| `VITE_GITHUB_USER`         | Usuário do GitHub cujos repositórios aparecem no site |
| `VITE_SUPABASE_URL`        | Endereço do projeto no Supabase                       |
| `VITE_SUPABASE_ANON_KEY`   | Chave pública do Supabase (nunca a `service_role`)    |
| `VITE_EMAILJS_SERVICE_ID`  | Serviço de e-mail no EmailJS                          |
| `VITE_EMAILJS_TEMPLATE_ID` | Template com `{{name}}`, `{{email}}` e `{{message}}`  |
| `VITE_EMAILJS_PUBLIC_KEY`  | Chave pública do EmailJS                              |

Tudo que começa com `VITE_` vai para o JavaScript público, por isso só entram chaves feitas para serem públicas.

### Serviços externos

1. **Supabase:** crie um projeto e rode [supabase/schema.sql](supabase/schema.sql) no SQL Editor. Ele cria as tabelas, as permissões e as políticas de RLS. Em Authentication, desative os cadastros e crie só o usuário dono.
2. **EmailJS:** crie um serviço de e-mail e um template com as três variáveis acima.
3. **Vercel:** importe o repositório e cadastre as mesmas variáveis `VITE_*`.
4. **GitHub Actions:** para o Supabase grátis não pausar, cadastre os secrets `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY`, usados por `.github/workflows/supabase-ativo.yml`.

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
- **Todo dia:** uma leitura no Supabase, para o projeto não pausar.

## Harness de IA

Desenvolvido com Claude Code. A configuração está versionada em [CLAUDE.md](CLAUDE.md) e [.claude/](.claude/), e cada escolha é justificada em [docs/harness.md](docs/harness.md).

## Documentação

| Arquivo                                        | Conteúdo                                          |
| ---------------------------------------------- | ------------------------------------------------- |
| [docs/arquitetura.md](docs/arquitetura.md)     | Pastas, fluxo de dados e caminho de uma alteração |
| [docs/decisoes.md](docs/decisoes.md)           | Alternativas comparadas, critérios e exceções     |
| [docs/harness.md](docs/harness.md)             | Harness de IA, com exemplos reais                 |
| [docs/explicacoes.md](docs/explicacoes.md)     | Conceitos novos explicados em poucas linhas       |
| [docs/DESIGN.md](docs/DESIGN.md)               | Identidade visual e tokens                        |
| [docs/CHECKLIST.md](docs/CHECKLIST.md)         | Requisitos do CP3 e a evidência de cada um        |
| [docs/video-roteiro.md](docs/video-roteiro.md) | Roteiro do vídeo                                  |

## Licença

[MIT](LICENSE)
