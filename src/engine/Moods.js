import * as THREE from 'three';

// Climas de luz. Cada clima é um conjunto de números/cores;
// a transição é uma interpolação contínua (0 = estúdio, 1 = holofote).
//
// O TEMA ESCURO (tecla D) troca o estúdio claro por um "estúdio noturno":
// mesmos objetos, mesmo desenho, luz baixa e fundo escuro. Não é o holofote
// (que tem foco de museu): aqui a sala toda fica meno e as peças seguem visíveis.

export const CLIMAS = {
  estudio: {
    fundo: '#ece8e1',
    texto: '#191714',
    texto2: '#6e685f',
    traco: '#191714',
    ambiente: 0.8,
    chave: 2.1,
    preench: 0.55,
    recorte: 0.35,
    spot: 0,
    sombra: 0.32,
    contato: 0.5,
    poca: 0,
    grao: 0,
    neblinaPerto: 18,
    neblinaLonge: 48,
    exposicao: 1,
  },
  'estudio-escuro': {
    fundo: '#1a1815',
    texto: '#eae4d9',
    texto2: '#a79d8e',
    traco: '#eae4d9',
    ambiente: 0.42,
    chave: 1.0,
    preench: 0.24,
    recorte: 0.62,
    spot: 2.6,
    sombra: 0.5,
    contato: 0.62,
    poca: 0.4,
    grao: 0.07,
    neblinaPerto: 13,
    neblinaLonge: 40,
    exposicao: 1,
  },
  holofote: {
    fundo: '#151311',
    texto: '#efe9df',
    texto2: '#a59c8f',
    traco: '#efe9df',
    ambiente: 0.16,
    chave: 0,
    preench: 0.02,
    recorte: 1.1,
    spot: 7.5,
    sombra: 0.7,
    contato: 0.85,
    poca: 1,
    grao: 0.16,
    neblinaPerto: 9,
    neblinaLonge: 26,
    exposicao: 1.08,
  },
};

const lerp = (a, b, t) => a + (b - a) * t;

export class Moods {
  constructor(stage, overrides = {}) {
    this.stage = stage;
    this.a = { ...CLIMAS.estudio, ...(overrides.estudio || {}) };
    this.aE = { ...CLIMAS['estudio-escuro'], ...(overrides['estudio-escuro'] || {}) }; // tema escuro
    this.b = { ...CLIMAS.holofote, ...(overrides.holofote || {}) };
    this.cores = {};
    for (const k of ['fundo', 'texto', 'texto2', 'traco']) {
      // [claro, claro-escuro (tema), holofote] — três pontos que o clima escolhe
      this.cores[k] = [new THREE.Color(this.a[k]), new THREE.Color(this.aE[k]), new THREE.Color(this.b[k])];
    }
    this.tmp = new THREE.Color();
    this.tmp2 = new THREE.Color();
    this.ultimo = -1;
    this.tema = 0; // 0 = claro · 1 = tema escuro (tecla D); entra com transição suave
    this.temaAlvo = 0;
    this.root = document.documentElement.style;
  }

  // Troca o tema (atalho D). imediato: pula a transição (ex.: ao abrir a página).
  setTema(escuro, { imediato = false } = {}) {
    this.temaAlvo = escuro ? 1 : 0;
    if (imediato) this.tema = this.temaAlvo;
  }

  // w: 0..1 (estúdio → holofote); luz: multiplicador da abertura (0 = escuro total)
  aplicar(w, luz = 1, dt = 1 / 60) {
    // o tema escuro entra devagar: o mesmo passo de suavização das câmeras
    if (this.tema !== this.temaAlvo) {
      this.tema += (this.temaAlvo - this.tema) * (1 - Math.exp(-dt * 3));
      if (Math.abs(this.temaAlvo - this.tema) < 0.002) this.tema = this.temaAlvo;
    }
    const chaveCache = Math.round(w * 1000) + Math.round(luz * 1000) * 10000 + Math.round(this.tema * 500) * 10000000;
    const mudou = chaveCache !== this.ultimo;
    this.ultimo = chaveCache;
    if (!mudou) return;
    const { a, aE, b } = this;
    const t = this.tema;
    // primeiro mistura claro ↔ tema escuro dentro do mesmo clima; o clima (w) decide o resto
    const v = (k) => lerp(lerp(a[k], aE[k], t), b[k], w);
    const corDe = (k, out) => out.copy(this.cores[k][0]).lerp(this.cores[k][1], t).lerp(this.cores[k][2], w);

    // CSS: cores do texto/fundo seguem o clima (e o tema)
    const css = {};
    for (const k in this.cores) css[k] = '#' + corDe(k, this.tmp).getHexString();
    this.root.setProperty('--fundo', css.fundo);
    this.root.setProperty('--texto', css.texto);
    this.root.setProperty('--texto-2', css.texto2);
    this.root.setProperty('--traco', css.traco);
    this.root.setProperty('--grao', String(v('grao')));
    this.css = css;

    const st = this.stage;
    if (!st) return;
    const fundo = corDe('fundo', this.tmp2); // a cor do céu que o fog e o clear color usam
    st.renderer.setClearColor(fundo, 1);
    st.scene.fog.color.copy(fundo);
    st.scene.fog.near = v('neblinaPerto');
    st.scene.fog.far = v('neblinaLonge');
    st.scene.environmentIntensity = v('ambiente') * luz;
    const L = st.luzes;
    L.chave.intensity = v('chave') * luz;
    L.preench.intensity = v('preench') * luz;
    L.recorte.intensity = v('recorte') * luz;
    L.spot.intensity = v('spot') * luz;
    st.chao.sombra.material.opacity = v('sombra') * Math.min(1, luz * 1.5);
    st.chao.contato.material.opacity = v('contato') * Math.min(1, 0.25 + luz);
    st.chao.poca.material.opacity = v('poca') * luz;
    st.chao.poca.visible = st.chao.poca.material.opacity > 0.002;
    st.renderer.toneMappingExposure = v('exposicao');
  }
}
