# Verificações em produção

Geradas por script em navegador real (Edge, Playwright) em 2026-11-01, em https://portfolio-ten-orcin-b9wg2d3oif.vercel.app.

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
