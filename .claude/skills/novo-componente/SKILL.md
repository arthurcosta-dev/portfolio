---
name: novo-componente
description: Cria um componente React seguindo as convenções e o design do projeto. Use ao criar ou dividir componentes visuais.
---

1. Procure em `src/components/ui/` antes de criar: botão, card, etiqueta, skeleton e estados de erro e vazio são reaproveitados em todas as páginas.
2. Coloque na pasta certa (`ui/`, `layout/`, `home/`, `projects/`, `contact/`, `admin/`), com arquivo em PascalCase, arrow function e `export default`.
3. O componente só recebe dados por props e desenha. Dados externos vêm de um hook; nunca chame `fetch` ou Supabase aqui.
4. Passou de ~120 linhas ou mistura dois assuntos: divida.
5. Visual: siga `docs/DESIGN.md`, consultando os valores exatos em `docs/design/*.dc.html`. Use só tokens do tema, nunca hex solto.
6. Garanta alvo de toque de 44 px, foco visível, `prefers-reduced-motion` e altura reservada para não haver salto de layout. Funciona de 360 a 1920 px.
7. Se a tela não existe no mockup (tema claro, login, dashboard, 404, estados), gere uma captura e peça a aprovação do Arthur.
