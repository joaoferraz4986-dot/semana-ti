import { MLP, treinarEpoca, aleatorio } from './mlp.js';
import { gerarDados, NOMES } from './dados.js';

// DEMO AO VIVO: treina a rede de verdade, conforme a configuração de cada passo do .md.
// Nada é clicável: cada clique do passador entra num passo e o treino recomeça do zero,
// sempre com a mesma semente (então o resultado é igual toda vez).
//
// Atributos aceitos no .md (no cabeçalho ou em <!-- passo ... -->):
//   demo-dados=espiral            espiral | circulos | xor | grupos  (vários separados por vírgula = montagem)
//   demo-ocultas=1                número de camadas ocultas (1 a 12) — mais camadas não é melhor (o capítulo mostra)
//   demo-neuronios=2              neurônios por camada oculta (1 a 8)
//   demo-taxa=0.03                taxa de aprendizado
//   demo-epocas=400               até quantas épocas treinar
//   demo-treinar=nao              só mostra os pontos, sem treinar
//   demo-semente=3                semente da rede (mude para outra "sorte" fixa)

const COR_TERRA = [200, 100, 59];
const COR_COBALTO = [47, 79, 216];
const TINTA_TERRA = [236, 196, 172];
const TINTA_COBALTO = [190, 200, 240];
const NEUTRO = [240, 236, 229];
const EPOCAS_POR_QUADRO = 2;

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const fmt = (n, c = 2) => n.toFixed(c).replace('.', ',');

export function lerConfig(attrs = {}) {
  const num = (k, padrao) => (attrs[k] != null && attrs[k] !== '' ? Number(attrs[k]) : padrao);
  return {
    dados: String(attrs['demo-dados'] || 'espiral')
      .split(',')
      .map((s) => s.trim())
      .filter((s) => NOMES[s]),
    ocultas: Math.max(1, Math.min(12, num('demo-ocultas', 1))),
    neuronios: Math.max(1, Math.min(8, num('demo-neuronios', 2))),
    taxa: num('demo-taxa', 0.03),
    epocas: num('demo-epocas', 400),
    treinar: String(attrs['demo-treinar'] || 'sim') !== 'nao',
    semente: num('demo-semente', 3),
  };
}

export class Demo {
  constructor(container) {
    const el = document.createElement('aside');
    el.className = 'demo-painel';
    el.setAttribute('aria-label', 'Demonstração: rede neural aprendendo');
    el.innerHTML = `
      <div class="demo-cabeca">
        <span class="demo-dados"></span>
        <span class="demo-arq"></span>
      </div>
      <canvas class="demo-mapa"></canvas>
      <div class="demo-numeros">
        <div><span>Época</span><b class="demo-epoca">0</b></div>
        <div><span>Erro</span><b class="demo-erro">–</b></div>
        <div><span>Acertos</span><b class="demo-acerto">–</b></div>
      </div>
      <canvas class="demo-grafico"></canvas>`;
    container.appendChild(el);
    this.el = el;
    this.mapa = el.querySelector('.demo-mapa');
    this.grafico = el.querySelector('.demo-grafico');
    this.txtDados = el.querySelector('.demo-dados');
    this.txtArq = el.querySelector('.demo-arq');
    this.txtEpoca = el.querySelector('.demo-epoca');
    this.txtErro = el.querySelector('.demo-erro');
    this.txtAcerto = el.querySelector('.demo-acerto');
    this.peq = document.createElement('canvas');
    this.peq.width = this.peq.height = 56;
    this.ativo = false;
    this.quadro = 0;
    this.chave = '';
  }

  // Começa (ou recomeça) um passo da demo
  iniciar(cfg) {
    this.cfg = cfg;
    this.indiceDados = 0;
    this.#prepararConjunto();
    this.ativo = true;
  }

  #prepararConjunto() {
    const cfg = this.cfg;
    const tipo = cfg.dados[this.indiceDados] || 'espiral';
    this.tipo = tipo;
    this.pontos = gerarDados(tipo);
    const tamanhos = [2, ...Array(cfg.ocultas).fill(cfg.neuronios), 1];
    this.rede = new MLP(tamanhos, { semente: cfg.semente, taxa: cfg.taxa });
    this.rnd = aleatorio(11);
    this.epoca = 0;
    this.historico = [this.rede.erro(this.pontos)];
    this.espera = 0;
    this.txtDados.textContent = NOMES[tipo];
    const plural = (n, s, p) => `${n} ${n === 1 ? s : p}`;
    this.txtArq.textContent = `${plural(cfg.ocultas, 'camada oculta', 'camadas ocultas')} · ${plural(cfg.neuronios, 'neurônio', 'neurônios')} em cada`;
    this.desenharTudo();
  }

  parar() {
    this.ativo = false;
  }

  // chamado a cada quadro
  passo() {
    if (!this.ativo || !this.cfg) return;
    this.quadro++;
    const cfg = this.cfg;
    if (cfg.treinar && this.epoca < cfg.epocas) {
      for (let k = 0; k < EPOCAS_POR_QUADRO && this.epoca < cfg.epocas; k++) {
        treinarEpoca(this.rede, this.pontos, this.rnd);
        this.epoca++;
        this.historico.push(this.rede.erro(this.pontos));
      }
      if (this.quadro % 2 === 0 || this.epoca >= cfg.epocas) this.desenharTudo();
    } else if (cfg.treinar && cfg.dados.length > 1) {
      // montagem: depois de terminar um conjunto, espera um pouco e passa ao próximo
      this.espera++;
      if (this.espera > 70) {
        this.indiceDados = (this.indiceDados + 1) % cfg.dados.length;
        this.#prepararConjunto();
      }
    }
  }

  desenharTudo() {
    this.#ajustarTamanho();
    this.#desenharMapa();
    this.#desenharGrafico();
    const erro = this.historico[this.historico.length - 1];
    this.txtEpoca.textContent = String(this.epoca);
    this.txtErro.textContent = this.cfg.treinar ? fmt(erro) : '–';
    this.txtAcerto.textContent = this.cfg.treinar ? `${Math.round(this.rede.acuracia(this.pontos) * 100)}%` : '–';
  }

  #ajustarTamanho() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    for (const c of [this.mapa, this.grafico]) {
      const w = Math.round(c.clientWidth * dpr);
      const h = Math.round(c.clientHeight * dpr);
      if (w && h && (c.width !== w || c.height !== h)) {
        c.width = w;
        c.height = h;
      }
    }
  }

  #desenharMapa() {
    const c = this.mapa;
    const g = c.getContext('2d');
    const W = c.width;
    const H = c.height;
    if (!W || !H) return;
    // fronteira de decisão: a rede "pinta" cada ponto do plano com o que acha que ele é
    const p = this.peq;
    const pg = p.getContext('2d');
    const img = pg.createImageData(p.width, p.height);
    const mostrar = this.cfg.treinar && this.epoca > 0;
    for (let j = 0; j < p.height; j++) {
      for (let i = 0; i < p.width; i++) {
        const x = (i / (p.width - 1)) * 2 - 1;
        const y = 1 - (j / (p.height - 1)) * 2;
        const prob = mostrar ? this.rede.prever(x, y) : 0.5;
        const cor = prob < 0.5 ? mix(NEUTRO, TINTA_TERRA, (0.5 - prob) * 2) : mix(NEUTRO, TINTA_COBALTO, (prob - 0.5) * 2);
        const k = (j * p.width + i) * 4;
        img.data[k] = cor[0];
        img.data[k + 1] = cor[1];
        img.data[k + 2] = cor[2];
        img.data[k + 3] = 255;
      }
    }
    pg.putImageData(img, 0, 0);
    g.imageSmoothingEnabled = true;
    g.imageSmoothingQuality = 'high';
    g.drawImage(p, 0, 0, W, H);
    // pontos
    const r = W * 0.0105;
    for (const pt of this.pontos) {
      const x = ((pt.x + 1) / 2) * W;
      const y = ((1 - pt.y) / 2) * H;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fillStyle = `rgb(${(pt.classe ? COR_COBALTO : COR_TERRA).join(',')})`;
      g.fill();
      g.lineWidth = r * 0.45;
      g.strokeStyle = '#f6f3ed';
      g.stroke();
    }
    // moldura fina
    g.strokeStyle = 'rgba(25,23,20,0.35)';
    g.lineWidth = Math.max(1, W * 0.002);
    g.strokeRect(0.5, 0.5, W - 1, H - 1);
  }

  #desenharGrafico() {
    const c = this.grafico;
    const g = c.getContext('2d');
    const W = c.width;
    const H = c.height;
    if (!W || !H) return;
    g.clearRect(0, 0, W, H);
    const h = this.historico;
    const max = Math.max(0.75, ...h.slice(0, 5));
    const total = Math.max(this.cfg.epocas, 1);
    const pad = H * 0.08;
    // linha de base e marca do zero
    g.strokeStyle = 'rgba(25,23,20,0.25)';
    g.lineWidth = Math.max(1, H * 0.012);
    g.beginPath();
    g.moveTo(0, H - pad);
    g.lineTo(W, H - pad);
    g.stroke();
    if (!this.cfg.treinar || h.length < 2) return;
    g.strokeStyle = '#191714';
    g.lineWidth = Math.max(1.5, H * 0.035);
    g.lineJoin = 'round';
    g.beginPath();
    h.forEach((v, i) => {
      const x = (i / total) * W;
      const y = H - pad - (Math.min(v, max) / max) * (H - pad * 2);
      if (i === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    });
    g.stroke();
    const ult = h[h.length - 1];
    g.fillStyle = '#2f4fd8';
    g.beginPath();
    g.arc(((h.length - 1) / total) * W, H - pad - (Math.min(ult, max) / max) * (H - pad * 2), H * 0.07, 0, Math.PI * 2);
    g.fill();
  }

  mostrar(opacidade) {
    this.el.style.opacity = String(opacidade);
    this.el.style.visibility = opacidade > 0.01 ? 'visible' : 'hidden';
    this.el.style.transform = `translateY(-50%) translateY(${(1 - opacidade) * 24}px)`;
  }

  dispose() {
    this.el.remove();
  }
}
