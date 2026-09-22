# Nathfolio

Portfólio da Nathalia Gonçalves — front-end developer & visual designer.

Feito em [Astro](https://astro.build). HTML estático, zero JavaScript de
framework no cliente, fontes self-hosted, imagens otimizadas no build.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview  # serve o dist/ como vai ficar no ar
npm run check    # checagem de tipos
```

---

## Onde mexer no quê

| Quero… | Arquivo |
| --- | --- |
| Adicionar/editar um projeto (card + case study) | `src/data/projects.ts` |
| Esconder um projeto sem apagá-lo | `hidden: true` no projeto, em `projects.ts` |
| Largura máxima do conteúdo | `--maxw-page` em `global.css` |
| Trocar e-mail, cidade, ano, redes | `src/data/site.ts` |
| Mudar cor, fonte, espaçamento | `src/styles/global.css` (bloco `:root`) |
| Texto da home | `src/pages/index.astro` |
| Texto do about | `src/pages/about.astro` |
| Layout do case study | `src/pages/work/[slug].astro` |
| Ilustração do gato | `src/components/CatEasterEgg.astro` |
| A piada do "off the clock" + GitHub/LinkedIn | `src/components/PersonalNote.astro` |
| Ordem dos blocos da home | `src/pages/index.astro` |
| O leque de cartas do fecho | `src/components/WorkFan.astro` + `src/assets/tiles/` |
| A página do trabalho atual | `src/pages/lumimeds.astro` |
| Layout compartilhado das páginas de projeto | `src/components/CaseStudy.astro` |
| Vídeos das telas | `public/videos/` — veja o LEIA-ME de lá |
| As animações de rolagem | bloco `.rise` em `src/styles/global.css` |

### Adicionar um projeto novo

1. Coloque a imagem em `src/assets/`.
2. Em `src/data/projects.ts`, copie um objeto do array `projects` e ajuste.
3. Se ele tiver o bloco `study`, a página `/work/<slug>` é criada sozinha e
   ele entra no rodapé "next project" dos outros. Sem `study`, o card
   aparece no grid mas não vira link (é o caso do **Petilio** hoje).

Nada mais precisa ser tocado — nem rota, nem menu, nem sitemap. As larguras
dos cards se reorganizam sozinhas para as linhas do grid sempre fecharem
(`src/lib/grid.ts`), então adicionar ou esconder projeto não abre buraco.

O **Water cycle game** está com `hidden: true` — o texto e o case study
continuam escritos ali; apagar essa linha traz o projeto de volta.

### O gato

A ilustração está em `src/assets/cat.png` (recortada do original para
tirar o vazio transparente de baixo). Ela desce do topo da tela, em largura
total. Em telas < 700px ela é ampliada para 235% e deslocada, senão o gato
fica pequeno demais e a piada se perde — e precisa de `max-width: none`
ali, porque o reset global tem `img { max-width: 100% }`.

Ela ocupa 68% da largura no desktop e 200% no mobile, ancorada à direita —
a arte sangra pela borda direita, então é esse lado que precisa encostar.
O `flex-shrink: 0` não é decorativo: sem ele o flex espreme a imagem
quando ela passa da largura da tela, que é exatamente o caso no mobile.

Só é baixada quando alguém clica no botão (fica dentro de um `<dialog>`
fechado, com `loading="lazy"`), então não pesa no carregamento da home.

---

## O que ainda falta preencher

Estão marcados com `// TODO:` em `src/data/projects.ts`:

- **PetMatch** — link do site e do repositório
- **safe** — link do repositório (o site já está lá)
- **Artsy** — link do site (se estiver no ar) e do repositório
- **Water cycle game** — link, imagens e o texto de verdade
  (o que está lá é um rascunho meu a partir da descrição do card)

Link vazio (`''`) simplesmente não renderiza o botão — nada quebra.

Em `src/pages/lumimeds.astro` falta confirmar a **stack real** e, se quiser,
o link do site — e o texto todo é rascunho meu, precisa da sua revisão.

Em `src/data/site.ts` falta a **URL do LinkedIn** — hoje só o GitHub aparece
no bloco "off the clock" (mesma regra: campo vazio = link não renderiza).

---

## Deploy — GitHub Pages com domínio próprio

Já configurado. O que existe:

- `.github/workflows/deploy.yml` — builda e publica a cada push na `main`
- `public/CNAME` — o domínio
- `astro.config.mjs` — `site:` alimenta canonical e sitemap
- `public/robots.txt` — aponta pro sitemap

**Antes do primeiro deploy**, troque o domínio nos três lugares
(`astro.config.mjs`, `public/CNAME`, `public/robots.txt`) e, no repositório,
vá em *Settings → Pages → Source* e escolha **GitHub Actions**.

Se um dia o site for morar em `usuario.github.io/repo/` em vez de um domínio
próprio, basta adicionar `base: '/repo/'` no `astro.config.mjs`: todos os
links internos passam pela helper `url()` de `src/data/site.ts` e se ajustam
sozinhos.

---

## Decisões que valem lembrar

- **Fontes self-hosted** (`@fontsource-variable`), não Google Fonts. Sem
  requisição a terceiro, sem dependência externa em runtime. As duas fontes
  do texto em inglês têm `<link rel="preload">` no `BaseLayout`.
- **Fallbacks com métricas ajustadas** no topo do `global.css`: enquanto
  Fraunces/Inter carregam, Georgia/Arial desenham com a mesma altura de
  linha **e a mesma largura de texto**, então as quebras de linha não mudam
  e nada pula (CLS 0). O `size-adjust` foi calibrado medindo a largura real
  do headline nas duas fontes; `ascent/descent-override` são as métricas
  reais dos arquivos divididas por ele. Se você trocar de fonte, esses
  números precisam ser recalculados.
- **Nome e função ficam fixos embaixo de cada card**, em toda tela. O grid
  precisa ser legível sem interação — antes tudo vivia só no hover e a
  seção lia como quatro retângulos decorativos. O hover agora **acrescenta**
  a descrição em vez de ser a única fonte.
- **Hover vira toque**: em telas com `(hover: none)`, o primeiro toque abre
  o card e o segundo navega (`src/components/WorkGrid.astro`).
- **Escalonamento**: o segundo card de cada fileira desce um pouco (só no
  grid de 12). Quem decide isso é `layoutRows` em `src/lib/grid.ts`, que
  devolve a posição de cada card na fileira — nenhum índice está chumbado,
  então adicionar ou esconder projeto não quebra o padrão.
- **Teclado**: focar um card abre o círculo, igual ao hover.
- **O círculo do hover** fica em `scale(0)` em repouso (nada de pontinho
  colorido sobre a imagem) e cresce com `transform`, que a GPU anima sem
  repintar.
- **`--pad-x` só em elemento full-bleed** (section, header, footer). Em
  bloco que já tem `max-width` próprio, use `--gutter`: padding em % conta
  contra a largura do pai e a conta sai errada.
- **`prefers-reduced-motion` não desliga tudo.** A preferência existe para
  evitar movimento que causa mal-estar vestibular, não para apagar toda
  animação. Então: **continuam** as entradas ao rolar (com percurso de 12px
  em vez de 56px, via `--rise-distance`) e as transições de hover e foco;
  **somem** o parallax, o gato descendo a tela, o desvanecer do hero, o
  typewriter e qualquer animação em loop infinito.
  Atenção ao testar: **o Chrome headless ignora a configuração do sistema**,
  então uma medição automatizada roda sempre com as animações ligadas. No
  Windows, *Configurações → Acessibilidade → Efeitos visuais → Efeitos de
  animação* desligado faz o browser reportar `reduce` para todos os sites.
- **Duas cores dos cards foram escurecidas** para passar em contraste AA
  com o texto branco por cima: o azul do *safe* (`#378ADD` → `#2A6FBF`) e o
  rosa do *Petilio* (`#d1428e` → `#B8327A`). Ficam em `src/data/projects.ts`
  se quiser reverter.
- **Grid de 12 colunas** no desktop: as larguras em `projects.ts` são em
  doze avos (PetMatch 7, safe 5, o resto 4). Todos os cards têm a mesma
  altura, então as fileiras se alinham — a assimetria vem da largura e do
  escalonamento, não de alturas diferentes.
- **Toda a animação de rolagem é CSS puro** (`animation-timeline: view()`),
  sem JS, sem IntersectionObserver, sem listener de scroll — por isso o TBT
  fica em 0ms. A utilidade `.rise` está no `global.css`; é só pôr a classe
  no bloco. Três coisas que não podem ser esquecidas:
  1. **`opacity: 0` nunca pode ser estado base.** Todo o bloco vive dentro
     de `@supports (animation-timeline: view())` — assim, num browser sem
     suporte (Safari e Firefox hoje) a regra não existe e o conteúdo
     aparece normal, em vez de a página ficar em branco.
  2. **A entrada não anima opacidade, só deslocamento.** Texto no meio de
     um fade fica com contraste abaixo do mínimo (o cinza de apoio cai de
     5,7:1 para ~3,6:1 a 80%) e reprova em auditoria de acessibilidade.
  3. **O fim do range vai em `cover`, e não pode passar de ~45%.** Se
     terminar em `entry`, a duração vira a própria altura do elemento: um
     bloco de 40px animava em 40px de rolagem, ainda na beirada de baixo
     da tela — invisível. Mas se passar de ~45% de `cover`, o último bloco
     de uma página curta não tem rolagem suficiente e fica parado no meio
     do caminho. O ponto de equilíbrio foi medido: hoje o pior resíduo é
     2px, em qualquer altura de tela entre 620px e 1080px.
- **O movimento do bloco da LumiMeds** é scroll-driven em CSS puro
  (`animation-timeline: view()` em `CurrentWork.astro`): a imagem desliza
  20px enquanto a pessoa rola, sem JS e sem listener. Onde o browser não
  suporta (Safari e Firefox hoje), nada acontece e o layout é idêntico.
  Dois detalhes que custam caro se esquecer: o shorthand `animation` zera
  a duração para 0s e mata a animação — tem que usar longhand com
  `animation-duration: auto`; e a classe precisa de nome próprio, porque
  `.shot` já existe em `ProjectCard`.
- **O bloco da LumiMeds na home não tem painel**: imagem à esquerda, texto
  solto à direita numa coluna curta (`max-width: 38ch`). A caixa clarinha
  que se vê em volta da imagem está **dentro do PNG** (o asset foi exportado
  com fundo `#fafaf8`, o mesmo `--paper-2`) — não é CSS. Um export com
  fundo transparente e ela some sem tocar em código.
- **Separação autoral × emprego** é estrutural, não só texto: os projetos
  autorais vivem em `projects` com case study próprio e entram no ciclo
  "next project"; a LumiMeds tem página (`/lumimeds`) mas fica **fora** de
  `projects` — sem card no grid, fora do ciclo, e o texto diz explicitamente
  que o design é do time.
- **O leque** (`WorkFan.astro`) é gerado: rotação e arco se redistribuem
  sozinhos conforme o número de cartas, então adicionar ou tirar uma não
  exige recalcular nada. As cartas são recortes 4:5 em `src/assets/tiles/`.
- **`CaseStudy.astro`** é o layout de página de projeto, usado tanto pela
  rota `/work/<slug>` quanto pela LumiMeds. Para uma página nova, use ele
  com props — não duplique.

## Lighthouse

Medido no build de produção (`npm run preview`), Chrome headless:

| página | perf | a11y | best practices | seo |
| --- | --- | --- | --- | --- |
| **desktop** — home / about / case study | 100 | 100 | 100 | 100 |
| mobile — home | 95 | 100 | 100 | 100 |
| mobile — about | 99 | 100 | 100 | 100 |
| mobile — safe | 98 | 100 | 100 | 100 |
| mobile — Artsy | 99 | 100 | 100 | 100 |
| mobile — LumiMeds | 99 | 100 | 100 | 100 |

CLS 0 e TBT 0ms em todas. O que sobra em mobile é LCP na rede simulada
(~2,3s), limitado pelo tamanho das imagens de projeto.
