import * as THREE from 'three';

// Climas de luz. Cada clima é um conjunto de números/cores;
// a transição é uma interpolação contínua (0 = estúdio, 1 = holofote).

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
    this.b = { ...CLIMAS.holofote, ...(overrides.holofote || {}) };
    this.cores = {};
    for (const k of ['fundo', 'texto', 'texto2', 'traco']) {
      this.cores[k] = [new THREE.Color(this.a[k]), new THREE.Color(this.b[k])];
    }
    this.tmp = new THREE.Color();
    this.ultimo = -1;
    this.root = document.documentElement.style;
  }

  // w: 0..1 (estúdio → holofote); luz: multiplicador da abertura (0 = escuro total)
  aplicar(w, luz = 1) {
    const chaveCache = Math.round(w * 1000) + Math.round(luz * 1000) * 10000;
    const mudou = chaveCache !== this.ultimo;
    this.ultimo = chaveCache;
    if (!mudou) return;
    const { a, b } = this;
    const v = (k) => lerp(a[k], b[k], w);

    // CSS: cores do texto/fundo seguem o clima
    const css = {};
    for (const k in this.cores) {
      const [ca, cb] = this.cores[k];
      this.tmp.copy(ca).lerp(cb, w);
      css[k] = '#' + this.tmp.getHexString();
    }
    this.root.setProperty('--fundo', css.fundo);
    this.root.setProperty('--texto', css.texto);
    this.root.setProperty('--texto-2', css.texto2);
    this.root.setProperty('--traco', css.traco);
    this.root.setProperty('--grao', String(v('grao')));
    this.css = css;

    const st = this.stage;
    if (!st) return;
    const fundo = this.tmp.copy(this.cores.fundo[0]).lerp(this.cores.fundo[1], w);
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
