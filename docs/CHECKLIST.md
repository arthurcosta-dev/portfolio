# Checklist de entrega

Item marcado só com evidência: arquivo, teste, URL, print ou nota do Lighthouse.

## Requisitos

- [x] **1. Rotas**
  - [x] Link por projeto, abertura direta e atualização da página em produção: `docs/evidencias/verificacoes-producao.md`, `vercel.json`.
  - [x] Página 404: `src/routes.test.jsx`. Falha de API: `src/pages/Projects.test.jsx`.
  - [x] `/login` e `/admin`: redirecionamento sem sessão e ida direta ao painel com sessão em `src/pages/Admin.test.jsx`; ambas com `React.lazy` em `src/routes.jsx`.
- [x] **2. Carregamento**
  - [x] Carregamento, erro e vazio nos projetos do GitHub: `src/pages/Projects.test.jsx`; telas aprovadas pelo Arthur em 01/11/2026.
  - [x] Dados do Supabase no painel com carregamento, erro e vazio (mensagens e destaques) em `src/pages/Admin.test.jsx`; botão bloqueado e sem envio duplo em `src/components/contact/ContactForm.test.jsx`.
- [x] **3. GitHub:** `src/services/github.js`; dados nos cards da home e nas linhas de `/projetos` em `src/pages/Projects.test.jsx`.
- [x] **4. Formulário:** mensagem específica por campo em `src/utils/validators.test.js` e `src/components/contact/ContactForm.test.jsx`; grava no Supabase e depois manda o e-mail em `src/services/messages.test.js`; aviso de sucesso e de falha em `ContactForm.test.jsx`; envio real em produção em `docs/evidencias/verificacoes-producao.md` (seção Fase 2).
- [x] **5. Dashboard:** login, redirecionamento, lista de mensagens, marcar como respondida e escolha e ordem dos destaques em `src/pages/Admin.test.jsx`; a home segue os destaques no mesmo arquivo; teste do Arthur em produção na seção Fase 2 das evidências; leitura e escrita bloqueadas para visitantes na seção Fase 4.
- [x] **6. Tema:** escolha guardada em `src/context/ThemeProvider.test.jsx`, lida ao abrir em `index.html`; reabertura em produção nos dois temas: `docs/evidencias/verificacoes-producao.md`.
- [x] **7. Interface**
  - [x] Componentes reaproveitados em todas as páginas: `src/components/ui/` (Button, Card, FormField, Spinner, Skeleton, EmptyState, ErrorState, Tag, TextLink, Switch) usados na home, em projetos, no contato, no login e no painel.
  - [x] Identidade própria: `docs/DESIGN.md`; telas da Fase 1 aprovadas pelo Arthur em 01/11/2026, login e painel em 02/11/2026.
  - [x] Responsivo testado em todas as telas: sem corte horizontal de 360 a 1920 px em todas as rotas, login e painel incluídos, em 02/11/2026 (`docs/evidencias/verificacoes-producao.md`, seção Fase 3); teste no celular real feito pelo Arthur em 03/11/2026.
- [x] **8. Performance**
  - [x] Lighthouse mobile >= 80 em produção: em 02/11/2026, performance de 92 a 99 em home, `/projetos`, detalhe, login e 404, e 100 em acessibilidade, boas práticas e SEO; `docs/evidencias/verificacoes-producao.md` (seção Fase 3) e `docs/evidencias/lighthouse-fase-3-*.png`. Repetir depois da Fase 4.
  - [x] Sem saltos: em 02/11/2026, CLS de 0,001 na home, 0,006 em `/projetos` e 0 no detalhe, login e 404; home com 0, 1 e 2 destaques entre 0,002 e 0,004 (mesmo arquivo). Correção do rodapé no PR #17. Repetir depois da Fase 4.
  - [x] Sem requisição repetida: `src/pages/Projects.test.jsx`.
  - [x] Imagens carregadas só quando aparecem: `loading="lazy"` em `src/pages/Projects.test.jsx`.
  - [x] Imagens otimizadas em formato e tamanho: ilustração do Sobre em WebP, 600w e 1200w com `srcset`, `width` e `height`; `src/pages/Home.test.jsx`.
  - [x] Dashboard e elementos pesados sob demanda: `React.lazy` em `src/routes.jsx`; Supabase e EmailJS por `import()` em `src/services/`; blocos separados em `docs/evidencias/analyze-fase-3.png`.
- [x] **9. Testes:** validação do formulário em `src/utils/validators.test.js` e `src/components/contact/ContactForm.test.jsx`; bloqueio do painel sem login em `src/pages/Admin.test.jsx`. São 161 testes, rodados no CI em cada PR (`.github/workflows/ci.yml`).
- [x] **10. Deploy:** https://portfolio-ten-orcin-b9wg2d3oif.vercel.app/ ; status da Vercel nos merges e `/robots.txt` publicado pelo PR #5: `docs/evidencias/verificacoes-producao.md`.
- [x] **11. Versionamento**
  - [x] Padrão de commit com verificação automática: `commitlint.config.js`, `.husky/commit-msg`; `adicionei a base` foi recusada na Fase 0.
  - [x] Padrões no README e nas instruções da IA: `README.md`, `CLAUDE.md`.
  - [x] Cada funcionalidade em branch própria, integrada à principal por PR com merge commit: PRs #1 a #20 (`feature/*`, `fix/*`, `perf/*`, `test/*`, `docs/*`, `chore/*`).
- [x] **12. Arquitetura**
  - [x] Pastas com responsabilidades claras, descritas: `README.md`, `CLAUDE.md`, `docs/arquitetura.md`.
  - [x] Nomenclatura definida no README e no `CLAUDE.md`.
  - [x] Lint e formatação antes de cada commit: `.husky/pre-commit`, `lint-staged.config.js`.
  - [x] Componentes pequenos, com lógica separada da apresentação: o maior componente tem 106 linhas (`AboutBento.jsx`); o ESLint recusa `fetch`, Supabase, EmailJS e imports de `services/` em `components/` e `pages/` (`eslint.config.js`); exceções em `docs/decisoes.md`.

## Repositório

- [x] Público no GitHub: https://github.com/arthurcosta-dev/portfolio
- [x] `.env` fora do repositório, `.env.example` completo: `.gitignore`, `.env.example`.
- [ ] README completo, com link do deploy e do vídeo: falta só o link do vídeo.
- [x] Histórico de commits distribuído até o prazo: commits em 01, 02 e 03/11/2026, todos por PR.

## Vídeo

- [ ] Até 8 minutos, rosto e tela visíveis, YouTube não listado.
- [ ] Cobre stack e arquitetura, justificativas e harness de IA.

## Harness (parte da nota)

- [x] `CLAUDE.md`
- [x] Permissões e hooks: `.claude/settings.json`; bloqueios comprovados em `docs/harness.md` e `.claude/hooks/rules.test.mjs`.
- [x] Skills: `.claude/skills/`.
- [x] Subagente: `.claude/agents/revisor-requisitos.md`.
- [x] Justificativas: `docs/harness.md`.
