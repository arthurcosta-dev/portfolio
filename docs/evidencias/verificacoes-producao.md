# Verificações em produção

Fases 1 e 3: geradas por script em navegador real (Edge, Playwright), em https://portfolio-ten-orcin-b9wg2d3oif.vercel.app. Fases 2 e 4: verificações manuais do Arthur e pedidos feitos direto às APIs, como cada seção descreve.

## Deploy automático

Status da Vercel nos commits de merge da `main`, sem ação manual:

- `6208a2b`: success, 2026-11-01T17:23:45Z
- `fe3a295`: success, 2026-11-01T17:36:48Z
- `/robots.txt`, adicionado pelo PR #5: primeira linha `User-agent: *`

## Rotas

- Abertura direta de `/projetos/portfolio`: h1 `portfolio`, URL https://portfolio-ten-orcin-b9wg2d3oif.vercel.app/projetos/portfolio
- Depois de atualizar a página: h1 `portfolio`
- `/projetos` depois de atualizar: h1 `Projetos`
- `/nao-existe`: h1 `404`

## Tema ao reabrir

Troca o tema, fecha a aba e abre outra no mesmo perfil do navegador. Visitante novo começa no escuro.

- Primeira visita: escuro = true
- Trocou e reabriu: escuro = false
- Trocou de novo e reabriu: escuro = true

## Corte horizontal

Largura da página menos largura da janela, em px. O esperado é 0.

| Largura | `/` | `/projetos` | `/projetos/portfolio` | `/nao-existe` |
| ------- | --- | ----------- | --------------------- | ------------- |
| 360     | 0   | 0           | 0                     | 0             |
| 390     | 0   | 0           | 0                     | 0             |
| 768     | 0   | 0           | 0                     | 0             |
| 1024    | 0   | 0           | 0                     | 0             |
| 1360    | 0   | 0           | 0                     | 0             |
| 1920    | 0   | 0           | 0                     | 0             |

## Lighthouse mobile

Medições de 01/11/2026, depois do merge do PR #5. As notas são dos relatórios JSON do Lighthouse.

| Rota                  | Performance | Acessibilidade | Boas práticas | SEO | LCP   | TBT    | CLS   |
| --------------------- | ----------- | -------------- | ------------- | --- | ----- | ------ | ----- |
| `/` (1)               | 89          | 100            | 100           | 100 | 1.0 s | 430 ms | 0.001 |
| `/` (2)               | 98          | 100            | 100           | 100 | 0.8 s | 160 ms | 0.001 |
| `/` (3)               | 94          | 100            | 100           | 100 | 0.8 s | 280 ms | 0.001 |
| `/projetos`           | 95          | 100            | 100           | 100 | 2.6 s | 140 ms | 0.018 |
| `/projetos/portfolio` | 94          | 100            | 100           | 100 | 3.0 s | 50 ms  | 0.016 |

## Fase 2 (01 e 02/11/2026)

- **Formulário em produção:** um envio real pelo site gravou a mensagem no Supabase (resposta 201) e disparou o EmailJS (resposta 200). O Arthur recebeu os e-mails.
- **Login e painel em produção:** o Arthur testou o login e o painel com a conta dele, seguindo um roteiro de seis passos, e todos funcionaram.

## Fase 3 (02/11/2026)

Medições em produção depois do merge do PR #17, com Edge e Playwright. Login e painel foram abertos com o Supabase simulado no navegador; nada foi ao banco real.

### Corte horizontal em todas as telas

Largura da página menos largura da janela, em px. O esperado é 0.

| Largura | `/` | `/projetos` | `/projetos/portfolio` | `/nao-existe` | `/login` | `/admin` (logado) |
| ------- | --- | ----------- | --------------------- | ------------- | -------- | ----------------- |
| 360     | 0   | 0           | 0                     | 0             | 0        | 0                 |
| 390     | 0   | 0           | 0                     | 0             | 0        | 0                 |
| 768     | 0   | 0           | 0                     | 0             | 0        | 0                 |
| 1024    | 0   | 0           | 0                     | 0             | 0        | 0                 |
| 1360    | 0   | 0           | 0                     | 0             | 0        | 0                 |
| 1920    | 0   | 0           | 0                     | 0             | 0        | 0                 |

### Teclado

Na home, a 1360 px e a 390 px, a tecla Tab passa por todos os links, botões e campos na ordem da página: marca, menu, tema, chamadas da abertura, projetos, Sobre, Contato, formulário e rodapé. Todos os itens mostraram contorno de foco. No celular, o botão do menu abre com Enter (`aria-expanded` vira `true`) e fecha com Escape.

### CLS com menos de 3 destaques

Home no celular (390 px), rolada até o fim, com a lista de destaques simulada.

| Caso                       | Cards | CLS   |
| -------------------------- | ----- | ----- |
| Nenhum destaque (recentes) | 3     | 0,004 |
| 1 destaque                 | 1     | 0,004 |
| 2 destaques                | 2     | 0,002 |
| Supabase fora do ar (503)  | 3     | 0,002 |

### Lighthouse mobile

Notas dos relatórios JSON, com um print por rota em `docs/evidencias/lighthouse-fase-3-*.png` (home, detalhe, projetos, login e 404). O painel não entra: o Lighthouse abre `/admin` sem login, e a rota redireciona para `/login`, que já está na tabela. O painel logado foi conferido só no corte horizontal acima.

| Rota                  | Performance | Acessibilidade | Boas práticas | SEO | LCP   | TBT   | CLS   |
| --------------------- | ----------- | -------------- | ------------- | --- | ----- | ----- | ----- |
| `/`                   | 99          | 100            | 100           | 100 | 1.8 s | 20 ms | 0.001 |
| `/projetos`           | 95          | 100            | 100           | 100 | 2.7 s | 10 ms | 0.006 |
| `/projetos/portfolio` | 92          | 100            | 100           | 100 | 3.2 s | 30 ms | 0     |
| `/login`              | 97          | 100            | 100           | 100 | 2.3 s | 30 ms | 0     |
| `/nao-existe`         | 98          | 100            | 100           | 100 | 2.0 s | 0 ms  | 0     |

Antes do PR #17, `/projetos/portfolio` tinha CLS de 0,055: o rodapé aparecia na tela durante o carregamento e era empurrado para baixo.

### Bundle (`npm run analyze`)

Mapa em `analyze-fase-3.png`. A home baixa só `index` (84,7 kB gzip) e o bloco compartilhado de React Router e TanStack Query (37,7 kB gzip). Supabase (55,2 kB gzip) e EmailJS (1,5 kB gzip) só baixam quando o formulário é enviado ou o login abre. Login (1,3 kB), painel (2,6 kB) e detalhe (1,1 kB) são blocos separados. O mapa mostra o React Router vindo de `dist/development`: na versão 7.18.5, essa é a única pasta que o pacote exporta, tem o mesmo tamanho e o mesmo código da pasta `production`, e os trechos só de desenvolvimento são removidos pelo Vite no build. A ilustração do Sobre tem 5 kB (600w) e 9,8 kB (1200w) em WebP.

## Fase 4 (03/11/2026)

### Permissões vistas por um visitante

Pedidos feitos com a mesma chave pública que o site entrega. As escritas usaram filtros que não acham nenhuma linha.

| Tentativa                           | Resposta                     |
| ----------------------------------- | ---------------------------- |
| Ler as mensagens                    | 401 (`42501`, sem permissão) |
| Marcar uma mensagem como respondida | 401                          |
| Apagar uma mensagem                 | 401                          |
| Ler os destaques                    | 200, porque a home precisa   |
| Apagar ou mudar um destaque         | 401                          |

No código publicado não há chave secreta do Supabase nem token do GitHub, só a chave pública.

### Supabase ativo

O workflow `supabase-ativo.yml` rodou à mão e o Supabase respondeu 200: https://github.com/arthurcosta-dev/portfolio/actions/runs/41695741724

### Celular

O Arthur abriu o site publicado no celular dele e confirmou, em 03/11/2026, que as telas estavam certas.
