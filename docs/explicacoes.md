# Explicações dos conceitos novos

Cada conceito em linguagem simples, com o exemplo deste projeto.

## Dados e carregamento

**TanStack Query:** guarda em memória a resposta da API e entrega ao componente `isPending`, `isError` e `data` prontos. Ao navegar entre páginas, reaproveita a resposta em vez de chamar o GitHub de novo. Sem ele, seria preciso repetir `useState` e `useEffect` em cada tela. Aqui: `src/hooks/useRepos.js`.

**Limite de requisições (rate limit):** sem token, o GitHub aceita 60 chamadas por hora por IP. Passando disso, responde 403 ou 429. O `src/services/github.js` reconhece esses códigos, e a tela mostra uma mensagem amigável com "Tentar de novo".

**`React.lazy` + `Suspense`:** `lazy` separa uma página em outro arquivo JavaScript, baixado só quando alguém entra nela. `Suspense` define o que aparece enquanto o arquivo chega. Aqui: `ProjectDetail` em `src/routes.jsx`.

**CLS (salto de layout):** mede o quanto a página "pula" enquanto carrega. O skeleton com o mesmo tamanho do card real evita isso, e o Lighthouse conta essa nota.

## Back-end sem servidor próprio

**Supabase:** serviço que entrega banco de dados Postgres e login prontos, acessados direto do navegador. Evita escrever e manter um servidor. Aqui ele guarda as mensagens do formulário e os projetos em destaque.

**Tabela:** uma planilha com colunas de tipo definido. `messages` tem nome, e-mail, mensagem, `answered` e data. Os `check` recusam dados fora do tamanho no próprio banco, mesmo que alguém pule a validação do site. O SQL está em `supabase/schema.sql`.

**RLS (Row Level Security):** regras dentro do banco que dizem quem faz o quê em cada linha. A chave `anon` é pública, então qualquer pessoa pode usá-la; o que protege os dados é o RLS. Aqui, um visitante consegue inserir uma mensagem, mas não ler nenhuma. Sem RLS, a chave pública abriria a tabela inteira.

**`anon` e `authenticated`:** são os dois papéis que chegam ao banco. Quem não fez login é `anon`; quem fez é `authenticated`. Como o cadastro está desativado e só existe o usuário do dono, `authenticated` significa, na prática, o Arthur.

**`grant` e `policy`:** o `grant` diz o que um papel pode tentar fazer na tabela, e a `policy` decide em quais linhas isso vale. A operação precisa passar pelos dois. Aqui o visitante só recebe `insert` em nome, e-mail e mensagem, e não consegue nem escolher o valor de `answered`.

**`service_role`:** chave do Supabase que ignora o RLS e abre o banco inteiro. Por isso nunca entra neste projeto: como tudo roda no navegador, qualquer visitante conseguiria encontrá-la.

**EmailJS:** envia e-mail a partir do navegador usando um modelo guardado no painel deles. Aqui avisa o Arthur de uma mensagem nova. A chave dele também é pública; o limite vem da cota e da restrição de domínio. Por isso a mensagem é salva primeiro no Supabase: se o e-mail falhar, ela não se perde.

## Login e dashboard

**Sessão:** depois do login, o Supabase guarda no navegador um comprovante de quem entrou e o envia nas chamadas seguintes. É assim que o RLS reconhece o papel `authenticated`. Aqui, `src/hooks/useAuthSession.js` acompanha a sessão.

**Context API:** entrega um valor a vários componentes sem passá-lo de um em um. O `AuthContext` leva a sessão para o login e para a rota protegida. O provider só envolve `/login` e `/admin`, então quem apenas visita o site não baixa o Supabase por causa dele.

**Rota protegida:** um componente que confere a sessão antes de desenhar a página e manda para `/login` quem não entrou. Ela melhora a navegação, mas não é a segurança: alguém poderia alterar o JavaScript no próprio navegador. Quem protege as mensagens é o RLS, no banco. Aqui: `src/components/admin/ProtectedRoute.jsx`.

**API REST do Supabase:** toda tabela também responde em um endereço comum, `/rest/v1/<tabela>`, que aceita um `fetch` simples com a chave `anon` no cabeçalho `apikey`. A home usa isso para ler os destaques sem baixar a biblioteca do Supabase, de cerca de 55 kB comprimidos. Aqui: `src/services/featured.js`.

**Upsert:** grava uma linha ou, se a chave já existir, atualiza a que está lá. Ao salvar os destaques, cada projeto escolhido é gravado com a nova posição, sem erro de duplicidade.

## Formulário

**`useMutation`:** a parte do TanStack Query para ações que alteram dados, como enviar uma mensagem. O `useQuery` busca dados sozinho; o `useMutation` só roda quando mandado e entrega `isPending`, `isSuccess` e `isError`. Aqui: `src/hooks/useContactForm.js`.

**`useRef`:** guarda um valor que sobrevive entre os desenhos, sem provocar um novo desenho. O `useState` só atualiza no desenho seguinte, tarde demais para dois cliques rápidos. A ref muda na hora, e por isso barra o clique duplo.

**Honeypot (campo isca):** um campo escondido das pessoas, mas presente no HTML. Robôs de spam costumam preencher tudo; quando ele vem preenchido, o site finge que enviou e não grava nada. Barra os robôs simples, não um ataque direcionado.

**`import()` dinâmico:** baixa um pacote só na hora em que o código precisa dele. O Supabase pesa cerca de 55 kB comprimido e só é usado ao enviar. Quem apenas olha o site não baixa nada disso. Aqui: `src/services/supabase.js`.

**`aria-live`:** marca uma região cujas mudanças o leitor de tela anuncia sozinho. Ela precisa existir na página antes de o texto aparecer; por isso os erros entram dentro de uma região já montada. Sem ela, quem não enxerga a tela não saberia que o envio deu certo.

## Qualidade de código

**ESLint:** lê o código sem executar e aponta erros e regras quebradas. Aqui ele também faz cumprir regras nossas: recusa `fetch` dentro de `components/` e `pages/`, e recusa `<Routes>`. Roda com `npm run lint`.

**Prettier:** formata o código sempre do mesmo jeito (aspas, espaços, quebras de linha). Assim o diff mostra só o que mudou de verdade. O ESLint cuida de erros; o Prettier, da aparência.

**Husky:** o Git consegue rodar scripts em certos momentos, como logo antes de um commit. O Husky guarda esses scripts na pasta `.husky/`, versionada, então eles valem em qualquer máquina que rode `npm install`. Sem ele, os hooks do Git ficariam só no computador de cada um.

**lint-staged:** roda ESLint e Prettier só nos arquivos que entram no commit, em vez do projeto inteiro. É o `.husky/pre-commit` que o chama, e assim o commit continua rápido.

**commitlint:** lê a mensagem do commit e confere o padrão Conventional Commits. É chamado pelo `.husky/commit-msg`. Exemplo real neste projeto: `adicionei a base` foi recusada com `type may not be empty`.

**Conventional Commits:** padrão de mensagem `tipo: descrição`, como `feat: adiciona validação do formulário`. O tipo diz a natureza da mudança (`feat` é funcionalidade, `fix` é correção, `docs` é documentação). O histórico fica legível.

## Testes

**Vitest:** executa os testes e usa a mesma configuração do Vite. Roda com `npm run test`.

**Testing Library:** testa o componente como o usuário o vê: procura um botão pelo nome e clica nele, em vez de olhar detalhes internos. `src/pages/Home.test.jsx` procura o título "Arthur Costa".

**jsdom:** simula o navegador dentro do Node, para os testes terem um `document` sem abrir um navegador de verdade.

## Entrega

**CI (GitHub Actions):** a cada PR, um computador do GitHub baixa o projeto e roda lint, testes e build (`.github/workflows/ci.yml`). Se algo falhar, o PR fica vermelho. Isso pega o que funciona só na minha máquina.

**Workflow agendado (`schedule`):** um workflow do GitHub Actions também pode rodar em horário marcado, escrito em formato cron (`17 9 * * *` = todo dia às 9h17, horário UTC). O `supabase-ativo.yml` faz uma leitura por dia na tabela pública de destaques. Isso conta como uso e impede o plano grátis do Supabase de pausar o projeto enquanto o portfólio é avaliado. O `workflow_dispatch` permite rodar o workflow na mão pela aba Actions.

**Secrets do GitHub:** valores guardados nas configurações do repositório (Settings → Secrets and variables → Actions). O workflow lê esses valores, mas eles não aparecem no código nem nos logs. A chave usada aqui é a mesma chave pública do site. Ela fica em secret só para o endereço do projeto não ficar escrito no repositório.

**Proteção de branch:** regra configurada no próprio GitHub, que impede push direto na `main`, mesmo meu. Só entra código por PR, e com o CI verde.

**Pull request (PR):** pedido para juntar uma branch à `main`. Mostra as mudanças, roda o CI e, na Vercel, gera um site de pré-visualização antes de publicar de verdade.

**Rewrite do `vercel.json`:** um site de uma página só tem o `index.html` no servidor. Ao abrir `/projetos/rewind` direto, o servidor procuraria esse arquivo e daria erro. O rewrite manda toda rota para o `index.html`, e o React Router desenha a página certa.

**Variáveis `VITE_*`:** configuração lida do `.env`. Tudo que começa com `VITE_` vai parar no JavaScript público, e qualquer visitante consegue ver. Por isso só entram chaves feitas para serem públicas, nunca um segredo.

## Performance

**`@fontsource`:** instala as fontes como pacotes, e elas são servidas pelo próprio site, sem pedir nada ao Google Fonts. Só o subconjunto latino é carregado, o que basta para o português.

**`rollup-plugin-visualizer`:** gera um mapa do que ocupa espaço no JavaScript final. `npm run analyze` cria o `dist/stats.html`, útil para mostrar o carregamento sob demanda no vídeo.

## Harness de IA

**`CLAUDE.md`:** instruções que o Claude Code lê em toda sessão: objetivo, stack, pastas, nomes, commits e limites. É como o guia que um novo colega leria no primeiro dia.

**Permissões do Claude Code:** lista em `.claude/settings.json` do que a IA pode fazer sem perguntar (`allow`) e do que ela nunca pode fazer (`deny`). O resto pede a minha confirmação.

**Hooks do Claude Code:** scripts que o próprio Claude Code executa antes ou depois de uma ferramenta da IA. Diferente de uma instrução escrita, não dependem de a IA lembrar. Exemplo real: ela tentou um `git push --force --dry-run` para testar, e o hook barrou antes de executar. Não confundir com hooks do React (`useState`) nem com hooks do Git (Husky).

**Skill:** um passo a passo guardado em `.claude/skills/<nome>/SKILL.md`, que a IA carrega quando a tarefa combina com a descrição. Evita repetir as mesmas instruções em cada conversa.

**Subagente:** uma IA auxiliar com papel e ferramentas limitados. O `revisor-requisitos` só lê: ele não tem as ferramentas de editar arquivo, e por instrução usa o terminal só para consultar o Git. Assim, revisa o trabalho de outro ponto de vista, sem misturar com a implementação.

**MCP:** forma padrão de ligar a IA a serviços externos, como a Vercel. Este projeto não versiona nenhum (`.mcp.json`); a razão está em `docs/harness.md`.
