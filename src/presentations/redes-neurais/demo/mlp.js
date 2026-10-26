// Uma rede neural de verdade, pequena, em JavaScript puro (sem bibliotecas).
// É um MLP ("perceptron de múltiplas camadas"):
//   2 entradas (x, y do ponto) → 1 a 12 camadas ocultas → 1 saída (probabilidade de ser "azul").
// Aprende com descida do gradiente em mini-lotes (SGD com momento) e retropropagação.
// Gerador de números pseudoaleatórios com semente (mulberry32).
// Mesma semente = mesmos números = a demo se comporta igual toda vez.
export function aleatorio(semente = 1) {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const sigmoide = (z) => 1 / (1 + Math.exp(-z));
// Tanh (padrão da demo) vs ReLU vazada. Em redes fundas (8+ camadas) a tanh
// satura, o gradiente morre no caminho de volta e a rede para de aprender.
const relu = (z) => (z > 0 ? z : z * 0.01);
const derivada = { tanh: (a) => 1 - a * a, relu: (a) => (a > 0 ? 1 : 0.01) };

export class MLP {
  /**
   * @param {number[]} tamanhos ex.: [2, 8, 8, 1]
   * @param {object} op { semente, taxa (taxa de aprendizado), momento, ativ ('tanh' | 'relu') }
   */
  constructor(tamanhos, { semente = 1, taxa = 0.05, momento = 0.9, escala = 2, ativ = 'tanh' } = {}) {
    this.tamanhos = tamanhos;
    this.escala = escala; // as entradas (entre -1 e 1) são multiplicadas por isto: ajuda a desenhar curvas
    this.taxa = taxa;
    this.momento = momento;
    this.derivAtiv = derivada[ativ] ?? derivada.tanh; // derivada em função da saída ativa
    const rnd = aleatorio(semente);
    this.ativFn = ativ === 'relu' ? relu : Math.tanh; // ativação das camadas ocultas
    this.W = []; // pesos: W[l][j * entradas + i] liga o neurônio i (camada l) ao j (camada l+1)
    this.b = []; // vieses (bias)
    this.vW = []; // "velocidade" do momento
    this.vb = [];
    for (let l = 0; l < tamanhos.length - 1; l++) {
      const nIn = tamanhos[l];
      const nOut = tamanhos[l + 1];
      const lim = Math.sqrt(6 / (nIn + nOut)) * (ativ === 'relu' ? 2 * Math.sqrt(2) : 1); // Xavier p/ tanh, He p/ relu
      const w = new Float64Array(nIn * nOut);
      for (let k = 0; k < w.length; k++) w[k] = (rnd() * 2 - 1) * lim;
      this.W.push(w);
      this.b.push(new Float64Array(nOut));
      this.vW.push(new Float64Array(nIn * nOut));
      this.vb.push(new Float64Array(nOut));
    }
    // memória para o passo para frente / para trás
    this.a = tamanhos.map((n) => new Float64Array(n));
    this.d = tamanhos.map((n) => new Float64Array(n));
    this.gW = this.W.map((w) => new Float64Array(w.length));
    this.gb = this.b.map((b) => new Float64Array(b.length));
  }

  // PASSO PARA FRENTE: o sinal entra, passa pelas camadas e sai como probabilidade
  prever(x, y) {
    const a = this.a;
    a[0][0] = x * this.escala;
    a[0][1] = y * this.escala;
    const L = this.W.length;
    for (let l = 0; l < L; l++) {
      const nIn = this.tamanhos[l];
      const nOut = this.tamanhos[l + 1];
      const w = this.W[l];
      for (let j = 0; j < nOut; j++) {
        let z = this.b[l][j]; // soma ponderada: Σ (peso × entrada) + viés
        for (let i = 0; i < nIn; i++) z += w[j * nIn + i] * a[l][i];
        // ativação: tanh nas ocultas, sigmoide na saída
        a[l + 1][j] = l === L - 1 ? sigmoide(z) : this.ativFn(z);
      }
    }
    return a[L][0];
  }

  // Treina um mini-lote (índices dos exemplos). Devolve o erro médio do lote.
  treinarLote(pontos, indices) {
    const L = this.W.length;
    for (const g of this.gW) g.fill(0);
    for (const g of this.gb) g.fill(0);
    let erro = 0;
    for (const k of indices) {
      const p = pontos[k];
      const saida = this.prever(p.x, p.y);
      const alvo = p.classe;
      // erro = entropia cruzada: grande quando a rede tem certeza e está errada
      erro += -(alvo * Math.log(saida + 1e-9) + (1 - alvo) * Math.log(1 - saida + 1e-9));
      // RETROPROPAGAÇÃO: o erro volta da saída para a entrada, camada por camada
      this.d[L][0] = saida - alvo;
      for (let l = L - 1; l >= 0; l--) {
        const nIn = this.tamanhos[l];
        const nOut = this.tamanhos[l + 1];
        const w = this.W[l];
        for (let j = 0; j < nOut; j++) {
          const dj = this.d[l + 1][j];
          this.gb[l][j] += dj;
          for (let i = 0; i < nIn; i++) this.gW[l][j * nIn + i] += dj * this.a[l][i];
        }
        if (l > 0) {
          for (let i = 0; i < nIn; i++) {
            let s = 0;
            for (let j = 0; j < nOut; j++) s += w[j * nIn + i] * this.d[l + 1][j];
            const ai = this.a[l][i];
            this.d[l][i] = s * this.derivAtiv(ai); // derivada da ativação
          }
        }
      }
    }
    // AJUSTE DOS PESOS: um passinho contra o gradiente (com momento, para não ziguezaguear)
    const n = indices.length;
    for (let l = 0; l < L; l++) {
      const w = this.W[l];
      const vw = this.vW[l];
      for (let k = 0; k < w.length; k++) {
        vw[k] = this.momento * vw[k] - (this.taxa * this.gW[l][k]) / n;
        w[k] += vw[k];
      }
      for (let j = 0; j < this.b[l].length; j++) {
        this.vb[l][j] = this.momento * this.vb[l][j] - (this.taxa * this.gb[l][j]) / n;
        this.b[l][j] += this.vb[l][j];
      }
    }
    return erro / n;
  }

  // Erro médio em todos os pontos
  erro(pontos) {
    let e = 0;
    for (const p of pontos) {
      const s = this.prever(p.x, p.y);
      e += -(p.classe * Math.log(s + 1e-9) + (1 - p.classe) * Math.log(1 - s + 1e-9));
    }
    return e / pontos.length;
  }

  acuracia(pontos) {
    let ok = 0;
    for (const p of pontos) if (this.prever(p.x, p.y) > 0.5 === (p.classe === 1)) ok++;
    return ok / pontos.length;
  }
}

// Uma época = passar por todos os exemplos uma vez, em mini-lotes embaralhados (com semente).
export function treinarEpoca(rede, pontos, rnd, tamanhoLote = 10) {
  const ordem = pontos.map((_, i) => i);
  for (let i = ordem.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
  }
  for (let i = 0; i < ordem.length; i += tamanhoLote) rede.treinarLote(pontos, ordem.slice(i, i + tamanhoLote));
}
