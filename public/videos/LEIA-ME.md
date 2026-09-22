# Vídeos

**Coloque os arquivos aqui.** Esta pasta é `public/`, então o Astro copia
tudo como está — não processa, não otimiza, não redimensiona. O que você
colocar aqui é exatamente o que vai pro ar, então o arquivo precisa já
chegar pronto.

(Imagem é diferente: aquelas vão em `src/assets/` e o Astro otimiza
sozinho. Vídeo, não — por isso a pasta separada.)

## Como ligar no código

Em `src/data/projects.ts`, no `study.hero` do projeto:

```ts
hero: {
  image: petmatchImg,        // vira o poster do vídeo
  bg: '#f0eee6',
  fit: 'cover',
  video: {
    mp4: '/videos/petmatch.mp4',
    webm: '/videos/petmatch.webm',   // opcional
  },
},
```

Só isso. O vídeo entra no lugar da imagem grande, toca em loop, sem som,
e **só começa a baixar quando chega perto da tela** — quem nunca rolar
até lá não paga por ele.

## Especificações

| | |
| --- | --- |
| formato | **MP4 (H.264)** sempre — é o que toca em tudo |
| formato extra | **WebM (VP9)** opcional, costuma ficar 30–50% menor |
| largura | 1440px basta (ele nunca aparece maior que ~1240) |
| duração | 8 a 15 segundos, pensando em loop |
| áudio | **nenhum** — a faixa de áudio só engorda o arquivo, e autoplay só funciona mudo |
| peso | mire em **menos de 2MB**, o ideal é menos de 1MB |

**Não use GIF.** Um GIF de 10s pesa uns 15MB e fica feio; o mesmo trecho
em MP4 dá menos de 1MB.

## Convertendo uma gravação de tela

Se tiver ffmpeg instalado:

```bash
# MP4 — o obrigatório
ffmpeg -i gravacao.mov -an -vf "scale=1440:-2,fps=30" \
  -c:v libx264 -crf 26 -preset slow -movflags +faststart petmatch.mp4

# WebM — o opcional, menor
ffmpeg -i gravacao.mov -an -vf "scale=1440:-2,fps=30" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 petmatch.webm
```

`-an` remove o áudio. `-crf` controla a qualidade: número maior = arquivo
menor e mais artefato. Se 26 ficar borrado no seu vídeo, tente 23.

Sem ffmpeg, o Handbrake resolve com preset "Web > Gmail Medium 5 Minutes
720p30" e a caixa de áudio desmarcada.
