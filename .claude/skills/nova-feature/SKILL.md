---
name: nova-feature
description: Conduz uma funcionalidade do início ao PR seguindo o GitHub Flow do projeto. Use ao começar qualquer feature, correção ou fase do BRIEF.
---

1. Confira em `docs/BRIEF.md` e `docs/requisitos-CP3.md` o que a funcionalidade precisa cumprir. Se usar um conceito novo, explique ao Arthur em 3 a 5 linhas e registre em `docs/explicacoes.md` antes de codar.
2. Atualize a `main` e crie a branch: `git switch main`, `git pull --ff-only origin main`, `git switch -c feature/<nome>`.
3. Implemente respeitando a regra de ouro do `CLAUDE.md`: service, depois hook, depois componente. Para componentes, use a skill `novo-componente`.
4. Trate os estados de carregamento, erro e vazio de todo dado de API.
5. Escreva ou ajuste os testes junto com o código.
6. Faça commits pequenos, um assunto por commit.
7. Atualize `docs/CHECKLIST.md`, marcando só o que tem evidência.
8. Finalize com a skill `commit-e-pr`.
