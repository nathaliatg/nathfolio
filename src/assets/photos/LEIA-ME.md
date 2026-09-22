# Fotos pessoais

As polaroids do topo da página **about**. Diferente de `public/videos/`,
aqui é `src/assets/` — o Astro otimiza sozinho, gera `.webp` e monta o
`srcset`. Você joga o arquivo original, ele resolve o resto.

## Como ligar no código

Em `src/components/PhotoScatter.astro`, no topo, tem três linhas de
`import` comentadas e um array `photos` comentado. Descomente, ajuste os
nomes e pronto:

```ts
import photoDesk from '../assets/photos/desk.jpg';

const photos: Photo[] = [
  { src: photoDesk, alt: 'Meu setup de trabalho em casa', caption: 'the desk' },
];
```

**Enquanto o array estiver vazio, o componente não renderiza nada** — a
página fica exatamente como era hoje. Não tem risco de subir uma moldura
vazia pro ar por esquecimento.

| campo | |
| --- | --- |
| `src` | a foto importada |
| `alt` | o que se vê na foto, pra quem usa leitor de tela. Descreva de verdade — "eu no ateliê pintando" é útil, "foto minha" não |
| `caption` | opcional: a legenda à mão na aba de baixo. Curta, 2–3 palavras. Sem ela a polaroid fica com a aba em branco, que também funciona |

## Especificações

| | |
| --- | --- |
| formato | **JPG** — são fotos, JPG rende muito melhor que PNG aqui |
| proporção | **quadrada (1:1)** — a polaroid recorta pro quadrado de qualquer jeito, então corte antes pra escolher você o que fica de fora |
| tamanho | **900 × 900** basta (ela nunca aparece maior que ~178px, e 900 já cobre telas retina com folga) |
| peso | não se preocupe muito — o Astro converte pra webp no build. Só evite subir o arquivo de 8MB direto da câmera |

## Quantas fotos

Hoje são cinco, e **elas ficam sempre numa linha só** — em qualquer
largura de tela. Isso não é um número fixo no CSS: o componente calcula
quanto o conjunto ocupa (somando as escalas e os respiros) e divide a
largura disponível por esse total. Ou seja, **você pode acrescentar ou
tirar uma foto e não precisa ajustar nada** — as outras se acomodam.

As poses (ângulo, altura, tamanho) também ciclam sozinhas por uma lista
de cinco, então a sexta foto reusa a pose da primeira.

O custo de insistir numa linha só é o tamanho: quanto mais fotos, menores
elas ficam. Cinco vão de 132px no desktop a 49px num celular de 320px.
Com sete ou oito já viram selo — se chegar lá, vale deixar quebrar em
duas linhas (é só tirar o `flex-wrap: wrap` do caminho, ele já está lá
como rede de segurança).

## As legendas somem no celular

Abaixo de ~560px de largura de bloco cada foto fica com menos de 100px, e
aí a legenda não cabe mais — sairia cortada com reticências. Nesse ponto
ela some inteira e a aba de baixo encolhe junto. A moldura continua com a
borda inferior mais alta, então ainda lê como polaroid, só sem texto.

É tudo ou nada de propósito: como as fotos têm tamanhos diferentes, medir
uma a uma fazia só a maior mostrar a legenda, sozinha, o que parecia bug.

## Que fotos escolher

A ideia era **não** ser uma foto sua posando. Funciona melhor com coisas
que mostram o entorno: a mesa bagunçada, o gato no teclado, o artesanato
pela metade, um detalhe do ateliê. Uma sua no meio delas, sim — mas como
uma das fotos, não como a foto.
