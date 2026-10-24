# Como editar

Guia para quem sabe o básico de programação. Na maior parte das mudanças **não é preciso mexer em código 3D**: basta editar arquivos de texto (Markdown).

Antes de tudo, rode `npm run dev` e abra `http://localhost:5173/engenharia-reversa/`. Cada vez que você salva um arquivo, a página atualiza sozinha. Se algo estiver errado num capítulo (câmera ou estado com nome errado), aparece um aviso no console do navegador (F12 → Console) dizendo qual arquivo corrigir.

---

## 1. Onde fica cada coisa

| Quero mudar… | Arquivo |
| --- | --- |
| O texto de um capítulo | `src/presentations/engenharia-reversa/conteudo/NN-nome.md` |
| Nome e função das peças (clique na vista explodida) | `src/presentations/engenharia-reversa/cenas/maquina/pecas.js` |
| Estados e câmeras do redutor | `src/presentations/engenharia-reversa/cenas/maquina/estados.js` |
| Cor de destaque da apresentação | `src/presentations/engenharia-reversa/config.js` (`acento`) |
| Cores gerais, fontes, tamanhos de texto | `src/engine/styles/tokens.css` |
| Cores dos climas (estúdio/holofote) | `src/engine/Moods.js` (`CLIMAS`) |
| Lista da página inicial | `src/hub/apresentacoes.js` |
| Roteiro de fala | `engenharia-reversa/roteiro_apresentacao.md` |

---

## 2. Trocar o texto de um capítulo

Abra o `.md` do capítulo. Ele tem duas partes: o **cabeçalho** (entre `---`) e o **corpo**.

```markdown
---
titulo: Do objeto|ao conhecimento
rotulo: 02 · O que é
cena: maquina
estado: fechada
camera: tres-quartos
clima: estudio
layout: esquerda
---

Engenharia reversa é investigar algo que **já existe** para entender como foi feito.
```

- `titulo`: o título grande. O `|` marca onde a linha quebra.
- `rotulo`: a linha pequena acima do título.
- No corpo: `**negrito**`, `*itálico*`. Cada linha vira uma quebra de linha e uma linha em branco separa parágrafos.

**Regra de ouro:** no máximo ~25 palavras visíveis por tela. A TV é lida de longe e quem explica é quem apresenta (use o roteiro).

### Recursos do corpo

```markdown
- item de lista
- outro item

1. **Observar** forma, encaixes, marcas      ← lista numerada (só para sequências de verdade)
2. **Medir** com paquímetro

> Nota pequena, tipo "valores ilustrativos".

Objeto → Análise → Conhecimento              ← fluxo animado da esquerda para a direita
Engenharia reversa: Modelo ← Análise ← Produto   ← fluxo que anima da direita para a esquerda (com rótulo)

[[Desmontar|passo:1]] [[Reconstruir|passo:0]]   ← botões que levam a um passo do capítulo

::: verdade
# Manchete do cartão
Texto do cartão.
:::
```

Os cartões `:::` aceitam os tipos `verdade`, `exagero`, `humano`, `alerta` e `fato`. Para trocar o texto do carimbo, use `::: alerta | Golpe`.

---

## 3. Adicionar, remover e reordenar capítulos

Os capítulos são **todos os `.md` da pasta `conteudo/`, em ordem de nome**.

- **Adicionar**: crie `conteudo/08b-novo.md`, ou renumere os arquivos. Copie o cabeçalho de outro capítulo e ajuste.
- **Remover**: apague o arquivo. Para só esconder, sem apagar, renomeie para começar com `_` (ex.: `_08-onde-e-usado.md`).
- **Reordenar**: renomeie os números (`03-…` vira `05-…`).

Não precisa mexer em código: a barra de progresso, os atalhos e os endereços `#capitulo-NN` se ajustam sozinhos. Lembre de atualizar o número no `rotulo` e o roteiro.

> Testado: criar `13-teste.md` fez o capítulo aparecer como 13/13, e apagar o arquivo fez sumir.

---

## 4. Passos internos (revelar aos poucos)

Separe o corpo com `<!-- passo -->`. Cada passo é uma "parada" a mais: o apresentador aperta → e aparece o próximo pedaço.

```markdown
Primeira parte do texto.

<!-- passo -->
Segunda parte (aparece no próximo clique).
```

Um passo pode mudar o 3D, a câmera ou o clima. Ele herda tudo do anterior e só muda o que você escrever:

```markdown
<!-- passo estado=explodida camera=explodida -->
<!-- passo clima=holofote -->
<!-- passo layout=direita -->
```

Por padrão os passos **somam** (o texto anterior continua na tela). Para cada passo **trocar** o anterior, coloque no cabeçalho:

```yaml
passos-modo: troca
```

---

## 5. Clima, layout e câmera

| Campo | Valores |
| --- | --- |
| `clima` | `estudio` (fundo claro, luz suave) · `holofote` (fundo escuro, luz de museu) |
| `layout` | `esquerda` (texto à esquerda, objeto à direita) · `direita` · `inferior` (texto embaixo, largo) · `topo` · `centro` |
| `destaque` | `sim` deixa o título enorme (abertura/final) |
| `cena` | nome da cena 3D (`maquina`) |
| `estado` | estado da cena (veja abaixo) |
| `camera` | nome da câmera (veja abaixo) |

**Estados do redutor** (`cenas/maquina/estados.js`): `fechada`, `girando`, `cotada`, `parcial`, `digital`, `digital-meio`, `explodida`, `explodida-limpa`, `cortada`, `medida`, `modelo`, `engrenagem`, `duvidas`, `incerteza`, `placa`, `placa-fundo`.

**Câmeras**: `escuro`, `abertura-perto`, `tres-quartos`, `tres-quartos-perto`, `vista-geral`, `distante`, `vista-esquerda`, `alta`, `perfil-holofote`, `explodida`, `corte`, `engrenagem`, `engrenagem-modelo`, `engrenagem-caso`, `traseira`, `traseira-perto`, `ia`, `final-holofote`, `final`.

### Criar uma câmera nova

Em `estados.js`, acrescente uma linha em `CAMERAS`:

```js
'minha-camera': { pos: [5, 3, 8], alvo: [0.2, 1.5, 0], fov: 30 },
```

`pos` é onde a câmera está (x, y, z), `alvo` é para onde ela olha e `fov` é a abertura (menor = mais zoom). O objeto fica no centro do chão e os eixos do redutor ficam a ~1,5 de altura. O motor desloca o enquadramento sozinho de acordo com o layout, então você não precisa compensar o texto.

Dica para achar números bons: no `npm run dev`, abra o console (F12) e digite `apresentacao.stage.camera.position` numa parada parecida com o que você quer.

### Criar um estado novo

Um estado é uma lista de números de 0 a 1. Em `estados.js`, em `ESTADOS`:

```js
'meio-aberta': { explodir: 0.5, baloes: 1 },
```

O motor faz a transição suave entre os estados conforme a rolagem.

---

## 6. Cor de destaque e fontes

- **Cor de destaque**: em `config.js`, `acento: '#e4572e'`. Ela muda a linha do rótulo, a barra de progresso, os fluxos e a engrenagem 3D.
- **Cores gerais, tamanhos e espaçamentos**: em `src/engine/styles/tokens.css`. Os tamanhos usam a unidade `--u` (1% da altura de uma tela 16:9), então ficam proporcionais em qualquer TV.
- **Fontes**: o projeto usa Instrument Serif (títulos) e Instrument Sans (texto), instaladas via `@fontsource` (funcionam offline). Para trocar:
  1. `npm install @fontsource/NOME-DA-FONTE`
  2. Em `tokens.css`, troque os `@import` e as variáveis `--fonte-display` e `--fonte-texto`.

---

## 7. Criar uma nova apresentação com o template

Exemplo para `minha-apresentacao`:

1. **Página**: copie `engenharia-reversa/index.html` para `minha-apresentacao/index.html` e troque o `<title>` e o caminho do script:
   ```html
   <script type="module" src="../src/presentations/minha-apresentacao/main.js"></script>
   ```
   (O build encontra a pasta sozinho: toda pasta da raiz com `index.html` vira uma página.)
2. **Código**: crie `src/presentations/minha-apresentacao/` com:
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
     // opcional: climas: { estudio: { fundo: '#e9e6e1' }, holofote: { spot: 9 } },
     // opcional: ilustracao: '<svg>…</svg>'  (desenho mostrado se o PC não tiver WebGL)
   };
   ```
3. **Conteúdo**: crie `conteudo/01-abertura.md` etc.
4. **Página inicial**: acrescente um item em `src/hub/apresentacoes.js`.
5. `npm run build:arquivo` também gera `dist-arquivo/minha-apresentacao.html`.

---

## 8. Criar uma cena 3D nova (contrato de cena)

Uma cena é uma função que recebe o "contexto" do motor e devolve um objeto com regras fixas.

**Recebe** `{ stage, THREE, gsap, annotations, materiais, globais, acento, reduzido }`:
- `stage.scene`, `stage.camera`, `stage.renderer`, `stage.tamanho` (largura/altura)
- `materiais.ceramica()`, `.aluminio()`, `.aco()`, `.anodizado()`, `.borracha()`, `.acento(cor)`… (cada chamada cria um material novo)
- `annotations.balao({...})`, `annotations.cota({...})`, `annotations.rotulo({...})`: desenho técnico projetado do 3D

**Devolve:**

| Campo | Obrigatório | Para quê |
| --- | --- | --- |
| `group` | sim | `THREE.Group` com tudo da cena (o motor coloca na cena) |
| `defaults` | sim | valores padrão dos parâmetros (números) |
| `states` | sim | `{ nomeDoEstado: { parametro: valor } }` |
| `cameras` | sim | `{ nome: { pos, alvo, fov } }` |
| `cameraPadrao` | não | nome da câmera usada se o capítulo não disser |
| `apply(params)` | sim | chamado **todo quadro** com os parâmetros já interpolados pela rolagem (inclui `presenca`: 1 quando a cena está ativa, 0 quando não) |
| `update(dt, tempo)` | não | animações contínuas (ex.: girar) |
| `onPointer(tipo, raycaster)` | não | `'move'` / `'click'`; devolva `true` se o ponteiro está sobre algo clicável |
| `onStop(parada)` | não | avisado quando muda a parada |
| `action(nome)` | não | chamado por botões `[[Texto|acao:nome]]` no Markdown |
| `reset()` | não | tecla R / Esc |
| `dispose()` | não | liberar memória |

**Regra importante:** o visual deve ser **função dos parâmetros** recebidos em `apply`. Não acumule animações por conta própria. Assim, voltar ou pular capítulos sempre reconstrói a mesma imagem.

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
    defaults: { giro: 0, altura: 0, velocidade: 0 },
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

E no `.md`: `cena: minha-cena`, `estado: erguido`, `camera: perto`.

### Anotações (desenho técnico)

```js
const ponto = new THREE.Vector3();
annotations.cota({
  de: () => ponto.set(-1, 2, 1),          // pontos 3D (no mundo)
  ate: () => ponto2.set(1, 2, 1),
  texto: '40 mm',
  deslocamento: -4,                       // afastamento da linha (em "u")
  visivel: () => P.cotas * P.presenca,    // 0..1 vindo dos parâmetros: desenha e apaga junto com a rolagem
});
annotations.rotulo({ ancora: () => …, texto: 'Rolamento', direcao: [1, -1], visivel: () => … });
annotations.balao({ numero: 3, ancora: () => …, direcao: [0, -1], visivel: () => … });
```

---

## 9. Peças do redutor (vista explodida)

Em `cenas/maquina/pecas.js`, cada peça tem `nome`, `funcao`, `nota` e `balao` (direção da linha do número na tela). Pode editar os textos à vontade. Só **não mude o `id`**.

## 10. Conferir antes de apresentar

1. `npm run build`: precisa terminar sem erro.
2. `npm run apresentar` e passe por todos os capítulos com o passador (PageDown/PageUp).
3. Gere o arquivo único (`npm run build:arquivo`) e teste o duplo clique no PC da TV.
