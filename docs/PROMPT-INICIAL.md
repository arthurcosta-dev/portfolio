Cole o texto abaixo (tudo dentro do bloco) na primeira mensagem da sessão do Claude Code, com a pasta do projeto aberta no VS Code e a pasta `docs/` deste kit dentro dela.

```
Você vai construir comigo o meu portfólio de faculdade (CP3 de WebDev, FIAP). Eu sou o Arthur, 1º ano de Engenharia de Software, quero estágio em front-end. O prazo é terça, 03/11/2026, e hoje é domingo, 01/11. Todos os 12 requisitos do enunciado são obrigatórios.

ANTES DE QUALQUER COISA, leia na ordem:
1. docs/BRIEF.md (contexto, limites, stack decidida, arquitetura, plano por fases, o que só eu posso fazer)
2. docs/requisitos-CP3.md (enunciado oficial: em caso de dúvida, vale ele)
3. docs/DESIGN.md (o que seguir e o que mudar no design aprovado)
4. Abra as imagens em docs/design/*.png e consulte docs/design/Main.dc.html e Mobile.dc.html para os valores exatos.

COMO TRABALHAR
- Responda sempre em português, de forma direta.
- Depois de ler tudo, NÃO escreva código ainda. Me mostre um plano curto (fases, branches, o que você vai criar na Fase 0, o que vai precisar de mim e em que momento) e espere eu aprovar.
- Comece pela Fase 0 do BRIEF (harness e base) antes de qualquer tela. O harness (CLAUDE.md, .claude/settings.json com hooks e permissões, skills, subagente revisor) faz parte da nota: monte, versione e justifique cada item em docs/harness.md.
- Siga as convenções do BRIEF, seção 4: arquitetura, nomenclatura, Conventional Commits (tipo em inglês, descrição em português), GitHub Flow (branch feature/*, PR, merge commit). Nunca commite na main nem use push --force. Nunca falsifique datas de commit.
- Faça commits pequenos e frequentes, em PRs. Rode lint, test e build antes de cada PR e use o subagente revisor-requisitos.
- Não invente nada sobre mim (dados pessoais, métricas, datas, textos de projeto). Use placeholders TODO em src/config/site.js e me pergunte. Projetos vêm só da API do GitHub.
- Não adicione dependências, páginas ou recursos fora do BRIEF sem me perguntar. Não corte nenhum requisito: se o tempo apertar, reduza só detalhe visual e me avise.
- Eu não vi back-end. Antes de usar um conceito novo (TanStack Query, Supabase, RLS, Husky, commitlint, hooks do Claude Code etc.), explique em 3 a 5 linhas, simples, e registre em docs/explicacoes.md. Eu preciso saber explicar tudo no vídeo.
- Quando precisar de algo que só eu faço (contas, chaves, Vercel, Supabase, EmailJS), pare, me diga o passo a passo curto e continue só depois que eu confirmar. Pergunte apenas o que bloqueia o trabalho; no resto, decida pelo BRIEF e me avise.
- Para o design: siga a seção "SEGUIR" do DESIGN.md e aplique todas as mudanças da seção "MUDAR". Quando criar algo que não existe no mockup (tema claro, dashboard, login, 404, estados), me mostre uma captura de tela para eu aprovar. Use a skill frontend-design só como apoio, sempre subordinada ao DESIGN.md.
- Meça o Lighthouse mobile na URL pública da Vercel já na Fase 1 (meta: 80 ou mais) e de novo no fim.
- Mantenha docs/CHECKLIST.md atualizado, marcando cada requisito só com evidência (arquivo, teste, URL ou print).

Quando eu aprovar o plano, comece pela Fase 0.
```

## Antes de colar

1. Descompacte o kit na pasta do projeto (devem ficar `docs/` e este arquivo na raiz).
2. Tenha instalados: Node LTS, Git, GitHub CLI com `gh auth login` feito, Claude Code.
3. Tenha abertas (sem precisar configurar ainda) contas no Supabase, EmailJS e Vercel. Os passos vêm da sessão, na hora certa.
4. Abra um terminal na pasta, rode `git init` se quiser, e inicie o Claude Code no VS Code.
