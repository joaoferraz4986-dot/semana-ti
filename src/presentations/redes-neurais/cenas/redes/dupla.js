import * as THREE from 'three';
import { aleatorio } from '../../demo/mlp.js';
import { materialBarro, corpoCelular, curvaFibra, ramificar, tubo } from './organico.js';
import { Rede3D } from './rede3d.js';

// Duas redes lado a lado:
//   à esquerda, orgânica (barro terracota, fibras irregulares) — "humano"
//   à direita, geométrica (esferas brancas, cabos retos, cobalto) — "máquina"
// crescer: a rede orgânica cresce a partir de um único pulso (abertura)
// maquina: a rede geométrica aparece · unir: as duas se aproximam e uma ponte as liga (final)

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const suave = (x) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};

export function criarDupla({ materiais, P }) {
  const group = new THREE.Group();
  const rnd = aleatorio(5);
  const barro = materialBarro();

  // ---------- rede orgânica ----------
  const org = new THREE.Group();
  group.add(org);
  const somas = [
    new THREE.Vector3(-3.0, 1.55, 0.1),
    new THREE.Vector3(-2.2, 2.35, -0.3),
    new THREE.Vector3(-2.0, 1.0, 0.35),
    new THREE.Vector3(-1.2, 1.9, 0.0),
    new THREE.Vector3(-0.9, 0.85, -0.4),
    new THREE.Vector3(-0.35, 2.55, 0.25),
    new THREE.Vector3(-0.2, 1.5, 0.15),
  ];
  // conexões em ordem de crescimento (a partir do primeiro neurônio)
  const ligacoes = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 5],
    [3, 6],
    [4, 6],
    [5, 6],
  ];
  const elementos = []; // { mesh, ordem, total }
  const corpos = somas.map((p, k) => {
    const m = new THREE.Mesh(corpoCelular(0.2 + rnd() * 0.07, 30 + k, 4), barro);
    m.position.copy(p);
    m.castShadow = true;
    org.add(m);
    return m;
  });
  const ordemNeuronio = [0, 1, 1, 2, 2, 3, 3]; // em que "onda" cada corpo aparece
  const fibras = ligacoes.map(([a, b], k) => {
    const curva = curvaFibra(somas[a], somas[b], rnd, 0.45);
    const geo = tubo(curva, 0.038, 40);
    const m = new THREE.Mesh(geo, barro);
    m.castShadow = true;
    org.add(m);
    const onda = Math.max(ordemNeuronio[a], ordemNeuronio[b]) - 0.5 + k * 0.02;
    elementos.push({ m, onda, total: geo.index.count });
    return { curva, a, b };
  });
  // galhinhos (dendritos) em cada corpo
  somas.forEach((p, k) => {
    const n = 3;
    for (let j = 0; j < n; j++) {
      const dir = new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize();
      const lista = ramificar(p.clone().addScaledVector(dir, 0.18), dir, 0.35, 0.022, 1, rnd, [], 2);
      for (const g of lista) {
        const geo = tubo(g.curva, g.raio, 10);
        const m = new THREE.Mesh(geo, barro);
        org.add(m);
        elementos.push({ m, onda: ordemNeuronio[k] + 0.3 + g.nivel * 0.15, total: geo.index.count });
      }
    }
  });

  // pulso que percorre a rede orgânica (caminho fixo)
  const sequencia = [fibras[1], fibras[3], fibras[6]]; // neurônio 0 → 2 → 3 → 6
  const matQuente = new THREE.MeshBasicMaterial({ color: '#ffe2c4' });
  const pulsoOrg = new THREE.Mesh(new THREE.SphereGeometry(0.07, 18, 12), matQuente);
  org.add(pulsoOrg);
  // halo suave em volta do pulso (só na abertura, no escuro)
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 18, 12),
    new THREE.MeshBasicMaterial({ color: '#ffb27a', transparent: true, opacity: 0.09, depthWrite: false }),
  );
  pulsoOrg.add(halo);

  // ---------- rede geométrica ----------
  const geo = new Rede3D({ materiais, camadas: [3, 4, 4, 3], espacoX: 0.8, espacoY: 0.52, raio: 0.13, maxPulsos: 10 });
  geo.group.position.set(1.7, 1.7, 0);
  geo.pesosAleatorios(aleatorio(8), 1.2);
  group.add(geo.group);

  // ---------- ponte (final) ----------
  const inicioPonte = somas[6].clone();
  const fimPonte = new THREE.Vector3(1.7 - 1.2, 1.7, 0);
  const curvaPonte = new THREE.CatmullRomCurve3([inicioPonte, inicioPonte.clone().lerp(fimPonte, 0.5).add(new THREE.Vector3(0, 0.25, 0.1)), fimPonte]);
  const geoPonte = tubo(curvaPonte, 0.04, 40);
  const ponte = new THREE.Mesh(geoPonte, materiais.aluminio());
  group.add(ponte);

  let tempo = 0;
  function atualizar(dt) {
    tempo += dt;
    const cres = clamp01(P.crescer);
    const ondaAtual = cres * 4.2; // 0..4 "ondas"
    // corpos aparecem por ondas
    corpos.forEach((m, k) => {
      const s = suave(ondaAtual - ordemNeuronio[k] + (k === 0 ? 1 : 0));
      m.scale.setScalar(Math.max(0.001, s));
      m.visible = s > 0.01;
    });
    // fibras crescem (desenho progressivo do tubo)
    for (const e of elementos) {
      const prog = clamp01((ondaAtual - e.onda) / 0.9);
      e.m.visible = prog > 0.005;
      e.m.geometry.setDrawRange(0, Math.floor((e.total * prog) / 3) * 3);
    }
    // aproximação final
    const u = suave(P.unir);
    org.position.x = u * 0.55;
    geo.group.position.x = 1.7 - u * 0.55;
    // pulso orgânico: percorre 3 fibras e recomeça
    const c = (tempo * 0.35) % 1;
    const seg = Math.min(2, Math.floor(c * 3));
    const f = c * 3 - seg;
    // na abertura (sem rede ainda), o pulso vagueia sozinho pela primeira fibra
    sequencia[seg].curva.getPoint(f, pulsoOrg.position);
    pulsoOrg.visible = P.pulsoDupla > 0.5;
    halo.visible = P.crescer < 0.6;
    // ponte
    ponte.visible = u > 0.01;
    geoPonte.setDrawRange(0, Math.floor((geoPonte.index.count * u) / 3) * 3);
    // rede geométrica
    const mq = suave(P.maquina);
    geo.group.visible = mq > 0.01;
    geo.atualizar(dt, { presenca: mq, ativ: (l) => (P.pulsoDupla > 0.5 ? 0.15 + 0.25 * Math.max(0, Math.sin(tempo * 2 - l)) : 0) });
    geo.pulsar(dt, { avanco: mq * P.pulsoDupla, presenca: mq });
  }

  return { group, atualizar, geo };
}
