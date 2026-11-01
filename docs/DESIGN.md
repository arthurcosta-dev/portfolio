# Design do portfólio: o que seguir e o que mudar

Este documento diz como usar o mockup aprovado pelo Arthur. O mockup é a referência visual, mas **não é a especificação final**: a seção 2 lista o que deve ser diferente dele.

## Como ler o mockup

- `docs/design/desktop-*.png` (1360 px) e `docs/design/mobile-*.png` (390 px): o resultado por seção (abertura, projetos, sobre, contato). **Abra as imagens.**
- `docs/design/Main.dc.html` (desktop) e `docs/design/Mobile.dc.html` (celular): o código do mockup, com estilos inline. Use para consultar valores exatos (cores, tamanhos, raios, posições). **Ignore** as tags `<x-dc>`, `<helmet>`, `{{ }}` e o `<script type="text/x-dc">`: são do editor de design, não vão para o projeto.
- Nas imagens, as fontes são substitutas (as do Google estavam bloqueadas ao renderizar). Fraunces e Onest reais ficam um pouco diferentes: não copie a fonte das imagens, copie a intenção.
- O canvas original (privado, do Arthur): https://claude.ai/artifact/S9oiex5SGUvgME1GfuFsev

## 1. O que SEGUIR (o Arthur aprovou)

**Conceito:** céu noturno e órbita. Fundo azul-noite, acento violeta, títulos em serifa leve, bento grid. A abertura tem uma elipse com um ponto orbitando; o final tem um objeto facetado flutuando em órbita sobre um céu de estrelas, acima do formulário. Simples, poucos elementos, muito espaço.

**Cores (tokens):**

| Token | Valor | Uso |
|---|---|---|
| fundo | `#060919` | fundo da página |
| fundo-contato | `#050816` | seção final (com estrelas) |
| superficie | `#141030` | cards cheios |
| superficie-2 | `#1C1642` | cards internos e de destaque |
| borda-card | `#1F1946` | borda de card cheio, rodapé |
| borda | `#2A2350` | cards vazados, inputs, divisórias |
| borda-forte | `#3A2F73` | linhas dentro do card de tecnologias |
| borda-hover | `#4A3A8F` | hover de card; linha da órbita |
| texto | `#ECE9FA` | texto principal |
| texto-2 | `#D4D0EC` | texto secundário forte |
| texto-suave | `#A39FC4` | texto auxiliar, menu |
| placeholder | `#8A85B0` | placeholders |
| acento | `#7B4AE8` | botão primário, bloco de contato |
| acento-hover | `#8A5CF0` | hover do botão primário |
| acento-vivo | `#915EFF` | pontos, linha do objeto, destaques |
| acento-claro | `#B79BFF` | hover de link, foco |
| input | `#0B0E26` | fundo dos campos |
| erro | `#FF8A9B` | erros de formulário |
| desabilitado | `#4B3498` | botão enquanto envia |
| estrelas | `#CFC6FF` | pontos do céu |

Registre esses valores como tokens no Tailwind (tema) e use sempre os tokens, nunca hex solto nos componentes.

**Tipografia:**
- **Fraunces** (serifa) para títulos: peso 300, espaçamento entre letras negativo (-0.03em a -0.045em). Abertura 176 px (desktop) / 92 px (celular); títulos de seção 56 / 44 px; título do card grande 40 / 34 px; cards pequenos 28 / 26 px.
- **Onest** (sem serifa) para texto: pesos 400, 500 e 600; corpo 15 a 21 px.
- Carregue as fontes **hospedadas no próprio projeto** (`@fontsource-variable/fraunces` e `@fontsource/onest`, só o subconjunto latin e só os pesos usados), com `font-display: swap`. É mais rápido que o Google Fonts e ajuda o Lighthouse.

**Forma e espaço:**
- Raios: card grande 28 a 32 px; médio 20 a 24 px; botão 14 px; campo 12 px; botão de tema circular.
- Largura máxima 1360 px; margem lateral 80 px (24 px no celular); seções com 96 px de respiro vertical (72 px no celular).
- Bento grid: 12 colunas, espaço de 16 px e linhas de 224 px no desktop; 2 colunas e espaço de 12 px no celular.
- Alvos de toque de pelo menos 44 px; foco visível (contorno de 2 px em `acento-claro`, afastado 3 px); `prefers-reduced-motion` respeitado.

**Movimento (só estes dois):**
1. Ponto orbitando a elipse (28 s, linear, contínuo), na abertura e no final.
2. Objeto do final flutuando (9 s, ease-in-out, ±8 px).
Com `prefers-reduced-motion`, ambos ficam parados. Nenhuma outra animação de entrada.

**Estrutura da home (uma página longa que desce):**
1. Cabeçalho: nome "arthur costa" em serifa, menu Projetos / Sobre / Contato, botão de tema.
2. Abertura: "Arthur Costa" enorme, elipse com ponto orbitando, frase curta, botões "Ver projetos" e "Falar comigo".
3. Projetos em destaque (bento).
4. Sobre (bento).
5. Contato: céu de estrelas, objeto em órbita, "Vamos conversar?", formulário.
6. Rodapé: © 2026 Arthur Costa, GitHub, LinkedIn, Entrar.

**Bento de Projetos (desktop):** card grande nas colunas 1 a 7, ocupando 2 linhas; dois cards menores nas colunas 8 a 12, um por linha.
**Bento de Sobre (desktop):** card grande de texto (colunas 1 a 7, linhas 1 e 2); Tecnologias (colunas 8 a 12, linha 1); FIAP e objetivo (colunas 8 a 12, linha 2); GitHub (colunas 1 a 5, linha 3); bloco roxo de contato (colunas 6 a 12, linha 3). No celular: o card grande ocupa as 2 colunas; Tecnologias e GitHub ficam lado a lado; FIAP e Contato ocupam as 2 colunas.

**Objeto do final:** copie exatamente os polígonos do mockup (SVG), com a órbita e o ponto em CSS. Fica como um componente `OrbitObject`. **Sem Three.js.** O Arthur gostou do jeito que está.

## 2. O que MUDAR em relação ao mockup

1. **Card de projeto mostra só dados da API do GitHub.** O desenho de barras de progresso do card do Rewind era decoração fixa: remova. Campos disponíveis na lista de repositórios: `name`, `description`, `language`, `topics`, `stargazers_count`, `forks_count`, `updated_at`, `homepage`, `html_url`. No card grande: nome em Fraunces grande, tópicos como etiquetas, linguagem (com a cor da linguagem), estrelas, forks e data. Links: "Ver projeto" leva a `/projetos/:nome`; "Abrir site" só aparece se `homepage` existir; "Ver no GitHub" usa `html_url`. Sem descrição: "Sem descrição ainda." em texto discreto. Imagem de pré-visualização gerada pelo GitHub (`opengraph.githubassets.com`) é um **extra opcional**: foi testada uma vez e respondeu "Too many requests", então só use com fallback e depois de testar.
2. **Quantos destaques aparecem:** 3 ou mais, o card grande e dois pequenos, na ordem definida no dashboard (mostre só os 3 primeiros); 2, grande mais um pequeno que ocupa as duas linhas; 1, grande ocupando a largura toda; 0, use os 3 repositórios públicos atualizados mais recentemente (sem forks, sem arquivados e sem o repositório de perfil `arthurcosta-dev`).
3. **A lista de repositórios em linhas sai da home.** Ela vira a página `/projetos` (todos os repositórios, usando o mesmo layout de linhas do mockup: nome, descrição, linguagem, data). O link "Ver todos os projetos" da home leva para lá.
4. **Não existe página Sobre separada.** Remova "Ler a página Sobre" e "Ler a história completa". Sobre é só a seção da home; o menu leva a `/#sobre` (e `/#contato`), inclusive a partir de outras páginas.
5. **Remova** a linha "Disponível para estágio a partir de [mês/ano]" (é uma data que o Arthur não informou). Reequilibre a composição da abertura sem ela.
6. **Bloco roxo "Contato rápido":** mantenha o bloco (é o toque de cor do Sobre), mas troque o botão "Enviar mensagem" (que só rola até o formulário logo abaixo) por links de e-mail e LinkedIn. Os valores reais ficam em `src/config/site.js`, com placeholders até o Arthur informar.
7. **Conteúdo.** Nenhum texto de projeto escrito à mão: tudo de projeto vem da API. Mantenha os textos do Sobre do mockup (1º ano de Engenharia de Software na FIAP, foco em front-end, busca de estágio em desenvolvimento web; tecnologias React, JavaScript, Tailwind CSS e Vite). **Não inclua** trajetória anterior (outras faculdades), planos de estudo no exterior, depoimentos, números ou métricas inventados, nem endereço, cidade onde mora ou idade.
8. **Abertura responsiva de verdade.** O mockup posiciona tudo em pixels absolutos num quadro de 1360 px. No projeto real use `clamp()` e unidades relativas para funcionar de 360 a 1920 px, sem sobreposição e com altura mínima reservada (sem salto de layout).
9. **Formulário real.** O mockup usa `div role="form"`: use `<form noValidate>` semântico. Validação manual com `useState`, por campo, ao enviar e ao sair do campo. `aria-invalid`, `aria-describedby` e região `aria-live` para os erros. Mensagens: nome obrigatório; e-mail inválido ("Digite um e-mail válido, como nome@dominio.com."); mensagem com no mínimo 20 caracteres ("Escreva pelo menos 20 caracteres."). Estado enviando como no mockup do celular (campos e botão desabilitados, spinner, "Enviando…"). Crie também os estados de sucesso e de erro de envio.
10. **Fontes hospedadas no projeto** (ver seção 1), em vez do link do Google Fonts que está no mockup.
11. **"Entrar" no rodapé** continua, levando a `/login`.

## 3. O que NÃO existe no mockup (criar na mesma linguagem visual)

- **Tema claro.** Derive do escuro: fundo lavanda bem claro, superfícies brancas, texto em violeta quase preto, mesmo acento. Proponha e **mostre ao Arthur (captura de tela) antes de finalizar**. O site abre no escuro na primeira visita e lembra a escolha.
- **Skeletons** do bento e das linhas de projeto, com as mesmas proporções dos cards reais (para não haver salto de layout). Pulso sutil, parado com `prefers-reduced-motion`.
- **Erro da API** (inclusive limite de requisições do GitHub), com título claro, o que aconteceu e botão "Tentar de novo". **Lista vazia:** "Nenhum projeto público encontrado ainda."
- **Páginas:** `/projetos`, `/projetos/:nome`, `/login`, `/admin` (dashboard), 404 e erro de rota. Dashboard sóbrio, com os mesmos tokens: mensagens em linhas (marcar como respondida) e seleção de destaques (lista de repositórios com chave liga/desliga e ordem). Mostre ao Arthur o resultado.

## 4. Componentes sugeridos

`Header`, `Hero`, `OrbitLine`, `FeaturedProjects`, `ProjectCard` (variantes grande e pequena), `ProjectRow`, `AboutBento`, `ContactSection`, `StarField`, `OrbitObject`, `ContactForm`, `Footer`. Base reutilizável (mesmo botão e mesmo card em todas as páginas): `Button`, `Card`, `Tag`, `Skeleton`, `Spinner`, `ErrorState`, `EmptyState`.
