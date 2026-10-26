import * as THREE from 'three';

// Uma rede neural "de museu": nós de cerâmica branca e cabos retos.
// A espessura e a cor de cada cabo vêm do peso: positivo = cobalto, negativo = terracota.
// Pulsos (contas) andam para frente (cinza-claro/cobalto) ou para trás (terracota-vermelho).

const COBALTO = new THREE.Color('#2f4fd8');
const TERRACOTA = new THREE.Color('#c8643b');
const NEUTRO = new THREE.Color('#a8a196');
const BRANCO = new THREE.Color('#ece7de');
const RETRO = new THREE.Color('#b8442b');
const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _v = new THREE.Vector3();
const _s = new THREE.Vector3();
const _c = new THREE.Color();
const Y = new THREE.Vector3(0, 1, 0);

export class Rede3D {
  /**
   * @param {object} op
   *  camadas: [n0, n1, …]   espacoX, espacoY: distância entre camadas/nós   raio: raio dos nós
   */
  constructor({ materiais, camadas, espacoX = 1.6, espacoY = 0.55, raio = 0.15, maxPulsos = 18 }) {
    this.group = new THREE.Group();
    this.materiais = materiais;
    this.espacoX = espacoX;
    this.espacoY = espacoY;
    this.raio = raio;
    this.matNo = materiais.ceramica();
    this.matNo.clearcoat = 0.6;
    this.matNo.roughness = 0.35;
    this.matCabo = materiais.ceramica();
    this.matCabo.roughness = 0.5;
    this.matPulso = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.geoNo = new THREE.SphereGeometry(1, 32, 20);
    this.geoCabo = new THREE.CylinderGeometry(1, 1, 1, 10, 1, true);
    this.geoPulso = new THREE.SphereGeometry(1, 16, 12);
    this.maxPulsos = maxPulsos;
    this.pulsos = [];
    this.tempo = 0;
    this.construir(camadas);
  }

  construir(camadas, ajustes = {}) {
    if (ajustes.espacoX != null) this.espacoX = ajustes.espacoX;
    if (ajustes.espacoY != null) this.espacoY = ajustes.espacoY;
    if (ajustes.raio != null) this.raio = ajustes.raio;
    this.descartarMalhas();
    this.camadas = camadas;
    const nos = [];
    const L = camadas.length;
    camadas.forEach((n, l) => {
      const x = (l - (L - 1) / 2) * this.espacoX;
      for (let i = 0; i < n; i++) nos.push({ l, i, pos: new THREE.Vector3(x, (i - (n - 1) / 2) * this.espacoY, 0), ativ: 0 });
    });
    this.nos = nos;
    this.indice = []; // indice[l][i] → posição no array nos
    let k = 0;
    camadas.forEach((n, l) => {
      this.indice[l] = [];
      for (let i = 0; i < n; i++) this.indice[l][i] = k++;
    });
    const conex = [];
    for (let l = 0; l < L - 1; l++) {
      for (let j = 0; j < camadas[l + 1]; j++) {
        for (let i = 0; i < camadas[l]; i++) conex.push({ l, i, j, a: this.indice[l][i], b: this.indice[l + 1][j], peso: 0.3, alvo: 0.3 });
      }
    }
    this.conex = conex;

    this.malhaNos = new THREE.InstancedMesh(this.geoNo, this.matNo, nos.length);
    this.malhaNos.castShadow = true;
    this.malhaCabos = new THREE.InstancedMesh(this.geoCabo, this.matCabo, Math.max(1, conex.length));
    this.malhaCabos.castShadow = true;
    this.malhaPulsos = new THREE.InstancedMesh(this.geoPulso, this.matPulso, this.maxPulsos);
    for (const m of [this.malhaNos, this.malhaCabos, this.malhaPulsos]) {
      m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(m.count * 3), 3);
      m.frustumCulled = false;
    }
    this.group.add(this.malhaCabos, this.malhaNos, this.malhaPulsos);
    this.pulsos = [];
    this.atualizar(1);
  }

  descartarMalhas() {
    for (const m of [this.malhaNos, this.malhaCabos, this.malhaPulsos]) {
      if (m) {
        this.group.remove(m);
        m.dispose();
      }
    }
  }

  // Recebe pesos no formato do MLP (W[l][j * nIn + i]). Sem pesos: usa valores aleatórios fixos.
  definirPesos(W) {
    for (const c of this.conex) {
      const nIn = this.camadas[c.l];
      c.alvo = W ? W[c.l][c.j * nIn + c.i] : c.alvo;
    }
  }

  // pesos "de exemplo" com semente
  pesosAleatorios(rnd, escala = 1) {
    for (const c of this.conex) c.alvo = (rnd() * 2 - 1) * escala;
  }

  posicaoNo(l, i) {
    return this.nos[this.indice[l][i]].pos;
  }

  // ativ: função (l, i) → 0..1 que pinta o nó de cobalto
  atualizar(dt, { ativ = null, presenca = 1, montar = 1, camadasVisiveis = 99, suavizar = 8 } = {}) {
    const k = 1 - Math.exp(-dt * suavizar);
    // nós
    this.nos.forEach((no, idx) => {
      const vis = Math.max(0, Math.min(1, camadasVisiveis - no.l)); // camadas aparecem em sequência
      const a = ativ ? ativ(no.l, no.i) : 0;
      no.ativ += (a - no.ativ) * k;
      const s = this.raio * presenca * vis * montar;
      _v.copy(no.pos);
      _m.compose(_v, _q.identity(), _s.setScalar(Math.max(1e-4, s)));
      this.malhaNos.setMatrixAt(idx, _m);
      _c.copy(BRANCO).lerp(COBALTO, Math.min(1, no.ativ));
      this.malhaNos.setColorAt(idx, _c);
    });
    // cabos
    let maxAbs = 0.0001;
    for (const c of this.conex) {
      c.peso += (c.alvo - c.peso) * k;
      maxAbs = Math.max(maxAbs, Math.abs(c.peso));
    }
    this.conex.forEach((c, idx) => {
      const a = this.nos[c.a].pos;
      const b = this.nos[c.b].pos;
      const vis = Math.max(0, Math.min(1, camadasVisiveis - c.l - 1));
      const forca = Math.min(1, Math.abs(c.peso) / Math.max(1.2, maxAbs * 0.8));
      const r = (0.006 + forca * 0.03) * presenca * vis * montar;
      _v.subVectors(b, a);
      const len = _v.length();
      _q.setFromUnitVectors(Y, _v.normalize());
      _m.compose(_s.addVectors(a, b).multiplyScalar(0.5), _q, new THREE.Vector3(Math.max(1e-4, r), len, Math.max(1e-4, r)));
      this.malhaCabos.setMatrixAt(idx, _m);
      _c.copy(NEUTRO).lerp(c.peso >= 0 ? COBALTO : TERRACOTA, 0.25 + forca * 0.75);
      this.malhaCabos.setColorAt(idx, _c);
    });
    this.malhaNos.instanceMatrix.needsUpdate = true;
    this.malhaNos.instanceColor.needsUpdate = true;
    this.malhaCabos.instanceMatrix.needsUpdate = true;
    this.malhaCabos.instanceColor.needsUpdate = true;
  }

  // Pulsos: avanco (0..1) e retro (0..1) controlam quantos andam em cada sentido.
  pulsar(dt, { avanco = 0, retro = 0, velocidade = 1.3, presenca = 1 } = {}) {
    this.tempo += dt;
    const L = this.camadas.length;
    const nAv = Math.round(avanco * this.maxPulsos * 0.6);
    const nRe = Math.round(retro * this.maxPulsos * 0.6);
    // cria pulsos novos aos poucos
    const vivos = this.pulsos.filter((p) => p.t < L - 1);
    const conta = (s) => vivos.filter((p) => p.sentido === s).length;
    if (conta(1) < nAv && Math.random() < dt * 6) vivos.push(this.#novo(1));
    if (conta(-1) < nRe && Math.random() < dt * 6) vivos.push(this.#novo(-1));
    this.pulsos = vivos;
    for (let k = 0; k < this.maxPulsos; k++) {
      const p = this.pulsos[k];
      if (!p || presenca < 0.01) {
        _m.compose(_v.set(0, -50, 0), _q.identity(), _s.setScalar(1e-4));
        this.malhaPulsos.setMatrixAt(k, _m);
        continue;
      }
      p.t += dt * velocidade;
      const seg = Math.min(L - 2, Math.floor(p.t));
      const f = p.t - seg;
      // caminho: um nó por camada (sorteado quando o pulso nasce)
      const l0 = p.sentido > 0 ? seg : L - 1 - seg;
      const l1 = p.sentido > 0 ? seg + 1 : L - 2 - seg;
      const a = this.posicaoNo(l0, p.caminho[l0]);
      const b = this.posicaoNo(l1, p.caminho[l1]);
      _v.lerpVectors(a, b, Math.min(1, f));
      const s = 0.055 * presenca * Math.sin(Math.min(1, p.t / (L - 1)) * Math.PI) ** 0.3;
      _m.compose(_v, _q.identity(), _s.setScalar(Math.max(1e-4, s)));
      this.malhaPulsos.setMatrixAt(k, _m);
      this.malhaPulsos.setColorAt(k, p.sentido > 0 ? _c.copy(COBALTO).lerp(BRANCO, 0.55) : _c.copy(RETRO));
    }
    this.malhaPulsos.instanceMatrix.needsUpdate = true;
    if (this.malhaPulsos.instanceColor) this.malhaPulsos.instanceColor.needsUpdate = true;
  }

  #novo(sentido) {
    return { sentido, t: 0, caminho: this.camadas.map((n) => Math.floor(Math.random() * n)) };
  }

  dispose() {
    this.descartarMalhas();
    this.geoNo.dispose();
    this.geoCabo.dispose();
    this.geoPulso.dispose();
  }
}
