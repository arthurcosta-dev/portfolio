# Checklist de entrega

Item marcado só com evidência: arquivo, teste, URL, print ou nota do Lighthouse.

## Requisitos

- [ ] **1. Rotas:** link por projeto, 404, falha de API, refresh em qualquer rota.
- [ ] **2. Carregamento:** estados de carregamento, erro e vazio; indicador visual; botão bloqueado no envio.
- [ ] **3. GitHub:** projetos pela API, cards com dados do repositório.
- [ ] **4. Formulário:** validação por campo, e-mail ao dono, mensagem salva, feedback.
- [ ] **5. Dashboard:** login, redirecionamento, mensagens, marcar como respondida, destaques.
- [ ] **6. Tema:** claro/escuro persistido entre visitas.
- [ ] **7. Interface:** responsivo testado, componentes reaproveitados, identidade própria.
- [ ] **8. Performance:** Lighthouse mobile >= 80, imagens otimizadas, lazy, sem saltos, sem requisição repetida.
- [ ] **9. Testes:** validação do formulário e bloqueio do dashboard.
- [ ] **10. Deploy:** URL pública e publicação automática na `main`.
- [ ] **11. Versionamento** (em andamento)
  - [x] Padrão de commit com verificação automática: `commitlint.config.js`, `.husky/commit-msg`; `adicionei a base` foi recusada na Fase 0.
  - [x] Padrões no README e nas instruções da IA: `README.md`, `CLAUDE.md`.
  - [ ] Cada funcionalidade em branch própria, integrada à principal.
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
