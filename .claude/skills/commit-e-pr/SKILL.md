---
name: commit-e-pr
description: Revisa o diff, cria commits convencionais em português e abre o pull request. Use ao concluir uma funcionalidade ou fase.
---

1. Leia `git status` e `git diff`. Confirme que não há segredo, `.env`, arquivo temporário nem mudança fora do assunto.
2. Commite por assunto, no formato `tipo(escopo): descrição` do `CLAUDE.md`. Se o commitlint ou o lint-staged recusar, corrija a causa; nunca use `--no-verify`.
3. Rode `npm run lint`, `npm run test` e `npm run build`. Se algo falhar, conserte antes de seguir.
4. Rode o subagente `revisor-requisitos` e corrija o que ele apontar.
5. Envie a branch com `git push -u origin <branch>` e abra o PR com `gh pr create`, em português, com o que mudou e como testar.
6. Espere o CI passar. Com o CI verde e sem telas aguardando aprovação do Arthur, integre com `gh pr merge --merge --delete-branch`.
7. Volte para a `main` atualizada: `git switch main` e `git pull --ff-only origin main`.
