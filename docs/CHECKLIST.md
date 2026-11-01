# Checklist de entrega

Item marcado só com evidência: arquivo, teste, URL, print ou nota do Lighthouse.

## Requisitos

- [ ] **1. Rotas** (em andamento)
  - [x] Link por projeto, abertura direta e atualização da página em produção: `docs/evidencias/verificacoes-producao.md`, `vercel.json`.
  - [x] Página 404: `src/routes.test.jsx`. Falha de API: `src/pages/Projects.test.jsx`.
  - [ ] `/login` e `/admin`, na Fase 2.
- [ ] **2. Carregamento** (em andamento)
  - [x] Carregamento, erro e vazio nos projetos do GitHub: `src/pages/Projects.test.jsx`; telas aprovadas pelo Arthur em 01/11/2026.
  - [ ] Dados do Supabase no dashboard e botão bloqueado no envio, na Fase 2.
- [x] **3. GitHub:** `src/services/github.js`; dados nos cards da home e nas linhas de `/projetos` em `src/pages/Projects.test.jsx`.
- [ ] **4. Formulário:** validação por campo, e-mail ao dono, mensagem salva, feedback.
- [ ] **5. Dashboard:** login, redirecionamento, mensagens, marcar como respondida, destaques.
- [x] **6. Tema:** escolha guardada em `src/context/ThemeProvider.test.jsx`, lida ao abrir em `index.html`; reabertura em produção nos dois temas: `docs/evidencias/verificacoes-producao.md`.
- [ ] **7. Interface** (em andamento)
  - [ ] Componentes reaproveitados em todas as páginas: `src/components/ui/` na Fase 1; faltam as páginas da Fase 2.
  - [ ] Identidade própria: `docs/DESIGN.md`; telas da Fase 1 aprovadas pelo Arthur em 01/11/2026; faltam login e dashboard.
  - [ ] Responsivo testado em todas as telas: sem corte horizontal de 360 a 1920 px na Fase 1 (`docs/evidencias/verificacoes-producao.md`); faltam as telas da Fase 2 e o teste no celular.
- [ ] **8. Performance** (em andamento)
  - [ ] Lighthouse mobile >= 80 em produção: na Fase 1, a home deu 89, 98 e 94, `/projetos` deu 95 e `/projetos/portfolio` deu 94, em 01/11/2026; `docs/evidencias/verificacoes-producao.md` e prints da home em `docs/evidencias/`. Repetir no fim.
  - [ ] Sem saltos: na Fase 1, CLS de 0,001 na home, 0,018 em `/projetos` e 0,016 em `/projetos/portfolio` (mesmo arquivo). Repetir no fim.
  - [x] Sem requisição repetida: `src/pages/Projects.test.jsx`.
  - [x] Imagens carregadas só quando aparecem: `loading="lazy"` em `src/pages/Projects.test.jsx`.
  - [ ] Imagens otimizadas em formato e tamanho. Falta uma imagem própria em WebP ou AVIF.
  - [ ] Dashboard e elementos pesados sob demanda, na Fase 2.
- [ ] **9. Testes:** validação do formulário e bloqueio do dashboard.
- [x] **10. Deploy:** https://portfolio-ten-orcin-b9wg2d3oif.vercel.app/ ; status da Vercel nos merges e `/robots.txt` publicado pelo PR #5: `docs/evidencias/verificacoes-producao.md`.
- [ ] **11. Versionamento** (em andamento)
  - [x] Padrão de commit com verificação automática: `commitlint.config.js`, `.husky/commit-msg`; `adicionei a base` foi recusada na Fase 0.
  - [x] Padrões no README e nas instruções da IA: `README.md`, `CLAUDE.md`.
  - [ ] Cada funcionalidade em branch própria, integrada à principal: PRs #1 a #8 até agora; faltam as fases seguintes.
- [ ] **12. Arquitetura** (em andamento)
  - [x] Pastas com responsabilidades claras, descritas: `README.md`, `CLAUDE.md`, `docs/arquitetura.md`.
  - [x] Nomenclatura definida no README e no `CLAUDE.md`.
  - [x] Lint e formatação antes de cada commit: `.husky/pre-commit`, `lint-staged.config.js`.
  - [ ] Componentes pequenos, com lógica separada da apresentação.

## Repositório

- [x] Público no GitHub: https://github.com/arthurcosta-dev/portfolio
- [x] `.env` fora do repositório, `.env.example` completo: `.gitignore`, `.env.example`.
- [ ] README completo, com link do deploy e do vídeo.
- [ ] Histórico de commits distribuído até o prazo.

## Vídeo

- [ ] Até 8 minutos, rosto e tela visíveis, YouTube não listado.
- [ ] Cobre stack e arquitetura, justificativas e harness de IA.

## Harness (parte da nota)

- [x] `CLAUDE.md`
- [x] Permissões e hooks: `.claude/settings.json`; bloqueios comprovados em `docs/harness.md` e `.claude/hooks/rules.test.mjs`.
- [x] Skills: `.claude/skills/`.
- [x] Subagente: `.claude/agents/revisor-requisitos.md`.
- [x] Justificativas: `docs/harness.md`.
