# site-sobram-astro

Migração técnica do site institucional da SOBAM para Astro, preservando ao máximo a versão original em conteúdo, estrutura, imagens, estilos e comportamento visual.

## Objetivo

O projeto foi ajustado para rodar com Astro sem reinterpretar o design original. A prioridade é manter a fidelidade visual e de conteúdo, fazendo apenas as adaptações técnicas necessárias para build, organização e publicação.

## Stack

- Astro
- HTML original preservado como base da página
- CSS original preservado
- JavaScript original preservado
- Tailwind via CDN, conforme a implementação original
- EmailJS para envio do formulário
- Google Tag Manager para rastreamento

## Estrutura

- `src/pages/index.astro`: entrada principal em Astro, mantendo a marcação original do site
- `public/images`: imagens originais publicadas para servir os mesmos caminhos usados no site-base
- `public/styles.css`: estilos originais
- `public/script.js`: scripts principais originais
- `public/auto-carousel.js`: script original do carrossel

## Desenvolvimento

Instalação:

```bash
npm install
```

Ambiente local:

```bash
npm run dev
```

Build de produção:

```bash
npm run build
```

Preview local do build:

```bash
npm run preview
```

## Diretriz do projeto

Esta base deve ser tratada como uma migração fiel de tecnologia. Mudanças de layout, tipografia, conteúdo, imagens, hierarquia visual ou identidade do site não fazem parte do escopo, salvo quando forem estritamente necessárias para corrigir problemas técnicos.
