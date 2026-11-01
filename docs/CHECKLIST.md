# Checklist de entrega

Item marcado só com evidência: arquivo, teste, URL, print ou nota do Lighthouse.

## Requisitos

- [x] **1. Rotas:** `src/routes.jsx`; 404, erro de API e abertura direta em `src/pages/Projects.test.jsx`; refresh em produção: `/projetos` e `/projetos/portfolio` respondem 200.
- [ ] **2. Carregamento** (em andamento)
  - [x] Estados de carregamento, erro e vazio com indicador visual: `src/pages/Projects.test.jsx`; telas aprovadas pelo Arthur em 01/11/2026.
  - [ ] Botão bloqueado no envio.
- [x] **3. GitHub:** `src/services/github.js`; cards com dados do repositório em `src/pages/Projects.test.jsx`.
- [ ] **4. Formulário:** validação por campo, e-mail ao dono, mensagem salva, feedback.
- [ ] **5. Dashboard:** login, redirecionamento, mensagens, marcar como respondida, destaques.
- [x] **6. Tema:** escolha guardada em `src/context/ThemeProvider.test.jsx`; script em `index.html` aplica o tema antes de desenhar a página.
- [ ] **7. Interface** (em andamento)
  - [x] Componentes reaproveitados: `src/components/ui/`.
  - [x] Identidade própria: `docs/DESIGN.md`; telas novas aprovadas pelo Arthur em 01/11/2026.
  - [ ] Responsivo testado em todas as telas: sem corte horizontal de 360 a 1920 px na Fase 1; faltam as telas da Fase 2 e o teste no celular.
- [ ] **8. Performance** (em andamento)
  - [x] Lighthouse mobile >= 80 em produção na Fase 1: 89, 98 e 94 em 01/11/2026; `docs/evidencias/lighthouse-fase-1.png`. Repetir no fim.
  - [x] Sem saltos: CLS de 0,001 nas 3 medições.
  - [x] Sem requisição repetida: `src/pages/Projects.test.jsx`.
  - [ ] Imagens otimizadas em formato e tamanho. Falta uma imagem própria em WebP ou AVIF.
- [ ] **9. Testes:** validação do formulário e bloqueio do dashboard.
- [x] **10. Deploy:** https://portfolio-ten-orcin-b9wg2d3oif.vercel.app/ ; o merge do PR #5 publicou o `robots.txt` sem ação manual.
- [ ] **11. Versionamento** (em andamento)
  - [x] Padrão de commit com verificação automática: `commitlint.config.js`, `.husky/commit-msg`; `adicionei a base` foi recusada na Fase 0.
  - [x] Padrões no README e nas instruções da IA: `README.md`, `CLAUDE.md`.
  - [ ] Cada funcionalidade em branch própria, integrada à principal: PRs #1 a #5 até agora; faltam as fases seguintes.
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
