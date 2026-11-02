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
  - [ ] Responsivo testado em todas as telas: sem corte horizontal de 360 a 1920 px em todas as rotas, login e painel incluídos, em 02/11/2026 (`docs/evidencias/verificacoes-producao.md`, seção Fase 3); falta o teste no celular real.
- [x] **8. Performance**
  - [x] Lighthouse mobile >= 80 em produção: em 02/11/2026, performance de 92 a 99 nas seis rotas e 100 em acessibilidade, boas práticas e SEO; `docs/evidencias/verificacoes-producao.md` (seção Fase 3), `docs/evidencias/lighthouse-fase-3-home.png` e `lighthouse-fase-3-detalhe.png`.
  - [x] Sem saltos: em 02/11/2026, CLS de 0,001 na home, 0,006 em `/projetos` e 0 no detalhe, login, painel e 404; home com 0, 1 e 2 destaques entre 0,002 e 0,004 (mesmo arquivo). Correção do rodapé no PR #17.
  - [x] Sem requisição repetida: `src/pages/Projects.test.jsx`.
  - [x] Imagens carregadas só quando aparecem: `loading="lazy"` em `src/pages/Projects.test.jsx`.
  - [x] Imagens otimizadas em formato e tamanho: ilustração do Sobre em WebP, 600w e 1200w com `srcset`, `width` e `height`; `src/pages/Home.test.jsx`.
  - [x] Dashboard e elementos pesados sob demanda: `React.lazy` em `src/routes.jsx`; Supabase e EmailJS por `import()` em `src/services/`; blocos separados em `docs/evidencias/analyze-fase-3.png`.
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
