# Como editar

Guia para quem sabe o básico de programação. Na maior parte das mudanças **não é preciso mexer em código 3D**: basta editar arquivos de texto (Markdown).

Antes de tudo, rode `npm run dev` e abra `http://localhost:5173/engenharia-reversa/`. Cada vez que você salva um arquivo, a página atualiza sozinha. Se algo estiver errado num capítulo (câmera ou estado com nome errado), aparece um aviso no console do navegador (F12 → Console) dizendo qual arquivo corrigir.

## A regra da apresentação

- **Nada na tela é clicável.** A única interação é navegar: setas, passador (PageUp/PageDown), Espaço, rolagem.
- **Uma passada para cada explicação.** Cada parada (capítulo ou passo interno) faz **uma** mudança animada que ilustra **uma** ideia que o apresentador está falando. Use de 2 a 5 passos por capítulo.
- Voltar sempre restaura o estado anterior, porque tudo é calculado a partir da posição na apresentação.

---

## 1. Onde fica cada coisa

| Quero mudar… | Arquivo |
| --- | --- |
| O texto de um capítulo | `src/presentations/engenharia-reversa/conteudo/NN-nome.md` |
| Estados (o que o 3D mostra) e câmeras | `src/presentations/engenharia-reversa/cenas/software/estados.js` |
| O exemplo de código (C, bytes, assembly, pseudocódigo) | `src/presentations/engenharia-reversa/cenas/software/exemplo.js` |
| As texturas (tela do app, camadas, cartões da API) | `src/presentations/engenharia-reversa/cenas/software/texturas.js` |
| Cor de destaque da apresentação | `src/presentations/engenharia-reversa/config.js` (`acento`) |
| Cores gerais, fontes, tamanhos de texto | `src/engine/styles/tokens.css` |
| Cores dos climas (estúdio/holofote) | `src/engine/Moods.js` (`CLIMAS`) |
| Lista da página inicial | `src/hub/apresentacoes.js` |
| Roteiro de fala | `engenharia-reversa/roteiro_apresentacao.md` |

---

## 2. Trocar o texto de um capítulo

Abra o `.md` do capítulo. Ele tem o **cabeçalho** (entre `---`) e o **corpo**.

```markdown
---
titulo: Estudar o que|já existe
rotulo: 02 · O que é
estado: celular-apagado
camera: celular
clima: estudio
layout: direita
---

Engenharia reversa de software é estudar um programa pronto para entender **como ele funciona**.
```

- `titulo`: o título grande. O `|` marca onde a linha quebra.
- `rotulo`: a linha pequena acima do título.
- No corpo: `**negrito**`, `*itálico*`. Cada linha vira uma quebra de linha e uma linha em branco separa parágrafos.

**Regra de ouro:** no máximo ~25 palavras visíveis por tela. Quem explica é quem apresenta (use o roteiro).

### Recursos do corpo

```markdown
- item de lista
1. **Interface** o que o usuário vê            ← lista numerada (só para sequências)
> Nota pequena, tipo "exemplo simplificado".
Código-fonte → Compilador → Executável         ← fluxo animado da esquerda para a direita
Engenharia reversa: Pistas ← Análise ← Executável   ← fluxo que anima da direita para a esquerda (com rótulo)

::: verdade
# Manchete do cartão
Texto do cartão.
:::
```

Os cartões `:::` aceitam os tipos `verdade`, `exagero`, `humano`, `alerta` e `fato`. Para trocar o texto do carimbo, use `::: alerta | Golpe`.

---

## 3. Adicionar, remover e reordenar capítulos

Os capítulos são **todos os `.md` da pasta `conteudo/`, em ordem de nome**.

- **Adicionar**: crie, por exemplo, `conteudo/08b-novo.md`. Copie o cabeçalho de outro capítulo.
- **Remover**: apague o arquivo. Para só esconder, renomeie para começar com `_` (ex.: `_08-onde-e-usado.md`).
- **Reordenar**: renomeie os números.

A barra de progresso, os atalhos e os endereços `#capitulo-NN` se ajustam sozinhos. Lembre de atualizar o `rotulo` e o roteiro.

---

## 4. Passos = batidas de animação

Separe o corpo com `<!-- passo -->`. **Cada passo é um clique do apresentador e uma animação na tela.** Um passo pode mudar o texto, o estado do 3D, a câmera, o clima ou o layout. Ele herda tudo do anterior e só muda o que você escrever:

```markdown
<!-- passo estado=fatia-2 camera=fatia-2 -->
**Assembly**: as mesmas instruções, uma por linha.
```

Quando o apresentador aperta →, o motor anima suavemente do estado anterior para o novo (a fatia desliza para fora, a câmera viaja) e o texto do passo entra.

### Exemplo: acrescentar uma batida nova

Quero que, no capítulo 5, depois do pseudocódigo, a câmera mostre o bloco inteiro de longe antes da lógica:

```markdown
<!-- passo estado=fatia-3 camera=fatia-3 -->
**Pseudocódigo**: o que um descompilador reconstrói.

<!-- passo camera=bloco-estudio -->
Cada fatia é uma pista diferente.

<!-- passo estado=fatia-4 camera=fatia-4 -->
**Lógica entendida**: a conclusão é de quem investiga.
```

Pronto: mais uma parada, sem tocar em código. Lembre de pôr a frase no roteiro.

Por padrão, o texto dos passos **soma** (o anterior continua na tela). Para cada passo **trocar** o anterior, coloque no cabeçalho `passos-modo: troca`.

---

## 5. Clima, layout, estado e câmera

| Campo | Valores |
| --- | --- |
| `clima` | `estudio` (fundo claro) · `holofote` (fundo escuro, luz de museu, que segue o ponto para onde a câmera olha) |
| `layout` | `esquerda` (texto à esquerda, objeto à direita) · `direita` · `inferior` (texto embaixo) · `rodape` (título longo embaixo, objeto em cima) · `painel` (texto estreito à direita, painel da cena à esquerda) · `topo` · `centro` |
| `destaque` | `sim` deixa o título enorme (abertura) |
| `estado` | o que o 3D mostra (lista abaixo) |
| `camera` | de onde se vê (lista abaixo) |

**Tema claro/escuro (tecla `D`).** O apresentador pode apertar **`D`** a qualquer momento, e o palco inteiro troca entre claro e escuro (a escolha fica salva no navegador). É implementado em `Moods.js` (`CLIMAS['estudio-escuro']` + `setTema`): o tema escuro se mistura com o clima do capítulo, então nenhum `.md` precisa declarar nada.

**Estados** (`cenas/software/estados.js`):
- executável: `selado`, `selado-rotulo`, `fonte`, `compilado`, `volta`, `volta-pistas`, `fatia-1` … `fatia-4`, `pistas`;
- app: `celular-apagado`, `celular-ligado`, `celular-duvida`, `camada-1` … `camada-5`, `camadas-todas`;
- API: `api-inicio`, `api-trafego`, `api-requisicao`, `api-resposta`, `api-doc`;
- outros: `ferr-devtools`, `ferr-rede`, `ferr-ghidra`, `ferr-apk`, `uso-malware`, `geral`, `ia`, `ia-pseudo`, `final-junto`.

**Câmeras**: `bloco-escuro`, `bloco-perto`, `bloco-estudio`, `celular`, `celular-perto`, `celular-lado`, `celular-alto`, `camadas-inicio`, `camadas`, `camadas-fundo`, `camadas-geral`, `compilar`, `volta`, `fatia-0` … `fatia-4`, `api`, `api-perto`, `api-doc`, `api-longe`, `geral`, `ia-a` … `ia-d`, `final-holofote`, `final`.

### Criar um estado novo

Um estado é uma lista de números. Em `estados.js`, em `ESTADOS`:

```js
'meio-aberto': { tela: 1, camadas: 2.5, rotulosCamadas: 1 },
```

Os números possíveis estão comentados em `PADRAO`, no topo do arquivo. Exemplos: `camadas` de 0 a 5 (cada número tira a camada seguinte da tela do celular, grande e de frente; a anterior volta para dentro), `leque: 1` (abre todas lado a lado), `fatias` de 0 a 4, `exposicao: 1` (o bloco vira uma fileira de placas).

### Criar uma câmera nova

Em `CAMERAS`:

```js
'minha-camera': { pos: [5, 3, 8], alvo: [0.2, 0.8, 0], fov: 30 },
```

`pos` é onde a câmera está, `alvo` é para onde ela olha e `fov` é a abertura (menor = mais zoom). O executável fica em x = 0, o celular em x ≈ -7,2 e o servidor em x ≈ -10,2 (bem separados, para cada capítulo enquadrar um personagem só). O motor desloca o enquadramento sozinho conforme o layout. Para achar números bons: no `npm run dev`, abra o console (F12) e digite `apresentacao.stage.camera.position`.

---

### Legibilidade (já resolvida pelo motor)

- Atrás da coluna de texto há um **véu** suave na cor do fundo: se um objeto escuro passar por trás, o texto continua legível.
- Rótulos do 3D têm contorno na cor do fundo.
- Em telas mais estreitas que 16:9, a câmera abre a lente para não cortar as laterais.
- Mesmo assim, ao criar câmeras, prefira deixar o objeto do lado oposto ao texto.

## 6. Cor de destaque e fontes

- **Cor de destaque**: `acento` em `config.js`.
- **Cores, tamanhos, espaçamentos**: `src/engine/styles/tokens.css`. Os tamanhos usam a unidade `--u` (1% da altura de uma tela 16:9), proporcional em qualquer TV.
- **Fontes**: Instrument Serif (títulos) e Instrument Sans (texto), via `@fontsource` (funcionam offline). Para trocar: `npm install @fontsource/NOME`, depois troque os `@import` e as variáveis `--fonte-display` e `--fonte-texto` em `tokens.css`.

---

## 7. Criar uma nova apresentação com o template

1. **Página**: copie `engenharia-reversa/index.html` para `minha-apresentacao/index.html` e troque o `<title>` e o caminho do script (`../src/presentations/minha-apresentacao/main.js`). O build encontra a pasta sozinho.
2. **Código**: crie `src/presentations/minha-apresentacao/`:
   ```js
   // main.js
   import { iniciarApresentacao } from '../../engine/index.js';
   import config from './config.js';
   iniciarApresentacao(config);
   ```
   ```js
   // config.js
   import { criarCena } from './cenas/minha-cena.js';
   export default {
     titulo: 'Minha apresentação · Semana de TI',
     acento: '#2f4fd8',
     climaPadrao: 'estudio',
     cenaPadrao: 'minha-cena',
     conteudo: import.meta.glob('./conteudo/*.md', { query: '?raw', import: 'default', eager: true }),
     cenas: { 'minha-cena': criarCena },
     // opcional: climas: { estudio: { fundo: '#e9e6e1' } }, ilustracao: '<svg>…</svg>' (se não houver WebGL)
   };
   ```
3. **Conteúdo**: `conteudo/01-abertura.md` etc.
4. **Página inicial**: um item em `src/hub/apresentacoes.js`.
5. `npm run build:arquivo` também gera `dist-arquivo/minha-apresentacao.html`.

---

## 8. Criar uma cena 3D nova (contrato de cena)

Uma cena é uma função que recebe o contexto do motor e devolve um objeto com regras fixas.

**Recebe** `{ stage, THREE, gsap, annotations, materiais, globais, acento, reduzido }`:
- `stage.scene`, `stage.camera`, `stage.renderer`, `stage.tamanho` (largura/altura);
- `materiais.ceramica()`, `.ceramicaCinza()`, `.aluminio()`, `.aco()`, `.anodizado()`, `.borracha()`, `.acento(cor)`, `.vidro()`, `.impresso(textura)` (cada chamada cria um material novo);
- `annotations.rotulo({...})`, `annotations.cota({...})`, `annotations.balao({...})`: desenho técnico projetado do 3D.

**Devolve:**

| Campo | Obrigatório | Para quê |
| --- | --- | --- |
| `group` | sim | `THREE.Group` com tudo da cena |
| `defaults` | sim | valores padrão dos parâmetros (números) |
| `states` | sim | `{ nomeDoEstado: { parametro: valor } }` |
| `cameras` | sim | `{ nome: { pos, alvo, fov } }` |
| `cameraPadrao` | não | câmera usada se o capítulo não disser |
| `apply(params)` | sim | chamado **todo quadro** com os parâmetros já interpolados (inclui `presenca`: 1 quando a cena está ativa) |
| `update(dt, tempo)` | não | animações contínuas (ex.: contas correndo no cabo) |
| `onStop(parada)` | não | avisado quando muda a parada. `parada.attrs` traz todos os campos do cabeçalho e dos `<!-- passo ... -->` (herdados), útil para configurações próprias, como a demo de redes neurais |
| `reset()` | não | tecla R |
| `dispose()` | não | liberar memória |

**Regra importante:** o visual deve ser **função dos parâmetros** recebidos em `apply`. Não guarde animações acumuladas. Assim voltar ou pular capítulos sempre reconstrói a mesma imagem. Se a cena usar materiais que ficam transparentes no meio da apresentação, renderize essa variante uma vez no início, para não travar na primeira vez.

### Exemplo mínimo que funciona

```js
// src/presentations/minha-apresentacao/cenas/minha-cena.js
export function criarCena({ THREE, materiais }) {
  const group = new THREE.Group();
  const cubo = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), materiais.ceramica());
  cubo.position.y = 1;
  cubo.castShadow = true;
  group.add(cubo);

  let velocidade = 0;
  return {
    group,
    defaults: { altura: 0, velocidade: 0 },
    states: {
      parado: {},
      erguido: { altura: 1 },
      girando: { velocidade: 1 },
    },
    cameras: {
      geral: { pos: [6, 4, 8], alvo: [0, 1, 0], fov: 30 },
      perto: { pos: [4.5, 3, 6], alvo: [0, 1.4, 0], fov: 30 },
    },
    cameraPadrao: 'geral',
    apply(p) {
      group.visible = p.presenca > 0.01;
      cubo.position.y = 1 + p.altura;
      velocidade = p.velocidade;
    },
    update(dt) {
      cubo.rotation.y += dt * velocidade;
    },
    dispose() {
      cubo.geometry.dispose();
      cubo.material.dispose();
    },
  };
}
```

E no `.md`: `cena: minha-cena`, `estado: erguido`, `camera: perto`. Cada `<!-- passo estado=girando -->` vira uma batida animada.

### Anotações (desenho técnico)

```js
annotations.rotulo({
  ancora: () => pontoNoMundo,             // função que devolve um THREE.Vector3
  texto: 'preco virou param_1',
  direcao: [1, -1],                       // para onde vai a linha na tela
  visivel: () => P.pistas * P.presenca,   // 0..1 vindo dos parâmetros: desenha e apaga junto com a navegação
});
```

---

## 9. Redes neurais: mexer na demo ao vivo

A demo (capítulo 6) é uma rede neural **de verdade** treinando no navegador. Ela é configurada **no próprio `.md`** (`conteudo/06-demo.md`), passo a passo, sem tocar em código:

```markdown
---
demo-dados: espiral        # conjunto inicial
demo-treinar: nao          # no 1º passo só mostra os pontos
demo-ocultas: 1
demo-neuronios: 2
---

<!-- passo demo-treinar=sim -->
**2 neurônios**: poucos demais.

<!-- passo demo-neuronios=8 -->
**8 neurônios**: a fronteira começa a curvar.
```

| Atributo | Valores |
| --- | --- |
| `demo-dados` | `espiral`, `circulos`, `xor`, `grupos` · vários separados por vírgula = montagem (ex.: `circulos,xor`) |
| `demo-ocultas` | camadas ocultas, de 1 a 12 (a faixa alta existe para mostrar que fundo demais, sem técnica, encalha) |
| `demo-neuronios` | neurônios por camada oculta, de 1 a 8 |
| `demo-taxa` | taxa de aprendizado (padrão 0,03) |
| `demo-epocas` | até quantas épocas treinar (padrão 400) |
| `demo-treinar` | `nao` só mostra os pontos |
| `demo-semente` | número da "sorte" fixa (padrão 3). Mude se quiser outro resultado, sempre repetível |

Cada passo **recomeça o treino do zero com a mesma semente**: voltar e avançar dá exatamente o mesmo resultado. Antes de apresentar, ensaie e anote os números no roteiro.

Outros arquivos da demo (para quem quiser ler o código):
- `demo/mlp.js`: a rede (passo para frente, retropropagação, ajuste dos pesos), comentada em português.
- `demo/dados.js`: como cada conjunto de pontos é gerado.
- `demo/demo.js` e `demo/demo.css`: o painel (mapa, números, gráfico do erro) e as cores terracota/cobalto.

Os exemplos de aplicação do capítulo 9 (o que entra e o que sai da rede) ficam em `cenas/redes/exemplo.js` (`APLICACOES`).

## 10. Conferir antes de apresentar

1. `npm run build` precisa terminar sem erro.
2. `npm run apresentar` e passe por todas as paradas com o passador (PageDown/PageUp).
3. Gere o arquivo único (`npm run build:arquivo`) e teste o duplo clique no PC da TV.
