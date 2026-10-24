# Semana de TI · Sala IA vs Humanos

Apresentações 3D animadas, em português, feitas para rodar numa TV grande, **sem internet**.

- **Engenharia reversa** (de software): pronta (11 capítulos, 47 paradas, ~19 min de fala).
- **Redes neurais**: em preparação (vai usar o mesmo motor).

Tudo roda no navegador (Chrome ou Edge). O 3D é feito com Three.js, as animações com GSAP e a rolagem suave com Lenis. Não depende de nenhum site externo: fontes e bibliotecas vão junto no build.

---

## Requisitos

- **Node.js 18 ou mais novo** (testado com Node 24) e npm.
- Chrome ou Edge atualizado. Placa de vídeo comum já basta. Num PC fraco, use a qualidade "Baixa" (tecla `Q`).

## Comandos

```bash
npm install          # uma vez só (precisa de internet nessa hora)
npm run dev          # modo de edição: abre em http://localhost:5173 e recarrega ao salvar
npm run build        # gera a versão final em dist/
npm run apresentar   # build + abre a versão final em http://localhost:4173 (use este no dia)
npm run build:arquivo  # gera dist-arquivo/engenharia-reversa.html (um arquivo só, duplo clique)
```

## Como abrir no PC da TV (offline)

Escolha **uma** das opções, da mais simples para a mais completa:

1. **Duplo clique (sem instalar nada)**: rode `npm run build:arquivo` no seu computador e copie `dist-arquivo/engenharia-reversa.html` para um pendrive. No PC da TV, dê duplo clique no arquivo, que abre direto no navegador. O arquivo (~1,1 MB) já leva fontes, 3D e conteúdo. Testado via `file://` no Chrome.
2. **Pasta `dist/` + servidor local**: copie o projeto inteiro (com `node_modules`) e rode `npm run apresentar`. Abre `http://localhost:4173`, com a página inicial para escolher a apresentação.
3. **Pasta `dist/` em qualquer servidor estático**: os caminhos são relativos, então funciona em qualquer pasta (`npx serve dist`, `python -m http.server` dentro de `dist/` etc.).

Dica: aperte `F` para tela cheia e confira o som e o brilho da TV antes de começar.

## Atalhos durante a apresentação

| Tecla | O que faz |
| --- | --- |
| `→` `↓` `Espaço` `PageDown` | próxima parada |
| `←` `↑` `PageUp` | parada anterior |
| `Home` / `End` | início / fim |
| `F` | tela cheia |
| `Q` | qualidade gráfica: Alta → Média → Baixa |
| `R` | recentraliza a câmera |
| `H` | mostra os atalhos |
| `Esc` | fecha a ajuda |

- **Passador de slides** (aquele controle com laser) manda PageUp/PageDown: funciona direto.
- Rolar com mouse ou touchpad também funciona. Quando você para no meio do caminho, a página desliza sozinha até a parada mais próxima.
- Cada capítulo tem um endereço: `.../engenharia-reversa/#capitulo-05` abre direto no capítulo 5.
- **Nada na tela é clicável.** Cada clique do passador faz uma animação que ilustra uma ideia (uma passada para cada explicação). O roteiro diz o que falar em cada uma.

## Se der problema

- **Travando ou lento?** Aperte `Q` até "Baixa". O sistema também baixa sozinho um nível se o FPS ficar baixo por alguns segundos, e a escolha fica salva no navegador.
- **Tela preta ou sem 3D?** O texto continua funcionando com um desenho estático no lugar do 3D. Atualize os drivers de vídeo ou teste em outro navegador.
- **Câmera "fora do lugar" depois de mexer o mouse?** Aperte `R`.
- **Fonte esquisita?** Use o build (`npm run apresentar` ou o arquivo único), que já leva as fontes.
- **Mudou um texto e não apareceu?** No `npm run dev` atualiza sozinho. No arquivo único, gere de novo com `npm run build:arquivo`.
- Movimento reduzido: se o sistema operacional estiver com "reduzir animações" ligado, a apresentação troca os movimentos de câmera por cortes suaves.

## Estrutura

```
index.html                      página inicial (escolher apresentação)
engenharia-reversa/
  index.html                    página da apresentação
  roteiro_apresentacao.md       roteiro de fala
  referencias.md                fontes
src/
  engine/                       MOTOR (serve para qualquer apresentação)
    index.js                    liga tudo: conteúdo, 3D, navegação, interface
    Stage.js                    renderer, luz de estúdio, chão com sombra, qualidade
    Moods.js                    climas "estúdio" e "holofote"
    Director.js                 câmera contínua, enquadramento e parâmetros por rolagem
    Navigation.js               rolagem + teclado + passador + endereço (#capitulo-NN)
    Chapters.js / markdown.js   lê os .md e anima os textos
    Annotations.js              balões, cotas e rótulos de desenho técnico
    materials.js                materiais (cerâmica, alumínio, anodizado, superfícies impressas)
    ui/                         progresso, ajuda, avisos
    styles/                     tokens.css (cores, fontes, tamanhos), base.css, layouts.css
  presentations/
    engenharia-reversa/
      config.js                 título, cor de destaque, cenas
      conteudo/*.md             UM ARQUIVO POR CAPÍTULO (é aqui que se edita o texto)
      cenas/software/           o executável, o app e o servidor (estados, câmeras, texturas, exemplo de código)
  hub/                          página inicial
scripts/build-arquivo.mjs       gera a versão de arquivo único
```

Para editar textos, capítulos, cores ou criar uma apresentação nova, leia **[COMO_EDITAR.md](COMO_EDITAR.md)**.
